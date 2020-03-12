QUnit.module('Cases');
QUnit.test("hasSelectorCheckbox", function (assert) {
  primitives.helpers.tests.CreateFearture();

  var options = new primitives.orgdiagram.Config();
  var items = [
    new primitives.orgdiagram.ItemConfig({
      id: 0,
      parent: null,
      title: "Scott Aasrud",
      description: "VP, Public Sector",
      image: "samples/images/photos/a.png"
    }),
    new primitives.orgdiagram.ItemConfig({
      id: 1,
      parent: 0,
      title: "Ted Lucas",
      description: "VP, Human Resources",
      image: "samples/images/photos/b.png"
    }),
    new primitives.orgdiagram.ItemConfig({
      id: 2,
      parent: 0,
      title: "Fritz Stuger",
      description: "Business Solutions, US",
      image: "samples/images/photos/c.png"
    })
  ];

  options.items = items;
  options.cursorItem = 0;
  options.hasSelectorCheckbox = primitives.common.Enabled.True;

  var control = primitives.helpers.tests.CreateOrgDiagram(options);

  var checkboxes = document.getElementsByClassName("bp-selectioncheckbox");
  var result = [];
  for (var index = 0; index < checkboxes.length; index += 1) {
    var id = checkboxes[index].getAttribute("data-id");
    result.push(id);
  }
  assert.deepEqual(result, ["0", "1", "2"], "Chart should contain 3 selection check boxes.")

  control.setOptions({
    hasSelectorCheckbox: primitives.common.Enabled.Auto
  });
  control.update();

  var checkboxes = document.getElementsByClassName("bp-selectioncheckbox");
  var result = [];
  for (var index = 0; index < checkboxes.length; index += 1) {
    var id = checkboxes[index].getAttribute("data-id");
    result.push(id);
  }
  assert.deepEqual(result, ["0"], "Chart should contain selection check box only for cursor item.")

  control.setOptions({
    cursorItem: "2"
  });
  control.update();

  var checkboxes = document.getElementsByClassName("bp-selectioncheckbox");
  var result = [];
  for (var index = 0; index < checkboxes.length; index += 1) {
    var id = checkboxes[index].getAttribute("data-id");
    result.push(id);
  }
  assert.deepEqual(result, ["2"], "If cursor item changed then selection check box should be shown for selected cursor item.")

  control.setOptions({
    hasSelectorCheckbox: primitives.common.Enabled.False,
    cursorItem: "2"
  });
  control.update();

  var checkboxes = document.getElementsByClassName("bp-selectioncheckbox");
  assert.equal(checkboxes.length, 0, "If checboxes disabled, chart should not contain them.")
});