# Algorithms
## family
Creates a family object

 <code>primitives.common.family</code> 

### Constructor

 <code>family(source)</code> 

Creates a family object

 Returns: <code>family</code> - returns new instance of family structure

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>source</code> | family | <code>undefined</code> | Reference to optional family object to clone properties from | 

### Constants
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>BREAK</code> | number | <code>1</code> | B R E A K | 
 | <code>SKIP</code> | number | <code>2</code> | S K I P | 

### Functions

 <code>add(parents, nodeid, node)</code> 

Adds new family member

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>parents</code> | string[] | <code></code> | A collection of parents ids | 
 | <code>nodeid</code> | string | <code></code> | An id of the new node | 
 | <code>node</code> | object | <code></code> | A reference to the new node | 

 <code>adopt(parents, nodeid)</code> 

Makes node to be a child of every parent in the collection of parents

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>parents</code> | string[] | <code></code> | A collection of parents ids | 
 | <code>nodeid</code> | string | <code></code> | An id of the new node | 

 <code>bundleChildren(parent, children, bundleItemId, bundleItem)</code> 

Adds extra budnle item in between parent and its children. The parent node becomes parent of the bundle node, and bundle becomes parent of the children. Existing parent child relations are removed.

 Returns: <code>boolean</code> - returns true if nodes bundle is valid

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>parent</code> | string | <code></code> | The parent node id | 
 | <code>children</code> | string[] | <code></code> | The collection of child nodes ids | 
 | <code>bundleItemId</code> | string | <code></code> | The bundle node id | 
 | <code>bundleItem</code> | object | <code></code> | The bundle item context object | 

 <code>bundleParents(child, parents, bundleItemId, bundleItem)</code> 

Adds extra budnle item in between child node and its parents. The child node becomes child of the bundle node, and bundle becomes child of the parents. Existing parent child relations are removed.

 Returns: <code>boolean</code> - returns true if the bundle is valid

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>child</code> | string | <code></code> | The parent node id | 
 | <code>parents</code> | string[] | <code></code> | The collection of child nodes ids | 
 | <code>bundleItemId</code> | string | <code></code> | The bundle node id | 
 | <code>bundleItem</code> | object | <code></code> | The bundle item context object | 

 <code>clone()</code> 

Clones family structure.

 Returns: <code>family</code> - returns copy of the family structure.


 <code>countChildren(parent)</code> 

Returns number of children

 Returns: <code>number</code> - number of children

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>parent</code> | string | <code></code> | The parent node id | 

 <code>countParents(child)</code> 

Returns number of parents

 Returns: <code>number</code> - number of parents

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>child</code> | string | <code></code> | The child node id | 

 <code>eliminateManyToMany(onNewBundleItem)</code> 

Eliminates many to many relations in family structure It is needed to simplify layout process of the diagram

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>onNewBundleItem</code> | onNewFamilyNodeCallback | <code></code> | Callback function for creation of new bundle node | 
**Callbacks**

 <code>onNewFamilyNodeCallback()</code> 

Callback function for cretion of new family nodes

 Returns: <code>object</code> - returns new family node.


 <code>findLargestRoot()</code> 

Finds root node having largest number of nodes in its hierachy

 Returns: <code>string</code> - returns largest sub-hierarchy root node id.


 <code>firstChild(parent)</code> 

First available child

 Returns: <code>string</code> - returns first available child id or null.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>parent</code> | string | <code></code> | The parent node id | 

 <code>firstParent(child)</code> 

First available parent

 Returns: <code>string</code> - returns first available parent id or null.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>child</code> | string | <code></code> | The child node id | 

 <code>getFamilyWithoutGrandParentsRelations()</code> 

Eliminates direct relations between grand parent nodes.

 Returns: <code>family</code> - returns family structure without direct grand parent relations.


 <code>getGraph()</code> 

Creates graph structure out of the family structure.

 Returns: <code>graph</code> - returns graph structure of the family.


 <code>getPlanarFamily(treeLevels)</code> 

Eliminates crossing parent child relations between nodes based of nodes order in treeLevels structure.

 Returns: <code>family</code> - returns planar family structure.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>treeLevels</code> | treeLevels | <code></code> | Tree levels structure keeps orders of nodes level by level. | 

 <code>hasCommonChild(parents)</code> 

Checks whether parents share a child node. Common child should belong only to the given collection of parents, if child's parents don't match given collection of parents, it is not considered as common child.

 Returns: <code>boolean</code> - returns true if common child exist.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>parents</code> | string[] | <code></code> | Collection of parents | 

 <code>hasLoops()</code> 

Checks if family structure has loops in references.

 Returns: <code>boolean</code> - returns true if family structure contains loops in references.


 <code>hasNodes()</code> 

Returns true if structure has nodes.

 Returns: <code>boolean</code> - returns true if family structure has nodes


 <code>loop(thisArg, onItem)</code> 

Loops through nodes of family struture

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>thisArg</code> | Object | <code></code> | The callback function invocation context | 
 | <code>onItem</code> | onFamilyItemCallback | <code></code> | A callback function to call for every family node | 
**Callbacks**

 <code>onFamilyItemCallback(itemid, item)</code> 

Callback for iterating family nodes

 Returns: <code>boolean</code> - returns true to break the loop

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>itemid</code> | string | <code></code> | The node id | 
 | <code>item</code> | object | <code></code> | The node | 

 <code>loopChildren(thisArg, nodeid, onItem)</code> 

Loops through child nodes of family struture level by level

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>thisArg</code> | Object | <code></code> | The callback function invocation context | 
 | <code>nodeid</code> | string | <code></code> | The node id to start children traversing | 
 | <code>onItem</code> | onFamilyItemWithLevelCallback | <code></code> | A callback function to call for every child node | 
**Callbacks**

 <code>onFamilyItemWithLevelCallback(itemid, item, levelIndex)</code> 

Callback for iterating family nodes level by level

 Returns: <code>number</code> - returns break to break the loop and exit. returns skip to skip node's branch traversing.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>itemid</code> | string | <code></code> | The node id | 
 | <code>item</code> | object | <code></code> | The node | 
 | <code>levelIndex</code> | number | <code></code> | The node level index | 

 <code>loopLevels(thisArg, parentAligned, onItem)</code> 

Loops through nodes of family struture level by level. This function aligns nodes top or bottom.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>thisArg</code> | Object | <code></code> | The callback function invocation context | 
 | <code>parentAligned</code> | boolean | <code></code> | True if nodes should be placed at the next level after their parents level, otherwise nodes placed at levels close to their children. | 
 | <code>onItem</code> | onFamilyItemWithLevelCallback | <code></code> | A callback function to call for every node | 
**Callbacks**

 <code>onFamilyItemWithLevelCallback(itemid, item, levelIndex)</code> 

Callback for iterating family nodes level by level

 Returns: <code>number</code> - returns break to break the loop and exit. returns skip to skip node's branch traversing.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>itemid</code> | string | <code></code> | The node id | 
 | <code>item</code> | object | <code></code> | The node | 
 | <code>levelIndex</code> | number | <code></code> | The node level index | 

 <code>loopNeighbours(thisArg, itemid, onItem)</code> 

