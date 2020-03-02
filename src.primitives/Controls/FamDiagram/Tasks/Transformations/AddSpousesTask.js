primitives.famdiagram.AddSpousesTask = function (spousesOptionTask, addLabelAnnotationsTask) {
  var _data = {
    logicalFamily: null,
    maximumId: null
  };

  function process(debug) {
    var logicalFamily = addLabelAnnotationsTask.getLogicalFamily(),
      maximumId = addLabelAnnotationsTask.getMaximumId(),
      items = spousesOptionTask.getItems();

    logicalFamily = logicalFamily.clone();

    maximumId = addFakeChildrenForSpouses(logicalFamily, items, maximumId, debug);

    _data.logicalFamily = logicalFamily;
    _data.maximumId = maximumId;

    if (debug && !logicalFamily.validate()) {
      throw "References are broken in family structure!";
    }
    return true;
  }

  function addFakeChildrenForSpouses(logicalFamily, items, maximumId, debug) {
    var couple, fakeChild,
      index, len,
      itemConfig,
      spouseIndex, spouseLen,
      spouses;
    for (index = 0, len = items.length; index < len; index += 1) {
      itemConfig = items[index];
      spouses = itemConfig.spouses.slice(0);
      for (spouseIndex = 0, spouseLen = spouses.length; spouseIndex < spouseLen; spouseIndex += 1) {
        couple = [itemConfig.id, spouses[spouseIndex]];
        if (!logicalFamily.hasCommonChild(couple)) {

          /* create fake child item to keep spouses together */
          maximumId += 1;

          fakeChild = new primitives.famdiagram.FamilyItem({
            id: maximumId,
            isVisible: false,
            isActive: false,
            isLevelNeutral: true,
            hideParentConnection: true,
            hideChildrenConnection: true,
            itemConfig: { title: "fake child #" + maximumId, description: "This is fake child keeps spouses together." },
            levelGravity: primitives.common.GroupByType.Parents
          });

          logicalFamily.add(couple, fakeChild.id, fakeChild);
        }
      }
    }
    return maximumId;
  }

  function getLogicalFamily() {
    return _data.logicalFamily;
  }

  function getMaximumId() {
    return _data.maximumId;
  }

  return {
    process: process,
    getLogicalFamily: getLogicalFamily,
    getMaximumId: getMaximumId
  };
};