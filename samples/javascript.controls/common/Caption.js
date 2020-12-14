import { ControlType } from './enums';

export function CaptionConfig(caption, isBig, id) {
    this.controlType = ControlType.Caption;
    this.caption = caption;
    this.isBig = isBig;
    this.id = id;
};

export function CaptionRender() {
    this.render = function (config, namespace) {
      var tagName = config.isBig ? "h5" : "p";
      var element = [tagName];
      if (config.id !== "") {
        element.push({
          id: namespace + config.id
        });
      }
      element.push(config.caption);
  
      return element;
    };
  };