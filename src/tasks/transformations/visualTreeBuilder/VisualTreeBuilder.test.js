import VisualTreeBuilder from "./VisualTreeBuilder";
import Tree from "../../../algorithms/Tree";
import OrgItemConfig from "../../../configs/OrgItemConfig";
import OrgItem from "../../../models/OrgItem";
import { ItemType, ChildrenPlacementType, HorizontalAlignmentType, AdviserPlacementType, SideFlag, Visibility } from "../../../enums";

function getOrgTree(items) {
  const tree = Tree();
  for (var index = 0; index < items.length; index += 1) {
    var item = new OrgItem(new OrgItemConfig(items[index]));
    tree.add(item.parent, item.id, item);
  }
  return tree;
}

function getActiveItems(items) {
  return items.reduce((acc, item) => {
    acc[item.id] = item.id;
    return acc;
  }, {});
}

function getMaximumId(items) {
  return items.reduce((maximum, item) => Math.max(maximum, item.id), 0) + 1;
}

function getLevels(tree) {
  var levels = {};
  tree.loopLevels(this, function (nodeId, node, levelId) {
    levels[nodeId] = levelId;
  });
  return levels;
}

function getPositions(tree) {
  var positions = {};
  var currentLevelId = null;
  var index = 0;
  tree.loopLevels(this, function (nodeId, node, levelId) {
    if(currentLevelId != levelId) {
      currentLevelId = levelId;
      index = 0;
    }
    positions[nodeId] = index;
    index+=1;
  });
  return positions;
}

function eqL(levels, items) {
  var result = true;
  for(var index = 1; index < items.length; index+=1) {
    result = result && levels[items[index-1]] == levels[items[index]];
  }
  return result;
}

test("Horizontal children layout", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "0", itemType: ItemType.Regular },
    { id: 1, parent: 0, name: "1", itemType: ItemType.Regular },
    { id: 2, parent: 0, name: "2", itemType: ItemType.Regular },
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 6,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  expect(l[1] == l[2] && l[0] < l[1]).toBe(true);
  expect(visualTree.node(2).connectorPlacement).toBe(SideFlag.Top | SideFlag.Bottom);
});

test("leaves vertical layout on right", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "0", itemType: ItemType.Regular },
    { id: 1, parent: 0, name: "1", itemType: ItemType.Regular },
    { id: 2, parent: 0, name: "2", itemType: ItemType.Regular },
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Vertical,
      maximumColumnsInMatrix: 6,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  expect(l[0] < l[1] && l[1] < l[2]).toBe(true);
  expect(visualTree.node(1).connectorPlacement).toBe(SideFlag.Left | SideFlag.Bottom);
});

test("leaves vertical layout on left", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "0", itemType: ItemType.Regular },
    { id: 1, parent: 0, name: "1", itemType: ItemType.Regular },
    { id: 2, parent: 0, name: "2", itemType: ItemType.Regular },
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Right,
      leavesPlacementType: ChildrenPlacementType.Vertical,
      maximumColumnsInMatrix: 6,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  expect(l[0] < l[1] && l[1] < l[2]).toBe(true);
  expect(visualTree.node(1).connectorPlacement).toBe(SideFlag.Right | SideFlag.Bottom);
});

test("Node's children vertical layout", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "0", itemType: ItemType.Regular, childrenPlacementType: ChildrenPlacementType.Vertical },
    { id: 1, parent: 0, name: "1", itemType: ItemType.Regular },
    { id: 2, parent: 0, name: "2", itemType: ItemType.Regular },
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 6,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  expect(l[0] < l[1] && l[1] < l[2]).toBe(true);
});

test("Children matrix 3x3  layout", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "0", itemType: ItemType.Regular, childrenPlacementType: ChildrenPlacementType.Matrix },
    { id: 1, parent: 0, name: "1", itemType: ItemType.Regular },
    { id: 2, parent: 0, name: "2", itemType: ItemType.Regular },
    { id: 3, parent: 0, name: "3", itemType: ItemType.Regular },
    { id: 4, parent: 0, name: "4", itemType: ItemType.Regular },
    { id: 5, parent: 0, name: "5", itemType: ItemType.Regular },
    { id: 6, parent: 0, name: "6", itemType: ItemType.Regular },
    { id: 7, parent: 0, name: "7", itemType: ItemType.Regular },
    { id: 8, parent: 0, name: "8", itemType: ItemType.Regular },
    { id: 9, parent: 0, name: "9", itemType: ItemType.Regular }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  expect(l[0] < l[1] && l[1] < l[4] && l[4] < l[7] && eqL(l, [1,2,3]) && eqL(l, [4,5,6]) && eqL(l, [7,8,9])).toBe(true);
  expect(visualTree.node(1).connectorPlacement).toBe(SideFlag.Right | SideFlag.Bottom);
  expect(visualTree.node(2).connectorPlacement).toBe(SideFlag.Left | SideFlag.Bottom);
});

