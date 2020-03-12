primitives.pdf.UserTemplate = function (options, itemTemplateConfig, onRender) {
  function template() {
    return {};
  }

  function getHashCode() {
    return 0;
  }

  function render(doc, position, data) {
    if (onRender != null) {
      onRender(doc, position, data);
    } else {
      var itemTemplate = primitives.pdf.ItemTemplate(options, itemTemplateConfig);
      itemTemplate.render(doc, position, data);
    }
  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
};