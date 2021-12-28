# Children Layout
The organizational chart control provides options for individual node placement and global settings controlling the layout of the entire diagram. Use the following chart and item config properties to define nodes position in the hierarchy:

* `childrenPlacementType` - this property is available for chart and for individual items, it defines shape of children with the `primitives.ChildrenPlacementType` enumeration, which has following options `Vertical`, `Horizontal` & `Matrix`
* `leavesPlacementType` - this option is available only at the global chart level. It controls children's layout with no own children, so it is only for children of the hierarchy's last level.
* `maximumColumnsInMatrix` - by default, matrixed children form square formation. If square formation grows beyond the screen's width, it becomes inconvenient since the end-user needs to scroll that matrix both vertically and horizontally. Use this option to limit the maximum number of columns so that matrix would grow vertically only.

[JavaScript](javascript.controls/CaseChildrenPlacementType.html)

![Screenshot](javascript.controls/__image_snapshots__/CaseChildrenPlacementType-snap.png)

# Placing children into multiple horizontal levels
To programmatically place children nodes into multiple rows, use the `levelOffset` property. If level offsets are inconsistent and have missing levels, the control will automatically align levels across branches. See cross-branch alignment for more details. The matrixed layout demo shows the matrixed team structure visualization and alignment in the organization.


Only children having the `levelOffset` property set to `null`, are shaped into matrixed or vertical formation by the `childrenPlacementType` property setting. 


[JavaScript](javascript.controls/CaseChildrenAndAssistantsLevelOffset.html)
