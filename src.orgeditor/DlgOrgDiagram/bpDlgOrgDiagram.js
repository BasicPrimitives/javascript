/*
	jQuery UI Widget
	Organizational Diagram Editor
	Organizational Diagram Dialog Widget

	Depends:
		jquery.ui.core.js
		jquery.ui.widget.js
		jquery.ui.button
		jquery.ui.buttonset
		jquery.ui.autocomplete
		jquery.ui.dialog
*/
(function ($) {
	$.widget("ui.bpDlgOrgDiagram", new primitives.orgeditor.DlgOrgDiagram());
}(jQuery));