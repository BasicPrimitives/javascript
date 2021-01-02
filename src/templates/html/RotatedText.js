import { OrientationType, TextOrientationType, VerticalAlignmentType }  from '../../enums';
import JsonML from '../../common/jsonml-html';
import Rect from '../../graphics/structs/Rect';
import { getTextAlign, getVerticalAlignment } from '../../graphics/EnumValues';

export function getRotatedText({orientation, textOrientation, horizontalAlignment, verticalAlignment, fontSize, fontFamily, fontWeight, fontStyle, label}) {
    var rotation = "",
      element;

    switch (textOrientation) {
      case TextOrientationType.Horizontal:
        break;
      case TextOrientationType.RotateLeft:
        rotation = "rotate(-90deg)";
        break;
      case TextOrientationType.RotateRight:
        rotation = "rotate(90deg)";
        break;
      case TextOrientationType.Auto:
        switch (orientation) {
          case OrientationType.Top:
            rotation = "rotate(90deg)";
            break;
          case OrientationType.Bottom:
            rotation = "rotate(90deg)";
            break;
          case OrientationType.Left:
          case OrientationType.Right:
            break;
        }
        break;
    }

    var style = {
      "fontSize": fontSize,
      "fontFamily": fontFamily,
      "fontWeight": fontWeight,
      "fontStyle": fontStyle,
      "position": "absolute",
      "padding": 0,
      "margin": 0,
      "textAlign": getTextAlign(horizontalAlignment),
      "lineHeight": 1,
      "-webkit-transform-origin": "center center",
      "-moz-transform-origin": "center center",
      "-o-transform-origin": "center center",
      "-ms-transform-origin": "center center",
      "-webkit-transform": rotation,
      "-moz-transform": rotation,
      "-o-transform": rotation,
      "-ms-transform": rotation,
      "transform": rotation,
      "textOverflow": "ellipsis",
      "whiteSpace": "nowrap",
      "overflow": "hidden",
      "tableLayout": "fixed"
    };

    switch (verticalAlignment) {
      case VerticalAlignmentType.Top:
        element = ["div",
          {
            "style": style
          },
          label
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
                    "verticalAlign": getVerticalAlignment(verticalAlignment),
                    "padding": 0,
                    "textOverflow": "ellipsis",
                    "whiteSpace": "nowrap",
                    "overflow": "hidden"
                  }
                },
                label
              ]
            ]
          ]
        ];
        break;
    }

    return element;
  }

export function updateRotatedText({element, orientation, textOrientation, verticalAlignment, width, height, label, fontColor }) {
    var style = {},
      isVertical = false;

    switch (textOrientation) {
      case TextOrientationType.RotateLeft:
      case TextOrientationType.RotateRight:
        isVertical = true;
        break;
      case TextOrientationType.Auto:
        switch (orientation) {
          case OrientationType.Top:
          case OrientationType.Bottom:
            isVertical = true;
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }

    var textRect;
    if(isVertical) {
      textRect = new Rect(Math.round(width / 2.0 - height / 2.0), Math.round(height / 2.0 - width / 2.0), height, width);
    } else {
      textRect = new Rect(0, 0, width, height);
    }
    style = textRect.getCSS();
    style.maxWidth = style.width;
    style.maxHeight = style.height;

    var container = element.firstChild;
    JsonML.applyStyles(container, style);

    var title;
    switch (verticalAlignment) {
      case VerticalAlignmentType.Top:
        title = element.firstChild;
        break;
      default:
        title = element.firstChild.firstChild.firstChild.firstChild;
        title.style.borderCollapse = "collapse";
        break;
    }
    title.style.color = fontColor;
    title.textContent = label || "";
  }