import AnnotationLabelTemplate from '../../../templates/pdf/AnnotationLabelTemplate';

export default function AnnotationLabelTemplatePdfTask(itemsSizesOptionTask) {
  var _data = {
    template: null
  };

  function process() {
    return false;
  }

  function getTemplate() {
    if (_data.template == null) {
      _data.template = new AnnotationLabelTemplate();
    }
    return _data.template;
  }

  return {
    process: process,
    getTemplate: getTemplate
  };
};