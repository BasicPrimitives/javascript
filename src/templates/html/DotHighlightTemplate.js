export default function DotHighlightTemplate(options, itemTemplateConfig) {
  var _template = create(itemTemplateConfig);

  function create(config) {
    var radius = config.minimizedItemCornerRadius;
    if (radius == null) {
      radius = Math.max(
        config.highlightPadding.left + config.minimizedItemSize.width + config.highlightPadding.right,
        config.highlightPadding.top + config.minimizedItemSize.height + config.highlightPadding.bottom
      ) + config.highlightBorderWidth;
    }
    return ["div",
      {
        "style": {
          "borderWidth": config.highlightBorderWidth + "px",
          "MozBorderRadius": radius + "px",
          "WebkitBorderRadius": radius + "px",
          "-khtml-border-radius": radius + "px",
          "borderRadius": radius + "px"
        },
        "class": ["bp-item", "bp-highlight-dot-frame"]
      }
    ];
  }

  function template() {
    return _template;
  }

  function getHashCode() {
    return "defaultDotHighlightTemplate";
  }

  function render(event, data) {

  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
};