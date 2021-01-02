import Tree from '../../algorithms/Tree';
import OrgItem from '../../models/OrgItem';
import OrgItemConfig from '../../configs/OrgItemConfig';
import { ItemType } from '../../enums';

export default function OrgTreeTask(itemsOptionTask) {
  var _data = {
    orgTree: null, /*Tree OrgItem */
    maximumId: null /* maximum of OrgItem.id */
  };

  function process() {
    createOrgTree(itemsOptionTask.getItems());

    return true;
  }

  function createOrgTree(items) {
    var orgItem,
      orgItemRoot,
      userItem,
      index, len,
      maximumId = 0,
      parsedId,
      // Organizational chart definition 
      orgTree = Tree(),
      rootItemConfig;

    /* convert items to hash table */
    for (index = 0, len = items.length; index < len; index += 1) {
      userItem = items[index];
      /* user should define unique id for every OrgItemConfig otherwise we ignore it
        if parent does not exists in the tree then item is considered as root item
      */
      if (userItem.id != null) {
        /* Organizational chart OrgItemConfig is almost the same as OrgItem 
          except options used to draw connectors in multi parent chart
        */
        orgItem = new OrgItem(userItem);

        // OrgItem id coincides with OrgItemConfig id since we don't add any new org items to user's org chart definition
        parsedId = parseInt(userItem.id, 10);
        maximumId = Math.max(isNaN(parsedId) ? 0 : parsedId, maximumId);

        // Collect org items
        orgTree.add(userItem.parent, orgItem.id, orgItem);

        /* We ignore looped items, it is applications responsibility to control data consistency */
      }
    }
    /* create chart root item config */
    maximumId += 1;

    rootItemConfig = new OrgItemConfig();
    rootItemConfig.id = maximumId;
    rootItemConfig.title = "internal root";
    rootItemConfig.isVisible = false;
    rootItemConfig.isActive = false;

    /* create chart org root item */
    orgItemRoot = new OrgItem(rootItemConfig);
    orgItemRoot.hideParentConnection = true;
    orgItemRoot.hideChildrenConnection = true;

    orgTree.add(null, orgItemRoot.id, orgItemRoot);

    orgTree.loopLevels(this, function (nodeid, node, levelid) {
      if (levelid > 0) {
        return orgTree.BREAK;
      }
      if (orgItemRoot.id != nodeid) {
        orgTree.adopt(orgItemRoot.id, nodeid);

        /* root item must be regular */
        node.itemType = ItemType.Regular;
      }
    });

    hideRootConnectors(orgTree);

    _data.orgTree = orgTree;
    _data.maximumId = maximumId;

    return true;
  }

  function hideRootConnectors(orgTree) {
    orgTree.loopLevels(this, function (nodeid, node, levelid) {
      var allRegular = true;
      if (!node.isVisible) {
        orgTree.loopChildren(this, nodeid, function (childid, child, index) {
          if (child.itemType != ItemType.Regular) {
            allRegular = false;
            return true; // break
          }
        }); //ignore jslint

        if (allRegular) {
          node.hideChildrenConnection = true;

          orgTree.loopChildren(this, nodeid, function (childid, child, index) {
            child.hideParentConnection = true;
          });
        } else {
          return orgTree.SKIP; // skip children
        }
      } else {
        return orgTree.SKIP;
      }
    });
  }

  function getOrgTree() {
    return _data.orgTree;
  }

  function getMaximumId() {
    return _data.maximumId;
  }

  return {
    process: process,
    getOrgTree: getOrgTree,
    getMaximumId: getMaximumId
  };
};