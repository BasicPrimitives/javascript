QUnit.module('Cases');
QUnit.test("Inactive Organizational Chart Items", function (assert) {
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
      var id = items[index];
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

  function getInactiveItemTemplate() {
    var result = new primitives.orgdiagram.TemplateConfig();
    result.name = "InactiveItemTemplate";
    result.isActive = false;
    return result;
  }

  primitives.helpers.tests.CreateFearture();

  var options = new primitives.orgdiagram.Config();

  var items = [
    new primitives.orgdiagram.ItemConfig({
      id: 0,
      parents: null,
      title: "Scott Aasrud",
      description: "Cursor Item",
      image: "samples/images/photos/a.png"
    }),
    new primitives.orgdiagram.ItemConfig({
      id: 2,
      parent: 0,
      templateName: "InactiveItemTemplate",
      title: "Finance",
      itemTitleColor: "Green",
      description: "Item has inactive template",
      image: "samples/images/photos/i.png"
    }),
    new primitives.orgdiagram.ItemConfig({
      id: 3,
      parent: 2,
      title: "Ted Lucas",
      description: "VP, Human Resources",
      image: "samples/images/photos/b.png"
    }),
    new primitives.orgdiagram.ItemConfig({
      id: 4,
      parent: 0,
      templateName: "InactiveItemTemplate",
      title: "Sales",
      itemTitleColor: "Green",
      description: "Item has inactive template",
      image: "samples/images/photos/i.png"
    }),
    new primitives.orgdiagram.ItemConfig({
      id: 5,
      parent: 4,
      title: "Fritz Stuger",
      description: "VP, Human Resources",
      image: "samples/images/photos/b.png"
    }),
    new primitives.orgdiagram.ItemConfig({
      id: 6,
      parent: 0,
      templateName: "InactiveItemTemplate",
      title: "Operations",
      itemTitleColor: "Green",
      description: "Item has inactive template",
      image: "samples/images/photos/i.png"
    }),
    new primitives.orgdiagram.ItemConfig({
      id: 7,
      parent: 6,
      title: "Brad Whitt",
      description: "VP, Human Resources",
      image: "samples/images/photos/b.png"
    }),
    new primitives.orgdiagram.ItemConfig({
      id: 8,
      parent: 0,
      templateName: "InactiveItemTemplate",
      title: "IT",
      itemTitleColor: "Green",
      description: "Item has inactive template",
      image: "samples/images/photos/i.png"
    }),
    new primitives.orgdiagram.ItemConfig({
      id: 9,
      parent: 8,
      title: "Ted Whitt",
      description: "VP, Human Resources",
      image: "samples/images/photos/b.png"
    }),
    new primitives.orgdiagram.ItemConfig({
      id: 19,
      parent: 8,
      title: "Ted Whitt 2",
      description: "VP, Human Resources",
      image: "samples/images/photos/b.png"
    }),
    {
      id: 20,
      parent: 3,
      description: "VP, Security Technology Unit (STU)",
      image: "samples/images/photos/c.png",
      title: "Robert Morgan"
    },
    {
      id: 21,
      parent: 3,
      description: "GM, Software Serviceability",
      image: "samples/images/photos/c.png",
      title: "Ida Benefield"
    },
    {
      id: 22,
      parent: 5,
      description: "GM, Core Operating System Test",
      image: "samples/images/photos/c.png",
      title: "Vada Duhon"
    },
    {
      id: 23,
      parent: 5,
      description: "GM, Global Platform Technologies and Services",
      image: "samples/images/photos/c.png",
      title: "William Loyd"
    },
    {
      id: 24,
      parent: 7,
      description: "Sr. VP, NAME & Personal Services Division",
      image: "samples/images/photos/c.png",
      title: "Craig Blue"
    },
    {
      id: 25,
      parent: 7,
      description: "VP, NAME Communications Services and Member Platform",
      image: "samples/images/photos/c.png",
      title: "Joel Crawford"
    },
    {
      id: 26,
      parent: 9,
      description: "VP & CFO, NAME",
      image: "samples/images/photos/c.png",
      title: "Barbara Lang"
    },
    {
      id: 27,
      parent: 9,
      description: "VP, NAME Operations",
      image: "samples/images/photos/c.png",
      title: "Barbara Faulk"
    },
    {
      id: 28,
      parent: 19,
      description: "VP, NAME Global Sales & Marketing",
      image: "samples/images/photos/c.png",
      title: "Stewart Williams"
    },
    {
      id: 29,
      parent: 19,
      description: "Sr. VP, NAME Information Services & Merchant Platform",
      image: "samples/images/photos/c.png",
      title: "Robert Lemieux"
    }
  ];

  options.items = items;
  options.cursorItem = 0;
  options.templates = [getInactiveItemTemplate()];
  options.hasSelectorCheckbox = primitives.common.Enabled.False;
  options.normalLevelShift = 20;
  options.dotLevelShift = 20;
  options.lineLevelShift = 10;
  options.normalItemsInterval = 10;
  options.dotItemsInterval = 10;
  options.lineItemsInterval = 4;

  var control = primitives.helpers.tests.CreateOrgDiagram(options);

  var itemsToCheck = [0, 3, 5, 7, 9, 19];
  var result = getItemsTitles(control, itemsToCheck);

  var itemsToCheckHash = {};
  for (var index = 0; index < itemsToCheck.length; index += 1) {
    itemsToCheckHash[itemsToCheck[index]] = true;
  }

  var expectedResult = {};
  for (var index = 0; index < items.length; index += 1) {
    var item = items[index];
    if (itemsToCheckHash.hasOwnProperty(item.id)) {
      expectedResult[item.id] = item.title;
    }
  }
  assert.deepEqual(result, expectedResult, "Children of inactive items have normal size.")
});