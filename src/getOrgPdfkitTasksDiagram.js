import OrgPdfkitTaskManagerFactory from './OrgPdfkitTaskManagerFactory';

export default function getOrgTasksDiagram() {
  var dummyFunction = function () { };
  var tasks = OrgPdfkitTaskManagerFactory(dummyFunction, dummyFunction, dummyFunction);
  return tasks.getProcessDiagramConfig();
};