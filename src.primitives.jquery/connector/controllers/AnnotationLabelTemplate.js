primitives.connector.AnnotationLabelTemplate = function (options) {
  var _template = ["div",
    {
      "class": ["bp-item", "bp-corner-all", "bp-connector-label"]
    }
  ];

  function template() {
    return _template;
  }

  function getHashCode() {
    return "defaultAnnotationLabelTemplate";
  }

  function render(event, data) {
    data.element.innerHTML = options.label;
  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
};

