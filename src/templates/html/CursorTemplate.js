export default function CursorTemplate(options, itemTemplateConfig) {
  var _template = create(itemTemplateConfig);

  function create(config) {
    return ["div",
      {
        "style": {
          width: (config.itemSize.width + config.cursorPadding.left + config.cursorPadding.right) + "px",
          height: (config.itemSize.height + config.cursorPadding.top + config.cursorPadding.bottom) + "px",
          "borderWidth": config.cursorBorderWidth + "px"
        },
        "class": ["bp-item", "bp-corner-all", "bp-cursor-frame"]
      }
    ];
  }

  function template() {
    return _template;
  }

  function getHashCode() {
    return "defaultCursorTemplate";
  }

  function render(event, data) {

  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
};