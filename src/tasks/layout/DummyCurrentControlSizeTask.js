import Size from '../../graphics/structs/Size';

export default function DummyCurrentControlSizeTask(optionsTask) {
  function process() {
    return true;
  }

  function getOptions() {
    return {
      scrollPanelSize: new Size(800, 600),
      optimalPanelSize: new Size(800 - 25, 600 - 25),
      hasFrame: true,
      hasLevelTitles: true
    }
  }

  return {
    process: process,
    getOptions: getOptions
  };
};
