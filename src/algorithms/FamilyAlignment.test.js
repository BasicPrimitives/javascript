import Rect from '../graphics/structs/Rect';
import Family from './Family';
import TreeLevels from './TreeLevels';
import FamilyAlignment from './FamilyAlignment';
import puppeteer from 'puppeteer';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

let browser;
beforeAll(async () => {
  browser = await puppeteer.launch({
    defaultViewport: {width: 1920, height: 1080}
  });
  expect.extend({ toMatchImageSnapshot });
});

afterAll(async () => {
  await browser.close();
});

function getFamily(items) {
  var family = Family();
  for (var index = 0; index < items.length; index += 1) {
    var item = items[index];
    family.add(item.parents, item.id, item);
  }
  return family;
}

function getTreeLevels(levels) {
  var treeLevels = TreeLevels();
  for (var levelIndex = 0, levelLen = levels.length; levelIndex < levelLen; levelIndex += 1) {
    var level = levels[levelIndex];
    for (var index = 0, len = level.length; index < len; index += 1) {
      treeLevels.addItem(levelIndex, level[index], {});
    }
  }
  return treeLevels;
};

function getPlacements(treeLevels, familyAlignment, isBig) {
  var placements = {};

  treeLevels.loopLevels(this, function (levelIndex, level) {
    treeLevels.loopLevelItems(this, levelIndex, function (nodeid, node, position) {
      var nodeOffset = familyAlignment.getOffset(nodeid);
      if (isBig == null || isBig.hasOwnProperty(nodeid)) {
        placements[nodeid] = new Rect(nodeOffset - 25, levelIndex * 50, 50, 40);
      } else {
        placements[nodeid] = new Rect(nodeOffset - 1, levelIndex * 50, 2, 40);
      }
    })
  });

  return placements;
}

function countPlacementsOverlaps(treeLevels, placements) {
  var result = 0;

  treeLevels.loopLevels(this, function (levelIndex, level) {
    treeLevels.loopLevelItems(this, levelIndex, function (nodeid, node, position) {
      if (position > 0) {
        var prevNodeId = treeLevels.getItemAtPosition(levelIndex, position - 1);
        var prevPlacement = placements[prevNodeId];
        var nodePlacement = placements[nodeid];

        if (prevPlacement.overlaps(nodePlacement)) {
          result += 1;
        }
      }
    })
  });

  return result;
}

function getPlacementMarker(placement, label, color) {
  var marker = document.createElement("div");
  if(label) {
    var textNode = document.createTextNode(label);
    marker.appendChild(textNode);
  }
  marker.style.width = placement.width + "px";
  marker.style.height = placement.height + "px";
  marker.style.top = placement.top() + "px";
  marker.style.left = placement.left() + "px";
  marker.style.backgroundColor = color;
  marker.style.visibility = "visible";
  marker.style.position = "absolute";
  marker.style.font = "Arial";
  marker.style.fontSize = "12px";
  marker.style.borderStyle = "solid";
  marker.style.borderColor = "black";
  marker.style.borderWidth = "2px";
  marker.style.opacity = 0.6;
  return marker;
}

