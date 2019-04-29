# Inactive family items
Inactive items are regular items excluded from navigation, that means when use auto fit mode, selection of neighboring node to inactive item makes all nodes of inactive item shown in full size as well. Inactive items play a role of in layout annotations having no user interaction and templated with HTML. For example they can be used to add titles into family diagram layout or terminator items indicating that upon reaching them diagram would load extra nodes into layout.

Control provides two ways to set inactive items, via direct per node setting property isActive to false or via making custom item templates, so all nodes having that template are going to be inactive in layout. Properly structured application is supposed to have some set of item templates, so setting inactive items via template options is the most appropriate.

See following configuration classes:

* `primitives.famdiagram.ItemConfig`
* `primitives.famdiagram.TemplateConfig`

They have following option:

* `isActive` - Setting it to false makes items inactive in diagram layout, so they become irresponsive to mouse and keyboard navigation events. Note that controls provide global scope options to disable mouse highlights and cursor navigation.

[JavaScript](javascript.controls/CaseInactiveFamilyItems.html)
[JQuery](jquery.widgets/CaseInactiveFamilyItems.html)