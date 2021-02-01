# PDFkit Specific Use Cases

See [PDFkit](www.PDFkit.org) (MIT License) site for the reference of how to create PDF documents with PDFKit library.

## Sizing PDF Page to accommodate entire diagram without clipping its content

Basic Primitives Organizational Chart PDFkit plugin is just a rendering function, which renders diagram using PDFkit API methods:

PDF document is very flexible; it is easy to scale PDF documents to fit into paper page size or split it to multiple pages. So we don't need to make our control capable of sizing itself. PDFKit library provides rendering context manipulation functions, which you can use to set the scale, offset, and rotation of your choice for the diagram. We need to measure the diagram size to scale it down or create a PDF document page big enough to accommodate the entire chart without clipping it by PDF page boundaries.

```JavaScript
var sampleSize = firstOrganizationalChartSample3.getSize();
```

`getSize` method returns diagram size, so we can create a new PDF document big enough to accommodate our diagram:

```JavaScript
var doc = new PDFDocument({ size: [sampleSize.width + 100, sampleSize.height + 150] });
```

[Organizational Diagram](pdfkit.plugins/AutoSizeOrgDiagram.html)
[Family Diagram](pdfkit.plugins/AutoSizeFamDiagram.html)

## Mixing diagram and text in a multi-page document

PDF documents are supposed to be conventional printable files having content deliberately split into pages for convenient printing. So in order to add content below diagram we need to know size of the diagram, so we can properly offset elements:

``` JavaScript
var sampleChart = primitives.OrgDiagramPdfkit({
    items: [
        new primitives.OrgItemConfig({
            id: 0,
            parent: null,
            title: "James Smith",
            description: "VP, Public Sector",
            image: photos.a
        }),
        new primitives.OrgItemConfig({
            id: 1,
            parent: 0,
            title: "Ted Lucas",
            description: "VP, Human Resources",
            image: photos.b
        }),
        new primitives.OrgItemConfig({
            id: 2,
            parent: 0,
            title: "Fritz Stuger",
            description: "Business Solutions, US",
            image: photos.c
        })
    ],
    cursorItem: null,
    hasSelectorCheckbox: primitives.Enabled.False
});

var size = sampleChart.draw(doc, 100, 150);
```

Pay attention that the `draw` method returns the actual `size` of the rendered diagram. It is needed to calculate offset to place other elements of the PDF document below it. 

[PDFKit](pdfkit.plugins/Multipage.html)

## In-browser PDF File generation and download

The following sample relies on the FileSaver.js package (MIT License) for in-browser file download.

[PDFKit](pdfkit.plugins/FileDownload.html)