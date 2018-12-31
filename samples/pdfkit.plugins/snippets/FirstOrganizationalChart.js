// create a document and pipe to a blob
var doc = new PDFDocument();
var stream = doc.pipe(blobStream());

doc.fontSize(25)
	.text('Here is first Organizational Chart Plugin', 100, 100);

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

var size = firstOrganizationalChartSample.draw(doc, 100, 150);

doc.restore();

doc.end();