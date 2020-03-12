QUnit.module('Cases');
QUnit.test("First organizational chart", function (assert) {
  function getItemsTitles(control, items) {
    // Collect available titles
    var positions = [];
    var elements = document.getElementsByClassName("bp-title");
    for (var index = 0; index < elements.length; index += 1) {
      var element = elements[index];
      var position = primitives.helpers.tests.getPosition(element);
      positions.push({
        position: position,
        title: element.textContent
      });
    }

    var itemsPlacements = primitives.helpers.tests.getItemsPlacements(control, items);

    var result = {};
    for (var index = 0; index < items.length; index += 1) {
      var id = items[index].id;
      var placement = itemsPlacements[id];

      result[id] = 0;
      for (var bIndex = 0; bIndex < positions.length; bIndex += 1) {
        var position = positions[bIndex].position;

        if (placement.contains(position)) {
          result[id] = positions[bIndex].title;
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

  options.items = items;
  options.cursorItem = 0;
  options.hasSelectorCheckbox = primitives.common.Enabled.True;

  var control = primitives.helpers.tests.CreateOrgDiagram(options);

  var result = getItemsTitles(control, items);

  var expectedResult = {};
  for (var index = 0; index < items.length; index += 1) {
    var item = items[index];
    expectedResult[item.id] = item.title;
  }
  assert.deepEqual(result, expectedResult, "Items contain correct titles.")
});