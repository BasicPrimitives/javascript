import { ControlType } from './enums';

export function DropDownBoxConfig(id, defaultItem, caption, items, valueType, onUpdate) {
    this.controlType = ControlType.DropDownBox;
    this.id = id;
    this.defaultItem = defaultItem;
    this.caption = caption;
    this.items = items;
    this.valueType = valueType;
    this.onUpdate = onUpdate;
};
  

export function DropDownBoxRender() {

    this.render = function (config, namespace, defaultItem) {
      var controlBody = ["p",
        {
          "title": config.id,
          "$": function (element) {
            element.addEventListener('change', function () {
              config.onUpdate(element, config);
            });
          }
        },
        config.caption,
        ":",
        '\xa0'
      ];
      var controlList = ["select",
        {
          "class": "form-select",
          "aria-label": config.caption,
          "id": namespace + config.id
        }
      ];
      var key, value;
      controlBody.push(controlList);
      if (Array.isArray(config.items)) {
        var hasItem = false;
        if (defaultItem == null) {
          controlList.push(["option",
            {
              "value": '-1',
              "selected": "selected"
            },
            "NULL"
          ]);
          hasItem = true;
        }
        for (var index = 0, len = config.items.length; index < len; index += 1) {
          value = config.items[index];
          var properties = {
            "value": (value == "NULL" ? -1 : value)
          };
          if (value == defaultItem) {
            properties["selected"] = "selected";
          }
          controlList.push(["option",
            properties,
            value.toString()
          ]);
          if (value == defaultItem) {
            hasItem = true;
          }
        }
  
        if (!hasItem) {
          controlList.push(["option",
            {
              "value": defaultItem,
              "selected": "selected"
            },
            defaultItem.toString()
          ]);
        }
      } else {
        if (defaultItem == null) {
          controlList.push(["option",
            {
              "value": '-1',
              "selected": "selected"
            },
            "NULL"
          ]);
        }
        for (key in config.items) {
          if (config.items.hasOwnProperty(key)) {
            value = config.items[key];
            var properties = {
              "value": (value == "NULL" ? -1 : value)
            };
            if (value == defaultItem) {
              properties["selected"] = "selected";
            }
            controlList.push(["option",
              properties,
              primitives.splitCamelCaseName(key).join(" ")
            ]);
          }
        }
      }
      return controlBody;
    };
  
    this.getValue = function (item, namespace, formatters) {
      var result;
      var formatter = formatters[item.valueType],
        element = document.getElementById(namespace + item.id);
      if (element.selectedIndex == -1) {
        result = null;
      } else {
        var value = element.options[element.selectedIndex].value;
        result = formatter(value);
      };
  
      if (result == -1) {
        result = null;
      }
      return result;
    };
  };