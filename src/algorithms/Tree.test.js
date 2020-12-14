import Tree from './Tree';

const items = [
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
];

function getTree(items) {
    const tree = Tree();
    for (var index = 0; index < items.length; index += 1) {
        var item = items[index];
        tree.add(item.parent, item.id, item);
    }
    return tree;
}

test('hasNodes returns false for empty tree', () => {
    const tree = Tree();
    expect(tree.hasNodes()).toBe(false);
});


test('hasNodes returns true for non-empty tree', () => {
    const tree = getTree(items);
    expect(tree.hasNodes()).toBe(true);
});

test('Post order sequence test', () => {
    const tree = getTree(items);
    const postOrderSequence = [];
    tree.loopPostOrder(this, function (nodeid, node, parentid, parent) {
        postOrderSequence.push(nodeid);
    });
    const expectedChildren = [2, 10, 9, 3, 1, 5, 8, 7, 6, 4, 0];
    
    expect(postOrderSequence).toEqual(expectedChildren);
});

test('Pre order sequence test', () => {
    const tree = getTree(items);
    const preOrderSequence = [];
    tree.loopPreOrder(this, function (nodeid, node) {
        preOrderSequence.push(nodeid);
    });
    const expectedChildren = [0, 1, 2, 3, 9, 10, 4, 5, 6, 7, 8];
    expect(preOrderSequence).toEqual(expectedChildren);
});

test('loopEulerWalk - returns tree nodes in Euler Walk sequence', () => {
    const tree = getTree(items);
    const eulerWalkSequence = [];
    const eulerWalkLevels = [];
    tree.loopEulerWalk(this, function (nodeid, node, level) {
        eulerWalkSequence.push(nodeid);
        eulerWalkLevels.push(level);
    });
    const expectedSequence = [0, 1, 2, 1, 3, 9, 10, 9, 3, 1, 0, 4, 5, 4, 6, 7, 8, 7, 6, 4, 0];
    const expectedLevels = [0, 1, 2, 1, 2, 3, 4, 3, 2, 1, 0, 1, 2, 1, 2, 3, 4, 3, 2, 1, 0];
    expect(eulerWalkSequence).toEqual(expectedSequence);
    expect(eulerWalkLevels).toEqual(expectedLevels);
});

test('Function zipUp should return pairs of parent items up to the root including initial items', () => {
    const tree = getTree(items);
    const pairs = [];
    tree.zipUp(this, 8, 10, function (firstNodeId, firstParentId, secondNodeid, secondParentId) {
        pairs.push([firstNodeId, secondNodeid]);
    });
    expect(pairs).toEqual([[8, 10], [7, 9], [6, 3], [4, 1]]);
});

test('Function loopParents should return parent items up to the root', () => {
    const tree = getTree(items);
    const parents = [];
    tree.loopParents(this, 8, function (parentid, parent) {
        parents.push(parentid);
    });
    expect(parents).toEqual([7, 6, 4, 0]);
});

test('Function loopLevels should break loop on BREAK.', () => {
    const tree = getTree(items);
    const rootItems = [];
    tree.loopLevels(this, function (nodeid, node, levelid) {
        if (levelid > 0) {
            return tree.BREAK;
        }
        rootItems.push(nodeid);
    });
    expect(rootItems).toEqual([0]);
});

test('loopLevels function test', () => {
    const tree = getTree(items);
    const levels = [];
    tree.loopLevels(this, function (nodeid, node, levelid) {
    if (levels[levelid] == null) {
        levels[levelid] = [nodeid];
    } else {
        levels[levelid].push(nodeid);
    }
    });
    expect(levels).toEqual([[0], [1, 4], [2, 3, 5, 6], [9, 7], [10, 8]]);
});

test('Parent of 0 item is null', () => {
    const tree = getTree(items);
    expect(tree.parent(0)).toBe(null);
});

test('Node 100 does not exists', () => {
    const tree = getTree(items);
    expect(tree.node(100)).toBe(undefined);
});

test('Parent of item 6 is 4.', () => {
    const tree = getTree(items);
    expect(tree.parent(6).id).toBe(4);
});


test('loopChildren function test for item 4', () => {
    const tree = getTree(items);
    const children = [];
    tree.loopChildren(this, 4, function (nodeid, node) {
        children.push(nodeid);
    });
    expect(children).toEqual([5, 6]);
});

