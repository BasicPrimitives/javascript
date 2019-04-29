# jQuery UI Widgets inside of Item template

Item templates are defined with regular HTML fragments, so this feature opens possibility for composability of widgets.  We can add other jQuery UI widgets into item templates if needed. The problem here is that in many cases HTML elements should be already attached to DOM in order to initialize jQuery UI widgets inside of them properly, so in order to do this we need to handle onItemRender event. That event provides rendering context information in its second argument of type primitives.common.RenderEventArgs: DOM element, API data item and renderingMode. So application can use renderingMode option to tell between creation stage and update. Use it if you need to reuse your widgets without full reset.

Chart uses jQuery remove method to clean DOM so widgets inside templates are always properly recycled.

[JQuery](jquery.widgets/CaseCustomControlTemplate.html)

## Organizational Chart inside jQuery UI Dialog

This is general compatibility test on how widget works inside jQuery UI dialog. The example demonstrates how to select items in organizational chat placed inside jQuery UI Dialog and return them back to host application. 

[JQuery](jquery.widgets/CaseOrganizationalChartInsidejQueryUIDialog.html)