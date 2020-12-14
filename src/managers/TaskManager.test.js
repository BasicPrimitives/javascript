import TaskManager from './TaskManager';

test('Task manager processed all dependencies', () => {
  var taskManager = TaskManager();
  taskManager.addDependency('options', { value: 12 });
  taskManager.addTask('add', ['options'], function (options) {
    var result = 0;
    return {
      process: function () { result = options.value + 1; return true; },
      getValue: function () { return options.value + 1; }
    }
  });
  taskManager.addTask('multiply', ['add'], function (add) {
    var result = 0;
    return {
      process: function () { result = add.getValue() * 2; return true; },
      getValue: function () { return result; }
    }
  });

  taskManager.process('add', false);

  var result = taskManager.getTask('multiply');

  expect(result.getValue()).toBe(26);
});
