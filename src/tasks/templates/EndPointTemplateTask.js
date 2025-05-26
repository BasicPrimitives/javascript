export default function EndPointTemplateTask(endPointsOptionTask /* changes in items update layout anyway */, templates) {
  var _data = {
    endPointTemplate: null,
  };

  function process() {
    _data.template = null;
    return false;
  }

  function getTemplate() {
    var options;
    if (_data.endPointTemplate == null) {
      options = endPointsOptionTask.getOptions();
      var { onEndPointRender } = options;
      if( onEndPointRender != null ) {
        _data.endPointTemplate = new templates.CustomRenderTemplate(options, onEndPointRender);  
      } else {
        _data.endPointTemplate = new templates.EndPointTemplate(options);
      }
    }
    return _data.endPointTemplate;
  }

  return {
    process: process,
    getTemplate: getTemplate
  };
};