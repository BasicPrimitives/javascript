/*
	Class: primitives.orgdiagram.EventArgs
		Event details class.
*/
primitives.orgdiagram.EventArgs = function () {
	/*
	Property: oldContext
		Reference to associated previous item in hierarchy.
	*/
	this.oldContext = null;

	/*
	Property: context
		Reference to associated new item in hierarchy.
	*/
	this.context = null;

	/*
	Property: parentItem
		Reference parent item of item in context.
	*/
	this.parentItem = null;

	/*
	Property: position
		Absolute item position on diagram.

	See also:
		<primitives.common.Rect>
	*/
	this.position = null;

	/*
	Property: name
		Relative object name.

	*/
	this.name = null;

	/*
	Property: cancel
		Allows cancelation of coupled event processing. This option allows to cancel layout update 
		and subsequent <primitives.orgdiagram.Config.onCursorChanged> event 
		in handler of <primitives.orgdiagram.Config.onCursorChanging> event.
	*/
	this.cancel = false;
};