primitives.famdiagram.RemoveLoopsTask = function (itemsOptionTask, addLabelAnnotationsTask) {
	var _data = {
		logicalFamily: null,
		maximumId: null
	};

	function process(debug) {
		var logicalFamily = addLabelAnnotationsTask.getNavigationFamily(),
			maximumId = addLabelAnnotationsTask.getMaximumId(),
			items = itemsOptionTask.getItems();

		logicalFamily = logicalFamily.clone();

		maximumId = removeLoops(items, logicalFamily, maximumId, debug);

		_data.logicalFamily = logicalFamily;
		_data.maximumId = maximumId;

		if (debug && !logicalFamily.validate()) {
			throw "References are broken in family structure!";
		}

		return true;
	}

	function removeLoops(items, logicalFamily, maximumId, debug) {
		var tempFamily, fakeChild, fakeParent,
			index, len,
			index2, len2,
			nodesToRemove,
			parents,
			userItem;

		tempFamily = logicalFamily.clone();
		logicalFamily.loopTopo(this, function (itemid, item, levelIndex) {
			tempFamily.removeNode(itemid);
		});

		if (tempFamily.hasNodes()) {
			/* remove parents of the first remaining item in user order*/
			for (index = 0, len = items.length; index < len; index += 1) {
				userItem = items[index];

				if (tempFamily.node(userItem.id) != null) {

					parents = [];
					tempFamily.loopParents(this, userItem.id, function (parentid, parent, level) {
						parents.push(parentid);
						return tempFamily.SKIP;
					}); //ignore jslint

					for (index2 = 0, len2 = parents.length; index2 < len2; index2 += 1) {
						/* remove relation in temp structure */
						tempFamily.removeRelation(parents[index2], userItem.id);

						/* reverse relation in actual structure*/
						logicalFamily.removeRelation(parents[index2], userItem.id);
					}

					/* create fake parent and child items to loop item to its parent */
					maximumId += 1;

					/* add fake parent */
					fakeParent = new primitives.famdiagram.FamilyItem({
						id: maximumId,
						isVisible: false,
						isActive: true,
						isLevelNeutral: true,
						hideParentConnection: true,
						hideChildrenConnection: true,
						itemConfig: { title: "fake parent #" + maximumId, description: "This is fake parent item was created by loops reversal." }
					});

					logicalFamily.add([], fakeParent.id, fakeParent);
					logicalFamily.adopt([fakeParent.id], userItem.id);

					for (index2 = 0, len2 = parents.length; index2 < len2; index2 += 1) {
						maximumId += 1;

						/* add fake child */
						fakeChild = new primitives.famdiagram.FamilyItem({
							id: maximumId,
							isVisible: false,
							isActive: true,
							isLevelNeutral: true,
							hideParentConnection: true,
							hideChildrenConnection: true,
							itemConfig: { title: "fake child #" + maximumId, description: "This is fake child item was created by loops reversal." }
						});

						logicalFamily.add([fakeParent.id, parents[index2]], fakeChild.id, fakeChild);
					}


					/* loop is broken, so continue items removable in topological order */
					nodesToRemove = [];
					tempFamily.loopTopo(this, function (itemid, item, levelIndex) {
						nodesToRemove.push(itemid);
					}); //ignore jslint
					for (index2 = 0, len2 = nodesToRemove.length; index2 < len2; index2 += 1) {
						tempFamily.removeNode(nodesToRemove[index2]);
					}
				}
			}
		}
		return maximumId;
	}

	function getLogicalFamily() {
		return _data.logicalFamily;
	}

	function getMaximumId() {
		return _data.maximumId;
	}

	return {
		process: process,
		getLogicalFamily: getLogicalFamily,
		getMaximumId: getMaximumId
	};
};