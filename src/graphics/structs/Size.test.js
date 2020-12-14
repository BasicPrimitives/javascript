import Size from './Size';
import Thickness from './Thickness';

test('Size - Square size', () => {
  var size = new Size(10, 20);

    expect(size.space()).toBe(200);
});

test('Size - Size conversion to width and hight CSS properties', () => {
  var size = new Size(10, 20);

    expect(size.getCSS()).toEqual({"width": "10px", "height": "20px"});
});

test('Size - Maximum size', () => {
  var size1 = new Size(10, 40);
  var size2 = new Size(50, 30);
  size1.maxSize(size2);

  expect(size1.width).toBe(50);
  expect(size1.height).toBe(40);
});

test('Size - Added padding', () => {
  var size1 = new Size(10, 40);
  var thickness = new Thickness(1, 2, 3, 4);
  size1.addThickness(thickness);

  expect(size1.width).toBe(14);
  expect(size1.height).toBe(46);
});

test('Size - Removed padding', () => {
  var size1 = new Size(10, 40);
  var thickness = new Thickness(1, 2, 3, 4);
  size1.removeThickness(thickness);

  expect(size1.width).toBe(6);
  expect(size1.height).toBe(34);
});
