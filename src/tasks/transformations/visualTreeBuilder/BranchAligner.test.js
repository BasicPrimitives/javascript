import BranchAligner from './BranchAligner';
import { ItemType } from "../../../enums";
import { RowType, GroupType } from './enums';

test("Size of assistants row", () => {
  var branchAligner = BranchAligner();

  branchAligner.addChild(0, [{id: 1}], RowType.Assistants, 0, 0, false)
  branchAligner.align();
  var result = branchAligner.getRowDepth(0, GroupType.Assistants, 0)
  expect(result).toEqual(1);
});

test("Size of assistants group having regular children w/out row extension", () => {
  var branchAligner = BranchAligner();

  branchAligner.addChild(0, [{id: 1}], RowType.Assistants, 0, 0, false)
  branchAligner.addChild(1, [{id: 2}], RowType.RowChildren, 0, 0, false)
  branchAligner.align();
  var result = branchAligner.getRowDepth(0, GroupType.Assistants, 0)
  expect(result).toEqual(1);
});

test("Size of assistants group having regular children with row extension", () => {
  var branchAligner = BranchAligner();

  branchAligner.addChild(0, [{id: 1}], RowType.Assistants, 0, 0, true)
  branchAligner.addChild(1, [{id: 2}], RowType.RowChildren, 0, 0, false)
  branchAligner.align();
  var result = branchAligner.getRowDepth(0, GroupType.Assistants, 0)
  expect(result).toEqual(2);
});

test("Size of assistants group having 4 regular children rows with row extension", () => {
  var branchAligner = BranchAligner();

  branchAligner.addChild(0, [{id: 1}], RowType.Assistants, 0, 0, true)
  branchAligner.addChild(1, [{id: 2}], RowType.Children, 0, 0, false)
  branchAligner.addChild(2, [{id: 3}], RowType.Children, 0, 0, true)
  branchAligner.addChild(3, [{id: 4}], RowType.Children, 0, 0, false)
  branchAligner.align();
  var result = branchAligner.getRowDepth(0, GroupType.Assistants, 0)
  expect(result).toEqual(4);
});

test("Size of assistants group having 1 row of advisers with row extension", () => {
  var branchAligner = BranchAligner();

  branchAligner.addChild(0, [{id: 1}], RowType.Assistants, 0, 0, true)
  branchAligner.addChild(1, [{id: 2}], RowType.Advisers, 0, 0, false)
  branchAligner.align();
  var result = branchAligner.getRowDepth(0, GroupType.Assistants, 0)
  expect(result).toEqual(1);
});

test("Size of assistants group having 1 row of sub advisers with row extension", () => {
  var branchAligner = BranchAligner();

  branchAligner.addChild(0, [{id: 1}], RowType.Assistants, 0, 0, true)
  branchAligner.addChild(1, [{id: 2}], RowType.Advisers, 0, 1, false)
  branchAligner.align();
  var result = branchAligner.getRowDepth(0, GroupType.Assistants, 0)
  expect(result).toEqual(2);
});

test("Size of assistants in one branch should be equal to the size of assistants in aligned branch", () => {
  var branchAligner = BranchAligner();

  branchAligner.addChild(0, [{id: 1}, {id: 2}], RowType.Children, 0, 0, false)
  branchAligner.mergeToChild(1, [{id: 3}], RowType.Children, 0, 0, false)
  branchAligner.mergeToChild(2, [{id: 4}], RowType.Children, 0, 0, false)
  branchAligner.mergeToChild(3, [{id: 5}], RowType.Assistants, 0, 0, true)
  branchAligner.mergeToChild(5, [{id: 6}], RowType.Children, 0, 0, false)
  branchAligner.mergeToChild(4, [{id: 7}], RowType.Assistants, 0, 0, true)
  branchAligner.align();
  var result = branchAligner.getRowDepth(4, GroupType.Assistants, 0)
  expect(result).toEqual(2);
});

test("Merge node to the same level as parent node", () => {
  var branchAligner = BranchAligner();

  branchAligner.mergeToChild(0, [{id: 1}, {id: 2}], RowType.Items, 0, 0, false)
  branchAligner.mergeToChild(1, [{id: 3}], RowType.Children, 0, 0, true)
  branchAligner.mergeToChild(3, [{id: 4}], RowType.Assistants, 0, 0, true)
  branchAligner.mergeToChild(4, [{id: 5}], RowType.Children, 0, 0, true)

  branchAligner.mergeToParent(2, [{id: 6}])
  branchAligner.mergeToChild(6, [{id: 7}], RowType.Children, 0, 0, true)
  branchAligner.mergeToChild(7, [{id: 8}], RowType.Assistants, 0, 0, true)
  branchAligner.align();
  var result = branchAligner.getRowDepth(7, GroupType.Assistants, 0)
  expect(result).toEqual(2);
});

