// LCA - Lowest Common Ancestor

import Tree from './Tree';
import LCA from './LCA';

function getTree(items) {
    var result = Tree();
    for (var index = 0; index < items.length; index += 1) {
        var item = items[index];
        result.add(item.parent, item.id, item);
    }
    return result;
}

var lca = LCA(getTree([
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
]));

test('getLowestCommonAncestor test for nodes 2 and 3', () => {
    expect(lca.getLowestCommonAncestor(2, 3)).toBe(1);
});

test('getLowestCommonAncestor test for nodes 9 and 10', () => {
    expect(lca.getLowestCommonAncestor(9, 10)).toBe(9);
});

test('getLowestCommonAncestor test for nodes 10 and 9', () => {
    expect(lca.getLowestCommonAncestor(10, 9)).toBe(9);
});

test('getLowestCommonAncestor test for nodes 5 and 8', () => {
    expect(lca.getLowestCommonAncestor(5, 8)).toBe(4);
});

test('getLowestCommonAncestor test for nodes 10 and 8', () => {
    expect(lca.getLowestCommonAncestor(10, 8)).toBe(0);
});

test('getLowestCommonAncestor test for nodes 0 and 8', () => {
    expect(lca.getLowestCommonAncestor(0, 8)).toBe(0);
});