primitives.common.SpatialIndex = function (sizes) {
	var _buckets = [];

	sizes.sort(function (a, b) { return a - b;});

	switch (sizes.length) {
		case 0:
			_buckets.push(new Bucket(0, 1000000));
			break;
		case 1:
			var size1 = sizes[0];
			_buckets.push(new Bucket(0, size1));
			break;
		case 2:
			size1 = sizes[0];
			var size2 = sizes[1];
			if (size2 > size1 * 2) {
				_buckets.push(new Bucket(0, size1));
				_buckets.push(new Bucket(size1, size2));
			} else {
				_buckets.push(new Bucket(0, size2));
			}
			break;
		default:
			var breaks = primitives.common.getLiniarBreaks(sizes);
			var minimum = 0;
			for (var index = 0; index < breaks.length; index += 1) {
				var maximum = sizes[breaks[index]];
				_buckets.push(new Bucket(minimum, maximum));
				minimum = maximum;
			}
			break;
	}

	function Bucket(minimum, maximum) {
		this.minimum = minimum;
		this.maximum = maximum;
		this.quadTree = primitives.common.QuadTree(maximum * 2);
	}

	function addRect(rect) {
		var size = Math.max(rect.width, rect.height);
		var point = rect.centerPoint();

		for (var index = 0, len = _buckets.length; index < len; index += 1) {
			var bucket = _buckets[index];

			if (size <= bucket.maximum || index == len - 1) {
				point.context = rect;
				bucket.quadTree.addPoint(point);
				break;
			}
		}
	}

	function loopArea(thisArg, rect, onItem) { // onItem = function(itemid) {}
		if (onItem != null) {
			for (var index = 0, len = _buckets.length; index < len; index += 1) {
				var bucket = _buckets[index];
				var bucketRect = new primitives.common.Rect(rect);
				bucketRect.offset(bucket.maximum / 2.0);
				bucket.quadTree.loopArea(this, bucketRect, function (point) {
					var pointRect = point.context;

					if (rect.overlaps(pointRect)) {
						return onItem.call(thisArg, pointRect);
					}
				});
			}
		}
	}

	function validate() {
		var result = true;
		for (var index = 0, len = _buckets.length; index < len; index += 1) {
			var bucket = _buckets[index];

			result = result && bucket.quadTree.validate();
		}
		return result;
	}

	function getPositions(selection) {
		var result = [];
		for (var index = 0, len = _buckets.length; index < len; index += 1) {
			var bucket = _buckets[index];

			result = result.concat(bucket.quadTree.getPositions(selection));
		}
		return result;
	}

	return {
		addRect: addRect,
		loopArea: loopArea,
		validate: validate,
		getPositions: getPositions
	};
};