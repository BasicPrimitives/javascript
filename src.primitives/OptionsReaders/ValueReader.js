primitives.common.ValueReader = function (acceptedTypes, isNullable, defaultValue) {
	this.acceptedTypes = acceptedTypes;
	this.isNullable = isNullable;
	this.defaultValue = defaultValue;

	this.hash = {};

	/* collect valid enumeration values */
	for (var index = 0; index < acceptedTypes.length; index += 1) {
		var acceptedType = acceptedTypes[index];
		this.hash[acceptedType] = true;
	}
};

primitives.common.ValueReader.prototype.read = function (target, source, path, context) {
	var result = null;

	if (source === null || typeof source == "undefined" || !this.hash.hasOwnProperty(typeof source)) {
		source = this.isNullable ? null : this.defaultValue;
	}

	result = source;

	if (target !== source) {
		context.isChanged = true;
	}

	return result;
};