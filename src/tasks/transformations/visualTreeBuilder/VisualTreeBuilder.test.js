import VisualTreeBuilder from "./VisualTreeBuilder";
import Tree from "../../../algorithms/Tree";
import OrgItemConfig from "../../../configs/OrgItemConfig";
import OrgItem from "../../../models/OrgItem";
import { 
  ItemType,
  ChildrenPlacementType,
  HorizontalAlignmentType,
  AdviserPlacementType,
  SideFlag,
  Visibility,
  Enabled
} from "../../../enums";

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
    if(item.isActive) {
      acc[item.id] = item.id;
    }
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

function getLeftNode(visualTree, nodeId) {
  return visualTree.getChild(visualTree.parentid(nodeId), visualTree.indexOf(nodeId) - 1);
}

function getRightNode(visualTree, nodeId) {
  return visualTree.getChild(visualTree.parentid(nodeId), visualTree.indexOf(nodeId) + 1);
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
  var ip = getRightNode(visualTree, 1);
  expect(l[1] == l[2] && p[1] < p[2]).toBe(true);
  expect(visualTree.node(2).connectorPlacement).toBe(SideFlag.Top | SideFlag.Bottom);
  expect(ip.partners).toEqual([1,2]);
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
  var ip = getLeftNode(visualTree, 1);
  expect(l[1] == l[2] && p[1] > p[2]).toBe(true);
  expect(visualTree.node(2).connectorPlacement).toBe(SideFlag.Top | SideFlag.Bottom);
  expect(ip.partners).toEqual([1,2]);
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
  var ip = getRightNode(visualTree, 1);
  expect(ip.partners).toEqual([1,2]);
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

  var ip = getLeftNode(visualTree, 1);
  expect(ip.partners).toEqual([1,2]);
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

  var ip = getRightNode(visualTree, 1);
  expect(ip.partners).toEqual([1,2]);
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

  var ip = getLeftNode(visualTree, 1);
  expect(ip.partners).toEqual([1,2]);
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

test("Cross-branch aligned child should be at the same level", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "Auto created invisible root item" },
    { id: 1, parent: 0, name: "1"},
    { id: 2, parent: 1, name: "Branch 1" },
    { id: 3, parent: 1, name: "Branch 2" },
    { id: 4, parent: 2, name: "4", itemType: ItemType.Assistant },
    { id: 5, parent: 2, name: "5"},
    { id: 6, parent: 3, name: "6"},
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: true,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 2,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  expect(l[0] < l[2] && eqL(l, [2,3]) && l[2] < l[4] && l[4] < l[5] && eqL(l, [5,6])).toBe(true);
});

test("Cross-branch aligned child should be at the same level when assistants have children", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "Auto created invisible root item" },
    { id: 1, parent: 0, name: "1"},
    { id: 2, parent: 1, name: "Branch 1" },
    { id: 3, parent: 1, name: "Branch 2" },
    { id: 4, parent: 2, name: "4", itemType: ItemType.Assistant },
    { id: 5, parent: 2, name: "5"},
    { id: 6, parent: 3, name: "6"},
    { id: 7, parent: 4, name: "Extra child for Assistant"},
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: true,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  expect(l[0] < l[2] && eqL(l, [2,3]) && l[2] < l[4] && l[4] < l[5] && eqL(l, [5,6])).toBe(true);
  expect(l[7] < l[5]).toBe(true);
});

