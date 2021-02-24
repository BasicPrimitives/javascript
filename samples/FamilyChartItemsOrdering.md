# Family Items Ordering
The family diagram supports multiple parents and children per node, so there is no way to define groups of items and their order in the group. The family diagram provides API options helping to guide the layout engine to order nodes. That means if items expected to be in one layout group, then the developer can use the following properties to guide the layout engine about user preferred relative order of items:

* `relativeItem` - item position and placement type defined relative to the node referenced by this  property
* `placementType` - this property defines placement on the left or right side of the relative item. The property has the following values:
    * `primitives.AdviserPlacementType.Left`
    * `primitives.AdviserPlacementType.Right`
* `position` - if several items reference the same relative item and relative offset, then this property defines the order of them.

If the item has no relative node defined, then the layout engine will try to find optimal placement based on its relations.

Please, pay attention that control ignores looped references between nodes, so it is the developer's responsibility to avoid them.

Family Items Ordering Sample

[JavaScript](javascript.controls/CaseFamilyChartItemsOrdering.html)

![Screenshot](javascript.controls/__image_snapshots__/CaseFamilyChartItemsOrdering-snap.png)

## Multiple Families Ordering Sample

[JavaScript](javascript.controls/CaseMultipleFamiliesOrdering.html)

![Screenshot](javascript.controls/__image_snapshots__/CaseMultipleFamiliesOrdering-snap.png)

## Primary Parent

If a node has multiple parents and belongs to distant branches of the diagram, then the `primaryParent` property can give higher priority to one of them. So the control would place the node to the hierarchy of that primary parent.

* `primaryParent` - defines the primary parent of the node. The control would place the node into the hierarchy of the primary node.  If there is no parent found, then the layout engine will ignore it. 

[JavaScript](javascript.controls/CaseFamilyChartPrimaryParent.html)

![Screenshot](javascript.controls/__image_snapshots__/CaseFamilyChartPrimaryParent-snap.png)