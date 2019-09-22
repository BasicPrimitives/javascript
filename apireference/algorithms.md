# Algorithms
## <a name="primitives.common.family" id="primitives.common.family">family</a>
Creates a family object

 `primitives.common.family` 

### Constructor

 `family(source)` 

Creates a family object

 Returns: `family` - returns new instance of family structure

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `source` | family | `undefined` | Reference to optional family object to clone properties from | 

### Constants
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `BREAK` | number | `1` | B R E A K | 
 | `SKIP` | number | `2` | S K I P | 

### Functions

 `add(parents, nodeid, node)` 

Adds new family member

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `parents` | string[] | `` | A collection of parents ids | 
 | `nodeid` | string | `` | An id of the new node | 
 | `node` | object | `` | A reference to the new node | 

 `adopt(parents, nodeid)` 

Makes node to be a child of every parent in the collection of parents

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `parents` | string[] | `` | A collection of parents ids | 
 | `nodeid` | string | `` | An id of the new node | 

 `bundleChildren(parent, children, bundleItemId, bundleItem)` 

Adds extra budnle item in between parent and its children. The parent node becomes parent of the bundle node, and bundle becomes parent of the children. Existing parent child relations are removed.

 Returns: `boolean` - returns true if nodes bundle is valid

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `parent` | string | `` | The parent node id | 
 | `children` | string[] | `` | The collection of child nodes ids | 
 | `bundleItemId` | string | `` | The bundle node id | 
 | `bundleItem` | object | `` | The bundle item context object | 

 `bundleParents(child, parents, bundleItemId, bundleItem)` 

Adds extra budnle item in between child node and its parents. The child node becomes child of the bundle node, and bundle becomes child of the parents. Existing parent child relations are removed.

 Returns: `boolean` - returns true if the bundle is valid

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `child` | string | `` | The parent node id | 
 | `parents` | string[] | `` | The collection of child nodes ids | 
 | `bundleItemId` | string | `` | The bundle node id | 
 | `bundleItem` | object | `` | The bundle item context object | 

 `clone()` 

Clones family structure.

 Returns: `family` - returns copy of the family structure.


 `countChildren(parent)` 

Returns number of children

 Returns: `number` - number of children

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `parent` | string | `` | The parent node id | 

 `countParents(child)` 

Returns number of parents

 Returns: `number` - number of parents

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `child` | string | `` | The child node id | 

 `eliminateManyToMany(onNewBundleItem)` 

Eliminates many to many relations in family structure It is needed to simplify layout process of the diagram

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `onNewBundleItem` | onNewFamilyNodeCallback | `` | Callback function for creation of new bundle node | 
**Callbacks**

 `onNewFamilyNodeCallback()` 

Callback function for cretion of new family nodes

 Returns: `object` - returns new family node.


 `findLargestRoot()` 

Finds root node having largest number of nodes in its hierachy

 Returns: `string` - returns largest sub-hierarchy root node id.


 `firstChild(parent)` 

First available child

 Returns: `string` - returns first available child id or null.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `parent` | string | `` | The parent node id | 

 `firstParent(child)` 

First available parent

 Returns: `string` - returns first available parent id or null.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `child` | string | `` | The child node id | 

 `getFamilyWithoutGrandParentsRelations()` 

Eliminates direct relations between grand parent nodes.

 Returns: `family` - returns family structure without direct grand parent relations.


 `getGraph()` 

Creates graph structure out of the family structure.

 Returns: `graph` - returns graph structure of the family.


 `getPlanarFamily(treeLevels)` 

Eliminates crossing parent child relations between nodes based of nodes order in treeLevels structure.

 Returns: `family` - returns planar family structure.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `treeLevels` | treeLevels | `` | Tree levels structure keeps orders of nodes level by level. | 

 `hasCommonChild(parents)` 

Checks whether parents share a child node. Common child should belong only to the given collection of parents, if child's parents don't match given collection of parents, it is not considered as common child.

 Returns: `boolean` - returns true if common child exist.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `parents` | string[] | `` | Collection of parents | 

 `hasLoops()` 

Checks if family structure has loops in references.

 Returns: `boolean` - returns true if family structure contains loops in references.


 `hasNodes()` 

Returns true if structure has nodes.

 Returns: `boolean` - returns true if family structure has nodes


 `loop(thisArg, onItem)` 

Loops through nodes of family struture

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thisArg` | Object | `` | The callback function invocation context | 
 | `onItem` | onFamilyItemCallback | `` | A callback function to call for every family node | 
**Callbacks**

 `onFamilyItemCallback(itemid, item)` 

Callback for iterating family nodes

 Returns: `boolean` - returns true to break the loop

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `itemid` | string | `` | The node id | 
 | `item` | object | `` | The node | 

 `loopChildren(thisArg, nodeid, onItem)` 

Loops through child nodes of family struture level by level

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thisArg` | Object | `` | The callback function invocation context | 
 | `nodeid` | string | `` | The node id to start children traversing | 
 | `onItem` | onFamilyItemWithLevelCallback | `` | A callback function to call for every child node | 
**Callbacks**

 `onFamilyItemWithLevelCallback(itemid, item, levelIndex)` 

Callback for iterating family nodes level by level

 Returns: `number` - returns break to break the loop and exit. returns skip to skip node's branch traversing.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `itemid` | string | `` | The node id | 
 | `item` | object | `` | The node | 
 | `levelIndex` | number | `` | The node level index | 

 `loopLevels(thisArg, parentAligned, onItem)` 

Loops through nodes of family struture level by level. This function aligns nodes top or bottom.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thisArg` | Object | `` | The callback function invocation context | 
 | `parentAligned` | boolean | `` | True if nodes should be placed at the next level after their parents level, otherwise nodes placed at levels close to their children. | 
 | `onItem` | onFamilyItemWithLevelCallback | `` | A callback function to call for every node | 
**Callbacks**

 `onFamilyItemWithLevelCallback(itemid, item, levelIndex)` 

Callback for iterating family nodes level by level

 Returns: `number` - returns break to break the loop and exit. returns skip to skip node's branch traversing.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `itemid` | string | `` | The node id | 
 | `item` | object | `` | The node | 
 | `levelIndex` | number | `` | The node level index | 

 `loopNeighbours(thisArg, itemid, onItem)` 

Loops through the node neighbours of the family struture level by level

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thisArg` | Object | `` | The callback function invocation context | 
 | `itemid` | string | `` | The node id to start traversing neighbour nodes | 
 | `onItem` | onFamilyItemNeighbourCallback | `` | A callback function to call for every neighbour node | 
