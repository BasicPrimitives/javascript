# Item template
## Supported Formats
Controls provide two distinct ways to define items templates. The original one is based on setting HTML elements content via innerHTML DOM element property, see following reference at https://developer.mozilla.org web site for more details. This very old and unregulated approach, so trivial template looks like the following:

```JavaScript
var result.itemTemplate = 
'<div>'
+ '<div name="titleBackground">'
    + '<div name="title">'
    + '</div>'
+ '</div>'
+ '<div class="bp-photo-frame">'
    + '<img name="photo" />'
+ '</div>'
+ '<div name="phone"></div>'
+ '<div name="email"></div>'
+ '<div name="description"></div>'
+ '</div>'
```
We use internally across our library JSON ML that is recommended solution for templates definition, see following web site for more details http://www.jsonml.org/. This is only 3d party MIT licensed code included into our code base, everything else is 100% authentic. We adopted it with minor modifications, it general works by original design. The following code snipped demonstrate usage of JSON ML in code. It is definitely less compact then previous approach, but it provide more normalized and probably more secure approach to templates definition:

```JavaScript
result.itemTemplate = ["div",
    {
        "style": {"width": result.itemSize.width + "px","height": result.itemSize.height + "px"},
        "class": ["bp-item", "bp-corner-all", "bt-item-frame"]
    },
    ["div",
        {
            "name": "titleBackground",
            "class": ["bp-item", "bp-corner-all", "bt-title-frame"],
            "style": {top: "2px",left: "2px",width: "216px",height: "20px"}
        },
        ["div",
            {
                "name": "title",
                "class": ["bp-item", "bp-title"],
                "style": {top: "3px", left: "6px", width: "208px", height: "18px"}
            }
        ]
    ],
    ["div",
        {
            "class": ["bp-item", "bp-photo-frame"],
            "style": {top: "26px",left: "2px",width: "50px",height: "60px"}
        },
        ["img",
            {
                "name": "photo",
                "class": ["bp-item", "bp-title"],
                "style": {width: "50px",height: "60px"}
            }
        ]
    ],
    ["div",
        {
            "name": "phone",
            "class": "bp-item",
            "style": {top: "26px",left: "56px",width: "162px",height: "18px",fontSize: "12px"}
        }
    ],
];
```

## Configuration Classes
When we define node templates we can define Content Template, Cursor Template and Highlight Templates in one configuration object. This make sense since if we decide to customize cursor or highlight templates most likely we are going to make them item template specific. At the same time control does not require all 3 of them to be defined. If cursor or highlight templates properties are not set in template configuration object then control uses internal default template for all of them. Generally all 3 templates can be set to null, so default templates are going to be used by control. See template configuration properties in the following classes:

* `primitives.orgdiagram.ItemConfig`
* `primitives.famdiagram.Config`
* `primitives.orgdiagram.Config`
* `primitives.famdiagram.TemplateConfig`
* `primitives.orgdiagramTemplateConfig`

## Size
Control deals with fixed size layout, it makes no guesses about content and size of nodes. So we don't support in any form nodes auto sizing. In order to support such feature control should measure content of every node before rendering cycle. Taking into account that nodes visibility depends on available space it is going to be infinite loop of diagram layout and nodes measure iterations. The more space we provide to nodes the less number of diagram nodes is going to be visible. So control expect that node size is hard valued in template configuration. 

## Content population
Templates should be populated with items content when rendered, so for this purpose control provides call back function on the API which is being called for every node during rendering cycle. The call back function provide context arguments to reference template instance in DOM - see: data.element argument, context item being rendered - see: data.context argument and template state property indicating whether template is new or being reused - see data.templateName. Please, note that control does not eliminate created template instances from DOM, but reuses them between rendering cycle. So you have to always populate elements with some values whether they null or not, otherwise you will see orphan values in templates. If no call back function provided then default built in function will use name attributes of template elements to find them and populate with default item properties values. 

## The root element of template should be DIV.

