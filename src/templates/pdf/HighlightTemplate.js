export default function HighlightTemplate(options, itemTemplateConfig) {
  var _config = itemTemplateConfig;

  function template() {
    return {};
  }

  function getHashCode() {
    return 0;
  }

  function render(doc, position, _data) {
    doc.save();

    /* border */
    doc.roundedRect(position.x, position.y, position.width, position.height, 4)
      .lineWidth(_config.highlightBorderWidth)
      .stroke('#fbcb09');

    doc.restore();
  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
};