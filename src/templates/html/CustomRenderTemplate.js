export default function CustomRenderTemplate(options, onRender) {
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
    return "customRenderTemplate";
  }

  function render(event, data) {
    if(onRender != null) {
      onRender(data);
    }
  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
};

