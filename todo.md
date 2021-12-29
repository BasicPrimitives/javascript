API:
* Remove HTML templates. Keep onItemRender callback only. Pure ReactJS dedicated API. Align PDF and core JavaScript controls APIs.

Family Layout
* Project `relativeItem` options to the root nodes of the diagram
* Add support of the `horizontalAlignment` property
* Test rendering performance for diagram containing 1000 nodes forming a vertical line using `primaryParent` property
* Add loops rendering for self-looped nodes
* Fix loops for looped parent-child nodes

Organizational Chart Layout
* Add new item types to draw org diagram in all directions. Star Layered Layout. Preserve layers as a core feature. 
* Fix inactive cursor neighbors nodes visibility in PageFitMode.SelectedItemsOnly mode

Frame Markers
* Show annotated nodes markers on the frame. Add `showFrameMarkers` option for various annotations
* Show neighbors markers on the frame. Add `showNeighborsMarkers` option for Org and Fam diagrams configs
* Show markers of nearest nodes in vertical and horizontal scroll direction when no nodes are in the viewport. Sparse diagrams support

Connector lines
* Add connector line `lineWidth`, `lineColor`, and `lineType` properties per node or relation
* Add connector lines legend. Add numeric, categorical, and logarithmic scales for connector lines `lineWidth`, `lineColor`, and `lineType` values
* Add connector lines side-by-side tracing option

Connector Annotation
* Fix polyline line and label placement so they don't go outside diagram boundaries
* Improve labels placement and offset along the polyline (Pomex)
* Improve parallel polylines rendering (Pomex)

Highlight Path Annotation
* Fix tracing over loops with account for diagram's connector lines direction

Family Label Annotations
* Fix labels placement on loops
* Fix labels visibility for PageFitMode.SelectedItemsOnly

Shape Annotation
* Merge shape annotation only if they form solid rectangles without overlapping other nodes

Demos:
* Rework Dependencies Demo with latest data from ["Path of Exile" passive skill tree](https://www.pathofexile.com/passive-skill-tree)
