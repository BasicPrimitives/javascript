# First organizational chart

Basic Primitives diagramming component library implemented in JavaScript without dependencies on 3d party libraries and frameworks. It renders diagrams in browsers optionally using SVG, Canvas and HTML templates. By default it provides very basic node template which you can see in the following example. It serves only one purpose to make first time user experience as simple as possible, software engineer is supposed to provide nodes having basically only id, name and parent id defined, so it is enough to render first diagram.

Basic Primitives controls use existing HTML elements as placeholders on the web page to draw diagrams. The only HTML element which can serve as a placeholder is div. When you resize placeholder chart will not update its content automatically, it will not shrink or expand in size, in order to have the chart adopt to the new placeholder size you have to explicitly call "update" method on its API. In order to create or update diagram you have to pass configuration object or set individual options on its API and then call "update" method to apply changes. The configuration object consists of options and collections of various objects like items, annotations, etc., the API objects are referenced by unique ids. For convenience, all configuration objects are based on their own JavaScript prototype, so you can instantiate them and browse their default properties. Since we are in JavaScript world, all configuration objects can be defined in form of regular JSON objects as well.

## JavaScript

The following is the minimal set of files needed to use Basic Primitives components in application.

```Javascript
<link href="/primitives.latest.css" media="screen" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/primitives.min.js"></script>
```

The controls are state-full that means they keep internal state of the diagrams in order to minimize updates of visuals and avoid unnecessarily layout calculations. Library has two methods to construct instances of controls: use primitives.orgdiagram.Control for Organizational Diagrams and primitives.famdiagram.Control for Family Diagrams creation. The following code snippet creates organization chart inside empty div having "basicdiagram" id:

```Javascript
var control = primitives.orgdiagram.Control(
  document.getElementById("basicdiagram"), {
  /* regular JSON object or instance of 
    primitives.orgdiagram.Config class
  */
});
```

Please, keep reference to returned control instance, you need it to update controls options:

```Javascript
control.setOptions({"items", [
    new primitives.orgdiagram.ItemConfig({
        id: 0,
        parent: null,
        title: "Scott Aasrud",
        description: "VP, Public Sector",
        image: "../images/photos/a.png"
    }),
    new primitives.orgdiagram.ItemConfig({
        id: 1,
        parent: 0,
        title: "Ted Lucas",
        description: "VP, Human Resources",
        image: "../images/photos/b.png"
    }),
    new primitives.orgdiagram.ItemConfig({
        id: 2,
        parent: 0,
        title: "Fritz Stuger",
        description: "Business Solutions, US",
        image: "../images/photos/c.png"
    })
]
});
```
or for individual option

```Javascript
control.setOption("cursorItem", 0);
```
every time we make changes to control API we need to call explicitly "update" method. This is needed in order to avoid expensive layout updates on every property change.

```Javascript
control.update(primitives.orgdiagram.UpdateMode.Refresh);
```
Control is interactive component by design, so it needs to add event listeners to placeholder DIV element to handle mouse and keyboard events. So it should be properly destroyed in order to remove event listeners:

```Javascript
control.destroy();
```

## jQuery
Historically Basic Primitives provides jQuery UI Widgets wrapping core controls, so you will find a lot of jQuery UI examples around our site. In order to use Basic Primitives jQuery UI widgets in your web application include following references for jQuery, jQuery UI and Basic Primitives libraries:

```Javascript
<link rel="stylesheet" href="/jquery-ui-1.12.1/jquery-ui.min.css" />
<script type="text/javascript" src="/jquery-ui-1.12.1/external/jquery/jquery.js"></script>
<script type="text/javascript" src="/jquery-ui-1.12.1/jquery-ui.min.js"></script>
 
<script  type="text/javascript" src="/primitives.min.js"></script>
<link href="/primitives.latest.css" media="screen" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/primitives.jquery.min.js"></script>
```
Basic Primitives jQuery UI widgets are added as methods on jQuery object, so for example in order to create a new organization chart inside empty div having "basicdiagram" id, we have to call following jQuery method:

```Javascript
jQuery("#basicdiagram").orgDiagram({/* new primitives.orgdiagram.Config() */});
```
In order to get configuration object of existing widget call its method with argument "option"

```Javascript
var config = jQuery("#basicdiagarm").orgDiagram("option")
or for individual option
```

```Javascript
var items = jQuery("#basicdiagarm").orgDiagram("option", "items")
```
See following article for Widget Factory reference, it explains how to use jQuery UI widgets API: https://api.jqueryui.com/jquery.widget/