test("Cross-branch alignment Use Case", () => {
  var builder = VisualTreeBuilder();
  const items = [
    /* Branch 1 */
    { id: 0, parent: null, name: "Auto created invisible root item" },
    { id: 1,parent: 0, title: "Branch 1", childrenPlacementType: ChildrenPlacementType.Matrix },
    { id: 10, parent: 1, levelOffset: 0, title: "Child 1 at row 0" },
    { id: 11, parent: 1, levelOffset: 0, title: "Child 2 at row 0" },
    { id: 12, parent: 1, levelOffset: 1, title: "Child 3 at row 1" },
    { id: 13, parent: 1, levelOffset: 1, title: "Child 4 at row 1" },
    { id: 14, parent: 1, levelOffset: 1, title: "Child 5 at row 1" },
    { id: 15, parent: 1, levelOffset: 1, title: "Child 6 at row 1" },
    { id: 2, parent: 1, title: "Child 7" },
    { id: 3, parent: 1, title: "Child 8" },
    { id: 4, parent: 1, title: "Child 9" },
    { id: 5, parent: 1, title: "Child 10" },
    { id: 6, parent: 1, title: "Child 11" },
    { id: 7, parent: 1, title: "Child 12" },
    { id: 8, parent: 1, title: "Child 13" },
    { id: 9, parent: 1, title: "Child 14" },

    /* Branch 2 */
    { id: 101, parent: 0, title: "Branch 2" },
    { id: 102, parent: 101, levelOffset: 1, title: "Child 1 at row 1" },
    { id: 103, parent: 101, levelOffset: 1, title: "Child 2 at row 1", childrenPlacementType: ChildrenPlacementType.Vertical },
    { id: 104, parent: 103, title: "Sub Child 3" },
    { id: 105, parent: 103, title: "Sub Child 4" },
    { id: 106, parent: 101, title: "Child 3" },
    { id: 107, parent: 101, title: "Child 4" }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: true,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  expect(l[10] < l[12] && eqL(l, [10,11]) && eqL(l, [12,13,14,15,102,103]) && l[12] < l[2] && eqL(l, [2, 3, 4, 106, 107])).toBe(true);
});

test("Cross-branch aligned matrix children formation should not have empty trailing aggregators", () => {
  var builder = VisualTreeBuilder();
  const items = [
    /* Branch 1 */
    { id: 0, parent: null, name: "Auto created invisible root item" },
    /* matrix layout example */
    { id: 1, parent: 0, title: "Matrix Layout", childrenPlacementType: ChildrenPlacementType.Matrix },
    { id: 2, parent: 1, title: "Child 1" },
    { id: 3, parent: 1, title: "Child 2" },
    { id: 4, parent: 1, title: "Child 3" },
    { id: 5, parent: 1, title: "Child 4" },
    { id: 6, parent: 1, title: "Child 5" },
    { id: 7, parent: 1, title: "Child 6" },
    { id: 8, parent: 1, title: "Child 7" },
    { id: 9, parent: 1, title: "Child 8" },

    /* vertical layout example */
    { id: 101, parent: 0, title: "Vertical Layout", childrenPlacementType: ChildrenPlacementType.Vertical },
    { id: 102, parent: 101, title: "Child 1" },
    { id: 103, parent: 101, title: "Child 2", childrenPlacementType: ChildrenPlacementType.Vertical },
      { id: 104, parent: 103, title: "Sub Child 3" },
      { id: 105, parent: 103, title: "Sub Child 4" },
    { id: 106, parent: 101, title: "Child 5" }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: true,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  var va = getLeftNode(visualTree, 7);
  
  expect(eqL(l, [8,9,106]) && l[105] < l[106]).toBe(true);
  expect(visualTree.hasChildren(va.id)).toBe(false);
});

test("Cross-branch aligned vertical children formation should not have empty trailing aggregators", () => {
  var builder = VisualTreeBuilder();
  const items = [
    /* Branch 1 */
    { id: 0, parent: null, name: "Auto created invisible root item" },
    /* matrix layout example */
    { id: 1, parent: 0, title: "Matrix Layout", childrenPlacementType: ChildrenPlacementType.Matrix },
    { id: 2, parent: 1, title: "Child 1" },
    { id: 3, parent: 1, title: "Child 2" },
    { id: 4, parent: 1, title: "Child 3" },
    { id: 5, parent: 1, title: "Child 4" },
    { id: 6, parent: 1, title: "Child 5", childrenPlacementType: ChildrenPlacementType.Vertical },
      { id: 104, parent: 6, title: "Sub Child 3" },
      { id: 105, parent: 6, title: "Sub Child 4" },
    { id: 7, parent: 1, title: "Child 6" },
    { id: 8, parent: 1, title: "Child 7" },
    { id: 9, parent: 1, title: "Child 8" },

    /* vertical layout example */
    { id: 101, parent: 0, title: "Vertical Layout", childrenPlacementType: ChildrenPlacementType.Vertical },
    { id: 102, parent: 101, title: "Child 1" },
    { id: 103, parent: 101, title: "Child 2" }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: true,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  var va = getLeftNode(visualTree, 103);
  
  expect(l[105] < l[9]).toBe(true);
  expect(visualTree.hasChildren(va.id)).toBe(false);
});

test("Cross-branch alignment of assistants children", () => {
  var builder = VisualTreeBuilder();
  const items = [
    /* Branch 1 */
    { id: 0, parent: null, name: "Auto created invisible root item" },
    /* matrix layout example */
    { id: 2, parent: 0, title: "Child 1" },
    { id: 3, parent: 2, title: "Assistant 1", itemType: ItemType.Assistant },
    { id: 4, parent: 3, title: "Assistant of Assistant", itemType: ItemType.Assistant },
    { id: 5, parent: 3, title: "Child of Assistant 1" },

    { id: 6, parent: 0, title: "Child 2" },
    { id: 7, parent: 6, title: "Assistant 2", itemType: ItemType.Assistant },
    { id: 9, parent: 7, title: "Child of Assistant 2" }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: true,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  
  expect(l[2] < l[3] && l[3] < l[4] && l[4] < l[5] && eqL(l, [2, 6]) && eqL(l, [3, 7]) && eqL(l, [5, 9])).toBe(true);
});


test("2 level cross-branch alignment of assistants and row children at multiple levels", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "Auto created invisible root item" },
    { id: 2, parent: 0, title: "Child 1" },
      { id: 3, parent: 2, title: "Assistant of 1", levelOffset: 1, itemType: ItemType.Assistant },
      { id: 4, parent: 2, title: "Row Child 1 of 1", levelOffset: 3 },
      { id: 5, parent: 2, title: "Child 1 of 1" },
        { id: 6, parent: 5, title: "Assistant of 1-1", itemType: ItemType.Assistant },
        { id: 26, parent: 5, title: "Row Child 1 of 1-1", levelOffset: 1 },
        { id: 7, parent: 5, title: "Child 2 of 1-1" },
      { id: 8, parent: 2, title: "Child 2 of 1" },
        { id: 9, parent: 8, title: "Child 1 of 2-1" },

    { id: 10, parent: 0, title: "Child 2" },
      { id: 11, parent: 10, title: "Assistant of 2", itemType: ItemType.Assistant },
      { id: 12, parent: 10, title: "Row Child 1 of 2", levelOffset: 2 },
      { id: 13, parent: 10, title: "Child 1 of 2" },
        { id: 14, parent: 13, title: "Row Child 1 of 1-2", levelOffset: 2 },
        { id: 15, parent: 13, title: "Child 1 of 1-2" },
      { id: 16, parent: 10, title: "Child 2 of 2" },		
        { id: 17, parent: 16, title: "Assistant of 2-2", levelOffset: 3, itemType: ItemType.Assistant },
        { id: 18, parent: 16, title: "Child 1 of 2-2" },

    { id: 19, parent: 0, title: "Child 3" },
      { id: 20, parent: 19, title: "Row Child 1 of 3", levelOffset: 1 },
      { id: 21, parent: 19, title: "Child 1 of 3" },
        { id: 22, parent: 21, title: "Assistant of 1-3", levelOffset: 2, itemType: ItemType.Assistant },
        { id: 23, parent: 21, title: "Child 1 of 1-3" },
      { id: 24, parent: 19, title: "Child 2 of 3" },							
        { id: 25, parent: 24, title: "Child 1 of 2-3" }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: true,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  
  expect(eqL(l, [2, 10, 19]) && eqL(l, [5, 8, 13, 16, 21, 24]) && eqL(l, [7, 9, 15, 18, 23, 25])).toBe(true);
  expect(l[2] < l[5] && l[5] < l[7]).toBe(true);
  expect(l[2] < l[11] && l[11] < l[3] && l[3] < l[20] && l[20] < l[12] && l[12] < l[4] && l[4] < l[5]).toBe(true);
  expect(l[5] < l[6] && l[6] < l[22] && l[22] < l[17] && l[17] < l[26] && l[26] < l[14] && l[14] < l[7]).toBe(true);
});

test("Cross-branch aligned row children formation should not have empty trailing aggregators", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "Auto created invisible root item" },
    { id: 2, parent: 0, title: "Child 1" },
    { id: 4, parent: 2, title: "Row Child 1 of 1", levelOffset: 3 },
    { id: 5, parent: 2, title: "Child 1 of 1" },
    { id: 10, parent: 0, title: "Child 2" },
    { id: 12, parent: 10, title: "Row Child 1 of 2", levelOffset: 2 }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: true,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var va = getRightNode(visualTree, 12);
  
  expect(va).toBeUndefined();
});

