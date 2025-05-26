export default function EndPointTemplate(options) {
  var _template = create(options);

  function create(options) {
    var radius = options.endPointCornerRadius;
    return ["div",
      {
        "style": {
          "MozBorderRadius": radius + "px",
          "WebkitBorderRadius": radius + "px",
          "-khtml-border-radius": radius + "px",
          "borderRadius": radius + "px",
          "background": options.endPointFillColor,
          "opacity": options.endPointOpacity,
          "border": "0px"
        },
        "class": ["bp-item", "bp-endpoint-dot-frame"]
      }
    ];
  }

  function template() {
    return _template;
  }

  function getHashCode() {
    return "defaultEndPointTemplate";
  }

  function render(event, data) {

  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
};