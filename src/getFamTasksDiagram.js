import FamTaskManagerFactory from './FamTaskManagerFactory';

export default function getFamTasksDiagram() {
  var dummyFunction = function () { };
  var tasks = FamTaskManagerFactory(dummyFunction, dummyFunction, dummyFunction);
  return tasks.getProcessDiagramConfig();
};