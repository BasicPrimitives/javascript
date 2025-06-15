import Rect from '../structs/Rect';
import Size from '../structs/Size';
import Transform from '../Transform';
import { isNullOrEmpty } from '../../common';
import RenderEventArgs from '../../events/RenderEventArgs';
import Shape from '../shapes/Shape'

export default function ShapeAnnotation() {

};

ShapeAnnotation.prototype.draw = function (annotationConfig, graphics, controlSize, labelTemplate) {
  var shape,
    uiHash,
    transform = new Transform(),
    panel = graphics.activate("placeholder");

  transform.size = new Size(controlSize.width, controlSize.height);
  transform.setOrientation(annotationConfig.orientationType);

  if (annotationConfig.position != null) {
    shape = new Shape(graphics);
    Object.assign(shape, annotationConfig);

    /* rotate label size to user orientation */
    transform.transformRect(0, 0, annotationConfig.labelSize.width, annotationConfig.labelSize.height, false,
      this, function (x, y, width, height) {
        shape.labelSize = new Size(width, height);
      });

    /* rotate panel size to user orientation */
    transform.transformRect(0, 0, panel.size.width, panel.size.height, false,
      this, function (x, y, width, height) {
        shape.panelSize = new Size(width, height);
      });

    shape.hasLabel = !isNullOrEmpty(annotationConfig.label);

    var position = annotationConfig.position;

    /* translate position to Top orientation */
    transform.transformRect(position.x, position.y, position.width, position.height, false,
      this, function (x, y, width, height) {
        position = new Rect(x, y, width, height);
      });

    /* offset position */
    position = new Rect(annotationConfig.position).offset(annotationConfig.offset);

    shape.labelTemplate = labelTemplate;

    uiHash = new RenderEventArgs();
    uiHash.context = annotationConfig;
    shape.draw(position, uiHash);
  }
}