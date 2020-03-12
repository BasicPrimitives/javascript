/* eliminate invisible items */
primitives.famdiagram.OptionsTask = function (getOptions) {

  function process() {
    return true;
  }

  return {
    process: process,
    getOptions: getOptions,
    description: "Raw options."
  };
};