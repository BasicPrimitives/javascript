# Changing API Properties and Updating Diagrams

We do fast updates, so we don't flush and recreate diagrams for every configuration object change. We reuse transformations and visual elements if they are not affected by configuration changes. For example, to render on-screen annotations, the control does not need to layout nodes, so when we add new on-screen annotations, we show them instantly. There are some exceptions when annotations may affect nodes layout, see reference for more details. The same applies to all other visual elements. The component updates the diagram by comparing the current copy of the configuration object with the new one. If any changes are detected, the control triggers the rendering cycle for the affected visual elements only.

The rendering engine does not track individual items. If we make changes to one of the nodes, then the whole collection of nodes is changed. As a result, the component will re-render the entire diagram. So there is no difference if you change the entire array of nodes or just a single one. The result is the same, we layout nodes and render the whole collection of items again. We designed our chart for modern UI frameworks like AngularJS. So the developer may modify the entire configuration object of the control; we would do our job to optimize the diagram's rendering time. So the usage of property bindings in UI frameworks is acceptable and is compatible with our product.

Please, pay attention to the fact that changing configuration object properties do not trigger the rendering cycle. When you finish the chart options setting, you need to call the `update` method explicitly. That method would run API properties evaluation and trigger diagram rendering cycle. It gives you the possibility to reference control from multiple functions setting individual diagram properties and then apply all the changes all at once.  

The `update` method has an optional parameter that lets you control how you want to re-render your diagram.

## [JavaScript](https://developer.mozilla.org/en-US/docs/Web/javascript) 

```Javascript
control.update(primitives.UpdateMode.Recreate);
```

Recreate - is full content reset and redraw. It is equivalent to complete chart removal and recreation. Use it when you want to be sure that everything ware recreated from scratch.

```Javascript
control.update(primitives.UpdateMode.Refresh);
```

Refresh - is the above mentioned optimized rendering mode. It reuses intermediate transformations and visual elements.

```Javascript
control.update(primitives.UpdateMode.PositonHighlight);
```

Position Highlight - ignores any API changes except the current highlight item position change. It does nothing, no layout transformations or items rendering performed.

The following example demonstrates adding new items to the organizational chart at run time. So we don't recreate the control every time we make changes in the `items` collection property. The sample uses Refresh mode to update its layout. This example adds "delete" and "add" buttons and handles the` onButtonClick` event to add and remove items. 

For the more complex implementation of chart editing functionality, see chart editor demo. It uses ReactJS and Redux to manage the ViewModel state.

[JavaScript](javascript.controls/CaseAddingNewItemsToChartAtRuntime.html)