function showLayout(visualization, placements, title) {
  var titlePlaceholder = document.createElement("div");
  var textNode = document.createTextNode(title);
  titlePlaceholder.appendChild(textNode);
  titlePlaceholder.style.width = "640px";
  titlePlaceholder.style.height = "40px";
  titlePlaceholder.style.visibility = "visible";
  titlePlaceholder.style.position = "relative";
  titlePlaceholder.style.font = "Arial";
  titlePlaceholder.style.fontSize = "14px";
  titlePlaceholder.style.lineHeight = "40px";
  titlePlaceholder.style.textAlign = "left";
  visualization.appendChild(titlePlaceholder);

  var offsetX = null;
  var offsetY = null;
  var space = new Rect();
  for (var key in placements) {
    if (placements.hasOwnProperty(key)) {
      var placement = placements[key];

      offsetX = offsetX == null ? placement.x : Math.min(offsetX, placement.x);
      offsetY = offsetY == null ? placement.y : Math.min(offsetY, placement.y);

      space.addRect(placement);
    }
  }

  var placeholder = document.createElement("div");
  placeholder.style.width = space.width + "px";
  placeholder.style.height = space.height + "px";
  placeholder.style.visibility = "visible";
  placeholder.style.position = "relative";
  placeholder.style.font = "Arial";
  placeholder.style.fontSize = "12px";

  for (var key in placements) {
    if (placements.hasOwnProperty(key)) {
      var placement = new Rect(placements[key]);
      placement.translate(-offsetX, -offsetY);

      var div = getPlacementMarker(placement, key, "grey");
      placeholder.appendChild(div);
    }
  }


  visualization.appendChild(placeholder);

  space.addRect(new Rect(0, 0, 250, 0));
  space.offset(0, 0, 20, 80);
  return space;
}

function testLayout(title, familyItems, treeLevelsItems, sized) {
  var visualization = document.createElement("div");
  visualization.style.height = "Auto";
  visualization.style.visibility = "visible";
  visualization.style.position = "relative";
  visualization.style.left = "0px";
  visualization.style.top = "0px";

  var family = getFamily(familyItems);
  var treeLevels = getTreeLevels(treeLevelsItems);

  var isBig = null;
  if (sized != null) {
    isBig = {};
    for (var index = 0; index < sized.length; index += 1) {
      isBig[sized[index]] = true;
    }
  }

  var familyAlignment = new FamilyAlignment(this, family, treeLevels, function (nodeid, node) {
    if (isBig == null || isBig.hasOwnProperty(nodeid)) {
      return 6 + 50 + 6;
    } else {
      return 6 + 2 + 6;
    }
  });

  var placements = getPlacements(treeLevels, familyAlignment, isBig);

  var space = showLayout(visualization, placements, title);

  var result = countPlacementsOverlaps(treeLevels, placements);

  return { 
    visualization,
    result,
    space
  }
};


async function testByTemplate(title, familyItems, treeLevelsItems, sized) {
  const page = await browser.newPage();
  const { visualization, result, space} = testLayout(title, familyItems, treeLevelsItems, sized)

  await page.setContent(visualization.innerHTML);
  const image = await page.screenshot({
    clip: {
      x: space.x,
      y: space.y,
      width: Math.min(space.width, page.viewport().width),
      height: Math.min(space.height, page.viewport().height),
    }
  });

  await page.close();

  expect(image).toMatchImageSnapshot({
      customSnapshotIdentifier: title,
      noColors: false
  });
  expect(result).toBe(0);
}

it('FamilyAlignment-Empty family layout', async () => {
  await testByTemplate('FamilyAlignment-Empty family layout', [{}], [[]])
});

it("FamilyAlignment-Single node family layout", async () => {
  await testByTemplate("FamilyAlignment-Single node family layout", [{ id: 'A', parents: [] }], [['A']])
});

it("FamilyAlignment-Side by side 2 families where the left one starts one generation below", async () => {
  await testByTemplate("FamilyAlignment-Side by side 2 families where the left one starts one generation below", [
    { id: '1', parents: [] },
    { id: '2', parents: [] },
    { id: '3', parents: ['1'] }
  ], [
    ['1'],
    ['2', '3']
  ]);
});

it("FamilyAlignment-Side by side families", async () => {
  await testByTemplate("FamilyAlignment-Side by side families", [
    { id: '1', parents: [] },
    { id: '3', parents: ['1'] },
    { id: '4', parents: ['1'] },
    { id: '2', parents: [] },
    { id: '5', parents: ['2'] },
    { id: '6', parents: ['2'] }
  ], [
    ['1', '2'],
    ['3', '4', '5', '6']
  ]);
});