test("Children matrix 4x4  layout", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "0", itemType: ItemType.Regular, childrenPlacementType: ChildrenPlacementType.Matrix },
    { id: 1, parent: 0, name: "1", itemType: ItemType.Regular },
    { id: 2, parent: 0, name: "2", itemType: ItemType.Regular },
    { id: 3, parent: 0, name: "3", itemType: ItemType.Regular },
    { id: 4, parent: 0, name: "4", itemType: ItemType.Regular },
    { id: 5, parent: 0, name: "5", itemType: ItemType.Regular },
    { id: 6, parent: 0, name: "6", itemType: ItemType.Regular },
    { id: 7, parent: 0, name: "7", itemType: ItemType.Regular },
    { id: 8, parent: 0, name: "8", itemType: ItemType.Regular },
    { id: 9, parent: 0, name: "9", itemType: ItemType.Regular },
    { id: 10, parent: 0, name: "10", itemType: ItemType.Regular },
    { id: 11, parent: 0, name: "11", itemType: ItemType.Regular },
    { id: 12, parent: 0, name: "12", itemType: ItemType.Regular },
    { id: 13, parent: 0, name: "13", itemType: ItemType.Regular },
    { id: 14, parent: 0, name: "14", itemType: ItemType.Regular },
    { id: 15, parent: 0, name: "15", itemType: ItemType.Regular },
    { id: 16, parent: 0, name: "16", itemType: ItemType.Regular }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 4,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  expect(l[0] < l[1] && l[1] < l[5] && l[5] < l[9] && eqL(l, [1,2,3,4]) && eqL(l, [5,6,7,8]) && eqL(l, [9,10,11,12]) && eqL(l, [13,14,15,16])).toBe(true);
});

test("Adviser on right", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "Auto created invisible root item" },
    { id: 1, parent: 0, name: "1" },
    { id: 2, parent: 1, name: "2", itemType: ItemType.Adviser, adviserPlacementType: AdviserPlacementType.Right }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  var p = getPositions(visualTree);
  expect(l[1] == l[2] && p[1] < p[2]).toBe(true);
  expect(visualTree.node(2).connectorPlacement).toBe(SideFlag.Left | SideFlag.Bottom);
});

test("Adviser on left", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "Auto created invisible root item" },
    { id: 1, parent: 0, name: "1" },
    { id: 2, parent: 1, name: "2", itemType: ItemType.Adviser, adviserPlacementType: AdviserPlacementType.Left }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  var p = getPositions(visualTree);
  expect(l[1] == l[2] && p[1] > p[2]).toBe(true);
  expect(visualTree.node(2).connectorPlacement).toBe(SideFlag.Right | SideFlag.Bottom);
});

test("Assistant on right", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "Auto created invisible root item" },
    { id: 1, parent: 0, name: "1" },
    { id: 2, parent: 1, name: "2", itemType: ItemType.Assistant, adviserPlacementType: AdviserPlacementType.Right }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  var p = getPositions(visualTree);
  var vaId = visualTree.node(1).visualAggregatorId;
  expect(l[1] < l[2] && l[vaId] == l[2] && p[vaId] < p[2]).toBe(true);
  expect(visualTree.node(2).connectorPlacement).toBe(SideFlag.Left | SideFlag.Bottom);
  expect(visualTree.node(vaId).connectorPlacement).toBe(SideFlag.Top | SideFlag.Bottom);
});

