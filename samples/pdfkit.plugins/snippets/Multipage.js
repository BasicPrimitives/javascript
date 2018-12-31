// create a document and pipe to a blob
var doc = new PDFDocument();
var stream = doc.pipe(blobStream());

// draw some text
doc.fontSize(25)
	.text('Here is some vector graphics...', 100, 30);

// some vector graphics
doc.save()
	.moveTo(100, 100)
	.lineTo(100, 200)
	.lineTo(200, 200)
	.fill("#FF3300");

doc.circle(280, 150, 50)
	.fill("#6600FF");

// an SVG path
doc.scale(0.6)
	.translate(470, 50)
	.path('M 250,75 L 323,301 131,161 369,161 177,301 z')
	.fill('red', 'even-odd')
	.restore();

// draw some text
doc.fontSize(25)
	.text('Here is first Organizational Chart :-)', 100, 280);

var firstOrganizationalChartSample = primitives.pdf.orgdiagram.Plugin({
	items: [
		new primitives.orgdiagram.ItemConfig({
			id: 0,
			parent: null,
			title: "Scott Aasrud",
			description: "VP, Public Sector",
			image: photos.a
		}),
		new primitives.orgdiagram.ItemConfig({
			id: 1,
			parent: 0,
			title: "Ted Lucas",
			description: "VP, Human Resources",
			image: photos.b
		}),
		new primitives.orgdiagram.ItemConfig({
			id: 2,
			parent: 0,
			title: "Joao Stuger",
			description: "Business Solutions, US",
			image: photos.c
		})
	],
	cursorItem: null,
	hasSelectorCheckbox: primitives.common.Enabled.False
});

var size = firstOrganizationalChartSample.draw(doc, 150, 300);

var lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl. Suspendisse rhoncus nisl posuere tortor tempus et dapibus elit porta. Cras leo neque, elementum a rhoncus ut, vestibulum non nibh. Phasellus pretium justo turpis. Etiam vulputate, odio vitae tincidunt ultricies, eros odio dapibus nisi, ut tincidunt lacus arcu eu elit. Aenean velit erat, vehicula eget lacinia ut, dignissim non tellus. Aliquam nec lacus mi, sed vestibulum nunc. Suspendisse potenti. Curabitur vitae sem turpis. Vestibulum sed neque eget dolor dapibus porttitor at sit amet sem. Fusce a turpis lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;\nMauris at ante tellus. Vestibulum a metus lectus. Praesent tempor purus a lacus blandit eget gravida ante hendrerit. Cras et eros metus. Sed commodo malesuada eros, vitae interdum augue semper quis. Fusce id magna nunc. Curabitur sollicitudin placerat semper. Cras et mi neque, a dignissim risus. Nulla venenatis porta lacus, vel rhoncus lectus tempor vitae. Duis sagittis venenatis rutrum. Curabitur tempor massa tortor.';

// and some justified text wrapped into columns
doc.fontSize(25)
	.text('And here is some wrapped text...', 100, 300 + size.height + 10)
	.font('Times-Roman', 13)
	.moveDown()
	.text(lorem, {
		width: 412,
		align: 'justify',
		indent: 30,
		columns: 2,
		height: 120,
		ellipsis: true
	});

doc.addPage();

doc.fontSize(25)
	.text('Annotations ...', 100, 50);

var shapeAnnotationsSample = primitives.pdf.orgdiagram.Plugin({
	cursorItem: 1,
	highlightItem: 2,
	hasSelectorCheckbox: primitives.common.Enabled.True,
	selectedItems: [1, 2],
	items: [
		/* JSON noname objects equivalent to primitives.orgdiagram.ItemConfig */
		{ id: 0, parent: null, title: "Scott Aasrud", description: "VP, Public Sector", image: photos.a },
		{ id: 1, parent: 0, title: "Ted Lucas", description: "VP, Human Resources", image: photos.b },
		{ id: 2, parent: 0, title: "Joao Stuger", description: "Business Solutions, US", image: photos.c },
		{ id: 3, parent: 0, title: "Mike Wazowski", description: "Business Analyst, Canada", image: photos.o },
		{ id: 4, parent: 3, title: "Best Friend", description: "Business Analyst, Mexico", image: photos.f }
	],
	annotations: [
		/* JSON noname object equivalent to primitives.orgdiagram.ConnectorAnnotationConfig */
		{
			annotationType: primitives.common.AnnotationType.Shape,
			items: [0],
			label: "Oval",
			labelSize: new primitives.common.Size(50, 30),
			labelPlacement: primitives.common.PlacementType.Right,
			shapeType: primitives.common.ShapeType.Oval,
			borderColor: primitives.common.Colors.Green,
			offset: new primitives.common.Thickness(2, 2, 2, 2),
			lineWidth: 2,
			selectItems: true,
			lineType: primitives.common.LineType.Dashed
		},
		/* JSON noname object equivalent to primitives.orgdiagram.ConnectorAnnotationConfig */
		{
			annotationType: primitives.common.AnnotationType.Shape,
			items: [2, 3],
			label: "Cross Out",
			labelSize: { width: 50, height: 30 },
			labelPlacement: primitives.common.PlacementType.Right,
			shapeType: primitives.common.ShapeType.CrossOut,
			borderColor: primitives.common.Colors.Navy,
			offset: { left: 2, top: 2, right: 2, bottom: 2 },
			lineWidth: 2,
			selectItems: true,
			lineType: primitives.common.LineType.Dashed
		},
		/* prototype based instantiation */
		new primitives.orgdiagram.ShapeAnnotationConfig({
			items: [1],
			label: "Triangle",
			labelSize: new primitives.common.Size(70, 30),
			labelPlacement: primitives.common.PlacementType.Bottom,
			shapeType: primitives.common.ShapeType.Triangle,
			borderColor: primitives.common.Colors.Red,
			offset: new primitives.common.Thickness(2, 2, 2, 2),
			lineWidth: 2,
			selectItems: true,
			lineType: primitives.common.LineType.Dashed
		})
		,
		new primitives.orgdiagram.BackgroundAnnotationConfig({
			items: [2, 3],
			borderColor: "#f8e5f9",
			fillColor: "#e5f9f8",
			lineWidth: 2,
			selectItems: true,
			includeChildren: true,
			lineType: primitives.common.LineType.Dotted
		})
	],
	cursorItem: 0,
	hasSelectorCheckbox: primitives.common.Enabled.True,
	normalItemsInterval: 40 /* defines padding around items of background annotations*/
});

