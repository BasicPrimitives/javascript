import BaseTransformer from './BaseTransformer';
import FamilyItem from '../../../models/FamilyItem';
import { GroupByType } from '../../../enums';
import MatrixConnectorBundle from '../../../connectors/MatrixConnectorBundle';
import HorizontalConnectorBundle from '../../../connectors/HorizontalConnectorBundle';
import MatrixLayout from '../../transformations/layouts/MatrixLayout';
import HorizontalLayout from '../../transformations/layouts/HorizontalLayout';

export default function FamilyMatrixesExtractor(debug) {
  this.parent = BaseTransformer.prototype;
  this.parent.constructor.apply(this, arguments);
};

FamilyMatrixesExtractor.prototype = new BaseTransformer();

FamilyMatrixesExtractor.prototype.extract = function (options, getConfig, logicalFamily, maximumId) {
  var layouts = {},
      nestedLayoutParentConnectorIds = {},
      nestedLayoutBottomConnectorIds = {},
      bundles = [];

  if (logicalFamily.hasNodes() > 0) {
    /* find nodes having the same parent and child nodes and replace them with matrix placeholder node */
    if (options.enableMatrixLayout) {
      logicalFamily.groupBy(this, Math.max(2, options.minimumMatrixSize), function (parentid, childid, groups) {

        var nodes = [];
        for(var groupIndex = 0; groupIndex < groups.length; groupIndex+=1) {
          var group = groups[groupIndex];

          if(group.length == 1) {
            nodes.push(group[0].node);
          } else {
            maximumId += 1;
            var id = maximumId;
            maximumId += 1;
            var id2 = maximumId;

            var firstNode = logicalFamily.node(group[0].id);

            var horizontalNode = new FamilyItem({
              id: id,
              level: null,
              isVisible: false,
              isActive: false,
              itemConfig: { title: "dummy #" + id, description: "This is item used as aggregator of horizontally grouped nodes." },
              levelGravity: GroupByType.Parents,
              hideParentConnection: true,
              hideChildrenConnection: true
            });     
            
            nestedLayoutParentConnectorIds[id] = group[0].id; /* id is needed for connectors graph */
            nestedLayoutBottomConnectorIds[id] = group[group.length - 1].id; /* id is needed for connectors graph */

            for(var index = 0; index < group.length - 1; index+=1) {
              var fromNode = group[index];
              var toNode = group[index+1];
              bundles.push(new HorizontalConnectorBundle(toNode.id, fromNode.id));
            }

            for (var index = 0; index < group.length; index += 1) {
              var node = group[index];
              logicalFamily.removeNode(node.id);
            }

            var ids = nodes.map(node => node.id);
            if (parentid != null) {
              logicalFamily.add([parentid], id, horizontalNode);
              horizontalNode.hideParentConnection = false;
            } else {
              logicalFamily.add(null, id, horizontalNode);
            }
    
            if (childid != null) {
              logicalFamily.adopt([id], childid);
              horizontalNode.hideChildrenConnection = false;
            }            

            layouts[id] = new HorizontalLayout(group.map(item => item.node), horizontalNode.hideParentConnection, horizontalNode.hideChildrenConnection);

            nodes.push(horizontalNode);
          }
        }

        var firstNode = logicalFamily.node(nodes[0].id);

        maximumId += 1;
        var id = maximumId;
        maximumId += 1;
        var id2 = maximumId;

        var matrixNode = new FamilyItem({
          id: id,
          level: null,
          isVisible: false,
          isActive: false,
          itemConfig: { title: "dummy #" + id, description: "This is item used as aggregator of matrixed nodes." },
          levelGravity: GroupByType.Parents,
          hideParentConnection: true,
          hideChildrenConnection: true
        });

        nestedLayoutBottomConnectorIds[id] = id2; /* id2 is needed for connectors graph */

        for (var index = 0, len = nodes.length; index < len; index += 1) {
          var node = nodes[index];
          logicalFamily.removeNode(node.id);
        }

        var ids = nodes.map(node => node.id);
        if (parentid != null) {
          logicalFamily.add([parentid], id, matrixNode);
          matrixNode.hideParentConnection = false;
          bundles.push(new MatrixConnectorBundle(true, ids, id, id, this.getMatrixWidth(options.maximumColumnsInMatrix, ids.length)));
        } else {
          logicalFamily.add(null, id, matrixNode);
        }

        if (childid != null) {
          logicalFamily.adopt([id], childid);
          matrixNode.hideChildrenConnection = false;
          bundles.push(new MatrixConnectorBundle(false, ids, id, id2, this.getMatrixWidth(options.maximumColumnsInMatrix, ids.length)));
        }
        layouts[id] = new MatrixLayout(nodes, matrixNode.hideParentConnection, matrixNode.hideChildrenConnection);
      }, function(itemId) {
        var result = null;
        var itemConfig = getConfig(itemId);
        if(itemConfig != null) {
          if(itemConfig.addToMatrix) {
            result = itemConfig.matrixId;
          } else {
            result = -1;
          }
        }
        return result;
      }
      );
    }
  }
  return { maximumId, nestedLayoutParentConnectorIds, nestedLayoutBottomConnectorIds, layouts, bundles };
};

FamilyMatrixesExtractor.prototype.getMatrixWidth = function (maximumColumnsInMatrix, len) {
  return Math.min(maximumColumnsInMatrix, Math.ceil(Math.sqrt(len)));
};