Loops through the node neighbours of the family struture level by level

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>thisArg</code> | Object | <code></code> | The callback function invocation context | 
 | <code>itemid</code> | string | <code></code> | The node id to start traversing neighbour nodes | 
 | <code>onItem</code> | onFamilyItemNeighbourCallback | <code></code> | A callback function to call for every neighbour node | 
**Callbacks**

 <code>onFamilyItemNeighbourCallback(itemid, item, levelIndex)</code> 

Callback for iterating family node neighbours level by level

 Returns: <code>number</code> - returns true to skip further neighbous traversing.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>itemid</code> | string | <code></code> | The node id | 
 | <code>item</code> | object | <code></code> | The node | 
 | <code>levelIndex</code> | number | <code></code> | The neigbour node distance from the start node | 

 <code>loopParents(thisArg, nodeid, onItem)</code> 

Loops through parent nodes of family struture level by level

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>thisArg</code> | Object | <code></code> | The callback function invocation context | 
 | <code>nodeid</code> | string | <code></code> | The node id to start parents traversing | 
 | <code>onItem</code> | onFamilyItemWithLevelCallback | <code></code> | A callback function to call for every parent node | 
**Callbacks**

 <code>onFamilyItemWithLevelCallback(itemid, item, levelIndex)</code> 

Callback for iterating family nodes level by level

 Returns: <code>number</code> - returns break to break the loop and exit. returns skip to skip node's branch traversing.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>itemid</code> | string | <code></code> | The node id | 
 | <code>item</code> | object | <code></code> | The node | 
 | <code>levelIndex</code> | number | <code></code> | The node level index | 

 <code>loopRoots(thisArg, onItem)</code> 

Loops root nodes of family structure.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>thisArg</code> | Object | <code></code> | The callback function invocation context | 
 | <code>onItem</code> | onFamilyItemCallback | <code></code> | A callback function to call for every family root node | 
**Callbacks**

 <code>onFamilyItemCallback(itemid, item)</code> 

Callback for iterating family nodes

 Returns: <code>boolean</code> - returns true to break the loop

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>itemid</code> | string | <code></code> | The node id | 
 | <code>item</code> | object | <code></code> | The node | 

 <code>loopTopo(thisArg, onItem)</code> 

Loops through topologically sorted nodes of family struture

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>thisArg</code> | Object | <code></code> | The callback function invocation context | 
 | <code>onItem</code> | onFamilyTopoCallback | <code></code> | A callback function to call for every node | 
**Callbacks**

 <code>onFamilyTopoCallback(itemid, item, position)</code> 

Callback for iterating family nodes in topological sort order

 Returns: <code>boolean</code> - returns true to break the loop and exit.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>itemid</code> | string | <code></code> | The node id | 
 | <code>item</code> | object | <code></code> | The node | 
 | <code>position</code> | number | <code></code> | The node position in the sequence | 

 <code>loopTopoReversed(thisArg, onItem)</code> 

Loops through reversed order topologically sorted nodes of family struture

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>thisArg</code> | Object | <code></code> | The callback function invocation context | 
 | <code>onItem</code> | onFamilyTopoCallback | <code></code> | A callback function to call for every node | 
**Callbacks**

 <code>onFamilyTopoCallback(itemid, item, position)</code> 

Callback for iterating family nodes in topological sort order

 Returns: <code>boolean</code> - returns true to break the loop and exit.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>itemid</code> | string | <code></code> | The node id | 
 | <code>item</code> | object | <code></code> | The node | 
 | <code>position</code> | number | <code></code> | The node position in the sequence | 

 <code>node(nodeid)</code> 

Returns family node by id

 Returns: <code>object|undefined</code> - a reference to the node or undefined if id does not exists

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>nodeid</code> | string | <code></code> | The id of the node | 

 <code>optimizeReferences(onNewBundleItem)</code> 

Optimizes references between family members. It creates bundles eliminating excessive intersecions between nodes relations.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>onNewBundleItem</code> | onNewFamilyNodeCallback | <code></code> | Callback function to create a new family node context object. | 
**Callbacks**

 <code>onNewFamilyNodeCallback()</code> 

Callback function for cretion of new family nodes

 Returns: <code>object</code> - returns new family node.


 <code>removeNode(nodeid)</code> 

Removes node

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>nodeid</code> | string | <code></code> | The id of the node | 

 <code>removeRelation(fromid, toid)</code> 

Remove parent child relation

 Returns: <code>true</code> - if relation was broken

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>fromid</code> | string | <code></code> | The parent node id | 
 | <code>toid</code> | string | <code></code> | The child node id | 

 <code>validate(info)</code> 

Validates internal data structure consitency of the family.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>info</code> | object | <code></code> | Optional validation object. | 

## FamilyAlignment
Creates family alignment data structure. This structure aligns horizontaly planar family of nodes.

 <code>primitives.common.FamilyAlignment</code> 

### Constructor

 <code>FamilyAlignment(thisArg, family, treeLevels, onItemSize)</code> 

Creates family alignment data structure. This structure aligns horizontaly planar family of nodes.

 Returns: <code>FamilyAlignment</code> - returns family alignment structure

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>thisArg</code> | Object | <code></code> | The callback function invocation context | 
 | <code>family</code> | family | <code></code> | Family data structure | 
 | <code>treeLevels</code> | TreeLevels | <code></code> | Three levels data structure | 
 | <code>onItemSize</code> | onFamilyAlignmentItemSizeCallback | <code></code> | Callback function to measure family node width | 

### Functions

 <code>getOffset(nodeid)</code> 

Returns horizontal node offset from left margin of the family daigram

 Returns: <code>number</code> - node offset

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>nodeid</code> | string | <code></code> | Family node id | 

## FibonacciHeap
Creates Fibonacci Heap structure

 <code>primitives.common.FibonacciHeap</code> 

### Constructor

 <code>FibonacciHeap(isMaximum)</code> 

Creates Fibonacci Heap structure

 Returns: <code>FibonacciHeap</code> - returns new fibonacciheap object

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>isMaximum</code> | boolean | <code></code> | Is maximum heap | 

### Functions

 <code>Result(node)</code> 

undefined


 <code>add(key, priority, item)</code> 

Adds a new item into the heap

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>key</code> | string | <code></code> | A key of the new element | 
 | <code>priority</code> | number | <code></code> | A priority of the new element | 
 | <code>item</code> | object | <code></code> | A context object of the new element | 

 <code>deleteKey(key)</code> 

Deletes heap element by key

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>key</code> | string | <code></code> | The Key | 

 <code>extractRoot()</code> 

Returns heap root element with removal

 Returns: <code>HeapResult</code> - returns root element of the heap


 <code>getPriority(key)</code> 

Gets priority of element by key

 Returns: <code>number</code> - returns priority of the element

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>key</code> | string | <code></code> | The element key | 

 <code>heapRoot()</code> 

Returns heap root element

 Returns: <code>HeapResult</code> - returns root element of the heap


 <code>setPriority(key, priority)</code> 

Sets priority of an element by key

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>key</code> | string | <code></code> | The key of the element | 
 | <code>priority</code> | number | <code></code> | Priority | 

 <code>validate()</code> 

