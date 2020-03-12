/* This is model class used to define visual structure of chart */
primitives.orgdiagram.TreeItemPosition = function (source) {
  this.partnerConnectorOffset = 0;

  this.level = null;
  this.levelPosition = null;
  this.offset = 0;
  this.leftPadding = 0;
  this.rightPadding = 0;

  this.actualVisibility = primitives.common.Visibility.Normal;

  this.actualSize = null;
  this.actualPosition = null;
  this.contentPosition = null;

  this.horizontalConnectorsShift = null;
  this.topConnectorShift = null;
  this.topConnectorInterval = 0;
  this.bottomConnectorShift = null;
  this.bottomConnectorInterval = 0;

  /* following properties are being used in matrix layout to draw connector lines */
  this.leftMedianOffset = null; /* this property is position of vertical connector lines going between columns of nodes in matrix layout on left side of the node */
  this.rightMedianOffset = null; /* the same but on the right side */

  if (source != null) {
    for (var property in source) {
      if (source.hasOwnProperty(property)) {
        switch (property) {
          case 'actualPosition':
            this.actualPosition = new primitives.common.Rect(source.actualPosition);
            break;
          default:
            this[property] = source[property];
            break;
        }

      }
    }
  }
};
