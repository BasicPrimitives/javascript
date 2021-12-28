# Cross-Branch children alignment
In the Organizational Chart layout, the number of rows occupied by the immediate children depends on the number of assistants, advisers, and levels of children of the node. So nodes at the same logical level in the organizational chart hierarchy require visual alignment during visualization.
As expected, the control aligns regular horizontally placed children across branches of the hierarchy. But we support the alignment of Assistants, SubAssistants, Advisers, and SubAdvisers hierarchies and child nodes in vertical and matrix formations across departments.
The following options control cross-branch nodes alignment:
* `alignBranches` - property enables alignment
* `placeAdvisersAboveChildren` - if this property is disabled, then advisers' children are placed at the same level and aligned to the children of the parent's node.

[JavaScript](javascript.controls/CaseCrossBranchAlignment.html)

![Screenshot](javascript.controls/__image_snapshots__/CaseCrossBranchAlignment-snap.png)
