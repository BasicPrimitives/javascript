primitives.common.jQueryButtonsTemplate = function (options) {
  var _template = create(),
    _hashCode = primitives.common.hashCode(_template);

  function create() {
    var template = jQuery("<ul></ul>");

    template.css({
      position: "absolute"
    }).addClass("ui-widget ui-helper-clearfix");

    return template.wrap('<div>').parent().html();
  }

  function template() {
    return _template;
  }

  function getHashCode() {
    return _hashCode;
  }

  function render(event, data) {
    var name = "orgdiagram",
      element = jQuery(data.element),
      topOffset = 0,
      buttonsInterval = 10,
      buttonConfig,
      buttons = data.buttons,
      buttonprop,
      button,
      index;

    switch (data.renderingMode) {
      case primitives.common.RenderingMode.Create:
        for (index = 0; index < buttons.length; index += 1) {
          buttonConfig = buttons[index];
          button = jQuery('<li data-buttonname="' + buttonConfig.name + '"></li>')
            .css({
              position: "absolute",
              top: topOffset + "px",
              left: "0px",
              width: buttonConfig.size.width + "px",
              height: buttonConfig.size.height + "px",
              padding: "3px"
            })
            .addClass(name + "button");
          element.append(button);
          buttonprop = {
            icons: { primary: buttonConfig.icon },
            label: buttonConfig.label
          };
          if (buttonConfig.text != "") {
            buttonprop.text = buttonConfig.text;
          }
          if (!primitives.common.isNullOrEmpty(buttonConfig.tooltip)) {
            button.attr('title', buttonConfig.tooltip);
          }
          button.button(buttonprop);
          topOffset += buttonsInterval + buttonConfig.size.height;
        }
        break;
      case primitives.common.RenderingMode.Update:
        break;
    }
  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
};

