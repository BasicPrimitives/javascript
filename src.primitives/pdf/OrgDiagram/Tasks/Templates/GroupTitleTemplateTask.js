primitives.pdf.orgdiagram.GroupTitleTemplateTask = function (templatesOptionTask) {
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
      options = templatesOptionTask.getOptions();
      _data.template = new primitives.pdf.GroupTitleTemplate(options.itemTitleFirstFontColor, options.itemTitleSecondFontColor);
    }
    return _data.template;
  }

  return {
    process: process,
    getTemplate: getTemplate
  };
};