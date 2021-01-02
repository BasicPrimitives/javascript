# Changing API Properties and Updating Diagrams

Our diagrams are designed to only update the visual elements that undergo changes in the API options. For example on screen annotations are being rendered on top of everything. So when we make changes to the on-screen annotations and their definitions, there is no need to re-render all of the chart elements. The same applies to all of the other visual elements. The diagram updates/edits are done by comparing the current copy of the definitions to the new ones in the API. If any changes are detected, the control triggers the rendering cycle for the effected scope of visual elements.

The rendering engine does not track individual items. If we make changes to one of the items, then the whole collection of items is considered to be changed. As a result the component will re-render the entire diagram. So adding or removing an individual item from an items collection does not improve the rendering performance. In order to find changes in an items collection, control scans all of the items during every refresh cycle. The chart was designed to be used in modern UI frameworks like AngularJS. So the end user may change/edit all of the API properties with every update. The control will also check for any changed properties and make the desired visual updates. The point of this statement is that; when we assign a new items array to the `items` collection property without making any changes to said items. The chart will not perform any layout calculations or rendering. So the usage of collection bindings in Modern UI frameworks is absolutely fine and is compatible with our product.

Please, pay attention to the fact that the chart does not self update it's visual representation when you change it's API properties. Instead the chart provides an `update` method, that triggers the reevaluation of the API properties and the rendering cycle. This `update` method is supposed to be explicitly called when all of the properties are set on the control's API. It is also possible to set individual chart properties one by one via sequential API calls. All these changes to API properties will not trigger any layout changes or rendering until the method: `update` is called.

The `update` method supports multiple optional parameters which allow you to choose how you want to re-render your diagram.

## [JavaScript](https://developer.mozilla.org/en-US/docs/Web/javascript): 
```Javascript
control.update(primitives.UpdateMode.Recreate);
```
Recreate - is full content reset and redraw. It is equivalent to complete chart removal and recreation. This is the most expensive update. Use it when you want to be sure that everything ware recreated from scratch.

```Javascript
control.update(primitives.UpdateMode.Refresh);
```

This is above mentioned fast redraw mode, it reuses existing DOM elements in order to speed up update time and it makes visual changes only in scope of changed API properties.

```Javascript
control.update(primitives.UpdateMode.PositonHighlight);
```
It ignores any API changes except current highlight item position, it just positions highlight item, no layout recalculation or items rendering performed.

The following example demonstrates adding new items to organizational chart at run time, or in other words this sample does not recreate control every time we make changes to its items collection. It uses fast refresh mode to update its layout. This example adds "delete" and "add" buttons and implements onButtonClick event handler for adding and removing items. For more complex implementation of chart editing functionality see chart editor demo.

[JavaScript](javascript.controls/CaseAddingNewItemsToChartAtRuntime.html)
