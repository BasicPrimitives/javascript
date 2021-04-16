import { ControlType } from './enums';
import { RangeConfig, RangeRender } from './Range';
import { SizeFormatter } from './Formatters';

export function SizeConfig(id, defaultItem, caption, min, max, step, onUpdate) {
    this.controlType = ControlType.SizeBox;
    this.id = id;
    this.defaultItem = defaultItem;
    this.caption = caption;
    this.min = min;
    this.max = max;
    this.step = step;
    this.onUpdate = onUpdate;
};

export function SizeRender() {
    this._render = function (config, namespace, sideName, defaultItem) {
      var rangeRender = new RangeRender();
      var rangeConfig = new RangeConfig(config.id + "_" + sideName, defaultItem, sideName, config.min, config.max, config.step, config.onUpdate)
      return rangeRender.render(rangeConfig, namespace, defaultItem);
    }
  
    this.render = function (config, namespace, defaultItem) {
      var controlBody = ["p",
        {
          "title": config.id
        },
        config.caption,
        ["br"],
        this._render(config, namespace, "Width", defaultItem && defaultItem.width),
        this._render(config, namespace, "Height", defaultItem && defaultItem.height)
      ];
      return controlBody;
    };
  
    this.getValue = function (item, namespace, formatters) {
      var widthElement = document.getElementById(namespace + item.id + "_Width"),
        width = widthElement.value,
        heightElement = document.getElementById(namespace + item.id + "_Height"),
        height = heightElement.value,
        result = SizeFormatter(width, height);
  
      return result;
    };
  };