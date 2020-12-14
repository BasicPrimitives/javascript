import { ControlType } from './enums';

export function ColorConfig(id, defaultItem, caption, isNullable, onUpdate) {
    this.controlType = ControlType.ColorPicker;
    this.id = id;
    this.defaultItem = defaultItem;
    this.caption = caption;
    this.onUpdate = onUpdate;
    this.isNullable = isNullable;
};


export function ColorRender() {
  this.render = function (config, namespace, value) {
    var properties = {
      "class": "form-check-input",
      "name": namespace + config.id,
      "id": namespace + config.id + "IsNullable",
      "type": 'checkbox',
      "$": function (element) {
        element.addEventListener('change', function (event) {
          var colorPicker = document.getElementById(namespace + config.id );
          if(event.target.checked) {
            colorPicker.removeAttribute("disabled");
          } else {
            colorPicker.setAttribute("disabled", "disabled");
          }
          config.onUpdate(element, config);
        });
      }
    };
    if (value != null) {
      properties["checked"] = "checked";
    }
    var controlBody = ["p"];
    if(config.isNullable) {
        controlBody.push( ["div",
        {
          "class": "form-check form-switch"
        },
        ["input",
          properties,
        ],
        ["label",
          {
            "class": "form-check-label",
            "for": namespace + config.id + "IsNullable"
          },
          config.caption
        ]
      ]);
    } else {
      controlBody.push(["label",
        {
          "for": namespace + config.id,
          "class": "form-label"
        },
        config.caption
      ]);
    };

    controlBody.push(["input",
        {
          "type": "color",
          "class": "form-control form-control-color",
          "id":  namespace + config.id,
          "value": value,
          "title": "Choose your color",
          "disabled": (value == null ? "disabled" : ""),
          "$": function (element) {
            element.addEventListener('change', function () {
            config.onUpdate(element, config);
            });
          }
        }
      ]
    );
    return controlBody;
  };

  this.getValue = function (item, namespace) {
    if(item.isNullable) {
        var checkbox = document.getElementById(namespace + item.id + "IsNullable" );
        var isNull = !checkbox.checked;
        if(isNull) {
          return null;
        }
    }
    var element = document.getElementById(namespace + item.id);
    return element.value;
  };
};