export default function CursorTemplate(options, itemTemplateConfig) {
  var _config = itemTemplateConfig;

  function template() {
    return {};
  }

  function getHashCode() {
    return 0;
  }

  function render(doc, position, data) {
    doc.save();

    /* item border */
    doc.roundedRect(position.x, position.y, position.width, position.height, 4)
      .lineWidth(_config.cursorBorderWidth)
      .stroke('#fbd850');

    doc.restore();
  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
};