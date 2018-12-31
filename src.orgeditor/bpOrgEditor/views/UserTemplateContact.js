primitives.orgeditor.UserTemplateContact = function () {
	this.name = "contactTemplate";

};

primitives.orgeditor.UserTemplateContact.prototype = new primitives.orgeditor.UserTemplate();

primitives.orgeditor.UserTemplateContact.prototype.getTemplate = function () {
	var result = new primitives.orgdiagram.TemplateConfig(),
		itemTemplate;
	result.name = this.name;
	result.itemSize = new primitives.common.Size(180, 120);
	result.minimizedItemSize = new primitives.common.Size(4, 4);
	result.highlightPadding = new primitives.common.Thickness(2, 2, 2, 2);


	itemTemplate = jQuery(
	  '<div class="bp-item bp-corner-all bt-item-frame">'
		+ '<div name="titleBackground" class="bp-item bp-corner-all bp-title-frame" style="top: 2px; left: 2px; width: 176px; height: 20px;">'
			+ '<div name="title" class="bp-item bp-title" style="top: 3px; left: 6px; width: 168px; height: 18px;">'
			+ '</div>'
		+ '</div>'
		+ '<div class="bp-item bp-photo-frame" style="top: 26px; left: 2px; width: 50px; height: 60px;">'
			+ '<img name="photo" style="height:60px; width:50px;" />'
		+ '</div>'
		+ '<div name="phone" class="bp-item" style="top: 26px; left: 56px; width: 122px; height: 18px; font-size: 12px;"></div>'
		+ '<div name="email" class="bp-item" style="top: 44px; left: 56px; width: 122px; height: 18px; font-size: 12px;"></div>'
		+ '<div name="description" class="bp-item" style="top: 62px; left: 56px; width: 122px; height: 36px; font-size: 10px;"></div>'
		+ '<a name="readmorelabel" class="bp-item bp-readmore" style="top: 102px; left: 4px; width: 172px; height: 16px; font-size: 10px;"></a>'
	+ '</div>'
	).css({
		width: result.itemSize.width + "px",
		height: result.itemSize.height + "px"
	});
	result.itemTemplate = itemTemplate.wrap('<div>').parent().html();

	return result;
};

primitives.orgeditor.UserTemplateContact.prototype.onRender = function (event, data, config) {
	var itemConfig = data.context,
		index,
		len,
		fields,
		field,
		newValue,
		element,
		readmorelabel;

	readmorelabel = data.element.find("[name=readmorelabel]");

	switch (data.renderingMode) {
		case primitives.common.RenderingMode.Create:
			/* Initialize widgets here */
			readmorelabel.click(function (e) {
				/* Block mouse click propogation in order to avoid layout updates before server postback*/
				primitives.common.stopPropagation(e);
			});
			break;
		case primitives.common.RenderingMode.Update:
			/* Update widgets here */
			break;
	}

	data.element.find("[name=photo]").attr({ "src": itemConfig.image });
	data.element.find("[name=titleBackground]").css({ "background": itemConfig.itemTitleColor });
	data.element.find("[name=title]").css({ "color": primitives.common.highestContrast(itemConfig.itemTitleColor, config.itemTitleSecondFontColor, config.itemTitleFirstFontColor) });

	fields = ["title", "description", "phone", "email", "readmorelabel"];
	for (index = 0, len = fields.length; index < len; index += 1) {
		field = fields[index];

		element = data.element.find("[name=" + field + "]");
		newValue = itemConfig[field] != null ? itemConfig[field] : "";
		if (element.text() !== newValue) {
			element.text(newValue);
		}
	}

	readmorelabel.css({"visibility": (!primitives.common.isNullOrEmpty(itemConfig.readmorelabel) ? "inherit" : "hidden")});

	if (!primitives.common.isNullOrEmpty(itemConfig.readmoreurl)) {
		readmorelabel.attr({ "href": itemConfig.readmoreurl });
	} else {
		readmorelabel.removeAttr("href");
	}

};