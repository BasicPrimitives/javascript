import { ControlType } from './enums';

export function TextBoxConfig(id, defaultItem, caption, valueType, onUpdate) {
    this.controlType = ControlType.TextBox;
    this.id = id;
    this.defaultItem = defaultItem;
    this.caption = caption;
    this.valueType = valueType;
    this.onUpdate = onUpdate;
};

export function TextBoxRender() {
    this.render = function (config, namespace, defaultValue) {
        var controlBody = ["span",
        ["br"],
        ["label",
            {
            "title": config.id,
            "for": namespace + config.id
            },
            config.caption
        ],
        '\xa0',
        ["input",
            {
            "type": "text",
            "name=": namespace + config.id,
            "class": ["text", "ui-widget-content", "ui-corner-all"],
            "value": (defaultValue != null ? defaultValue : ""),
            "$": function (element) {
                element.addEventListener('change', function () {
                config.onUpdate(element, config);
                });
            }
            }
        ]
        ];

        return controlBody;
    };

    this.getValue = function (item, namespace, formatters) {
        var formatter = formatters[item.valueType],
        element = document.getElementsByName(namespace + item.id)[0],
        result = formatter(element.value);
        return result;
    };
};