Validates internal structure consistency.

 Returns: <code>boolean</code> - returns true if structure pass data consistency check.


## graph
Creates graph structure

 <code>primitives.common.graph</code> 

### Constructor

 <code>graph()</code> 

Creates graph structure

 Returns: <code>graph</code> - returns graph object


### Functions

 <code>addEdge(from, to, edge)</code> 

Adds edge to the graph

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>from</code> | string | <code></code> | The id of the start node | 
 | <code>to</code> | string | <code></code> | The id of the end node | 
 | <code>edge</code> | object | <code></code> | The edge contextual object | 

 <code>edge(from, to)</code> 

Returns edge context object

 Returns: <code>object</code> - the edge's context object

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>from</code> | string | <code></code> | The edge's from node id | 
 | <code>to</code> | string | <code></code> | The edge's to node id | 

 <code>getMinimumWeightGrowthSequence(thisArg, startNode, onEdgeWeight, onItem)</code> 

Get minimum weight graph growth sequence. The sequence of the traversing order of the graph nodes.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>thisArg</code> | object | <code></code> | The callback function invocation context | 
 | <code>startNode</code> | string | <code>undefined</code> | The optional start node id | 
 | <code>onEdgeWeight</code> | getGraphEdgeWeightCallback | <code></code> | Callback function to get weight of an edge. | 
 | <code>onItem</code> | onNodeCallback | <code></code> | A callback function to be called for every node of the growth sequence | 
**Callbacks**

 <code>getGraphEdgeWeightCallback(edge, fromItem, toItem)</code> 

Callback for finding edge weight

 Returns: <code>number</code> - returns weight of the edge

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>edge</code> | object | <code></code> | The edge context object | 
 | <code>fromItem</code> | string | <code></code> | The edge's start node id | 
 | <code>toItem</code> | string | <code></code> | The edge's end node id | 

 <code>onNodeCallback(to)</code> 

Callback function for iterating graphs nodes

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>to</code> | string | <code></code> | The next neighbouring node id | 

 <code>getShortestPath(thisArg, startNode, endNodes, getWeightFunc, onPathFound)</code> 

Get shortest path between two nodes in graph. The start and the end nodes are supposed to have connection path.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>thisArg</code> | object | <code></code> | The callback function invocation context | 
 | <code>startNode</code> | string | <code></code> | The start node id | 
 | <code>endNodes</code> | string[] | <code></code> | The array of end node ids. | 
 | <code>getWeightFunc</code> | getGraphEdgeWeightCallback | <code></code> | Callback function to get weight of an edge. | 
 | <code>onItem</code> | onNodeCallback | <code></code> | A callback function to be called for every node of the growth sequence | 
 | <code>onPathFound</code> | onPathFoundCallback | <code></code> | A callback function to be called for every end node with the optimal connection path | 
**Callbacks**

 <code>getGraphEdgeWeightCallback(edge, fromItem, toItem)</code> 

Callback for finding edge weight

 Returns: <code>number</code> - returns weight of the edge

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>edge</code> | object | <code></code> | The edge context object | 
 | <code>fromItem</code> | string | <code></code> | The edge's start node id | 
 | <code>toItem</code> | string | <code></code> | The edge's end node id | 

 <code>onNodeCallback(to)</code> 

Callback function for iterating graphs nodes

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>to</code> | string | <code></code> | The next neighbouring node id | 

 <code>onPathFoundCallback(path, to)</code> 

Callback for returning optimal connection path for every end node.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>path</code> | string[] | <code></code> | An array of connection path node ids. | 
 | <code>to</code> | string | <code></code> | The end node id, the connection path is found for. | 

 <code>getSpanningTree(startNode, getWeightFunc)</code> 

Get maximum spanning tree. Graph may have disconnected sub graphs, so start node is nessasary.

 Returns: <code>tree</code> - returns tree structure containing maximum spanning tree of the graph

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>startNode</code> | string | <code></code> | The node to start searching for maximum spanning tree. Graph is not nessasary connected | 
 | <code>getWeightFunc</code> | getGraphEdgeWeightCallback | <code></code> | Callback function to get weight of an edge. | 
**Callbacks**

 <code>getGraphEdgeWeightCallback(edge, fromItem, toItem)</code> 

Callback for finding edge weight

 Returns: <code>number</code> - returns weight of the edge

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>edge</code> | object | <code></code> | The edge context object | 
 | <code>fromItem</code> | string | <code></code> | The edge's start node id | 
 | <code>toItem</code> | string | <code></code> | The edge's end node id | 

 <code>getTotalWeightGrowthSequence(thisArg, onEdgeWeight, onItem)</code> 

Get graph growth sequence. The sequence of graph traversing order.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>thisArg</code> | object | <code></code> | The callback function invocation context | 
 | <code>getWeightFunc</code> | getGraphEdgeWeightCallback | <code></code> | Callback function to get weight of an edge. | 
 | <code>onItem</code> | onNodeCallback | <code></code> | A callback function to be called for every node of the growth sequence | 
**Callbacks**

 <code>getGraphEdgeWeightCallback(edge, fromItem, toItem)</code> 

Callback for finding edge weight

 Returns: <code>number</code> - returns weight of the edge

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>edge</code> | object | <code></code> | The edge context object | 
 | <code>fromItem</code> | string | <code></code> | The edge's start node id | 
 | <code>toItem</code> | string | <code></code> | The edge's end node id | 

 <code>onNodeCallback(to)</code> 

Callback function for iterating graphs nodes

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>to</code> | string | <code></code> | The next neighbouring node id | 

 <code>hasNode(from)</code> 

Returns true if node exists in the graph

 Returns: <code>boolean</code> - returns true if node exists

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>from</code> | string | <code></code> | The node id | 

 <code>loopNodeEdges(thisArg, itemid, onEdge)</code> 

Loop edges of the node

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>thisArg</code> | object | <code></code> | The callback function invocation context | 
 | <code>itemid</code> | string | <code></code> | The node id | 
 | <code>onEdge</code> | onEdgeCallback | <code></code> | A callback function to call for every edge of the node | 
**Callbacks**

 <code>onEdgeCallback(to, edge)</code> 

Callback for iterating edges of the graph's node

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>to</code> | string | <code></code> | The neighbouring node id | 
 | <code>edge</code> | Object | <code></code> | The edge's context object | 

 <code>loopNodes(thisArg, startNode, onItem)</code> 

Loop nodes of the graph

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>thisArg</code> | object | <code></code> | The callback function invocation context | 
 | <code>itemid</code> | string | <code>undefined</code> | The optional start node id. If start node is undefined, function loops graphs node starting from first available node | 
 | <code>onItem</code> | onNodeCallback | <code></code> | A callback function to be called for every neighbouring node | 
**Callbacks**

 <code>onNodeCallback(to)</code> 

Callback function for iterating graphs nodes

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>to</code> | string | <code></code> | The next neighbouring node id | 

## LCA
Creates Lowest Common Ancestor Structure for the given tree

 <code>primitives.common.LCA</code> 

### Constructor

 <code>LCA(tree)</code> 

