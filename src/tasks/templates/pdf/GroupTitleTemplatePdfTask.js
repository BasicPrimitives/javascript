import GroupTitleTemplate from '../../../templates/pdf/GroupTitleTemplate';

export default function GroupTitleTemplateTask(templatesOptionTask) {
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
      _data.template = new GroupTitleTemplate(options.itemTitleFirstFontColor, options.itemTitleSecondFontColor);
    }
    return _data.template;
  }

  return {
    process: process,
    getTemplate: getTemplate
  };
};