test('Item 3 should contain adopted item 10', () => {
    const tree = getTree(items);
    tree.adopt(3, 10);
    const children = [];
    tree.loopChildren(this, 3, function (nodeid, node) {
        children.push(nodeid);
    });
    expect(children).toEqual([9, 10]);
});

test('Item 9 should have no children', () => {
    const tree = getTree(items);
    tree.adopt(3, 10);
    const children = [];
    tree.loopChildren(this, 9, function (nodeid, node) {
        children.push(nodeid);
    });
    expect(children).toEqual([]);
});

test('Item 9 should have no children', () => {
    const tree = getTree(items);
    tree.adopt(3, 10);
    const children = [];
    tree.loopChildren(this, 9, function (nodeid, node) {
        children.push(nodeid);
    });
    expect(children).toEqual([]);
});

const items2 = [
{ id: 1, name: "1" },
{ id: 2, name: "2" },
{ id: 3, name: "3" },
{ id: 4, parent: 100, name: "4" },
{ id: 5, parent: 101, name: "5" },
{ id: 6, parent: 102, name: "6" },
{ id: 7, parent: 4, name: "7" },
{ id: 8, parent: 5, name: "8" },
{ id: 9, parent: 6, name: "9" },
{ id: 10, parent: 7, name: "10" },
{ id: 11, parent: 8, name: "11" },
{ id: 12, parent: 9, name: "12" }
];

test('Item 1 should have adopted all children', () => {
    const tree = getTree(items2);
    const nodes = [];
    tree.loopLevels(this, function (nodeid, node, levelIndex) {
        if (nodeid != 1) {
            nodes.push(nodeid);
        }
    });
    
    for (var index = 0; index < nodes.length; index += 1) {
        const itemid = nodes[index];
        tree.adopt(1, itemid);
    }
    
    const children = [];
    tree.loopChildren(this, 1, function (nodeid, node) {
        children.push(nodeid);
    });
    expect(children).toEqual([4, 5, 6, 2, 3, 7, 8, 9, 10, 11, 12]);
});

test('Item 1 children in range from 3 to 8', () => {
    const tree = getTree(items2);
    
    const nodes = [];
    tree.loopLevels(this, function (nodeid, node, levelIndex) {
        if (nodeid != 1) {
            nodes.push(nodeid);
        }
    });
    
    for (var index = 0; index < nodes.length; index += 1) {
        const itemid = nodes[index];
        tree.adopt(1, itemid);
    }

    var children = [];
    tree.loopChildrenRange(this, 1, 3, 8, function (nodeid, node) {
        children.push(nodeid);
    });
    expect(children).toEqual([2, 3, 7, 8, 9, 10]);
});


test('Item 1 children in range from 8 to 3', () => {
    const tree = getTree(items2);
    
    const nodes = [];
    tree.loopLevels(this, function (nodeid, node, levelIndex) {
        if (nodeid != 1) {
            nodes.push(nodeid);
        }
    });
    
    for (var index = 0; index < nodes.length; index += 1) {
        const itemid = nodes[index];
        tree.adopt(1, itemid);
    }

    const children = [];
    tree.loopChildrenRange(this, 1, 8, 3, function (nodeid, node) {
        children.push(nodeid);
    });
    expect(children).toEqual([10, 9, 8, 7, 3, 2]);
});

test('Item 1 children in range from 8 to 100', () => {
    const tree = getTree(items2);
    
    const nodes = [];
    tree.loopLevels(this, function (nodeid, node, levelIndex) {
        if (nodeid != 1) {
            nodes.push(nodeid);
        }
    });
    
    for (var index = 0; index < nodes.length; index += 1) {
        const itemid = nodes[index];
        tree.adopt(1, itemid);
    }

    const children = [];
    tree.loopChildrenRange(this, 1, 8, 100, function (nodeid, node) {
        children.push(nodeid);
    });
    expect(children).toEqual([10, 11, 12]);
});

test('Item 1 children in range from 3 to -1', () => {
    const tree = getTree(items2);
    
    const nodes = [];
    tree.loopLevels(this, function (nodeid, node, levelIndex) {
        if (nodeid != 1) {
            nodes.push(nodeid);
        }
    });
    
    for (var index = 0; index < nodes.length; index += 1) {
        const itemid = nodes[index];
        tree.adopt(1, itemid);
    }

    const children = [];
    tree.loopChildrenRange(this, 1, 3, -1, function (nodeid, node) {
        children.push(nodeid);
    });
    expect(children).toEqual([2, 6, 5, 4]);
});

