export default function LevelAnnotationTemplateTask(orientationOptionTask, levelTitleTemplateOptionTask, templates) {
  var _data = {
    backgroundTemplate: null,
    titleTemplate: null
  };

  function process() {
    _data.backgroundTemplate = null;
    _data.titleTemplate = null;
    return true;
  }

  function getBackgroundTemplate() {
    var options;
    if (_data.backgroundTemplate == null) {
      options = levelTitleTemplateOptionTask.getOptions();
      var { onLevelBackgroundRender } = options;
      if( onLevelBackgroundRender != null ) {
        _data.backgroundTemplate = new templates.CustomRenderTemplate(options, onLevelBackgroundRender);  
      } else {
        _data.backgroundTemplate = new templates.LevelBackgroundTemplate(options);
      }
    }
    return _data.backgroundTemplate;
  }

  function getTitleTemplate() {
    var options;
    if (_data.titleTemplate == null) {
      var { orientationType: orientation } = orientationOptionTask.getOptions();
      options = levelTitleTemplateOptionTask.getOptions();
      var { onLevelTitleRender } = options;
      if( onLevelTitleRender != null ) {
        _data.titleTemplate = new templates.CustomRenderTemplate(options, onLevelTitleRender);  
      } else {
        _data.titleTemplate = new templates.LevelTitleTemplate(options, orientation);
      }
    }
    return _data.titleTemplate;
  }

  return {
    process: process,
    getBackgroundTemplate: getBackgroundTemplate,
    getTitleTemplate: getTitleTemplate
  };
};