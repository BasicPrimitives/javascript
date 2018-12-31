// create a document and pipe to a blob
var doc = new PDFDocument();
var stream = doc.pipe(blobStream());

doc.fontSize(25)
	.text('Here is first Family Chart Plugin', 100, 100);

var firstOrganizationalChartSample = primitives.pdf.famdiagram.Plugin({
	items: [
		{ id: 1, spouses: [2], title: "Thomas Williams", label: "Thomas Williams", description: "1, 1st husband", image: photos.t },
		{ id: 2, spouses: [], title: "Mary Spencer", label: "Mary Spencer", description: "2, The Mary", image: photos.m },
		{ id: 3, spouses: [2], title: "David Kirby", label: "David Kirby", description: "3, 2nd Husband", image: photos.d },
		{ id: 4, parents: [1, 2], title: "Brad Williams", label: "Brad Williams", description: "4, 1st son", image: photos.b },
		{ id: 5, parents: [2, 3], spouses: [6, 7], title: "Mike Kirby", label: "Mike Kirby", description: "5, 2nd son, having 2 spouses", image: photos.m },
		{ id: 6, title: "Lynette Maloney", label: "Lynette Maloney", description: "5, Spouse I", image: photos.m },
		{ id: 7, title: "Sara Kemp", label: "Sara Kemp", description: "5, Spouse II :-)", image: photos.s },
		{ id: 8, parents: [7], title: "Leon Kemp", label: "Leon Kemp", description: "5, Orphant", image: photos.l }
	],
	cursorItem: 2,
	linesWidth: 1,
	linesColor: "black",
	hasSelectorCheckbox: primitives.common.Enabled.False,
	normalLevelShift: 20,
	dotLevelShift: 20,
	lineLevelShift: 20,
	normalItemsInterval: 10,
	dotItemsInterval: 10,
	lineItemsInterval: 10,
	arrowsDirection: primitives.common.GroupByType.Parents
});

var size = firstOrganizationalChartSample.draw(doc, 50, 150);

doc.restore();

doc.end();