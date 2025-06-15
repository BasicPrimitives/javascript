import Rect from '../structs/Rect';
import Size from '../structs/Size';
import PaletteItem from '../structs/PaletteItem';
import { ConnectorPlacementType } from '../../enums';
import Transform from '../Transform';
import PolylinesBuffer from '../structs/PolylinesBuffer';
import ConnectorAnnotationOffsetResolver from '../../tasks/renders/offsetResolver/ConnectorAnnotationOffsetResolver';
import ConnectorOffbeat from '../shapes/ConnectorOffbeat';
import ConnectorStraight from '../shapes/ConnectorStraight';
import { isNullOrEmpty } from '../../common';
import RenderEventArgs from '../../events/RenderEventArgs';

export default function ConnectorAnnotation() {

};

ConnectorAnnotation.prototype.draw = function (annotationConfig, graphics, controlSize, labelTemplate) {
    var shape,
      uiHash,
      transform = new Transform(),
      panel,
      buffer = new PolylinesBuffer(),
      connectorAnnotationOffsetResolver = ConnectorAnnotationOffsetResolver();

    graphics.reset("placeholder");
    panel = graphics.activate("placeholder");
    transform.size = new Size(controlSize.width, controlSize.height);
    transform.setOrientation(annotationConfig.orientationType);

    if (annotationConfig.fromRectangle != null && annotationConfig.toRectangle != null) {
      var fromRect = annotationConfig.fromRectangle,
        toRect = annotationConfig.toRectangle;

      /* translate rectangles to Top orientation */
      /* from rectangle */
      transform.transformRect(fromRect.x, fromRect.y, fromRect.width, fromRect.height, false,
        this, function (x, y, width, height) {
          fromRect = new Rect(x, y, width, height);
        });

      /* to rectangle */
      transform.transformRect(toRect.x, toRect.y, toRect.width, toRect.height, false,
        this, function (x, y, width, height) {
          toRect = new Rect(x, y, width, height);
        });

      switch (annotationConfig.connectorPlacementType) {
        case ConnectorPlacementType.Offbeat:
          shape = new ConnectorOffbeat();
          break;
        case ConnectorPlacementType.Straight:
          shape = new ConnectorStraight();
          break;
      }

      /* rotate label size to user orientation */
      var labelSize;
      transform.transformRect(0, 0, annotationConfig.labelSize.width, annotationConfig.labelSize.height, false,
        this, function (x, y, width, height) {
          labelSize = new Size(width, height);
        });

      /* rotate panel size to user orientation */
      var panelSize = null;
      transform.transformRect(0, 0, panel.size.width, panel.size.height, false,
        this, function (x, y, width, height) {
          panelSize = new Size(width, height);
        });

      var linePaletteItem = new PaletteItem({
        lineColor: annotationConfig.color,
        lineWidth: annotationConfig.lineWidth,
        lineType: annotationConfig.lineType
      });

      var hasLabel = !isNullOrEmpty(annotationConfig.label);

      /* offset rectangles */
      fromRect = new Rect(fromRect).offset(annotationConfig.offset);
      toRect = new Rect(toRect).offset(annotationConfig.offset);

      var linesOffset = annotationConfig.lineWidth * 6;

      /* create connection lines */
      shape.draw(buffer, linePaletteItem, fromRect, toRect, linesOffset, 0, labelSize, panelSize,
        annotationConfig.connectorShapeType, annotationConfig.labelOffset, annotationConfig.labelPlacementType, hasLabel,
        connectorAnnotationOffsetResolver, function (labelPlacement, labelConfig) {
          var hasLabel = !isNullOrEmpty(labelConfig.label);
          if (hasLabel && labelPlacement != null) {
            /* translate result label placement back to users orientation */
            transform.transformRect(labelPlacement.x, labelPlacement.y, labelPlacement.width, labelPlacement.height, true,
              self, function (x, y, width, height) {
                labelPlacement = new Rect(x, y, width, height);
              });

            uiHash = new RenderEventArgs();
            uiHash.context = labelConfig;

            /* draw label */
            graphics.template(
              labelPlacement.x
              , labelPlacement.y
              , 0
              , 0
              , 0
              , 0
              , labelPlacement.width
              , labelPlacement.height
              , labelTemplate.template()
              , labelTemplate.getHashCode()
              , labelTemplate.render
              , uiHash
              , null
            );
          }
        }, annotationConfig);
      connectorAnnotationOffsetResolver.resolve();
    }

    /* translate result polylines back to users orientation */
    buffer.transform(transform, true);
    /* draw background polylines */
    graphics.polylinesBuffer(buffer);
  }