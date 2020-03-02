primitives.famdiagram.RemoveLoopsTask = function (itemsOptionTask, removeLoopsOptionTask, logicalFamilyTask) {
  var _data = {
    logicalFamily: null,
    maximumId: null,
    loops: [] // populate collection of pairs between fake parents and fake children
  };

  function process(debug) {
    var logicalFamily = logicalFamilyTask.getLogicalFamily(),
      maximumId = logicalFamilyTask.getMaximumId(),
      items = itemsOptionTask.getItems(),
      options = removeLoopsOptionTask.getOptions(),
      loopsLayoutMode = options.loopsLayoutMode;

    var result = removeLoops(loopsLayoutMode, items, logicalFamily, maximumId, debug);

    _data.logicalFamily = result.logicalFamily;
    _data.maximumId = result.maximumId;
    _data.loops = result.loops;

    if (debug && !logicalFamily.validate()) {
      throw "References are broken in family structure!";
    }

    return true;
  }

  function removeLoops(loopsLayoutMode, items, logicalFamily, maximumId, debug) {
    var fakeChild, fakeParent,
      index, len,
      index2, len2,
      edgesToReverse = getInOrderLoops(items, logicalFamily),
      fakePairs = [];

    if (edgesToReverse.length > 1 && loopsLayoutMode == primitives.common.LoopsLayoutMode.Optimized) {
      edgesToReverse = primitives.common.getFamilyLoops(logicalFamily, debug);
    }

    // group edges by child node
    var loops = [];
    var loopsHash = {};
    for (index = 0, len = edgesToReverse.length; index < len; index += 1) {
      var edge = edgesToReverse[index];

      if (!loopsHash.hasOwnProperty(edge.to)) {
        loopsHash[edge.to] = { itemid: edge.to, parents: [edge.from] };
        loops.push(loopsHash[edge.to]);
      } else {
        loopsHash[edge.to].parents.push(edge.from);
      }
    }

    var fakeChildren = {}; // reuse fake children across removed edges
    if (loops.length > 0) {
      logicalFamily = logicalFamily.clone();
      for (index = 0, len = loops.length; index < len; index += 1) {
        var loop = loops[index];
        var parents = loop.parents;

        var itemParents = [];
        logicalFamily.loopParents(this, loop.itemid, function (parentid, parent) {
          itemParents.push(parentid);
          return logicalFamily.SKIP;
        });

        for (index2 = 0, len2 = itemParents.length; index2 < len2; index2 += 1) {
          /* remove relation in temp structure */
          logicalFamily.removeChildRelation(itemParents[index2], loop.itemid);
        }

        /* create fake parent and child items to loop item to its parent */
        maximumId += 1;

        var isConnectionsVisible = (itemParents.length <= parents.length);
        /* add fake parent */
        fakeParent = new primitives.famdiagram.FamilyItem({
          id: (maximumId),
          isVisible: false,
          isActive: false,
          isLevelNeutral: true,
          hideParentConnection: isConnectionsVisible,
          hideChildrenConnection: isConnectionsVisible,
          levelGravity: primitives.common.GroupByType.Children,
          itemConfig: { title: "fake parent #" + maximumId, description: "This is fake parent item was created by loops reversal." }
        });

        logicalFamily.add([], fakeParent.id, fakeParent);
        logicalFamily.adopt([fakeParent.id], loop.itemid);

        for (index2 = 0, len2 = parents.length; index2 < len2; index2 += 1) {
          var parentid = parents[index2];

          fakeChild = fakeChildren[parentid];

          if (fakeChild == null) {
            /* add fake child */
            maximumId += 1;
            fakeChild = new primitives.famdiagram.FamilyItem({
              id: (maximumId),
              isVisible: false,
              isActive: false,
              isLevelNeutral: true,
              hideParentConnection: true,
              hideChildrenConnection: true,
              levelGravity: primitives.common.GroupByType.Parents,
              itemConfig: { title: "fake child #" + maximumId, description: "This is fake child item was created by loops reversal." }
            });
            fakeChildren[parentid] = fakeChild;

            logicalFamily.add([parentid], fakeChild.id, fakeChild);
          }

          logicalFamily.adopt([fakeParent.id], fakeChild.id);
          fakePairs.push({ from: fakeParent.id, to: fakeChild.id });

        }

        // assign remaining parents of our item to the fake parent
        var parentsHash = {};
        for (index2 = 0, len2 = parents.length; index2 < len2; index2 += 1) {
          parentsHash[parents[index2]] = true;
        }
        for (index2 = 0, len2 = itemParents.length; index2 < len2; index2 += 1) {
          if (!parentsHash.hasOwnProperty(itemParents[index2])) {
            logicalFamily.adopt([itemParents[index2]], fakeParent.id);
          }
        }
      }
    }
    return {
      maximumId: maximumId,
      logicalFamily: logicalFamily,
      loops: fakePairs
    }
  }

  function getInOrderLoops(items, logicalFamily) {
    var tempFamily,
      index, len,
      index2, len2,
      nodesToRemove,
      parents,
      userItem,
      result = [];

    tempFamily = logicalFamily.clone();
    logicalFamily.loopTopo(this, function (itemid, item, levelIndex) {
      tempFamily.removeNode(itemid);
    });

    if (tempFamily.hasNodes()) {
      /* remove parents of the first remaining item in user order*/
      for (index = 0, len = items.length; index < len; index += 1) {
        userItem = items[index];

        if (tempFamily.node(userItem.id) != null) {

          parents = [];
          tempFamily.loopParents(this, userItem.id, function (parentid, parent, level) {
            parents.push(parentid);
            result.push({ from: parentid, to: userItem.id });
            return tempFamily.SKIP;
          }); //ignore jslint

          for (index2 = 0, len2 = parents.length; index2 < len2; index2 += 1) {
            /* remove relation in temp structure */
            tempFamily.removeRelation(parents[index2], userItem.id);
          }

          /* loop is broken, so continue items removal in topological order */
          nodesToRemove = [];
          tempFamily.loopTopo(this, function (itemid, item, levelIndex) {
            nodesToRemove.push(itemid);
          }); //ignore jslint
          for (index2 = 0, len2 = nodesToRemove.length; index2 < len2; index2 += 1) {
            tempFamily.removeNode(nodesToRemove[index2]);
          }
        }
      }
    }
    return result;
  }

  function getLogicalFamily() {
    return _data.logicalFamily;
  }

  function getMaximumId() {
    return _data.maximumId;
  }

  function getLoops() {
    return _data.loops;
  }

  return {
    process: process,
    getLogicalFamily: getLogicalFamily,
    getMaximumId: getMaximumId,
    getLoops: getLoops
  };
};