**Callbacks**

 `onFamilyItemNeighbourCallback(itemid, item, levelIndex)` 

Callback for iterating family node neighbours level by level

 Returns: `number` - returns true to skip further neighbous traversing.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `itemid` | string | `` | The node id | 
 | `item` | object | `` | The node | 
 | `levelIndex` | number | `` | The neigbour node distance from the start node | 

 `loopParents(thisArg, nodeid, onItem)` 

Loops through parent nodes of family struture level by level

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thisArg` | Object | `` | The callback function invocation context | 
 | `nodeid` | string | `` | The node id to start parents traversing | 
 | `onItem` | onFamilyItemWithLevelCallback | `` | A callback function to call for every parent node | 
**Callbacks**

 `onFamilyItemWithLevelCallback(itemid, item, levelIndex)` 

Callback for iterating family nodes level by level

 Returns: `number` - returns break to break the loop and exit. returns skip to skip node's branch traversing.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `itemid` | string | `` | The node id | 
 | `item` | object | `` | The node | 
 | `levelIndex` | number | `` | The node level index | 

 `loopRoots(thisArg, onItem)` 

Loops root nodes of family structure.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thisArg` | Object | `` | The callback function invocation context | 
 | `onItem` | onFamilyItemCallback | `` | A callback function to call for every family root node | 
**Callbacks**

 `onFamilyItemCallback(itemid, item)` 

Callback for iterating family nodes

 Returns: `boolean` - returns true to break the loop

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `itemid` | string | `` | The node id | 
 | `item` | object | `` | The node | 

 `loopTopo(thisArg, onItem)` 

Loops through topologically sorted nodes of family struture

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thisArg` | Object | `` | The callback function invocation context | 
 | `onItem` | onFamilyTopoCallback | `` | A callback function to call for every node | 
**Callbacks**

 `onFamilyTopoCallback(itemid, item, position)` 

Callback for iterating family nodes in topological sort order

 Returns: `boolean` - returns true to break the loop and exit.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `itemid` | string | `` | The node id | 
 | `item` | object | `` | The node | 
 | `position` | number | `` | The node position in the sequence | 

 `loopTopoReversed(thisArg, onItem)` 

Loops through reversed order topologically sorted nodes of family struture

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thisArg` | Object | `` | The callback function invocation context | 
 | `onItem` | onFamilyTopoCallback | `` | A callback function to call for every node | 
**Callbacks**

 `onFamilyTopoCallback(itemid, item, position)` 

Callback for iterating family nodes in topological sort order

 Returns: `boolean` - returns true to break the loop and exit.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `itemid` | string | `` | The node id | 
 | `item` | object | `` | The node | 
 | `position` | number | `` | The node position in the sequence | 

 `node(nodeid)` 

Returns family node by id

 Returns: `object|undefined` - a reference to the node or undefined if id does not exists

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `nodeid` | string | `` | The id of the node | 

 `optimizeReferences(onNewBundleItem)` 

Optimizes references between family members. It creates bundles eliminating excessive intersecions between nodes relations.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `onNewBundleItem` | onNewFamilyNodeCallback | `` | Callback function to create a new family node context object. | 
**Callbacks**

 `onNewFamilyNodeCallback()` 

Callback function for cretion of new family nodes

 Returns: `object` - returns new family node.


 `removeNode(nodeid)` 

Removes node

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `nodeid` | string | `` | The id of the node | 

 `removeRelation(fromid, toid)` 

Remove parent child relation

 Returns: `true` - if relation was broken

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `fromid` | string | `` | The parent node id | 
 | `toid` | string | `` | The child node id | 

 `validate(info)` 

Validates internal data structure consitency of the family.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `info` | object | `` | Optional validation object. | 

## <a name="primitives.common.FamilyAlignment" id="primitives.common.FamilyAlignment">FamilyAlignment</a>
Creates family alignment data structure. This structure aligns horizontaly planar family of nodes.

 `primitives.common.FamilyAlignment` 

### Constructor

 `FamilyAlignment(thisArg, family, treeLevels, onItemSize)` 

Creates family alignment data structure. This structure aligns horizontaly planar family of nodes.

 Returns: `FamilyAlignment` - returns family alignment structure

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thisArg` | Object | `` | The callback function invocation context | 
 | `family` | family | `` | Family data structure | 
 | `treeLevels` | TreeLevels | `` | Three levels data structure | 
 | `onItemSize` | onFamilyAlignmentItemSizeCallback | `` | Callback function to measure family node width | 

### Functions

 `getOffset(nodeid)` 

Returns horizontal node offset from left margin of the family daigram

 Returns: `number` - node offset

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `nodeid` | string | `` | Family node id | 

## <a name="primitives.common.FibonacciHeap" id="primitives.common.FibonacciHeap">FibonacciHeap</a>
Creates Fibonacci Heap structure

 `primitives.common.FibonacciHeap` 

### Constructor

 `FibonacciHeap(isMaximum)` 

Creates Fibonacci Heap structure

 Returns: `FibonacciHeap` - returns new fibonacciheap object

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `isMaximum` | boolean | `` | Is maximum heap | 

### Functions

 `Result(node)` 

undefined


 `add(key, priority, item)` 

Adds a new item into the heap

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `key` | string | `` | A key of the new element | 
 | `priority` | number | `` | A priority of the new element | 
 | `item` | object | `` | A context object of the new element | 

 `deleteKey(key)` 

Deletes heap element by key

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `key` | string | `` | The Key | 

 `extractRoot()` 

Returns heap root element with removal

 Returns: `HeapResult` - returns root element of the heap


 `getPriority(key)` 

Gets priority of element by key

 Returns: `number` - returns priority of the element

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `key` | string | `` | The element key | 

 `heapRoot()` 

Returns heap root element

 Returns: `HeapResult` - returns root element of the heap


 `setPriority(key, priority)` 

Sets priority of an element by key

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `key` | string | `` | The key of the element | 
 | `priority` | number | `` | Priority | 

 `validate()` 

Validates internal structure consistency.

 Returns: `boolean` - returns true if structure pass data consistency check.


## <a name="primitives.common.graph" id="primitives.common.graph">graph</a>
Creates graph structure

 `primitives.common.graph` 

### Constructor

 `graph()` 

Creates graph structure

 Returns: `graph` - returns graph object


### Functions

 `addEdge(from, to, edge)` 

Adds edge to the graph

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `from` | string | `` | The id of the start node | 
 | `to` | string | `` | The id of the end node | 
 | `edge` | object | `` | The edge contextual object | 

 `edge(from, to)` 

Returns edge context object

 Returns: `object` - the edge's context object

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `from` | string | `` | The edge's from node id | 
 | `to` | string | `` | The edge's to node id | 

 `getMinimumWeightGrowthSequence(thisArg, startNode, onEdgeWeight, onItem)` 

Get minimum weight graph growth sequence. The sequence of the traversing order of the graph nodes.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thisArg` | object | `` | The callback function invocation context | 
 | `startNode` | string | `undefined` | The optional start node id | 
 | `onEdgeWeight` | getGraphEdgeWeightCallback | `` | Callback function to get weight of an edge. | 
 | `onItem` | onNodeCallback | `` | A callback function to be called for every node of the growth sequence | 
