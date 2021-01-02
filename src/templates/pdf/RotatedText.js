import { TextOrientationType, VerticalAlignmentType } from '../../enums';
import Rect from '../../graphics/structs/Rect';
import { getTextAlign } from '../../graphics/EnumValues';

export function renderRotatedText({doc, textOrientation, label, fontSize, fontColor, position, titleColor, horizontalAlignment, verticalAlignment }) {
    doc.save();

    doc.fillColor(titleColor)
    .roundedRect(position.x, position.y, position.width - 2, position.height, 4)
    .fill();

    var labelPosition = new Rect(position.x + 4, position.y, position.width - 8, position.height);
    switch (textOrientation) {
      case TextOrientationType.RotateLeft:
        doc.translate( 0, position.height)
        .rotate(-90, {
          origin: [position.x, position.y]
        });
        labelPosition = new Rect(position.x + 4, position.y, position.height - 8, position.width);
        break;
      case TextOrientationType.RotateRight:
        doc.translate(position.width, 0)
        .rotate(90, {
          origin: [position.x, position.y]
        });
        labelPosition = new Rect(position.x + 4, position.y, position.height - 8, position.width);
        break;
      default:
        break;
    }

    doc.font('Helvetica', fontSize);

    var textHeight = doc.currentLineHeight();

    switch(verticalAlignment) {
      case VerticalAlignmentType.Top:
        labelPosition.y +=2;
        break;
      case VerticalAlignmentType.Middle:
        labelPosition.y += Math.ceil(labelPosition.height / 2 - textHeight / 2);
        break;
      case VerticalAlignmentType.Bottom:
        labelPosition.y += Math.ceil(labelPosition.height - textHeight - 1);
        break;

    }

    /* title */
    doc.fillColor(fontColor)
      .text(label, labelPosition.x, labelPosition.y, {
        ellipsis: true,
        width: labelPosition.width,
        height: labelPosition.height,
        align: getTextAlign(horizontalAlignment)
      });
    doc.restore();    
}