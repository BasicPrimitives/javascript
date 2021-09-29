export default function CustomRenderTemplate(options, onRender) {
  function template() {
    return {};
  }

  function getHashCode() {
    return 0;
  }

  function render(doc, position, data) {
    if (onRender != null) {
      onRender(doc, position, data);
    }
  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
};

