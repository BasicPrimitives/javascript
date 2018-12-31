/*
	Class: primitives.famdiagram.ButtonConfig
		Options class. Custom user button options class. 
		Buttons displayed on the right side of items. 
		See jQuery UI Button options description for details.
		In order to receive button click event make binding 
		to <primitives.famdiagram.Config.onButtonClick>.
	
	See Also:
		<primitives.famdiagram.Config.buttons>
*/
primitives.famdiagram.ButtonConfig = function (name, icon, tooltip) {
	/*
	Property: name 
		It should be unique string name of the button. 
		It is needed to distinguish click events from different butons.
	*/
	this.name = name;

	/*
	Property: icon
	Name of icon used in jQuery UI.
	*/
	this.icon = icon;
	/*
	Property: text
	Whether to show any text -when set to false (display no text), 
	icon must be enabled, otherwise it'll be ignored.
	*/
	this.text = false;
	/*
	Property: label
	Text to show on the button.
	*/
	this.label = null;
	/*
	Property: tooltip
	Button tooltip content. Tooltip is based on jQuery UI tooltip widget, so it should be part of jQuery UI distribution in order to make this property work.
	*/
	this.tooltip = tooltip;
	/*
	Property: size
	Size of the button of type <primitives.common.Size>.
	*/
	this.size = new primitives.common.Size(16, 16);
};