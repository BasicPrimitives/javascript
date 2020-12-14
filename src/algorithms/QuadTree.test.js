import Rect from '../graphics/structs/Rect';
import Point from '../graphics/structs/Point';
import QuadTree from './QuadTree';
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


function findCrossedPoints(points, frame) {
  var result = [];

  for (var index = 0; index < points.length; index += 1) {
    var point = points[index];

    if (frame.contains(point)) {
      result.push(point.context.id);
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

function showLayout(visualization, placements, points, frame, title) {
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
  space.addRect(frame);
  offsetX = offsetX == null ? frame.x : Math.min(offsetX, frame.x);
  offsetY = offsetY == null ? frame.y : Math.min(offsetY, frame.y);

  //-------------------------------------------------------------------------
  var placeholder = document.createElement("div");
  placeholder.style.width = space.width + "px";
  placeholder.style.height = space.height + "px";
  placeholder.style.visibility = "visible";
  placeholder.style.position = "relative";
  placeholder.style.font = "Arial";
  placeholder.style.fontSize = "12px";

  for (var index = 0; index < placements.length; index += 1) {
    var placement = placements[index];
    var context = placement.context;
    var placement = new Rect(placements[index]);
    placement.translate(-offsetX, -offsetY);

    var div = getPlacementMarker(placement, context.id, context.isHighlighted ? "grey" : "white");
    placeholder.appendChild(div);
  }

  //-------------------------------------------------------------------------

  var placement = new Rect(frame);
  placement.translate(-offsetX, -offsetY);
  var div = getPlacementMarker(placement, index, "red");
  placeholder.appendChild(div);

  //-------------------------------------------------------------------------

  for (var index = 0; index < points.length; index += 1) {
    var point = points[index];
    var context = point.context;
    var placement = new Rect(point.x - 2, point.y - 2, 4, 4);
    placement.translate(-offsetX, -offsetY);

    var div = getPlacementMarker(placement, context.id, context.isHighlighted ? "blue" : "grey");
    placeholder.appendChild(div);
  }

  var placement = new Rect(frame);
  placement.translate(-offsetX, -offsetY);
  var div = getPlacementMarker(placement, index, "red");
  placeholder.appendChild(div);


  visualization.appendChild(placeholder);

  space.addRect(new Rect(0, 0, 250, 0));
  space.offset(0, 0, 20, 80);
  return space;
}

function getPoints(items) {
  var result = [];
  for (var index = 0; index < items.length; index += 1) {
    var item = items[index];
    var point = new Point(item[0], item[1]);
    point.context = index;
    result.push(point);
  }
  return result;
}

function getQuadTree(points) {
  var result = QuadTree(2);
  for (var index = 0; index < points.length; index += 1) {
    var point = points[index];
    point.context = {
      id: index,
      isHighlighted: false
    };
    result.addPoint(point);
  }
  return result;
}

function testLayout(title, items, selection, measureTime) {
  var visualization = document.createElement("div");
  visualization.style.height = "Auto";
  visualization.style.visibility = "visible";
  visualization.style.position = "relative";
  visualization.style.left = "0px";
  visualization.style.top = "0px";

  var points = getPoints(items);
  var quadTree = getQuadTree(points);

  var loopAreaStart = measureTime ? performance.now() : 0;
  var result = [];
  quadTree.loopArea(this, selection, function (point) {
    result.push(point.context.id);

    point.context.isHighlighted = true;
  });
  var loopAreaEnd = measureTime ? performance.now() : 0;

  let space = null;
  if(!measureTime) {
    space = showLayout(visualization, quadTree.getPositions(selection), points, selection, title);
  }

  var findStart = measureTime ? performance.now() : 0;

  var expectedResult = findCrossedPoints(points, selection);

  var findEnd = measureTime ? performance.now() : 0;
  
  result.sort();

  return { 
    visualization,
    quadTree,
    result,
    expectedResult,
    loopTime: (loopAreaEnd - loopAreaStart),
    findTime: (findEnd - findStart),
    space
  }
};

it('QuadTree-NW to SE diagonal points test', async () => {
  const page = await browser.newPage();
  var testData = [];
  for (var x = 0; x < 1000; x += 10) {
    testData.push([x, x]);
  }
  const { visualization, result, expectedResult, quadTree, space } = testLayout("QuadTree-NW to SE diagonal points test", testData, new Rect(600, 600, 40, 40), false)
  

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
      customSnapshotIdentifier: 'QuadTree-NW to SE diagonal points test',
      noColors: false
  });
  expect(quadTree.validate()).toBe(true);
  expect(result).toEqual(expectedResult);
});

it('QuadTree-SW to NE diagonal points test', async () => {
  const page = await browser.newPage();
  var testData = [];
  for (var x = 0; x < 1000; x += 10) {
    testData.push([x, 1000 - x]);
  }
  const { visualization, result, expectedResult, quadTree, space} = testLayout("QuadTree-SW to NE diagonal points test", testData, new Rect(690, 250, 40, 40), false)
  

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
      customSnapshotIdentifier: 'QuadTree-SW to NE diagonal points test',
      noColors: false
  });
  expect(quadTree.validate()).toBe(true);
  expect(result).toEqual(expectedResult);
});

it('QuadTree-W to E horizontal points test', async () => {
  const page = await browser.newPage();
  var testData = [];
  for (var x = 0; x < 1000; x += 10) {
    testData.push([x, 512]);
  }
  const { visualization, result, expectedResult, quadTree, space} = testLayout("QuadTree-W to E horizontal points test", testData, new Rect(690, 500, 40, 40), false)
  

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
      customSnapshotIdentifier: 'QuadTree-W to E horizontal points test',
      noColors: false
  });
  expect(quadTree.validate()).toBe(true);
  expect(result).toEqual(expectedResult);
});

it('QuadTree-10K Matrix performance test', async () => {
  var testData = [];
  for (var x = 0; x < 1000; x += 10) {
    for (var y = 0; y < 1000; y += 10) {
      testData.push([x, y]);
    }
  }
  const { result, expectedResult, quadTree, loopTime, findTime} = testLayout("QuadTree-10K Matrix performance test", testData, new Rect(690, 500, 140, 140), true)
  
  expect(quadTree.validate()).toBe(true);
  expect(result).toEqual(expectedResult);
  expect(loopTime < findTime).toBe(true);
});