test('Reversed children of item 1', () => {
    const tree = getTree(items2);
    
    const nodes = [];
    tree.loopLevels(this, function (nodeid, node, levelIndex) {
        if (nodeid != 1) {
            nodes.push(nodeid);
        }
    });
    
    for (var index = 0; index < nodes.length; index += 1) {
        const itemid = nodes[index];
        tree.adopt(1, itemid);
    }

    const children = [];
    tree.loopChildrenReversed(this, 1, function (nodeid, node) {
        children.push(nodeid);
    });
    expect(children).toEqual([12, 11, 10, 9, 8, 7, 3, 2, 6, 5, 4]);
});

const items3 = [
    { id: 1 },
    { id: 2, parent: 1 },
    { id: 3, parent: 1 },
    { id: 4, parent: 1 }
];

test('getChild returns node 2 for parent 1 at 0 position', () => {
    const tree = getTree(items3);
    expect(tree.getChild(1, 0).id).toBe(2);
});

test('getChild returns node 4 for parent 1 at 2 position', () => {
    const tree = getTree(items3);
    expect(tree.getChild(1, 2).id).toBe(4);
});

test('getChild returns null child for parent 1 at 3 position', () => {
    const tree = getTree(items3);
    expect(tree.getChild(1, 3)).toBe(undefined);
});

test('insert function should change tree to the 3 level structure', () => {
    const tree = getTree(items3);
    tree.insert(1, 100, {});
    tree.insert(4, 400, {});
    const children = [];
    tree.loopLevels(this, function (nodeid, node, level) {
        if (children[level] == null) {
            children[level] = { level: level, items: [] };
        }
        children[level].items.push({ id: nodeid, parent: tree.parentid(nodeid) });
    });
    const expectedChildren = [{ "level": 0, "items": [{ "id": 1, "parent": null }] },
        { "level": 1, "items": [{ "id": 100, "parent": 1 }] },
        { "level": 2, "items": [{ "id": 2, "parent": 100 }, { "id": 3, "parent": 100 }, { "id": 4, "parent": 100 }] },
        { "level": 3, "items": [{ "id": 400, "parent": 4 }] }
    ];
    expect(children).toEqual(expectedChildren);
});

test('insert function should change tree to the 3 level structure', () => {
    const tree = getTree(items3);
    tree.insert(1, 100, {});
    tree.insert(4, 400, {});
    const children = [];
    tree.loopLevels(this, function (nodeid, node, level) {
        if (children[level] == null) {
            children[level] = { level: level, items: [] };
        }
        children[level].items.push({ id: nodeid, parent: tree.parentid(nodeid) });
    });
    const expectedChildren = [{ "level": 0, "items": [{ "id": 1, "parent": null }] },
        { "level": 1, "items": [{ "id": 100, "parent": 1 }] },
        { "level": 2, "items": [{ "id": 2, "parent": 100 }, { "id": 3, "parent": 100 }, { "id": 4, "parent": 100 }] },
        { "level": 3, "items": [{ "id": 400, "parent": 4 }] }
    ];
    expect(children).toEqual(expectedChildren);
});

test('moveChildren function test', () => {
    const tree = getTree([
        { id: 1 },
        { id: 10 },
        { id: 2, parent: 1 },
        { id: 3, parent: 1 },
        { id: 4, parent: 1 },
        { id: 11, parent: 10 },
        { id: 12, parent: 10 }
    ]);
    
    tree.moveChildren(1, 10);
    
    var children = [];
    tree.loopLevels(this, function (nodeid, node, level) {
        if (children[level] == null) {
            children[level] = { level: level, items: [] };
        }
        children[level].items.push({ id: nodeid, parent: tree.parentid(nodeid) });
    });
    var expectedChildren = [{ "level": 0, "items": [{ "id": 1, "parent": null }, { "id": 10, "parent": null }] },
        { "level": 1, "items": [{ "id": 11, "parent": 10 }, { "id": 12, "parent": 10 }, { "id": 2, "parent": 10 }, { "id": 3, "parent": 10 }, { "id": 4, "parent": 10 }] }
    ];
    expect(children).toEqual(expectedChildren);
});

