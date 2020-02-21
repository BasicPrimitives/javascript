primitives.common.getFamilyLoops = function (family) {
	var loops = [],
		index,
		len;

	function Edge() {
		this.fromIndex = 0;
		this.toIndex = 0;
		this.value = 1;
	}

	var tempFamily = family.clone();

	family.loopTopo(this, function(itemid) {
		tempFamily.removeNode(itemid);
	})
	family.loopTopoReversed(this, function(itemid) {
		tempFamily.removeNode(itemid);
	})
	var cleanFamily = tempFamily.clone();

	cleanFamily.loop(this, function(itemid) {
		if(tempFamily.node(itemid) != null) {
			var parents = [];
			cleanFamily.loopParents(this, itemid, function(parentid) {
				parents.push(parentid);
				tempFamily.removeRelation(itemid, parentid);
				return cleanFamily.SKIP;
			})

			loops.push({itemid: itemid, parents: parents});
		}
		var itemsToRemove = [];
		tempFamily.loopTopo(this, function(itemid) {
			itemsToRemove.push(itemid);
		});
		for(var index = 0; index < itemsToRemove.length; index+=1) {
			var itemid = itemsToRemove[index];
			tempFamily.removeNode(itemid);
		}
	});

	/* Invert loops */
	for(var index = 0; index < loops.length; index+=1) {
		var loop = loops[index];
		var parents = loop.parents;
		for(var index2 = 0; index2 < parents.length; index2+=1) {
			var parentid = parents[index];
			cleanFamily.removeRelation(loop.itemid, parentid);
		}
	}

	var graph = cleanFamily.getGraph(this, function(from, to) {
		return {from: from, to: to, weight: 1};
	});
	var from = 1000;
	var to = 2000;
	for(var index = 0; index < loops.length; index+=1) {
		var loop = loops[index];
		var parents = loop.parents;
		for(var index2 = 0; index2 < parents.length; index2+=1) {
			var parentid = parents[index];
			var edge = graph.edge(parentid, to);
			if(edge == null) {
				graph.addEdge(parentid, to, {from: parentid, to: to, initial: 1, forward: 1, backward: 0 });
			} else {
				edge.initial +=1;
				edge.forward +=1;
			}
		}
		graph.addEdge(from, loop.itemid, {from: from, to: loop.itemid, initial: parents.length, forward: parents.length, backward: 0});
	}

	var connectionPath = [];
	graph.getShortestPath(this, from, [to], function (edge, fromItem, toItem) {
			if(fromItem == edge.from) {
				return edge.forward;
			} else {
				return edge.backward;
			}
		}, function (path) {
		connectionPath = path;
	});


	return loops;
};