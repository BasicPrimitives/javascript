/*
	jQuery UI Widget
	Organizational Diagram Editor

	Depends:
		jquery.ui.core.js
		jquery.ui.widget.js
		jquery.ui.button
		jquery.ui.buttonset
		jquery.ui.autocomplete
		jquery.ui.dialog
*/
(function ($) {
	$.widget("ui.bpOrgEditor", new primitives.orgeditor.Controller());
}(jQuery));