test("Cross-branch aligned assistants should not have empty trailing aggregators", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "Auto created invisible root item" },
    { id: 2, parent: 0, title: "Child 1" },
    { id: 3, parent: 2, title: "Assistant of 1", levelOffset: 1, itemType: ItemType.Assistant },
    { id: 5, parent: 2, title: "Child 1 of 1" },
    { id: 10, parent: 0, title: "Child 2" },
    { id: 11, parent: 10, title: "Assistant of 2", itemType: ItemType.Assistant }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: true,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
   
  expect(visualTree.hasChildren(getLeftNode(visualTree, 11).id)).toBe(false);
});

test("Extending partners connection lines having advisers and assistants ", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0,
      parent: null,
      isVisible: false, 
      isActive: false, 
      itemType: ItemType.Regular, 
      name: "Auto created invisible root item",
      hideParentConnection: true,
      hideChildrenConnection: true,
      childrenPlacementType: ChildrenPlacementType.Horizontal
    },
    { id: 11, parent: 0, title: "Parent" },
    { id: 10, parent: 11, title: "10", placeAssistantsAboveChildren: Enabled.False }, // Should disregard this options    
    { id: 5, parent: 11, title: "Assistant", itemType: ItemType.Assistant, adviserPlacementType: AdviserPlacementType.Right },
    { id: 6, parent: 5, title: "Assistant's Child" },
    { id: 1, parent: 11, title: "LimitedPartner", itemType: ItemType.GeneralPartner, adviserPlacementType: AdviserPlacementType.Right },
    { id: 7, parent: 1, title: "Adviser", itemType: ItemType.Adviser, adviserPlacementType: AdviserPlacementType.Right },
    { id: 8, parent: 7, title: "Adviser's Child" },
    { id: 2, parent: 11, title: "Parent's Child" },
    { id: 3, parent: 2, title: "LimitedPartner", itemType: ItemType.LimitedPartner, adviserPlacementType: AdviserPlacementType.Right },
    { id: 4, parent: 2, title: "4" },
    { id: 9, parent: 11, title: "LimitedPartner", itemType: ItemType.LimitedPartner, adviserPlacementType: AdviserPlacementType.Right }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: true,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: true,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  expect(eqL(l, [11, 1, 7, 9]) && eqL(l, [3, 2])).toBe(true);
  expect(l[11] < l[8] && l[8] < l[5] && l[5] < l[6] && l[6] < l[2] && l[2] < l[4]).toBe(true);
  expect(visualTree.parent(2).partners.length).toBe(3);
});

