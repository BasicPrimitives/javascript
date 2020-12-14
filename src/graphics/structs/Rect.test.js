import Rect from './Rect';

test('getProjectionPoint - Projection is not found', () => {
  var rect = new Rect(10, 20, 40, 20);

    expect(rect.getProjectionPoint({x:11, y:21})).toBe(null);
});

test('getProjectionPoint - Center of the top edge', () => {
  var rect = new Rect(10, 20, 40, 20);

    expect(rect.getProjectionPoint({x:30, y:0})).toEqual({context: null, x: 30, y: 20});
});

test('getProjectionPoint - Center of the right edge', () => {
  var rect = new Rect(10, 20, 40, 20);

    expect(rect.getProjectionPoint({x:60, y:30})).toEqual({context: null, x: 50, y: 30});
});

test('getProjectionPoint - Center of the bottom edge', () => {
  var rect = new Rect(10, 20, 40, 20);

    expect(rect.getProjectionPoint({x:30, y:50})).toEqual({context: null, x: 30, y: 40});
});

test('getProjectionPoint - Center of the left edge', () => {
  var rect = new Rect(10, 20, 40, 20);

    expect(rect.getProjectionPoint({x:0, y:30})).toEqual({context: null, x: 10, y: 30});
});

test('getProjectionPoint - Bottom right corner', () => {
  var rect = new Rect(10, 20, 40, 20);

    expect(rect.getProjectionPoint({x:70, y:50})).toEqual({context: null, x: 50, y: 40});
});
  
test('getProjectionPoint - Bottom edge point', () => {
  var rect = new Rect(10, 20, 40, 20);

    expect(rect.getProjectionPoint({x:50, y:70})).toEqual({context: null, x: 35, y: 40});
});