**Callbacks**

 `getGraphEdgeWeightCallback(edge, fromItem, toItem)` 

Callback for finding edge weight

 Returns: `number` - returns weight of the edge

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `edge` | object | `` | The edge context object | 
 | `fromItem` | string | `` | The edge's start node id | 
 | `toItem` | string | `` | The edge's end node id | 

 `onNodeCallback(to)` 

Callback function for iterating graphs nodes

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `to` | string | `` | The next neighbouring node id | 

 `getShortestPath(thisArg, startNode, endNodes, getWeightFunc, onPathFound)` 

Get shortest path between two nodes in graph. The start and the end nodes are supposed to have connection path.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thisArg` | object | `` | The callback function invocation context | 
 | `startNode` | string | `` | The start node id | 
 | `endNodes` | string[] | `` | The array of end node ids. | 
 | `getWeightFunc` | getGraphEdgeWeightCallback | `` | Callback function to get weight of an edge. | 
 | `onItem` | onNodeCallback | `` | A callback function to be called for every node of the growth sequence | 
 | `onPathFound` | onPathFoundCallback | `` | A callback function to be called for every end node with the optimal connection path | 
**Callbacks**

 `getGraphEdgeWeightCallback(edge, fromItem, toItem)` 

Callback for finding edge weight

 Returns: `number` - returns weight of the edge

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `edge` | object | `` | The edge context object | 
 | `fromItem` | string | `` | The edge's start node id | 
 | `toItem` | string | `` | The edge's end node id | 

 `onNodeCallback(to)` 

Callback function for iterating graphs nodes

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `to` | string | `` | The next neighbouring node id | 

 `onPathFoundCallback(path, to)` 

Callback for returning optimal connection path for every end node.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `path` | string[] | `` | An array of connection path node ids. | 
 | `to` | string | `` | The end node id, the connection path is found for. | 

 `getSpanningTree(startNode, getWeightFunc)` 

Get maximum spanning tree. Graph may have disconnected sub graphs, so start node is nessasary.

 Returns: `tree` - returns tree structure containing maximum spanning tree of the graph

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `startNode` | string | `` | The node to start searching for maximum spanning tree. Graph is not nessasary connected | 
 | `getWeightFunc` | getGraphEdgeWeightCallback | `` | Callback function to get weight of an edge. | 
**Callbacks**

 `getGraphEdgeWeightCallback(edge, fromItem, toItem)` 

Callback for finding edge weight

 Returns: `number` - returns weight of the edge

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `edge` | object | `` | The edge context object | 
 | `fromItem` | string | `` | The edge's start node id | 
 | `toItem` | string | `` | The edge's end node id | 

 `getTotalWeightGrowthSequence(thisArg, onEdgeWeight, onItem)` 

Get graph growth sequence. The sequence of graph traversing order.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thisArg` | object | `` | The callback function invocation context | 
 | `getWeightFunc` | getGraphEdgeWeightCallback | `` | Callback function to get weight of an edge. | 
 | `onItem` | onNodeCallback | `` | A callback function to be called for every node of the growth sequence | 
**Callbacks**

 `getGraphEdgeWeightCallback(edge, fromItem, toItem)` 

Callback for finding edge weight

 Returns: `number` - returns weight of the edge

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `edge` | object | `` | The edge context object | 
 | `fromItem` | string | `` | The edge's start node id | 
 | `toItem` | string | `` | The edge's end node id | 

 `onNodeCallback(to)` 

Callback function for iterating graphs nodes

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `to` | string | `` | The next neighbouring node id | 

 `hasNode(from)` 

Returns true if node exists in the graph

 Returns: `boolean` - returns true if node exists

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `from` | string | `` | The node id | 

 `loopNodeEdges(thisArg, itemid, onEdge)` 

Loop edges of the node

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thisArg` | object | `` | The callback function invocation context | 
 | `itemid` | string | `` | The node id | 
 | `onEdge` | onEdgeCallback | `` | A callback function to call for every edge of the node | 
**Callbacks**

 `onEdgeCallback(to, edge)` 

Callback for iterating edges of the graph's node

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `to` | string | `` | The neighbouring node id | 
 | `edge` | Object | `` | The edge's context object | 

 `loopNodes(thisArg, startNode, onItem)` 

Loop nodes of the graph

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thisArg` | object | `` | The callback function invocation context | 
 | `itemid` | string | `undefined` | The optional start node id. If start node is undefined, function loops graphs node starting from first available node | 
 | `onItem` | onNodeCallback | `` | A callback function to be called for every neighbouring node | 
**Callbacks**

 `onNodeCallback(to)` 

Callback function for iterating graphs nodes

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `to` | string | `` | The next neighbouring node id | 

## <a name="primitives.common.LCA" id="primitives.common.LCA">LCA</a>
Creates Lowest Common Ancestor Structure for the given tree

 `primitives.common.LCA` 

