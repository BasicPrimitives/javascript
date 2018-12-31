// create a document and pipe to a blob
var sample3 = primitives.pdf.orgdiagram.Plugin({
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
			title: "Ted Lucas 1",
			description: "VP, Human Resources",
			image: photos.b
		}),
		new primitives.orgdiagram.ItemConfig({
			id: 2,
			parent: 0,
			title: "Fritz Stuger 2",
			description: "Business Solutions, US",
			image: photos.c
		}),new primitives.orgdiagram.ItemConfig({
			id: 3,
			parent: 0,
			title: "Fritz Stuger 3",
			description: "Business Solutions, US",
			image: photos.c
		}),new primitives.orgdiagram.ItemConfig({
			id: 4,
			parent: 0,
			title: "Fritz Stuger 4",
			description: "Business Solutions, US",
			image: photos.c
		}),new primitives.orgdiagram.ItemConfig({
			id: 5,
			parent: 0,
			title: "Fritz Stuger 5",
			description: "Business Solutions, US",
			image: photos.c
		}),new primitives.orgdiagram.ItemConfig({
			id: 6,
			parent: 0,
			title: "Fritz Stuger 6",
			description: "Business Solutions, US",
			image: photos.c
		}),new primitives.orgdiagram.ItemConfig({
			id: 7,
			parent: 0,
			title: "Fritz Stuger 7",
			description: "Business Solutions, US",
			image: photos.c
		}),new primitives.orgdiagram.ItemConfig({
			id: 8,
			parent: 0,
			title: "Fritz Stuger 8",
			description: "Business Solutions, US",
			image: photos.c
		}),new primitives.orgdiagram.ItemConfig({
			id: 9,
			parent: 0,
			title: "Fritz Stuger 9",
			description: "Business Solutions, US",
			image: photos.c
		}),new primitives.orgdiagram.ItemConfig({
			id: 10,
			parent: 2,
			title: "Fritz Stuger 10",
			description: "Business Solutions, US",
			image: photos.c
		}),new primitives.orgdiagram.ItemConfig({
			id: 11,
			parent: 3,
			title: "Fritz Stuger 11",
			description: "Business Solutions, US",
			image: photos.c
		}),new primitives.orgdiagram.ItemConfig({
			id: 12,
			parent: 10,
			title: "Fritz Stuger 12",
			description: "Business Solutions, US",
			image: photos.c
		}),new primitives.orgdiagram.ItemConfig({
			id: 14,
			parent: 12,
			title: "Fritz Stuger 14",
			description: "Business Solutions, US",
			image: photos.c
		}),new primitives.orgdiagram.ItemConfig({
			id: 15,
			parent: 14,
			title: "Fritz Stuger 15",
			description: "Business Solutions, US",
			image: photos.c
		}),new primitives.orgdiagram.ItemConfig({
			id: 16,
			parent: 15,
			title: "Fritz Stuger 16",
			description: "Business Solutions, US",
			image: photos.c
		}),new primitives.orgdiagram.ItemConfig({
			id: 17,
			parent: 16,
			title: "Fritz Stuger 17",
			description: "Business Solutions, US",
			image: photos.c
		}),new primitives.orgdiagram.ItemConfig({
			id: 18,
			parent: 17,
			title: "Fritz Stuger 18",
			description: "Business Solutions, US",
			image: photos.c
		})

	],
	annotations: [
	{
		annotationType: primitives.common.AnnotationType.Connector,
		fromItem: 9,
		toItem: 18,
		label: "PDF document sized to fit organizational diagram",
		labelSize: { width: 200, height: 200 }, //new primitives.common.Size(80, 30)
		connectorShapeType: primitives.common.ConnectorShapeType.BothWay,
		connectorPlacementType: primitives.common.ConnectorPlacementType.Straight,
		color: primitives.common.Colors.Red,
		offset: -30,
		lineWidth: 2,
		lineType: primitives.common.LineType.Solid
	}
	],
	cursorItem: null,
	hasSelectorCheckbox: primitives.common.Enabled.False
});

var sample3size = sample3.getSize();

var doc = new PDFDocument({ size: [sample3size.width + 100, sample3size.height + 150] });
var stream = doc.pipe(blobStream());

doc.save();

// draw some text
doc.fontSize(25)
	.text('Autosized page containing Organizational Chart ...', 50, 50);

sample3.draw(doc, 50, 100);

doc.restore();

doc.end();