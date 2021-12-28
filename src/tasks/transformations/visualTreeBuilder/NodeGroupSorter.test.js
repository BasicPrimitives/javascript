import NodeGroupSorter from './NodeGroupSorter';
import { ItemType } from "../../../enums";
import { GroupType } from './enums';

test("Adviser and Sub Adviser nodes at various levels", () => {
  var sorter = NodeGroupSorter();

  sorter.addChild(ItemType.Adviser, 2, {name: 'A'});
  sorter.addChild(ItemType.SubAdviser, 4, {name: 'B'});
  var result = sorter.getRow(GroupType.Items)
  var expected = [{name: 'A'}, {name: 'B'}];
  expect(result).toEqual(expected);
});

test("Assistant and Sub Assistant nodes at null level", () => {
  var sorter = NodeGroupSorter();

  sorter.addChild(ItemType.Assistant, null, {name: 'A'});
  sorter.addChild(ItemType.SubAssistant, null, {name: 'B'});
  var result = sorter.getRow(GroupType.Assistants)
  var expected = [{name: 'A'}, {name: 'B'}];
  expect(result).toEqual(expected);
});

test("Assistant nodes at null and 2 level", () => {
  var sorter = NodeGroupSorter();

  sorter.addChild(ItemType.Assistant, null, {name: 'A'});
  sorter.addChild(ItemType.Assistant, 2, {name: 'B'});
  var result = sorter.getRow(GroupType.Assistants)
  var expected = [{name: 'A'}];
  expect(result).toEqual(expected);
});

test("Assistant nodes at null level", () => {
  var sorter = NodeGroupSorter();

  sorter.addChild(ItemType.Assistant, null, {name: 'A'});
  sorter.addChild(ItemType.Assistant, 2, {name: 'B'});
  var result = sorter.getRow(GroupType.Assistants, 2)
  var expected = [{name: 'B'}];
  expect(result).toEqual(expected);
});

test("Assistant nodes at level 2", () => {
  var sorter = NodeGroupSorter();

  sorter.addChild(ItemType.Assistant, null, {name: 'A'});
  sorter.addChild(ItemType.Assistant, 2, {name: 'B'});
  var result = sorter.getRow(GroupType.Assistants, 2)
  var expected = [{name: 'B'}];
  expect(result).toEqual(expected);
});

test("Assistant nodes at level null and 2", () => {
  var sorter = NodeGroupSorter();

  sorter.addChild(ItemType.Assistant, 2, {name: 'B'});
  sorter.addChild(ItemType.SubAssistant, null, {name: 'A'});
  sorter.addChild(ItemType.GeneralPartner, null, {name: 'LP'});
  var result = sorter.getRows(GroupType.Assistants)
  var expected = [[{name: 'A'}],,[{name: 'B'}]];
  expect(result).toEqual(expected);
});

test("Regular nodes at level null and 2", () => {
  var sorter = NodeGroupSorter();

  sorter.addChild(ItemType.Regular, null, {name: 'A'});
  sorter.addChild(ItemType.Regular, 0, {name: 'B'});
  sorter.addChild(ItemType.Regular, 1, {name: 'C'});
  var result = sorter.getRows(GroupType.RowChildren)
  var expected = [[{name: 'B'}],[{name: 'C'}]];
  expect(result).toEqual(expected);

  result = sorter.getRow(GroupType.Children)
  expected = [{name: 'A'}];
  expect(result).toEqual(expected);
});

test("Adviser and SubAdviser nodes at various levels", () => {
  var sorter = NodeGroupSorter();

  sorter.addChild(ItemType.Adviser, 2, {name: 'A'});
  sorter.addChild(ItemType.SubAdviser, null, {name: 'B'});
  sorter.addChild(ItemType.Regular, null, {name: 'R'});
  var result = sorter.getRow(GroupType.Items)
  var expected = [{name: 'A'}, {name: 'B'}];
  expect(result).toEqual(expected);
});

test("Groups length for regular children", () => {
  var sorter = NodeGroupSorter();

  sorter.addChild(ItemType.Regular, null, {name: 'R'});
  var result = sorter.getLength();
  expect(result).toEqual(GroupType.Children + 1);
});

test("Groups length for row children", () => {
  var sorter = NodeGroupSorter();

  sorter.addChild(ItemType.Regular, 2, {name: 'R'});
  var result = sorter.getLength();
  expect(result).toEqual(GroupType.RowChildren + 1);
});

test("Groups length for assistants", () => {
  var sorter = NodeGroupSorter();

  sorter.addChild(ItemType.SubAssistant, 2, {name: 'R'});
  var result = sorter.getLength();
  expect(result).toEqual(GroupType.Assistants + 1);
});
