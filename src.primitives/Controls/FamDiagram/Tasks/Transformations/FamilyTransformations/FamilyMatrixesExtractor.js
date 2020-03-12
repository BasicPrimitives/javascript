primitives.famdiagram.FamilyMatrixesExtractor = function (debug) {
  this.parent = primitives.famdiagram.BaseTransformer.prototype;
  this.parent.constructor.apply(this, arguments);
};

primitives.famdiagram.FamilyMatrixesExtractor.prototype = new primitives.famdiagram.BaseTransformer();

primitives.famdiagram.FamilyMatrixesExtractor.prototype.extract = function (options, logicalFamily, matrixes, matrixBottomConnectorsIds, bundles, maximumId) {
  if (logicalFamily.hasNodes() > 0) {
    /* find nodes having the same parent and child nodes and replace them with matrix placeholder node */
    if (options.enableMatrixLayout) {
      logicalFamily.groupBy(this, Math.max(2, options.minimumMatrixSize), function (parentid, childid, ids, nodes) {
        maximumId += 1;
        var id = maximumId;
        maximumId += 1;
        var id2 = maximumId;

        var firstNode = logicalFamily.node(ids[0]);

        var matrixNode = new primitives.famdiagram.FamilyItem({
          id: id,
          level: firstNode.level,
          isVisible: false,
          isActive: false,
          itemConfig: { title: "dummy #" + id, description: "This is item used as aggregator of matrixed nodes." },
          levelGravity: primitives.common.GroupByType.Parents,
          hideParentConnection: true,
          hideChildrenConnection: true
        });

        matrixBottomConnectorsIds[id] = id2; /* id2 is needed for connectors graph */

        for (var index = 0, len = ids.length; index < len; index += 1) {
          var nodeid = ids[index];
          logicalFamily.removeNode(nodeid);
        }

        if (parentid != null) {
          logicalFamily.add([parentid], id, matrixNode);
          matrixNode.hideParentConnection = false;
          bundles.push(new primitives.common.MatrixConnectorBundle(true, ids, id, id, this.getMatrixWidth(options.maximumColumnsInMatrix, ids.length)));
        } else {
          logicalFamily.add(null, id, matrixNode);
        }

        if (childid != null) {
          logicalFamily.adopt([id], childid);
          matrixNode.hideChildrenConnection = false;
          bundles.push(new primitives.common.MatrixConnectorBundle(false, ids, id, id2, this.getMatrixWidth(options.maximumColumnsInMatrix, ids.length)));
        }

        matrixes[id] = nodes;
      } //ignore jslint
      );
    }
  }
  return maximumId;
};

primitives.famdiagram.FamilyMatrixesExtractor.prototype.getMatrixWidth = function (maximumColumnsInMatrix, len) {
  return Math.min(maximumColumnsInMatrix, Math.ceil(Math.sqrt(len)));
};