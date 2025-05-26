export default function AnnotationLabelTemplateTask(itemsSizesOptionTask /* changes in items update layout anyway */, templates) {
  var _data = {
    labelTemplate: null
  };

  function process() {
    return false;
  }

  function getTemplate() {
    if (_data.labelTemplate == null) {
      _data.labelTemplate = new templates.AnnotationLabelTemplate();
    }
    return _data.labelTemplate;
  }

  return {
    process: process,
    getTemplate: getTemplate
  };
};