test("Cross-branch alignment of Adviser and its parent's children ", () => {
  var builder = VisualTreeBuilder();
  const items = [
    { id: 0, parent: null, name: "Auto created invisible root item" },
    { id: 1, parent: 0, name: "1" },
    { id: 2, parent: 1, name: "2", itemType: ItemType.Adviser, adviserPlacementType: AdviserPlacementType.Right },
    { id: 3, parent: 1, name: "3", itemType: ItemType.Assistant, adviserPlacementType: AdviserPlacementType.Right },
    { id: 4, parent: 1, name: "4" },
    { id: 5, parent: 2, name: "5" }
  ];
  var { visualTree, navigationFamily } = builder.build(
    getOrgTree(items),
    getMaximumId(items),
    getActiveItems(items),
    {
      alignBranches: true,
      childrenPlacementType: ChildrenPlacementType.Horizontal,
      horizontalAlignment: HorizontalAlignmentType.Center,
      leavesPlacementType: ChildrenPlacementType.Horizontal,
      maximumColumnsInMatrix: 3,
      placeAdvisersAboveChildren: false,
      placeAssistantsAboveChildren: true,
    }
  );
  var l = getLevels(visualTree);
  expect(eqL(l, [4, 5]) && l[1] < l[3] && l[3] < l[4]).toBe(true);
});