test("loopGroupTypes - iterate groups", () => {
  var branchAligner = BranchAligner();

  branchAligner.mergeToChild(null, [{id: 1}], RowType.Items, 0, 0, false)
  
  branchAligner.mergeToChild(1, [{id: 2}], RowType.Advisers, 0, 0, false)
  branchAligner.mergeToChild(1, [{id: 3}], RowType.Assistants, 0, 0, false)
  branchAligner.mergeToChild(1, [{id: 4}], RowType.RowChildren, 0, 0, false)
  branchAligner.mergeToChild(1, [{id: 5}], RowType.Children, 0, 0, false)

  branchAligner.align();

  var result = [];
  branchAligner.loopGroupTypes(this, 1, function(rowType, len) {
    result.push([rowType]);
  })
  var expected = [[GroupType.Items], [GroupType.Assistants], [GroupType.RowChildren], [GroupType.Children]];
  expect(result).toEqual(expected);
});

test("loopGroupTypes - items group should be always present in the loop", () => {
  var branchAligner = BranchAligner();

  branchAligner.mergeToChild(null, [{id: 1}], RowType.Items, 0, 0, false)
  branchAligner.mergeToChild(1, [{id: 3}], RowType.Assistants, 0, 0, false)
  branchAligner.mergeToChild(1, [{id: 4}], RowType.RowChildren, 0, 0, false)
  branchAligner.mergeToChild(1, [{id: 5}], RowType.Children, 0, 0, false)

  branchAligner.align();

  var result = [];
  branchAligner.loopGroupTypes(this, 1, function(rowType, len) {
    result.push([rowType]);
  })
  var expected = [[GroupType.Items], [GroupType.Assistants], [GroupType.RowChildren], [GroupType.Children]];
  expect(result).toEqual(expected);
});

test("loopGroupTypes - missed assistants groups", () => {
  var branchAligner = BranchAligner();

  branchAligner.mergeToChild(null, [{id: 1}], RowType.Items, 0, 0, false)
  branchAligner.mergeToChild(1, [{id: 4}], RowType.RowChildren, 0, 0, false)
  branchAligner.mergeToChild(1, [{id: 5}], RowType.Children, 0, 0, false)

  branchAligner.align();

  var result = [];
  branchAligner.loopGroupTypes(this, 1, function(rowType, len) {
    result.push([rowType]);
  })
  var expected = [[GroupType.Items], [GroupType.RowChildren], [GroupType.Children]];
  expect(result).toEqual(expected);
});

test("getRowDepth - non extended rows", () => {
  var branchAligner = BranchAligner();

  branchAligner.mergeToChild(0, [{id: 1}], RowType.Children, 0, 0, true)
  
  branchAligner.mergeToChild(1, [{id: 2}], RowType.Advisers, 0, 0, false)
  branchAligner.mergeToChild(2, [{id: 3}], RowType.Children, 0, 0, false)

  branchAligner.mergeToChild(1, [{id: 4}], RowType.Assistants, 0, 0, false)
  branchAligner.mergeToChild(4, [{id: 5}], RowType.Children, 0, 0, false)

  branchAligner.mergeToChild(1, [{id: 6}], RowType.Assistants, 1, 0, false)
  branchAligner.mergeToChild(6, [{id: 7}], RowType.Children, 0, 0, false)
  branchAligner.mergeToChild(7, [{id: 8}], RowType.Children, 0, 0, false)

  branchAligner.mergeToChild(1, [{id: 9}], RowType.RowChildren, 0, 0, false)
  branchAligner.mergeToChild(9, [{id: 10}], RowType.Children, 0, 0, false)
  
  branchAligner.mergeToChild(1, [{id: 11}], RowType.RowChildren, 1, 0, false)
  branchAligner.mergeToChild(11, [{id: 12}], RowType.Children, 0, 0, false)

  branchAligner.align();

  var result = branchAligner.getRowDepth(0, GroupType.Children, 0)
  expect(result).toEqual(6);
});

