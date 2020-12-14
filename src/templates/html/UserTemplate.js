import { getHashCode as getCommonHashCode } from '../../common';
import { highestContrast } from '../../common/colors';
import { getElementsByName } from '../../graphics/dom';
import JsonML from '../../common/jsonml-html';
import { Colors } from '../../enums';

export default function UserTemplate(options, content, onRender) {
  var _hashCode = getCommonHashCode(JSON.stringify(content));

  function template() {
    return content;
  }

  function getHashCode() {
    return _hashCode;
  }

  function render(event, data) {
    if (onRender != null) {
      onRender(event, data);
    } else {
      var itemConfig = data.context,
        itemTitleColor = itemConfig.itemTitleColor != null ? itemConfig.itemTitleColor : Colors.RoyalBlue,
        color = highestContrast(itemTitleColor, options.itemTitleSecondFontColor, options.itemTitleFirstFontColor);

      getElementsByName(this, data.element, "photo", function (node) {
        node.src = itemConfig.image;
        node.alt = itemConfig.title;
      });

      getElementsByName(this, data.element, "titleBackground", function (node) {
        JsonML.applyStyles(node, {
          "background": itemTitleColor
        });
      });

      getElementsByName(this, data.element, "title", function (node) {
        JsonML.applyStyles(node, {
          "color": color
        });
        node.textContent = itemConfig.title;
      });

      getElementsByName(this, data.element, "description", function (node) {
        node.textContent = itemConfig.description;
      });
    }
  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
};