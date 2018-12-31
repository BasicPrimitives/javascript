primitives.common.DotHighlightTemplate = function (options, itemTemplateConfig) {
	var _template = create(itemTemplateConfig);

	function create(config) {
		var radius = config.minimizedItemCornerRadius + config.highlightPadding.left;
		return ["div",
				{
					"style": {
						"borderWidth": config.highlightBorderWidth + "px",
						"MozBorderRadius": radius + "px",
						"WebkitBorderRadius": radius + "px",
						"-khtml-border-radius": radius + "px",
						"borderRadius": radius + "px"
					},
					"class": ["bp-item", "bp-highlight-dot-frame"]
				}
		];
	}

	function template() {
		return _template;
	}

	function getHashCode() {
		return "defaultDotHighlightTemplate";
	}

	function render(event, data) {

	}

	return {
		template: template,
		getHashCode: getHashCode,
		render: render
	};
};