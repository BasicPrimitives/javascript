# Diagram Sizing
## Responsive Design
Like any other Data Visualization components, the Basic Primitives controls combine scalable and non-scalable graphics elements. For example, we would like to show 10'000 labels, but it is physically impossible to fit them because their total square size is multiple times bigger than available screen space. Simultaneously, we cannot scale all of them down to points since they become merely unreadable. Try to disable automatic fit to page for the Large Hierarchy demo. The resulting diagram will be so big that its visualization makes no sense. Rendering mode without fit to the screen is useful only for PDF generation for reporting purposes only. If we speak about business applications designed for data analysis, we need to show nodes only in the current user focus scope.  Diagramming applications should dynamically adapt to user data and requirements. Another argument favoring dynamic diagramming applications is that in large organizations with over 500 people, the rate of changes is so high that any organizational structure becomes obsolete as soon as we make its hard copy. So being responsive, our strategy is to pack as much data as possible to the end-user screen. The application should notify control about changes in the screen size so that the component can find optimal visualization of the diagram for the end-user. 

## Chart sizing is applications responsibility
The control does not update itself when the application changes the control's placeholder size for the following reasons: 

* The component does not add any event handlers outside of the placeholder. There is no cross-browser possibility to notify control on `<div>` size change without polyfills. The only workaround is to handle the main browser window resize events, but it creates unavoidable conflicts with the host application. 
* Chart does not update itself without the explicit call of "update" method or end-user mouse or keyboard action.

## Pixel alignment
When we draw SVG elements, it is essential to have them pixel aligned; otherwise, they become blurred. When we call the `update` method, the control aligns placeholder position within pixel range via adding additional margins to the div's left and top edges. Pixel rounded lines matching the monitor's physical pixels look sharp and clean. 

In the following example, we show how to handle the window size change event and use `Timer` to throttle excessive updates so our application stays responsive.

[JavaScript](javascript.controls/CasePageSizeDiagram.html)

## Auto sizing the diagram in the article

To place a diagram inside the article and let it auto-expand to show all nodes, switch the `pageFitMode` property in the configuration object to the `AutoSize` option. The control will auto-size its placeholder `div` element to show all nodes of the diagram. 

Use the following options to constrain control auto-size:

* `autoSizeMinimum` limits the diagram's minimal size, so if it is empty, you will see an open area of this size.
* `autoSizeMaximum` - does not allow to grow control beyond this size. Set maximum size to some value if you need to avoid a humongous diagram on your page.

for example following code sets control's minimal size:

``` JavaScript
autoSizeMinimum = new primitives.Size(800, 600);
```

[JavaScript](javascript.controls/CaseAutoSize.html)

