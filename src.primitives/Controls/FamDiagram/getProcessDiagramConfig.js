primitives.famdiagram.getProcessDiagramConfig = function () {
  var dummyFunction = function () { };
  var tasks = primitives.famdiagram.TaskManagerFactory(dummyFunction, dummyFunction, dummyFunction);
  return tasks.getProcessDiagramConfig();
};