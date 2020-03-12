QUnit.module('FamDiagram - Models - EdgeItem');

QUnit.test("primitives.famdiagram.EdgeItem", function (assert) {

  var edge = new primitives.famdiagram.EdgeItem(1, 1, 2, 2);

  assert.equal(edge.getNear(1), 1, "Near 1 is 1");
  assert.equal(edge.getNear(2), 2, "Near 2 is 2");
  assert.equal(edge.getFar(1), 2, "Far of 1 is 2");
  assert.equal(edge.getFar(2), 1, "Far of 2 is 1");

  edge.setNear(1, 100);
  edge.setFar(1, 200);

  assert.equal(edge.getNear(1), 100, "Near 1 is 100");
  assert.equal(edge.getNear(2), 200, "Near 2 is 200");
  assert.equal(edge.getFar(1), 200, "Far of 1 is 200");
  assert.equal(edge.getFar(2), 100, "Far of 2 is 100");

  edge.setNear(2, 2000);
  edge.setFar(2, 1000);

  assert.equal(edge.getNear(1), 1000, "Near 1 is 1000");
  assert.equal(edge.getNear(2), 2000, "Near 2 is 2000");
  assert.equal(edge.getFar(1), 2000, "Far of 1 is 2000");
  assert.equal(edge.getFar(2), 1000, "Far of 2 is 1000");
});