### Constructor

 `LCA(tree)` 

Creates Lowest Common Ancestor Structure for the given tree

 Returns: `LCA` - returns lowest common ancestor structure

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `tree` | tree | `` | The tree structure | 

### Functions

 `getLowestCommonAncestor(from, to)` 

Returns lowest common ancestor for the given pair of tree nodes

 Returns: `string` - returns the lowest common ancestor tree node id

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `from` | string | `` | The first tree node id | 
 | `to` | string | `` | The second tree node id | 

## <a name="primitives.common.LinkedHashItems" id="primitives.common.LinkedHashItems">LinkedHashItems</a>
Creates linked hash list collection.

 `primitives.common.LinkedHashItems` 

### Constructor

 `LinkedHashItems()` 

Creates linked hash list collection.

 Returns: `LinkedHashItems` - returns linked hash list structure


### Functions

 `add(key, item)` 

Adds new item to collection

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `key` | string | `` | The new item key | 
 | `item` | object | `` | The new item context object value | 

 `attach(list)` 

Appends one list to another

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `list` | LinkedHashItems | `` | A list to append to the end of the current list | 

 `empty()` 

Empties collection


 `endKey()` 

Last collection item key

 Returns: `string` - returns key of the last item in the collection


 `insertAfter(afterKey, key, item)` 

Inserts new item into the list after the given key

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `afterKey` | string | `` | The key that the new element is placed after | 
 | `key` | string | `` | The new item key | 
 | `item` | object | `` | The new item context object value | 

 `insertBefore(beforeKey, key, item)` 

Inserts new item into the list before the given key

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `beforeKey` | string | `` | The key that the new element is placed before | 
 | `key` | string | `` | The new item key | 
 | `item` | object | `` | The new item context object value | 

 `isEmpty()` 

Checks if collection is empty

 Returns: `boolean` - returns true if collection is empty


 `item(key)` 

Item context object

 Returns: `object` - returns context object

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `key` | string | `` | The item's key | 

 `iterate(onItem, startKey, endKey)` 

Loops items of the collection

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `onItem` | onLinkedHashItemsCallback | `` |  Callback function for iterating collection items | 
 | `startKey` | string | `` | The key to start iteration from | 
 | `endKey` | string | `` | The key to end iteration at | 
**Callbacks**

 `onLinkedHashItemsCallback(item, key)` 

Callback function for iterating list items

 Returns: `boolean` - returns true to break the iteration process

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `item` | object | `` |  The item context object | 
 | `key` | string | `` | The item key | 

 `iterateBack(onItem, startKey, endKey)` 

Loops items of the collection backward

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `onItem` | onLinkedHashItemsCallback | `` |  Callback function for iterating collection items | 
 | `startKey` | string | `` | The key to start iteration from | 
 | `endKey` | string | `` | The key to end iteration at | 
**Callbacks**

 `onLinkedHashItemsCallback(item, key)` 

Callback function for iterating list items

 Returns: `boolean` - returns true to break the iteration process

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `item` | object | `` |  The item context object | 
 | `key` | string | `` | The item key | 

 `nextKey(key)` 

Gets next key

 Returns: `string` - returns key of the next collection item

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `key` | string | `` | The item key | 

 `prevKey(key)` 

Gets previous key

 Returns: `string` - returns key of the previous collection item

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `key` | string | `` | The item key | 

 `remove(key)` 

Removes item

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `key` | string | `` | The key of the item | 

 `startKey()` 

First collection item key

 Returns: `string` - returns the key of the first item in the collection


 `toArray()` 

Returns a regular javascript array of collection items

 Returns: `object[]` - returns array containing items of the collection


 `unshift(key, item)` 

Adds new item to the head of the list

 Returns: `string` - returns key of the last item in the collection

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `key` | string | `` | The new item key | 
 | `item` | object | `` | The new item context object value | 

 `validate(info)` 

Validates internal data consistensy of the structure

 Returns: `boolean` - returns true if it pass validation


## <a name="primitives.common.pile" id="primitives.common.pile">pile</a>
Creates pile structure used to sort and stack segments on top of each other so they occupy minimum number of rows.

 `primitives.common.pile` 

### Constructor

 `pile()` 

Creates pile structure used to sort and stack segments on top of each other so they occupy minimum number of rows.

 Returns: `pile` - returns pile structure


### Functions

 `add(from, to, context)` 

Adds new segment to pile object.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `from` | number | `` | Left margin of segment. | 
 | `to` | number | `` | Right margin of segment. | 
 | `context` | object | `` | Any reference to user object. It is returned as parameter in callback function of resolve method. | 

 `resolve(thisArg, onItem)` 

Sorts and stack segments on top of each other so they occupy minimum number of rows.

 Returns: `number` - number of stacked rows in pile.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thisArg` | objct | `` | A context object of the callback function invocation. | 
 | `onItem` | onPileItemCallback | `` | Callback function for setting segments offsets in the pile. | 
**Callbacks**

 `onPileItemCallback(from, to, context, offset)` 

Callback function or iterating result offsets of the pile items in the stack.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `from` | number | `` | The left margin of the segment | 
 | `to` | number | `` | The right margin of the segment | 
 | `context` | object | `` | The context of the pile item | 
 | `offset` | number | `` | Index of the pile item in the stack | 

## <a name="primitives.common.QuadTree" id="primitives.common.QuadTree">QuadTree</a>
Creates Quad Tree data structure. It distributes points into equal quadrants. So it is equivalent to 2 dimensional binary search tree.

 `primitives.common.QuadTree` 

### Constructor

 `QuadTree(minimalSize)` 

Creates Quad Tree data structure. It distributes points into equal quadrants. So it is equivalent to 2 dimensional binary search tree.

 Returns: `QuadTree` - returns quad tree data structure.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `minimalSize` | number | `` | Defines minimal size of the quadrant. This protects structure against unnecessary depth. | 

### Functions

 `addPoint(point)` 

Adds point

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `point` | Point | `` | Point | 

 `getPositions(selection)` 

Returns collection of quadrands created in the data structure Quadrants exists only when elements exists in them. This method is used for visual debugging of the structure.

 Returns: `Rect[]` - returns collection of available quadrants. quadrants containing points within selection area have context.highlight property set to true.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `selection` | React | `` | Rectangular test area to highlight quadrants | 

 `loopArea(thisArg, rect, onItem)` 

Loops rectangular area of quad tree structure

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thisArg` | object | `` | The callback function invocation context | 
 | `rect` | Rect | `` | Rectangular search area | 
 | `onItem` | onQuadTreePointCallback | `` | Callback function to call for every point within the search area | 
