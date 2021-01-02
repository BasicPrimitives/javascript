import { getHashCode as getCommonHashCode } from '../../common';
import { getRotatedText, updateRotatedText } from './RotatedText';
import JsonML from '../../common/jsonml-html';

export default function LevelTitleTemplate(options, orientation) {
  var {levelTitleFontSize: fontSize, 
    levelTitleFontFamily: fontFamily,
    levelTitleFontWeight: fontWeight,
    levelTitleFontStyle: fontStyle,
    levelTitleFontColor,
    levelTitleOrientation: textOrientation,
    levelTitleHorizontalAlignment: horizontalAlignment,
    levelTitleVerticalAlignment: verticalAlignment,
    levelTitleColor    
  } = options;

  var _template = create();
  var _hashCode = getCommonHashCode(JSON.stringify(_template));
  
  function create() {
    return ["div",
      {
        "style": {
          "fontSize": fontSize,
          "fontFamily": fontFamily,
          "fontWeight": fontWeight,
          "fontStyle": fontStyle
        },
        "class": ["bp-item", "bp-corner-all"]
      },
      getRotatedText({orientation, textOrientation, horizontalAlignment, verticalAlignment, fontSize, fontFamily, fontWeight, fontStyle})
    ];
  }

  function template() {
    return _template;
  }

  function getHashCode() {
    return _hashCode;
  }

  function render(event, data) {
    var config = data.context,
      { element, width, height } = data,
      titleColor = config.titleColor || levelTitleColor,
      label = config.title,
      fontColor = config.titleFontColor || levelTitleFontColor;

    updateRotatedText({element, orientation, textOrientation, width, height, label, fontColor });

    JsonML.applyStyles(data.element, {
      "backgroundColor": titleColor
    });
  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
};

