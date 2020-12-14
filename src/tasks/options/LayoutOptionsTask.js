export default function LayoutOptionsTask(getLayout, optionsTask) {
  var _data = {};

  function process() {
    _data = getLayout();

    return true;
  }

  function getOptions() {
    return _data;
  }

  return {
    process: process,
    getOptions: getOptions,
    description: "Raw layout options."
  };
};