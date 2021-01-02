import { highestContrast } from '../../common/colors';
import { renderRotatedText } from './RotatedText';

export default function GroupTitleTemplate(options) {
  var {
    groupTitleFontSize, 
    groupTitleFontFamily: fontFamily,
    groupTitleFontWeight: fontWeight,
    groupTitleFontStyle: fontStyle,
    groupTitleOrientation: textOrientation,
    groupTitleHorizontalAlignment: horizontalAlignment,
    groupTitleVerticalAlignment: verticalAlignment,
    groupTitleColor, 
    itemTitleFirstFontColor, 
    itemTitleSecondFontColor
  } = options;
  function template() {
    return {};
  }

  function getHashCode() {
    return 0;
  }

  function render(doc, position, data) {
    var itemConfig = data.context,
      titleColor = itemConfig.groupTitleColor || groupTitleColor,
      fontColor = highestContrast(titleColor, itemTitleSecondFontColor, itemTitleFirstFontColor),
      label = itemConfig.groupTitle;

    var fontSize = parseInt(groupTitleFontSize, 10);

    renderRotatedText({doc, textOrientation, label, fontSize, fontColor, position, titleColor, horizontalAlignment, verticalAlignment });
  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
};

