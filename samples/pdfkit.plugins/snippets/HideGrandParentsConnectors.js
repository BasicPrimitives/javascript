// create a document and pipe to a blob
var doc = new PDFDocument();
var stream = doc.pipe(blobStream());

doc.fontSize(25)
  .text('Family Diagram Having Hidden Grand Parent Connections', 100, 100);

var firstOrganizationalChartSample = primitives.pdf.famdiagram.Plugin({
  items: [
    { id: 1, title: "David Dalton", groupTitle: "1", label: "David Dalton", description: "1, Chief Executive Officer (CEO)", phone: "352-206-7599", email: "davidalt@name.com", image: photos.q, itemTitleColor: "#4169e1" },
    { id: 2, parents: [1], title: "Steven Lacombe", groupTitle: "2", label: "Steven Lacombe", description: "2, GM, Platform Strategy", phone: "805-800-7397", email: "stevlaco@name.com", image: photos.a, itemTitleColor: "#4b0082" },
    { id: 3, parents: [1], title: "Nancy Smith", label: "Nancy Smith", description: "3, GM, Strategic Marketing and Communications", phone: "631-787-3495", email: "nancsmit@name.com", image: photos.s, itemTitleColor: "#4b0082" },
    { id: 4, parents: [1, 2, 3], title: "Ann Smith", label: "Nancy Smith", description: "4, GM, Strategic Marketing and Communications", phone: "631-787-3495", email: "nancsmit@name.com", image: photos.s, itemTitleColor: "#4b0082" }
  ],
  cursorItem: 2,
  linesWidth: 1,
  linesColor: "black",
  hasSelectorCheckbox: primitives.common.Enabled.False,
  hideGrandParentsConnectors: true,
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