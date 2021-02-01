# Connector Annotations

Connector annotation is an on-screen direct connection line between two nodes of the diagram. It supports simple conflict resolution. If multiple connector annotations overlap each other between the same pair of nodes, the control offsets them and draws them parallel. 

The following sample demonstrates connection annotation drawn in the offbeat style. This way, connection annotation should not overlap diagrams base connection lines and block the primary diagram hierarchy view. The offbeat connector annotation compensates for the lack of space between nodes via drawing its curve outside of connected nodes.

[JavaScript](javascript.controls/CaseConnectorAnnotation.html)

![Screenshot](javascript.controls/__image_snapshots__/CaseConnectorAnnotation-snap.png)