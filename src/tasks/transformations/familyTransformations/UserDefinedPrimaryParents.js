export default function UserDefinedPrimaryParents() {

};

UserDefinedPrimaryParents.prototype.getUserDefinedPrimaryParents = function (items, family) {
  var result = {},
    index, len;

  var primaryParents = {};
  for (index = 0, len = items.length; index < len; index += 1) {
    var item = items[index];
    if (item.primaryParent != null) {
      primaryParents[item.id] = item.primaryParent;
    }
  }

  for (var nodeid in primaryParents) {
    var primaryParent = primaryParents[nodeid];
    var trace = {}

    var nodes = [nodeid];
    while (nodes.length > 0) {
      var tempNodes = [];
      for (index = 0, len = nodes.length; index < len; index += 1) {
        nodeid = nodes[index];
        family.loopParents(this, nodeid, function (parentid, parent) {
          trace[parentid] = nodeid;
          if (parentid == primaryParent) {
            while (trace[parentid] != null) {
              result[trace[parentid]] = parentid;
              parentid = trace[parentid];
            }
            tempNodes = [];
            return family.BREAK;
          }
          if (parent.isVisible == false) {
            tempNodes.push(parentid);
          }
          return family.SKIP;
        })
      }
      nodes = tempNodes;
    }
  }
  return result;
}
