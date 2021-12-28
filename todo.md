API:
* Remove HTML templates. Keep onItemRender callback only. Pure ReactJS dedicated API. Align PDF and core JavaScript controls APIs.

Family Layout
* Project relative item options to the root nodes of the diagram
* Add nodes horizontal alignment in the family diagram
* Place given parent and child on a vertical line in the family diagram—test performance for over 1000 nodes on the vertical line
* Add loops for self looped node
* Fix loops for pair of looped nodes

Connector lines
* Add individual connector lines width, color, and line type values
* Add connector lines scale legend. Add numeric, categorical, and logarithmic scales for connector lines width, color and type values
* Add connector lines side by side tracing option

Connector Annotation
* Fix connector annotation line placement, so its label or spline does not go outside diagram boundaries
* Improve labels placement and offset along with connection line annotation (Pomex)
* Improve parallel splines rendering for connector annotation (Pomex)

Organizational Chart Layout
* Add new item types to draw org diagram in all directions. Star Layered Layout. Preserve layers as a core feature. 
* Align children into levels with account for available assistants in parallel branches. 
* Fix inactive cursor neighbors nodes visibility for PageFitMode.SelectedItemsOnly mode

Frame Markers
* Show annotated nodes markers on the frame. Add showFrameMarkers option for various annotations
* Show neighbors markers on the frame. Add showNeighborsMarkers option for Org and Fam diagrams configs
* Show markers of nearest nodes in vertical and horizontal scroll direction when no nodes are in the viewport. Sparse diagrams support

Highlight Path Annotation
* Fix tracing over loops with account for connector lines direction

Family Label Annotations
* Fix labels placement on loops
* Fix labels visibility for PageFitMode.SelectedItemsOnly

Shape Annotation
* Merge shape annotation only if they form solid rectangles without overlapping other nodes

Demos:
* Rework Dependencies Demo with latest data from ["Path of Exile" passive skill tree](https://www.pathofexile.com/passive-skill-tree)
