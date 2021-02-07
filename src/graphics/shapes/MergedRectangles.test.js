import MergedRectangles from './MergedRectangles';
import createGraphics from '../createGraphics';
import Rect from '../structs/Rect';
import Size from '../structs/Size';
import Transform from '../Transform';
import { OrientationType, LineType } from '../../enums';
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

function showLayout(visualization, width, height, title, onDraw) {
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

  var graphicsDiv = document.createElement("div");
  graphicsDiv.style.width = width + "px";
  graphicsDiv.style.height = height + "px";
  graphicsDiv.style.visibility = "visible";
  graphicsDiv.style.position = "relative";
  graphicsDiv.style.font = "Arial";
  graphicsDiv.style.fontSize = "12px";
  
  var placeholder = document.createElement("div");
  placeholder.className = "placeholder";
  placeholder.style.width = width + "px";
  placeholder.style.height = height + "px";

  graphicsDiv.append(placeholder);
  visualization.append(graphicsDiv);

  var graphics = createGraphics(placeholder);
  graphics.begin();
  graphics.resize("placeholder", width, height);
  graphics.activate("placeholder");
  onDraw(graphics);
  graphics.end();
}

function getSize(rects) {
  var result = new Rect(0, 0, 0, 0);
  for (var index = 0; index < rects.length; index += 1) {
    var rect = rects[index];
    result.addRect(rect);
  }
  return result;
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

  var rects = getRectangles(items);
  var size = getSize(rects);

  showLayout(visualization, size.width, size.height, title, function(graphics) {
    var transform = new Transform();
    transform.setOrientation(OrientationType.Top);
    transform.size = new Size(size);

    var mergedRectangles = new MergedRectangles(graphics);
    mergedRectangles.lineWidth = 2;
    mergedRectangles.opacity = 1;
    mergedRectangles.fillColor = "#faebd7";
    mergedRectangles.lineType = LineType.Solid;
    mergedRectangles.borderColor = "#000000";
    mergedRectangles.transform = transform;
    mergedRectangles.draw(rects);

  });

  size.addRect(new Rect(0, 0, 250, 0));
  size.offset(0, 0, 20, 80);

  return { 
    space: size,
    visualization
  };
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

it('MergedRectangles-Merge 5 rectangles', async () => {
  await testByTemplate('MergedRectangles-Merge 5 rectangles', [
    [0, 0, 100, 100],
    [150, 0, 100, 100],
    [0, 150, 100, 100],
    [150, 150, 100, 100],
    [50, 50, 150, 150]
  ])
});

it('MergedRectangles-Window', async () => {
  await testByTemplate('MergedRectangles-Window', [
    [100, 0, 150, 150],
    [100, 200, 150, 150],
    [0, 100, 150, 150],
    [200, 100, 150, 150]
  ])
});

it('MergedRectangles-Window 2', async () => {
  await testByTemplate('MergedRectangles-Window 2', [
    [0, 0, 150, 50],
    [0, 50, 50, 50],
    [100, 50, 50, 50],
    [0, 100, 150, 50],
    [0, 150, 50, 50],
    [100, 150, 50, 50],
    [0, 200, 150, 50]
  ])
});
