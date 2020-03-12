QUnit.module('Cases');
QUnit.test("selectCheckBoxLabel", function (assert) {
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
  options.cursorItem = 2;
  options.selectCheckBoxLabel = "custom";
  options.hasSelectorCheckbox = primitives.common.Enabled.True;

  var control = primitives.helpers.tests.CreateOrgDiagram(options);

  var checkboxes = document.getElementsByClassName("bp-selectiontext");
  var result = [];
  for (var index = 0; index < checkboxes.length; index += 1) {
    var id = checkboxes[index].textContent;
    result.push(id);
  }
  assert.deepEqual(result, ["custom", "custom", "custom"], "Custom slection checkbox label test.")

});