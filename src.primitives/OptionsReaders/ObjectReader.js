primitives.common.ObjectReader = function (dataTemplate, isNullable, defaultValue) {
	this.dataTemplate = dataTemplate;
	this.isNullable = isNullable;
	this.defaultValue = defaultValue;
};

primitives.common.ObjectReader.prototype.read = function (target, source, path, context) {
	var result = null,
		property,
		propertyDataTemplate;

	if(!source) {
		source = this.isNullable ? null : this.defaultValue;
	} 

	if(primitives.common.isObject(source)) {
		result = {};

		for (property in this.dataTemplate) {
			if (this.dataTemplate.hasOwnProperty(property)) {
				propertyDataTemplate = this.dataTemplate[property];

				result[property] = propertyDataTemplate.read(primitives.common.isObject(target) ? target[property] : null, source[property], path + "-" + property, context);
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