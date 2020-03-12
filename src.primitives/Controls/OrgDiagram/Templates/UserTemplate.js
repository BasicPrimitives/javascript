primitives.common.UserTemplate = function (options, content, onRender) {
  var _hashCode = primitives.common.hashCode(JSON.stringify(content));

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
        itemTitleColor = itemConfig.itemTitleColor != null ? itemConfig.itemTitleColor : primitives.common.Colors.RoyalBlue,
        color = primitives.common.highestContrast(itemTitleColor, options.itemTitleSecondFontColor, options.itemTitleFirstFontColor);

      primitives.common.getElementsByName(this, data.element, "photo", function (node) {
        node.src = itemConfig.image;
        node.alt = itemConfig.title;
      });

      primitives.common.getElementsByName(this, data.element, "titleBackground", function (node) {
        primitives.common.JsonML.applyStyles(node, {
          "background": itemTitleColor
        });
      });

      primitives.common.getElementsByName(this, data.element, "title", function (node) {
        primitives.common.JsonML.applyStyles(node, {
          "color": color
        });
        node.textContent = itemConfig.title;
      });

      primitives.common.getElementsByName(this, data.element, "description", function (node) {
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