**Callbacks**

 `onQuadTreePointCallback(point)` 

Callback function for iteration of points

 Returns: `boolean` - returns true to break iteration process.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `point` | Point | `` | Rectangle | 

 `validate()` 

Validates internal data consistency of quad tree data structure

 Returns: `boolean` - returns true if structure pass validation


## <a name="primitives.common.RMQ" id="primitives.common.RMQ">RMQ</a>
Creates range minimum query structure

 `primitives.common.RMQ` 

### Constructor

 `RMQ(items)` 

Creates range minimum query structure

 Returns: `rmq` - returns range minimum query structure

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `items` | number[] | `` | Collection of numbers | 

### Functions

 `getRangeMinimum(from, to)` 

Return minimum value for the given range

 Returns: `number` - returns minimum value in the range

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `from` | number | `` | The left index of the range | 
 | `to` | number | `` | The right index of the range | 

 `getRangeMinimumIndex(from, to)` 

Returns index of minimum item for the given range of items

 Returns: `number` - returns index of the minimum item

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `from` | number | `` | The left margin index | 
 | `to` | number | `` | The right margin index | 

## <a name="primitives.common.SortedList" id="primitives.common.SortedList">SortedList</a>
Creates self-balancing binary search tree structure.

 `primitives.common.SortedList` 

### Constructor

 `SortedList()` 

Creates self-balancing binary search tree structure.

 Returns: `SortedList` - returns sorted list collection.


### Functions

 `add(value, context, thisArg, onDuplicate)` 

Adds value to sorted list collection

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `value` | number | `` | The value | 
 | `context` | object | `` | The value context object | 
 | `thisArg` | object | `` | The callback function invocation context | 
 | `onDuplicate` | onSortedListDuplicateCallback | `` | Callback function for duplicates values notification | 
**Callbacks**

 `onSortedListDuplicateCallback(context)` 

Callback function to notify about duplicate values

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `context` | objct | `` | The context object of the duplicate value | 

 `loopBackward(thisArg, fromValue, onItem)` 

Loops sorted list values backward

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thisArg` | object | `` | The callback function invocation context | 
 | `fromValue` | number | `` | The start value to loop items of sorted list | 
 | `onItem` | onSortedListItemCallback | `` | Callback function to iterate over sorted list values | 
**Callbacks**

 `onSortedListItemCallback(value, context)` 

Callback function for iterating values of the sorted list

 Returns: `boolean` - returns true to break loop operation

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `value` | number | `` | The value | 
 | `context` | object | `` | The value context object | 

 `loopForward(thisArg, fromValue, onItem)` 

Loops sorted list values

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thisArg` | object | `` | The callback function invocation context | 
 | `fromValue` | number | `` | The start value to loop items of sorted list | 
 | `onItem` | onSortedListItemCallback | `` | Callback function to iterate over sorted list values | 
**Callbacks**

 `onSortedListItemCallback(value, context)` 

Callback function for iterating values of the sorted list

 Returns: `boolean` - returns true to break loop operation

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `value` | number | `` | The value | 
 | `context` | object | `` | The value context object | 

 `nextContext(fromValue)` 

Returns context object of the next value following the given one

 Returns: `object` - returns context object of the first value in sorted list greater than the start value.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `fromValue` | number | `` | The value to start search from | 

 `previousContext(fromValue)` 

Returns context object of the previous value preceding the given one

 Returns: `object` - returns context object of the first value in sorted list less than the start value.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `fromValue` | number | `` | The value to start search from | 

 `remove(value)` 

Removes value from the sorted list

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `value` | number | `` | The removed value | 

 `validate()` 

Validate internal data consistency of the self-balancing binary search tree structure

 Returns: `boolean` - returns true if structure pass validation


## <a name="primitives.common.SpatialIndex" id="primitives.common.SpatialIndex">SpatialIndex</a>
Create spatial index structure. It uses collection of sizes to distribute rectangles into buckets of similar size elements. Elements of the same bucket are aproximated to points. The search of rectangles is transformed to search of points within given range plus offset for maximum linear rectangle size.

 `primitives.common.SpatialIndex` 

### Constructor

 `SpatialIndex()` 

Create spatial index structure. It uses collection of sizes to distribute rectangles into buckets of similar size elements. Elements of the same bucket are aproximated to points. The search of rectangles is transformed to search of points within given range plus offset for maximum linear rectangle size.

 Returns: `SpatialIndex` - returns spacial index data structure.


### Functions

 `addRect(rect)` 

Adds rectangle to spacial index

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `rect` | Rect | `` | Rectangle | 

## <a name="primitives.common.tree" id="primitives.common.tree">tree</a>
Creates tree structure

 `primitives.common.tree` 

### Constructor

 `tree(source)` 

Creates tree structure

 Returns: `tree` - returns new tree structure

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `source` | tree | `` | A source tree structure to clone properties from | 

### Constants
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `BREAK` | number | `1` | B R E A K | 
 | `SKIP` | number | `2` | S K I P | 

### Functions

 `add(parentid, nodeid, node, position)` 

Adds new tree item

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `parentid` | string | `` | Parent id | 
 | `nodeid` | string | `` | New node id | 
 | `node` | object | `` | Context object of the new node | 
 | `position` | number | `` | Position of the new node in the collection of children | 

 `adopt(parentid, nodeid)` 

Adds existing node to the children of the parent node

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `parentid` | string | `` | Parent Node id | 
 | `nodeid` | string | `` | Node id | 

 `arrangeChildren(nodeid, children)` 

Orders children of the given node

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `nodeid` | string | `` | The node id of the parent node which children should be ordered in the tree structure | 
 | `children` | string[] | `` | Collection of ordered children | 

 `clone()` 

