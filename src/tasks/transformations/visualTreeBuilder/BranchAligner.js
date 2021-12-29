import Tree from '../../../algorithms/Tree';
import { RowType, GroupType, RowTypeToGroupTypeMap } from './enums';

function RowKeyGenerator() {
  var _rowsHash = {};
  var _rowIndex = 1;

  function find(parentId, rowType, index) {
    var key = parentId + '-' + rowType + '-' + index;
    if(!_rowsHash.hasOwnProperty(key)) {
        _rowsHash[key] = _rowIndex;
        _rowIndex+=1;
    }
    return _rowsHash[key];
  }

  function get() {
    var result = _rowIndex;
    _rowIndex+=1;
    return result;
  }

  return {
    find: find,
    get: get
  }
}

function Row(id) {
  this.id = id;
  this.rowType = RowType.Items;
  this.index = 0;
  this.offset = 0;
  this.extend = true; /* indicates that we need to keep branches of this row children above subsequent rows */
  this.depth = 0;
  
  this.groups = [];
  this.groups[GroupType.Items] = [[1,1]];
  
  this.getDepth = function() {
    var [currExtend, currDepth] = this.groups.reduce((acc, row) => {
        return row.reduce(([currExtend, currDepth], item) => {
          var [extend, depth] = item || [1, 1];
          return [currExtend + extend, Math.max(currDepth, currExtend + depth)];
        }, acc)
    }, [0,0]);
    return Math.max(currExtend, currDepth) || 1;
  };


  this.addRowDepth = function(rowType, extend, index, depth) {
    var groupIndex = RowTypeToGroupTypeMap[rowType];
    if(!this.groups[groupIndex]) {
      this.groups[groupIndex] = [];
    }
    var rows = this.groups[groupIndex];
    var [currExtend, currDepth] = rows[index] || [1,1];
    rows[index] = [Math.max(currExtend, extend ? depth : 1), Math.max(currDepth, depth)];
  }
}

function BranchAligner() {
  var _rowsTree = Tree();
  var _rowKeyGenerator = RowKeyGenerator();
  var _rowHash = {}; // rowHash[nodeId] = rowKey;

  function _createParentRow(parentNodeId) {
      var parentRowId = _rowKeyGenerator.find(null, RowType.Children, 0);
      var parentRow = new Row(parentRowId);
      parentRow.rowType = RowType.Items;
      parentRow.index = 0;
      parentRow.offset = 0;
      parentRow.extend = false;
      _rowsTree.add(null, parentRowId, parentRow);
      _rowHash[parentNodeId] = parentRowId;
      return parentRowId;
  }

  function mergeToParent(parentNodeId, nodes) {
    var parentRowId = _rowHash[parentNodeId] || _createParentRow(parentNodeId);
    nodes.forEach(child => {
        _rowHash[child.id] = parentRowId;
    });
  }

  function mergeToChild(parentNodeId, nodes, rowType, index, offset, extendChildren) {
    var parentRowId = _rowHash[parentNodeId] || _createParentRow(parentNodeId);
    var rowId = _rowKeyGenerator.find(parentRowId, rowType, index);
    _add(parentRowId, rowId, nodes, rowType, index, offset, extendChildren);
  }

  function addChild(parentNodeId, nodes, rowType, index, offset, extendChildren) {
    var parentRowId = _rowHash[parentNodeId] || _createParentRow(parentNodeId);
    var rowId = _rowKeyGenerator.get();
    _add(parentRowId, rowId, nodes, rowType, index, offset, extendChildren);
  }

  function addSplitChildren(parentNodeId, nodes, rowType, index, offset) {
    var parentRowId = _rowHash[parentNodeId] || _createParentRow(parentNodeId);
    nodes.forEach(child => {
      var rowId = _rowKeyGenerator.get();
      var row = new Row(rowId);
      row.extend = false;
      row.index = index || 0;
      row.offset = offset || 0;
      row.rowType = rowType;
      _rowsTree.add(parentRowId, rowId, row);
      _rowHash[child.id] = rowId;
    })
  }

  function _add(parentRowId, rowId, nodes, rowType, index, offset, extendChildren) {
    var row = _rowsTree.node(rowId);
    if(!row) {
      row = new Row(rowId);
      row.extend = extendChildren;
      row.index = index || 0;
      row.offset = offset || 0;
      row.rowType = rowType;
      _rowsTree.add(parentRowId, rowId, row);
    }
    nodes.forEach(child => {
      _rowHash[child.id] = rowId;
    });
  }

  /* measure depth of rows in rowsTree, count number of assistants and child rows, find depth of partner's branches */
  function align(debug) {
    _rowsTree.loopPostOrder(this, function (rowId, row, parentRowId, parentRow) {
        row.depth = row.getDepth() + row.offset;
        if(parentRow != null) {
            parentRow.addRowDepth(row.rowType, row.extend, row.index, row.depth);
        }
    });
  }

  // function loopGroupTypes(rowType, len)
  function loopGroupTypes(thisArg, nodeId, onGroupType) {
    var rowId = _rowHash[nodeId];
    var row = _rowsTree.node(rowId);
    if(row) {
      for(var index = 0, len = row.groups.length; index < len; index+=1) {
        if(row.groups[index]) {
          if(onGroupType.call(thisArg, index, len)) {
            break;
          }
        }
      }
    }
  }    

  function getRowDepth(nodeId, groupType, index) {
    var rowId = _rowHash[nodeId];
    var row = _rowsTree.node(rowId);
    var childRow = (row.groups[groupType] || [])[index];
    return (childRow && childRow[0]) || 1;
  }

  function getGroupSize(nodeId, groupType) {
    var rowId = _rowHash[nodeId];
    var row = _rowsTree.node(rowId);
    if(row) {
      if(row.groups.hasOwnProperty(groupType)){
        return row.groups[groupType].length; 
      } 
    }
    return 0;
  }  

  function getRowsDepth(nodeId, groupType) {
    var rowId = _rowHash[nodeId];
    var row = _rowsTree.node(rowId);
    var children = row.groups[groupType] || [];
    return children.map(item => item[0]);
  }

  // function onRow(rowDepth, index)
  function loopRows(thisArg, nodeId, rowType, onRow) {
    var rowId = _rowHash[nodeId];
    var row = _rowsTree.node(rowId);
    var groupIndex = RowTypeToGroupTypeMap[rowType];
    var children = row.groups[groupIndex] || [];
    for(var index = 0; index < children.length; index+=1) {
      var childRow = children[index];
      if(childRow) {
        if(onRow.call(thisArg, childRow[0], index)) {
          break;
        }
      }
    }
  }

  return {
      mergeToParent: mergeToParent,
      mergeToChild: mergeToChild,
      addChild: addChild,
      addSplitChildren: addSplitChildren,
      align: align,
      loopGroupTypes: loopGroupTypes,
      getRowDepth: getRowDepth,
      getRowsDepth: getRowsDepth,
      loopRows: loopRows,
      getGroupSize: getGroupSize
  }
}

export default BranchAligner;