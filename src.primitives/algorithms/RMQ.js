primitives.common.RMQ = function (items) {
	var _lookup = [];
	var _log2 = Math.log(2);

	preprocess();

	function preprocess() {
		var power;

		for (var index = 0, len = items.length; index < len; index += 1) {
			_lookup[index] = [index];
		}
		for (power = 1, len = items.length; (1 << power) < len; power += 1) {
			for (index = 0; (index + (1 << power) - 1) < len; index += 1) {
				if (items[_lookup[index][power - 1]] < items[_lookup[index + (1 << (power - 1))][power - 1]]) {
					_lookup[index][power] = _lookup[index][power - 1];
				} else {
					_lookup[index][power] = _lookup[index + (1 << (power - 1))][power - 1];
				}
			}
		}
	}

	function getRangeMinimumIndex(from, to) {
		var power = Math.floor(Math.log(to - from + 1) / _log2);

		if (items[_lookup[from][power]] <= items[_lookup[to - (1 << power) + 1][power]]) {
			return _lookup[from][power];
		} else {
			return _lookup[to - (1 << power) + 1][power];
		}
	}

	function getRangeMinimum(from, to) {
		return items[getRangeMinimumIndex(from, to)];
	}

	return {
		getRangeMinimumIndex: getRangeMinimumIndex,
		getRangeMinimum: getRangeMinimum
	};
};