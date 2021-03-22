import BaseTransformer from './BaseTransformer';
import FamilyItem from '../../../models/FamilyItem';
import { GroupByType } from '../../../enums';
import { isEmptyObject } from '../../../common';

export default function FamilyNormalizer(debug) {
  this.parent = BaseTransformer.prototype;
  this.parent.constructor.apply(this, arguments);
};

FamilyNormalizer.prototype = new BaseTransformer();

FamilyNormalizer.prototype.normalize = function (options, logicalFamily, maximumId) {
  if (logicalFamily.hasNodes() > 0) {

    /* create temp family without labels and invisible node used to bind connections and eliminate many to many relations */
    var toBeRemoved = [];
    logicalFamily.loop(this, function(itemId, item) {
      if(item.isLevelNeutral) {
        toBeRemoved.push(itemId);
      }
    })
    var logicalFamily2 = logicalFamily;
    if(toBeRemoved.length > 0) {
      logicalFamily2 = logicalFamily.clone();
      for(var index = 0; index < toBeRemoved.length; index+=1) {
        var itemId = toBeRemoved[index];
        var parents = [];
        logicalFamily2.loopParents(this, itemId, function(parentId, parent, levelIndex) {
          if(levelIndex == 0) {
            parents.push(parentId);
            return;
          }
          return true;
        });
        var children = [];
        if(parents.length > 0) {
          logicalFamily2.loopChildren(this, itemId, function(childId, child, levelIndex) {
            if(levelIndex == 0) {
              children.push(childId);
              return;
            }
            return true;
          });
        }
        logicalFamily2.removeNode(itemId);

        if(children.length > 0) {
          for(var childIndex = 0; childIndex < children.length; childIndex+=1) {
            var childId = children[childIndex];
            logicalFamily2.adopt(parents, childId);
          }
        }
      }
    }

    /* Distribute Temp Family nodes by levels. Item levels aligned to bottom. */
    logicalFamily2.loopLevels(this, options.groupByType == GroupByType.Parents, function (itemId, item, levelIndex) {
      item.level = levelIndex;
    });

    if (options.alignBylevels) {
      /* Distribute optimized FamilyItem-s by levels. The original family items visible to user should keep their levels after all transformations */
      this.resortItemsBylevels(logicalFamily);
    } else {
      logicalFamily.loopLevels(this, options.groupByType == GroupByType.Parents, function (itemid, item, levelIndex) {
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

        result = new FamilyItem({
          id: maximumId,
          levelGravity: GroupByType.Children,
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

FamilyNormalizer.prototype.resortItemsBylevels = function (logicalFamily) {
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
    if (famItem.levelGravity == GroupByType.Parents) {
      level = null;
      logicalFamily.loopParents(this, famItemId, function (childItemId, childFamItem, levelIndex) {
        level = level == null ? childFamItem.level + 1 : Math.max(childFamItem.level + 1, level);
        return logicalFamily.SKIP;
      }); //ignore jslint
      famItem.level = !level ? famItem.level : level;
    }
  });
};

FamilyNormalizer.prototype.setLevelsForItems = function (items, logicalFamily) {
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

  while (!isEmptyObject(items)) {
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

FamilyNormalizer.prototype.fillInItems = function (logicalFamily, createFamItem) {
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