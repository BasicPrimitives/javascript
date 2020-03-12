primitives.famdiagram.FamilyNormalizer = function (debug) {
  this.parent = primitives.famdiagram.BaseTransformer.prototype;
  this.parent.constructor.apply(this, arguments);
};

primitives.famdiagram.FamilyNormalizer.prototype = new primitives.famdiagram.BaseTransformer();

primitives.famdiagram.FamilyNormalizer.prototype.normalize = function (options, logicalFamily, maximumId) {
  if (logicalFamily.hasNodes() > 0) {

    /* Distribute FamilyItem-s by levels. Item levels aligned to bottom. */
    logicalFamily.loopLevels(this, options.groupByType == primitives.common.GroupByType.Parents, function (itemid, item, levelIndex) {
      item.level = levelIndex;
    });

    /* Optimize family references. Bundle connectors where it is possible */
    logicalFamily.optimizeReferences(function () {
      maximumId += 1;

      return new primitives.famdiagram.FamilyItem({
        id: maximumId,
        isVisible: false,
        isActive: false,
        itemConfig: { title: "bundle #" + maximumId, description: " This item was created by references optimizer." },
        levelGravity: primitives.common.GroupByType.Children
      });
    }); //ignore jslint

    if (this.debug && !logicalFamily.validate()) {
      throw "References are broken in family structure!";
    }
    if (this.debug && logicalFamily.hasLoops()) {
      throw "Structure has loops!";
    }

    /* eliminate many to many connections in chart, every connection should be ether child or parent relation. */
    logicalFamily.eliminateManyToMany(function () {
      maximumId += 1;

      return new primitives.famdiagram.FamilyItem({
        id: maximumId,
        isVisible: false,
        isActive: false,
        itemConfig: { title: "dummy #" + maximumId, description: "This is item used to eliminate M:M relations." },
        levelGravity: primitives.common.GroupByType.Children,
        hideParentConnection: false,
        hideChildrenConnection: false
      });
    } //ignore jslint
    );

    if (this.debug && !logicalFamily.validate()) {
      throw "References are broken in family structure!";
    }

    /* enumerate */

    if (options.alignBylevels) {
      /* Distribute FamilyItem-s by levels. The original family items visible to user should keep their levels after all transformations */
      this.resortItemsBylevels(logicalFamily);
    } else {
      logicalFamily.loopLevels(this, options.groupByType == primitives.common.GroupByType.Parents, function (itemid, item, levelIndex) {
        item.level = levelIndex;
      });
    }

    if (this.debug) {
      this.validate(logicalFamily, false);
    }

    /* Fill in items between parent/child relations having gaps in levels */
    this.fillInItems(logicalFamily,
      function (famItem) {
        var result;

        maximumId += 1;

        result = new primitives.famdiagram.FamilyItem({
          id: maximumId,
          levelGravity: primitives.common.GroupByType.Children,
          isVisible: false,
          isActive: false,
          itemConfig: { title: "extension #" + maximumId, description: "This is item used to fill gaps in levels." }
        });

        return result;
      } //ignore jslint
    );

    if (this.debug) {
      this.validate(logicalFamily, true);
    }
  }
  return maximumId;
};

primitives.famdiagram.FamilyNormalizer.prototype.resortItemsBylevels = function (logicalFamily) {
  var itemsAtLevels = [],
    minimumLevel = null,
    maximumLevel = null,
    index, itemsAtLevel;

  logicalFamily.loop(this, function (famItemId, famItem) {
    famItem.originalLevel = famItem.level;
    famItem.level = null;
    if (famItem.originalLevel != null) {
      if (!itemsAtLevels[famItem.originalLevel]) {
        itemsAtLevels[famItem.originalLevel] = {};
      }
      itemsAtLevels[famItem.originalLevel][famItemId] = famItem;

      minimumLevel = minimumLevel != null ? Math.min(famItem.originalLevel, minimumLevel) : famItem.originalLevel;
      maximumLevel = maximumLevel != null ? Math.max(famItem.originalLevel, maximumLevel) : famItem.originalLevel;
    }
  });

  /* assign levels*/
  for (index = minimumLevel; index <= maximumLevel; index += 1) {
    itemsAtLevel = itemsAtLevels[index];

    this.setLevelsForItems(itemsAtLevel, logicalFamily);
  }

  logicalFamily.loopTopo(this, function (famItemId, famItem, position) {
    var level;
    if (famItem.levelGravity == primitives.common.GroupByType.Parents) {
      level = null;
      logicalFamily.loopParents(this, famItemId, function (childItemId, childFamItem, levelIndex) {
        level = level == null ? childFamItem.level + 1 : Math.max(childFamItem.level + 1, level);
        return logicalFamily.SKIP;
      }); //ignore jslint
      famItem.level = !level ? famItem.level : level;
    }
  });
};

