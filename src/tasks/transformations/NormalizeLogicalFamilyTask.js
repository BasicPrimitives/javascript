/*  1. Topologically sort _logicalFamily items and assign levels.
    2. Optimize references. Transform M:N relations to M:1:N where it is possible.
    3. Eliminate Many to Many relations. Logical family consists of 1:M and M:1 relations only.
    4. Resort items, so original visible items stay at the same level.
    5. Fill in missed items between levels. So that way we have invisible items between parent/child family items if they have gap between levels.
      Such invisible family items have isVisible option set to false.
*/

import FamilyNormalizer from './familyTransformations/FamilyNormalizer';

export default function NormalizeLogicalFamilyTask(normalizeOptionTask, extractNestedLayoutsTask) {
  var _data = {
    maximumId: null, /* maximum of OrgItem.id */
    logicalFamily: null
  },
    _familyNormalizer = new FamilyNormalizer(false);

  function process(debug) {
    var logicalFamily = extractNestedLayoutsTask.getLogicalFamily(),
      maximumId = extractNestedLayoutsTask.getMaximumId(),
      normalizeOptions = normalizeOptionTask.getOptions();

    var options = {
      groupByType: normalizeOptions.groupByType,
      alignBylevels: normalizeOptions.alignBylevels
    };
    logicalFamily = logicalFamily.clone();
    maximumId = _familyNormalizer.normalize(options, logicalFamily, maximumId);

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
