import { highestContrast } from '../../common/colors';
import { Colors }  from '../../enums';
import Size from '../../graphics/structs/Size';

export default function ItemTemplate(options, itemTemplateConfig) {
  var _config = itemTemplateConfig;

  function template() {
    return {};
  }

  function getHashCode() {
    return 0;
  }

  function render(doc, position, data) {
    var itemConfig = data.context,
      itemTitleColor = itemConfig.itemTitleColor != null ? itemConfig.itemTitleColor : Colors.RoyalBlue,
      color = highestContrast(itemTitleColor, options.itemTitleSecondFontColor, options.itemTitleFirstFontColor),
      contentSize = new Size(_config.itemSize);

    contentSize.width -= _config.itemBorderWidth * 2;
    contentSize.height -= _config.itemBorderWidth * 2;

    doc.save();

    /* item border */
    doc.roundedRect(position.x, position.y, position.width, position.height, 4)
      .lineWidth(_config.itemBorderWidth)
      .stroke('#dddddd');

    /* title background */
    doc.fillColor(itemTitleColor)
      .roundedRect(position.x + 2, position.y + 2, (contentSize.width - 4), 18, 2)
      .fill();

    /* title */
    doc.fillColor(color)
      .font('Helvetica', 12)
      .text(itemConfig.title, position.x + 4, position.y + 7, {
        ellipsis: true,
        width: (contentSize.width - 4 - 4 * 2),
        height: 16,
        align: 'left'
      });

    /* photo */
    if (itemConfig.image != null) {
      doc.image(itemConfig.image, position.x + 3, position.y + 24);
    }
    /* photo frame */
    doc.rect(position.x + 3, position.y + 24, 50, 60)
      .stroke('#cccccc');

    /* description */
    doc.fillColor('black')
      .font('Helvetica', 10)
      .text(itemConfig.description, position.x + 56, position.y + 24, {
        ellipsis: true,
        width: (contentSize.width - 4 - 56),
        height: 74,
        align: 'left'
      });
    doc.restore();
  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
};