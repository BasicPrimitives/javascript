primitives.orgeditor.UserTemplateInvisible = function () {
	this.name = "invisibleTemplate";

};

primitives.orgeditor.UserTemplateInvisible.prototype = new primitives.orgeditor.UserTemplate();

primitives.orgeditor.UserTemplateInvisible.prototype.getTemplate = function () {
	var result = new primitives.orgdiagram.TemplateConfig(),
		itemTemplate;
	result.name = this.name;
	result.itemSize = new primitives.common.Size(120, 100);
	result.minimizedItemSize = new primitives.common.Size(4, 4);
	result.highlightPadding = new primitives.common.Thickness(2, 2, 2, 2);


	itemTemplate = jQuery(
	  '<div class="bp-item bp-corner-all bt-item-frame">'
		+ '<div class="bp-item" style="top: 4px; left: 4px; width: 112px; height: 92px; font-size: 10px;">'
		+ 'This item is invisible to user and its children logically belong to its first visible parent.'
		+ '</div>'
	+ '</div>'
	).css({
		width: result.itemSize.width + "px",
		height: result.itemSize.height + "px"
	});
	result.itemTemplate = itemTemplate.wrap('<div>').parent().html();

	return result;
};

primitives.orgeditor.UserTemplateInvisible.prototype.onRender = function (event, data, config) {
	var itemConfig = data.context;

	data.element.find("[name=title]").text(itemConfig.title);
};