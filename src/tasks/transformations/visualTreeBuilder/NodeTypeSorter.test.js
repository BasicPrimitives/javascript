import NodeTypeSorter from './NodeTypeSorter';
import { ItemType } from "../../../enums";

test("Assistant node at null level", () => {
  var sorter = NodeTypeSorter();

  sorter.addChild(ItemType.Assistant, null, {name: 'A'});
  var result = sorter.getRow(ItemType.Assistant)
  var expected = [{name: 'A'}];
  expect(result).toEqual(expected);
});

test("Assistant node at undefined level", () => {
  var sorter = NodeTypeSorter();

  sorter.addChild(ItemType.Assistant, undefined, {name: 'A'});
  var result = sorter.getRow(ItemType.Assistant)
  var expected = [{name: 'A'}];
  expect(result).toEqual(expected);
});

test("Assistant node at negative level", () => {
  var sorter = NodeTypeSorter();

  sorter.addChild(ItemType.Assistant, -1, {name: 'A'});
  var result = sorter.getRow(ItemType.Assistant)
  var expected = [{name: 'A'}];
  expect(result).toEqual(expected);
});

test("Assistant node at level 5", () => {
  var sorter = NodeTypeSorter();

  sorter.addChild(ItemType.Assistant, 5, {name: 'A'});
  var result = sorter.getRow(ItemType.Assistant, 5)
  var expected = [{name: 'A'}];
  expect(result).toEqual(expected);
});

test("Adviser nodes at levels null, 4 and 5", () => {
  var sorter = NodeTypeSorter();

  sorter.addChild(ItemType.Adviser, null, {name: 'A'});
  sorter.addChild(ItemType.Adviser, 4, {name: 'B'});
  sorter.addChild(ItemType.Adviser, 5, {name: 'C'});
  var result = sorter.getRow(ItemType.Adviser)
  var expected = [{name: 'A'}, {name: 'B'}, {name: 'C'}];
  expect(result).toEqual(expected);
});

test("SubAssistants nodes at levels null, 3 and 4", () => {
  var sorter = NodeTypeSorter();

  sorter.addChild(ItemType.SubAssistant, null, {name: 'A'});
  sorter.addChild(ItemType.SubAssistant, 3, {name: 'B'});
  sorter.addChild(ItemType.SubAssistant, 4, {name: 'C'});
  var result = sorter.getRows(ItemType.SubAssistant)
  var expected = [[{name: 'A'}],,, [{name: 'B'}], [{name: 'C'}]];
  expect(result).toEqual(expected);
});