import Rect from '../graphics/structs/Rect';
import { Visibility } from '../enums';

export default function TreeItemPosition(source) {
  this.level = null;
  this.offset = 0;
  this.leftPadding = 0;
  this.rightPadding = 0;

  this.actualVisibility = Visibility.Normal;
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
            this.actualPosition = new Rect(source.actualPosition);
            break;
          default:
            this[property] = source[property];
            break;
        }

      }
    }
  }
};
