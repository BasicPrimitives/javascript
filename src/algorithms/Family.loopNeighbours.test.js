import Family from './Family';

function getFamily(items) {
    var family = Family();
    for (var index = 0; index < items.length; index += 1) {
      var item = items[index];
      family.add(item.parents, item.id, item);
    }
    return family;
}

const items = [
    { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 },
    { id: 5 }, { id: 6, parents: [1, 2] }, { id: 7, parents: [3, 4] }, { id: 8, parents: [4] },
    { id: 9, parents: [5, 6, 7] }, { id: 10, parents: [6, 7] }, { id: 11, parents: [6, 7, 8] },
    { id: 12, parents: [9] }, { id: 13, parents: [9, 10, 11] }, { id: 14, parents: [9, 10, 11] }, { id: 15, parents: [11] },
    { id: 16, parents: [12, 13] }, { id: 17, parents: [13] }, { id: 18, parents: [14] }, { id: 19, parents: [14] }
];

test('loopNeighbours -  Loop neighboring parents & children', () => {
    const family = getFamily(items);

    var result = [];
    family.loopNeighbours(this, 10, function (itemid, item, level) {
      result.push(itemid);
  
      return true;
    });

    expect(result).toEqual(["13", "9", "10", "11", "14", "6", "7"]);
});

test('loopNeighbours -  Loop neighboring parents & children', () => {
    const family = getFamily(items);

    var result = [];
    family.loopNeighbours(this, 10, function (itemid, item, level) {
      result.push(itemid);
  
      if (itemid != "13" && itemid != "7") {
        return true;
      }
    });

    expect(result).toEqual(["13", "9", "10", "11", "14", "16", "12", "17", "6", "7", "3", "4", "8"]);
});

  