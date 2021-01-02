import { TextOrientationType, OrientationType } from '../../enums';
import { renderRotatedText } from './RotatedText';

export default function LevelTitleTemplate(options, orientation) {
  var {levelTitleFontSize, 
    levelTitleFontFamily: fontFamily,
    levelTitleFontWeight: fontWeight,
    levelTitleFontStyle: fontStyle,
    levelTitleFontColor,
    levelTitleOrientation: textOrientation,
    levelTitleHorizontalAlignment: horizontalAlignment,
    levelTitleVerticalAlignment: verticalAlignment,
    levelTitleColor    
  } = options;

  function template() {
    return {};
  }

  function getHashCode() {
    return 0;
  }

  function render(doc, position, data) {
    var config = data.context,
      titleColor = config.titleColor || levelTitleColor,
      label = config.title,
      fontColor = config.titleFontColor || levelTitleFontColor;

    if(textOrientation == TextOrientationType.Auto) {
      switch (orientation) {
        case OrientationType.Top:
          textOrientation = TextOrientationType.RotateRight;
          break;
        case OrientationType.Bottom:
          textOrientation = TextOrientationType.RotateLeft;
          break;
        case OrientationType.Left:
        case OrientationType.Right:
          break;
      }
    }

    var fontSize = parseInt(levelTitleFontSize, 10);

    renderRotatedText({doc, textOrientation, label, fontSize, fontColor, position, titleColor, horizontalAlignment, verticalAlignment });
  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
};

