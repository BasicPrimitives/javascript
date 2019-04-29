# Labels
Chart provides options to draw labels for minimized items only. The following options on diagram Config class used to control labels rendering: `showLabels`, `labelSize`, `labelOffset`, `labelOrientation`, `labelPlacement` and etc. `ItemConfig` has property `label`, `showLabel` and etc. as well to customize labels per item. This is needed because dotted representation of item has no template to place HTML fragment for label inside.

If we need labels for regular items we can draw them using templates. Regular items are rendered as regular HTML fragments. So in order to place label over connection lines we have to place it outside of item boundaries. By default CSS class bp-item has overflow attribute set to hidden and HTML elements placed outside of item boundaries are invisible. In order to draw label we have to override bp-item class or directly edit primitives.latest.css and change overflow hidden to visible.

Following example demonstrates how to add an extra property "percent" to items and render it as a label over item connection line.

[JavaScript](javascript.controls/CaseItemTemplateLabel.html)
[JQuery](jquery.widgets/CaseItemTemplateLabel.html)