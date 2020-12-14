
import { NumberFormatter } from './Formatters';
import { ControlType } from './enums';

export function RangeConfig(id, defaultItem, caption, min, max, step, onUpdate) {
    this.controlType = ControlType.Range;
    this.id = id;
    this.defaultItem = defaultItem;
    this.caption = caption;
    this.min = min;
    this.max = max;
    this.step = step;
    this.scale = 1;
    if(step < 1.0) {
      this.scale = 1 / step;
      this.min = min * this.scale; 
      this.max = max * this.scale;
      this.step = step * this.scale;
    }
    this.onUpdate = onUpdate;
};

export function RangeRender() {
  this.render = function (config, namespace, defaultItem) {
    var controlBody = ["p",
      ["label",
        {
          "for": namespace + config.id,
          "class": "form-label",
          "id": namespace + config.id + "label"
        },
        config.caption + ": " + defaultItem
      ],
      ["input",
        {
          type: "range",
          class: "form-range",
          id:  namespace + config.id,
          value: ((defaultItem * config.scale).toString()),
          min: config.min.toString(),
          max: config.max.toString(),
          step: config.step.toString(),
          "$": function (element) {
            element.addEventListener('input', function (event) {
              var labelElement = document.getElementById(event.target.id + "label");
              labelElement.innerText = config.caption + ": " + NumberFormatter(event.target.value) / config.scale;
            });
            element.addEventListener('change', function (event) {
              var labelElement = document.getElementById(event.target.id + "label");
              labelElement.innerText = config.caption + ": " + NumberFormatter(event.target.value) / config.scale;
              config.onUpdate(element, config);
            });
          }
        }
      ]
    ];
    return controlBody;
  };

  this.getValue = function (item, namespace) {
    var element = document.getElementById(namespace + item.id),
      result = NumberFormatter(element.value) / item.scale;
    return result;
  };
};