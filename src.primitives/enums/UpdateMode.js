/*
	Enum: primitives.common.UpdateMode
		Defines redraw mode of diagram.
	
	Recreate - Forces widget to make a full chart redraw. It is equivalent to initial chart creation. 
	It removes everything from chart layout and recreares all elements again. 
	Refresh - This update mode is optimized for widget fast redraw caused by resize or changes of 
	next options: <primitives.orgdiagram.Config.items>, <primitives.orgdiagram.Config.cursorItem> 
	or <primitives.orgdiagram.Config.selectedItems>.
	PositonHighlight - This update mode redraws only <primitives.orgdiagram.Config.highlightItem>.

	See Also:
		<primitives.orgdiagram.Config.update>
*/
primitives.common.UpdateMode =
{
	Recreate: 0,
	Refresh: 1,
	PositonHighlight: 2
};

primitives.orgdiagram.UpdateMode = primitives.common.UpdateMode;