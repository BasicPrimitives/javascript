import Family from "../../../algorithms/Family";

export default function NavigationalFamily(activeItems) {
  var _activeItems = activeItems,
    _navigationFamily = Family();

  function define(parentItem, treeItem, skipFirstParent) {
    var parents = [];
    /* take parentItem when it is visible or collect all visible immediate parents of the parentItem */
    if (
      skipFirstParent ||
      !parentItem.isVisible ||
      !_activeItems.hasOwnProperty(parentItem.id)
    ) {
      if (!skipFirstParent && parentItem.isVisible) {
        parents.push(parentItem.id);
      }
      _navigationFamily.loopParents(
        this,
        parentItem.id,
        function (parentId, parent, level) {
          if (parent.isVisible) {
            parents.push(parentId);
            if (_activeItems.hasOwnProperty(parentId)) {
              return _navigationFamily.SKIP;
            }
          }
        }
      );
    } else {
      parents.push(parentItem.id);
    }
    if (_navigationFamily.node(treeItem.id) != null) {
      _navigationFamily.adopt(parents, treeItem.id);
    } else {
      _navigationFamily.add(parents, treeItem.id, treeItem);
    }
  }

  function getFamily() {
    return _navigationFamily;
  }

  return {
    define: define,
    getFamily: getFamily,
  };
}
