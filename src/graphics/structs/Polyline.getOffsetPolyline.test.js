import createGraphics from '../createGraphics';
import Rect from './Rect';
import PaletteItem from './PaletteItem';
import Polyline from './Polyline';
import MoveSegment from './MoveSegment';
import LineSegment from './LineSegment';
import QuadraticArcSegment from './QuadraticArcSegment';
import CubicArcSegment from './CubicArcSegment';

import { LineType } from '../../enums';
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
function getPolyline(points, color) {
  var paletteItem = new PaletteItem({
    lineColor: color,
    lineWidth: "2",
    lineType: LineType.Solid,
    opacity: 1
  });

  var polyline = new Polyline(paletteItem);
  for (var index = 0; index < points.length; index += 1) {
    var point = points[index];
    var segmentType = point[0];
    switch (segmentType) {
      case "M": {
        var x = point[1];
        var y = point[2];
        polyline.addSegment(new MoveSegment(x, y));
      }
        break;
      case "L": {
        var x = point[1];
        var y = point[2];
        polyline.addSegment(new LineSegment(x, y));
      }
        break;
      case "Q": {
        var cpX = point[1];
        var cpY = point[2];
        var x = point[3];
        var y = point[4];
        polyline.addSegment(new QuadraticArcSegment(cpX, cpY, x, y));
      }
        break;
      case "C": {
        var cpX = point[1];
        var cpY = point[2];
        var cpX2 = point[3];
        var cpY2 = point[4];
        var x = point[5];
        var y = point[6];
        polyline.addSegment(new CubicArcSegment(cpX, cpY, cpX2, cpY2, x, y));
      }
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

  var polyline = getPolyline(points, "#000000");
  var offsetPolylinePlus = polyline.getOffsetPolyine(20);
  var offsetPolylineMinus = polyline.getOffsetPolyine(-20);
  var space = new Rect(0, 0, 800, 400);

  showLayout(visualization, space.width, space.height, title, function (graphics) {
    graphics.polyline(polyline);
    offsetPolylinePlus.paletteItem.lineColor = "red";
    graphics.polyline(offsetPolylinePlus);
    offsetPolylineMinus.paletteItem.lineColor = "green";
    graphics.polyline(offsetPolylineMinus);
  });

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

it('Polyline.getOffsetPolyine - Offset cubic segment', async () => {
  await testByTemplate('Polyline.getOffsetPolyine - Offset cubic segment', [
    ["M", 50, 100], ["C", 50, 50, 150, 50, 150, 150]
  ])
});

it('Polyline.getOffsetPolyine - Offset quadratic segment', async () => {
  await testByTemplate('Polyline.getOffsetPolyine - Offset quadratic segment', [
    ["M", 50, 150], ["Q", 500, 125, 350, 200]
  ])
});

it('Polyline.getOffsetPolyine - Offset quadratic segment 2', async () => {
  await testByTemplate('Polyline.getOffsetPolyine - Offset quadratic segment 2', [
    ["M", 100, 50], ["Q", 150, 50, 150, 100], ["Q", 150, 150, 100, 150], ["Q", 50, 150, 50, 100], ["L", 100, 50]
  ])
});

it('Polyline.getOffsetPolyine -Simple vertical segment', async () => {
  await testByTemplate('Polyline.getOffsetPolyine - Simple vertical segment', [
    ["M", 100, 50], ["L", 100, 150]
  ])
});

it('Polyline.getOffsetPolyine - Offset square angle', async () => {
  await testByTemplate('Polyline.getOffsetPolyine - Offset square angle', [
    ["M", 100, 50], ["L", 150, 100], ["L", 100, 150]
  ])
});

it('Polyline.getOffsetPolyine - Offset square', async () => {
  await testByTemplate('Polyline.getOffsetPolyine - Offset square 2', [
    ["M", 50, 50], ["L", 150, 50], ["L", 150, 150], ["L", 50, 150], ["L", 50, 50]
  ])
});

it('Polyline.getOffsetPolyine - Offset rhombus', async () => {
  await testByTemplate('Polyline.getOffsetPolyine - Offset square 3', [
    ["M", 100, 50], ["L", 150, 100], ["L", 100, 150], ["L", 50, 100], ["L", 100, 50]
  ])
});