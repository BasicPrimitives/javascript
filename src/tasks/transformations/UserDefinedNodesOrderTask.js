import UserDefinedNodesOrder from './familyTransformations/UserDefinedNodesOrder';

export default function UserDefinedNodesOrderTask(orderFamilyNodesOptionTask) {
  var _data = {
    position: null, /* hash[itemid] = position*/
    group: null /* hash[itemid] = root itemid */
  },
    _userDefinedNodesOrder = new UserDefinedNodesOrder();

  function process() {
    var options = orderFamilyNodesOptionTask.getOptions();
    var result = _userDefinedNodesOrder.getUserDefinedPositions(options.items);

    _data.position = result.position;
    _data.group = result.group;

    return true;
  }

  function getPositions() {
    return _data.position;
  }

  function getGroups() {
    return _data.group;
  }

  return {
    process: process,
    getPositions: getPositions,
    getGroups: getGroups
  };
};