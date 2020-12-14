import { isObject } from '../common';

export default function ObjectReader(dataTemplate, isNullable, defaultValue) {
  this.dataTemplate = dataTemplate;
  this.isNullable = isNullable;
  this.defaultValue = defaultValue;
};

ObjectReader.prototype.read = function (target, source, path, context) {
  var result = null,
    isTargetObject = isObject(target),
    property,
    propertyDataTemplate;

  if (!source) {
    source = this.isNullable ? null : this.defaultValue;
  }

  if (isObject(source)) {
    result = {};

    for (property in this.dataTemplate) {
      if (this.dataTemplate.hasOwnProperty(property)) {
        propertyDataTemplate = this.dataTemplate[property];

        result[property] = propertyDataTemplate.read(isTargetObject ? target[property] : null, source[property], path + "-" + property, context);
      }
    }
  } else {
    result = source;

    if (target !== source) {
      context.isChanged = true;
    }
  }
  return result;
};