size = shapeAnnotationsSample.draw(doc, 50, 70);

var connectorAnnotationsSample = primitives.pdf.orgdiagram.Plugin({
	items: [
		/* JSON noname objects equivalent to primitives.orgdiagram.ItemConfig */
		{ id: 0, parent: null, title: "Scott Aasrud", description: "VP, Public Sector", image: photos.a },
		{ id: 1, parent: 0, title: "Ted Lucas", description: "VP, Human Resources", image: photos.b },
		{ id: 2, parent: 0, title: "Joao Stuger", description: "Business Solutions, US", image: photos.c }
	],
	annotations: [
		/* JSON noname object equivalent to primitives.orgdiagram.ConnectorAnnotationConfig */
		{
			annotationType: primitives.common.AnnotationType.Connector,
			fromItem: 0,
			toItem: 2,
			label: "2",
			labelSize: { width: 80, height: 30 },
			connectorShapeType: primitives.common.ConnectorShapeType.OneWay,
			color: primitives.common.Colors.Green,
			offset: 0,
			lineWidth: 2,
			lineType: primitives.common.LineType.Dashed,
			selectItems: false
		},
		/* prototype based instantiation */
		new primitives.orgdiagram.ConnectorAnnotationConfig({
			fromItem: 0,
			toItem: 1,
			label: "1",
			labelSize: new primitives.common.Size(80, 30),
			connectorShapeType: primitives.common.ConnectorShapeType.OneWay,
			color: primitives.common.Colors.Red,
			offset: 0,
			lineWidth: 2,
			lineType: primitives.common.LineType.Dashed,
			selectItems: false
		})
	],
	cursorItem: 0,
	hasSelectorCheckbox: primitives.common.Enabled.False,
	arrowsDirection: primitives.common.GroupByType.Parents
});

connectorAnnotationsSample.draw(doc, 150, 50 + size.height);

doc.addPage();

doc.fontSize(25)
	.text('Group title sample ...', 100, 50);

var groupTitleSample = primitives.pdf.orgdiagram.Plugin({
	cursorItem: 1,
	highlightItem: 2,
	hasSelectorCheckbox: primitives.common.Enabled.True,
	selectedItems: [1, 2],
	items: [
			new primitives.orgdiagram.ItemConfig({
				id: 0,
				parent: null,
				title: "Scott Aasrud",
				description: "Parent Item",
				image: photos.a
			}),
			new primitives.orgdiagram.ItemConfig({
				id: 1,
				parent: 0,
				itemType: primitives.orgdiagram.ItemType.Adviser,
				adviserPlacementType: primitives.common.AdviserPlacementType.Right,
				title: "Robert Canon",
				description: "Adviser item",
				groupTitle: "Adviser",
				image: photos.b
			}),
			new primitives.orgdiagram.ItemConfig({
				id: 2,
				parent: 0,
				itemType: primitives.orgdiagram.ItemType.Assistant,
				adviserPlacementType: primitives.common.AdviserPlacementType.Right,
				title: "Ted Lucas",
				description: "Assitant Item",
				groupTitle: "Assistant",
				image: photos.c
			}),
			new primitives.orgdiagram.ItemConfig({
				id: 3,
				parent: 0,
				title: "Joao Stuger",
				description: "Regular Item",
				groupTitle: "Regular",
				image: photos.d
			})
	]
});

groupTitleSample.draw(doc, 100, 100);

doc.restore();

doc.end();