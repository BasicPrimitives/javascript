import { LineType, PlacementType } from '../../enums';

export default function LevelBackgroundTemplate(options, levelAnnotationConfig) {
  function template() {
    return {};
  }

  function getHashCode() {
    return 0;
  }

  function render(doc, position, data) {
    var annotationConfig = data.context;
    var {
      opacity,
      borderColor,
      fillColor,
      lineWidth: borderWidth,
      lineType
    } = annotationConfig;

    doc.save();

    /* item border */
    doc.rect(position.x, position.y, position.width, position.height, 0)
      .fillColor(fillColor, opacity)
      .fill();

    doc.lineJoin('round');

    position.loopEdges(function(vector, placementType) {
      var lineWidth = 0;
      switch(placementType) {
        case PlacementType.Top:
          lineWidth = borderWidth.top;
          break;
        case PlacementType.Right:
          lineWidth = borderWidth.right;
          break;
        case PlacementType.Bottom:
          lineWidth = borderWidth.bottom;
          break;
        case PlacementType.Left:
          lineWidth = borderWidth.left;
          break;
      }
      if(lineWidth > 0) {
        if (lineType != null) {
          var step = Math.round(lineWidth) || 1;
          switch (lineType) {
            case LineType.Solid:
              break;
            case LineType.Dotted:
              doc.dash(step, step * 2);
              break;
            case LineType.Dashed:
              doc.dash(step * 5, step * 3);
              break;
          }
        }
        doc.moveTo(vector.from.x, vector.from.y)
          .lineTo(vector.to.x, vector.to.y)
          .lineWidth(lineWidth)
          .strokeColor(borderColor)
          .stroke();
      }
    });

    doc.restore();
  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
};