Clones tree structure

 Returns: `tree` - returns clone of the tree


 `countChildren(nodeid)` 

Returns number of children

 Returns: `number` - returns number of child nodes

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `nodeid` | string | `` | Node id | 

 `countSiblings(nodeid)` 

Returns number of siblings

 Returns: `number` - returns number of siblings

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `nodeid` | string | `` | Node id | 

 `getChild(parentid, index)` 

Returns child node by index in the children's collection

 Returns: `object` - returns child node

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `nodeid` | string | `` | Node id | 
 | `index` | number | `` | Child index | 

 `hasChildren(nodeid)` 

Returns true if node has children

 Returns: `boolean` - returns true if node has children

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `nodeid` | string | `` | Node id | 

 `hasNodes()` 

Return true if structure has nodes

 Returns: `boolean` - returns true if structure has nodes


 `indexOf(nodeid)` 

Returns index of the node in the children's collection

 Returns: `number` - returns node index

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `nodeid` | string | `` | Node id | 

 `insert(nodeid, bundleid, bundle)` 

Inserts bundle node into the tree structure. The new budnle node becomes only child node of the parent node. All imediate children of the parent node become children of the inserted bundle node.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `nodeid` | string | `` | Parent node id | 
 | `bundleid` | string | `` | New bundle node id | 
 | `bundle` | object | `` | Context object of the bundle node | 

 `loop(thisArg, onItem)` 

Loops through nodes of tree struture

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thisArg` | Object | `` | The callback function invocation context | 
 | `onItem` | onTreeItemCallback | `` | Callback function to call for every tree node | 
**Callbacks**

 `onTreeItemCallback(itemid, item)` 

Callback for iterating tree nodes

 Returns: `boolean` - returns true to break the loop

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `itemid` | string | `` | The node id | 
 | `item` | object | `` | The node | 

 `loopChildren(thisArg, nodeid, onItem)` 

Loops immediate children of the given node. Breaks iteration if callback function returns true.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thisArg` | Object | `` | The callback function invocation context | 
 | `nodeid` | string | `` | The parent node id to loop children of | 
 | `onItem` | onTreeChildItemCallback | `` | Callback function to call for every child node | 
**Callbacks**

 `onTreeChildItemCallback(nodeid, node, index, lastIndex)` 

Callback function to loop through children of the given node

 Returns: `boolean` - returns true to break the iteration of nodes and exit.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `nodeid` | string | `` | Child node id | 
 | `node` | object | `` | Context object of the child node | 
 | `index` | number | `` | Index of the child node | 
 | `lastIndex` | number | `` | Index of the last child | 

 `loopChildrenRange(thisArg, nodeid, fromIndex, toIndex, onItem)` 

Loops range of immediate children of the given node. Breaks iteration if callback function returns true.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thisArg` | Object | `` | The callback function invocation context | 
 | `nodeid` | string | `` | The parent node id to loop children of | 
 | `fromIndex` | number | `` | Start index of iteration | 
 | `toIndex` | number | `` | End index of iteration | 
 | `onItem` | onTreeNodeWithIndexItemCallback | `` | Callback function to call for every child node | 
**Callbacks**

 `onTreeNodeWithIndexItemCallback(nodeid, node, index)` 

Callback function to loop theough range of children for the given node

 Returns: `boolean` - returns true to break the iteration of nodes and exit.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `nodeid` | string | `` | Child node id | 
 | `node` | object | `` | Context object of the child node | 
 | `index` | number | `` | Index of the child node | 

 `loopChildrenReversed(thisArg, nodeid, onItem)` 

Loops immediate children of the given node in reversed order. Breaks iteration if callback function returns true.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thisArg` | Object | `` | The callback function invocation context | 
 | `nodeid` | string | `` | The parent node id to loop children of | 
 | `onItem` | onTreeChildItemCallback | `` | Callback function to call for every child node | 
**Callbacks**

 `onTreeChildItemCallback(nodeid, node, index, lastIndex)` 

Callback function to loop through children of the given node

 Returns: `boolean` - returns true to break the iteration of nodes and exit.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `nodeid` | string | `` | Child node id | 
 | `node` | object | `` | Context object of the child node | 
 | `index` | number | `` | Index of the child node | 
 | `lastIndex` | number | `` | Index of the last child | 

 `loopEulerWalk(thisArg, onItem)` 

Loops tree nodes in "Euler Walk" order

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thisArg` | Object | `` | The callback function invocation context | 
 | `onItem` | onItemEulerWalkCallback | `` | Callback function to call for every node | 
**Callbacks**

 `onItemEulerWalkCallback(nodeid, node, level)` 

Callback for iterating nodes in euler walk order

 Returns: `boolean` - returns true to break the iteration of nodes and exit.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `nodeid` | string | `` | The node id | 
 | `node` | object | `` | Context object of the node | 
 | `level` | number | `` | The node's level | 

 `loopLevels(thisArg, arg0, arg1)` 

Loops through child nodes of the tree struture level by level

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thisArg` | Object | `` | The callback function invocation context | 
 | `arg0` | string | `` | The node id to start children traversing | 
 | `arg1` | onTreeItemWithLevelCallback | `` | Callback function to call for every child node | 
**Callbacks**

 `onTreeItemWithLevelCallback(nodeid, node, levelIndex)` 

Callback for iterating the tree nodes level by level

 Returns: `number` - returns break to break the loop and exit. returns skip to skip node's branch traversing.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `nodeid` | string | `` | The node id | 
 | `node` | object | `` | The node context object | 
 | `levelIndex` | number | `` | The node level index | 

 `loopNeighbours(thisArg, itemid, distance, onItem)` 

Loops through the node neighbours of the tree struture level by level

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thisArg` | Object | `` | The callback function invocation context | 
 | `itemid` | string | `` | The node id to start traversing neighbour nodes | 
 | `distance` | number | `` | Stop iteration of neighbours when distance exceeds the given value | 
 | `onItem` | onTreeItemNeighbourCallback | `` | A callback function to call for every neighbour node | 
**Callbacks**

 `onTreeItemNeighbourCallback(itemid, item, distance)` 

Callback for iterating tree node neighbours level by level

 Returns: `number` - returns true to skip further neighbous traversing.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `itemid` | string | `` | The node id | 
 | `item` | object | `` | The node | 
 | `distance` | number | `` | The neigbour node distance from the start node | 

 `loopParents(thisArg, nodeid, onItem, includingStartItem)` 

Loops parents up to the root of the hierarchy starting with the given node. Breaks iteration if callback function returns true.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thisArg` | Object | `` | The callback function invocation context | 
 | `nodeid` | string | `` | The node id to start iteration from | 
 | `onItem` | onTreeItemCallback | `` | Callback function to call for every parent node | 
 | `includingStartItem` | boolean | `` | If true the first call to callback function is made with start node id | 
