# Shape & Background Annotations
## Shape
Diagrams support on-screen annotations for visualization of non - hierarchical relations between nodes. Components use SVG elements to render geometrical figures. If you need some specific custom shapes, you have to make changes to the source code or use images and custom items templates. Shape annotation supports the following figures:
* Rounded Rectangle
* Oval
* Triangle
* Cross Out
* Circle
* Rhombus

If you define multiple nodes, then annotation draws one large shape on top of them. If you need numerous individual figures for a list of nodes, you have to create shape annotation for every node. If you don't define background or borderline color, then they are not drawn. Annotation can render a text label on the side of the geometrical figure.

## Background Annotation
This visual is a common background area having borderline and fill color. When we render the same background annotation for multiple items, control automatically blends them into a single continuous shape. Increase background offset around nodes if they don't merge. Merging annotations improves visualization and minimizes visual clutter in the diagram. Use `includeChildren` option to expand the background around the item down to all of its descendants. 

[JavaScript](javascript.controls/CaseShapeAnnotation.html)
[PDFKit](pdfkit.plugins/ShapeAnnotation.html)

![Screenshot](javascript.controls/__image_snapshots__/CaseShapeAnnotation-snap.png)