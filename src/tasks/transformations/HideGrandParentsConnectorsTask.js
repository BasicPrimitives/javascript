/*  This task optionally eliminates direct connections to grand parents */
export default function HideGrandParentsConnectorsTask(hideGrandParentsConnectorsOptionTask, removeLoopsTask) {
  var _data = {
    maximumId: null, /* maximum of OrgItem.id */
    logicalFamily: null
  }

  function process(debug) {
    var logicalFamily = removeLoopsTask.getLogicalFamily(),
      maximumId = removeLoopsTask.getMaximumId();

    var options = hideGrandParentsConnectorsOptionTask.getOptions();

    if (options.hideGrandParentsConnectors == true) {
      /* optionally eliminate grand parents connectors */
      logicalFamily = logicalFamily.getFamilyWithoutGrandParentsRelations();
    } else {
      logicalFamily = logicalFamily.clone();
    }

    _data.logicalFamily = logicalFamily;
    _data.maximumId = maximumId;

    return true;
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
