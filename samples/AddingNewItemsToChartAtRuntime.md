# Adding new items to chart at runtime

Chart is designed to update only visual elements effected by the scope of changed API options. For example on screen annotations are being rendered on top of everything, so when we make changes to on-screen annotations definitions there is no need to redraw all chart elements. The same applies to other visual elements, chart compares current copy of definitions to the new one on API and in case of any changes it triggers rendering cycle for effected scope of visual elements.

Chart does not track individual items, if we make changes in one of the items then the whole collection of items is considered to be changed, so control will layout again all items in diagram. So adding or removing individual item to items collection, does not improve rendering performance. In order to find changes in items collection widget scans all items on every refresh cycle. The chart was designed to be used in modern UI frameworks like AngularJS, so end user may change all API properties on every update, the control will check for changed properties only and make visual updates in the scope of changed properties. The point of this statement is that if we assign new items array to items property, but we make no changes to actual items, chart will not perform any layout calculations and rendering. So usage of collection bindings in Modern UI frameworks is absolutely fine.

Please, pay attention that chart does not update its visual representation on every property change and it does not make any guesses about required changes. Chart provides "update" method triggering reevaluation of API properties and rendering cycle. This "update" method is supposed to be explicitly called when all properties are set on chart's API. That means that opposite is true and it is possible to set individual chart properties one by one via sequential API calls. All these changes to API properties will not trigger any layout changes or rendering till method "update" is called.

The "update" method supports optional parameter which let you choose how you want to redraw your diagram.

## JavaScript
```Javascript
control.update(primitives.orgdiagram.UpdateMode.Recreate);
```
Recreate - is full content reset and redraw. It is equivalent to complete chart removal and recreation. This is the most expensive update. Use it when you want to be sure that everything ware recreated from scratch.

```Javascript
control.update(primitives.orgdiagram.UpdateMode.Refresh);
```

This is above mentioned fast redraw mode, it reuses existing DOM elements in order to speed up update time and it makes visual changes only in scope of changed API properties.

```Javascript
control.update(primitives.orgdiagram.UpdateMode.PositonHighlight);
```
It ignores any API changes except current highlight item position, it just positions highlight item, no layout recalculation or items rendering performed.

## jQuery
```Javascript
jQuery("#basicdiagram").orgDiagram("update", primitives.orgdiagram.UpdateMode.Recreate); /* Recreate */
jQuery("#placeholder").orgDiagram("update", primitives.orgdiagram.UpdateMode.Refresh); /* Refresh */
jQuery("#placeholder").orgDiagram("update", primitives.orgdiagram.UpdateMode.PositonHighlight); /* Highlight placement */
```
The following example demonstrates adding new items to organizational chart at run time, or in other words this sample does not recreate control every time we make changes to its items collection. It uses fast refresh mode to update its layout. This example adds "delete" and "add" buttons and implements onButtonClick event handler for adding and removing items. For more complex implementation of chart editing functionality see chart editor demo.

[JavaScript](javascript.controls/CaseAddingNewItemsToChartAtRuntime.html)
[JQuery](jquery.widgets/CaseAddingNewItemsToChartAtRuntime.html)