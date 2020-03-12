primitives.orgdiagram.OptionsTask = function (getOptions) {

  function process() {
    return true;
  }

  return {
    process: process,
    getOptions: getOptions,
    description: "Raw options."
  };
};