Creates Lowest Common Ancestor Structure for the given tree

 Returns: <code>LCA</code> - returns lowest common ancestor structure

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>tree</code> | tree | <code></code> | The tree structure | 

### Functions

 <code>getLowestCommonAncestor(from, to)</code> 

Returns lowest common ancestor for the given pair of tree nodes

 Returns: <code>string</code> - returns the lowest common ancestor tree node id

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>from</code> | string | <code></code> | The first tree node id | 
 | <code>to</code> | string | <code></code> | The second tree node id | 

## LinkedHashItems
Creates linked hash list collection.

 <code>primitives.common.LinkedHashItems</code> 

### Constructor

 <code>LinkedHashItems()</code> 

Creates linked hash list collection.

 Returns: <code>LinkedHashItems</code> - returns linked hash list structure


### Functions

 <code>add(key, item)</code> 

Adds new item to collection

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>key</code> | string | <code></code> | The new item key | 
 | <code>item</code> | object | <code></code> | The new item context object value | 

 <code>attach(list)</code> 

Appends one list to another

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>list</code> | LinkedHashItems | <code></code> | A list to append to the end of the current list | 

 <code>empty()</code> 

Empties collection


 <code>endKey()</code> 

Last collection item key

 Returns: <code>string</code> - returns key of the last item in the collection


 <code>insertAfter(afterKey, key, item)</code> 

Inserts new item into the list after the given key

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>afterKey</code> | string | <code></code> | The key that the new element is placed after | 
 | <code>key</code> | string | <code></code> | The new item key | 
 | <code>item</code> | object | <code></code> | The new item context object value | 

 <code>insertBefore(beforeKey, key, item)</code> 

Inserts new item into the list before the given key

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>beforeKey</code> | string | <code></code> | The key that the new element is placed before | 
 | <code>key</code> | string | <code></code> | The new item key | 
 | <code>item</code> | object | <code></code> | The new item context object value | 

 <code>isEmpty()</code> 

Checks if collection is empty

 Returns: <code>boolean</code> - returns true if collection is empty


 <code>item(key)</code> 

Item context object

 Returns: <code>object</code> - returns context object

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>key</code> | string | <code></code> | The item's key | 

 <code>iterate(onItem, startKey, endKey)</code> 

Loops items of the collection

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>onItem</code> | onLinkedHashItemsCallback | <code></code> |  Callback function for iterating collection items | 
 | <code>startKey</code> | string | <code></code> | The key to start iteration from | 
 | <code>endKey</code> | string | <code></code> | The key to end iteration at | 
**Callbacks**

 <code>onLinkedHashItemsCallback(item, key)</code> 

Callback function for iterating list items

 Returns: <code>boolean</code> - returns true to break the iteration process

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>item</code> | object | <code></code> |  The item context object | 
 | <code>key</code> | string | <code></code> | The item key | 

 <code>iterateBack(onItem, startKey, endKey)</code> 

Loops items of the collection backward

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>onItem</code> | onLinkedHashItemsCallback | <code></code> |  Callback function for iterating collection items | 
 | <code>startKey</code> | string | <code></code> | The key to start iteration from | 
 | <code>endKey</code> | string | <code></code> | The key to end iteration at | 
**Callbacks**

 <code>onLinkedHashItemsCallback(item, key)</code> 

Callback function for iterating list items

 Returns: <code>boolean</code> - returns true to break the iteration process

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>item</code> | object | <code></code> |  The item context object | 
 | <code>key</code> | string | <code></code> | The item key | 

 <code>nextKey(key)</code> 

Gets next key

 Returns: <code>string</code> - returns key of the next collection item

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>key</code> | string | <code></code> | The item key | 

 <code>prevKey(key)</code> 

Gets previous key

 Returns: <code>string</code> - returns key of the previous collection item

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>key</code> | string | <code></code> | The item key | 

 <code>remove(key)</code> 

Removes item

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>key</code> | string | <code></code> | The key of the item | 

 <code>startKey()</code> 

First collection item key

 Returns: <code>string</code> - returns the key of the first item in the collection


 <code>toArray()</code> 

Returns a regular javascript array of collection items

 Returns: <code>object[]</code> - returns array containing items of the collection


 <code>unshift(key, item)</code> 

Adds new item to the head of the list

 Returns: <code>string</code> - returns key of the last item in the collection

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>key</code> | string | <code></code> | The new item key | 
 | <code>item</code> | object | <code></code> | The new item context object value | 

 <code>validate(info)</code> 

Validates internal data consistensy of the structure

 Returns: <code>boolean</code> - returns true if it pass validation


## pile
Creates pile structure used to sort and stack segments on top of each other so they occupy minimum number of rows.

 <code>primitives.common.pile</code> 

### Constructor

 <code>pile()</code> 

Creates pile structure used to sort and stack segments on top of each other so they occupy minimum number of rows.

 Returns: <code>pile</code> - returns pile structure


### Functions

 <code>add(from, to, context)</code> 

Adds new segment to pile object.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>from</code> | number | <code></code> | Left margin of segment. | 
 | <code>to</code> | number | <code></code> | Right margin of segment. | 
 | <code>context</code> | object | <code></code> | Any reference to user object. It is returned as parameter in callback function of resolve method. | 

 <code>resolve(thisArg, onItem)</code> 

Sorts and stack segments on top of each other so they occupy minimum number of rows.

 Returns: <code>number</code> - number of stacked rows in pile.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>thisArg</code> | objct | <code></code> | A context object of the callback function invocation. | 
 | <code>onItem</code> | onPileItemCallback | <code></code> | Callback function for setting segments offsets in the pile. | 
**Callbacks**

 <code>onPileItemCallback(from, to, context, offset)</code> 

Callback function or iterating result offsets of the pile items in the stack.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>from</code> | number | <code></code> | The left margin of the segment | 
 | <code>to</code> | number | <code></code> | The right margin of the segment | 
 | <code>context</code> | object | <code></code> | The context of the pile item | 
 | <code>offset</code> | number | <code></code> | Index of the pile item in the stack | 

## QuadTree
Creates Quad Tree data structure. It distributes points into equal quadrants. So it is equivalent to 2 dimensional binary search tree.

 <code>primitives.common.QuadTree</code> 

### Constructor

 <code>QuadTree(minimalSize)</code> 

Creates Quad Tree data structure. It distributes points into equal quadrants. So it is equivalent to 2 dimensional binary search tree.

 Returns: <code>QuadTree</code> - returns quad tree data structure.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>minimalSize</code> | number | <code></code> | Defines minimal size of the quadrant. This protects structure against unnecessary depth. | 

### Functions

 <code>addPoint(point)</code> 

Adds point

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>point</code> | Point | <code></code> | Point | 

 <code>getPositions(selection)</code> 

Returns collection of quadrands created in the data structure Quadrants exists only when elements exists in them. This method is used for visual debugging of the structure.

 Returns: <code>Rect[]</code> - returns collection of available quadrants. quadrants containing points within selection area have context.highlight property set to true.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>selection</code> | React | <code></code> | Rectangular test area to highlight quadrants | 

 <code>loopArea(thisArg, rect, onItem)</code> 

