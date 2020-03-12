(function () {

  var namespace = function (name) {
    var namespaces = name.split('.'),
      namespace = window,
      index;
    for (index = 0; index < namespaces.length; index += 1) {
      namespace = namespace[namespaces[index]] = namespace[namespaces[index]] || {};
    }
    return namespace;
  };

  namespace("primitives.helpers.tests");

}());

primitives.helpers.tests.CreateFearture = function () {
  var $fixture = document.getElementById("qunit-fixture");
  $fixture.appendChild(primitives.common.JsonML.toHTML(["div",
    {
      id: "basicdiagram",
      style: {
        width: "640px",
        height: "480px",
        borderStyle: "dotted",
        borderWidth: "1px"
      }
    }
  ]));

  primitives.common.JsonML.applyStyles(document.getElementById("qunit-fixture"), {
    position: "relative",
    left: "0px",
    top: "0px",
    height: "Auto"
  });
};


primitives.helpers.tests.CreateOrgDiagram = function (options) {
  return primitives.orgdiagram.Control(document.getElementById("basicdiagram"), options);
};

primitives.helpers.tests.CreateFamDiagram = function (options) {
  return primitives.famdiagram.Control(document.getElementById("basicdiagram"), options);
};

primitives.helpers.tests.getPosition = function (element) {
  var offset = primitives.common.getElementOffset(element);
  var size = primitives.common.getInnerSize(element);
  return new primitives.common.Rect(offset.left, offset.top, size.width, size.height);
};

primitives.helpers.tests.getItemsPlacements = function (control, items) {
  // Find items placements
  var itemsPlacements = {};
  for (var index = 0; index < items.length; index += 1) {
    var item = items[index];
    var id = item.hasOwnProperty("id") ? item.id : item;
    control.setOption("highlightItem", id);
    control.update(primitives.common.UpdateMode.PositonHighlight);
    var highlight = document.getElementsByClassName("bp-highlight-frame")[0];
    var placement = primitives.helpers.tests.getPosition(highlight);
    itemsPlacements[id] = placement;
  }
  return itemsPlacements;
};

