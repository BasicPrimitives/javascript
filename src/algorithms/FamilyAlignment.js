import getFamilyUnits from './getFamilyUnits';
import FamilyMargins from './FamilyMargins';
/**
 * Callback function for getting family node width
 * 
 * @callback onFamilyAlignmentItemSizeCallback
 * @param {string} itemid Family node id
 * @param {object} item Family node context object
 * @returns {number} Family node width
 */

/**
 * Creates family alignment data structure. This structure aligns horizontally planar family of nodes.
 * @class FamilyAlignment
 * 
 * @param {Object} thisArg The callback function invocation context
 * @param {family} family Family data structure
 * @param {TreeLevels} treeLevels Three levels data structure
 * @param {onFamilyAlignmentItemSizeCallback} onItemSize Callback function to measure family node width
 * @returns {FamilyAlignment} Returns family alignment structure
 */
export default function FamilyAlignment(thisArg, family, treeLevels, onItemSize) {
  var offsets,
    sizes = {},
    childrenDistances;

  if (onItemSize != null) {
    treeLevels.loopItems(this, function (itemid, item, position, levelIndex, level) {
      sizes[itemid] = onItemSize.call(thisArg, itemid, item);
    });
  }

  childrenDistances = getDistancesBetweenChildren(family, treeLevels);
  offsets = getTreeLevelsOffsets(family, treeLevels, childrenDistances);

  function _getNodeMargins(margins, nodeid) {
    // create margins for node if it does not exists
    var nodeMargins = margins[nodeid];
    if (nodeMargins == null) {
      nodeMargins = new FamilyMargins();
      margins[nodeid] = nodeMargins;
    }
    return nodeMargins;
  }

  function getDistancesBetweenChildren(family, treeLevels) {
    var distances = {};
    var margins = {};
    var levelMargins = null;

    treeLevels.loopLevelsReversed(this, function (levelIndex, level) {
      var newMargins = new FamilyMargins();
      if (levelMargins != null) {
        levelMargins.add(0, Number.MAX_VALUE);
        newMargins.merge(levelMargins, 0);
      }
      levelMargins = newMargins;

      var previousParentMargins = levelMargins;
      treeLevels.loopLevelItems(this, levelIndex, function (nodeid, node, position) {
        var nodeMargins = _getNodeMargins(margins, nodeid);

        // add node size into its margin
        nodeMargins.add(sizes[nodeid], position);

        switch (family.countParents(nodeid)) {
          case 0:
            if (previousParentMargins != null) {
              distances[nodeid] = previousParentMargins.attach(nodeMargins);
            }
            break;
          case 1:
            family.loopParents(this, nodeid, function (parentid, parent, levelIndex) {
              var parentMargins = _getNodeMargins(margins, parentid);
              distances[nodeid] = parentMargins.merge(nodeMargins);

              previousParentMargins = parentMargins;
              return family.BREAK;
            });
            break;
          default:
            // loop parents and find total size of them
            var totalSize = 0;
            var fromIndex = null;
            var toIndex = null;
            var hash = {};
            family.loopParents(this, nodeid, function (parentid, parent, levelIndex) {
              if (levelIndex > 0) {
                return family.BREAK;
              }
              totalSize += sizes[parentid];

              var position = treeLevels.getItemPosition(parentid);
              fromIndex = fromIndex == null ? position : Math.min(fromIndex, position);
              toIndex = toIndex == null ? position : Math.max(toIndex, position);
              hash[position] = parentid;
            });

            var offset = -totalSize / 2;
            for (var index = fromIndex; index <= toIndex; index += 1) {
              var parentid = hash[index];

              offset += sizes[parentid] / 2.0;

              var parentMargins = _getNodeMargins(margins, parentid);

              parentMargins.attach(nodeMargins, -offset);

              previousParentMargins = parentMargins;

              offset += sizes[parentid] / 2.0;
            }
            break;
        }
      });
    });

    return distances;
  }

  function getTreeLevelsOffsets(family, treeLevels, childrenDistances) {
    var offsets = {};

    var familyUnitsById = getFamilyUnits(family);
    var processedFamilyUnits = {};

    treeLevels.loopLevels(this, function (levelIndex, level) {
      treeLevels.loopLevelItems(this, levelIndex, function (nodeid, node, position) {
        if (!offsets.hasOwnProperty(nodeid)) {
          var offset = 0;
          if (position === 0) {
            if (childrenDistances[nodeid] != null) {
              offset += childrenDistances[nodeid] + sizes[nodeid] / 2;
            }
          } else {
            var prevNodeId = treeLevels.getItemAtPosition(levelIndex, position - 1);
            offset += offsets[prevNodeId] + sizes[prevNodeId] / 2 + (childrenDistances[nodeid] || 0) + sizes[nodeid] / 2;
          }
          offsets[nodeid] = offset;
        }
        var familyUnits = familyUnitsById[nodeid];
        if (familyUnits != null) {
          for (var index = 0; index < familyUnits.length; index += 1) {
            var familyUnit = familyUnits[index];
            if (!processedFamilyUnits.hasOwnProperty(familyUnit.id)) {
              processedFamilyUnits[familyUnit.id] = true;

              setFamilyOffsets(offsets, nodeid, familyUnit, levelIndex, levelIndex + 1, position, treeLevels, childrenDistances);
            }
          }
        }
      });
    });

    return offsets;
  }

  function setFamilyOffsets(offsets, itemid, familyUnit, fromLevel, toLevel, itemIndex, treeLevels, childrenDistances) {
    var fromIndex = itemIndex;
    var toIndex = itemIndex;

    familyUnit.loopSiblings(this, itemid, function (siblingid) {
      var position = treeLevels.getItemPosition(siblingid);
      fromIndex = Math.min(fromIndex, position);
      toIndex = Math.max(toIndex, position);
    });

    // Place nodes on the left side of start node
    for (var index = itemIndex - 1; index >= fromIndex; index -= 1) {
      var siblingid = treeLevels.getItemAtPosition(fromLevel, index);

      if (!offsets.hasOwnProperty(siblingid)) {
        var nodeid = treeLevels.getItemAtPosition(fromLevel, index + 1);
        offsets[siblingid] = offsets[nodeid] - (sizes[siblingid] / 2 + (childrenDistances[nodeid] || 0) + sizes[nodeid] / 2);
      }
    }
    // Place nodes on the right side of start node
    for (index = itemIndex + 1; index <= toIndex; index += 1) {
      siblingid = treeLevels.getItemAtPosition(fromLevel, index);

      if (!offsets.hasOwnProperty(siblingid)) {
        nodeid = treeLevels.getItemAtPosition(fromLevel, index - 1);
        offsets[siblingid] = offsets[nodeid] + (sizes[nodeid] / 2 + (childrenDistances[siblingid] || 0) + sizes[siblingid] / 2);
      }
    }
    siblingid = treeLevels.getItemAtPosition(fromLevel, fromIndex);
    var siblingsMedian = offsets[siblingid] - sizes[siblingid] / 2;
    siblingid = treeLevels.getItemAtPosition(fromLevel, toIndex);
    siblingsMedian += offsets[siblingid] + sizes[siblingid] / 2;

    siblingsMedian /= 2;

    fromIndex = null;
    toIndex = null;
    familyUnit.loopNonSiblings(this, itemid, function (siblingid) {
      var position = treeLevels.getItemPosition(siblingid);
      fromIndex = fromIndex != null ? Math.min(fromIndex, position) : position;
      toIndex = toIndex != null ? Math.max(toIndex, position) : position;
    });

    var nonSiblingsWidth = 0;
    for (index = fromIndex; index <= toIndex; index += 1) {
      var relatedItemId = treeLevels.getItemAtPosition(toLevel, index);
      nonSiblingsWidth += sizes[relatedItemId];
      if (index > fromIndex) {
        nonSiblingsWidth += (childrenDistances[relatedItemId] || 0);
      }
    }

    var offset = siblingsMedian - nonSiblingsWidth / 2;
    relatedItemId = treeLevels.getItemAtPosition(toLevel, fromIndex);
    if (!offsets.hasOwnProperty(relatedItemId)) {
      offsets[relatedItemId] = offset + sizes[relatedItemId] / 2;
    }
    for (index = fromIndex + 1; index <= toIndex; index += 1) {
      relatedItemId = treeLevels.getItemAtPosition(toLevel, index);
      if (!offsets.hasOwnProperty(relatedItemId)) {
        nodeid = treeLevels.getItemAtPosition(toLevel, index - 1);
        offsets[relatedItemId] = offsets[nodeid] + (sizes[nodeid] / 2 + (childrenDistances[relatedItemId] || 0) + sizes[relatedItemId] / 2);
      }
    }
  }

  /**
   * Returns horizontal node offset from left margin of the family diagram
   * 
   * @param {string} nodeid Family node id
   * @returns {number} Node offset
   */
  function getOffset(nodeid) {
    return offsets[nodeid];
  }

  return {
    getOffset: getOffset
  };
};