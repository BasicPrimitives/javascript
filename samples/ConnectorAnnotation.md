# Connector Annotations

Connector annotation is an on-screen direct connection line between two nodes of the diagram. It supports simple conflict resolution. If multiple connector annotations overlap each other between the same pair of nodes, the control offsets them and draws them parallel. 

The following sample demonstrates connection annotation drawn in the offbeat style. This way, connection annotation should not overlap diagrams base connection lines and block the primary diagram hierarchy view. The offbeat connector annotation compensates for the lack of space between nodes via drawing its curve outside of connected nodes.

[JavaScript](javascript.controls/CaseConnectorAnnotation.html)

![Screenshot](javascript.controls/__image_snapshots__/CaseConnectorAnnotation-snap.png)

The following sample demonstrates how drag-and-drop can be used to create or modify connector annotations in a diagram.

* Drag nodes to create new annotations.
* Drag annotation endpoints to reconnect them to different nodes.
* Drag an endpoint to empty space to delete the annotation.

The sample uses the [Interactjs.io](https://interactjs.io) drag-and-drop library (MIT licensed) to support dynamic diagram updates during node or endpoint movement. An overlay containing the annotation control is displayed during the drag to provide visual feedback. When dragging begins, the corresponding annotation is temporarily removed from the diagram and reinserted upon drop, reflecting the updated connection.

[JavaScript](javascript.controls/DemoConnectorAnnotationDragNDrop.html)