/* jshint latedef: true, unused: false */
export default function AnnotationLabelTemplate() {
  function template() {
    return {};
  }

  function getHashCode() {
    return 0;
  }

  function render(doc, position, data) {
    var annotationConfig = data.context;

    doc.save();

    doc.font('Helvetica', 12)
      .text(annotationConfig.label, position.x, position.y, {
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