it("FamilyAlignment-Internal orphan family", async () => {
  await testByTemplate("FamilyAlignment-Internal orphan family", [
    { id: '1', parents: [] },

    { id: '2', parents: ['1'] },
    { id: '3', parents: ['1'] },
    { id: '4', parents: ['1'] },
    { id: '5', parents: ['2', '3'] },
    { id: '6', parents: [] },
    { id: '7', parents: ['4'] },
    { id: '8', parents: ['4'] },
    { id: '9', parents: ['6'] },
    { id: '10', parents: ['6'] },
    { id: '11', parents: ['5', '7', '8'] }
  ], [
    ['1'],
    ['2', '3', '6', '4'],
    ['5', '9', '10', '7', '8'],
    ['11']
  ]);
});

it("FamilyAlignment-Side by side and upside-down families", async () => {
  await testByTemplate("FamilyAlignment-Side by side and upside-down families",  [
    { id: '1', parents: [] },
    { id: '2', parents: [] },
    { id: '3', parents: [] },
    { id: '4', parents: ['1'] },
    { id: '5', parents: ['1'] },
    { id: '6', parents: ['2', '3'] }
  ], [
    ['1', '2', '3'],
    ['4', '5', '6']
  ]);
});

it("FamilyAlignment-Family diagram horizontal alignment with multiple cycles", async () => {
  await testByTemplate("FamilyAlignment-Family diagram horizontal alignment with multiple cycles",  [
    { id: 'A', parents: [] },
    { id: 'K', parents: [] },
    { id: 'B', parents: ['A'] },
    { id: 'C', parents: ['A'] },
    { id: 'D', parents: ['A'] },
    { id: 'E', parents: [] },
    { id: 'F', parents: ['K'] },
    { id: 'L', parents: ['K'] },
    { id: 'M', parents: ['K'] },
    { id: 'G', parents: ['B'] },
    { id: 'H', parents: ['D', 'E', 'F'] },
    { id: 'I', parents: ['M'] },
    { id: 'J', parents: ['M'] },
    { id: 'N', parents: ['G'] },
    { id: 'O', parents: ['G'] },
    { id: 'Q', parents: ['H'] },
    { id: 'R', parents: ['H'] },
    { id: 'S', parents: ['H'] },
    { id: 'T', parents: ['I', 'J'] },
    { id: 'P', parents: ['O', 'Q'] },
    { id: 'U', parents: ['S', 'T'] }
  ], [
    ['A', 'K'],
    ['B', 'C', 'D', 'E', 'F', 'L', 'M'],
    ['G', 'H', 'I', 'J'],
    ['N', 'O', 'Q', 'R', 'S', 'T'],
    ['P', 'U']
  ]);
});

it("FamilyAlignment-Family diagram large rombus alignment", async () => {
  await testByTemplate("FamilyAlignment-Family diagram large rombus alignment",  [
    { id: 'A2', parents: [] },
    { id: 'A', parents: ['A2'] },
    { id: 'B', parents: ['A'] },
    { id: 'C', parents: ['A'] },
    { id: 'D', parents: ['A'] },
    { id: 'E', parents: ['B', 'C', 'D'] },
    { id: 'A1', parents: ['A2'] },
    { id: 'B1', parents: ['A1'] },
    { id: 'C1', parents: ['A1'] },
    { id: 'D1', parents: ['A1'] },
    { id: 'E1', parents: ['B1', 'C1', 'D1'] },
    { id: 'E2', parents: ['E', 'E1'] },
  ], [
    ['A2'],
    ['A', 'A1'],
    ['B', 'C', 'D', 'B1', 'C1', 'D1'],
    ['E', 'E1'],
    ['E2']
  ]);
});

it("FamilyAlignment-Small Sand clock family layout", async () => {
  await testByTemplate("FamilyAlignment-Small Sand clock family layout",  [
    { id: 'A', parents: [] },
    { id: 'B', parents: [] },
    { id: 'C', parents: ['A', 'B'] },
    { id: 'D', parents: ['C'] },
    { id: 'E', parents: ['C'] }
  ], [
    ['A', 'B'],
    ['C'],
    ['D', 'E']
  ]);
});

