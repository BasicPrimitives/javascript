/*
	Class: primitives.common.pile
		Sorts and stack segments on top of each other so they occupy minimum number of rows.
*/
primitives.common.pile = function () {
	var _items = [];

	/*
		Function: add
			Add segment to pile object.
	
		Parameters:
			from - Left margin of segment.
			to - Right margin of segment.
			context - Any reference to user object. It is returned as parameter in callback function of resolve method.

		See Also:
			<primitives.common.pile>
	*/
	function add(from, to, context) {
		if (from < to) {
			_items.push(new Segment(from, to, context, 1));
		} else {
			_items.push(new Segment(to, from, context, -1));
		}
	}

	/*
		Function: resolve
			Sorts and stack segments on top of each other so they occupy minimum number of rows.
	
		Parameters:
			thisArg - Context of onItemStacked callback function call.
			onItemStacked - Call back function used to set segment offset. function(from, to, context, offset) {}

		Returns: 
			Number of stacked rows in pile.

		See Also:
			<primitives.common.pile>
	*/
	function resolve(thisArg, onItem) { // function(from, to, context, offset) {}
		var hash,
			backtraceNext,
			backtraceTaken,
			items, item,
			rowItems,
			rows,
			rowIndex, index,
			offset = 0;

		if (onItem != null) {
			items = _items.slice(0);
			items.sort(function (a, b) {
				return a.from - b.from;
			});

			rows = [];
			while (items.length > 0) {
				hash = {};
				backtraceNext = {};
				backtraceTaken = {};

				getMax(0, items, hash, backtraceNext, backtraceTaken);

				rowItems = [];
				rows[offset] = [];
				index = 0;
				while (backtraceNext.hasOwnProperty(index)) {
					if (backtraceTaken[index]) {
						rowItems.push(index);

						rows[offset].push(items[index]);
					}
					index = backtraceNext[index];
				}

				for (index = rowItems.length - 1; index >= 0; index -= 1) {
					items.splice(rowItems[index], 1);
				}
				offset += 1;
			}

			for (rowIndex = 0; rowIndex < offset; rowIndex += 1) {
				rowItems = rows[rowIndex];
				for (index = 0; index < rowItems.length; index += 1) {
					item = rowItems[index];
					if (onItem.call(thisArg, item.from, item.to, item.context, rowIndex, offset, item.direction)) {
						return offset;
					}
				}
			}
		}

		return offset;
	}

	function Segment(from, to, context, direction) {
		this.context = context;
		this.from = from;
		this.to = to;
		this.offset = null;
		this.direction = direction;
	}

	function getMax(index, items, hash, backtraceNext, backtraceTaken) {
		var result = 0;

		if (index >= items.length) {
			return 0;
		}

		if (hash.hasOwnProperty(index)) {
			return hash[index];
		}

		var item = items[index];
		var withoutItem = getMax(index + 1, items, hash, backtraceNext, backtraceTaken);

		var nextIndex = index + 1;
		while (nextIndex < items.length) {
			var nextItem = items[nextIndex];
			if (nextItem.from >= item.to) {
				break;
			}
			nextIndex += 1;
		}
		var withItem = 1 + getMax(nextIndex, items, hash, backtraceNext, backtraceTaken);

		if (withItem > withoutItem) {
			hash[index] = withItem;
			backtraceNext[index] = nextIndex;
			backtraceTaken[index] = true;
		} else {
			hash[index] = withoutItem;
			backtraceNext[index] = index + 1;
			backtraceTaken[index] = false;
		}

		return hash[index];
	}

	return {
		add: add,
		resolve: resolve
	};
};