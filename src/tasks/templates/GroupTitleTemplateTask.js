export default function GroupTitleTemplateTask(templatesOptionTask, templates) {
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
      var { onGroupTitleRender } = options;
      if(onGroupTitleRender != null) {
        _data.template = new templates.CustomRenderTemplate(options, onGroupTitleRender);  
      } else {
        _data.template = new templates.GroupTitleTemplate(options);
      }
    }
    return _data.template;
  }

  return {
    process: process,
    getTemplate: getTemplate
  };
};