test("Assistant on left", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "Auto created invisible root item" },
    { id: 1, parent: 0, name: "1" },
    { id: 2, parent: 1, name: "2", itemType: ItemType.Assistant, adviserPlacementType: AdviserPlacementType.Left }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  var p = getPositions(visualTree);
  var vaId = visualTree.node(1).visualAggregatorId;
  expect(l[1] < l[2] && l[vaId] == l[2] && p[vaId] > p[2]).toBe(true);
  expect(visualTree.node(2).connectorPlacement).toBe(SideFlag.Right | SideFlag.Bottom);
  expect(visualTree.node(vaId).connectorPlacement).toBe(SideFlag.Top | SideFlag.Bottom);
});

test("Assistant is below parent and above children", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "Auto created invisible root item" },
    { id: 1, parent: 0, name: "1" },
    { id: 2, parent: 1, name: "2", itemType: ItemType.Assistant, adviserPlacementType: AdviserPlacementType.Right },
    { id: 3, parent: 1, name: "3" }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  expect(l[1] < l[2] && l[2] < l[3]).toBe(true);
});

test("Assistant's child is below assistant and above parent's child", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "Auto created invisible root item" },
    { id: 1, parent: 0, name: "1" },
    { id: 2, parent: 1, name: "2", itemType: ItemType.Assistant, adviserPlacementType: AdviserPlacementType.Right },
    { id: 3, parent: 2, name: "Assistant's child" },
    { id: 4, parent: 1, name: "Parent's child" }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  expect(l[2] < l[3] && l[3] < l[4]).toBe(true);
});

test("Assistant's child is at the same level as parent's child", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "Auto created invisible root item" },
    { id: 1, parent: 0, name: "1" },
    { id: 2, parent: 1, name: "2", itemType: ItemType.Assistant, adviserPlacementType: AdviserPlacementType.Right },
    { id: 3, parent: 2, name: "Assistant's child" },
    { id: 4, parent: 1, name: "Parent's child" }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: false,
    }
  );
  var l = getLevels(visualTree);
  var p = getPositions(visualTree);
  expect(l[2] < l[3] && l[3] == l[4] && p[3] > p[4]).toBe(true);
});

test("Second level Assistant's child is below assistant and above parent's child", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "Auto created invisible root item" },
    { id: 1, parent: 0, name: "1" },
    { id: 2, parent: 1, name: "Assistant at Level 1", levelOffset: 0, itemType: ItemType.Assistant, adviserPlacementType: AdviserPlacementType.Right },
    { id: 3, parent: 2, name: "Assistant's child 1" },
    { id: 4, parent: 1, name: "Assistant at Level 2", levelOffset: 1, itemType: ItemType.Assistant, adviserPlacementType: AdviserPlacementType.Right },
    { id: 5, parent: 4, name: "Assistant's child 2" },
    { id: 6, parent: 1, name: "Parent's child" }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  expect(l[1] < l[2] && l[2] < l[3] && l[3] < l[4] && l[4] < l[5] && l[5] < l[6]).toBe(true);
});

test("Second level Assistant's child is at the same level as parent's child", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "Auto created invisible root item" },
    { id: 1, parent: 0, name: "1" },
    { id: 2, parent: 1, name: "Assistant at Level 1", levelOffset: 0, itemType: ItemType.Assistant, adviserPlacementType: AdviserPlacementType.Right },
    { id: 3, parent: 2, name: "Assistant's child 1" },
    { id: 4, parent: 1, name: "Assistant at Level 2", levelOffset: 1, itemType: ItemType.Assistant, adviserPlacementType: AdviserPlacementType.Right },
    { id: 5, parent: 4, name: "Assistant's child 2" },
    { id: 6, parent: 1, name: "Parent's child" }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: false,
    }
  );
  var l = getLevels(visualTree);
  var p = getPositions(visualTree);
  expect(l[1] < l[2] && l[2] < l[3] && l[2] < l[4] && l[3] == l[4] && l[4] < l[5] && l[4] < l[6] && l[5] == l[6]).toBe(true);
});

test("Adviser's child is below parent and above parent's child", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "Auto created invisible root item" },
    { id: 1, parent: 0, name: "Parent" },
    { id: 2, parent: 1, name: "Adviser", itemType: ItemType.Adviser, adviserPlacementType: AdviserPlacementType.Right },
    { id: 3, parent: 2, name: "Adviser's child" },
    { id: 4, parent: 1, name: "Parent's child" }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  var p = getPositions(visualTree);
  expect(l[1] < l[3] && l[3] < l[4]).toBe(true);
});

