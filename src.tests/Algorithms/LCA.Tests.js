QUnit.module('Algorithms - LCA - Lowest Common Ancestor');

QUnit.test("primitives.common.LCA", function (assert) {
  function getTree(items) {
    var tree = primitives.common.tree();
    for (var index = 0; index < items.length; index += 1) {
      var item = items[index];
      tree.add(item.parent, item.id, item);
    }
    return tree;
  }

  (function () {
    var tree = getTree([
      { id: 0, parent: null, name: "0" },
      { id: 1, parent: 0, name: "1" },
      { id: 2, parent: 1, name: "2" },
      { id: 3, parent: 1, name: "3" },
      { id: 4, parent: 0, name: "4" },
      { id: 5, parent: 4, name: "5" },
      { id: 6, parent: 4, name: "6" },
      { id: 7, parent: 6, name: "6" },
      { id: 8, parent: 7, name: "8" },
      { id: 9, parent: 3, name: "9" },
      { id: 10, parent: 9, name: "10" }
    ]);

    var lca = primitives.common.LCA(tree);

    assert.equal(lca.getLowestCommonAncestor(2, 3), 1, "getLowestCommonAncestor test for nodes 2 and 3");
    assert.equal(lca.getLowestCommonAncestor(9, 10), 9, "getLowestCommonAncestor test for nodes 9 and 10");
    assert.equal(lca.getLowestCommonAncestor(10, 9), 9, "getLowestCommonAncestor test for nodes 10 and 9");
    assert.equal(lca.getLowestCommonAncestor(5, 8), 4, "getLowestCommonAncestor test for nodes 5 and 8");
    assert.equal(lca.getLowestCommonAncestor(10, 8), 0, "getLowestCommonAncestor test for nodes 10 and 8");
    assert.equal(lca.getLowestCommonAncestor(0, 8), 0, "getLowestCommonAncestor test for nodes 0 and 8");
  })();
});