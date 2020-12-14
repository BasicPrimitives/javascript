export default function LabelAnnotationTemplate() {
  function template() {
    return {};
  }

  function getHashCode() {
    return 0;
  }

  function render(doc, position, data) {
    var itemConfig = data.context;

    doc.save();

    doc.font('Helvetica', 12)
      .text(itemConfig.title, position.x, position.y, {
        width: position.width,
        height: position.height,
        align: 'center'
      });

    doc.restore();
  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
};