export default function LabelAnnotationTemplate() {
  var _template = ["div",
    {
      "class": ["bp-item", "bp-label-annotation"]
    }
  ];

  function template() {
    return _template;
  }

  function getHashCode() {
    return "defaultLabelAnnotationTemplate";
  }

  function render(event, data) {
    var itemConfig = data.context;
    data.element.innerHTML = itemConfig.title;
  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
};