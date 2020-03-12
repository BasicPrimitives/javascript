QUnit.module('Cases');
QUnit.test("hasButtons", function (assert) {
  function getButtonsCount(items) {
    // Collect available buttons
    var buttonsPositions = [];
    var buttons = document.getElementsByClassName("bp-button");
    for (var index = 0; index < buttons.length; index += 1) {
      var position = primitives.helpers.tests.getPosition(buttons[index]);
      buttonsPositions.push(position);
    }

    var itemsPlacements = primitives.helpers.tests.getItemsPlacements(control, items);

    var result = {};
    for (var index = 0; index < items.length; index += 1) {
      var id = items[index].id;
      var placement = itemsPlacements[id];

      result[id] = 0;
      for (var bIndex = 0; bIndex < buttonsPositions.length; bIndex += 1) {
        var position = buttonsPositions[bIndex];

        if (placement.contains(position)) {
          result[id] += 1;
        }
      }
    }
    return result;
  }

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

  var buttons = [];
  buttons.push(new primitives.orgdiagram.ButtonConfig("delete", "ui-icon-close", "Delete"));
  buttons.push(new primitives.orgdiagram.ButtonConfig("properties", "ui-icon-gear", "Info"));
  buttons.push(new primitives.orgdiagram.ButtonConfig("add", "ui-icon-person", "Add"));

  options.items = items;
  options.buttons = buttons;
  options.cursorItem = 0;
  options.hasButtons = primitives.common.Enabled.True;

  var control = primitives.helpers.tests.CreateOrgDiagram(options);

  var result = getButtonsCount(items);

  assert.deepEqual(result, { "0": 3, "1": 3, "2": 3 }, "Every item should contain 3 buttons.");

  control.setOptions({
    items: items,
    buttons: buttons,
    cursorItem: 0,
    hasButtons: primitives.common.Enabled.Auto
  });
  control.update();

  var result = getButtonsCount(items);

  assert.deepEqual(result, { "0": 3, "1": 0, "2": 0 }, "Only cursor item should contain 3 buttons.");

  control.setOptions({
    items: items,
    buttons: buttons,
    cursorItem: 2,
    hasButtons: primitives.common.Enabled.Auto
  });
  control.update();

  var result = getButtonsCount(items);

  assert.deepEqual(result, { "0": 0, "1": 0, "2": 3 }, "Only new cursor item should contain 3 buttons.");

  control.setOptions({
    items: items,
    buttons: buttons,
    cursorItem: 2,
    hasButtons: primitives.common.Enabled.False
  });
  control.update();

  var result = getButtonsCount(items);

  assert.deepEqual(result, { "0": 0, "1": 0, "2": 0 }, "Buttons should be hidden.");
});