it("FamilyAlignment-Small Rombus family layout", async () => {
  await testByTemplate("FamilyAlignment-Small Rombus family layout",  [
    { id: 'A', parents: [] },
    { id: 'B', parents: ['A'] },
    { id: 'C', parents: ['A'] },
    { id: 'D', parents: ['B', 'C'] }
  ], [
    ['A'],
    ['B', 'C'],
    ['D']
  ]);
});

it("FamilyAlignment-Regular tree family layout", async () => {
  await testByTemplate("FamilyAlignment-Regular tree family layout",  [
    { id: 'A', parents: [] },
    { id: 'B', parents: ['A'] },
    { id: 'C', parents: ['A'] },
    { id: 'D', parents: ['B'] },
    { id: 'E', parents: ['B'] },
    { id: 'F', parents: ['C'] },
    { id: 'G', parents: ['C'] }
  ], [
    ['A'],
    ['B', 'C'],
    ['D', 'E', 'F', 'G']
  ]);
});

it("FamilyAlignment-Upside-down tree family layout", async () => {
  await testByTemplate("FamilyAlignment-Upside-down tree family layout", [
    { id: 'A', parents: [] },
    { id: 'B', parents: [] },
    { id: 'C', parents: [] },
    { id: 'D', parents: [] },
    { id: 'E', parents: ['A', 'B'] },
    { id: 'F', parents: ['C', 'D'] },
    { id: 'G', parents: ['E', 'F'] }
  ], [
    ['A', 'B', 'C', 'D'],
    ['E', 'F'],
    ['G']
  ]);
});

it("FamilyAlignment-2 Cross Relations Demo family layout", async () => {
  await testByTemplate("FamilyAlignment-2 Cross Relations Demo family layout", [
    { id: '2', parents: [] },
    { id: '1', parents: [] },
    { id: '8', parents: ['2'] },
    { id: '6', parents: ['2'] },
    { id: '7', parents: ['2'] },
    { id: '5', parents: ['1'] },
    { id: '4', parents: ['1'] },
    { id: '3', parents: ['1'] },
    { id: '12', parents: ['8'] },
    { id: '11', parents: ['7', '5'] },
    { id: '10', parents: ['4'] },
    { id: '9', parents: ['3'] }
  ], [
    ['2', '1'],
    ['8', '6', '7', '5', '4', '3'],
    ['12', '11', '10', '9']
  ]);
});

it("FamilyAlignment-Family unit overlaps node between parents", async () => {
  await testByTemplate("FamilyAlignment-Family unit overlaps node between parents", [
    { id: '6', parents: [] },
    { id: '5', parents: ['6'] },
    { id: '2', parents: ['6'] },
    { id: '1', parents: [] },
    { id: '7', parents: ['1', '2'] },
    { id: '3', parents: ['7'] },
    { id: '4', parents: ['7'] }
  ], [
    ['6'],
    ['1', '5', '2'],
    ['7'],
    ['3', '4']
  ]);
});

it("FamilyAlignment-Family unit overlaps node between children", async () => {
  await testByTemplate("FamilyAlignment-Family unit overlaps node between children", [
    { id: '3', parents: [] },
    { id: '4', parents: [] },
    { id: '7', parents: ['3', '4'] },
    { id: '1', parents: ['7'] },
    { id: '5', parents: [] },
    { id: '2', parents: ['7'] },
    { id: '6', parents: ['5', '2'] }
  ], [
    ['3', '4'],
    ['7'],
    ['1', '5', '2'],
    ['6']
  ]);
});

