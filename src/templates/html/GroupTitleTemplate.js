import { TextOrientationType, VerticalAlignmentType, HorizontalAlignmentType }  from '../../enums';
import JsonML from '../../common/jsonml-html';
import { highestContrast } from '../../common/colors';

export default function GroupTitleTemplate(options) {
  var _template = create();

  function create() {
    return ["div",
      {
        "style": {
          "fontSize": options.groupTitleFontSize,
          "fontFamily": options.groupTitleFontFamily,
          "fontWeight": options.groupTitleFontWeight,
          "fontStyle": options.groupTitleFontStyle
        },
        "class": ["bp-item", "bp-corner-all", "bp-grouptitle-frame"]
      },
      text(options.groupTitleOrientation, options.groupTitleHorizontalAlignment, options.groupTitleVerticalAlignment)
    ];
  }

  function text(orientation, horizontalAlignment, verticalAlignment) {
    var rotation = "",
      element;

    switch (orientation) {
      case TextOrientationType.Horizontal:
      case TextOrientationType.Auto:
        break;
      case TextOrientationType.RotateLeft:
        rotation = "rotate(-90deg)";
        break;
      case TextOrientationType.RotateRight:
        rotation = "rotate(90deg)";
        break;
    }

    var style = {
      "fontSize": options.groupTitleFontSize,
      "fontFamily": options.groupTitleFontFamily,
      "fontWeight": options.groupTitleFontWeight,
      "fontStyle": options.groupTitleFontStyle,
      "position": "absolute",
      "padding": 0,
      "margin": 0,
      "textAlign": _getTextAlign(horizontalAlignment),
      "lineHeight": 1,
      "-webkit-transform-origin": "center center",
      "-moz-transform-origin": "center center",
      "-o-transform-origin": "center center",
      "-ms-transform-origin": "center center",
      "-webkit-transform": rotation,
      "-moz-transform": rotation,
      "-o-transform": rotation,
      "-ms-transform": rotation,
      "transform": rotation
    };

    switch (verticalAlignment) {
      case VerticalAlignmentType.Top:
        element = ["div",
          {
            "style": style,
            "class": ["bp-title-content", "bp-item", "bp-corner-all"]
          }
        ];
        break;
      default:
        style.borderCollapse = "collapse";

        element = ["table",
          {
            "style": style
          },
          ["tbody",
            ["tr",
              ["td",
                {
                  "style": {
                    "verticalAlign": _getVerticalAlignment(verticalAlignment),
                    "padding": 0
                  },
                  "class": "bp-title-content"
                }
              ]
            ]
          ]
        ];
        break;
    }

    return element;
  }

  function _getTextAlign(alignment) {
    var result = null;
    switch (alignment) {
      case HorizontalAlignmentType.Center:
        result = "center";
        break;
      case HorizontalAlignmentType.Left:
        result = "left";
        break;
      case HorizontalAlignmentType.Right:
        result = "right";
        break;
    }
    return result;
  }

  function _getVerticalAlignment(alignment) {
    var result = null;
    switch (alignment) {
      case VerticalAlignmentType.Middle:
        result = "middle";
        break;
      case VerticalAlignmentType.Top:
        result = "top";
        break;
      case VerticalAlignmentType.Bottom:
        result = "bottom";
        break;
    }
    return result;
  }

  function template() {
    return _template;
  }

  function getHashCode() {
    return "defaultGroupTitleTemplate";
  }

  function render(event, data) {
    var itemConfig = data.context,
      groupTitleColor = itemConfig.groupTitleColor || options.groupTitleColor,
      style = {},
      width = data.width,
      height = data.height;

    style.left = Math.round(width / 2.0 - height / 2.0) + "px";
    style.top = Math.round(height / 2.0 - width / 2.0) + "px";
    style.width = height + "px";
    style.height = width + "px";
    style.maxWidth = style.width;
    style.maxHeight = style.height;

    var container = data.element.firstChild;
    JsonML.applyStyles(container, style);

    var label = itemConfig.groupTitle || "";
    label = label.replace(new RegExp("\n", 'g'), "<br/>");

    var title;
    switch (options.groupTitleVerticalAlignment) {
      case VerticalAlignmentType.Top:
        title = data.element.firstChild;
        break;
      default:
        title = data.element.firstChild.firstChild.firstChild.firstChild;
        title.style.borderCollapse = "collapse";
        break;
    }
    title.style.color = highestContrast(groupTitleColor, options.itemTitleSecondFontColor, options.itemTitleFirstFontColor);
    title.textContent = label;

    JsonML.applyStyles(data.element, {
      "backgroundColor": groupTitleColor
    });
  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
};

