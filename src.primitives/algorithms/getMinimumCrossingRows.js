primitives.common.getMinimumCrossingRows = function (thisArg, rectangles, onItem) { // function onItem(row)
	var from = null;
	var to = null;
	if (onItem != null) {
		rectangles.sort(function (a, b) {
			return a.y - b.y;
		});

		for (var index = 0; index < rectangles.length; index += 1) {
			var rect = rectangles[index];
			var bottom = rect.bottom();
			if (from === null) {
				from = rect.y;
				to = bottom;
			} else {
				if (rect.y >= to) {
					onItem.call(this.Arg, from);
					from = rect.y;
					to = bottom;
				} else {
					if (rect.y > from) {
						from = rect.y;
					}

					if (bottom < to) {
						to = bottom;
					}
				}
			}
		}
		if (from !== null) {
			onItem.call(this.Arg, from);
		}
	}
};