```JavaScript
function onTemplateRender(event, data) {
    switch (data.renderingMode) {
        case primitives.common.RenderingMode.Create:
            /* Initialize widgets here */
            break;
        case primitives.common.RenderingMode.Update:
            /* Update widgets here */
            break;
    }
 
    var itemConfig = data.context;
 
    if (data.templateName == "contactTemplate2") {
        var photo = data.element.childNodes[1].firstChild;
        photo.src = itemConfig.image;
        photo.alt = itemConfig.title;
 
        var titleBackground = data.element.firstChild;
        titleBackground.style.backgroundColor = itemConfig.itemTitleColor || primitives.common.Colors.RoyalBlue;
 
        var title = data.element.firstChild.firstChild;
        title.textContent = itemConfig.title;
 
        var phone = data.element.childNodes[2];
        phone.textContent = itemConfig.phone;
 
        var email = data.element.childNodes[3];
        email.textContent = itemConfig.email;
 
        var description = data.element.childNodes[4];
        description.textContent = itemConfig.description;
    }
}
```

## Names
Every template configuration object has name property, it is being used to reference templates from items. This name is used to as an argument of call back rendering function as well. If item has not template name set it uses default template for rendering.

See following example of templates usage:

## PDF Templates

PDFKit Plugins use the same template objects with one major exception. All rendering is done using PDFKit API:

* [Text](http://pdfkit.org/docs/text.html)
* [Images](http://pdfkit.org/docs/images.html)
* [Vector Graphics](http://pdfkit.org/docs/vector.html)

See [PDFKit](http://pdfkit.org/) site for more details.

Basic Primitives PDFkit Plugins have no HTML or browsers specific dependencies, they share API options with their complimentary UI controls. The major API difference is that they have no UI events and rendering mechanism refit to use PDFkit document API methods. The following sample shows usage of `onTemplateRender` event handler, which receives `doc` reference to PDFkit `PDFDocument` instance and node `position` in PDF document coordinates:

Basically developer is free to render any content in node's position, the following sample renders frame, photo, title and PDF specific link annotation, which is clickable in PDF.

```JavaScript
function onTemplateRender(doc, position, data) {
  var itemConfig = data.context;

  if (data.templateName == "contactTemplate") {
    var contentSize = new primitives.common.Size(220, 108);

    contentSize.width -= 2;
    contentSize.height -= 2;

    doc.save();

    /* item border */
    doc.roundedRect(position.x, position.y, position.width, position.height, 0)
      .lineWidth(1)
      .stroke('#dddddd');

    /* photo */
    if (itemConfig.image != null) {
      doc.image(itemConfig.image, position.x + 3, position.y + 3);
    }

    /* title */
    doc.fillColor('Black')
      .font('Helvetica', 12)
      .text(itemConfig.title, position.x + 110, position.y + 7, {
        ellipsis: true,
        width: (contentSize.width - 4 - 110),
        height: 16,
        align: 'center'
      });

    /* description */
    doc.fillColor('black')
      .font('Helvetica', 10)
      .text(itemConfig.description, position.x + 110, position.y + 24, {
        ellipsis: true,
        width: (contentSize.width - 4 - 110),
        height: 74,
        align: 'left'
      });

    /* readmore */
    doc.fillColor('black')
      .font('Helvetica', 10)
      .text('Link Annotation ...', position.x + 110, position.y + 94, {
        ellipsis: false,
        width: (contentSize.width - 4 - 110),
        height: 24,
        align: 'right',
        link: itemConfig.link,
        underline: true
      });

    doc.restore();
  }
}
```

[JavaScript](javascript.controls/CaseItemTemplate.html)
[JQuery](jquery.widgets/CaseItemTemplate.html)
[PDFKit](pdfkit.plugins/UserItemTemplate.html)
[PDFKit Graphics](pdfkit.plugins/UserItemTemplateWithShapes.html)

## Adding link to Item Template
In order to avoid diagram cursor positioning and layout when user clicks on reference add 'stopPropagation' to mouse click event handler of the reference's label.

```JavaScript
  readmore.addEventListener("click", function (e) {
    /* Block mouse click propagation in order to avoid layout updates before server postback*/
    primitives.common.stopPropagation(e);
  });
```

[JavaScript](javascript.controls/CaseAddingLinkToItemTemplate.html)
[JQuery](jquery.widgets/CaseAddingLinkToItemTemplate.html)

## Adding selection checkbox to Item Template
Chart supports selected items collection on its API, so checkbox element is necessary part of control's functionality. If you want to place it inside of item template instead of having it shown outside as decorator of element boundaries, you have to add `bp-selectioncheckbox` to your checkbox `class` style property.

[JavaScript](javascript.controls/CaseSelectionCheckboxInItemTemplate.html)
[JQuery](jquery.widgets/CaseSelectionCheckboxInItemTemplate.html)