import FamilyItem from '../../models/FamilyItem';
import { GroupByType } from '../../enums';

export default function BindFamilyConnectorsTask(hideGrandParentsConnectorsTask) {
  var _data = {
    maximumId: null, /* maximum of OrgItem.id */
    logicalFamily: null
  };

  function process(debug) {
    var logicalFamily = hideGrandParentsConnectorsTask.getLogicalFamily(),
      maximumId = hideGrandParentsConnectorsTask.getMaximumId();

    logicalFamily = logicalFamily.clone();

    /* Optimize family references. Bundle connectors where it is possible */
    logicalFamily.optimizeReferences(function () {
      maximumId += 1;

      return new FamilyItem({
        id: maximumId,
        isVisible: false,
        isActive: false,
        itemConfig: { title: "bundle #" + maximumId, description: " This item was created by references optimizer." },
        levelGravity: GroupByType.Children,
        isLevelNeutral: true
      });
    }); //ignore jslint

    if (debug && !logicalFamily.validate()) {
      throw "References are broken in family structure!";
    }
    if (debug && logicalFamily.hasLoops()) {
      throw "Structure has loops!";
    }

    /* eliminate many to many connections in chart, every connection should be ether child or parent relation. */
    logicalFamily.eliminateManyToMany(function () {
      maximumId += 1;

      return new FamilyItem({
        id: maximumId,
        isVisible: false,
        isActive: false,
        itemConfig: { title: "dummy #" + maximumId, description: "This is item used to eliminate M:M relations." },
        levelGravity: GroupByType.Children,
        hideParentConnection: false,
        hideChildrenConnection: false,
        isLevelNeutral: true
      });
    } //ignore jslint
    );

    if (debug && !logicalFamily.validate()) {
      throw "References are broken in family structure!";
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
