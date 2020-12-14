export default function DummyTemplate() {
  function template() {
    return {};
  }

  function getHashCode() {
    return 0;
  }

  function render() { }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
};