**Callbacks**

 `onTreeItemCallback(itemid, item)` 

Callback for iterating tree nodes

 Returns: `boolean` - returns true to break the loop

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `itemid` | string | `` | The node id | 
 | `item` | object | `` | The node | 

 `loopPostOrder(thisArg, onItem)` 

Traverse tree structure in post order. Children first - parent last

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thisArg` | Object | `` | The callback function invocation context | 
 | `onItem` | onTreeItemWithParentCallback | `` | Callback function to call for every node | 
**Callbacks**

 `onTreeItemWithParentCallback(nodeid, node, parentid, parent)` 

Callback for iterating nodes and providing parent in parameters

 Returns: `number` - returns break to break the loop and exit. returns skip to skip node's branch traversing.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `nodeid` | string | `` | The node id | 
 | `node` | object | `` | The node context object | 
 | `parentid` | string | `` | The parent node id | 
 | `parent` | object | `` | The parent node context object | 

 `loopPreOrder(thisArg, onItem)` 

Traverse tree structure in pre order. Parent first - children next

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thisArg` | Object | `` | The callback function invocation context | 
 | `onItem` | onTreeItemWithParentCallback | `` | A callback function to call for every node | 
**Callbacks**

 `onTreeItemWithParentCallback(nodeid, node, parentid, parent)` 

Callback for iterating nodes and providing parent in parameters

 Returns: `number` - returns break to break the loop and exit. returns skip to skip node's branch traversing.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `nodeid` | string | `` | The node id | 
 | `node` | object | `` | The node context object | 
 | `parentid` | string | `` | The parent node id | 
 | `parent` | object | `` | The parent node context object | 

 `moveChildren(fromNodeid, toNodeId)` 

Moves children form one node to another.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `fromNodeid` | string | `` | Source node node id | 
 | `toNodeId` | string | `` | Destination node id | 

 `node(nodeid)` 

Returns context obect

 Returns: `object` - context object of the node

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `nodeid` | string | `` | Node id | 

 `parent(nodeid)` 

Returns context object of the parent node

 Returns: `object` - returns context object of the  parent node

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `nodeid` | string | `` | Node id | 

 `parentid(nodeid)` 

Returns parent node id

 Returns: `string` - returns parent node id

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `nodeid` | string | `` | Node id | 

 `validate()` 

Validates internal data integrity of the structure

 Returns: `boolean` - returns true if structure pass validation


 `zipUp(thisArg, firstNodeId, secondNodeid, onZip)` 

Iterates hierarchy nodes by pairs starting with given pair of start and second nodes and up to the root of the hierarchy. Breaks iteration when callback function returns true.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thisArg` | Object | `` | The callback function invocation context | 
 | `firstNodeId` | string | `` | The first node to start iteration | 
 | `secondNodeid` | string | `` | The second node to start iteration | 
 | `onZip` | onZipUpPairCallback | `` | Callback function to call for every pair of nodes on the way up in the tree structure | 
**Callbacks**

 `onZipUpPairCallback(firstNodeId, firstParentId, secondNodeid, secondParentId)` 

Callback function to return pairs of nodes

 Returns: `boolean` - returns true to break the iteration of nodes and exit.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `firstNodeId` | string | `` | First node id | 
 | `firstParentId` | string | `` | Parent id of the first node | 
 | `secondNodeid` | string | `` | Second node id | 
 | `secondParentId` | string | `` | Parent id of the second node | 

## <a name="primitives.common.TreeLevels" id="primitives.common.TreeLevels">TreeLevels</a>
Creates Tree Levels structure. It is diagraming specific auxiliary structure that keeps tree nodes order level by level.

 `primitives.common.TreeLevels` 

### Constructor

 `TreeLevels(source)` 

Creates Tree Levels structure. It is diagraming specific auxiliary structure that keeps tree nodes order level by level.

 Returns: `TreeLevels` - returns tree levels structure.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `source` | TreeLevels | `undefined` | Optional source object to clone content from into the new instance of the structure. | 

### Functions

 `addItem(levelIndex, itemid, context)` 

Adds element

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `levelIndex` | number | `` | Level index | 
 | `itemid` | string | `` | New element id | 
 | `context` | object | `` | Context object | 

 `addLevel(level, context)` 

Adds new level. Structure keeps levels sorted by their indexes. The level index can be positive and negative as well. Structure auto expands collection of levels in both directions and keeps them ordered.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `level` | number | `` | New level index | 
 | `context` | object | `` | Context object | 

 `binarySearch(thisArg, levelIndex, onGetDistance)` 

Searchs element at level using binary search

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thisArg` | Object | `` | The callback function invocation context | 
 | `levelIndex` | number | `` | Level index to search element at | 
 | `onGetDistance` | onTreeLevelDistanceCallback | `` | A callback function to measure distance for element | 
**Callbacks**

 `onTreeLevelDistanceCallback(itemid, item)` 

Callback for finding distance for element

 Returns: `number` - returns distance for the element

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `itemid` | number | `` | Element id | 
 | `item` | object | `` | Conext object | 

 `clone()` 

Clones tree levels structure.

 Returns: `TreeLevels` - returns cloned copy of the structure


 `createLevel(index)` 

Creates new level

 Returns: `object` - returns new level empty context object

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `index` | index | `` | New level index | 

 `getEndLevelIndex(itemid)` 

Returns element's end level index in the structure. Element may occupy multiple levels of the tree levels structure.

 Returns: `number` - returns end level index

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `itemid` | string | `` | Element id | 

 `getItemAtPosition(levelIndex, position)` 

