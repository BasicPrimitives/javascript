<!DOCTYPE html> <html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Resize Example</title>
	<link rel="stylesheet" href="../../packages/jquery-ui/jquery-ui.min.css" />
	<script type="text/javascript" src="../../packages/jquery/jquery-3.3.1.min.js"></script>
	<script type="text/javascript" src="../../packages/jquery-ui/jquery-ui.min.js"></script>

	<script type="text/javascript" src="../../packages/codemirror/json3.min.js"></script>

	<!-- jQuery UI Layout -->
	<script type="text/javascript" src="../../packages/jquerylayout/jquery.layout-latest.min.js"></script>
	<link rel="stylesheet" type="text/css" href="../../packages/jquerylayout/layout-default-latest.css" />


	<!-- # include file="../../src.primitives/src.primitives.html"-->

	<link href="../../min/primitives.latest.css?5100" media="screen" rel="stylesheet" type="text/css" />
	<script  type="text/javascript" src="../../min/primitives.min.js?5100"></script>
	<script type="text/javascript" src="../../min/primitives.jquery.min.js?5100"></script>

	<script type="text/javascript">

		var m_timer = null;

		jQuery(document).ready( function () {
			jQuery.ajaxSetup({
				cache: false
			});

			ResizePlaceholder();
			$(window).resize(function () {
				onWindowResize();
			});

			var templates = [];
			templates.push(getContactTemplate());
			
			orgDiagram = jQuery("#orgdiagram").orgDiagram({
				graphicsType: primitives.common.GraphicsType.SVG,
				pageFitMode: primitives.common.PageFitMode.FitToPage,
				verticalAlignment: primitives.common.VerticalAlignmentType.Middle,
				connectorType: primitives.common.ConnectorType.Angular,
				minimalVisibility: primitives.common.Visibility.Dot,
				selectionPathMode: primitives.common.SelectionPathMode.FullStack,
				leavesPlacementType: primitives.common.ChildrenPlacementType.Horizontal,
				hasButtons: primitives.common.Enabled.False,
				hasSelectorCheckbox: primitives.common.Enabled.False,
				templates: templates,
				onButtonClick: onButtonClick,
				onCursorChanging: onCursorChanging,
				onCursorChanged: onCursorChanged,
				onHighlightChanging: onHighlightChanging,
				onHighlightChanged: onHighlightChanged,
				onSelectionChanged: onSelectionChanged,
				onItemRender: onTemplateRender,
				itemTitleFirstFontColor: primitives.common.Colors.White,
				itemTitleSecondFontColor: primitives.common.Colors.White
			});

			jQuery.ajax({
				url: 'phpservice.php',
				dataType: 'text',
				success: function(text) {
					var items = JSON.parse(decodeURIComponent(text));
					items[0].templateName = "contactTemplate";
					orgDiagram.orgDiagram({
						items: items,
						cursorItem: 2
					});
					orgDiagram.orgDiagram("update");
				}
			});
		});

		function onWindowResize() {
			if (m_timer == null) {
				m_timer = window.setTimeout(function () {
					ResizePlaceholder();
					jQuery("#orgdiagram").orgDiagram("update", primitives.common.UpdateMode.Refresh)
					window.clearTimeout(m_timer);
					m_timer = null;
				}, 300);
			}
		}


		function getTreeItem(sourceItem) {
			var result = new primitives.orgdiagram.ItemConfig();
			result.title = sourceItem.title;
			result.description = sourceItem.description;
			result.phone = sourceItem.phone;
			result.email = sourceItem.email;
			result.image = "../images/photos/" +sourceItem.photo;
			result.groupTitle = sourceItem.title;
			result.id = sourceItem.id;
			result.href = "showdetails.php?recordid=" + result.id;
			if (sourceItem.children != null) {
				for (var index = 0; index < sourceItem.children.length; index += 1) {
					result.items.push(getTreeItem(sourceItem.children[index]));
				}
			}
			return result;
		}

		function getContactTemplate() {
			var result = new primitives.orgdiagram.TemplateConfig();
			result.name = "contactTemplate";

			result.itemSize = new primitives.common.Size(220, 120);
			result.minimizedItemSize = new primitives.common.Size(3, 3);
			result.highlightPadding = new primitives.common.Thickness(2, 2, 2, 2);


			var itemTemplate = jQuery(
			  '<div class="bp-item bp-corner-all bt-item-frame">'
				+ '<div class="bp-item bp-corner-all bp-title-frame" style="top: 2px; left: 2px; width: 216px; height: 20px;">'
					+ '<div name="title" class="bp-item bp-title" style="top: 3px; left: 6px; width: 208px; height: 18px;">'
					+ '</div>'
				+ '</div>'
				+ '<div class="bp-item bp-photo-frame" style="top: 26px; left: 2px; width: 50px; height: 60px;">'
					+ '<img name="photo" style="height:60px; width:50px;" />'
				+ '</div>'
				+ '<div name="phone" class="bp-item" style="top: 26px; left: 56px; width: 162px; height: 18px; font-size: 12px;"></div>'
				+ '<div name="email" class="bp-item" style="top: 44px; left: 56px; width: 162px; height: 18px; font-size: 12px;"></div>'
				+ '<div name="description" class="bp-item" style="top: 62px; left: 56px; width: 162px; height: 36px; font-size: 10px;"></div>'
				+ '<a name="readmore" class="bp-item" style="top: 104px; left: 4px; width: 212px; height: 12px; font-size: 10px; font-family: Arial; text-align: right; font-weight: bold; text-decoration: none; z-index:100;">Read more ...</a>'
			+ '</div>'
			).css({
				width: result.itemSize.width + "px",
				height: result.itemSize.height + "px"
			}).addClass("bp-item bp-corner-all bt-item-frame");
			result.itemTemplate = itemTemplate.wrap('<div>').parent().html();

			return result;
		}

		function onTemplateRender(event, data) {
			var hrefElement = data.element.find("[name=readmore]");
			switch (data.renderingMode) {
				case primitives.common.RenderingMode.Create:
					/* Initialize widgets here */
					hrefElement.click(function (e)
					{
						/* Block mouse click propogation in order to avoid layout updates before server postback*/
						primitives.common.stopPropagation(e);
					});
					break;
				case primitives.common.RenderingMode.Update:
					/* Update widgets here */
					break;
			}

			var itemConfig = data.context;

			if (data.templateName == "contactTemplate") {
				data.element.find("[name=photo]").attr({ "src": itemConfig.image });

				var fields = ["title", "description", "phone", "email"];
				for (var index = 0; index < fields.length; index += 1) {
					var field = fields[index];

					var element = data.element.find("[name=" + field + "]");
					if (element.text() != itemConfig[field]) {
						element.text(itemConfig[field]);
					}
				}
			}
			hrefElement.attr({ "href": itemConfig.href });
		}

		function onSelectionChanged(e, data) {
			var selectedItems = jQuery("#centerpanel").orgDiagram("option", "selectedItems");
			var message = "";
			for (var index = 0; index < selectedItems.length; index += 1) {
				var itemConfig = selectedItems[index];
				if (message != "") {
					message += ", ";
				}
				message += "<b>'" + itemConfig.title + "'</b>";
			}
			message += (data.parentItem != null ? " Parent item <b>'" + data.parentItem.title + "'" : "");
			jQuery("#southpanel").empty().append("User selected following items: " + message);
		}

		function onHighlightChanging(e, data) {
			var message = (data.context != null) ? "User is hovering mouse over item <b>'" + data.context.title + "'</b>." : "";
			message += (data.parentItem != null ? " Parent item <b>'" + data.parentItem.title + "'" : "");

			jQuery("#southpanel").empty().append(message);
		}

		function onHighlightChanged(e, data) {
			var message = (data.context != null) ? "User hovers mouse over item <b>'" + data.context.title + "'</b>." : "";
			message += (data.parentItem != null ? " Parent item <b>'" + data.parentItem.title + "'" : "");

			jQuery("#southpanel").empty().append(message);
		}

		function onCursorChanging(e, data) {
			var message = "User is clicking on item '" + data.context.title + "'.";
			message += (data.parentItem != null ? " Parent item <b>'" + data.parentItem.title + "'" : "");

			jQuery("#southpanel").empty().append(message);

			data.oldContext.templateName = null;
			data.context.templateName = "contactTemplate";
		}

		function onCursorChanged(e, data) {
			var message = "User clicked on item '" + data.context.title + "'.";
			message += (data.parentItem != null ? " Parent item <b>'" + data.parentItem.title + "'" : "");
			jQuery("#southpanel").empty().append(message);
		}

		function onButtonClick(e, data) {
			var message = "User clicked <b>'" + data.name + "'</b> button for item <b>'" + data.context.title + "'</b>.";
			message += (data.parentItem != null ? " Parent item <b>'" + data.parentItem.title + "'" : "");
			jQuery("#southpanel").empty().append(message);
		}

		function ResizePlaceholder() {
			var bodyWidth = $(window).width() - 40
			var bodyHeight = $(window).height() - 40
			var titleHeight = 40;
			jQuery("#menu").css(
			{
				"width": bodyWidth + "px",
				"height": titleHeight + "px"
			});

			jQuery("#westpanel").css(
			{
				"left": "0px",
				"width": "200px",
				"height": (bodyHeight - titleHeight) + "px",
				"top": titleHeight + "px"
			});

			jQuery("#orgdiagram").css(
			{
				"left": "200px",
				"width": (bodyWidth - 200) + "px",
				"height": (bodyHeight - titleHeight) + "px",
				"top": titleHeight + "px"
			});
		}
	</script>
</head>
<body style="padding: 0; margin: 0; font-size:12px">
	<div id="menu" style="left:150px; width: 640px; height: 45px; padding: 0px; margin: 0px; overflow: hidden;">
		<h2>PHP Demo</h2>
	</div>
	<div id="westpanel" style="position: absolute; padding: 0px; margin: 0px; border-style: solid; font-size: 12px; border-color: grey; border-width: 1px; overflow: scroll;">
		<h2>Hierarchy Chart PHP Demo</h2>
		<p>This demo requires PHP 5.2 & MySQL connection.</p>
		<p>Create test database from mysqldump folder and edit connection string in header of this PHP file.</p>
		<p>Cancel mouse events propogation before sending post back to server. See reference of event arguments</p>
	</div>
	<div id="orgdiagram" style="position: absolute; overflow: hidden; left: 0px; padding: 0px; margin: 0px; border-style: solid; border-color: navy; border-width: 1px;"></div>
</body>
</html>
