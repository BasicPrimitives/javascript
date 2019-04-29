# Custom Placement of Children
## Adviser & Assistant Item Types

Organizational Chart items are defined in form of regular tree, so every item may have only one parent in hierarchy. This is conceptually easy to understand for end user who edits organizational chart and software devloper to maintain required structures in database and in application.

In the reality pure hierarchical relations are rare, so organizational chart provides means to represent none hierarchical realations in form of item types and on-screen annotations.

Chart supports following itemType's:

* Regular,
* Adviser,
* Assistant,
* SubAdviser,
* SubAssistant,
* GeneralPartner,
* LimitedPartner
* AdviserPartner.

All of them affect child placement relative to its parent in hierarchy. The following example demonstrates  Adviser and Assistant types. Adviser item placed at the same level as its parent and connected to it horizontally. Assistant item is placed at level between parent and its regular children and horizontally connected to connection line between parent and its children as well.

Use `ItemConfig.adviserPlacementType` option to place adviser or assistant on the left or right side of hierarchy;

[JavaScript](javascript.controls/CaseAdviserAndAssistantItemTypes.html)
[JQuery](jquery.widgets/CaseAdviserAndAssistantItemTypes.html)

## Sub Adviser & Sub Assistant item types

Sub Adviser & Sub Assistant item types are variations of regular Adviser & Assistant types. The only difference is they are shift down one level relative to their parents, so they are connected by their top side to the hierarchy.

Use `ItemConfig.adviserPlacementType` option to place them on the left or right side of parent's hierarchy as well.

[JavaScript](javascript.controls/CaseSubAdviserAndSubAssistantItemTypes.html)
[JQuery](jquery.widgets/CaseSubAdviserAndSubAssistantItemTypes.html)