Loops rectangular area of quad tree structure

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>thisArg</code> | object | <code></code> | The callback function invocation context | 
 | <code>rect</code> | Rect | <code></code> | Rectangular search area | 
 | <code>onItem</code> | onQuadTreePointCallback | <code></code> | Callback function to call for every point within the search area | 
**Callbacks**

 <code>onQuadTreePointCallback(point)</code> 

Callback function for iteration of points

 Returns: <code>boolean</code> - returns true to break iteration process.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>point</code> | Point | <code></code> | Rectangle | 

 <code>validate()</code> 

Validates internal data consistency of quad tree data structure

 Returns: <code>boolean</code> - returns true if structure pass validation


## RMQ
Creates range minimum query structure

 <code>primitives.common.RMQ</code> 

### Constructor

 <code>RMQ(items)</code> 

Creates range minimum query structure

 Returns: <code>rmq</code> - returns range minimum query structure

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>items</code> | number[] | <code></code> | Collection of numbers | 

### Functions

 <code>getRangeMinimum(from, to)</code> 

Return minimum value for the given range

 Returns: <code>number</code> - returns minimum value in the range

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>from</code> | number | <code></code> | The left index of the range | 
 | <code>to</code> | number | <code></code> | The right index of the range | 

 <code>getRangeMinimumIndex(from, to)</code> 

Returns index of minimum item for the given range of items

 Returns: <code>number</code> - returns index of the minimum item

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>from</code> | number | <code></code> | The left margin index | 
 | <code>to</code> | number | <code></code> | The right margin index | 

## SortedList
Creates self-balancing binary search tree structure.

 <code>primitives.common.SortedList</code> 

### Constructor

 <code>SortedList()</code> 

Creates self-balancing binary search tree structure.

 Returns: <code>SortedList</code> - returns sorted list collection.


### Functions

 <code>add(value, context, thisArg, onDuplicate)</code> 

Adds value to sorted list collection

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>value</code> | number | <code></code> | The value | 
 | <code>context</code> | object | <code></code> | The value context object | 
 | <code>thisArg</code> | object | <code></code> | The callback function invocation context | 
 | <code>onDuplicate</code> | onSortedListDuplicateCallback | <code></code> | Callback function for duplicates values notification | 
**Callbacks**

 <code>onSortedListDuplicateCallback(context)</code> 

Callback function to notify about duplicate values

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>context</code> | objct | <code></code> | The context object of the duplicate value | 

 <code>loopBackward(thisArg, fromValue, onItem)</code> 

Loops sorted list values backward

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>thisArg</code> | object | <code></code> | The callback function invocation context | 
 | <code>fromValue</code> | number | <code></code> | The start value to loop items of sorted list | 
 | <code>onItem</code> | onSortedListItemCallback | <code></code> | Callback function to iterate over sorted list values | 
**Callbacks**

 <code>onSortedListItemCallback(value, context)</code> 

Callback function for iterating values of the sorted list

 Returns: <code>boolean</code> - returns true to break loop operation

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>value</code> | number | <code></code> | The value | 
 | <code>context</code> | object | <code></code> | The value context object | 

 <code>loopForward(thisArg, fromValue, onItem)</code> 

Loops sorted list values

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>thisArg</code> | object | <code></code> | The callback function invocation context | 
 | <code>fromValue</code> | number | <code></code> | The start value to loop items of sorted list | 
 | <code>onItem</code> | onSortedListItemCallback | <code></code> | Callback function to iterate over sorted list values | 
**Callbacks**

 <code>onSortedListItemCallback(value, context)</code> 

Callback function for iterating values of the sorted list

 Returns: <code>boolean</code> - returns true to break loop operation

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>value</code> | number | <code></code> | The value | 
 | <code>context</code> | object | <code></code> | The value context object | 

 <code>nextContext(fromValue)</code> 

Returns context object of the next value following the given one

 Returns: <code>object</code> - returns context object of the first value in sorted list greater than the start value.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>fromValue</code> | number | <code></code> | The value to start search from | 

 <code>previousContext(fromValue)</code> 

Returns context object of the previous value preceding the given one

 Returns: <code>object</code> - returns context object of the first value in sorted list less than the start value.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>fromValue</code> | number | <code></code> | The value to start search from | 

 <code>remove(value)</code> 

Removes value from the sorted list

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>value</code> | number | <code></code> | The removed value | 

 <code>validate()</code> 

Validate internal data consistency of the self-balancing binary search tree structure

 Returns: <code>boolean</code> - returns true if structure pass validation


## SpatialIndex
Create spatial index structure. It uses collection of sizes to distribute rectangles into buckets of similar size elements. Elements of the same bucket are aproximated to points. The search of rectangles is transformed to search of points within given range plus offset for maximum linear rectangle size.

 <code>primitives.common.SpatialIndex</code> 

### Constructor

 <code>SpatialIndex()</code> 

Create spatial index structure. It uses collection of sizes to distribute rectangles into buckets of similar size elements. Elements of the same bucket are aproximated to points. The search of rectangles is transformed to search of points within given range plus offset for maximum linear rectangle size.

 Returns: <code>SpatialIndex</code> - returns spacial index data structure.


### Functions

 <code>addRect(rect)</code> 

Adds rectangle to spacial index

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>rect</code> | Rect | <code></code> | Rectangle | 

## tree
Creates tree structure

 <code>primitives.common.tree</code> 

### Constructor

 <code>tree(source)</code> 

Creates tree structure

 Returns: <code>tree</code> - returns new tree structure

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>source</code> | tree | <code></code> | A source tree structure to clone properties from | 

### Constants
| Name | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>BREAK</code> | number | <code>1</code> | B R E A K | 
 | <code>SKIP</code> | number | <code>2</code> | S K I P | 

### Functions

 <code>add(parentid, nodeid, node, position)</code> 

Adds new tree item

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>parentid</code> | string | <code></code> | Parent id | 
 | <code>nodeid</code> | string | <code></code> | New node id | 
 | <code>node</code> | object | <code></code> | Context object of the new node | 
 | <code>position</code> | number | <code></code> | Position of the new node in the collection of children | 

 <code>adopt(parentid, nodeid)</code> 

Adds existing node to the children of the parent node

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>parentid</code> | string | <code></code> | Parent Node id | 
 | <code>nodeid</code> | string | <code></code> | Node id | 

 <code>arrangeChildren(nodeid, children)</code> 

Orders children of the given node

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>nodeid</code> | string | <code></code> | The node id of the parent node which children should be ordered in the tree structure | 
 | <code>children</code> | string[] | <code></code> | Collection of ordered children | 

 <code>clone()</code> 

Clones tree structure

 Returns: <code>tree</code> - returns clone of the tree


 <code>countChildren(nodeid)</code> 

Returns number of children

 Returns: <code>number</code> - returns number of child nodes

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>nodeid</code> | string | <code></code> | Node id | 

 <code>countSiblings(nodeid)</code> 

Returns number of siblings

 Returns: <code>number</code> - returns number of siblings

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>nodeid</code> | string | <code></code> | Node id | 

 <code>getChild(parentid, index)</code> 