primitives.famdiagram.FamilyNormalizer.prototype.setLevelsForItems = function (items, logicalFamily) {
  var level = 0,
    key, famItem,
    nextItems;

  for (key in items) {
    if (items.hasOwnProperty(key)) {
      logicalFamily.loopParents(this, key, function (parentid, parent, levelIndex) {
        level = Math.max(parent.level + 1, level);
        return logicalFamily.SKIP;
      }); //ignore jslint
    }
  }

  for (key in items) {
    if (items.hasOwnProperty(key)) {
      famItem = items[key];
      famItem.level = level;
    }
  }

  while (!primitives.common.isEmptyObject(items)) {
    nextItems = {};

    for (key in items) {
      if (items.hasOwnProperty(key)) {
        famItem = items[key];
        logicalFamily.loopChildren(this, key, function (childid, child, levelIndex) {
          if (child.originalLevel == null || child.isLevelNeutral) {
            child.level = child.level == null ? famItem.level + 1 : Math.max(child.level, famItem.level + 1);
            nextItems[childid] = child;
          }
          return logicalFamily.SKIP;
        }); //ignore jslint
      }
    }
    items = nextItems;
  }
};

primitives.famdiagram.FamilyNormalizer.prototype.fillInItems = function (logicalFamily, createFamItem) {
  var bundleItem;

  logicalFamily.loop(this, function (famItemId, famItem) {
    var extNeeded = true,
      itemsToBundle;
    while (extNeeded) {
      extNeeded = false;

      /* extend children down */
      itemsToBundle = [];

      logicalFamily.loopParents(this, famItemId, function (parentItemId, parentItem, level) {
        if (famItem.level - 1 > parentItem.level) {
          itemsToBundle.push(parentItemId);
        }
        return logicalFamily.SKIP;
      }); //ignore jslint

      if (itemsToBundle.length > 1) {
        bundleItem = createFamItem(famItem);
        bundleItem.level = famItem.level - 1;

        bundleItem.hideParentConnection = false;
        bundleItem.hideChildrenConnection = false;

        logicalFamily.bundleParents(famItemId, itemsToBundle, bundleItem.id, bundleItem);

        extNeeded = true;

        famItemId = bundleItem.id;
        famItem = bundleItem;
      }
    }
  });

  logicalFamily.loop(this, function (famItemId, famItem) {
    var extNeeded = true,
      itemsToBundle,
      isSingleExtension = true;
    while (extNeeded) {
      extNeeded = false;

      /* extend children down */
      itemsToBundle = [];
      logicalFamily.loopChildren(this, famItemId, function (childItemId, childItem, level) {
        if (famItem.level + 1 < childItem.level) {
          itemsToBundle.push(childItemId);
        } else {
          isSingleExtension = false;
        }
        return logicalFamily.SKIP;
      }); //ignore jslint

      if (itemsToBundle.length > 1) {
        bundleItem = createFamItem(famItem);
        bundleItem.level = famItem.level + 1;

        if (isSingleExtension) {
          bundleItem.hideParentConnection = false;
          bundleItem.hideChildrenConnection = false;
        }

        logicalFamily.bundleChildren(famItemId, itemsToBundle, bundleItem.id, bundleItem);

        extNeeded = true;

        famItemId = bundleItem.id;
        famItem = bundleItem;
      }
    }
  });

  logicalFamily.loop(this, function (famItemId, famItem) {
    var extNeeded = true,
      itemsToBundle;
    while (extNeeded) {
      extNeeded = false;

      /* extend children down */
      itemsToBundle = [];

      logicalFamily.loopParents(this, famItemId, function (parentItemId, parentItem, level) {
        if (famItem.level - 1 > parentItem.level) {
          itemsToBundle.push(parentItemId);
        }
        return logicalFamily.SKIP;
      }); //ignore jslint

      if (itemsToBundle.length > 0) {
        bundleItem = createFamItem(famItem);
        bundleItem.level = famItem.level - 1;

        bundleItem.hideParentConnection = false;
        bundleItem.hideChildrenConnection = false;

        logicalFamily.bundleParents(famItemId, itemsToBundle, bundleItem.id, bundleItem);

        extNeeded = true;

        famItemId = bundleItem.id;
        famItem = bundleItem;
      }
    }
  });
};