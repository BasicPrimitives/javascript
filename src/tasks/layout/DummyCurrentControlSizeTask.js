import Size from '../../graphics/structs/Size';

export default function DummyCurrentControlSizeTask(optionsTask) {
  function process() {
    return true;
  }

  function getScrollPanelSize() {
    return new Size(800, 600);
  }

  function getOptimalPanelSize() {
    return new Size(800 - 25, 600 - 25);
  }

  return {
    process: process,
    getScrollPanelSize: getScrollPanelSize,
    getOptimalPanelSize: getOptimalPanelSize
  };
};