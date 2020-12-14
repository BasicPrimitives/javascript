import { ControlType } from './enums';

export function RadioBoxConfig(id, defaultItem, caption, items, valueType, onUpdate) {
    this.controlType = ControlType.RadioBox;
    this.id = id;
    this.defaultItem = defaultItem;
    this.caption = caption;
    this.items = items;
    this.valueType = valueType;
    this.onUpdate = onUpdate;

    if(Array.isArray(items)) {
      var newItems = {};

      for(var index = 0; index < items.length; index+=1) {
        var item = items[index];
        newItems[item] = item;
      }

      this.items = newItems;
    }
};

export function RadioBoxRender() {
  this.render = function (config, namespace, defaultItem) {
    var controlBody = ["p",
      {
        "id": namespace + config.id,
        "title": config.id,
        "$": function (element) {
          element.addEventListener('change', function () {
            config.onUpdate(element, config);
          });
        }
      },
      config.caption
    ];
    for (var key in config.items) {
      var value = config.items[key];
      var properties = {
        "name": namespace + config.id,
        "type": 'radio',
        "value": value,
        "class": "form-check-input", 
        "id": (namespace + config.id + "-" + value)
      };
      if (value == defaultItem) {
        properties["checked"] = "checked";
      }
      controlBody.push(["div",
        {
          "class": "form-check"
        },
        ["input",
          properties,
        ],
        ["label",
          {
            "class": "form-check-label",
            "for": (namespace + config.id + "-" + value)
          },
          primitives.splitCamelCaseName(key).join(" ")
        ]
      ]);
    };
    return controlBody;
  };

  this.getValue = function (item, namespace, formatters) {
    var formatter = formatters[item.valueType],
      result = formatter(this.getRadioValue(namespace + item.id));
    return result;
  };

  this.getRadioValue = function (name) {
    var panel = document.getElementById(name);
    var result = null;
    primitives.getElementsByName(this, panel, name, function (element) {
      if (element.checked == true) {
        result = element.value;
      }
    })
    return result;
  }
};