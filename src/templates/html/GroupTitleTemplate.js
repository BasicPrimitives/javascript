import { OrientationType }  from '../../enums';
import JsonML from '../../common/jsonml-html';
import { highestContrast } from '../../common/colors';
import { getRotatedText, updateRotatedText } from './RotatedText';

export default function GroupTitleTemplate(options) {
  var {groupTitleFontSize: fontSize, 
    groupTitleFontFamily: fontFamily,
    groupTitleFontWeight: fontWeight,
    groupTitleFontStyle: fontStyle,
    groupTitleColor,
    itemTitleFirstFontColor,
    itemTitleSecondFontColor,
    groupTitleOrientation: textOrientation,
    groupTitleHorizontalAlignment: horizontalAlignment,
    groupTitleVerticalAlignment: verticalAlignment
  } = options;

  var _template = create();

  function create() {
    return ["div",
      {
        "style": {
          "fontSize": fontSize,
          "fontFamily": fontFamily,
          "fontWeight": fontWeight,
          "fontStyle": fontStyle
        },
        "class": ["bp-item", "bp-corner-all", "bp-grouptitle-frame"]
      },
      getRotatedText({orientation: OrientationType.Horizontal, textOrientation, horizontalAlignment, verticalAlignment, fontSize, fontFamily, fontWeight, fontStyle})
    ];
  }

  function template() {
    return _template;
  }

  function getHashCode() {
    return "defaultGroupTitleTemplate";
  }

  function render(event, data) {
    var { element, context: itemConfig, width, height } = data,
      label = itemConfig.groupTitle,
      backgroundColor = itemConfig.groupTitleColor || groupTitleColor,
      fontColor = highestContrast(backgroundColor, itemTitleSecondFontColor, itemTitleFirstFontColor);
    
    updateRotatedText({element, orientation: OrientationType.Horizontal, textOrientation, verticalAlignment, width, height, label, fontColor });

    JsonML.applyStyles(data.element, {
      "backgroundColor": backgroundColor
    });
  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
};