Gets element at position

 Returns: `number` - returns element id

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `levelIndex` | number | `` | Level index | 
 | `position` | number | `` | Item position | 

 `getItemContext(itemid)` 

Gets element context object

 Returns: `object` - returns context object of the element

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `itemid` | string | `` | Element id | 

 `getItemPosition(itemid, level)` 

Gets element position at level

 Returns: `number` - returns position of the element

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `itemid` | string | `` | Element id | 
 | `level` | number | `` | Level index | 

 `getLevelLength(levelIndex)` 

Gets number of elements at level

 Returns: `number` - returns number of elements at the level

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `levelIndex` | number | `` | Level index | 

 `getNextItem(itemid, itemLevel)` 

Gets next element

 Returns: `number` - returns next element id

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `itemid` | string | `` | Element id | 
 | `itemLevel` | number | `` | Level index | 

 `getPrevItem(itemid, itemLevel)` 

Gets previous element

 Returns: `number` - returns previous element id

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `itemid` | string | `` | Element id | 
 | `itemLevel` | number | `` | Level index | 

 `getStartLevelIndex(itemid)` 

Returns element's start level index in the structure. Element may occupy multiple levels of the tree levels structure.

 Returns: `number` - returns start level index

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `itemid` | string | `` | The element id | 

 `hasItem(itemid)` 

Checks if struture contains element

 Returns: `boolean` - returns true if structure contains given element id

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `itemid` | string | `` | Element id | 

 `hasLevel(levelIndex)` 

Checks if struture contains level

 Returns: `boolean` - returns true if structure contains given level index

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `levelIndex` | number | `` | Level index | 

 `isEmpty()` 

Chckes if structure has elements.

 Returns: `boolean` - returns true if structure has elements.


 `length()` 

Number of levels

 Returns: `number` - returns number of levels in structure.


 `loopFromItem(thisArg, itemid, isLeft, onItem, level)` 

Loops level elements starting with the given item

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thisArg` | Object | `` | The callback function invocation context | 
 | `itemid` | string | `` | Start element id | 
 | `isLeft` | boolean | `` | If true thenmethod loops leftward | 
 | `onItem` | onTreeLevelMergedItemCallback | `` | Callback function to call for every item | 
 | `level` | number | `` | Level index | 
**Callbacks**

 `onTreeLevelMergedItemCallback(itemid, item)` 

Callback for iterating items

 Returns: `number` - returns true to break iteration process.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `itemid` | number | `` | Element id | 
 | `item` | object | `` | Conext object | 

 `loopItems(thisArg, onItem)` 

Loops elements level by level

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thisArg` | Object | `` | The callback function invocation context | 
 | `onItem` | onTreeLevelsItemCallback | `` | A callback function to call for every item | 
**Callbacks**

 `onTreeLevelsItemCallback(itemid, item, position, levelIndex, level)` 

Callback function for iteration of elements level by level

 Returns: `boolean` - returns true to break iteration process.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `itemid` | string | `` | Element id | 
 | `item` | object | `` | Element context object | 
 | `position` | number | `` | Position of the element at level | 
 | `levelIndex` | number | `` | Level index | 
 | `level` | object | `` | Level context object | 

 `loopLevelItems(thisArg, levelIndex, onItem)` 

Loops level elements

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thisArg` | Object | `` | The callback function invocation context | 
 | `levelIndex` | number | `` | Level index | 
 | `onItem` | onTreeLevelItemCallback | `` | A callback function to call for every item | 
**Callbacks**

 `onTreeLevelItemCallback(itemid, item, position)` 

Callback function for iteration of level elements

 Returns: `boolean` - returns true to break iteration process.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `itemid` | string | `` | Element id | 
 | `item` | object | `` | Context object of the element | 
 | `position` | number | `` | Position of the element at level | 

 `loopLevels(thisArg, onItem)` 

Loops levels

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thisArg` | Object | `` | The callback function invocation context | 
 | `onItem` | onTreeLevelCallback | `` | A callback function to call for every level | 
**Callbacks**

 `onTreeLevelCallback(levelIndex, level)` 

Callback function for iteration of levels

 Returns: `boolean` - returns true to break iteration process.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `levelIndex` | number | `` | Level index | 
 | `level` | object | `` | Context object | 

 `loopLevelsFromItem(thisArg, itemid, isBelow, onItem)` 

Loops levels starting with the given element end level. Element may occupy multiple levels, so this method starts level iteration from next level after or before item levels.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thisArg` | Object | `` | The callback function invocation context | 
 | `itemid` | string | `` | Element id | 
 | `isBelow` | boolean | `` | If true then method loops levels backward | 
 | `onItem` | onTreeLevelCallback | `` | Callback function to call for every level | 
**Callbacks**

 `onTreeLevelCallback(levelIndex, level)` 

Callback function for iteration of levels

 Returns: `boolean` - returns true to break iteration process.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `levelIndex` | number | `` | Level index | 
 | `level` | object | `` | Context object | 

 `loopLevelsReversed(thisArg, onItem)` 

Loops levels in reversed order

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thisArg` | Object | `` | The callback function invocation context | 
 | `onItem` | onTreeLevelCallback | `` | A callback function to call for every level | 
**Callbacks**

 `onTreeLevelCallback(levelIndex, level)` 

Callback function for iteration of levels

 Returns: `boolean` - returns true to break iteration process.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `levelIndex` | number | `` | Level index | 
 | `level` | object | `` | Context object | 

 `loopMerged(thisArg, getItemWeight, onItem)` 

Loops merged elements of tree level structure by weight

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `thisArg` | Object | `` | The callback function invocation context | 
 | `getItemWeight` | onTreeLevelItemWeightCallback | `` | Callback to measure weight of the element | 
 | `onItem` | onTreeLevelMergedItemCallback | `` | Callback to iterate merged elements | 
**Callbacks**

 `onTreeLevelItemWeightCallback(itemid, item)` 

Callback for finding weight of element

 Returns: `number` - returns distance for the element

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `itemid` | number | `` | Element id | 
 | `item` | object | `` | Conext object | 

 `onTreeLevelMergedItemCallback(itemid, item)` 

Callback for iterating items

 Returns: `number` - returns true to break iteration process.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `itemid` | number | `` | Element id | 
 | `item` | object | `` | Conext object | 
