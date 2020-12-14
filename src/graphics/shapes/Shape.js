import BaseShape from './BaseShape';
import Callout from './Callout';
import Marker from './Marker';
import Size from '../structs/Size';
import Rect from '../structs/Rect';
import Thickness from '../structs/Thickness';
import PaletteItem from '../structs/PaletteItem';
import Transform from '../Transform';
import PolylinesBuffer from '../structs/PolylinesBuffer';
import { LineType, OrientationType, PlacementType, ShapeType } from '../../enums';

export default function Shape(graphics) {
  this.m_graphics = graphics;
  this.transform = null;

  this.orientationType = OrientationType.Top;
  this.panelSize = null;
  this.shapeType = ShapeType.Rectangle;
  this.offset = new Thickness(0, 0, 0, 0);
  this.lineWidth = 1;
  this.labelOffset = 4;
  this.cornerRadius = "10%";
  this.opacity = 1;
  this.fillColor = null;
  this.labelSize = new Size(60, 30);
  this.lineType = LineType.Solid;
  this.borderColor = null;
  this.hasLabel = false;
  this.labelTemplate = null;
  this.labelPlacement = PlacementType.Auto;
};

Shape.prototype = new BaseShape();

Shape.prototype.draw = function (position, uiHash) {
  var labelPlacement,
    calloutShape,
    linePaletteItem,
    buffer,
    marker;

  position = new Rect(position).offset(this.offset);

  this.transform = new Transform();
  this.transform.size = this.panelSize;
  this.transform.setOrientation(this.orientationType);

  /* label size */
  if (this.hasLabel) {
    labelPlacement = this._getLabelPosition(position.x, position.y, position.width, position.height, this.labelSize.width, this.labelSize.height, this.labelOffset, this.labelPlacement);
  }


  switch (this.shapeType) {
    case ShapeType.Rectangle:
      calloutShape = new Callout(this.m_graphics);
      calloutShape.cornerRadius = this.cornerRadius;
      calloutShape.opacity = this.opacity;
      calloutShape.lineWidth = this.lineWidth;
      calloutShape.lineType = this.lineType;
      calloutShape.borderColor = this.borderColor;
      calloutShape.fillColor = this.fillColor;
      calloutShape.draw(null, position);
      break;
    default:
      linePaletteItem = new PaletteItem({
        lineColor: this.borderColor,
        lineWidth: this.lineWidth,
        lineType: this.lineType,
        fillColor: this.fillColor,
        opacity: this.opacity
      });

      /* from rectangle */
      this.transform.transformRect(position.x, position.y, position.width, position.height, false,
        this, function (x, y, width, height) {
          position = new Rect(x, y, width, height);
        });


      marker = new Marker();
      buffer = new PolylinesBuffer();
      marker.draw(buffer, this.shapeType, position, linePaletteItem);
      buffer.transform(this.transform, true);

      this.m_graphics.polylinesBuffer(buffer);
      break;
  }

  if (this.hasLabel) {
    this.m_graphics.template(
      labelPlacement.x,
      labelPlacement.y,
      0,
      0,
      0,
      0,
      labelPlacement.width,
      labelPlacement.height,
      this.labelTemplate.template(),
      this.labelTemplate.getHashCode(),
      this.labelTemplate.render,
      uiHash,
      null
    );
  }
};
