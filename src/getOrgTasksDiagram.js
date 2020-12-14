import OrgTaskManagerFactory from './OrgTaskManagerFactory';

export default function getOrgTasksDiagram() {
  var dummyFunction = function () { };
  var tasks = OrgTaskManagerFactory(dummyFunction, dummyFunction, dummyFunction);
  return tasks.getProcessDiagramConfig();
};