test("Adviser's child is at the same level as parent's child", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "Auto created invisible root item" },
    { id: 1, parent: 0, name: "Parent" },
    { id: 2, parent: 1, name: "Adviser", itemType: ItemType.Adviser, adviserPlacementType: AdviserPlacementType.Right },
    { id: 3, parent: 2, name: "Adviser's child" },
    { id: 4, parent: 1, name: "Parent's child" }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: false,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  var p = getPositions(visualTree);
  expect(l[1] < l[3] && l[3] == l[4] && p[3] > p[4]).toBe(true);
});

test("Sub Adviser on right", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "Auto created invisible root item" },
    { id: 1, parent: 0, name: "1" },
    { id: 2, parent: 1, name: "2", itemType: ItemType.SubAdviser, adviserPlacementType: AdviserPlacementType.Right }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  var p = getPositions(visualTree);
  var vp = visualTree.parent(2);
  expect(l[1] < l[2] && p[1] < p[vp.id]).toBe(true);
  expect(visualTree.node(2).connectorPlacement).toBe(SideFlag.Top | SideFlag.Bottom);
  expect(visualTree.node(vp.id).connectorPlacement).toBe(SideFlag.Left | SideFlag.Bottom);
});

test("Sub Adviser on left", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "Auto created invisible root item" },
    { id: 1, parent: 0, name: "1" },
    { id: 2, parent: 1, name: "2", itemType: ItemType.SubAdviser, adviserPlacementType: AdviserPlacementType.Left }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  var p = getPositions(visualTree);
  var vp = visualTree.parent(2);
  expect(l[1] < l[2] && p[1] > p[vp.id]).toBe(true);
  expect(visualTree.node(2).connectorPlacement).toBe(SideFlag.Top | SideFlag.Bottom);
  expect(visualTree.node(vp.id).connectorPlacement).toBe(SideFlag.Right | SideFlag.Bottom);
});

test("Sub Assistant on right", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 1, parent: 0, name: "1" },
    { id: 2, parent: 1, name: "2", itemType: ItemType.SubAssistant, adviserPlacementType: AdviserPlacementType.Right }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  var p = getPositions(visualTree);
  var vp = visualTree.parent(2);
  var vaId = visualTree.node(1).visualAggregatorId;
  expect(l[1] < l[vp.id] && l[vp.id] < l[2] && l[vaId] == l[vp.id] && p[vaId] < p[vp.id]).toBe(true);
  expect(visualTree.node(2).connectorPlacement).toBe(SideFlag.Top | SideFlag.Bottom);
  expect(visualTree.node(vp.id).connectorPlacement).toBe(SideFlag.Left | SideFlag.Bottom);
  expect(visualTree.node(vaId).connectorPlacement).toBe(SideFlag.Top | SideFlag.Bottom);
});

test("Sub Assistant on left", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 1, parent: 0, name: "1" },
    { id: 2, parent: 1, name: "2", itemType: ItemType.SubAssistant, adviserPlacementType: AdviserPlacementType.Left }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  var p = getPositions(visualTree);
  var vp = visualTree.parent(2);
  var vaId = visualTree.node(1).visualAggregatorId;
  expect(l[1] < l[vp.id] && l[vp.id] < l[2] && l[vaId] == l[vp.id] && p[vaId] > p[vp.id]).toBe(true);
  expect(visualTree.node(2).connectorPlacement).toBe(SideFlag.Top | SideFlag.Bottom);
  expect(visualTree.node(vp.id).connectorPlacement).toBe(SideFlag.Right | SideFlag.Bottom);
  expect(visualTree.node(vaId).connectorPlacement).toBe(SideFlag.Top | SideFlag.Bottom);
});

test("Sub Assistant is above parent's child", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 1, parent: 0, name: "1" },
    { id: 2, parent: 1, name: "2", itemType: ItemType.SubAssistant, adviserPlacementType: AdviserPlacementType.Right },
    { id: 3, parent: 1, name: "Parent's child" },
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  var p = getPositions(visualTree);
  var vp = visualTree.parent(2);
  var vaId = visualTree.node(1).visualAggregatorId;
  expect(l[1] < l[2] && l[2] < l[3]).toBe(true);
});

