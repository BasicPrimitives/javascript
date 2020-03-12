primitives.common.Shape = function (graphics) {
  this.m_graphics = graphics;
  this.transform = null;

  this.orientationType = primitives.common.OrientationType.Top;
  this.panelSize = null;
  this.shapeType = primitives.common.ShapeType.Rectangle;
  this.offset = new primitives.common.Thickness(0, 0, 0, 0);
  this.lineWidth = 1;
  this.labelOffset = 4;
  this.cornerRadius = "10%";
  this.opacity = 1;
  this.fillColor = null;
  this.labelSize = new primitives.common.Size(60, 30);
  this.lineType = primitives.common.LineType.Solid;
  this.borderColor = null;
  this.hasLabel = false;
  this.labelTemplate = null;
  this.labelPlacement = primitives.common.PlacementType.Auto;
};

primitives.common.Shape.prototype = new primitives.common.BaseShape();

primitives.common.Shape.prototype.draw = function (position, uiHash) {
  var labelPlacement,
    calloutShape,
    linePaletteItem,
    buffer,
    marker;

  position = new primitives.common.Rect(position).offset(this.offset);

  this.transform = new primitives.common.Transform();
  this.transform.size = this.panelSize;
  this.transform.setOrientation(this.orientationType);

  /* label size */
  if (this.hasLabel) {
    labelPlacement = this._getLabelPosition(position.x, position.y, position.width, position.height, this.labelSize.width, this.labelSize.height, this.labelOffset, this.labelPlacement);
  }


  switch (this.shapeType) {
    case primitives.common.ShapeType.Rectangle:
      calloutShape = new primitives.common.Callout(this.m_graphics);
      calloutShape.cornerRadius = this.cornerRadius;
      calloutShape.opacity = this.opacity;
      calloutShape.lineWidth = this.lineWidth;
      calloutShape.lineType = this.lineType;
      calloutShape.borderColor = this.borderColor;
      calloutShape.fillColor = this.fillColor;
      calloutShape.draw(null, position);
      break;
    default:
      linePaletteItem = new primitives.common.PaletteItem({
        lineColor: this.borderColor,
        lineWidth: this.lineWidth,
        lineType: this.lineType,
        fillColor: this.fillColor,
        opacity: this.opacity
      });

      /* from rectangle */
      this.transform.transformRect(position.x, position.y, position.width, position.height, false,
        this, function (x, y, width, height) {
          position = new primitives.common.Rect(x, y, width, height);
        });


      marker = new primitives.common.Marker();
      buffer = new primitives.common.PolylinesBuffer();
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
