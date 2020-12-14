import DummyTemplate from '../../../templates/pdf/DummyTemplate';

export default function DummyButtonsTemplateTask(itemsSizesOptionTask) {
  var _data = {
    template: null
  };

  function process() {
    return false;
  }

  function getTemplate() {
    if (_data.template == null) {
      _data.template = new DummyTemplate();
    }
    return _data.template;
  }

  return {
    process: process,
    getTemplate: getTemplate
  };
};