it("FamilyAlignment-Cycle 2", async () => {
  await testByTemplate("FamilyAlignment-Cycle 2", [
    { id: '1', parents: [] },
    { id: '2', parents: ['1'] },
    { id: '3', parents: ['1'] },
    { id: '4', parents: ['1'] },
    { id: '5', parents: ['1'] },
    { id: '6', parents: ['1'] },
    { id: '7', parents: ['1'] },
    { id: '8', parents: ['1'] },
    { id: '9', parents: ['1'] },
    { id: '10', parents: ['1'] },

    { id: '11', parents: ['9'] },
    { id: '12', parents: ['9'] },
    { id: '13', parents: ['9'] },
    { id: '14', parents: ['9'] },
    { id: '15', parents: ['9'] },
    { id: '16', parents: ['9'] },
    { id: '17', parents: ['10'] },

    { id: '18', parents: ['11'] },
    { id: '19', parents: [] },
    { id: '20', parents: [] },
    { id: '21', parents: [] },
    { id: '22', parents: [] },
    { id: '23', parents: [] },
    { id: '24', parents: [] },
    { id: '25', parents: ['17'] },

    { id: '26', parents: ['18', '19', '20', '21', '22', '23', '24', '25'] }
  ], [
    ['1'],
    ['2', '3', '4', '5', '6', '7', '8', '9', '10'],
    ['11', '12', '13', '14', '15', '16', '17'],
    ['18', '19', '20', '21', '22', '23', '24', '25'],
    ['26']
  ]);
});

it("FamilyAlignment-Large sandclock", async () => {
  await testByTemplate("FamilyAlignment-Large sandclock", [
    { id: '1', parents: [] },
    { id: '2', parents: [] },
    { id: '3', parents: [] },
    { id: '4', parents: [] },
    { id: '5', parents: ['1', '2'] },
    { id: '6', parents: ['3', '4'] },
    { id: '7', parents: ['5', '6'] },
    { id: '8', parents: ['7'] },
    { id: '9', parents: ['7'] },
    { id: '10', parents: ['8'] },
    { id: '11', parents: ['8'] },
    { id: '12', parents: ['9'] },
    { id: '13', parents: ['9'] }
  ], [
    ['1', '2', '3', '4'],
    ['5', '6'],
    ['7'],
    ['8', '9'],
    ['10', '11', '12', '13']
  ]);
});

it("FamilyAlignment-Fance layout", async () => {
  await testByTemplate("FamilyAlignment-Fance layout", [
    { id: '1', parents: [] },
    { id: '2', parents: [] },

    { id: '3', parents: ['1'] },
    { id: '4', parents: ['1'] },
    { id: '5', parents: ['2'] },
    { id: '6', parents: ['2'] },

    { id: '7', parents: ['3'] },
    { id: '8', parents: ['4', '5'] },
    { id: '9', parents: ['6'] },

    { id: '10', parents: ['7'] },
    { id: '11', parents: ['8'] },
    { id: '12', parents: ['8'] },
    { id: '13', parents: ['9'] },

    { id: '14', parents: ['10', '11'] },
    { id: '15', parents: ['12', '13'] }
  ], [
    ['1', '2'],
    ['3', '4', '5', '6'],
    ['7', '8', '9'],
    ['10', '11', '12', '13'],
    ['14', '15']
  ]);
});

it("FamilyAlignment-Wave layout", async () => {
  await testByTemplate("FamilyAlignment-Wave layout", [
    { id: '1', parents: [] },
    { id: '2', parents: [] },
    { id: '3', parents: [] },
    { id: '4', parents: [] },

    { id: '5', parents: ['1'] },
    { id: '6', parents: ['1'] },
    { id: '7', parents: ['2'] },
    { id: '8', parents: ['2'] },
    { id: '9', parents: ['3'] },
    { id: '10', parents: ['3'] },
    { id: '11', parents: ['4'] },

    { id: '12', parents: ['5'] },
    { id: '13', parents: ['6', '7'] },
    { id: '14', parents: ['8', '9'] },
    { id: '15', parents: ['10', '11'] }
  ], [
    ['1', '2', '3', '4'],
    ['5', '6', '7', '8', '9', '10', '11'],
    ['12', '13', '14', '15']
  ]);
});

