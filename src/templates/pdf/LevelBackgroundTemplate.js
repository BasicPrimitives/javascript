export default function LevelBackgroundTemplate(options, levelAnnotationConfig) {
  function template() {
    return {};
  }

  function getHashCode() {
    return 0;
  }

  function render(doc, position, data) {
    var annotationConfig = data.context;
    // var style = {
    //   opacity: annotationConfig.opacity,
    //   borderColor: annotationConfig.borderColor,
    //   backgroundColor: annotationConfig.fillColor,
    //   borderWidth: annotationConfig.lineWidth.toString(),
    //   borderStyle: getBorderStyle(annotationConfig.lineType)
    // }

    /* item border */
    doc.rect(position.x, position.y, position.width, position.height, 0)
      .fillColor(annotationConfig.fillColor, annotationConfig.opacity)
      .fill();
  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
};