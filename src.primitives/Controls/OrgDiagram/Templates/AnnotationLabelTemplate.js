/* jshint latedef: true, unused: false */
primitives.common.AnnotationLabelTemplate = function () {
  var _template = ["div",
    {
      "type": "checkbox",
      "name": "checkbox",
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
    var annotationConfig = data.context;
    if (primitives.common.isArray(annotationConfig.label)) {
      data.element.innerHTML = "";
      data.element.appendChild(primitives.common.JsonML.toHTML(annotationConfig.label));
    } else {
      data.element.innerHTML = annotationConfig.label;
    }
  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
};