it("FamilyAlignment-Skewed rombus layout", async () => {
  await testByTemplate("FamilyAlignment-Skewed rombus layout", [
    { id: '1', parents: ['1'] },
    { id: '2', parents: ['1'] },
    { id: '3', parents: ['1'] },
    { id: '4', parents: ['1'] },
    { id: '5', parents: ['1'] },
    { id: '6', parents: ['1'] },

    { id: '7', parents: ['2'] },
    { id: '8', parents: ['2'] },
    { id: '9', parents: ['2'] },
    { id: '10', parents: ['6'] },
    { id: '11', parents: ['6'] },

    { id: '12', parents: ['7'] },
    { id: '13', parents: [] },
    { id: '14', parents: [] },
    { id: '15', parents: [] },
    { id: '16', parents: ['11'] },

    { id: '17', parents: ['12', '13'] },
    { id: '18', parents: ['14', '15', '16'] },

    { id: '19', parents: ['17', '18'] }
  ], [
    ['1'],
    ['2', '3', '4', '5', '6'],
    ['7', '8', '9', '10', '11'],
    ['12', '13', '14', '15', '16'],
    ['17', '18'],
    ['19']
  ]);
});

it("FamilyAlignment-3 Cross Relations Test Layout", async () => {
  await testByTemplate("FamilyAlignment-3 Cross Relations Test Layout", [
    { id: '1', parents: [] },
    { id: '2', parents: [] },
    { id: '3', parents: [] },
    { id: '4', parents: [] },
    { id: '5', parents: [] },

    { id: '6', parents: ['1', '2'] },
    { id: '7', parents: ['3'] },
    { id: '8', parents: ['4'] },
    { id: '9', parents: ['4'] },
    { id: '10', parents: ['5'] },


    { id: '11', parents: ['6'] },
    { id: '12', parents: ['7', '8'] },
    { id: '13', parents: ['9', '10'] },

    { id: '14', parents: ['11'] },
    { id: '15', parents: ['11'] },
    { id: '16', parents: ['12'] },
    { id: '17', parents: ['12'] },
    { id: '18', parents: ['12'] },
    { id: '19', parents: ['13'] },
    { id: '20', parents: ['13'] },

    { id: '21', parents: ['14'] },
    { id: '22', parents: ['15', '16'] },
    { id: '23', parents: ['20'] },

    { id: '24', parents: ['21'] },
    { id: '25', parents: ['21'] },
    { id: '26', parents: ['22'] },
    { id: '27', parents: ['22'] },
    { id: '28', parents: ['23'] },
    { id: '29', parents: ['23'] }
  ], [
    ['1', '2', '3', '4', '5'],
    ['6', '7', '8', '9', '10'],
    ['11', '12', '13'],
    ['14', '15', '16', '17', '18', '19', '20'],
    ['21', '22', '23'],
    ['24', '25', '26', '27', '28', '29']
  ]);
});

