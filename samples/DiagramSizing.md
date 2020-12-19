# Diagram Sizing
## Responsive Design
Like any other Data Visualization component it combines scalable and non-scalable graphics elements. For example we would like to show 10'000 labels but it is just physically impossible to fit them, because their total square size is multiple times bigger than available screen space. At the same time we cannot scale all of them down to points, since they become simply unreadable. Try to disable "fit to page" for large hierarchy demo, the resulting diagram is going to be so big that its visualization makes no sense, this rendering mode is useful only for PDF generation for reporting purposes only. If we speak about BI applications designed for data analysis then we need to show nodes only in the scope of current user focus of interest, so diagramming applications should be dynamic and adopt to user data and requirements. Another argument in favour of diagramming applications having auto layout is the fact that in large organizations where we have over 500 people the rate of changes is so high that any organizational structure becomes obsolete as soon as we make its hard copy. So we use various strategies to show as mush data as possible to the user within available screen space, so control needs to be notified about its placeholder size changes in order to trigger rendering cycle. 

## Chart sizing is applications responsibility
We don't try to refresh control ourselves for the following reasons: 

* Chart does not add any event listeners outside of placeholder. There is no cross browser possibility to notify control on `<div>` size change. The only workaround is to handle window resize event, but it creates unavoidable conflicts with host application. 
* Chart does not update itself without explicit call of "update" method or end user mouse or keyboard action.

## Pixel alignment
When we draw SVG and Canvas lines it is important to have them pixel aligned otherwise they become blurred, so when we call "update" method control aligns placeholder position within pixel range via adding additional margins to left and top sides of the div, so that way pixel rounded lines matches physical pixels of monitor, so they look sharp and clean. 

In the following example we show how to listen to window size change event and use Timer to throttle it so our application stays responsive.

[JavaScript](javascript.controls/CasePageSizeDiagram.html)

## Auto Size Diagram in Article

In order to place diagram inside page article and make it auto expand to accommodate all nodes of diagram use `AutoSize` option of `pageFitMode` in config class. The control in this mode will auto size its placeholder `div` element to show all nodes of diagram. 

Use following options to constrain control auto size:

* `autoSizeMinimum` - it limits minimal size of diagram, so if it is empty then you are going to see empty area of this size.
* `autoSizeMaximum` - does not allow to grow control beyond this size. Set maximum size to some value if you need to avoid humongous diagram on your page.

for example following code sets control's minimal size:

``` JavaScript
autoSizeMinimum = new primitives.Size(800, 600);
```

[JavaScript](javascript.controls/CaseAutoSize.html)

