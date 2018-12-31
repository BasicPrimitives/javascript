// create a document and pipe to a blob
var sample3 = primitives.pdf.famdiagram.Plugin({
	dotItemsInterval: 20,
	lineItemsInterval: 40,
	linesWidth: 1,
	linesColor: "black",
	linesPalette: [
		{ lineColor: "#C6C6C6", lineWidth: 1, lineType: primitives.common.LineType.Solid }, //1
		{ lineColor: "#A5A5A5", lineWidth: 1, lineType: primitives.common.LineType.Solid }, //4
		{ lineColor: "#848484", lineWidth: 1, lineType: primitives.common.LineType.Solid }, //7
		{ lineColor: "#646464", lineWidth: 1, lineType: primitives.common.LineType.Solid }, //10
		{ lineColor: "#454545", lineWidth: 1, lineType: primitives.common.LineType.Solid } //13
	],
	itemTitleFirstFontColor: primitives.common.Colors.White,
	itemTitleSecondFontColor: primitives.common.Colors.White,
	highlightLinesColor: primitives.common.Colors.Orange,
	cursorItem: 5,
	normalLevelShift: 20,
	dotLevelShift: 20,
	lineLevelShift: 20,
	normalItemsInterval: 20,
	hasSelectorCheckbox: primitives.common.Enabled.False,
	annotations: [
		{
			annotationType: primitives.common.AnnotationType.Connector,
			fromItem: 1,
			toItem: 15,
			label: "Connector annotation",
			labelSize: { width: 80, height: 30 }, //new primitives.common.Size(80, 30)
			connectorShapeType: primitives.common.ConnectorShapeType.OneWay,
			color: primitives.common.Colors.Red,
			offset: 5,
			lineWidth: 2,
			lineType: primitives.common.LineType.Dashed
		}
	],
	items: [
		{ id: 1, title: "David Dalton", label: "David Dalton", description: "1, Chief Executive Officer (CEO)", phone: "352-206-7599", email: "davidalt@name.com", image: photos.q, itemTitleColor: "#4169e1" },
		{ id: 2, title: "Jeanna White", label: "Jeanna White", description: "2, Co-Presidents, Platform Products & Services Division", phone: "505-791-1689", email: "jeanwhit@name.com", image: photos.w, itemTitleColor: "#4b0082" },
		{ id: 4, title: "Thomas Williams", label: "Thomas Williams", description: "4, VP, Server & Tools Marketing and Solutions", phone: "904-547-5342", email: "thomwill@name.com", image: photos.r, itemTitleColor: "#4b0082" },
		{ id: 5, title: "David Kirby", label: "David Kirby", description: "5, GM, Infrastructure Server and IT Pro Audience Marketing", phone: "614-395-7238", email: "davikirb@name.com", image: photos.t, itemTitleColor: "#4b0082" },
		{ id: 6, title: "Lynette Maloney", label: "Lynette Maloney", description: "6, GM, Name.com Experience Platforms and Solutions", phone: "540-822-3862", email: "lynemalo@name.com", image: photos.y, itemTitleColor: "#4b0082" },

		{ id: 11, title: "Steven Lacombe", label: "Steven Lacombe", description: "11, GM, Platform Strategy", phone: "805-800-7397", email: "stevlaco@name.com", image: photos.a, itemTitleColor: "#4b0082", parents: [1, 2] },
		{ id: 12, title: "Nancy Smith", label: "Nancy Smith", description: "12, GM, Strategic Marketing and Communications", phone: "631-787-3495", email: "nancsmit@name.com", image: photos.s, itemTitleColor: "#4b0082", parents: [1, 2] },

		{ id: 13, title: "Jean Kendall", label: "Jean Kendall", description: "13, GM, DML Server Marketing", phone: "949-453-0415", email: "jeankend@name.com", image: photos.d, itemTitleColor: "#4b0082", parents: [4, 5] },
		{ id: 14, title: "Brad Whitt", label: "Brad Whitt", description: "14, GM, Application Platform and Development Marketing", phone: "502-528-6379", email: "bradwhit@name.com", image: photos.f, itemTitleColor: "#4b0082", parents: [4, 5] },

		{ id: 15, title: "Sara Kemp", label: "Sara Kemp", description: "15, VP, Software & Enterprise Management Division", phone: "918-257-4218", email: "sarakemp@name.com", image: photos.g, itemTitleColor: "#4b0082", parents: [5, 6] },
		{ id: 16, title: "Brian Cruz", label: "Brian Cruz", description: "16, GM, Systems Management Server", phone: "320-833-9024", email: "briacruz@name.com", image: photos.h, itemTitleColor: "#4b0082", parents: [5, 6] },
		{ id: 17, title: "John Drake", label: "John Drake", description: "17, GM, Software Management", phone: "469-644-8543", email: "johndrak@name.com", image: photos.j, itemTitleColor: "#4b0082", parents: [5, 6] },

		{ id: 18, title: "Thomas Dixon", label: "Thomas Dixon", description: "20, GM, Operations Manager", phone: "651-249-4047", email: "thomdixo@name.com", image: photos.z, itemTitleColor: "#4b0082", parents: [11, 13] },
		{ id: 19, title: "George Duong", label: "George Duong", description: "21, Sr. VP, Software Server System", phone: "434-406-2189", email: "georduon@name.com", image: photos.x, itemTitleColor: "#4b0082", parents: [11, 13] },

		{ id: 20, title: "Ralph Mercer", label: "Ralph Mercer", description: "22, GM, DML Server Strategy", phone: "814-327-5895", email: "ralpmerc@name.com", image: photos.c, itemTitleColor: "#4b0082", parents: [12, 15] },
		{ id: 21, title: "Howard Williams", label: "Howard Williams", description: "23, GM, User Experience", phone: "703-740-8612", email: "howawill@name.com", image: photos.v, itemTitleColor: "#4b0082", parents: [12, 15] },

		{ id: 22, title: "Nathalie Escobedo", label: "Nathalie Escobedo", description: "24, GM, DML Server Business Intelligence", phone: "504-555-8165", email: "nathesco@name.com", image: photos.b, itemTitleColor: "#4b0082", parents: [14, 17] },
		{ id: 23, title: "Ashley Rue", label: "Ashley Rue", description: "25, VP, Developer Division", phone: "515-324-4969", email: "ashlrue@name.com", image: photos.n, itemTitleColor: "#4b0082", parents: [14, 17] }
	]
});

var sample3size = sample3.getSize();

var doc = new PDFDocument({ size: [sample3size.width + 100, sample3size.height + 150] });
var stream = doc.pipe(blobStream());

doc.save();

// draw some text
doc.fontSize(25)
	.text('Autosized page containing Family Chart ...', 50, 50);

sample3.draw(doc, 50, 100);

doc.restore();

doc.end();