test("Sub Assistant is at the same level as parent's child", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 1, parent: 0, name: "1" },
    { id: 2, parent: 1, name: "2", itemType: ItemType.SubAssistant, adviserPlacementType: AdviserPlacementType.Right },
    { id: 3, parent: 1, name: "Parent's child" },
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: false,
    }
  );
  var l = getLevels(visualTree);
  expect(l[1] < l[2] && l[2] == l[3]).toBe(true);
});

test("Sub Adviser is above parent's child", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "Auto created invisible root item" },
    { id: 1, parent: 0, name: "1" },
    { id: 2, parent: 1, name: "2", itemType: ItemType.SubAdviser, adviserPlacementType: AdviserPlacementType.Right },
    { id: 3, parent: 1, name: "Parent's child" }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  expect(l[1] < l[2] && l[2] < l[3] ).toBe(true);
});

test("Sub Adviser is at the same level as parent's child", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "Auto created invisible root item" },
    { id: 1, parent: 0, name: "1" },
    { id: 2, parent: 1, name: "2", itemType: ItemType.SubAdviser, adviserPlacementType: AdviserPlacementType.Right },
    { id: 3, parent: 1, name: "Parent's child" }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: false,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  expect(l[1] < l[2] && l[2] == l[3] ).toBe(true);
});

test("General Partner on right", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "Auto created invisible root item" },
    { id: 1, parent: 0, name: "1" },
    { id: 2, parent: 1, name: "2", itemType: ItemType.GeneralPartner, adviserPlacementType: AdviserPlacementType.Right }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  var p = getPositions(visualTree);
  expect(l[1] == l[2] && p[1] < p[2]).toBe(true);
  expect(visualTree.node(2).connectorPlacement).toBe(SideFlag.Top | SideFlag.Bottom);
});

test("General Partner on left", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "Auto created invisible root item" },
    { id: 1, parent: 0, name: "1" },
    { id: 2, parent: 1, name: "2", itemType: ItemType.GeneralPartner, adviserPlacementType: AdviserPlacementType.Left }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  var p = getPositions(visualTree);
  expect(l[1] == l[2] && p[1] > p[2]).toBe(true);
  expect(visualTree.node(2).connectorPlacement).toBe(SideFlag.Top | SideFlag.Bottom);
});

test("General Partner on right with shared child", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "Auto created invisible root item" },
    { id: 1, parent: 0, name: "1" },
    { id: 2, parent: 1, name: "2", itemType: ItemType.GeneralPartner, adviserPlacementType: AdviserPlacementType.Right },
    { id: 3, parent: 1, name: "3" }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  var p = getPositions(visualTree);
  var ipId = visualTree.parentid(3);
  expect(l[1] == l[2] && p[1] < p[2] && p[ipId] > p[1] && p[ipId] < p[2] && l[1] == l[ipId] && l[1] < l[3]).toBe(true);
  expect(visualTree.node(1).connectorPlacement).toBe(SideFlag.Top | SideFlag.Bottom);
  expect(visualTree.node(2).connectorPlacement).toBe(SideFlag.Top | SideFlag.Bottom);
  expect(visualTree.node(3).connectorPlacement).toBe(SideFlag.Top | SideFlag.Bottom);
  expect(visualTree.node(ipId).connectorPlacement).toBe(0);
});

test("General Partner on left with shared child", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "Auto created invisible root item" },
    { id: 1, parent: 0, name: "1" },
    { id: 2, parent: 1, name: "2", itemType: ItemType.GeneralPartner, adviserPlacementType: AdviserPlacementType.Left },
    { id: 3, parent: 1, name: "3" }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  var p = getPositions(visualTree);
  var ipId = visualTree.parentid(3);
  expect(l[1] == l[2] && p[1] > p[2] && p[ipId] < p[1] && p[ipId] > p[2] && l[1] == l[ipId] && l[1] < l[3]).toBe(true);
  expect(visualTree.node(1).connectorPlacement).toBe(SideFlag.Top | SideFlag.Bottom);
  expect(visualTree.node(2).connectorPlacement).toBe(SideFlag.Top | SideFlag.Bottom);
  expect(visualTree.node(3).connectorPlacement).toBe(SideFlag.Top | SideFlag.Bottom);
  expect(visualTree.node(ipId).connectorPlacement).toBe(0);
});

