# Inactive items in layout
Inactive items are regular items excluded from navigation. For example they can be used to add departments titles into hierarchy or terminator items indicating number of available items for dynamic download and unfolding sub hierarchy.

Chart's API provides two ways to set inactive items. The first one is isActive option of ItemConfig options class and the second way is via template configuration. In majority of scenarios inactive items are supposed to have custom item template, so deactivating user interaction via item template is the most appropriate for application design. 

See following configuration classes:

* `primitives.orgdiagram.ItemConfig`
* `primitives.famdiagram.ItemConfig`
* `primitives.orgdiagram.TemplateConfig`
* `primitives.famdiagram.TemplateConfig`


They have following option:

`isActive` - If it is true then item having this template is selectable in hierarchy and it has mouse over highlight.

[JavaScript](javascript.controls/CaseInactiveItems.html)
[JQuery](jquery.widgets/CaseInactiveItems.html)