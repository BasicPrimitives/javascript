// create a document and pipe to a blob
var doc = new PDFDocument();
var stream = doc.pipe(blobStream());

doc.fontSize(25)
  .text('Family Diagram Items Order', 100, 100);

var firstOrganizationalChartSample = primitives.pdf.famdiagram.Plugin({
  items: [
    { id: 2, title: "Steven Lacombe", label: "Steven Lacombe", description: "Id: 2", image: photos.b, itemTitleColor: "#4b0082" },
    { id: 10, relativeItem: 2, placementType: primitives.common.AdviserPlacementType.Left, position: 1, title: "Roger Dalton", label: "Roger Dalton", description: "Id: 10", image: photos.a, itemTitleColor: "#4169e1" },
    { id: 11, relativeItem: 2, placementType: primitives.common.AdviserPlacementType.Right, position: 1, title: "Bill Dalton", label: "Bill Dalton", description: "Id: 11", image: photos.c, itemTitleColor: "#4b0082" },
    { id: 1, parents: [11], title: "David Dalton", label: "David Dalton", description: "Id: 1", image: photos.c, itemTitleColor: "#4b0082" },
    { id: 3, parents: [10], title: "Ann Smith", label: "Ann Smith", description: "Id: 3", image: photos.a, itemTitleColor: "#4169e1" },
    { id: 4, parents: [2], title: "Nancy Smith", label: "Nancy Smith", description: "Id: 4", image: photos.c, itemTitleColor: "#4b0082" },
    { id: 5, parents: [2], title: "Helly Smith", label: "Helly Smith", description: "Id: 5", image: photos.a, itemTitleColor: "#4169e1" },
    { id: 6, parents: [1, 4], title: "Kelly Smith", label: "Kelly Smith", description: "Id: 6", image: photos.c, itemTitleColor: "#4b0082" },
    { id: 7, parents: [5, 3], title: "Sally Smith", label: "Sally Smith", description: "Id: 7", image: photos.a, itemTitleColor: "#4169e1" }
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
  arrowsDirection: primitives.common.GroupByType.Parents,
  enableMatrixLayout: true,
  minimumMatrixSize: 2,
  maximumColumnsInMatrix: 4
});

var size = firstOrganizationalChartSample.draw(doc, 50, 150);

doc.restore();

doc.end();