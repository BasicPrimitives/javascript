import Graph from '../../algorithms/Graph';
import EdgeItem from '../../models/EdgeItem';
import FamilyItem from '../../models/FamilyItem';
import { GroupByType } from '../../enums';

export default function AddLabelAnnotationsTask(labelAnnotationPlacementOptionTask, removeLoopsTask) {
  var _data = {
    logicalFamily: null,
    maximumId: null
  };

  function process(debug) {
    var logicalFamily = removeLoopsTask.getLogicalFamily(),
      annotations = labelAnnotationPlacementOptionTask.getAnnotations();

    logicalFamily = logicalFamily.clone();

    addLabelAnnotations(logicalFamily, annotations);

    _data.logicalFamily = logicalFamily;

    _data.maximumId = labelAnnotationPlacementOptionTask.getMaximumId();

    if (debug && !logicalFamily.validate()) {
      throw "References are broken in family structure!";
    }

    return true;
  }

  function addLabelAnnotations(logicalFamily, annotations) {
    var edges = Graph(), /* edge item is new EdgeItem(fromItem, toItem); */
      configsHash = {},
      configs, config,
      fromItem,
      index, len;

    if (annotations.length > 0) {
      /* group annotations by from item */
      for (index = 0, len = annotations.length; index < len; index += 1) {
        config = annotations[index];
        if (!configsHash.hasOwnProperty(config.fromItem)) {
          configsHash[config.fromItem] = [config];

          /* create edges hash for item */
          logicalFamily.loopChildren(this, config.fromItem, function (childid, child, level) {
            edges.addEdge(config.fromItem, childid, new EdgeItem(config.fromItem, config.fromItem, childid, childid));
            return logicalFamily.SKIP;
          });//ignore jslint
          logicalFamily.loopParents(this, config.fromItem, function (parentid, parent, level) {
            edges.addEdge(parentid, config.fromItem, new EdgeItem(parentid, parentid, config.fromItem, config.fromItem));
            return logicalFamily.SKIP;
          });//ignore jslint

        } else {
          configsHash[config.fromItem].push(config);
        }
      }

      for (fromItem in configsHash) {
        if (configsHash.hasOwnProperty(fromItem)) {
          configs = configsHash[fromItem];

          /* process annotations having greater number of references first */
          configs.sort(function (a, b) {
            return b.toItems.length - a.toItems.length;
          }); //ignore jslint


          for (index = 0; index < configs.length; index += 1) {
            config = configs[index];

            addLabelAnnotation(logicalFamily, edges, config.fromItem, config.toItems, function () {
              /* add label annotation as new diagram family item */
              return new FamilyItem({
                id: config.id,
                isVisible: true,
                isLevelNeutral: true,
                isActive: false,
                itemConfig: config
              });
            }); //ignore jslint
          }
        }
      }
    }
  }

  function addLabelAnnotation(logicalFamily, edges, fromItem, toItems, onCreate) {
    var edge,
      isValid = true,
      commonParentId = null,
      toItem,
      index, len,
      bundleItem,
      bundleItems = [];

    for (index = 0, len = toItems.length; index < len; index += 1) {
      toItem = toItems[index];

      edge = edges.edge(fromItem, toItem);
      if (edge != null) {
        if (commonParentId == null) {
          commonParentId = edge.getFar(toItem);
        } else {
          if (commonParentId != edge.getFar(toItem)) {
            isValid = false;
            break;
          }
        }
        bundleItems.push(edge.getNear(toItem));
      } else {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      bundleItem = onCreate();
      if (logicalFamily.bundleParents(commonParentId, bundleItems, bundleItem.id, bundleItem)) {
        bundleItem.levelGravity = GroupByType.Children;
        isValid = true;
      } else if (logicalFamily.bundleChildren(commonParentId, bundleItems, bundleItem.id, bundleItem)) {
        bundleItem.levelGravity = GroupByType.Parents;
        isValid = true;
      } else if (logicalFamily.bundleParents(commonParentId, toItems, bundleItem.id, bundleItem)) {
        bundleItem.levelGravity = GroupByType.Children;
        isValid = true;
      } else if (logicalFamily.bundleParents(commonParentId, toItems, bundleItem.id, bundleItem)) {
        bundleItem.levelGravity = GroupByType.Parents;
        isValid = true;
      }

      if (isValid) {
        for (index = 0, len = toItems.length; index < len; index += 1) {
          toItem = toItems[index];

          edge = edges.edge(fromItem, toItem);
          edge.setFar(toItem, bundleItem.id);
        }
      }
    }
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