When we create a new jQuery UI widget instance, jQuery stores it to the internal hash collection and adds its hash key to HTML element as data attribute. So when we call a widget method on the same HTML element second time we actually pass new configuration object to the existing instance. When we delete the HTML element containing widget's visuals inside, jQuery UI will also remove associated widget instance from hash and all nested widgets if such exist in the removed HTML fragment.

So in order to be sure that widget's instance is destroyed and avoid unexpected memory leaks you have to remove HTML elements only with jQuery remove method.

```Javascript
jQuery("#basicdiagram").remove();
```
Be aware that for obvious logical reasons jQuery("#basicdiagram").empty() method cleans up contents without actual widget removal, so its state becomes invalid after that and its instance stays in memory, since jQuery hash of widgets keeps reference on it.

Following example demonstrates creation of simple org chart having one root item and couple of children.

In order to define the same chart as JSON object, replace it with the following code snippet:

```Javascript
jQuery("#basicdiagram").orgDiagram({
  items: [
    { 
      id: 0,
      parent: null,
      title: "Scott Aasrud",
      description: "VP, Public Sector",
      image: "demo/images/photos/a.png" 
    },
    { 
      id: 1, 
      parent: 0, 
      title: "Ted Lucas", 
      description: "VP, Human Resources", 
      image: "demo/images/photos/b.png" 
    },
    { 
      id: 2, 
      parent: 0, 
      title: "Joao Stuger", 
      description: "Business Solutions, US", 
      image: "demo/images/photos/c.png"
    }
  ],
  cursorItem: 0,
  hasSelectorCheckbox: primitives.common.Enabled.True
});
```

## PDFKit

Basic Primitives library provides plugins for [PDFkit](www.PDFkit.org) (MIT License) - it is JavaScript PDF generation library for NodeJS and client side rendering in browser.

PDFKit library provides the most complete experience for rendering documents PDF format. Basic Primitves library implements additional plugins for PDFkit to render Diagrams on PDF page:
* primitives.pdf.orgdiagram.Plugin - Organizational Chart PDFkit Plugin
* primitives.pdf.famdiagram.Plugin - Family Diagram PDFkit Plugin

Basically PDFkit Plugins are stand alone products, they share many API options with Basic Primitives Controls, but they are completly deprived of interactivity and their rendering engine uses regular vector graphics and text elements of PDFkit libarary API, see PDFkit site for reference.

The following example is minimal code needed to create new empty PDF file on client side in browser using PDFkit library

```JavaScript
const PDFDocument = require('pdfkit');
const blobStream  = require('blob-stream');

// create a document the same way as above
const doc = new PDFDocument;

// pipe the document to a blob
const stream = doc.pipe(blobStream());

// add your content to the document here, as usual

// get a blob when you're done
doc.end();
stream.on('finish', function() {
  // get a blob you can do whatever you like with
  const blob = stream.toBlob('application/pdf');

  // or get a blob URL for display in the browser
  const url = stream.toBlobURL('application/pdf');
  iframe.src = url;
});
```

Basic Primitives Organizational Chart PDFkit plugin is just a rendering function, which renders diagram using PDFkit API methods:

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

Pay attention that `draw` method returns actual `size` of the rendered diagram. It is needed to calculate offset in order to place other elements of PDF document underneath of it. 

PDF document is very easy to scale to make it fit to paper size or split it into multiple pages. So we don't need to make PDF page fit into some fixed predefined paper size, but in order to avoid diagram being cut by PDF page boundaries we have to measure its size first and then create PDF page of approapriate size.

```JavaScript
var sampleSize = samfirstOrganizationalChartSampleple3.getSize();
```

`getSize` method returns diagram size, so we can create new PDF document big enough to accomodate our diagram:

```JavaScript
var doc = new PDFDocument({ 
  size: [sampleSize.width + 100, sampleSize.height + 150] 
});
```

Plugin draws diagram in current PDFkit document layout transformation context, so developer can rotate, translate and scale diagrams on PDFkit document page.

Plugins are part of the Basic Primitives distribution assembly

[JavaScript](javascript.controls/CaseFirstOrganizationalChart.html)
[JQuery](jquery.widgets/CaseFirstOrganizationalChart.html)
[PDFKit](pdfkit.plugins/FirstOrganizationalChart.html)

![Screenshot](images/screenshots/CaseFirstOrganizationalChart.png)