test("getRowDepth - extended rows", () => {
  var branchAligner = BranchAligner();

  branchAligner.mergeToChild(0, [{id: 1}], RowType.Children, 0, 0, true)
  
  branchAligner.mergeToChild(1, [{id: 2}], RowType.Advisers, 0, 0, true)
  branchAligner.mergeToChild(2, [{id: 3}], RowType.Children, 0, 0, true)

  branchAligner.mergeToChild(1, [{id: 4}], RowType.Assistants, 0, 0, true)
  branchAligner.mergeToChild(4, [{id: 5}], RowType.Children, 0, 0, true)

  branchAligner.mergeToChild(1, [{id: 6}], RowType.Assistants, 1, 0, true)
  branchAligner.mergeToChild(6, [{id: 7}], RowType.Children, 0, 0, true)
  branchAligner.mergeToChild(7, [{id: 8}], RowType.Children, 0, 0, true)

  branchAligner.mergeToChild(1, [{id: 9}], RowType.RowChildren, 0, 0, true)
  branchAligner.mergeToChild(9, [{id: 10}], RowType.Children, 0, 0, true)
  
  branchAligner.mergeToChild(1, [{id: 11}], RowType.RowChildren, 1, 0, true)
  branchAligner.mergeToChild(11, [{id: 12}], RowType.Children, 0, 0, true)

  branchAligner.align();

  var result = branchAligner.getRowDepth(0, GroupType.Children, 0)
  expect(result).toEqual(11);
});

test("loopRows - extended rows", () => {
  var branchAligner = BranchAligner();

  branchAligner.mergeToChild(0, [{id: 1}], RowType.Children, 0, 0, true)
  
  branchAligner.mergeToChild(1, [{id: 2}], RowType.Advisers, 0, 0, true)
  branchAligner.mergeToChild(2, [{id: 3}], RowType.Children, 0, 0, true)

  branchAligner.mergeToChild(1, [{id: 4}], RowType.Assistants, 0, 0, true)
  branchAligner.mergeToChild(4, [{id: 5}], RowType.Children, 0, 0, true)

  branchAligner.mergeToChild(1, [{id: 6}], RowType.Assistants, 1, 0, true)
  branchAligner.mergeToChild(6, [{id: 7}], RowType.Children, 0, 0, true)
  branchAligner.mergeToChild(7, [{id: 8}], RowType.Children, 0, 0, true)

  branchAligner.align();

  var result = [];
  branchAligner.loopRows(this, 1, RowType.Assistants, function(depth, index) {
    result.push([depth, index])
  })
  expect(result).toEqual([[2, 0], [3, 1]]);
});

test("loopRows - non-extended rows", () => {
  var branchAligner = BranchAligner();

  branchAligner.mergeToChild(0, [{id: 1}], RowType.Children, 0, 0, true)
  
  branchAligner.mergeToChild(1, [{id: 2}], RowType.Advisers, 0, 0, false)
  branchAligner.mergeToChild(2, [{id: 3}], RowType.Children, 0, 0, false)

  branchAligner.mergeToChild(1, [{id: 4}], RowType.Assistants, 0, 0, false)
  branchAligner.mergeToChild(4, [{id: 5}], RowType.Children, 0, 0, false)

  branchAligner.mergeToChild(1, [{id: 6}], RowType.Assistants, 1, 0, false)
  branchAligner.mergeToChild(6, [{id: 7}], RowType.Children, 0, 0, false)
  branchAligner.mergeToChild(7, [{id: 8}], RowType.Children, 0, 0, false)

  branchAligner.align();

  var result = [];
  branchAligner.loopRows(this, 1, RowType.Assistants, function(depth, index) {
    result.push([depth, index])
  })
  expect(result).toEqual([[1, 0], [1, 1]]);
});

test("getRowsDepth - extended rows", () => {
  var branchAligner = BranchAligner();

  branchAligner.mergeToChild(0, [{id: 1}], RowType.Children, 0, 0, true)
  
  branchAligner.mergeToChild(1, [{id: 2}], RowType.Advisers, 0, 0, true)
  branchAligner.mergeToChild(2, [{id: 3}], RowType.Children, 0, 0, true)

  branchAligner.mergeToChild(1, [{id: 4}], RowType.Assistants, 0, 0, true)
  branchAligner.mergeToChild(4, [{id: 5}], RowType.Children, 0, 0, true)

  branchAligner.mergeToChild(1, [{id: 6}], RowType.Assistants, 1, 0, true)
  branchAligner.mergeToChild(6, [{id: 7}], RowType.Children, 0, 0, true)
  branchAligner.mergeToChild(7, [{id: 8}], RowType.Children, 0, 0, true)

  branchAligner.align();

  var result = branchAligner.getRowsDepth(1, GroupType.Assistants);
  expect(result).toEqual([2, 3]);
});