Returns child node by index in the children's collection

 Returns: <code>object</code> - returns child node

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>nodeid</code> | string | <code></code> | Node id | 
 | <code>index</code> | number | <code></code> | Child index | 

 <code>hasChildren(nodeid)</code> 

Returns true if node has children

 Returns: <code>boolean</code> - returns true if node has children

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>nodeid</code> | string | <code></code> | Node id | 

 <code>hasNodes()</code> 

Return true if structure has nodes

 Returns: <code>boolean</code> - returns true if structure has nodes


 <code>indexOf(nodeid)</code> 

Returns index of the node in the children's collection

 Returns: <code>number</code> - returns node index

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>nodeid</code> | string | <code></code> | Node id | 

 <code>insert(nodeid, bundleid, bundle)</code> 

Inserts bundle node into the tree structure. The new budnle node becomes only child node of the parent node. All imediate children of the parent node become children of the inserted bundle node.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>nodeid</code> | string | <code></code> | Parent node id | 
 | <code>bundleid</code> | string | <code></code> | New bundle node id | 
 | <code>bundle</code> | object | <code></code> | Context object of the bundle node | 

 <code>loop(thisArg, onItem)</code> 

Loops through nodes of tree struture

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>thisArg</code> | Object | <code></code> | The callback function invocation context | 
 | <code>onItem</code> | onTreeItemCallback | <code></code> | Callback function to call for every tree node | 
**Callbacks**

 <code>onTreeItemCallback(itemid, item)</code> 

Callback for iterating tree nodes

 Returns: <code>boolean</code> - returns true to break the loop

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>itemid</code> | string | <code></code> | The node id | 
 | <code>item</code> | object | <code></code> | The node | 

 <code>loopChildren(thisArg, nodeid, onItem)</code> 

Loops immediate children of the given node. Breaks iteration if callback function returns true.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>thisArg</code> | Object | <code></code> | The callback function invocation context | 
 | <code>nodeid</code> | string | <code></code> | The parent node id to loop children of | 
 | <code>onItem</code> | onTreeChildItemCallback | <code></code> | Callback function to call for every child node | 
**Callbacks**

 <code>onTreeChildItemCallback(nodeid, node, index, lastIndex)</code> 

Callback function to loop through children of the given node

 Returns: <code>boolean</code> - returns true to break the iteration of nodes and exit.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>nodeid</code> | string | <code></code> | Child node id | 
 | <code>node</code> | object | <code></code> | Context object of the child node | 
 | <code>index</code> | number | <code></code> | Index of the child node | 
 | <code>lastIndex</code> | number | <code></code> | Index of the last child | 

 <code>loopChildrenRange(thisArg, nodeid, fromIndex, toIndex, onItem)</code> 

Loops range of immediate children of the given node. Breaks iteration if callback function returns true.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>thisArg</code> | Object | <code></code> | The callback function invocation context | 
 | <code>nodeid</code> | string | <code></code> | The parent node id to loop children of | 
 | <code>fromIndex</code> | number | <code></code> | Start index of iteration | 
 | <code>toIndex</code> | number | <code></code> | End index of iteration | 
 | <code>onItem</code> | onTreeNodeWithIndexItemCallback | <code></code> | Callback function to call for every child node | 
**Callbacks**

 <code>onTreeNodeWithIndexItemCallback(nodeid, node, index)</code> 

Callback function to loop theough range of children for the given node

 Returns: <code>boolean</code> - returns true to break the iteration of nodes and exit.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>nodeid</code> | string | <code></code> | Child node id | 
 | <code>node</code> | object | <code></code> | Context object of the child node | 
 | <code>index</code> | number | <code></code> | Index of the child node | 

 <code>loopChildrenReversed(thisArg, nodeid, onItem)</code> 

Loops immediate children of the given node in reversed order. Breaks iteration if callback function returns true.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>thisArg</code> | Object | <code></code> | The callback function invocation context | 
 | <code>nodeid</code> | string | <code></code> | The parent node id to loop children of | 
 | <code>onItem</code> | onTreeChildItemCallback | <code></code> | Callback function to call for every child node | 
**Callbacks**

 <code>onTreeChildItemCallback(nodeid, node, index, lastIndex)</code> 

Callback function to loop through children of the given node

 Returns: <code>boolean</code> - returns true to break the iteration of nodes and exit.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>nodeid</code> | string | <code></code> | Child node id | 
 | <code>node</code> | object | <code></code> | Context object of the child node | 
 | <code>index</code> | number | <code></code> | Index of the child node | 
 | <code>lastIndex</code> | number | <code></code> | Index of the last child | 

 <code>loopEulerWalk(thisArg, onItem)</code> 

Loops tree nodes in "Euler Walk" order

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>thisArg</code> | Object | <code></code> | The callback function invocation context | 
 | <code>onItem</code> | onItemEulerWalkCallback | <code></code> | Callback function to call for every node | 
**Callbacks**

 <code>onItemEulerWalkCallback(nodeid, node, level)</code> 

Callback for iterating nodes in euler walk order

 Returns: <code>boolean</code> - returns true to break the iteration of nodes and exit.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>nodeid</code> | string | <code></code> | The node id | 
 | <code>node</code> | object | <code></code> | Context object of the node | 
 | <code>level</code> | number | <code></code> | The node's level | 

 <code>loopLevels(thisArg, arg0, arg1)</code> 

Loops through child nodes of the tree struture level by level

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>thisArg</code> | Object | <code></code> | The callback function invocation context | 
 | <code>arg0</code> | string | <code></code> | The node id to start children traversing | 
 | <code>arg1</code> | onTreeItemWithLevelCallback | <code></code> | Callback function to call for every child node | 
**Callbacks**

 <code>onTreeItemWithLevelCallback(nodeid, node, levelIndex)</code> 

Callback for iterating the tree nodes level by level

 Returns: <code>number</code> - returns break to break the loop and exit. returns skip to skip node's branch traversing.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>nodeid</code> | string | <code></code> | The node id | 
 | <code>node</code> | object | <code></code> | The node context object | 
 | <code>levelIndex</code> | number | <code></code> | The node level index | 

 <code>loopNeighbours(thisArg, itemid, distance, onItem)</code> 

Loops through the node neighbours of the tree struture level by level

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>thisArg</code> | Object | <code></code> | The callback function invocation context | 
 | <code>itemid</code> | string | <code></code> | The node id to start traversing neighbour nodes | 
 | <code>distance</code> | number | <code></code> | Stop iteration of neighbours when distance exceeds the given value | 
 | <code>onItem</code> | onTreeItemNeighbourCallback | <code></code> | A callback function to call for every neighbour node | 
**Callbacks**

 <code>onTreeItemNeighbourCallback(itemid, item, distance)</code> 

Callback for iterating tree node neighbours level by level

 Returns: <code>number</code> - returns true to skip further neighbous traversing.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>itemid</code> | string | <code></code> | The node id | 
 | <code>item</code> | object | <code></code> | The node | 
 | <code>distance</code> | number | <code></code> | The neigbour node distance from the start node | 

 <code>loopParents(thisArg, nodeid, onItem, includingStartItem)</code> 

