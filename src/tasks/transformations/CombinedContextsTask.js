export default function CombinedContextsTask(task1, task2) {
  function process() {
    return true;
  }

  function getConfig(itemId) {
    return task1.getConfig(itemId) || (task2 != null && task2.getConfig(itemId));
  }

  return {
    process: process,
    getConfig: getConfig
  };
};