it("FamilyAlignment-Skipped Members Test Layout", async () => {
  await testByTemplate("FamilyAlignment-Skipped Members Test Layout", [
    { id: '1', parents: [] },
    { id: '2', parents: [] },
    { id: '3', parents: [] },
    { id: '4', parents: [] },
    { id: '5', parents: [] },
    { id: '6', parents: [] },

    { id: '7', parents: ['1', '2'] },
    { id: '8', parents: ['3', '4'] },
    { id: '9', parents: ['5', '6'] },

    { id: '10', parents: ['7'] },
    { id: '11', parents: ['7'] },
    { id: '12', parents: ['8'] },
    { id: '13', parents: ['8'] },
    { id: '14', parents: ['9'] },
    { id: '15', parents: ['9'] },

    { id: '16', parents: ['10'] },
    { id: '17', parents: ['11'] },
    { id: '18', parents: ['11'] },
    { id: '19', parents: ['12'] },
    { id: '20', parents: ['13'] },
    { id: '21', parents: ['13'] },
    { id: '22', parents: ['14'] },
    { id: '23', parents: ['14'] },
    { id: '241', parents: ['15'] },

    { id: '24', parents: ['17'] },
    { id: '25', parents: ['18'] },
    { id: '26', parents: ['19', '20'] },
    { id: '27', parents: ['21'] },
    { id: '28', parents: ['22'] },
    { id: '29', parents: ['23', '241'] },

    { id: '30', parents: ['24'] },
    { id: '31', parents: ['25'] },
    { id: '32', parents: ['26'] },
    { id: '33', parents: ['26'] },
    { id: '34', parents: ['27'] },
    { id: '35', parents: ['28'] },
    { id: '36', parents: ['29'] },

    { id: '37', parents: ['30'] },
    { id: '38', parents: ['31', '32'] },
    { id: '39', parents: ['34'] },
    { id: '40', parents: ['35'] },
    { id: '41', parents: ['36'] },

  ], [
    ['1', '2', '3', '4', '5', '6'],
    ['7', '8', '9'],
    ['10', '11', '12', '13', '14', '15'],
    ['16', '17', '18', '19', '20', '21', '22', '23', '241'],
    ['24', '25', '26', '27', '28', '29'],
    ['30', '31', '32', '33', '34', '35', '36'],
    ['37', '38', '39', '40', '41']
  ], [
    '1', '2', '3', '4', '5', '6', '11', '13', '14', '37', '38', '39', '40', '41'
  ]);
});

it("FamilyAlignment-Left spiral layout", async () => {
  await testByTemplate("FamilyAlignment-Left spiral layout", [
    { id: '1', parents: [] },

    { id: '2', parents: ['1'] },
    { id: '3', parents: [] },
    { id: '4', parents: ['1'] },

    { id: '5', parents: ['2'] },
    { id: '6', parents: ['3'] },
    { id: '7', parents: [] },
    { id: '8', parents: ['3'] },

    { id: '9', parents: ['5'] },
    { id: '10', parents: ['6'] },
    { id: '11', parents: ['7'] },
    { id: '12', parents: ['7'] },
    { id: '13', parents: ['8'] },

    { id: '14', parents: ['9'] },
    { id: '15', parents: ['10', '12'] },
    { id: '16', parents: ['13'] },

    { id: '17', parents: ['14', '16'] }
  ], [
    ['1'],
    ['2', '3', '4'],
    ['5', '6', '7', '8'],
    ['9', '10', '11', '12', '13'],
    ['14', '15', '16'],
    ['17']
  ]);
});

it("FamilyAlignment-Right spiral layout", async () => {
  await testByTemplate("FamilyAlignment-Right spiral layout", [
    { id: '1', parents: [] },

    { id: '2', parents: ['1'] },
    { id: '3', parents: [] },
    { id: '4', parents: ['1'] },

    { id: '5', parents: ['3'] },
    { id: '6', parents: [] },
    { id: '7', parents: ['3'] },
    { id: '8', parents: ['4'] },

    { id: '9', parents: ['5'] },
    { id: '10', parents: ['6'] },
    { id: '11', parents: ['6'] },
    { id: '12', parents: ['7'] },
    { id: '13', parents: ['8'] },

    { id: '14', parents: ['9'] },
    { id: '15', parents: ['10', '12'] },
    { id: '16', parents: ['13'] },

    { id: '17', parents: ['14', '16'] }
  ], [
    ['1'],
    ['2', '3', '4'],
    ['5', '6', '7', '8'],
    ['9', '10', '11', '12', '13'],
    ['14', '15', '16'],
    ['17']
  ]);
});

it("FamilyAlignment-Alignment of items having variable width", async () => {
  await testByTemplate("FamilyAlignment-Alignment of items having variable width", [
    { id: '1', parents: [] },

    { id: '2', parents: ['1'] },
    { id: '3', parents: ['1'] },
    { id: '4', parents: ['1'] },

    { id: '6', parents: ['2'] },
    { id: '7', parents: ['3', '4'] }
  ], [
    ['1'],
    ['2', '3', '4'],
    ['6', '7']
  ], [
    '1', '4', '6', '7'
  ]);
});