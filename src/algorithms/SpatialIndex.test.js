import Rect from '../graphics/structs/Rect';
import SpatialIndex from './SpatialIndex';
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

function findCrossedRectangles(placements, frame) {
  var result = [];

  for (var index = 0; index < placements.length; index += 1) {
    var placement = placements[index];

    if (placement.overlaps(frame)) {
      result.push(placement.context.id);
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

function showLayout(visualization, placements, frame, title) {
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

function getSpatialIndex(sizes, rectangles) {
  var result = SpatialIndex(sizes);
  for (var index = 0; index < rectangles.length; index += 1) {
    var rect = rectangles[index];
    rect.context = {
      id: index,
      isHighlighted: false
    };
    result.addRect(rect);
  }
  return result;
}

function getSizes(items) {
  var result = [];
  var hash = {};
  for (var index = 0; index < items.length; index += 1) {
    var item = items[index];
    var size = Math.max(item.width, item.height);
    if (!hash.hasOwnProperty(size)) {
      hash[size] = true;
      result.push(size);
    }
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

  var placements = getRectangles(items);
  var spatialIndex = getSpatialIndex(getSizes(placements), placements);

  var loopAreaStart = measureTime ? performance.now() : 0;
  var result = [];
  spatialIndex.loopArea(this, selection, function (rect) {
    result.push(rect.context.id);
    rect.context.isHighlighted = true;
  });
  var loopAreaEnd = measureTime ? performance.now() : 0;

  let space;
  if(!measureTime) {
    space = showLayout(visualization, placements, selection, title);
  }

  var findStart = measureTime ? performance.now() : 0;
  var expectedResult = findCrossedRectangles(placements, selection);
  var findEnd = measureTime ? performance.now() : 0;

  result.sort();

  return { 
    visualization,
    spatialIndex,
    result,
    expectedResult,
    loopTime: (loopAreaEnd - loopAreaStart),
    findTime: (findEnd - findStart),
    space
  }
};

it('SpatialIndex - Bounding rectangle', async () => {
    const page = await browser.newPage();
    const { visualization, result, expectedResult, spatialIndex, space} = testLayout("Spatial Index bounding rectangle", [
       [0, 0, 100, 100]
    ], new Rect(10, 10, 80, 80));
   

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
        customSnapshotIdentifier: 'SpatialIndex-BoundingRectangle',
        noColors: false
    });
    expect(spatialIndex.validate()).toBe(true);
    expect(result).toEqual(expectedResult);
});

it('SpatialIndex - Bounded rectangle', async () => {
  const page = await browser.newPage();
  const { visualization, result, expectedResult, spatialIndex, space } = testLayout("Spatial Index - Bounded rectangle",[
    [10, 10, 80, 80]
  ], new Rect(0, 0, 100, 100));
 

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
      customSnapshotIdentifier: 'SpatialIndex-BoundedRectangle',
      noColors: false
  });

  expect(spatialIndex.validate()).toBe(true);
  expect(result).toEqual(expectedResult);
});

it('SpatialIndex - Touched rectangle', async () => {
  const page = await browser.newPage();
  const { visualization, result, expectedResult, spatialIndex, space } = testLayout("Spatial Index - Touched rectangle",[
    [0, 0, 40, 40]
  ], new Rect(40, 0, 40, 40));
 

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
      customSnapshotIdentifier: 'SpatialIndex-TouchedRectangle',
      noColors: false
  });

  expect(spatialIndex.validate()).toBe(true);
  expect(result).toEqual(expectedResult);
});

it('SpatialIndex - Should not return non overlapping rectangle', async () => {
  const page = await browser.newPage();
  const { visualization, result, expectedResult, spatialIndex, space} = testLayout("Spatial Index - Should not return non overlapping rectangle",[
    [0, 0, 40, 40]
  ], new Rect(45, 0, 40, 40));
 

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
      customSnapshotIdentifier: 'SpatialIndex-Should not return non overlapping rectangle',
      noColors: false
  });

  expect(spatialIndex.validate()).toBe(true);
  expect(result).toEqual(expectedResult);
});

it('SpatialIndex - Multi-layer test case', async () => {
  const page = await browser.newPage();
  const { visualization, result, expectedResult, spatialIndex, space} = testLayout("Spatial Index - Multi-layer test case",[
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
  ], new Rect(100, 80, 220, 100));
 

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
      customSnapshotIdentifier: 'SpatialIndex-Multi-layer test case',
      noColors: false
  });

  result.sort();
  expectedResult.sort();

  expect(spatialIndex.validate()).toBe(true);
  expect(result).toEqual(expectedResult);
});

it('SpatialIndex - Matrix nesting test', async () => {
  const page = await browser.newPage();
  var testData = [];
  for (var x = 0; x < 1000; x += 50) {
    for (var y = 0; y < 1000; y += 50) {
      testData.push([x, y, 40, 40]);
    }
  }
  const { visualization, result, expectedResult, spatialIndex, space } = testLayout("Spatial Index - Matrix nesting test", testData, new Rect(710, 210, 200, 700));
 

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
      customSnapshotIdentifier: 'SpatialIndex-Matrix nesting test',
      noColors: false
  });

  result.sort();
  expectedResult.sort();

  expect(spatialIndex.validate()).toBe(true);
  expect(result).toEqual(expectedResult);
});

it('SpatialIndex - Labels test', async () => {
  var testData = [];
  for (var x = 0; x < 1000; x += 10) {
    for (var y = 0; y < 1000; y += 10) {
      testData.push([x, y, 2, 2]);
    }
  }
  const { result, expectedResult, spatialIndex, loopTime, findTime} = testLayout("Spatial Index - Labels test", testData, new Rect(710, 210, 20, 70), true);
 

  result.sort();
  expectedResult.sort();

  expect(spatialIndex.validate()).toBe(true);
  expect(result).toEqual(expectedResult);
  expect(loopTime < findTime).toBe(true);
});
