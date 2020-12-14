import { ControlType } from './enums';

export function CheckBoxConfig(id, defaultValue, caption, onUpdate) {
  this.controlType = ControlType.CheckBox;
  this.id = id;
  this.defaultValue = defaultValue;
  this.caption = caption;
  this.onUpdate = onUpdate;
};
  
export function CheckBoxRender() {

  this.render = function (config, namespace, defaultValue) {
    var properties = {
      "class": "form-check-input",
      "name": namespace + config.id,
      "id": namespace + config.id,
      "type": 'checkbox',
      "$": function (element) {
        element.addEventListener('change', function () {
          config.onUpdate(element, config);
        });
      }
    };
    if (defaultValue == true) {
      properties["checked"] = "checked";
    }
    var controlBody = ["div",
      {
        "class": "form-check form-switch"
      },
      ["input",
        properties,
      ],
      ["label",
        {
          "class": "form-check-label",
          "for": namespace + config.id
        },
        config.caption
      ],
      ["br"]
    ];
    return controlBody;
  };

  this.getValue = function (item, namespace, formatters) {
    var checkbox = document.getElementsByName(namespace + item.id)[0];
    return checkbox.checked;
  };
};

