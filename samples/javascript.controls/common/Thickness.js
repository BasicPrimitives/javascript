import { ControlType } from './enums';
import { RangeConfig, RangeRender } from './Range';
import { ThicknessFormatter } from './Formatters';

export function ThicknessConfig(id, defaultItem, caption, min, max, step, onUpdate) {
    this.controlType = ControlType.Thickness;
    this.id = id;
    this.defaultItem = defaultItem;
    this.caption = caption;
    this.min = min;
    this.max = max;
    this.step = step;
    this.onUpdate = onUpdate;
};

export function ThicknessRender() {
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
        this._render(config, namespace, "Left", defaultItem && defaultItem.left),
        this._render(config, namespace, "Top", defaultItem && defaultItem.top),
        this._render(config, namespace, "Right", defaultItem && defaultItem.right),
        this._render(config, namespace, "Bottom", defaultItem && defaultItem.bottom)
      ];
      return controlBody;
    };
  
    this.getValue = function (item, namespace, formatters) {
      var leftElement = document.getElementById(namespace + item.id + "_Left"),
        left = leftElement.value,
        topElement = document.getElementById(namespace + item.id + "_Top"),
        top = topElement.value,
        rightElement = document.getElementById(namespace + item.id + "_Right"),
        right = rightElement.value,
        bottomElement = document.getElementById(namespace + item.id + "_Bottom"),
        bottom = bottomElement.value,
        result = ThicknessFormatter(left, top, right, bottom);
  
      return result;
    };
  };