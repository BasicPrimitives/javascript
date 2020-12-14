import Rect from '../graphics/structs/Rect';
import getMinimumCrossingRows from './getMinimumCrossingRows';
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

function countPlacementsCrossings(placements, rows) {
  var result = 0;

  for (var index = 0; index < placements.length; index += 1) {
    var placement = placements[index];

    for (var index2 = 0; index2 < rows.length; index2 += 1) {
      var row = rows[index2];
      if (placement.y <= row && placement.bottom() >= row) {
        result += 1;
        break;
      }
    }
  }

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

function showLayout(visualization, placements, rows, title) {
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
  for (var index = 0; index < placements.length; index += 1) {
    var placement = placements[index];

    offsetX = offsetX == null ? placement.x : Math.min(offsetX, placement.x);
    offsetY = offsetY == null ? placement.y : Math.min(offsetY, placement.y);

    space.addRect(placement);
  }

  var placeholder = document.createElement("div");
  placeholder.style.width = space.width + "px";
  placeholder.style.height = space.height + "px";
  placeholder.style.visibility = "visible";
  placeholder.style.position = "relative";
  placeholder.style.font = "Arial";
  placeholder.style.fontSize = "12px";

  for (var index = 0; index < placements.length; index += 1) {
    var placement = placements[index];
    var label = placement.context;
    var placement = new Rect(placements[index]);
    placement.translate(-offsetX, -offsetY);

    var div = getPlacementMarker(placement, label, "grey");
    placeholder.appendChild(div);
  }

  for (var index = 0; index < rows.length; index += 1) {
    var row = rows[index];
    var placement = new Rect(0, row, space.width, 1);
    placement.translate(-offsetX, -offsetY);

    var div = getPlacementMarker(placement, index, "red");
    placeholder.appendChild(div);
  }

  visualization.appendChild(placeholder);

  space.addRect(new Rect(0, 0, 250, 0));
  space.offset(0, 0, 20, 80);
  return space;
}

function getRectangles(items) {
  var result = [];
  for (var index = 0; index < items.length; index += 1) {
    var item = items[index];
    var rect = new Rect(item[0], item[1], item[2], item[3]);
    rect.context = index;
    result.push(rect);
  }
  return result;
}

function testLayout(title, items) {
  var visualization = document.createElement("div");
  visualization.style.height = "Auto";
  visualization.style.visibility = "visible";
  visualization.style.position = "relative";
  visualization.style.left = "0px";
  visualization.style.top = "0px";

  var placements = getRectangles(items);
  var rows = [];
  getMinimumCrossingRows(this, placements, function (row) {
    rows.push(row);
  });

  var space = showLayout(visualization, placements, rows, title);

  var result = countPlacementsCrossings(placements, rows);

  return { 
    visualization,
    result,
    expectedResult: placements.length,
    space
  }
};

async function testByTemplate(title, items) {
  const page = await browser.newPage();
  const { visualization, result, expectedResult, space} = testLayout(title, items)

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
  expect(result).toBe(expectedResult);
}

it('getMinimumCrossingRows-Basic test case', async () => {
  await testByTemplate('getMinimumCrossingRows-Basic test case', [
    [0, 0, 200, 50],
    [300, 30, 200, 50],
    [600, 45, 200, 50],
    [10, 55, 200, 50],
    [310, 90, 200, 50]
  ])
});

it('getMinimumCrossingRows-Multi-layer test case', async () => {
  await testByTemplate('getMinimumCrossingRows-Multi-layer test case', [
    [0, 0, 40, 280],
    [60, 0, 100, 100],
    [180, 0, 40, 40],
    [180, 60, 40, 40],
    [240, 0, 40, 40],
    [300, 0, 40, 40],
    [240, 60, 40, 40],
    [300, 60, 40, 100],
    [360, 0, 100, 100],
    [480, 0, 40, 40],
    [540, 0, 40, 40],
    [600, 0, 80, 100],
    [480, 60, 40, 140],
    [540, 140, 60, 60],
    [620, 140, 60, 60],
    [60, 120, 160, 160],
    [240, 180, 60, 60],
    [320, 180, 60, 60],
    [400, 180, 60, 60],
    [620, 220, 20, 20],
    [660, 220, 20, 20],
    [240, 260, 20, 20],
    [280, 260, 340, 20],
    [640, 260, 40, 20]
  ])
});

it('getMinimumCrossingRows-Nested block test case', async () => {
  await testByTemplate('getMinimumCrossingRows-Nested block test case', [
    [220, 0, 120, 80],
    [0, 100, 120, 80],
    [0, 200, 120, 80],
    [400, 100, 120, 80],
    [400, 200, 120, 80],
    [160, 100, 40, 40],
    [220, 100, 40, 40],
    [280, 100, 40, 40],
    [340, 100, 40, 40],
    [160, 160, 40, 40],
    [220, 160, 40, 40],
    [280, 160, 40, 40],
    [340, 160, 40, 40],
    [160, 220, 40, 40],
    [220, 220, 40, 40],
    [280, 220, 40, 40],
    [340, 220, 40, 40]
  ])
});