primitives.orgdiagram.getProcessDiagramConfig = function () {
  var dummyFunction = function () { };
  var tasks = primitives.orgdiagram.TaskManagerFactory(dummyFunction, dummyFunction, dummyFunction);
  return tasks.getProcessDiagramConfig();
};