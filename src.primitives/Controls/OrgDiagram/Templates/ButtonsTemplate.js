primitives.common.ButtonsTemplate = function (options) {
  var _template = ["div", {
    "style": {
      position: "absolute"
    }
  }
  ];

  function template() {
    return _template;
  }

  function getHashCode() {
    return "defaultButtonsTemplate";
  }

  function render(event, data) {
    var element = data.element,
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
          button = ["button",
            {
              "style": {
                position: "absolute",
                top: topOffset + "px",
                left: "0px"
              },
              "class": ["orgdiagrambutton", "bp-button"],
              "data-buttonname": buttonConfig.name
            },
            ["span",
              {
                "style": {
                  width: buttonConfig.size.width + "px",
                  height: buttonConfig.size.height + "px"
                },
                "class": ["bp-icon", buttonConfig.icon]
              }
            ]
          ];
          data.element.appendChild(primitives.common.JsonML.toHTML(button));
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

