primitives.common.TreeLevels = function (source) {
	var _levels = [],
		_items = {},
		_minimum = null,
		_maximum = null;

	_init(source);

	function _init(source) {
		if (primitives.common.isObject(source)) {
			_levels = primitives.common.cloneObject(source.levels, true);
			_items = primitives.common.cloneObject(source.items, true);
			_minimum = primitives.common.cloneObject(source.minimum, true);
			_maximum = primitives.common.cloneObject(source.maximum, true);
		}
	}

	function LevelContext(context) {
		this.context = context;
		this.items = [];
	}

	function ItemContext(context, position, level) {
		this.context = context;
		this.positions = {};
		this.positions[level] = position;
		this.startLevel = level;
		this.endLevel = level;
	}

	function isEmpty() {
		return !_levels.length;
	}

	function length() {
		return _levels.length;
	}

	function addLevel(level, context) {
		var treeLevel = createLevel(level);
		treeLevel.context = context;
	}

	function getStartLevelIndex(itemid) {
		return _items.hasOwnProperty(itemid) ? _items[itemid].startLevel : null;
	}

	function getEndLevelIndex(itemid) {
		return _items.hasOwnProperty(itemid) ? _items[itemid].endLevel : null;
	}

	function getItemPosition(itemid, level) {
		var context = _items[itemid];
		if(context != null) {
			if (level != null) {
				return context.positions[level];
			} else {
				return context.positions[context.startLevel];
			}
		}
		return null;
	}

	function getItemAtPosition(levelIndex, position) {
		var level = _levels[levelIndex],
			itemid = null;
		if (level != null) {
			itemid = level.items[position];
		}
		return itemid;
	}

	function getPrevItem(itemid, itemLevel) {
		var result = null;
		if(_items.hasOwnProperty(itemid)) {
			var item = _items[itemid];
			itemLevel = itemLevel || item.startLevel;
			var level = _levels[itemLevel];
			result = level.items[item.positions[itemLevel] - 1];
		}
		return result;
	}

	function getNextItem(itemid, itemLevel) {
		var result = null;
		if (_items.hasOwnProperty(itemid)) {
			var item = _items[itemid];
			itemLevel = itemLevel || item.startLevel;
			var level = _levels[itemLevel];
			result = level.items[item.positions[itemLevel] + 1];
		}
		return result;
	}

	function hasItem(itemid) {
		return _items.hasOwnProperty(itemid);
	}

	function hasLevel(levelIndex) {
		return _levels[levelIndex] != null;
	}

	function getItemContext(itemid) {
		var result = null;
		if (_items.hasOwnProperty(itemid)) {
			result = _items[itemid].context;
		}
		return result;
	}

	function createLevel(index) {
		if (_levels[index] == null) {
			_levels[index] = new LevelContext(null);

			_minimum = _minimum === null ? index : Math.min(_minimum, index);
			_maximum = _maximum === null ? index : Math.max(_maximum, index);
		}
		return _levels[index];
	}

	function addItem(levelIndex, itemid, context) {
		var level, itemContext;
		if (!_items.hasOwnProperty(itemid)) {
			level = createLevel(levelIndex);
			level.items.push(itemid);
			_items[itemid] = new ItemContext(context, level.items.length - 1, levelIndex);
		} else {
			level = createLevel(levelIndex);
			level.items.push(itemid);
			itemContext = _items[itemid];
			itemContext.positions[levelIndex] = level.items.length - 1;
			itemContext.startLevel = Math.min(itemContext.startLevel, levelIndex);
			itemContext.endLevel = Math.max(itemContext.endLevel, levelIndex);
		}
	}

	function loopLevels(thisArg, onItem) { // function onItem(levelIndex, level)
		var index, 
			level;
		if (onItem != null) {
			for (index = _minimum; index <= _maximum; index+=1) {
				level = _levels[index];
				if(level != null) {
					if (onItem.call(thisArg, index, level.context)) {
						break;
					}
				}
			}
		}
	}

	function loopLevelsReversed(thisArg, onItem) { // function onItem(levelIndex, level)
		var index,
			level;
		if (onItem != null) {
			for (index = _maximum; index >= _minimum; index -= 1) {
				level = _levels[index];
				if (level != null) {
					if (onItem.call(thisArg, index, level.context)) {
						break;
					}
				}
			}
		}
	}

	function getLevelLength(levelIndex) {
		var result = 0,
			level = _levels[levelIndex];
		if (level != null) {
			result = level.items.length;
		}
		return result;
	}

	function loopLevelItems(thisArg, levelIndex, onItem) { // function onItem(itemid, item, position)
		var index, len,
			level,
			itemid;
		if (onItem != null) {
			level = _levels[levelIndex];
			if (level != null) {
				for (index = 0, len = level.items.length; index < len; index += 1) {
					itemid = level.items[index];
					if (onItem.call(thisArg, itemid, _items[itemid].context, index)) {
						break;
					}
				}
			}
		}
	}

	function loopItems(thisArg, onItem) { // function onItem(itemid, item, position, levelIndex, level)
		var index, len,
			level, levelIndex,
			items,
			itemid,
			processed = {};
		if (onItem != null) {
			for (levelIndex = _minimum; levelIndex <= _maximum; levelIndex += 1) {
				level = _levels[levelIndex];
				if (level != null) {
					items = level.items;
					for (index = 0, len = items.length; index < len; index += 1) {
						itemid = items[index];
						if (!processed.hasOwnProperty(itemid)) {
							processed[itemid] = true;
							if (onItem.call(thisArg, itemid, _items[itemid].context, index, levelIndex, level.context)) {
								return;
							}
						}
					}
				}
			}
		}
	}

	function binarySearch(thisArg, levelIndex, onGetDistance) {
		var result = null,
			level;
		if (onGetDistance != null) {
			level = _levels[levelIndex];
			if (level != null) {
				result = primitives.common.binarySearch(level.items, function (itemid) {
					return onGetDistance.call(thisArg, itemid, _items[itemid].context);
				});
			}
		}
		return result.item;
	}

	function loopMerged(thisArg, getItemWeight, onItem) {
		var index, len,
			level,
			itemid,
			levelsItems = [],
			sortedItems;

		for (index = 0, len = _levels.length; index < len; index += 1) {
			level = _levels[index];
			if (level != null) {
				levelsItems.push(level.items);
			}
		}

		sortedItems = primitives.common.mergeSort(levelsItems, getItemWeight, true);

		if (onItem != null) {
			for (index = 0, len = sortedItems.length; index < len; index += 1) {
				itemid = sortedItems[index];
				if (onItem.call(thisArg, itemid, _items[itemid].context)) {
					break;
				}
			}
		}
	}

	function loopFromItem(thisArg, itemid, isLeft, onItem, level) {
		var context,
			index, len,
			items, nextItemId,
			itemLevel, position;
		if (_items.hasOwnProperty(itemid)) {
			context = _items[itemid];
			itemLevel = level || context.startLevel;
			items = _levels[itemLevel].items;
			position = context.positions[itemLevel];
			if (onItem != null) {
				if (isLeft) {
					for (index = position - 1; index >= 0; index -= 1) {
						nextItemId = items[index];
						if (onItem.call(thisArg, nextItemId, _items[nextItemId].context)) {
							break;
						}
					}
				} else {
					for (index = position + 1, len = items.length; index < len; index += 1) {
						nextItemId = items[index];
						if (onItem.call(thisArg, nextItemId, _items[nextItemId].context)) {
							break;
						}
					}
				}
			}
		}
	}

	function loopLevelsFromItem(thisArg, itemid, isBelow, onItem) { // function(levelIndex, level)
		var context,
			index, len,
			items, item, nextItemId,
			nextLevels, level;
		if (_items.hasOwnProperty(itemid)) {
			context = _items[itemid];
			if (onItem != null) {
				if (isBelow) {
					for (index = context.endLevel + 1; index <= _maximum; index += 1) {
						level = _levels[index];
						if (onItem.call(thisArg, index, level != null ? level.context : null)) {
							break;
						}
					}
				} else {
					for (index = context.startLevel - 1; index >= _minimum; index -= 1) {
						level = _levels[index];
						if (onItem.call(thisArg, index, level != null ? level.context : null)) {
							break;
						}
					}
				}
			}
		}
	}

	function clone() {
		return primitives.common.TreeLevels({
			levels: _levels,
			items: _items,
			minimum: _minimum,
			maximum: _maximum
		});
	}

	return {
		addlevel: addLevel,
		hasLevel: hasLevel,
		hasItem: hasItem,
		addItem: addItem,
		getItemContext: getItemContext,
		getLevelIndex: getStartLevelIndex,
		getEndLevelIndex: getEndLevelIndex,
		getItemPosition: getItemPosition,
		getItemAtPosition: getItemAtPosition,
		loopLevels: loopLevels,
		loopLevelsReversed: loopLevelsReversed,
		loopLevelItems: loopLevelItems,
		getLevelLength: getLevelLength,
		loopItems: loopItems,
		binarySearch: binarySearch,
		loopMerged: loopMerged,
		loopFromItem: loopFromItem,
		loopLevelsFromItem: loopLevelsFromItem,
		getPrevItem: getPrevItem,
		getNextItem: getNextItem,
		length: length,
		isEmpty: isEmpty,

		clone: clone
	};
};