import FamPdfkitTaskManagerFactory from './FamPdfkitTaskManagerFactory';

export default function getFamTasksDiagram() {
  var dummyFunction = function () { };
  var tasks = FamPdfkitTaskManagerFactory(dummyFunction, dummyFunction, dummyFunction);
  return tasks.getProcessDiagramConfig();
};