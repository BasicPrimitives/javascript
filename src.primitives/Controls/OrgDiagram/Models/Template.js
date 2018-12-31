primitives.orgdiagram.Template = function (options, templateConfig) {
	this.templateConfig = null;
	this.itemTemplate = null;
	this.highlightTemplate = null;
	this.dotHighlightTemplate = null;
	this.cursorTemplate = null;

	if (templateConfig != null) {
		this.templateConfig = templateConfig;

		this.itemTemplate = primitives.common.isNullOrEmpty(templateConfig.itemTemplate) ?
			new primitives.common.ItemTemplate(options, templateConfig) :
			new primitives.common.UserTemplate(options, templateConfig.itemTemplate, options.onItemRender);

		this.highlightTemplate = primitives.common.isNullOrEmpty(templateConfig.highlightTemplate) ?
			new primitives.common.HighlightTemplate(options, templateConfig) :
			new primitives.common.UserTemplate(options, templateConfig.highlightTemplate, options.onHighlightRender);

		this.dotHighlightTemplate = new primitives.common.DotHighlightTemplate(options, templateConfig);

		this.cursorTemplate = primitives.common.isNullOrEmpty(templateConfig.cursorTemplate) ?
			new primitives.common.CursorTemplate(options, templateConfig) :
			new primitives.common.UserTemplate(options, templateConfig.cursorTemplate, options.onCursorRender);
	}
};