Loops parents up to the root of the hierarchy starting with the given node. Breaks iteration if callback function returns true.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>thisArg</code> | Object | <code></code> | The callback function invocation context | 
 | <code>nodeid</code> | string | <code></code> | The node id to start iteration from | 
 | <code>onItem</code> | onTreeItemCallback | <code></code> | Callback function to call for every parent node | 
 | <code>includingStartItem</code> | boolean | <code></code> | If true the first call to callback function is made with start node id | 
**Callbacks**

 <code>onTreeItemCallback(itemid, item)</code> 

Callback for iterating tree nodes

 Returns: <code>boolean</code> - returns true to break the loop

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>itemid</code> | string | <code></code> | The node id | 
 | <code>item</code> | object | <code></code> | The node | 

 <code>loopPostOrder(thisArg, onItem)</code> 

Traverse tree structure in post order. Children first - parent last

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>thisArg</code> | Object | <code></code> | The callback function invocation context | 
 | <code>onItem</code> | onTreeItemWithParentCallback | <code></code> | Callback function to call for every node | 
**Callbacks**

 <code>onTreeItemWithParentCallback(nodeid, node, parentid, parent)</code> 

Callback for iterating nodes and providing parent in parameters

 Returns: <code>number</code> - returns break to break the loop and exit. returns skip to skip node's branch traversing.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>nodeid</code> | string | <code></code> | The node id | 
 | <code>node</code> | object | <code></code> | The node context object | 
 | <code>parentid</code> | string | <code></code> | The parent node id | 
 | <code>parent</code> | object | <code></code> | The parent node context object | 

 <code>loopPreOrder(thisArg, onItem)</code> 

Traverse tree structure in pre order. Parent first - children next

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>thisArg</code> | Object | <code></code> | The callback function invocation context | 
 | <code>onItem</code> | onTreeItemWithParentCallback | <code></code> | A callback function to call for every node | 
**Callbacks**

 <code>onTreeItemWithParentCallback(nodeid, node, parentid, parent)</code> 

Callback for iterating nodes and providing parent in parameters

 Returns: <code>number</code> - returns break to break the loop and exit. returns skip to skip node's branch traversing.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>nodeid</code> | string | <code></code> | The node id | 
 | <code>node</code> | object | <code></code> | The node context object | 
 | <code>parentid</code> | string | <code></code> | The parent node id | 
 | <code>parent</code> | object | <code></code> | The parent node context object | 

 <code>moveChildren(fromNodeid, toNodeId)</code> 

Moves children form one node to another.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>fromNodeid</code> | string | <code></code> | Source node node id | 
 | <code>toNodeId</code> | string | <code></code> | Destination node id | 

 <code>node(nodeid)</code> 

Returns context obect

 Returns: <code>object</code> - context object of the node

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>nodeid</code> | string | <code></code> | Node id | 

 <code>parent(nodeid)</code> 

Returns context object of the parent node

 Returns: <code>object</code> - returns context object of the  parent node

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>nodeid</code> | string | <code></code> | Node id | 

 <code>parentid(nodeid)</code> 

Returns parent node id

 Returns: <code>string</code> - returns parent node id

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>nodeid</code> | string | <code></code> | Node id | 

 <code>validate()</code> 

Validates internal data integrity of the structure

 Returns: <code>boolean</code> - returns true if structure pass validation


 <code>zipUp(thisArg, firstNodeId, secondNodeid, onZip)</code> 

Iterates hierarchy nodes by pairs starting with given pair of start and second nodes and up to the root of the hierarchy. Breaks iteration when callback function returns true.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>thisArg</code> | Object | <code></code> | The callback function invocation context | 
 | <code>firstNodeId</code> | string | <code></code> | The first node to start iteration | 
 | <code>secondNodeid</code> | string | <code></code> | The second node to start iteration | 
 | <code>onZip</code> | onZipUpPairCallback | <code></code> | Callback function to call for every pair of nodes on the way up in the tree structure | 
**Callbacks**

 <code>onZipUpPairCallback(firstNodeId, firstParentId, secondNodeid, secondParentId)</code> 

Callback function to return pairs of nodes

 Returns: <code>boolean</code> - returns true to break the iteration of nodes and exit.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>firstNodeId</code> | string | <code></code> | First node id | 
 | <code>firstParentId</code> | string | <code></code> | Parent id of the first node | 
 | <code>secondNodeid</code> | string | <code></code> | Second node id | 
 | <code>secondParentId</code> | string | <code></code> | Parent id of the second node | 

## TreeLevels
Creates Tree Levels structure. It is diagraming specific auxiliary structure that keeps tree nodes order level by level.

 <code>primitives.common.TreeLevels</code> 

### Constructor

 <code>TreeLevels(source)</code> 

Creates Tree Levels structure. It is diagraming specific auxiliary structure that keeps tree nodes order level by level.

 Returns: <code>TreeLevels</code> - returns tree levels structure.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>source</code> | TreeLevels | <code>undefined</code> | Optional source object to clone content from into the new instance of the structure. | 

### Functions

 <code>addItem(levelIndex, itemid, context)</code> 

Adds element

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>levelIndex</code> | number | <code></code> | Level index | 
 | <code>itemid</code> | string | <code></code> | New element id | 
 | <code>context</code> | object | <code></code> | Context object | 

 <code>addLevel(level, context)</code> 

Adds new level. Structure keeps levels sorted by their indexes. The level index can be positive and negative as well. Structure auto expands collection of levels in both directions and keeps them ordered.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>level</code> | number | <code></code> | New level index | 
 | <code>context</code> | object | <code></code> | Context object | 

 <code>binarySearch(thisArg, levelIndex, onGetDistance)</code> 

Searchs element at level using binary search

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>thisArg</code> | Object | <code></code> | The callback function invocation context | 
 | <code>levelIndex</code> | number | <code></code> | Level index to search element at | 
 | <code>onGetDistance</code> | onTreeLevelDistanceCallback | <code></code> | A callback function to measure distance for element | 
**Callbacks**

 <code>onTreeLevelDistanceCallback(itemid, item)</code> 

Callback for finding distance for element

 Returns: <code>number</code> - returns distance for the element

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>itemid</code> | number | <code></code> | Element id | 
 | <code>item</code> | object | <code></code> | Conext object | 

 <code>clone()</code> 

Clones tree levels structure.

 Returns: <code>TreeLevels</code> - returns cloned copy of the structure


 <code>createLevel(index)</code> 

Creates new level

 Returns: <code>object</code> - returns new level empty context object

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>index</code> | index | <code></code> | New level index | 

 <code>getEndLevelIndex(itemid)</code> 

Returns element's end level index in the structure. Element may occupy multiple levels of the tree levels structure.

 Returns: <code>number</code> - returns end level index

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>itemid</code> | string | <code></code> | Element id | 

 <code>getItemAtPosition(levelIndex, position)</code> 

Gets element at position

 Returns: <code>number</code> - returns element id

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>levelIndex</code> | number | <code></code> | Level index | 
 | <code>position</code> | number | <code></code> | Item position | 

 <code>getItemContext(itemid)</code> 

Gets element context object

 Returns: <code>object</code> - returns context object of the element

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>itemid</code> | string | <code></code> | Element id | 

 <code>getItemPosition(itemid, level)</code> 