test("Limited Partner on right", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "Auto created invisible root item" },
    { id: 1, parent: 0, name: "1" },
    { id: 2, parent: 1, name: "2", itemType: ItemType.LimitedPartner, adviserPlacementType: AdviserPlacementType.Right }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  var p = getPositions(visualTree);
  expect(l[1] == l[2] && p[1] < p[2]).toBe(true);
  expect(visualTree.node(2).connectorPlacement).toBe(SideFlag.Bottom);
});

test("Limited Partner on left", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "Auto created invisible root item" },
    { id: 1, parent: 0, name: "1" },
    { id: 2, parent: 1, name: "2", itemType: ItemType.LimitedPartner, adviserPlacementType: AdviserPlacementType.Left }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  var p = getPositions(visualTree);
  expect(l[1] == l[2] && p[1] > p[2]).toBe(true);
  expect(visualTree.node(2).connectorPlacement).toBe(SideFlag.Bottom);
});

test("Limited Partner on right with shared child", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "Auto created invisible root item" },
    { id: 1, parent: 0, name: "1" },
    { id: 2, parent: 1, name: "2", itemType: ItemType.LimitedPartner, adviserPlacementType: AdviserPlacementType.Right },
    { id: 3, parent: 1, name: "3" }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  var p = getPositions(visualTree);
  var ipId = visualTree.parentid(3);
  expect(l[1] == l[2] && p[1] < p[2] && p[ipId] > p[1] && p[ipId] < p[2] && l[1] == l[ipId] && l[1] < l[3]).toBe(true);
  expect(visualTree.node(1).connectorPlacement).toBe(SideFlag.Top | SideFlag.Bottom);
  expect(visualTree.node(2).connectorPlacement).toBe(SideFlag.Bottom);
  expect(visualTree.node(3).connectorPlacement).toBe(SideFlag.Top | SideFlag.Bottom);
  expect(visualTree.node(ipId).connectorPlacement).toBe(0);
});

test("Limited Partner on left with shared child", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "Auto created invisible root item" },
    { id: 1, parent: 0, name: "1" },
    { id: 2, parent: 1, name: "2", itemType: ItemType.LimitedPartner, adviserPlacementType: AdviserPlacementType.Left },
    { id: 3, parent: 1, name: "3" }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  var p = getPositions(visualTree);
  var ipId = visualTree.parentid(3);
  expect(l[1] == l[2] && p[1] > p[2] && p[ipId] < p[1] && p[ipId] > p[2] && l[1] == l[ipId] && l[1] < l[3]).toBe(true);
  expect(visualTree.node(1).connectorPlacement).toBe(SideFlag.Top | SideFlag.Bottom);
  expect(visualTree.node(2).connectorPlacement).toBe(SideFlag.Bottom);
  expect(visualTree.node(3).connectorPlacement).toBe(SideFlag.Top | SideFlag.Bottom);
  expect(visualTree.node(ipId).connectorPlacement).toBe(0);
});

test("Adviser Partner on right", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "Auto created invisible root item" },
    { id: 1, parent: 0, name: "1" },
    { id: 2, parent: 1, name: "2", itemType: ItemType.AdviserPartner, adviserPlacementType: AdviserPlacementType.Right }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  var p = getPositions(visualTree);
  expect(l[1] == l[2] && p[1] < p[2]).toBe(true);
  expect(visualTree.node(2).connectorPlacement).toBe(SideFlag.Left | SideFlag.Bottom);
});

test("Adviser Partner on left", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "Auto created invisible root item" },
    { id: 1, parent: 0, name: "1" },
    { id: 2, parent: 1, name: "2", itemType: ItemType.AdviserPartner, adviserPlacementType: AdviserPlacementType.Left }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  var p = getPositions(visualTree);
  expect(l[1] == l[2] && p[1] > p[2]).toBe(true);
  expect(visualTree.node(2).connectorPlacement).toBe(SideFlag.Right |SideFlag.Bottom);
});

