QUnit.module('Cases');
QUnit.test("Inactive Family Items", function (assert) {
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
    var result = new primitives.famdiagram.TemplateConfig();
    result.name = "InactiveItemTemplate";
    result.isActive = false;
    return result;
  }

  primitives.helpers.tests.CreateFearture();

  var options = new primitives.famdiagram.Config();

  var items = [
    new primitives.famdiagram.ItemConfig({
      id: 0,
      parents: null,
      title: "Scott Aasrud",
      description: "Cursor Item",
      image: "samples/images/photos/a.png"
    }),
    new primitives.famdiagram.ItemConfig({
      id: 1,
      parents: null,
      title: "Scott Aasrud 2",
      description: "Spouse of cursor item",
      image: "samples/images/photos/a.png"
    }),
    new primitives.famdiagram.ItemConfig({
      id: 2,
      parents: [0, 1],
      templateName: "InactiveItemTemplate",
      title: "Finance",
      itemTitleColor: "Green",
      description: "Item has inactive template",
      image: "samples/images/photos/i.png"
    }),
    new primitives.famdiagram.ItemConfig({
      id: 3,
      parents: [2],
      title: "Ted Lucas",
      description: "VP, Human Resources",
      image: "samples/images/photos/b.png"
    }),
    new primitives.famdiagram.ItemConfig({
      id: 4,
      parents: [0, 1],
      templateName: "InactiveItemTemplate",
      title: "Sales",
      itemTitleColor: "Green",
      description: "Item has inactive template",
      image: "samples/images/photos/i.png"
    }),
    new primitives.famdiagram.ItemConfig({
      id: 5,
      parents: [4],
      title: "Fritz Stuger",
      description: "VP, Human Resources",
      image: "samples/images/photos/b.png"
    }),
    new primitives.famdiagram.ItemConfig({
      id: 6,
      parents: [0, 1],
      templateName: "InactiveItemTemplate",
      title: "Operations",
      itemTitleColor: "Green",
      description: "Item has inactive template",
      image: "samples/images/photos/i.png"
    }),
    new primitives.famdiagram.ItemConfig({
      id: 7,
      parents: [6],
      title: "Brad Whitt",
      description: "VP, Human Resources",
      image: "samples/images/photos/b.png"
    }),
    new primitives.famdiagram.ItemConfig({
      id: 8,
      parents: [0, 1],
      templateName: "InactiveItemTemplate",
      title: "IT",
      itemTitleColor: "Green",
      description: "Item has inactive template",
      image: "samples/images/photos/i.png"
    }),
    new primitives.famdiagram.ItemConfig({
      id: 9,
      parents: [8],
      title: "Ted Whitt",
      description: "VP, Human Resources",
      image: "samples/images/photos/b.png"
    }),
    new primitives.famdiagram.ItemConfig({
      id: 19,
      parents: [8],
      title: "Ted Whitt 2",
      description: "VP, Human Resources",
      image: "samples/images/photos/b.png"
    }),
    {
      id: 20,
      parents: [3],
      description: "VP, Security Technology Unit (STU)",
      image: "samples/images/photos/c.png",
      title: "Robert Morgan"
    },
    {
      id: 21,
      parents: [3],
      description: "GM, Software Serviceability",
      image: "samples/images/photos/c.png",
      title: "Ida Benefield"
    },
    {
      id: 22,
      parents: [5],
      description: "GM, Core Operating System Test",
      image: "samples/images/photos/c.png",
      title: "Vada Duhon"
    },
    {
      id: 23,
      parents: [5],
      description: "GM, Global Platform Technologies and Services",
      image: "samples/images/photos/c.png",
      title: "William Loyd"
    },
    {
      id: 24,
      parents: [7],
      description: "Sr. VP, NAME & Personal Services Division",
      image: "samples/images/photos/c.png",
      title: "Craig Blue"
    },
    {
      id: 25,
      parents: [7],
      description: "VP, NAME Communications Services and Member Platform",
      image: "samples/images/photos/c.png",
      title: "Joel Crawford"
    },
    {
      id: 26,
      parents: [9],
      description: "VP & CFO, NAME",
      image: "samples/images/photos/c.png",
      title: "Barbara Lang"
    },
    {
      id: 27,
      parents: [9],
      description: "VP, NAME Operations",
      image: "samples/images/photos/c.png",
      title: "Barbara Faulk"
    },
    {
      id: 28,
      parents: [19],
      description: "VP, NAME Global Sales & Marketing",
      image: "samples/images/photos/c.png",
      title: "Stewart Williams"
    },
    {
      id: 29,
      parents: [19],
      description: "Sr. VP, NAME Information Services & Merchant Platform",
      image: "samples/images/photos/c.png",
      title: "Robert Lemieux"
    }
  ];

  options.items = items;
  options.cursorItem = 0;
  options.neighboursSelectionMode = primitives.common.NeighboursSelectionMode.ParentsChildrenSiblingsAndSpouses;
  options.templates = [getInactiveItemTemplate()];
  options.hasSelectorCheckbox = primitives.common.Enabled.False;
  options.normalLevelShift = 20;
  options.dotLevelShift = 20;
  options.lineLevelShift = 10;
  options.normalItemsInterval = 10;
  options.dotItemsInterval = 10;
  options.lineItemsInterval = 4;

  var control = primitives.helpers.tests.CreateFamDiagram(options);

  var itemsToCheck = [0, 1, 3, 5, 7, 9, 19];
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