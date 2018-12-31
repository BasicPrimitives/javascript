/*
	Enum: primitives.common.NavigationMode
		Defines control navigation mode. By default control replicates interactivity of regular Tree control. 
		It has highlight for mouse over feedback over nodes and it has cursor for showing currently selected single node in diagram.
		In order to avoid children nodes folding and unfolding, this functionality is done automatically for current cursor item.
		So cursor plays vital role for unfolding of nodes and zooming into area of user interest in diagram.

	Default - Highlight & Cursor 
	CursorOnly - Cursor only.
	HighlightOnly - Highlight only. This mode is usefull for touch devices. Since it requires minimal layout changes and renderings.
	Inactive - No user interactivity.

	See Also:
		<primitives.orgdiagram.Config.navigationMode>
		<primitives.famdiagram.Config.navigationMode>
*/
primitives.common.NavigationMode =
{
	Default: 0,
	CursorOnly: 1,
	HighlightOnly: 3,
	Inactive: 2
};