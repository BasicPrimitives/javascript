import { highestContrast } from '../../common/colors';
import { Colors } from '../../enums';
import JsonML from '../../common/jsonml-html';
import Size from '../../graphics/structs/Size';

export default function ItemTemplate(options, itemTemplateConfig) {
  var _template = create(itemTemplateConfig);

  function create(config) {
    var contentSize = new Size(config.itemSize),
      itemTemplate;

    contentSize.width -= config.itemBorderWidth * 2;
    contentSize.height -= config.itemBorderWidth * 2;

    itemTemplate = ["div",
      {
        "style": {
          "borderWidth": config.itemBorderWidth + "px"
        },
        "class": ["bp-item", "bp-corner-all", "bt-item-frame"]
      },
      ["div",
        {
          "name": "titleBackground",
          "style": {
            top: "2px",
            left: "2px",
            width: (contentSize.width - 4) + "px",
            height: "18px"
          },
          "class": ["bp-item", "bp-corner-all", "bp-title-frame"]
        },
        ["div",
          {
            "name": "title",
            "style": {
              top: "1px",
              left: "4px",
              width: (contentSize.width - 4 - 4 * 2) + "px",
              height: "16px"
            },
            "class": ["bp-item", "bp-title"]
          }
        ]
      ],
      ["div", // photo border
        {
          "name": "photoBorder",
          "style": {
            top: "24px",
            left: "2px",
            width: "50px",
            height: "60px"
          },
          "class": ["bp-item", "bp-photo-frame"]
        },
        ["img", // photo
          {
            "name": "photo",
            "alt": "",
            "style": {
              width: "50px",
              height: "60px"
            }
          }
        ]
      ],
      ["div",
        {
          "name": "description",
          "style": {
            top: "24px",
            left: "56px",
            width: (contentSize.width - 4 - 56) + "px",
            height: "74px"
          },
          "class": ["bp-item", "bp-description"]
        }

      ]
    ];

    return itemTemplate;
  }

  function template() {
    return _template;
  }

  function getHashCode() {
    return "defaultItemTemplate";
  }

  function render(event, data) {
    var itemConfig = data.context,
      itemTitleColor = itemConfig.itemTitleColor != null ? itemConfig.itemTitleColor : Colors.RoyalBlue,
      color = highestContrast(itemTitleColor, options.itemTitleSecondFontColor, options.itemTitleFirstFontColor),
      element = data.element,
      titleBackground = element.firstChild,
      photo = element.childNodes[1].firstChild,
      title = titleBackground.firstChild,
      description = element.childNodes[2];

    JsonML.applyStyles(titleBackground, {
      "backgroundColor": itemTitleColor
    });
    photo.src = itemConfig.image;
    photo.alt = itemConfig.title;
    JsonML.applyStyles(title, {
      "color": color
    });
    title.textContent = itemConfig.title;
    description.textContent = itemConfig.description;
  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
};