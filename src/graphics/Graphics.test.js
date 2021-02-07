import createGraphics from './createGraphics';
import Rect from './structs/Rect';
import Size from './structs/Size';
import PaletteItem from './structs/PaletteItem';
import Polyline from './structs/Polyline';
import MoveSegment from './structs/MoveSegment';
import LineSegment from './structs/LineSegment';
import QuadraticArcSegment from './structs/QuadraticArcSegment';
import { LineType } from '../enums';
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

function showLayout(visualization, polyline, width, height, title) {
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
  graphics.polyline(polyline);
  graphics.end();
}

function getSize(points) {
  var result = new Size(0, 0);
  for (var index = 0; index < points.length; index += 1) {
    var point = points[index];
    var x = point[1];
    var y = point[2];
    result.width = Math.max(result.width, x);
    result.height = Math.max(result.height, y);
  }
  return result;
}

function getPolyline(points) {
  var paletteItem = new PaletteItem({
    lineColor: "#000000",
    lineWidth: "2",
    fillColor: "#faebd7",
    lineType: LineType.Solid,
    opacity: 1
  });

  var polyline = new Polyline(paletteItem);
  for (var index = 0; index < points.length; index += 1) {
    var point = points[index];
    var segmentType = point[0];
    var x = point[1];
    var y = point[2];
    var cpX = point[3];
    var cpY = point[4];
    switch (segmentType) {
      case "M":
        polyline.addSegment(new MoveSegment(x, y));
        break;
      case "L":
        polyline.addSegment(new LineSegment(x, y));
        break;
      case "Q":
        polyline.addSegment(new QuadraticArcSegment(x, y, cpX, cpY));
        break;

    }
  }
  return polyline;
}

function testLayout(title, points) {
  var visualization = document.createElement("div");
  visualization.style.height = "Auto";
  visualization.style.visibility = "visible";
  visualization.style.position = "relative";
  visualization.style.left = "0px";
  visualization.style.top = "0px";

  var polyline = getPolyline(points);
  var size = getSize(points);

  showLayout(visualization, polyline, size.width, size.height, title);

  var space = new Rect(0, 0, size.width, size.height);
  space.addRect(new Rect(0, 0, 250, 0));
  space.offset(0, 0, 20, 80);

  return { 
    space,
    visualization
  };
};

async function testByTemplate(title, points) {
  const page = await browser.newPage();
  const { visualization, space} = testLayout(title, points)

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
}

it('Graphics - Line', async () => {
  await testByTemplate('Graphics - Merge single rectangle', [
    ["M", 0, 0], ["L", 200, 100]
  ])
});

it('Graphics-Draw shape', async () => {
  await testByTemplate('Graphics - Draw shape', [
    ["M", 0, 0], ["L", 200, 0], ["L", 200, 100], ["L", 0, 100], ["L", 0, 0]
  ])
});

it('Graphics - Draw shape having island', async () => {
  await testByTemplate('Graphics - Draw shape having island', [
    ["M", 0, 0], ["L", 200, 0], ["L", 200, 200], ["L", 0, 200], ["L", 0, 0],
    ["M", 50, 50], ["L", 50, 150], ["L", 150, 150], ["L", 150, 50], ["L", 50, 50]
  ])
});