Gets element position at level

 Returns: <code>number</code> - returns position of the element

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>itemid</code> | string | <code></code> | Element id | 
 | <code>level</code> | number | <code></code> | Level index | 

 <code>getLevelLength(levelIndex)</code> 

Gets number of elements at level

 Returns: <code>number</code> - returns number of elements at the level

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>levelIndex</code> | number | <code></code> | Level index | 

 <code>getNextItem(itemid, itemLevel)</code> 

Gets next element

 Returns: <code>number</code> - returns next element id

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>itemid</code> | string | <code></code> | Element id | 
 | <code>itemLevel</code> | number | <code></code> | Level index | 

 <code>getPrevItem(itemid, itemLevel)</code> 

Gets previous element

 Returns: <code>number</code> - returns previous element id

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>itemid</code> | string | <code></code> | Element id | 
 | <code>itemLevel</code> | number | <code></code> | Level index | 

 <code>getStartLevelIndex(itemid)</code> 

Returns element's start level index in the structure. Element may occupy multiple levels of the tree levels structure.

 Returns: <code>number</code> - returns start level index

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>itemid</code> | string | <code></code> | The element id | 

 <code>hasItem(itemid)</code> 

Checks if struture contains element

 Returns: <code>boolean</code> - returns true if structure contains given element id

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>itemid</code> | string | <code></code> | Element id | 

 <code>hasLevel(levelIndex)</code> 

Checks if struture contains level

 Returns: <code>boolean</code> - returns true if structure contains given level index

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>levelIndex</code> | number | <code></code> | Level index | 

 <code>isEmpty()</code> 

Chckes if structure has elements.

 Returns: <code>boolean</code> - returns true if structure has elements.


 <code>length()</code> 

Number of levels

 Returns: <code>number</code> - returns number of levels in structure.


 <code>loopFromItem(thisArg, itemid, isLeft, onItem, level)</code> 

Loops level elements starting with the given item

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>thisArg</code> | Object | <code></code> | The callback function invocation context | 
 | <code>itemid</code> | string | <code></code> | Start element id | 
 | <code>isLeft</code> | boolean | <code></code> | If true thenmethod loops leftward | 
 | <code>onItem</code> | onTreeLevelMergedItemCallback | <code></code> | Callback function to call for every item | 
 | <code>level</code> | number | <code></code> | Level index | 
**Callbacks**

 <code>onTreeLevelMergedItemCallback(itemid, item)</code> 

Callback for iterating items

 Returns: <code>number</code> - returns true to break iteration process.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>itemid</code> | number | <code></code> | Element id | 
 | <code>item</code> | object | <code></code> | Conext object | 

 <code>loopItems(thisArg, onItem)</code> 

Loops elements level by level

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>thisArg</code> | Object | <code></code> | The callback function invocation context | 
 | <code>onItem</code> | onTreeLevelsItemCallback | <code></code> | A callback function to call for every item | 
**Callbacks**

 <code>onTreeLevelsItemCallback(itemid, item, position, levelIndex, level)</code> 

Callback function for iteration of elements level by level

 Returns: <code>boolean</code> - returns true to break iteration process.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>itemid</code> | string | <code></code> | Element id | 
 | <code>item</code> | object | <code></code> | Element context object | 
 | <code>position</code> | number | <code></code> | Position of the element at level | 
 | <code>levelIndex</code> | number | <code></code> | Level index | 
 | <code>level</code> | object | <code></code> | Level context object | 

 <code>loopLevelItems(thisArg, levelIndex, onItem)</code> 

Loops level elements

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>thisArg</code> | Object | <code></code> | The callback function invocation context | 
 | <code>levelIndex</code> | number | <code></code> | Level index | 
 | <code>onItem</code> | onTreeLevelItemCallback | <code></code> | A callback function to call for every item | 
**Callbacks**

 <code>onTreeLevelItemCallback(itemid, item, position)</code> 

Callback function for iteration of level elements

 Returns: <code>boolean</code> - returns true to break iteration process.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>itemid</code> | string | <code></code> | Element id | 
 | <code>item</code> | object | <code></code> | Context object of the element | 
 | <code>position</code> | number | <code></code> | Position of the element at level | 

 <code>loopLevels(thisArg, onItem)</code> 

Loops levels

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>thisArg</code> | Object | <code></code> | The callback function invocation context | 
 | <code>onItem</code> | onTreeLevelCallback | <code></code> | A callback function to call for every level | 
**Callbacks**

 <code>onTreeLevelCallback(levelIndex, level)</code> 

Callback function for iteration of levels

 Returns: <code>boolean</code> - returns true to break iteration process.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>levelIndex</code> | number | <code></code> | Level index | 
 | <code>level</code> | object | <code></code> | Context object | 

 <code>loopLevelsFromItem(thisArg, itemid, isBelow, onItem)</code> 

Loops levels starting with the given element end level. Element may occupy multiple levels, so this method starts level iteration from next level after or before item levels.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>thisArg</code> | Object | <code></code> | The callback function invocation context | 
 | <code>itemid</code> | string | <code></code> | Element id | 
 | <code>isBelow</code> | boolean | <code></code> | If true then method loops levels backward | 
 | <code>onItem</code> | onTreeLevelCallback | <code></code> | Callback function to call for every level | 
**Callbacks**

 <code>onTreeLevelCallback(levelIndex, level)</code> 

Callback function for iteration of levels

 Returns: <code>boolean</code> - returns true to break iteration process.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>levelIndex</code> | number | <code></code> | Level index | 
 | <code>level</code> | object | <code></code> | Context object | 

 <code>loopLevelsReversed(thisArg, onItem)</code> 

Loops levels in reversed order

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>thisArg</code> | Object | <code></code> | The callback function invocation context | 
 | <code>onItem</code> | onTreeLevelCallback | <code></code> | A callback function to call for every level | 
**Callbacks**

 <code>onTreeLevelCallback(levelIndex, level)</code> 

Callback function for iteration of levels

 Returns: <code>boolean</code> - returns true to break iteration process.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>levelIndex</code> | number | <code></code> | Level index | 
 | <code>level</code> | object | <code></code> | Context object | 

 <code>loopMerged(thisArg, getItemWeight, onItem)</code> 

Loops merged elements of tree level structure by weight

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>thisArg</code> | Object | <code></code> | The callback function invocation context | 
 | <code>getItemWeight</code> | onTreeLevelItemWeightCallback | <code></code> | Callback to measure weight of the element | 
 | <code>onItem</code> | onTreeLevelMergedItemCallback | <code></code> | Callback to iterate merged elements | 
**Callbacks**

 <code>onTreeLevelItemWeightCallback(itemid, item)</code> 

Callback for finding weight of element

 Returns: <code>number</code> - returns distance for the element

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>itemid</code> | number | <code></code> | Element id | 
 | <code>item</code> | object | <code></code> | Conext object | 

 <code>onTreeLevelMergedItemCallback(itemid, item)</code> 

Callback for iterating items

 Returns: <code>number</code> - returns true to break iteration process.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | <code>itemid</code> | number | <code></code> | Element id | 
 | <code>item</code> | object | <code></code> | Conext object | 
