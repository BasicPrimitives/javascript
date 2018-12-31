/*
	Class: primitives.famdiagram.EventArgs
		Event details class.
*/
primitives.famdiagram.EventArgs = function () {
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
	Property: parentItems
		Collection of immidiate parent items of item in context.
	*/
	this.parentItems = [];

	/*
	Property: childrenItems
		Collection of immidiate children items of item in context.
	*/
	this.childrenItems = [];

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
		and subsequent <primitives.famdiagram.Config.onCursorChanged> event 
		in handler of <primitives.famdiagram.Config.onCursorChanging> event.
	*/
	this.cancel = false;
};