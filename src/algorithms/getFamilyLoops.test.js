import Family from './Family';
import getFamilyLoops, { Edge } from './getFamilyLoops';

function getFamily(items) {
  var family = Family();
  for (var index = 0; index < items.length; index += 1) {
    var item = items[index];
    family.add(item.parents, item.id, item);
  }
  return family;
}

test('getFamilyLoops - function finds optimal set of loops in family structure', () => {
  var family = getFamily([
    { id: 'A', parents: ['D', 'E', 'F', 'I'] },
    { id: 'B', parents: ['A'] },
    { id: 'C', parents: ['B'] },
    { id: 'D', parents: ['C'] },
    { id: 'E', parents: ['C'] },
    { id: 'F', parents: ['C'] },

    { id: 'F', parents: ['D'] },
    { id: 'L', parents: ['F'] },
    { id: 'M', parents: ['L'] },
    { id: 'G', parents: ['L'] },
    { id: 'H', parents: ['F', 'L', 'M'] },
    { id: 'I', parents: ['J'] },
    { id: 'J', parents: ['N'] },
    { id: 'N', parents: ['O'] }
  ]);

  var result = getFamilyLoops(family);

  var expected = [new Edge("A", "B")];

  expect(result).toEqual(expected);
});

test('getFamilyLoops function finds optimal set of loops in family structure', () => {
  var family = getFamily([
    { id: 'A', parents: ['G', 'K', 'L'] },
    { id: 'M', parents: ['G', 'K', 'L'] },
    { id: 'N', parents: ['G', 'K', 'L'] },

    { id: 'B', parents: ['A'] },
    { id: 'O', parents: ['M', 'N'] },
    { id: 'P', parents: ['N', 'M'] },

    { id: 'C', parents: ['B'] },
    { id: 'D', parents: ['B'] },
    { id: 'Q', parents: ['O', 'P'] },
    { id: 'R', parents: ['O', 'P'] },

    { id: 'E', parents: ['C'] },
    { id: 'F', parents: ['D'] },
    { id: 'Z', parents: ['Q', 'R'] },

    { id: 'G', parents: ['E'] },
    { id: 'K', parents: ['F'] },
    { id: 'L', parents: ['Z'] }
  ]);

  var result = getFamilyLoops(family);

  var expected = [new Edge("A", "B"), new Edge("Z", "L")];

  expect(result).toEqual(expected);
});

test('getFamilyLoops function returns empty array for DAG family structure', () => {
  var family = getFamily([
    { id: 'A', parents: ['Z'] },
    { id: 'M', parents: ['Z'] },
    { id: 'N', parents: ['Z'] },

    { id: 'B', parents: ['A'] },
    { id: 'O', parents: ['M', 'N'] },
    { id: 'P', parents: ['N', 'M'] },

    { id: 'C', parents: ['B'] },
    { id: 'D', parents: ['B'] },
    { id: 'Q', parents: ['O', 'P'] },
    { id: 'R', parents: ['O', 'P'] }
  ]);

  var result = getFamilyLoops(family);

  var expected = [];

  expect(result).toEqual(expected);
});
