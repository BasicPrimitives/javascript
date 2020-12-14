import EdgeItem from './EdgeItem';

test("[1]: 1, [2]: 2", () => {
  var edge = new EdgeItem(1, 1, 2, 2);
  expect(edge.getNear(1)).toBe(1);
  expect(edge.getNear(2)).toBe(2);
  expect(edge.getFar(1)).toBe(2);
  expect(edge.getFar(2)).toBe(1);
});

test("setNear, setFar", () => {
  var edge = new EdgeItem(1, 1, 2, 2);
  edge.setNear(1, 100);
  edge.setFar(1, 200);
  expect(edge.getNear(1)).toBe(100);
  expect(edge.getNear(2)).toBe(200);
  expect(edge.getFar(1)).toBe(200);
  expect(edge.getFar(2)).toBe(100);  
});
  
test("setNear, setFar (2)", () => {
  var edge = new EdgeItem(1, 1, 2, 2);
  edge.setNear(2, 2000);
  edge.setFar(2, 1000);

  expect(edge.getNear(1)).toBe(1000);
  expect(edge.getNear(2)).toBe(2000);
  expect(edge.getFar(1)).toBe(2000);
  expect(edge.getFar(2)).toBe(1000);
});