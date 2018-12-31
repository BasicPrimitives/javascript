// create a document and pipe to a blob
var doc = new PDFDocument();
var stream = doc.pipe(blobStream());

doc.fontSize(25)
	.text('User Item Template With Shapes', 100, 100);

var firstOrganizationalChartSample = primitives.pdf.orgdiagram.Plugin({
	items: [
		new primitives.orgdiagram.ItemConfig({
			id: 0,
			parent: null,
			title: "Scott Aasrud",
			description: "VP, Public Sector",
			templateName: "contactTemplate",
			shapeType: primitives.common.ShapeType.Oval,
			fillColor: primitives.common.Colors.Magenta,
			groupTitle: "Oval"
		}),
		new primitives.orgdiagram.ItemConfig({
			id: 1,
			parent: 0,
			title: "Ted Lucas",
			description: "VP, Human Resources",
			templateName: "contactTemplate",
			shapeType: primitives.common.ShapeType.Rhombus,
			fillColor: primitives.common.Colors.Magenta,
			groupTitle: "Rhombus"
		}),
		new primitives.orgdiagram.ItemConfig({
			id: 2,
			parent: 0,
			title: "Fritz Stuger",
			description: "Business Solutions, US",
			templateName: "contactTemplate",
			shapeType: primitives.common.ShapeType.Circle,
			fillColor: primitives.common.Colors.Magenta,
			groupTitle: "Circle"
		})
	],
	cursorItem: null,
	hasSelectorCheckbox: primitives.common.Enabled.False,
	templates: [getContactTemplate()],
	onItemRender: onTemplateRender
});

 function drawShape(doc, positionX, positionY, width, height, userOptions) {
     var position,
         graphics,
         linePaletteItem,
         marker,
         buffer,
		 options = new primitives.shape.Config();
		
	 // merge user options
	 if(typeof userOptions == "object") {
		 for(var key in options) {
			 if(userOptions.hasOwnProperty(key)) {
				 options[key] = userOptions[key];
			 }
		 }
	 }

	 graphics = new primitives.pdf.graphics(doc);

	 doc.save();

	 position = new primitives.common.Rect(positionX, positionY, width, height).offset(options.offset);

	 linePaletteItem = new primitives.common.PaletteItem({
	     lineColor: options.borderColor,
	     lineWidth: options.lineWidth,
	     lineType: options.lineType,
	     fillColor: options.fillColor,
	     opacity: options.opacity
	 });

	 marker = new primitives.common.Marker();
	 buffer = new primitives.common.PolylinesBuffer();
	 marker.draw(buffer, options.shapeType, position, linePaletteItem);

	 graphics.polylinesBuffer(buffer);

	 doc.restore();
 };

function getContactTemplate() {
	var result = new primitives.orgdiagram.TemplateConfig();
	result.name = "contactTemplate";
	result.itemTemplate = "Use onItemRener method.";
	result.itemSize = new primitives.common.Size(100, 100);
	result.highlightPadding = new primitives.common.Thickness(2, 2, 2, 2);
	return result;
}

function onTemplateRender(doc, position, data) {
	var itemConfig = data.context;

	if (data.templateName == "contactTemplate") {
		var contentSize = new primitives.common.Size(100, 100);

		contentSize.width -= 2;
		contentSize.height -= 2;

		doc.save();

		/* item border */
		doc.roundedRect(position.x, position.y, position.width, position.height, 0)
			.lineWidth(1)
			.stroke('#dddddd');

		/* shape */
		drawShape(doc, position.x, position.y, 100, 100, {
		    shapeType: itemConfig.shapeType,
		    lineType: primitives.common.LineType.Solid,
		    borderColor: primitives.common.Colors.Navy,
		    offset: -5,
		    lineWidth: 3,
		    fillColor: itemConfig.fillColor,
		    cornerRadius: 0
		});

		/* title */
		doc.fillColor('Black')
			.font('Helvetica', 12)
			.text(itemConfig.title, position.x, position.y + 45, {
				ellipsis: true,
				width: (contentSize.width - 4),
				height: 16,
				align: 'center'
			});

		doc.restore();
	}
}



var size = firstOrganizationalChartSample.draw(doc, 100, 150);

doc.restore();

doc.end();