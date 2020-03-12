primitives.pdf.orgdiagram.DummyCurrentControlSizeTask = function (optionsTask) {
  function process() {
    return true;
  }

  function getScrollPanelSize() {
    return new primitives.common.Size(800, 600);
  }

  function getOptimalPanelSize() {
    return new primitives.common.Size(800 - 25, 600 - 25);
  }

  return {
    process: process,
    getScrollPanelSize: getScrollPanelSize,
    getOptimalPanelSize: getOptimalPanelSize
  };
};