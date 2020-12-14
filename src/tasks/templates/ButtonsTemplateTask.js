export default function ButtonsTemplateTask(itemsSizesOptionTask, templates) {
  var _data = {
    template: null
  };

  function process() {
    return false;
  }

  function getTemplate() {
    if (_data.template == null) {
      _data.template = new templates.ButtonsTemplate;
    }
    return _data.template;
  }

  return {
    process: process,
    getTemplate: getTemplate
  };
};