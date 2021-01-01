import JsonML from '../../common/jsonml-html';
import { getBorderStyle } from '../../graphics/EnumValues';

export default function LevelBackgroundTemplate(options, levelAnnotationConfig) {
  var _template = create(levelAnnotationConfig);

  function create(config) {
    return ["div"];
  }

  function template() {
    return _template;
  }

  function getHashCode() {
    return "levelAnnotationBackgroundTemplate";
  }

  function render(event, data) {
    var annotationConfig = data.context;
    var style = {
      opacity: annotationConfig.opacity,
      borderColor: annotationConfig.borderColor,
      backgroundColor: annotationConfig.fillColor,
      borderWidth: annotationConfig.lineWidth.toString(),
      borderStyle: getBorderStyle(annotationConfig.lineType)
    }
    var container = data.element;
    JsonML.applyStyles(container, style);
  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
};