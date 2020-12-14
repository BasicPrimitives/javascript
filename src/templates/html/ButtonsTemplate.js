export default function ButtonsTemplate(options) {
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
    var onButtonsRender = data.onButtonsRender;
    if(onButtonsRender != null) {
      onButtonsRender(data);
    }
  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
};

