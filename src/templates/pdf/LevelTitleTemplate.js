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

    /* title background */
    doc.save();
    doc.translate(position.width, 0)
      .rotate(90, {
        origin: [position.x, position.y]
      });
    doc.fillColor(titleColor)
      .roundedRect(position.x, position.y, position.height - 2, position.width, 4)
      .fill();

    /* title */
    doc.fillColor(fontColor)
      .font(fontFamily, fontSize)
      .text(label, position.x + 4, position.y + 6, {
        ellipsis: true,
        width: (position.height - 4),
        height: position.width - 4,
        align: 'center'
      });
    doc.restore();
  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
};

