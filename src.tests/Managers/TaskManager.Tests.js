QUnit.module('Managers - TaskManager');

QUnit.test("primitives.common.TaskManager - This structure helps to process controls data dependencies", function (assert) {

  var taskManager = primitives.common.TaskManager();
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

  assert.equal(result.getValue(), 26, "Task manager processed all dependencies.");
});