test("Adviser Partner on right with shared child", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "Auto created invisible root item" },
    { id: 1, parent: 0, name: "1" },
    { id: 2, parent: 1, name: "2", itemType: ItemType.AdviserPartner, adviserPlacementType: AdviserPlacementType.Right },
    { id: 3, parent: 1, name: "3" }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  var p = getPositions(visualTree);
  var ipId = visualTree.parentid(3);
  expect(l[1] == l[2] && p[1] < p[2] && p[ipId] > p[1] && p[ipId] < p[2] && l[1] == l[ipId] && l[1] < l[3]).toBe(true);
  expect(visualTree.node(1).connectorPlacement).toBe(SideFlag.Top | SideFlag.Bottom);
  expect(visualTree.node(2).connectorPlacement).toBe(SideFlag.Left | SideFlag.Bottom);
  expect(visualTree.node(3).connectorPlacement).toBe(SideFlag.Top | SideFlag.Bottom);
  expect(visualTree.node(ipId).connectorPlacement).toBe(SideFlag.Left);
});

test("Adviser Partner on left with shared child", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "Auto created invisible root item" },
    { id: 1, parent: 0, name: "1" },
    { id: 2, parent: 1, name: "2", itemType: ItemType.AdviserPartner, adviserPlacementType: AdviserPlacementType.Left },
    { id: 3, parent: 1, name: "3" }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  var p = getPositions(visualTree);
  var ipId = visualTree.parentid(3);
  expect(l[1] == l[2] && p[1] > p[2] && p[ipId] < p[1] && p[ipId] > p[2] && l[1] == l[ipId] && l[1] < l[3]).toBe(true);
  expect(visualTree.node(1).connectorPlacement).toBe(SideFlag.Top | SideFlag.Bottom);
  expect(visualTree.node(2).connectorPlacement).toBe(SideFlag.Right | SideFlag.Bottom);
  expect(visualTree.node(3).connectorPlacement).toBe(SideFlag.Top | SideFlag.Bottom);
  expect(visualTree.node(ipId).connectorPlacement).toBe(SideFlag.Right);
});

test("Invisible parent connections", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "Invisible parent", isVisible: false },
    { id: 1, parent: 0, name: "1" }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 2,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  expect(visualTree.node(0).connectorPlacement).toBe(0);
  expect(visualTree.node(0).visibility).toBe(Visibility.Invisible);
});

test("Children matrix 2x2 with invisible parent", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "0", isVisible: false, itemType: ItemType.Regular, childrenPlacementType: ChildrenPlacementType.Matrix },
    { id: 1, parent: 0, name: "1", itemType: ItemType.Regular },
    { id: 2, parent: 0, name: "2", itemType: ItemType.Regular },
    { id: 3, parent: 0, name: "3", itemType: ItemType.Regular },
    { id: 4, parent: 0, name: "4", itemType: ItemType.Regular }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 2,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  expect(l[0] < l[1] && l[1] < l[3] && eqL(l, [1,2]) && eqL(l, [3, 4])).toBe(true);
  expect(visualTree.node(1).connectorPlacement).toBe(SideFlag.Bottom);
  expect(visualTree.node(2).connectorPlacement).toBe(SideFlag.Bottom);
  expect(visualTree.node(3).connectorPlacement).toBe(SideFlag.Bottom);
  expect(visualTree.node(4).connectorPlacement).toBe(SideFlag.Bottom);
});

test("Hide connections of Invisible root nodes", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "Auto created invisible root item", isVisible: false },
    { id: 1, parent: 0, name: "1"},
    { id: 2, parent: 1, name: "2", isVisible: false },
    { id: 3, parent: 2, name: "3" }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 2,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  expect(visualTree.node(1).connectorPlacement).toBe(SideFlag.Top | SideFlag.Bottom);
  expect(visualTree.node(2).connectorPlacement).toBe(SideFlag.Top | SideFlag.Bottom);
  expect(visualTree.node(3).connectorPlacement).toBe(SideFlag.Top | SideFlag.Bottom);
  expect(visualTree.node(2).visibility).toBe(Visibility.Invisible);
});

test("Trim trailing invisible nodes", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "Auto created invisible root item" },
    { id: 1, parent: 0, name: "1"},
    { id: 2, parent: 1, name: "2", isVisible: false },
    { id: 3, parent: 2, name: "3", isVisible: false }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: false,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 2,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  expect(visualTree.node(1).connectorPlacement).toBe(SideFlag.Top | SideFlag.Bottom);
  expect(visualTree.node(2)).toBe(undefined);
  expect(visualTree.node(3)).toBe(undefined);
});

