# PDFkit Specific Use Cases

See [PDFkit](www.PDFkit.org) (MIT License) site for reference of how to create PDF documents with PDFKit library.

## Sizing PDF Page to accomodate Diagram

Basic Primitives Organizational Chart PDFkit plugin is just a rendering function, which renders diagram using PDFkit API methods:

PDF document is very flexible, it is easy to scale PDF document to make it fit to paper size or split it to multiple pages. So we don't need to make diagram fit some fixed predefined paper size, but in order to avoid it being cut by PDF page boundaries we have to measure diagram size first and then create PDF page of approapriate size.

```JavaScript
var sampleSize = samfirstOrganizationalChartSampleple3.getSize();
```

`getSize` method returns diagram size, so we can create new PDF document big enough to accomodate our diagram:

```JavaScript
var doc = new PDFDocument({ size: [sampleSize.width + 100, sampleSize.height + 150] });
```

Plugins don't support autosizing of diagram in PDF Document for a reason. First of all, PDFKit provides context transformations, so developer can rotate and scale anything we draw, so diagram is not an exception. If we need to scale diagram into Page size, most likly we would change item templates in order to make them look nice for the given scale, so diagram placement, rotation and scaling is solely developers responsibility. 

[Organizational Diagram](pdfkit.plugins/AutoSizeOrgDiagram.html)
[Family Diagram](pdfkit.plugins/AutoSizeFamDiagram.html)

## Diagram Size

PDF documents are supposed to be conventional printable files having content deliberatly split into pages for convinient printing. So in order to add content below diagram we need to know size of the diagram, so we can properly offset elements:

``` JavaScript
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
```

Pay attention that `draw` method returns actual `size` of the rendered diagram. It is needed to calculate offset in order to place other elements of PDF document below it. 

[PDFKit](pdfkit.plugins/Multipage.html)

## PDF File Download

The following sample relies on FileSaver.js package (MIT License) for in browser file download.

[PDFKit](pdfkit.plugins/FileDownload.html)