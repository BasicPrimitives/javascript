QUnit.module('Algorithms - getFamilyLoops');

QUnit.test("primitives.common.getFamilyLoops - Find optimal set of loops.", function (assert) {

	function getFamily(items) {
		var family = primitives.common.family();
		for (var index = 0; index < items.length; index += 1) {
			var item = items[index];
			family.add(item.parents, item.id, item);
		}
		return family;
	}

	(function () {
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

		var result = primitives.common.getFamilyLoops(family);

		var expected = [
		];

		assert.deepEqual(result, expected, "getFamilyLoops function finds optimal set of loops in family structure");
	})();
});