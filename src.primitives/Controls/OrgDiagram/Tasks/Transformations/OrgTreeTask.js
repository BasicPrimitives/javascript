primitives.orgdiagram.OrgTreeTask = function (itemsOptionTask) {
  var _data = {
    orgTree: null, /*tree primitives.orgdiagram.OrgItem */
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
      index2, len2,
      property,
      maximumId = 0,
      parsedId,
      // Organizational chart definition 
      orgTree = primitives.common.tree(),
      rootItemConfig;

    /* convert items to hash table */
    for (index = 0, len = items.length; index < len; index += 1) {
      userItem = items[index];
      /* user should define unique id for every ItemConfig otherwise we ignore it
        if parent does not exists in the tree then item is considered as root item
      */
      if (userItem.id != null) {
        /* Organizational chart ItemConfig is almost the same as OrgItem 
          except options used to draw connectors in multi parent chart
        */
        orgItem = new primitives.orgdiagram.OrgItem(userItem);

        // OrgItem id coinsides with ItemConfig id since we don't add any new org items to user's org chart definition
        parsedId = parseInt(userItem.id, 10);
        maximumId = Math.max(isNaN(parsedId) ? 0 : parsedId, maximumId);

        // Collect org items
        orgTree.add(userItem.parent, orgItem.id, orgItem);

        /* We ignore looped items, it is applications responsibility to control data consistency */
      }
    }
    /* create chart root item config */
    maximumId += 1;

    rootItemConfig = new primitives.orgdiagram.ItemConfig();
    rootItemConfig.id = maximumId;
    rootItemConfig.title = "internal root";
    rootItemConfig.isVisible = false;
    rootItemConfig.isActive = false;

    /* create chart org root item */
    orgItemRoot = new primitives.orgdiagram.OrgItem(rootItemConfig);
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
        node.itemType = primitives.orgdiagram.ItemType.Regular;
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
          if (child.itemType != primitives.orgdiagram.ItemType.Regular) {
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