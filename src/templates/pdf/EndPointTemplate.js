export default function EndPointTemplate(options) {

  function template() {
    return {};
  }

  function getHashCode() {
    return 0;
  }

  function render(doc, position, _data) {
    doc.save();
    
    /* border */
    doc.roundedRect(position.x, position.y, position.width, position.height, options.endPointCornerRadius)
      .lineWidth(0)
      .fill(options.endPointFillColor);

    doc.restore();
  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
};