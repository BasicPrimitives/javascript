import Family from '../algorithms/Family';
import DependencyManager from './DependencyManager';
import { splitCamelCaseName } from '../common';

export default function TaskManager() {
  var _taskFamily = new Family();
  var _dependencies = new DependencyManager();
  var _tasks = [];

  function TaskInfo(name, dependencies, factory, color) {
    this.name = name;
    this.dependencies = dependencies;
    this.factory = factory;
    this.task = null;
    this.color = color;
  }

  function addTask(taskName, taskDependencies, factory, color) {
    if (_tasks.length > 0) {
      throw "Task Manager is already initialized";
    }
    _taskFamily.add(taskDependencies, taskName, new TaskInfo(taskName, taskDependencies, factory, color));
  }

  function getTask(taskName) {
    var taskInfo = _taskFamily.node(taskName);
    return taskInfo && taskInfo.task;
  }

  function addDependency(name, dependency) {
    if (_tasks.length > 0) {
      throw "Task Manager is already initialized";
    }
    _dependencies.register(name, dependency);
  }

  function process(startTask, stopTask, debug) {
    var hasChanges = false,
      logtime = debug;
    if (_tasks.length === 0) {
      _taskFamily.loopTopo(this, function (taskName, taskInfo) {
        taskInfo.task = _dependencies.register(taskName, _dependencies.resolve(taskInfo.dependencies, taskInfo.factory)());
        _tasks.push(taskInfo);
      });
    }
    if (debug) {
      // eslint-disable-next-line no-console
      console.log("-- process --");
    }
    var isRequired = {};
    for (var index = 0, len = _tasks.length; index < len; index += 1) {
      var taskInfo = _tasks[index],
        dependents = [];

      if (taskInfo.name == startTask || isRequired.hasOwnProperty(taskInfo.name)) {
        if (logtime) {
          var startAt = performance.now(); //ignore jslint
        }
        if ((hasChanges = taskInfo.task.process(debug))) {
          _taskFamily.loopChildren(this, taskInfo.name, function (childTaskName, childTaskInfo) {
            isRequired[childTaskName] = true;
            if (debug) {
              dependents.push(childTaskName);
            }
            return _taskFamily.SKIP;
          });
        }
        if (logtime) {
          var endAt = performance.now(); //ignore jslint
        }
        if (debug) {
          var spentTime = Math.round((endAt - startAt), 2);
          // eslint-disable-next-line no-console
          console.log(index + ". " + taskInfo.name + (", " + spentTime + " ms. ") + (hasChanges ? " - forces: " + dependents.toString() : ""));
        }
      }
      if (taskInfo.name == stopTask) {
        return;
      }
    }
  }


  function getProcessDiagramConfig() {
    var result = [];
    if (_tasks.length === 0) {
      _taskFamily.loopTopo(this, function (taskName, taskInfo) {
        taskInfo.task = _dependencies.register(taskName, _dependencies.resolve(taskInfo.dependencies, taskInfo.factory)());
        _tasks.push(taskInfo);
      });
    }
    for (var index = 0, len = _tasks.length; index < len; index += 1) {
      var taskInfo = _tasks[index];

      var itemConfig = {
        id: taskInfo.name,
        title: splitCamelCaseName(taskInfo.name).join(" "),
        description: taskInfo.task.description || "",
        itemTitleColor: taskInfo.color,
        parents: []
      }
      _taskFamily.loopParents(this, taskInfo.name, function (parentTaskName, parentTaskInfo) {
        itemConfig.parents.push(parentTaskName);
        return _taskFamily.SKIP;
      });
      result.push(itemConfig);
    }
    return result;
  }

  return {
    addTask: addTask,
    addDependency: addDependency,
    getTask: getTask,
    process: process,
    getProcessDiagramConfig: getProcessDiagramConfig
  };
};