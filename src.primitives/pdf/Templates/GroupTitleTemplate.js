primitives.pdf.GroupTitleTemplate = function (itemTitleFirstFontColor, itemTitleSecondFontColor) {
  function template() {
    return {};
  }

  function getHashCode() {
    return 0;
  }

  function render(doc, position, data) {
    var itemConfig = data.context,
      groupTitleColor = itemConfig.groupTitleColor || primitives.common.Colors.RoyalBlue,
      color = primitives.common.highestContrast(groupTitleColor, itemTitleSecondFontColor, itemTitleFirstFontColor);

    /* title background */
    doc.save();
    doc.translate(position.width, 0)
      .rotate(90, {
        origin: [position.x, position.y]
      });
    doc.fillColor(groupTitleColor)
      .roundedRect(position.x, position.y, position.height - 2, position.width, 4)
      .fill();

    /* title */
    doc.fillColor(color)
      .font('Helvetica', 12)
      .text(itemConfig.groupTitle, position.x + 4, position.y + 6, {
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

