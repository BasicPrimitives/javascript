export default function HighlightTemplate(options, itemTemplateConfig) {
  var _template = create(itemTemplateConfig);

  function create(config) {
    return ["div",
      {
        "style": {
          "borderWidth": config.highlightBorderWidth + "px"
        },
        "class": ["bp-item", "bp-corner-all", "bp-highlight-frame"]
      }
    ];
  }

  function template() {
    return _template;
  }

  function getHashCode() {
    return "defaultHighlightTemplate";
  }

  function render(event, data) {

  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
};