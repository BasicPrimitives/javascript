export default function DummyCombinedNormalVisibilityItemsTask(optionsTask) {
  function process() {
    return true;
  }

  function isItemSelected(treeItem) {
    return false;
  }

  return {
    process: process,
    isItemSelected: isItemSelected
  };
};