test("getRowsDepth - non-extended rows", () => {
  var branchAligner = BranchAligner();

  branchAligner.mergeToChild(0, [{id: 1}], RowType.Children, 0, 0, true)
  
  branchAligner.mergeToChild(1, [{id: 2}], RowType.Advisers, 0, 0, false)
  branchAligner.mergeToChild(2, [{id: 3}], RowType.Children, 0, 0, true)

  branchAligner.mergeToChild(1, [{id: 4}], RowType.Assistants, 0, 0, false)
  branchAligner.mergeToChild(4, [{id: 5}], RowType.Children, 0, 0, true)

  branchAligner.mergeToChild(1, [{id: 6}], RowType.Assistants, 1, 0, false)
  branchAligner.mergeToChild(6, [{id: 7}], RowType.Children, 0, 0, true)
  branchAligner.mergeToChild(7, [{id: 8}], RowType.Children, 0, 0, true)

  branchAligner.align();

  var result = branchAligner.getRowsDepth(1, GroupType.Assistants);
  expect(result).toEqual([1, 1]);
});

test("loopGroupTypes - iterate groups of aligned node", () => {
  var branchAligner = BranchAligner();

  branchAligner.mergeToChild(null, [{id: 1}, {id: 6}], RowType.Items, 0, 0, false)
  
  branchAligner.mergeToChild(1, [{id: 2}], RowType.Advisers, 0, 0, false)
  branchAligner.mergeToChild(1, [{id: 3}], RowType.Assistants, 0, 0, false)
  branchAligner.mergeToChild(1, [{id: 4}], RowType.RowChildren, 0, 0, false)
  branchAligner.mergeToChild(1, [{id: 5}], RowType.Children, 0, 0, false)

  branchAligner.align();

  var result = [];
  branchAligner.loopGroupTypes(this, 6, function(rowType, len) {
    result.push([rowType]);
  })
  var expected = [[GroupType.Items], [GroupType.Assistants], [GroupType.RowChildren], [GroupType.Children]];
  expect(result).toEqual(expected);
});

test("loopGroupTypes - iterate rows of aligned node", () => {
  var branchAligner = BranchAligner();

  branchAligner.mergeToChild(null, [{id: 1}, {id: 8}], RowType.Items, 0, 0, false)
  
  branchAligner.mergeToChild(1, [{id: 2}], RowType.Advisers, 0, 0, false)
  branchAligner.mergeToChild(1, [{id: 3}], RowType.Assistants, 0, 0, false)
  branchAligner.mergeToChild(1, [{id: 4}], RowType.RowChildren, 0, 0, false)
  branchAligner.mergeToChild(1, [{id: 5}], RowType.Children, 0, 0, true)
  branchAligner.mergeToChild(1, [{id: 6}], RowType.Children, 1, 0, true)
  branchAligner.mergeToChild(1, [{id: 7}], RowType.Children, 2, 0, true)

  branchAligner.align();

  var result = [];
  branchAligner.loopRows(this, 8, RowType.Children, function(depth, index) {
    result.push([index, depth]);
  })
  var expected = [[0, 1], [1, 1], [2, 1]];
  expect(result).toEqual(expected);
});

test("addSplitChildren - add dis-aligned nodes", () => {
  var branchAligner = BranchAligner();

  branchAligner.addSplitChildren(null, [{id: 1}, {id: 8}], RowType.Items, 0, 0)
  
  branchAligner.mergeToChild(1, [{id: 2}], RowType.Advisers, 0, 0, false)
  branchAligner.mergeToChild(1, [{id: 3}], RowType.Assistants, 0, 0, false)
  branchAligner.mergeToChild(1, [{id: 4}], RowType.RowChildren, 0, 0, false)
  branchAligner.mergeToChild(1, [{id: 5}], RowType.Children, 0, 0, true)
  branchAligner.mergeToChild(1, [{id: 6}], RowType.Children, 1, 0, true)
  branchAligner.mergeToChild(1, [{id: 7}], RowType.Children, 2, 0, true)

  branchAligner.align();

  var result = [];
  branchAligner.loopRows(this, 8, RowType.Children, function(depth, index) {
    result.push([index, depth]);
  })
  var expected = [];
  expect(result).toEqual(expected);
});

test("loopGroupTypes - iterate groups of non-existing node", () => {
  var branchAligner = BranchAligner();

  branchAligner.mergeToChild(null, [{id: 1}, {id: 6}], RowType.Items, 0, 0, false)
  branchAligner.mergeToChild(1, [{id: 2}], RowType.Advisers, 0, 0, false)
  branchAligner.align();

  var result = [];
  branchAligner.loopGroupTypes(this, 7, function(rowType, len) {
    result.push([rowType]);
  })
  var expected = [];
  expect(result).toEqual(expected);
});