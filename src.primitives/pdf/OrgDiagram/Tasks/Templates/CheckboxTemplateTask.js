primitives.pdf.orgdiagram.CheckBoxTemplateTask = function (itemsSizesOptionTask) {
  var _data = {
    template: null
  };

  function process() {
    _data.template = null;
    return true;
  }

  function getTemplate() {
    var options;
    if (_data.template == null) {
      options = itemsSizesOptionTask.getOptions();
      _data.template = new primitives.pdf.CheckBoxTemplate(options.selectCheckBoxLabel);
    }
    return _data.template;
  }

  return {
    process: process,
    getTemplate: getTemplate
  };
};