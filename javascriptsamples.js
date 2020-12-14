(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["javascriptsamples"] = factory();
	else
		root["javascriptsamples"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./samples/javascript.controls/common/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./samples/javascript.controls/common/Caption.js":
/*!*******************************************************!*\
  !*** ./samples/javascript.controls/common/Caption.js ***!
  \*******************************************************/
/*! exports provided: CaptionConfig, CaptionRender */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CaptionConfig", function() { return CaptionConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CaptionRender", function() { return CaptionRender; });
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enums */ "./samples/javascript.controls/common/enums.js");

function CaptionConfig(caption, isBig, id) {
  this.controlType = _enums__WEBPACK_IMPORTED_MODULE_0__["ControlType"].Caption;
  this.caption = caption;
  this.isBig = isBig;
  this.id = id;
}
;
function CaptionRender() {
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
}
;

/***/ }),

/***/ "./samples/javascript.controls/common/CheckBox.js":
/*!********************************************************!*\
  !*** ./samples/javascript.controls/common/CheckBox.js ***!
  \********************************************************/
/*! exports provided: CheckBoxConfig, CheckBoxRender */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckBoxConfig", function() { return CheckBoxConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckBoxRender", function() { return CheckBoxRender; });
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enums */ "./samples/javascript.controls/common/enums.js");

function CheckBoxConfig(id, defaultValue, caption, onUpdate) {
  this.controlType = _enums__WEBPACK_IMPORTED_MODULE_0__["ControlType"].CheckBox;
  this.id = id;
  this.defaultValue = defaultValue;
  this.caption = caption;
  this.onUpdate = onUpdate;
}
;
function CheckBoxRender() {
  this.render = function (config, namespace, defaultValue) {
    var properties = {
      "class": "form-check-input",
      "name": namespace + config.id,
      "id": namespace + config.id,
      "type": 'checkbox',
      "$": function $(element) {
        element.addEventListener('change', function () {
          config.onUpdate(element, config);
        });
      }
    };

    if (defaultValue == true) {
      properties["checked"] = "checked";
    }

    var controlBody = ["div", {
      "class": "form-check form-switch"
    }, ["input", properties], ["label", {
      "class": "form-check-label",
      "for": namespace + config.id
    }, config.caption], ["br"]];
    return controlBody;
  };

  this.getValue = function (item, namespace, formatters) {
    var checkbox = document.getElementsByName(namespace + item.id)[0];
    return checkbox.checked;
  };
}
;

/***/ }),

/***/ "./samples/javascript.controls/common/Color.js":
/*!*****************************************************!*\
  !*** ./samples/javascript.controls/common/Color.js ***!
  \*****************************************************/
/*! exports provided: ColorConfig, ColorRender */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorConfig", function() { return ColorConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorRender", function() { return ColorRender; });
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enums */ "./samples/javascript.controls/common/enums.js");

function ColorConfig(id, defaultItem, caption, isNullable, onUpdate) {
  this.controlType = _enums__WEBPACK_IMPORTED_MODULE_0__["ControlType"].ColorPicker;
  this.id = id;
  this.defaultItem = defaultItem;
  this.caption = caption;
  this.onUpdate = onUpdate;
  this.isNullable = isNullable;
}
;
function ColorRender() {
  this.render = function (config, namespace, value) {
    var properties = {
      "class": "form-check-input",
      "name": namespace + config.id,
      "id": namespace + config.id + "IsNullable",
      "type": 'checkbox',
      "$": function $(element) {
        element.addEventListener('change', function (event) {
          var colorPicker = document.getElementById(namespace + config.id);

          if (event.target.checked) {
            colorPicker.removeAttribute("disabled");
          } else {
            colorPicker.setAttribute("disabled", "disabled");
          }

          config.onUpdate(element, config);
        });
      }
    };

    if (value != null) {
      properties["checked"] = "checked";
    }

    var controlBody = ["p"];

    if (config.isNullable) {
      controlBody.push(["div", {
        "class": "form-check form-switch"
      }, ["input", properties], ["label", {
        "class": "form-check-label",
        "for": namespace + config.id + "IsNullable"
      }, config.caption]]);
    } else {
      controlBody.push(["label", {
        "for": namespace + config.id,
        "class": "form-label"
      }, config.caption]);
    }

    ;
    controlBody.push(["input", {
      "type": "color",
      "class": "form-control form-control-color",
      "id": namespace + config.id,
      "value": value,
      "title": "Choose your color",
      "disabled": value == null ? "disabled" : "",
      "$": function $(element) {
        element.addEventListener('change', function () {
          config.onUpdate(element, config);
        });
      }
    }]);
    return controlBody;
  };

  this.getValue = function (item, namespace) {
    if (item.isNullable) {
      var checkbox = document.getElementById(namespace + item.id + "IsNullable");
      var isNull = !checkbox.checked;

      if (isNull) {
        return null;
      }
    }

    var element = document.getElementById(namespace + item.id);
    return element.value;
  };
}
;

/***/ }),

/***/ "./samples/javascript.controls/common/DropDownBox.js":
/*!***********************************************************!*\
  !*** ./samples/javascript.controls/common/DropDownBox.js ***!
  \***********************************************************/
/*! exports provided: DropDownBoxConfig, DropDownBoxRender */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DropDownBoxConfig", function() { return DropDownBoxConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DropDownBoxRender", function() { return DropDownBoxRender; });
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enums */ "./samples/javascript.controls/common/enums.js");

function DropDownBoxConfig(id, defaultItem, caption, items, valueType, onUpdate) {
  this.controlType = _enums__WEBPACK_IMPORTED_MODULE_0__["ControlType"].DropDownBox;
  this.id = id;
  this.defaultItem = defaultItem;
  this.caption = caption;
  this.items = items;
  this.valueType = valueType;
  this.onUpdate = onUpdate;
}
;
function DropDownBoxRender() {
  this.render = function (config, namespace, defaultItem) {
    var controlBody = ["p", {
      "title": config.id,
      "$": function $(element) {
        element.addEventListener('change', function () {
          config.onUpdate(element, config);
        });
      }
    }, config.caption, ":", '\xa0'];
    var controlList = ["select", {
      "class": "form-select",
      "aria-label": config.caption,
      "id": namespace + config.id
    }];
    var key, value;
    controlBody.push(controlList);

    if (Array.isArray(config.items)) {
      var hasItem = false;

      if (defaultItem == null) {
        controlList.push(["option", {
          "value": '-1',
          "selected": "selected"
        }, "NULL"]);
        hasItem = true;
      }

      for (var index = 0, len = config.items.length; index < len; index += 1) {
        value = config.items[index];
        var properties = {
          "value": value == "NULL" ? -1 : value
        };

        if (value == defaultItem) {
          properties["selected"] = "selected";
        }

        controlList.push(["option", properties, value.toString()]);

        if (value == defaultItem) {
          hasItem = true;
        }
      }

      if (!hasItem) {
        controlList.push(["option", {
          "value": defaultItem,
          "selected": "selected"
        }, defaultItem.toString()]);
      }
    } else {
      if (defaultItem == null) {
        controlList.push(["option", {
          "value": '-1',
          "selected": "selected"
        }, "NULL"]);
      }

      for (key in config.items) {
        if (config.items.hasOwnProperty(key)) {
          value = config.items[key];
          var properties = {
            "value": value == "NULL" ? -1 : value
          };

          if (value == defaultItem) {
            properties["selected"] = "selected";
          }

          controlList.push(["option", properties, primitives.splitCamelCaseName(key).join(" ")]);
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
    }

    ;

    if (result == -1) {
      result = null;
    }

    return result;
  };
}
;

/***/ }),

/***/ "./samples/javascript.controls/common/Formatters.js":
/*!**********************************************************!*\
  !*** ./samples/javascript.controls/common/Formatters.js ***!
  \**********************************************************/
/*! exports provided: IntegerFormatter, StringFormatter, NumberFormatter, BooleanFormatter, SizeFormatter, ThicknessFormatter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IntegerFormatter", function() { return IntegerFormatter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StringFormatter", function() { return StringFormatter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NumberFormatter", function() { return NumberFormatter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BooleanFormatter", function() { return BooleanFormatter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SizeFormatter", function() { return SizeFormatter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThicknessFormatter", function() { return ThicknessFormatter; });
/* harmony import */ var _src_graphics_structs_Thickness__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../src/graphics/structs/Thickness */ "./src/graphics/structs/Thickness.js");
/* harmony import */ var _src_graphics_structs_Size__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../src/graphics/structs/Size */ "./src/graphics/structs/Size.js");


function IntegerFormatter(value) {
  return parseInt(value, 10);
}
;
function StringFormatter(value) {
  return value != null ? value.toString() : value;
}
;
function NumberFormatter(value) {
  return parseFloat(value, 10);
}
;
function BooleanFormatter(value) {
  var stringValue = value.toString().toLowerCase();
  return stringValue == "true" || stringValue == "1";
}
;
function SizeFormatter(arg0, arg1) {
  var result = null,
      value,
      width,
      height;

  switch (arguments.length) {
    case 1:
      value = parseFloat(arg0, 10);
      result = new _src_graphics_structs_Size__WEBPACK_IMPORTED_MODULE_1__["default"](value, value);
      break;

    case 2:
      width = parseFloat(arg0, 10);
      height = parseFloat(arg1, 10);
      result = new _src_graphics_structs_Size__WEBPACK_IMPORTED_MODULE_1__["default"](width, height);
      break;
  }

  return result;
}
;
function ThicknessFormatter(value) {
  value = parseFloat(value, 10);
  return new _src_graphics_structs_Thickness__WEBPACK_IMPORTED_MODULE_0__["default"](value, value, value, value);
}
;

/***/ }),

/***/ "./samples/javascript.controls/common/PanelConfig.js":
/*!***********************************************************!*\
  !*** ./samples/javascript.controls/common/PanelConfig.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PanelConfig; });
function PanelConfig(caption, items, namespace) {
  this.caption = caption;
  this.items = items;
  this.namespace = namespace;
}
;

/***/ }),

/***/ "./samples/javascript.controls/common/RadioBox.js":
/*!********************************************************!*\
  !*** ./samples/javascript.controls/common/RadioBox.js ***!
  \********************************************************/
/*! exports provided: RadioBoxConfig, RadioBoxRender */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RadioBoxConfig", function() { return RadioBoxConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RadioBoxRender", function() { return RadioBoxRender; });
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enums */ "./samples/javascript.controls/common/enums.js");

function RadioBoxConfig(id, defaultItem, caption, items, valueType, onUpdate) {
  this.controlType = _enums__WEBPACK_IMPORTED_MODULE_0__["ControlType"].RadioBox;
  this.id = id;
  this.defaultItem = defaultItem;
  this.caption = caption;
  this.items = items;
  this.valueType = valueType;
  this.onUpdate = onUpdate;

  if (Array.isArray(items)) {
    var newItems = {};

    for (var index = 0; index < items.length; index += 1) {
      var item = items[index];
      newItems[item] = item;
    }

    this.items = newItems;
  }
}
;
function RadioBoxRender() {
  this.render = function (config, namespace, defaultItem) {
    var controlBody = ["p", {
      "id": namespace + config.id,
      "title": config.id,
      "$": function $(element) {
        element.addEventListener('change', function () {
          config.onUpdate(element, config);
        });
      }
    }, config.caption];

    for (var key in config.items) {
      var value = config.items[key];
      var properties = {
        "name": namespace + config.id,
        "type": 'radio',
        "value": value,
        "class": "form-check-input",
        "id": namespace + config.id + "-" + value
      };

      if (value == defaultItem) {
        properties["checked"] = "checked";
      }

      controlBody.push(["div", {
        "class": "form-check"
      }, ["input", properties], ["label", {
        "class": "form-check-label",
        "for": namespace + config.id + "-" + value
      }, primitives.splitCamelCaseName(key).join(" ")]]);
    }

    ;
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
    });
    return result;
  };
}
;

/***/ }),

/***/ "./samples/javascript.controls/common/Range.js":
/*!*****************************************************!*\
  !*** ./samples/javascript.controls/common/Range.js ***!
  \*****************************************************/
/*! exports provided: RangeConfig, RangeRender */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RangeConfig", function() { return RangeConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RangeRender", function() { return RangeRender; });
/* harmony import */ var _Formatters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Formatters */ "./samples/javascript.controls/common/Formatters.js");
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enums */ "./samples/javascript.controls/common/enums.js");


function RangeConfig(id, defaultItem, caption, min, max, step, onUpdate) {
  this.controlType = _enums__WEBPACK_IMPORTED_MODULE_1__["ControlType"].Range;
  this.id = id;
  this.defaultItem = defaultItem;
  this.caption = caption;
  this.min = min;
  this.max = max;
  this.step = step;
  this.scale = 1;

  if (step < 1.0) {
    this.scale = 1 / step;
    this.min = min * this.scale;
    this.max = max * this.scale;
    this.step = step * this.scale;
  }

  this.onUpdate = onUpdate;
}
;
function RangeRender() {
  this.render = function (config, namespace, defaultItem) {
    var controlBody = ["p", ["label", {
      "for": namespace + config.id,
      "class": "form-label",
      "id": namespace + config.id + "label"
    }, config.caption + ": " + defaultItem], ["input", {
      type: "range",
      "class": "form-range",
      id: namespace + config.id,
      value: (defaultItem * config.scale).toString(),
      min: config.min.toString(),
      max: config.max.toString(),
      step: config.step.toString(),
      "$": function $(element) {
        element.addEventListener('input', function (event) {
          var labelElement = document.getElementById(event.target.id + "label");
          labelElement.innerText = config.caption + ": " + Object(_Formatters__WEBPACK_IMPORTED_MODULE_0__["NumberFormatter"])(event.target.value) / config.scale;
        });
        element.addEventListener('change', function (event) {
          var labelElement = document.getElementById(event.target.id + "label");
          labelElement.innerText = config.caption + ": " + Object(_Formatters__WEBPACK_IMPORTED_MODULE_0__["NumberFormatter"])(event.target.value) / config.scale;
          config.onUpdate(element, config);
        });
      }
    }]];
    return controlBody;
  };

  this.getValue = function (item, namespace) {
    var element = document.getElementById(namespace + item.id),
        result = Object(_Formatters__WEBPACK_IMPORTED_MODULE_0__["NumberFormatter"])(element.value) / item.scale;
    return result;
  };
}
;

/***/ }),

/***/ "./samples/javascript.controls/common/Render.js":
/*!******************************************************!*\
  !*** ./samples/javascript.controls/common/Render.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Render; });
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enums */ "./samples/javascript.controls/common/enums.js");
/* harmony import */ var _Caption__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Caption */ "./samples/javascript.controls/common/Caption.js");
/* harmony import */ var _RadioBox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RadioBox */ "./samples/javascript.controls/common/RadioBox.js");
/* harmony import */ var _CheckBox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CheckBox */ "./samples/javascript.controls/common/CheckBox.js");
/* harmony import */ var _DropDownBox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DropDownBox */ "./samples/javascript.controls/common/DropDownBox.js");
/* harmony import */ var _Size__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Size */ "./samples/javascript.controls/common/Size.js");
/* harmony import */ var _TextBox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./TextBox */ "./samples/javascript.controls/common/TextBox.js");
/* harmony import */ var _Color__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Color */ "./samples/javascript.controls/common/Color.js");
/* harmony import */ var _Range__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Range */ "./samples/javascript.controls/common/Range.js");
/* harmony import */ var _Formatters__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Formatters */ "./samples/javascript.controls/common/Formatters.js");
/* harmony import */ var _src_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../src/common */ "./src/common/index.js");
/* harmony import */ var _src_common_jsonml_html__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../src/common/jsonml-html */ "./src/common/jsonml-html.js");












function Render(panels, defaultValues) {
  this.renders = {};
  this.renders[_enums__WEBPACK_IMPORTED_MODULE_0__["ControlType"].Caption] = new _Caption__WEBPACK_IMPORTED_MODULE_1__["CaptionRender"]();
  this.renders[_enums__WEBPACK_IMPORTED_MODULE_0__["ControlType"].RadioBox] = new _RadioBox__WEBPACK_IMPORTED_MODULE_2__["RadioBoxRender"]();
  this.renders[_enums__WEBPACK_IMPORTED_MODULE_0__["ControlType"].CheckBox] = new _CheckBox__WEBPACK_IMPORTED_MODULE_3__["CheckBoxRender"]();
  this.renders[_enums__WEBPACK_IMPORTED_MODULE_0__["ControlType"].DropDownBox] = new _DropDownBox__WEBPACK_IMPORTED_MODULE_4__["DropDownBoxRender"]();
  this.renders[_enums__WEBPACK_IMPORTED_MODULE_0__["ControlType"].SizeBox] = new _Size__WEBPACK_IMPORTED_MODULE_5__["SizeRender"]();
  this.renders[_enums__WEBPACK_IMPORTED_MODULE_0__["ControlType"].TextBox] = new _TextBox__WEBPACK_IMPORTED_MODULE_6__["TextBoxRender"]();
  this.renders[_enums__WEBPACK_IMPORTED_MODULE_0__["ControlType"].ColorPicker] = new _Color__WEBPACK_IMPORTED_MODULE_7__["ColorRender"]();
  this.renders[_enums__WEBPACK_IMPORTED_MODULE_0__["ControlType"].Range] = new _Range__WEBPACK_IMPORTED_MODULE_8__["RangeRender"]();
  this.formatters = {};
  this.formatters[_enums__WEBPACK_IMPORTED_MODULE_0__["ValueType"].Integer] = _Formatters__WEBPACK_IMPORTED_MODULE_9__["IntegerFormatter"];
  this.formatters[_enums__WEBPACK_IMPORTED_MODULE_0__["ValueType"].String] = _Formatters__WEBPACK_IMPORTED_MODULE_9__["StringFormatter"];
  this.formatters[_enums__WEBPACK_IMPORTED_MODULE_0__["ValueType"].Number] = _Formatters__WEBPACK_IMPORTED_MODULE_9__["NumberFormatter"];
  this.formatters[_enums__WEBPACK_IMPORTED_MODULE_0__["ValueType"].Boolean] = _Formatters__WEBPACK_IMPORTED_MODULE_9__["BooleanFormatter"];
  this.formatters[_enums__WEBPACK_IMPORTED_MODULE_0__["ValueType"].Size] = _Formatters__WEBPACK_IMPORTED_MODULE_9__["SizeFormatter"];
  this.formatters[_enums__WEBPACK_IMPORTED_MODULE_0__["ValueType"].Thickness] = _Formatters__WEBPACK_IMPORTED_MODULE_9__["ThicknessFormatter"];
  this.activePanel = "panel0";
  this.panels = panels;
  this.defaultValues = defaultValues;

  this.togglePanel = function (event) {
    if (this.activePanel !== null) {
      var element = document.getElementById(this.activePanel);
      element.setAttribute("class", "accordion-button collapsed");
      element.setAttribute("data-bs-toggle", "show");
      element.setAttribute("aria-expanded", "true");
      var panelElement = document.getElementById(element.getAttribute("aria-controls"));
      panelElement.setAttribute("class", "accordion-collapse collapse");
    }

    if (this.activePanel !== event.target.id) {
      this.activePanel = event.target.id;
      var element = document.getElementById(this.activePanel);
      element.setAttribute("class", "accordion-button");
      element.setAttribute("data-bs-toggle", "collapse");
      element.setAttribute("aria-expanded", "false");
      var panelElement = document.getElementById(element.getAttribute("aria-controls"));
      panelElement.setAttribute("class", "accordion-collapse collapse show");
    } else {
      this.activePanel = null;
    }
  };

  this.render = function (placeholder) {
    var self = this;
    var accordion = ["div", {
      "class": "accordion"
    }];

    for (var panelIndex = 0, panelLen = this.panels.length; panelIndex < panelLen; panelIndex += 1) {
      var panelConfig = this.panels[panelIndex];
      var panelId = "panel" + panelIndex;
      var isActivePanel = panelId == this.activePanel;
      accordion.push(["div", {
        "class": "accordion-item",
        "id": "#accordionoptions"
      }, ["h2", {
        "class": "accordion-header",
        "id": "heading" + panelIndex
      }, ["button", {
        "class": "accordion-button" + (isActivePanel ? "" : " collapsed"),
        "type": "button",
        "data-bs-toggle": isActivePanel ? "collapse" : "show",
        "data-bs-target": "#collapse" + panelIndex,
        "aria-expanded": isActivePanel ? "true" : "false",
        "aria-controls": "collapse" + panelIndex,
        "id": "panel" + panelIndex,
        "$": function $(element) {
          element.addEventListener("click", function (event) {
            self.togglePanel(event);
          });
        }
      }, panelConfig.caption]]]);
      var content = ["div", {
        "class": "accordion-body"
      }];
      var accordionbody = ["div", {
        "id": "collapse" + panelIndex,
        "class": "accordion-collapse collapse" + (isActivePanel ? " show" : ""),
        "aria-labelledby": "heading" + panelIndex,
        "data-bs-parent": "#accordionoptions"
      }, content];
      accordion.push(accordionbody);

      for (var index = 0; index < panelConfig.items.length; index += 1) {
        var item = panelConfig.items[index];
        var render = this.renders[item.controlType];
        var defaulValue = Object(_src_common__WEBPACK_IMPORTED_MODULE_10__["isNullOrEmpty"])(panelConfig.namespace) ? this.defaultValues[item.id] : this.defaultValues[panelConfig.namespace][item.id];
        content.push(render.render(item, panelConfig.namespace || '', defaulValue));
      }
    }

    placeholder.appendChild(_src_common_jsonml_html__WEBPACK_IMPORTED_MODULE_11__["default"].toHTML(accordion));
  };

  this.getValues = function () {
    var result = {};

    for (var panelIndex = 0, panelLen = this.panels.length; panelIndex < panelLen; panelIndex += 1) {
      var panelConfig = this.panels[panelIndex];
      var panelOptions = result;

      if (!Object(_src_common__WEBPACK_IMPORTED_MODULE_10__["isNullOrEmpty"])(panelConfig.namespace)) {
        if (!result.hasOwnProperty(panelConfig.namespace)) {
          result[panelConfig.namespace] = {};
        }

        panelOptions = result[panelConfig.namespace];
      }

      for (var index = 0; index < panelConfig.items.length; index += 1) {
        var item = panelConfig.items[index];
        var render = this.renders[item.controlType];

        if (render.getValue != null) {
          panelOptions[item.id] = render.getValue(item, panelConfig.namespace || '', this.formatters);
        }
      }
    }

    return result;
  };
}
;

/***/ }),

/***/ "./samples/javascript.controls/common/Size.js":
/*!****************************************************!*\
  !*** ./samples/javascript.controls/common/Size.js ***!
  \****************************************************/
/*! exports provided: SizeConfig, SizeRender */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SizeConfig", function() { return SizeConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SizeRender", function() { return SizeRender; });
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enums */ "./samples/javascript.controls/common/enums.js");
/* harmony import */ var _Range__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Range */ "./samples/javascript.controls/common/Range.js");
/* harmony import */ var _Formatters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Formatters */ "./samples/javascript.controls/common/Formatters.js");



function SizeConfig(id, defaultItem, caption, min, max, step, onUpdate) {
  this.controlType = _enums__WEBPACK_IMPORTED_MODULE_0__["ControlType"].SizeBox;
  this.id = id;
  this.defaultItem = defaultItem;
  this.caption = caption;
  this.min = min;
  this.max = max;
  this.step = step;
  this.onUpdate = onUpdate;
}
;
function SizeRender() {
  this._render = function (config, namespace, sideName, defaultItem) {
    var rangeRender = new _Range__WEBPACK_IMPORTED_MODULE_1__["RangeRender"]();
    var rangeConfig = new _Range__WEBPACK_IMPORTED_MODULE_1__["RangeConfig"](config.id + "_" + sideName, defaultItem, sideName, config.min, config.max, config.step, config.onUpdate);
    return rangeRender.render(rangeConfig, namespace, defaultItem);
  };

  this.render = function (config, namespace, defaultItem) {
    var controlBody = ["p", {
      "title": config.id
    }, config.caption, ["br"], this._render(config, namespace, "Width", defaultItem && defaultItem.width), '\xa0', this._render(config, namespace, "Height", defaultItem && defaultItem.height)];
    return controlBody;
  };

  this.getValue = function (item, namespace, formatters) {
    var widthElement = document.getElementById(namespace + item.id + "_Width"),
        width = widthElement.value,
        heightElement = document.getElementById(namespace + item.id + "_Height"),
        height = heightElement.value,
        result = Object(_Formatters__WEBPACK_IMPORTED_MODULE_2__["SizeFormatter"])(width, height);
    return result;
  };
}
;

/***/ }),

/***/ "./samples/javascript.controls/common/TextBox.js":
/*!*******************************************************!*\
  !*** ./samples/javascript.controls/common/TextBox.js ***!
  \*******************************************************/
/*! exports provided: TextBoxConfig, TextBoxRender */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextBoxConfig", function() { return TextBoxConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextBoxRender", function() { return TextBoxRender; });
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enums */ "./samples/javascript.controls/common/enums.js");

function TextBoxConfig(id, defaultItem, caption, valueType, onUpdate) {
  this.controlType = _enums__WEBPACK_IMPORTED_MODULE_0__["ControlType"].TextBox;
  this.id = id;
  this.defaultItem = defaultItem;
  this.caption = caption;
  this.valueType = valueType;
  this.onUpdate = onUpdate;
}
;
function TextBoxRender() {
  this.render = function (config, namespace, defaultValue) {
    var controlBody = ["span", ["br"], ["label", {
      "title": config.id,
      "for": namespace + config.id
    }, config.caption], '\xa0', ["input", {
      "type": "text",
      "name=": namespace + config.id,
      "class": ["text", "ui-widget-content", "ui-corner-all"],
      "value": defaultValue != null ? defaultValue : "",
      "$": function $(element) {
        element.addEventListener('change', function () {
          config.onUpdate(element, config);
        });
      }
    }]];
    return controlBody;
  };

  this.getValue = function (item, namespace, formatters) {
    var formatter = formatters[item.valueType],
        element = document.getElementsByName(namespace + item.id)[0],
        result = formatter(element.value);
    return result;
  };
}
;

/***/ }),

/***/ "./samples/javascript.controls/common/enums.js":
/*!*****************************************************!*\
  !*** ./samples/javascript.controls/common/enums.js ***!
  \*****************************************************/
/*! exports provided: ValueType, ControlType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValueType", function() { return ValueType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ControlType", function() { return ControlType; });
var ValueType = {
  Integer: 0,
  String: 1,
  Number: 2,
  Boolean: 3,
  Size: 4,
  Thickness: 5,
  Color: 6,
  Range: 7
};
var ControlType = {
  Caption: 0,
  RadioBox: 1,
  CheckBox: 2,
  DropDownBox: 3,
  SizeBox: 4,
  TextBox: 5,
  ColorPicker: 6,
  Range: 7
};

/***/ }),

/***/ "./samples/javascript.controls/common/index.js":
/*!*****************************************************!*\
  !*** ./samples/javascript.controls/common/index.js ***!
  \*****************************************************/
/*! exports provided: getOrgEditorOptionsRender, getOrgDiagramOptionsRender, getFamDiagramOptionsRender, ValueType, PanelConfig, CaptionConfig, RadioBoxConfig, RangeConfig, ColorConfig, SizeConfig, CheckBoxConfig, DropDownBoxConfig, Render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _panels__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./panels */ "./samples/javascript.controls/common/panels.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getOrgEditorOptionsRender", function() { return _panels__WEBPACK_IMPORTED_MODULE_0__["getOrgEditorOptionsRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getOrgDiagramOptionsRender", function() { return _panels__WEBPACK_IMPORTED_MODULE_0__["getOrgDiagramOptionsRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getFamDiagramOptionsRender", function() { return _panels__WEBPACK_IMPORTED_MODULE_0__["getFamDiagramOptionsRender"]; });

/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enums */ "./samples/javascript.controls/common/enums.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ValueType", function() { return _enums__WEBPACK_IMPORTED_MODULE_1__["ValueType"]; });

/* harmony import */ var _PanelConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PanelConfig */ "./samples/javascript.controls/common/PanelConfig.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PanelConfig", function() { return _PanelConfig__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _Caption__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Caption */ "./samples/javascript.controls/common/Caption.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CaptionConfig", function() { return _Caption__WEBPACK_IMPORTED_MODULE_3__["CaptionConfig"]; });

/* harmony import */ var _RadioBox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./RadioBox */ "./samples/javascript.controls/common/RadioBox.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RadioBoxConfig", function() { return _RadioBox__WEBPACK_IMPORTED_MODULE_4__["RadioBoxConfig"]; });

/* harmony import */ var _Range__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Range */ "./samples/javascript.controls/common/Range.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RangeConfig", function() { return _Range__WEBPACK_IMPORTED_MODULE_5__["RangeConfig"]; });

/* harmony import */ var _Color__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Color */ "./samples/javascript.controls/common/Color.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ColorConfig", function() { return _Color__WEBPACK_IMPORTED_MODULE_6__["ColorConfig"]; });

/* harmony import */ var _Size__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Size */ "./samples/javascript.controls/common/Size.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SizeConfig", function() { return _Size__WEBPACK_IMPORTED_MODULE_7__["SizeConfig"]; });

/* harmony import */ var _CheckBox__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./CheckBox */ "./samples/javascript.controls/common/CheckBox.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CheckBoxConfig", function() { return _CheckBox__WEBPACK_IMPORTED_MODULE_8__["CheckBoxConfig"]; });

/* harmony import */ var _DropDownBox__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./DropDownBox */ "./samples/javascript.controls/common/DropDownBox.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DropDownBoxConfig", function() { return _DropDownBox__WEBPACK_IMPORTED_MODULE_9__["DropDownBoxConfig"]; });

/* harmony import */ var _Render__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Render */ "./samples/javascript.controls/common/Render.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Render", function() { return _Render__WEBPACK_IMPORTED_MODULE_10__["default"]; });













/***/ }),

/***/ "./samples/javascript.controls/common/panels.js":
/*!******************************************************!*\
  !*** ./samples/javascript.controls/common/panels.js ***!
  \******************************************************/
/*! exports provided: getOrgEditorOptionsRender, getOrgDiagramOptionsRender, getFamDiagramOptionsRender */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOrgEditorOptionsRender", function() { return getOrgEditorOptionsRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOrgDiagramOptionsRender", function() { return getOrgDiagramOptionsRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFamDiagramOptionsRender", function() { return getFamDiagramOptionsRender; });
/* harmony import */ var _Render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Render */ "./samples/javascript.controls/common/Render.js");
/* harmony import */ var _PanelConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PanelConfig */ "./samples/javascript.controls/common/PanelConfig.js");
/* harmony import */ var _Caption__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Caption */ "./samples/javascript.controls/common/Caption.js");
/* harmony import */ var _DropDownBox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DropDownBox */ "./samples/javascript.controls/common/DropDownBox.js");
/* harmony import */ var _RadioBox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./RadioBox */ "./samples/javascript.controls/common/RadioBox.js");
/* harmony import */ var _CheckBox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./CheckBox */ "./samples/javascript.controls/common/CheckBox.js");
/* harmony import */ var _Size__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Size */ "./samples/javascript.controls/common/Size.js");
/* harmony import */ var _Color__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Color */ "./samples/javascript.controls/common/Color.js");
/* harmony import */ var _Range__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Range */ "./samples/javascript.controls/common/Range.js");
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./enums */ "./samples/javascript.controls/common/enums.js");
/* harmony import */ var _src_enums__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../src/enums */ "./src/enums.js");
/* harmony import */ var _src_graphics_structs_Size__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../src/graphics/structs/Size */ "./src/graphics/structs/Size.js");












/* Demo Specific Functions */

function getOrgEditorOptionsRender(extraPanels, defaultOptions) {
  var panels = extraPanels;
  panels = panels.concat(getCommonOptionsPanels(function () {}, false));
  return new _Render__WEBPACK_IMPORTED_MODULE_0__["default"](panels, defaultOptions);
}
;
function getOrgDiagramOptionsRender(defaultOptions, onUpdate) {
  var commonOptionsPanels = getCommonOptionsPanels(onUpdate, true);
  return new _Render__WEBPACK_IMPORTED_MODULE_0__["default"](commonOptionsPanels, defaultOptions);
}
;
function getFamDiagramOptionsRender(extraPanels, defaultOptions, onUpdate) {
  var panels = extraPanels;
  panels = panels.concat(getFamDiagramOptionsPanels(onUpdate));
  panels = panels.concat(getAnnotationsOptionsPanels(onUpdate));
  panels = panels.concat(getCommonOptionsPanels(onUpdate, true));
  return new _Render__WEBPACK_IMPORTED_MODULE_0__["default"](panels, defaultOptions);
}
;

function getFamDiagramOptionsPanels(onUpdate) {
  return [new _PanelConfig__WEBPACK_IMPORTED_MODULE_1__["default"]("Family layout", [new _RadioBox__WEBPACK_IMPORTED_MODULE_4__["RadioBoxConfig"]("neighboursSelectionMode", _src_enums__WEBPACK_IMPORTED_MODULE_10__["NeighboursSelectionMode"].ParentsChildrenSiblingsAndSpouses, "Neighbours Selection Modes", _src_enums__WEBPACK_IMPORTED_MODULE_10__["NeighboursSelectionMode"], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].Integer, onUpdate), new _RadioBox__WEBPACK_IMPORTED_MODULE_4__["RadioBoxConfig"]("groupByType", _src_enums__WEBPACK_IMPORTED_MODULE_10__["GroupByType"].Children, "Group by option defines node placement in layout close to its parents or children when node is linked across multiple levels in hierarchy. See \"alignment\" data set.", {
    Children: 2,
    Parents: 1
  }, _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].Integer, onUpdate), new _CheckBox__WEBPACK_IMPORTED_MODULE_5__["CheckBoxConfig"]("alignBylevels", true, "Keep items at the same levels after connections bundling", onUpdate), new _CheckBox__WEBPACK_IMPORTED_MODULE_5__["CheckBoxConfig"]("hideGrandParentsConnectors", true, "Hide direct relations to grand parents. It helps to reduce diagrams connectors layout complexity. This option should be used together with dynamic highlighting of connectors to grandparents via immidiate parents, so information is not lost.", onUpdate), new _CheckBox__WEBPACK_IMPORTED_MODULE_5__["CheckBoxConfig"]("enableMatrixLayout", false, "Enables matrix layout in family diagram. Nodes having the same set of parents and children are grouped into square shaped matrix in order to keep them visualy together.", onUpdate), new _Range__WEBPACK_IMPORTED_MODULE_8__["RangeConfig"]("minimumMatrixSize", null, "Minimum number of nodes needed in order to be formed into matrix layout", 2, 10, 1, onUpdate), new _Range__WEBPACK_IMPORTED_MODULE_8__["RangeConfig"]("maximumColumnsInMatrix", null, "Maximum columns number in matrix nodes layout", 1, 20, 1, onUpdate)])];
}

;

function getAnnotationsOptionsPanels(onUpdate) {
  return [new _PanelConfig__WEBPACK_IMPORTED_MODULE_1__["default"]("On-screen Annotations", [new _RadioBox__WEBPACK_IMPORTED_MODULE_4__["RadioBoxConfig"]("connectorPlacementType", _src_enums__WEBPACK_IMPORTED_MODULE_10__["ConnectorPlacementType"].Offbeat, "Placement type", _src_enums__WEBPACK_IMPORTED_MODULE_10__["ConnectorPlacementType"], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].Integer, onUpdate), new _RadioBox__WEBPACK_IMPORTED_MODULE_4__["RadioBoxConfig"]("connectorShapeType", _src_enums__WEBPACK_IMPORTED_MODULE_10__["ConnectorShapeType"].OneWay, "Connector shape type", _src_enums__WEBPACK_IMPORTED_MODULE_10__["ConnectorShapeType"], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].Integer, onUpdate), new _RadioBox__WEBPACK_IMPORTED_MODULE_4__["RadioBoxConfig"]("labelPlacementType", _src_enums__WEBPACK_IMPORTED_MODULE_10__["ConnectorLabelPlacementType"].Between, "Label Placement type", _src_enums__WEBPACK_IMPORTED_MODULE_10__["ConnectorLabelPlacementType"], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].Integer, onUpdate), new _DropDownBox__WEBPACK_IMPORTED_MODULE_3__["DropDownBoxConfig"]("lineWidth", 1, "Line width", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].Number, onUpdate), new _RadioBox__WEBPACK_IMPORTED_MODULE_4__["RadioBoxConfig"]("lineType", _src_enums__WEBPACK_IMPORTED_MODULE_10__["LineType"].Dashed, "Line type", _src_enums__WEBPACK_IMPORTED_MODULE_10__["LineType"], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].Integer, onUpdate), new _Color__WEBPACK_IMPORTED_MODULE_7__["ColorConfig"]("color", _src_enums__WEBPACK_IMPORTED_MODULE_10__["Colors"].Red, "Color", false, onUpdate), new _DropDownBox__WEBPACK_IMPORTED_MODULE_3__["DropDownBoxConfig"]("offset", 5, "Offset", [-50, -20, -10, -5, 0, 5, 10, 20, 50], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].Number, onUpdate), new _RadioBox__WEBPACK_IMPORTED_MODULE_4__["RadioBoxConfig"]("zOrderType", _src_enums__WEBPACK_IMPORTED_MODULE_10__["ZOrderType"].Auto, "Connector Z order type", _src_enums__WEBPACK_IMPORTED_MODULE_10__["ZOrderType"], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].Integer, onUpdate)], "AnnotationOptions")];
}

;

function getCommonOptionsPanels(onUpdate, showDefaultTemplateOptions) {
  var result = [];
  result.push(new _PanelConfig__WEBPACK_IMPORTED_MODULE_1__["default"]("Auto Layout", [new _Caption__WEBPACK_IMPORTED_MODULE_2__["CaptionConfig"]("Page Fit Mode defines rule of fitting chart into available screen space. Set it to None if you want to disable it.", false), new _RadioBox__WEBPACK_IMPORTED_MODULE_4__["RadioBoxConfig"]("pageFitMode", _src_enums__WEBPACK_IMPORTED_MODULE_10__["PageFitMode"].FitToPage, "Page Fit Mode", {
    None: 0,
    PageWidth: 1,
    PageHeight: 2,
    FitToPage: 3,
    SelectionOnly: 6
  }, _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].Integer, onUpdate), new _RadioBox__WEBPACK_IMPORTED_MODULE_4__["RadioBoxConfig"]("orientationType", _src_enums__WEBPACK_IMPORTED_MODULE_10__["OrientationType"].Top, "Orientation Type", _src_enums__WEBPACK_IMPORTED_MODULE_10__["OrientationType"], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].Integer, onUpdate), new _RadioBox__WEBPACK_IMPORTED_MODULE_4__["RadioBoxConfig"]("verticalAlignment", _src_enums__WEBPACK_IMPORTED_MODULE_10__["VerticalAlignmentType"].Middle, "Items Vertical Alignment", _src_enums__WEBPACK_IMPORTED_MODULE_10__["VerticalAlignmentType"], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].Integer, onUpdate), new _RadioBox__WEBPACK_IMPORTED_MODULE_4__["RadioBoxConfig"]("horizontalAlignment", _src_enums__WEBPACK_IMPORTED_MODULE_10__["HorizontalAlignmentType"].Center, "Items Horizontal Alignment", _src_enums__WEBPACK_IMPORTED_MODULE_10__["HorizontalAlignmentType"], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].Integer, onUpdate), new _RadioBox__WEBPACK_IMPORTED_MODULE_4__["RadioBoxConfig"]("childrenPlacementType", _src_enums__WEBPACK_IMPORTED_MODULE_10__["ChildrenPlacementType"].Horizontal, "Children placement", _src_enums__WEBPACK_IMPORTED_MODULE_10__["ChildrenPlacementType"], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].Integer, onUpdate), new _RadioBox__WEBPACK_IMPORTED_MODULE_4__["RadioBoxConfig"]("leavesPlacementType", _src_enums__WEBPACK_IMPORTED_MODULE_10__["ChildrenPlacementType"].Horizontal, "Leaves placement defines layout shape for items having no children", _src_enums__WEBPACK_IMPORTED_MODULE_10__["ChildrenPlacementType"], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].Integer, onUpdate), new _CheckBox__WEBPACK_IMPORTED_MODULE_5__["CheckBoxConfig"]("placeAdvisersAboveChildren", true, "Place children of advisers above their parent node children", onUpdate), new _CheckBox__WEBPACK_IMPORTED_MODULE_5__["CheckBoxConfig"]("placeAssistantsAboveChildren", true, "Place children of assistants above their parent node children", onUpdate), new _Range__WEBPACK_IMPORTED_MODULE_8__["RangeConfig"]("maximumColumnsInMatrix", null, "Maximum columns number in matrix children layout", 1, 20, 1, onUpdate), new _RadioBox__WEBPACK_IMPORTED_MODULE_4__["RadioBoxConfig"]("minimalVisibility", _src_enums__WEBPACK_IMPORTED_MODULE_10__["Visibility"].Dot, "Minimal nodes visibility", _src_enums__WEBPACK_IMPORTED_MODULE_10__["Visibility"], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].Integer, onUpdate), new _RadioBox__WEBPACK_IMPORTED_MODULE_4__["RadioBoxConfig"]("selectionPathMode", _src_enums__WEBPACK_IMPORTED_MODULE_10__["SelectionPathMode"].FullStack, "Selection Path Mode sets visibility of items between cursor item and root", _src_enums__WEBPACK_IMPORTED_MODULE_10__["SelectionPathMode"], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].Integer, onUpdate)]));
  result.push(new _PanelConfig__WEBPACK_IMPORTED_MODULE_1__["default"]("Default Template", [new _RadioBox__WEBPACK_IMPORTED_MODULE_4__["RadioBoxConfig"]("hasButtons", _src_enums__WEBPACK_IMPORTED_MODULE_10__["Enabled"].Auto, "Show user buttons", _src_enums__WEBPACK_IMPORTED_MODULE_10__["Enabled"], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].Integer, onUpdate), new _RadioBox__WEBPACK_IMPORTED_MODULE_4__["RadioBoxConfig"]("hasSelectorCheckbox", _src_enums__WEBPACK_IMPORTED_MODULE_10__["Enabled"].True, "Show selection check box", _src_enums__WEBPACK_IMPORTED_MODULE_10__["Enabled"], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].Integer, onUpdate), new _DropDownBox__WEBPACK_IMPORTED_MODULE_3__["DropDownBoxConfig"]("selectCheckBoxLabel", "Selected", "Selection checkbox label", ["Selected", "Included", "Pinned", "Any label"], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].String, onUpdate), new _Caption__WEBPACK_IMPORTED_MODULE_2__["CaptionConfig"]("Default chart item template tries to select the best matching font color for current title background.", false), new _Color__WEBPACK_IMPORTED_MODULE_7__["ColorConfig"]("itemTitleFirstFontColor", _src_enums__WEBPACK_IMPORTED_MODULE_10__["Colors"].White, "Title first font color", false, onUpdate), new _Color__WEBPACK_IMPORTED_MODULE_7__["ColorConfig"]("itemTitleSecondFontColor", _src_enums__WEBPACK_IMPORTED_MODULE_10__["Colors"].White, "Title second font color", false, onUpdate), new _Range__WEBPACK_IMPORTED_MODULE_8__["RangeConfig"]("buttonsPanelSize", 28, "Buttons panel size", 10, 100, 2, onUpdate), new _Range__WEBPACK_IMPORTED_MODULE_8__["RangeConfig"]("checkBoxPanelSize", 24, "Checkbox panel size", 2, 100, 2, onUpdate)]));
  result.push(new _PanelConfig__WEBPACK_IMPORTED_MODULE_1__["default"]("Group Titles", [new _RadioBox__WEBPACK_IMPORTED_MODULE_4__["RadioBoxConfig"]("groupTitlePlacementType", _src_enums__WEBPACK_IMPORTED_MODULE_10__["AdviserPlacementType"].Left, "Placement", _src_enums__WEBPACK_IMPORTED_MODULE_10__["AdviserPlacementType"], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].Integer, onUpdate), new _Range__WEBPACK_IMPORTED_MODULE_8__["RangeConfig"]("groupTitlePanelSize", 24, "Group title panel width", 10, 72, 2, onUpdate), new _RadioBox__WEBPACK_IMPORTED_MODULE_4__["RadioBoxConfig"]("groupTitleOrientation", _src_enums__WEBPACK_IMPORTED_MODULE_10__["TextOrientationType"].RotateRight, "Orientation", _src_enums__WEBPACK_IMPORTED_MODULE_10__["TextOrientationType"], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].Integer, onUpdate), new _RadioBox__WEBPACK_IMPORTED_MODULE_4__["RadioBoxConfig"]("groupTitleVerticalAlignment", _src_enums__WEBPACK_IMPORTED_MODULE_10__["VerticalAlignmentType"].Middle, "Vertical Alignment", _src_enums__WEBPACK_IMPORTED_MODULE_10__["VerticalAlignmentType"], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].Integer, onUpdate), new _RadioBox__WEBPACK_IMPORTED_MODULE_4__["RadioBoxConfig"]("groupTitleHorizontalAlignment", _src_enums__WEBPACK_IMPORTED_MODULE_10__["HorizontalAlignmentType"].Center, "Horizontal Alignment", _src_enums__WEBPACK_IMPORTED_MODULE_10__["HorizontalAlignmentType"], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].Integer, onUpdate), new _Color__WEBPACK_IMPORTED_MODULE_7__["ColorConfig"]("groupTitleColor", _src_enums__WEBPACK_IMPORTED_MODULE_10__["Colors"].Black, "Background Color", false, onUpdate), new _Caption__WEBPACK_IMPORTED_MODULE_2__["CaptionConfig"]("For group title color, see title first and second font colors in default template options.", false), new _DropDownBox__WEBPACK_IMPORTED_MODULE_3__["DropDownBoxConfig"]("groupTitleFontSize", "12px", "Font size", ["8px", "10px", "12px", "14px", "16px", "18px", "20px"], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].String, onUpdate), new _RadioBox__WEBPACK_IMPORTED_MODULE_4__["RadioBoxConfig"]("groupTitleFontWeight", "normal", "Font Weight", ["normal", "bold"], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].String, onUpdate), new _RadioBox__WEBPACK_IMPORTED_MODULE_4__["RadioBoxConfig"]("groupTitleFontStyle", "normal", "Font Style", ["normal", "italic"], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].String, onUpdate), new _DropDownBox__WEBPACK_IMPORTED_MODULE_3__["DropDownBoxConfig"]("groupTitleFontFamily", "Arial", "Font Style", ["Arial", "Verdana", "Times New Roman", "Serif", "Courier"], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].String, onUpdate)]));

  if (showDefaultTemplateOptions) {
    result.push(new _PanelConfig__WEBPACK_IMPORTED_MODULE_1__["default"]("Markers", [new _Caption__WEBPACK_IMPORTED_MODULE_2__["CaptionConfig"]("These options are defined per item template. So if you need to show individual markers per item, you have to define template for every marker type and assign it to items. Template is some sort of named property bag.", false), new _Caption__WEBPACK_IMPORTED_MODULE_2__["CaptionConfig"]("By default marker has color of itemTitleColor property, download demos and check samples source data. If item has no title color set, then be sure that you set border line width and color for markers having no fill, othewise you are not going to see them.", false), new _Size__WEBPACK_IMPORTED_MODULE_6__["SizeConfig"]("minimizedItemSize", new _src_graphics_structs_Size__WEBPACK_IMPORTED_MODULE_11__["default"](4, 4), "Marker size", 1, 40, 1, onUpdate), new _DropDownBox__WEBPACK_IMPORTED_MODULE_3__["DropDownBoxConfig"]("minimizedItemCornerRadius", null, "Corner Radius", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].Number, onUpdate), new _DropDownBox__WEBPACK_IMPORTED_MODULE_3__["DropDownBoxConfig"]("highlightPadding", 2, "Highlight border padding around marker", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].Thickness, onUpdate), new _RadioBox__WEBPACK_IMPORTED_MODULE_4__["RadioBoxConfig"]("minimizedItemShapeType", _src_enums__WEBPACK_IMPORTED_MODULE_10__["ShapeType"].None, "Marker Shape", _src_enums__WEBPACK_IMPORTED_MODULE_10__["ShapeType"], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].Integer, onUpdate), new _Range__WEBPACK_IMPORTED_MODULE_8__["RangeConfig"]("minimizedItemLineWidth", 1, "Marker border line width", 0, 10, 1, onUpdate), new _RadioBox__WEBPACK_IMPORTED_MODULE_4__["RadioBoxConfig"]("minimizedItemLineType", _src_enums__WEBPACK_IMPORTED_MODULE_10__["LineType"].Solid, "Marker border line type", _src_enums__WEBPACK_IMPORTED_MODULE_10__["LineType"], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].Integer, onUpdate), new _Caption__WEBPACK_IMPORTED_MODULE_2__["CaptionConfig"]("Following Border and Fill colors properties work only for items having no title color property set. See Parners & Annotations Demo to try them.", false), new _Color__WEBPACK_IMPORTED_MODULE_7__["ColorConfig"]("minimizedItemBorderColor", null, "Marker border line color", true, onUpdate), new _Color__WEBPACK_IMPORTED_MODULE_7__["ColorConfig"]("minimizedItemFillColor", null, "Marker fill color", true, onUpdate), new _Range__WEBPACK_IMPORTED_MODULE_8__["RangeConfig"]("minimizedItemOpacity", 1.0, "Opacity", 0, 1, 0.1, onUpdate)], "DefaultTemplateOptions"));
  }

  result.push(new _PanelConfig__WEBPACK_IMPORTED_MODULE_1__["default"]("Intervals", [new _Caption__WEBPACK_IMPORTED_MODULE_2__["CaptionConfig"]("Vertical Intervals Between Rows", true), new _Range__WEBPACK_IMPORTED_MODULE_8__["RangeConfig"]("normalLevelShift", 20, "Normal", 1, 40, 1, onUpdate), new _Caption__WEBPACK_IMPORTED_MODULE_2__["CaptionConfig"]("If you enable labels for dots, use the following interval to fit them between levels.", false), new _Range__WEBPACK_IMPORTED_MODULE_8__["RangeConfig"]("dotLevelShift", 20, "Dotted", 1, 320, 1, onUpdate), new _Range__WEBPACK_IMPORTED_MODULE_8__["RangeConfig"]("lineLevelShift", 10, "Lined", 1, 320, 1, onUpdate), new _Caption__WEBPACK_IMPORTED_MODULE_2__["CaptionConfig"]("Horizontal Intervals Between Items in Row", true), new _Range__WEBPACK_IMPORTED_MODULE_8__["RangeConfig"]("normalItemsInterval", 10, "Normal", 1, 40, 1, onUpdate), new _Range__WEBPACK_IMPORTED_MODULE_8__["RangeConfig"]("dotItemsInterval", 2, "Dotted", 1, 40, 1, onUpdate), new _Range__WEBPACK_IMPORTED_MODULE_8__["RangeConfig"]("lineItemsInterval", 2, "Lined", 1, 40, 1, onUpdate), new _Range__WEBPACK_IMPORTED_MODULE_8__["RangeConfig"]("cousinsIntervalMultiplier", 5, "Additional interval multiplier between cousins, it creates extra space between hierarchies", 1, 40, 1, onUpdate)]));
  result.push(new _PanelConfig__WEBPACK_IMPORTED_MODULE_1__["default"]("Connectors", [new _RadioBox__WEBPACK_IMPORTED_MODULE_4__["RadioBoxConfig"]("arrowsDirection", _src_enums__WEBPACK_IMPORTED_MODULE_10__["GroupByType"].None, "Arrows Direction", _src_enums__WEBPACK_IMPORTED_MODULE_10__["GroupByType"], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].Integer, onUpdate), new _RadioBox__WEBPACK_IMPORTED_MODULE_4__["RadioBoxConfig"]("connectorType", _src_enums__WEBPACK_IMPORTED_MODULE_10__["ConnectorType"].Squared, "Connectors", _src_enums__WEBPACK_IMPORTED_MODULE_10__["ConnectorType"], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].Integer, onUpdate), new _RadioBox__WEBPACK_IMPORTED_MODULE_4__["RadioBoxConfig"]("elbowType", _src_enums__WEBPACK_IMPORTED_MODULE_10__["ElbowType"].None, "Elbows Type", _src_enums__WEBPACK_IMPORTED_MODULE_10__["ElbowType"], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].Integer, onUpdate), new _Range__WEBPACK_IMPORTED_MODULE_8__["RangeConfig"]("bevelSize", 4, "Bevel Size", 1, 10, 1, onUpdate), new _Range__WEBPACK_IMPORTED_MODULE_8__["RangeConfig"]("elbowDotSize", 4, "Elbow dot Size", 1, 10, 1, onUpdate), new _RadioBox__WEBPACK_IMPORTED_MODULE_4__["RadioBoxConfig"]("linesType", _src_enums__WEBPACK_IMPORTED_MODULE_10__["LineType"].Solid, "Line type", _src_enums__WEBPACK_IMPORTED_MODULE_10__["LineType"], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].Integer, onUpdate), new _Color__WEBPACK_IMPORTED_MODULE_7__["ColorConfig"]("linesColor", _src_enums__WEBPACK_IMPORTED_MODULE_10__["Colors"].Silver, "Color", false, onUpdate), new _Range__WEBPACK_IMPORTED_MODULE_8__["RangeConfig"]("linesWidth", 1, "Line width", 1, 10, 1, onUpdate), new _CheckBox__WEBPACK_IMPORTED_MODULE_5__["CheckBoxConfig"]("showExtraArrows", true, "Show extra horizontal arrows on top of connectors for easy navigation between parents and children through connector lines", onUpdate), new _Range__WEBPACK_IMPORTED_MODULE_8__["RangeConfig"]("extraArrowsMinimumSpace", 30, "Available minimum space to show horizontal arrow", 1, 200, 1, onUpdate)]));
  result.push(new _PanelConfig__WEBPACK_IMPORTED_MODULE_1__["default"]("Labels", [new _Caption__WEBPACK_IMPORTED_MODULE_2__["CaptionConfig"]("Label property should be defined for every item first, otherwise chart has nothiong to show. Labels are visible only for markers. If you need to add labels to normal size items you have to modify default item template and place text outside item boundaries.", false), new _RadioBox__WEBPACK_IMPORTED_MODULE_4__["RadioBoxConfig"]("showLabels", _src_enums__WEBPACK_IMPORTED_MODULE_10__["Enabled"].Auto, "Show labels", _src_enums__WEBPACK_IMPORTED_MODULE_10__["Enabled"], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].Integer, onUpdate), new _Size__WEBPACK_IMPORTED_MODULE_6__["SizeConfig"]("labelSize", new _src_graphics_structs_Size__WEBPACK_IMPORTED_MODULE_11__["default"](80, 24), "Size: Use this property to define labels bounding rectangle. Labels placed relative to markers(dots), so when they overlap in auto show mode one of them would be hidden. Set appropriate intervals between levels of markers in order to fit and make all labels visible.", 1, 400, 1, onUpdate), new _Range__WEBPACK_IMPORTED_MODULE_8__["RangeConfig"]("labelOffset", 1, "Offset", 0, 30, 1, onUpdate), new _RadioBox__WEBPACK_IMPORTED_MODULE_4__["RadioBoxConfig"]("labelOrientation", _src_enums__WEBPACK_IMPORTED_MODULE_10__["TextOrientationType"].Horizontal, "Label Orientation", _src_enums__WEBPACK_IMPORTED_MODULE_10__["TextOrientationType"], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].Integer, onUpdate), new _RadioBox__WEBPACK_IMPORTED_MODULE_4__["RadioBoxConfig"]("labelPlacement", _src_enums__WEBPACK_IMPORTED_MODULE_10__["PlacementType"].Top, "Label Placement", _src_enums__WEBPACK_IMPORTED_MODULE_10__["PlacementType"], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].Integer, onUpdate), new _DropDownBox__WEBPACK_IMPORTED_MODULE_3__["DropDownBoxConfig"]("labelFontSize", "10px", "Font size", ["8px", "10px", "12px", "14px", "16px", "18px", "20px"], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].String, onUpdate), new _DropDownBox__WEBPACK_IMPORTED_MODULE_3__["DropDownBoxConfig"]("labelFontFamily", "Arial", "Font Name", ["Arial", "Verdana", "Times New Roman", "Serif", "Courier"], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].String, onUpdate), new _Color__WEBPACK_IMPORTED_MODULE_7__["ColorConfig"]("labelColor", _src_enums__WEBPACK_IMPORTED_MODULE_10__["Colors"].Black, "Font Color", false, onUpdate), new _RadioBox__WEBPACK_IMPORTED_MODULE_4__["RadioBoxConfig"]("labelFontWeight", "normal", "Font Weight", ["normal", "bold"], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].String, onUpdate), new _RadioBox__WEBPACK_IMPORTED_MODULE_4__["RadioBoxConfig"]("labelFontStyle", "normal", "Font Style", ["normal", "italic"], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].String, onUpdate)]));
  result.push(new _PanelConfig__WEBPACK_IMPORTED_MODULE_1__["default"]("Callout", [new _Caption__WEBPACK_IMPORTED_MODULE_2__["CaptionConfig"]("By default callout displays item content, but it can be redefined with custom callout template.", false), new _RadioBox__WEBPACK_IMPORTED_MODULE_4__["RadioBoxConfig"]("calloutMaximumVisibility", _src_enums__WEBPACK_IMPORTED_MODULE_10__["Visibility"].Dot, "Maximum node type visibility", {
    Normal: 1,
    Dot: 2,
    Line: 3
  }, _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].Integer, onUpdate), new _CheckBox__WEBPACK_IMPORTED_MODULE_5__["CheckBoxConfig"]("showCallout", true, "This option controls callout visibility for minimized items and it can be ovewritten per item", onUpdate), new _Range__WEBPACK_IMPORTED_MODULE_8__["RangeConfig"]("calloutPlacementOffset", 100, "Call out placement offset", 10, 300, 10, onUpdate), new _Color__WEBPACK_IMPORTED_MODULE_7__["ColorConfig"]("calloutfillColor", "#000000", "Fill color", true, onUpdate), new _Color__WEBPACK_IMPORTED_MODULE_7__["ColorConfig"]("calloutBorderColor", "#000000", "Border line color", true, onUpdate), new _Range__WEBPACK_IMPORTED_MODULE_8__["RangeConfig"]("calloutOffset", 1, "Offset", 0, 30, 1, onUpdate), new _DropDownBox__WEBPACK_IMPORTED_MODULE_3__["DropDownBoxConfig"]("calloutCornerRadius", 4, "Corner Radius", ["0%", "5%", "10%", "20%", 0, 1, 2, 3, 4, 5, 10, 20, 30], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].String, onUpdate), new _DropDownBox__WEBPACK_IMPORTED_MODULE_3__["DropDownBoxConfig"]("calloutPointerWidth", "10%", "Pointer Base Width", ["0%", "5%", "10%", "20%", 0, 5, 10, 20, 50], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].String, onUpdate), new _Range__WEBPACK_IMPORTED_MODULE_8__["RangeConfig"]("calloutLineWidth", 1, "Line width", 0, 10, 1, onUpdate), new _Range__WEBPACK_IMPORTED_MODULE_8__["RangeConfig"]("calloutOpacity", 0.2, "Opacity", 0, 1, 0.1, onUpdate)]));
  result.push(new _PanelConfig__WEBPACK_IMPORTED_MODULE_1__["default"]("Interactivity", [new _Caption__WEBPACK_IMPORTED_MODULE_2__["CaptionConfig"]("Use this option to disable mouse highlight on touch devices.", false), new _RadioBox__WEBPACK_IMPORTED_MODULE_4__["RadioBoxConfig"]("navigationMode", _src_enums__WEBPACK_IMPORTED_MODULE_10__["NavigationMode"].Default, "Navigation mode", _src_enums__WEBPACK_IMPORTED_MODULE_10__["NavigationMode"], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].Integer, onUpdate), new _Caption__WEBPACK_IMPORTED_MODULE_2__["CaptionConfig"]("This option defines highlight gravity radius, so minimized item gets highlighted when mouse pointer does not overlap marker but it is within gravity radius of its boundaries.", false), new _Range__WEBPACK_IMPORTED_MODULE_8__["RangeConfig"]("highlightGravityRadius", 40, "Gravity radius", 0, 100, 1, onUpdate), new _CheckBox__WEBPACK_IMPORTED_MODULE_5__["CheckBoxConfig"]("enablePanning", true, "Enable Panning", onUpdate)]));
  result.push(new _PanelConfig__WEBPACK_IMPORTED_MODULE_1__["default"]("Rendering", [new _Caption__WEBPACK_IMPORTED_MODULE_2__["CaptionConfig"]("By default widget preferes SVG graphics mode. Use this property to enforce graphics mode programmatically.", false), new _RadioBox__WEBPACK_IMPORTED_MODULE_4__["RadioBoxConfig"]("graphicsType", _src_enums__WEBPACK_IMPORTED_MODULE_10__["GraphicsType"].SVG, "Graphics", _src_enums__WEBPACK_IMPORTED_MODULE_10__["GraphicsType"], _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].Integer, onUpdate), new _Caption__WEBPACK_IMPORTED_MODULE_2__["CaptionConfig"]("In order to achive better greacefull degradation of your diagram use item templates of various sizes instead of CSS scale.", false), new _DropDownBox__WEBPACK_IMPORTED_MODULE_3__["DropDownBoxConfig"]("scale", 1.0, "CSS Scale", {
    "50%": 0.5,
    "60%": 0.6,
    "70%": 0.7,
    "80%": 0.8,
    "90%": 0.9,
    "100%": 1.0,
    "110%": 1.1,
    "120%": 1.2,
    "130%": 1.3,
    "140%": 1.4,
    "150%": 1.5,
    "160%": 1.6,
    "170%": 1.7,
    "180%": 1.8,
    "190%": 1.9,
    "200%": 2.0
  }, _enums__WEBPACK_IMPORTED_MODULE_9__["ValueType"].Number, onUpdate)]));
  result.push(new _PanelConfig__WEBPACK_IMPORTED_MODULE_1__["default"]("Frame", [new _Caption__WEBPACK_IMPORTED_MODULE_2__["CaptionConfig"]("Displays selected items outside view port area.", false), new _CheckBox__WEBPACK_IMPORTED_MODULE_5__["CheckBoxConfig"]("showFrame", true, "Show Frame", onUpdate), new _Range__WEBPACK_IMPORTED_MODULE_8__["RangeConfig"]("frameInnerPadding", 2, "Frame inner padding", 0, 10, 1, onUpdate), new _Range__WEBPACK_IMPORTED_MODULE_8__["RangeConfig"]("frameOuterPadding", 2, "Frame outer padding", 0, 10, 1, onUpdate)]));
  return result;
}

;

/***/ }),

/***/ "./src/common/index.js":
/*!*****************************!*\
  !*** ./src/common/index.js ***!
  \*****************************/
/*! exports provided: isEven, isNullOrEmpty, loop, splitCamelCaseName, isObject, isEmptyObject, cloneObject, mergeObjects, getHashCode, compareArrays */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEven", function() { return isEven; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNullOrEmpty", function() { return isNullOrEmpty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loop", function() { return loop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "splitCamelCaseName", function() { return splitCamelCaseName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return isObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEmptyObject", function() { return isEmptyObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneObject", function() { return cloneObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeObjects", function() { return mergeObjects; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHashCode", function() { return getHashCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compareArrays", function() { return compareArrays; });
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Indicates whether the specified number is even or not.
 * 
 * @param {number} value The number to test.
 * @returns {boolean} Returns true if the value is even.
 * @ignore
 */
function isEven(value) {
  return value % 2 == 0;
}
;
/**
 * Indicates whether the specified string is null or an Empty string.
 * 
 * @ignore
 * @param {string} value The string to test.
 * @returns {boolean} Returns true if the value is null or an empty string(""); otherwise, false.
 */

function isNullOrEmpty(value) {
  var result = true,
      string;

  if (value !== undefined && value !== null) {
    string = value.toString();

    if (string.length > 0) {
      result = false;
    }
  }

  return result;
}
;
/**
 * Callback for looping collection items
 *
 * @callback onLoopItemCallback
 * @param {number} index An index of the collection item
 * @param {Object} item A collection item
 * @returns {boolean} Returns true to break iteration process
 */

/**
 * Loops array elements or object properties.
 *
 * @param {Object} thisArg The callback function invocation context
 * @param {Object|Object[]} items - Array of items or object with properties to iterate on
 * @param {onLoopItemCallback} onItem A call back function to call on each item in the array or object.
 * @ignore
 */

function loop(thisArg, items, onItem) {
  var key, index, len;

  if (onItem != null) {
    if (Array.isArray(items)) {
      for (index = 0, len = items.length; index < len; index += 1) {
        if (onItem.call(thisArg, index, items[index])) {
          break;
        }
      }
    } else {
      for (key in items) {
        if (items.hasOwnProperty(key)) {
          if (onItem.call(thisArg, key, items[key])) {
            break;
          }
        }
      }
    }
  }
}
;
/**
 * Splits string of merged cameled words into array.
 * 
 * @param {string} name String of cameled words
 * @returns {string[]} Returns array of cameled words
 * @ignore
 */

function splitCamelCaseName(name) {
  var result = [];
  var word = "";

  for (var i = 0; i < name.length; i += 1) {
    var c = name[i];

    if (c >= 'A' && c <= 'Z') {
      if (word !== "") {
        result.push(word);
      }

      word = c;
    } else {
      word += c;
    }
  }

  if (word !== "") {
    result.push(word);
  }

  return result;
}
;
/**
 * Indicates whether the specified value is object
 * 
 * @param {string} item The value to test.
 * @returns {boolean} Returns true if the item is object otherwise, false.
 * @ignore
 */

function isObject(item) {
  return item !== null && _typeof(item) == 'object';
}
;
/**
 * Indicates whether the specified object is empty.
 * 
 * @param {string} item The object to test.
 * @returns {boolean} Returns true if the item is empty object otherwise, false.
 * @ignore
 */

function isEmptyObject(item) {
  var key;

  for (key in item) {
    if (item.hasOwnProperty(key)) {
      return false;
    }
  }

  return true;
}
;
/**
 * Makes deep copy of the object.
 * 
 * @param {object} source The source object to take values from
 * @param {boolean} isShallow If true then method makes shallow copy
 * @returns {object} Returns cloned copy of the object
 * @ignore
 */

function cloneObject(source, isShallow) {
  var result;

  if (source === null) {
    result = null;
  } else if (Array.isArray(source)) {
    if (isShallow) {
      result = source.slice(0);
    } else {
      result = [];

      for (var index = 0, len = source.length; index < len; index += 1) {
        result.push(cloneObject(source[index], isShallow));
      }
    }
  } else {
    switch (_typeof(source)) {
      case 'object':
        result = {};

        for (var property in source) {
          if (source.hasOwnProperty(property)) {
            if (isShallow) {
              result[property] = source[property];
            } else {
              result[property] = cloneObject(source[property], isShallow);
            }
          }
        }

        break;

      default:
        result = source;
        break;
    }
  }

  return result;
}
;
/**
 * Shallow copy of source object properites into destination
 * 
 * @param {object} destination The object to add properties to
 * @param {object} source The source object to take values from
 * @returns {object} Returns reference to destination object
 * @ignore
 */

function mergeObjects(destination, source) {
  for (var index = 1; index < arguments.length; index += 1) {
    var src = arguments[index];

    if (src !== undefined) {
      for (var key in src) {
        if (src.hasOwnProperty(key)) {
          destination[key] = src[key];
        }
      }
    }
  }

  return destination;
}
;
/**
 * Returns hash code for specified string value. This function is not needed because 
 * JavaScript supports near unlimited length of object property names.
 * 
 * @param {string} value The string to calculate hash code for.
 * @returns {number} Returns hash code for the given string
 * @ignore
 */

function getHashCode(value) {
  var hash = 0,
      character,
      i;
  /*ignore jslint start*/

  if (value.length > 0) {
    for (i = 0; i < value.length; i += 1) {
      character = value.charCodeAt(i);
      hash = (hash << 5) - hash + character;
      hash = hash & hash;
    }
  }
  /*ignore jslint end*/


  return hash;
}
;
/**
 * Callback for getting item key for an element of the array
 *
 * @callback getKeyFuncCallback
 * @param {Object} item A collection item
 * @returns {number} Returns key of the item 
 */

/**
 * Compares non-sorted arrays.
 *
 * @param {Object[]} array1 - The first collection of elements.
 * @param {Object[]} array2 - The second collection of elements.
 * @param {getKeyFuncCallback|undefined} getKeyFunc If callback function is defined it is used to get a key for an array element
 * @returns {boolean} Returns true if the arrays are identical.
 */

function compareArrays(array1, array2, getKeyFunc) {
  var result = true,
      index,
      len,
      value,
      hashArray1;

  if (array1.length != array2.length) {
    result = false;
  } else {
    hashArray1 = {};

    for (index = 0, len = array1.length; index < len; index += 1) {
      value = getKeyFunc != null ? getKeyFunc(array1[index]) : array1[index];

      if (hashArray1.hasOwnProperty(value)) {
        hashArray1[value] += 1;
      } else {
        hashArray1[value] = 1;
      }
    }

    for (index = 0, len = array2.length; index < len; index += 1) {
      value = getKeyFunc != null ? getKeyFunc(array2[index]) : array2[index];

      if (!hashArray1.hasOwnProperty(value)) {
        result = false;
        break;
      } else {
        hashArray1[value] -= 1;

        if (hashArray1[value] < 0) {
          result = false;
          break;
        }
      }
    }
  }

  return result;
}
;

/***/ }),

/***/ "./src/common/jsonml-html.js":
/*!***********************************!*\
  !*** ./src/common/jsonml-html.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
  jsonml-html.js
  JsonML to HTML utility

  Created: 2006-11-09-0116
  Modified: 2012-11-24-1051

  Copyright (c)2006-2012 Stephen M. McKamey
  Distributed under The MIT License: http://jsonml.org/license

  This file ensures a global JsonML object adding these methods:

    JsonML.toHTML(JsonML, filter)

      This method produces a tree of DOM elements from a JsonML tree. The
      array must not contain any cyclical references.

      The optional filter parameter is a function which can filter and
      transform the results. It receives each of the DOM nodes, and
      its return value is used instead of the original value. If it
      returns what it received, then structure is not modified. If it
      returns undefined then the member is deleted.

      This is useful for binding unobtrusive JavaScript to the generated
      DOM elements.

      Example:

      // Parses the structure. If an element has a specific CSS value then
      // takes appropriate action: Remove from results, add special event
      // handlers, or bind to a custom component.

      var myUI = JsonML.toHTML(myUITemplate, function (elem) {
        if (elem.className.indexOf('Remove-Me') >= 0) {
          // this will remove from resulting DOM tree
          return null;
        }

        if (elem.tagName && elem.tagName.toLowerCase() === 'a' &&
          elem.className.indexOf('External-Link') >= 0) {
          // this is the equivalent of target='_blank'
          elem.onclick = function(evt) {
            window.open(elem.href); return false;
          };

        } else if (elem.className.indexOf('Fancy-Widgit') >= 0) {
          // bind to a custom component
          FancyWidgit.bindDOM(elem);
        }
        return elem;
      });

    JsonML.toHTMLText(JsonML)
      Converts JsonML to HTML text

    // Implement onerror to handle any runtime errors while binding:
    JsonML.onerror = function (ex, jml, filter) {
      // display inline error message
      return document.createTextNode('['+ex+']');
    };
*/
var JsonML = {};

if (typeof document !== 'undefined') {
  (function (JsonML, document) {
    'use strict';
    /**
     * Attribute name map
     * 
     * @private
     * @constant
     * @type {Object.<string>}
     */

    var ATTR_MAP = {
      'accesskey': 'accessKey',
      'bgcolor': 'bgColor',
      'cellpadding': 'cellPadding',
      'cellspacing': 'cellSpacing',
      'checked': 'defaultChecked',
      'class': 'className',
      'colspan': 'colSpan',
      'contenteditable': 'contentEditable',
      'defaultchecked': 'defaultChecked',
      'for': 'htmlFor',
      'formnovalidate': 'formNoValidate',
      'hidefocus': 'hideFocus',
      'ismap': 'isMap',
      'maxlength': 'maxLength',
      'novalidate': 'noValidate',
      'readonly': 'readOnly',
      'rowspan': 'rowSpan',
      'spellcheck': 'spellCheck',
      'tabindex': 'tabIndex',
      'usemap': 'useMap',
      'willvalidate': 'willValidate' // can add more attributes here as needed

    };
    /**
     * Attribute duplicates map
     * 
     * @private
     * @constant
     * @type {Object.<string>}
     */

    var ATTR_DUP = {
      'enctype': 'encoding',
      'onscroll': 'DOMMouseScroll' // can add more attributes here as needed

    };
    /**
     * Attributes to be set via DOM
     * 
     * @private
     * @constant
     * @type {Object.<number>}
     */

    var ATTR_DOM = {
      'autocapitalize': 1,
      'autocomplete': 1,
      'autocorrect': 1 // can add more attributes here as needed

    };
    /**
     * Boolean attribute map
     * 
     * @private
     * @constant
     * @type {Object.<number>}
     */

    var ATTR_BOOL = {
      'async': 1,
      'autofocus': 1,
      'checked': 1,
      'defaultchecked': 1,
      'defer': 1,
      'disabled': 1,
      'formnovalidate': 1,
      'hidden': 1,
      'indeterminate': 1,
      'ismap': 1,
      'multiple': 1,
      'novalidate': 1,
      'readonly': 1,
      'required': 1,
      'spellcheck': 1,
      'willvalidate': 1 // can add more attributes here as needed

    };
    /**
     * Leading SGML line ending pattern
     * 
     * @private
     * @constant
     * @type {RegExp}
     */

    var LEADING = /^[\r\n]+/;
    /**
     * Trailing SGML line ending pattern
     * 
     * @private
     * @constant
     * @type {RegExp}
     */

    var TRAILING = /[\r\n]+$/;
    /**
     * @private
     * @const
     * @type {number}
     */

    var NUL = 0;
    /**
     * @private
     * @const
     * @type {number}
     */

    var FUN = 1;
    /**
     * @private
     * @const
     * @type {number}
     */

    var ARY = 2;
    /**
     * @private
     * @const
     * @type {number}
     */

    var OBJ = 3;
    /**
     * @private
     * @const
     * @type {number}
     */

    var VAL = 4;
    /**
     * @private
     * @const
     * @type {number}
     */

    var RAW = 5;
    /**
     * Wraps a data value to maintain as raw markup in output
     * 
     * @private
     * @this {Markup}
     * @param {string} value The value
     * @constructor
     */

    function Markup(value) {
      /**
       * @type {string}
       * @const
       * @protected
       */
      this.value = value;
    }
    /**
     * Renders the value
     * 
     * @public
     * @ignore
     * @override
     * @this {Markup}
     * @return {string} value
     */


    Markup.prototype.toString = function () {
      return this.value;
    };
    /**
     * @ignore
     * @param {string} value
     * @return {Markup}
     */


    JsonML.raw = function (value) {
      return new Markup(value);
    };
    /**
     * @ignore
     * @param {*} value
     * @return {boolean}
     */


    var isMarkup = JsonML.isRaw = function (value) {
      return value instanceof Markup;
    };
    /**
     * Determines if the value is an Array
     * 
     * @private
     * @param {*} val the object being tested
     * @return {boolean}
     */


    var isArray = Array.isArray || function (val) {
      return val instanceof Array;
    };
    /**
     * Determines if the value is a function
     * 
     * @private
     * @param {*} val the object being tested
     * @return {boolean}
     */


    function isFunction(val) {
      return typeof val === 'function';
    }
    /**
     * Determines the type of the value
     * 
     * @private
     * @param {*} val the object being tested
     * @return {number}
     */


    function getType(val) {
      switch (_typeof(val)) {
        case 'object':
          return !val ? NUL : isArray(val) ? ARY : isMarkup(val) ? RAW : val instanceof Date ? VAL : OBJ;

        case 'function':
          return FUN;

        case 'undefined':
          return NUL;

        default:
          return VAL;
      }
    }
    /**
     * Creates a DOM element 
     * 
     * @private
     * @param {string} tag The element's tag name
     * @return {Node}
     */


    var createElement = function createElement(tag) {
      if (!tag) {
        // create a document fragment to hold multiple-root elements
        if (document.createDocumentFragment) {
          return document.createDocumentFragment();
        }

        tag = '';
      } else if (tag.charAt(0) === '!') {
        return document.createComment(tag === '!' ? '' : tag.substr(1) + ' ');
      }

      if (tag.toLowerCase() === 'style' && document.createStyleSheet) {
        // IE requires this interface for styles
        return document.createStyleSheet();
      }

      return document.createElement(tag);
    };
    /**
     * Adds an event handler to an element
     * 
     * @private
     * @param {Node} elem The element
     * @param {string} name The event name
     * @param {function(Event)} handler The event handler
     */


    var addHandler = function addHandler(elem, name, handler) {
      if (name.substr(0, 2) === 'on') {
        name = name.substr(2);
      }

      switch (_typeof(handler)) {
        case 'function':
          if (elem.addEventListener) {
            // DOM Level 2
            elem.addEventListener(name, handler, false);
          } else if (elem.attachEvent && getType(elem[name]) !== NUL) {
            // IE legacy events
            elem.attachEvent('on' + name, handler);
          } else {
            // DOM Level 0
            var old = elem['on' + name] || elem[name];
            elem['on' + name] = elem[name] = !isFunction(old) ? handler : function (e) {
              return old.call(this, e) !== false && handler.call(this, e) !== false;
            };
          }

          break;

        case 'string':
          // inline functions are DOM Level 0

          /*jslint evil:true */
          elem['on' + name] = new Function('event', handler);
          /*jslint evil:false */

          break;
      }
    };
    /**
     * Apply styles to element
     * 
     * @public
     * @ignore
     * @param {Node} elem The element
     * @param {Object} css styles object
     * @return {Node}
     */


    var applyStyles = JsonML.applyStyles = function (elem, css) {
      for (var key in css) {
        if (css.hasOwnProperty(key)) {
          elem.style[key] = css[key];
        }
      }

      return elem;
    };
    /**
     * Appends an attribute to an element
     * 
     * @private
     * @param {Node} elem The element
     * @param {Object} attr Attributes object
     * @return {Node}
     */


    var addAttributes = function addAttributes(elem, attr) {
      if (attr.name && document.attachEvent && !elem.parentNode) {
        try {
          // IE fix for not being able to programatically change the name attribute
          var alt = createElement('<' + elem.tagName + ' name="' + attr.name + '">'); // fix for Opera 8.5 and Netscape 7.1 creating malformed elements

          if (elem.tagName === alt.tagName) {
            elem = alt;
          }
        } catch (ex) {}
      } // for each attributeName


      for (var name in attr) {
        if (attr.hasOwnProperty(name)) {
          // attributeValue
          var value = attr[name],
              type = getType(value);

          if (name) {
            if (type === NUL) {
              value = '';
              type = VAL;
            }

            name = ATTR_MAP[name.toLowerCase()] || name;

            if (name === '$') {
              value(elem);
            } else if (name == 'className') {
              if (isArray(value)) {
                for (var index = 0; index < value.length; index += 1) {
                  elem.className += " " + value[index];
                }
              } else {
                elem.className += " " + value;
              }
            } else if (name === 'style') {
              if (getType(elem.style.cssText) !== NUL) {
                if (typeof value == "string") {
                  elem.style.cssText = value;
                } else {
                  applyStyles(elem, value);
                }
              } else {
                elem.style = value;
              }
            } else if (name.substr(0, 2) === 'on') {
              addHandler(elem, name, value); // also set duplicated events

              name = ATTR_DUP[name];

              if (name) {
                addHandler(elem, name, value);
              }
            } else if (!ATTR_DOM[name.toLowerCase()] && (type !== VAL || name.charAt(0) === '$' || getType(elem[name]) !== NUL || getType(elem[ATTR_DUP[name]]) !== NUL)) {
              // direct setting of existing properties
              elem[name] = value; // also set duplicated properties

              name = ATTR_DUP[name];

              if (name) {
                elem[name] = value;
              }
            } else if (ATTR_BOOL[name.toLowerCase()]) {
              if (value) {
                // boolean attributes
                elem.setAttribute(name, name); // also set duplicated attributes

                name = ATTR_DUP[name];

                if (name) {
                  elem.setAttribute(name, name);
                }
              }
            } else {
              // http://www.quirksmode.org/dom/w3c_core.html#attributes
              // custom and 'data-*' attributes
              elem.setAttribute(name, value); // also set duplicated attributes

              name = ATTR_DUP[name];

              if (name) {
                elem.setAttribute(name, value);
              }
            }
          }
        }
      }

      return elem;
    };
    /**
     * Appends a child to an element
     * 
     * @private
     * @param {Node} elem The parent element
     * @param {Node} child The child
     */


    var appendDOM = JsonML.appendDOM = function (elem, child) {
      if (child) {
        var tag = (elem.tagName || '').toLowerCase();

        if (elem.nodeType === 8) {
          // comment
          if (child.nodeType === 3) {
            // text node
            elem.nodeValue += child.nodeValue;
          }
        } else if (tag === 'table' && elem.tBodies) {
          if (!child.tagName) {
            // must unwrap documentFragment for tables
            if (child.nodeType === 11) {
              while (child.firstChild) {
                appendDOM(elem, child.removeChild(child.firstChild));
              }
            }

            return;
          } // in IE must explicitly nest TRs in TBODY


          var childTag = child.tagName.toLowerCase(); // child tagName

          if (childTag && childTag !== 'tbody' && childTag !== 'thead') {
            // insert in last tbody
            var tBody = elem.tBodies.length > 0 ? elem.tBodies[elem.tBodies.length - 1] : null;

            if (!tBody) {
              tBody = createElement(childTag === 'th' ? 'thead' : 'tbody');
              elem.appendChild(tBody);
            }

            tBody.appendChild(child);
          } else if (elem.canHaveChildren !== false) {
            elem.appendChild(child);
          }
        } else if (tag === 'style' && document.createStyleSheet) {
          // IE requires this interface for styles
          elem.cssText = child;
        } else if (elem.canHaveChildren !== false) {
          elem.appendChild(child);
        } else if (tag === 'object' && child.tagName && child.tagName.toLowerCase() === 'param') {
          // IE-only path
          try {
            elem.appendChild(child);
          } catch (ex1) {}

          try {
            if (elem.object) {
              elem.object[child.name] = child.value;
            }
          } catch (ex2) {}
        }
      }
    };
    /**
     * Tests a node for whitespace
     * 
     * @private
     * @param {Node} node The node
     * @return {boolean}
     */


    var isWhitespace = function isWhitespace(node) {
      return !!node && node.nodeType === 3 && (!node.nodeValue || !/\S/.exec(node.nodeValue));
    };
    /**
     * Trims whitespace pattern from the text node
     * 
     * @private
     * @param {Node} node The node
     */


    var trimPattern = function trimPattern(node, pattern) {
      if (!!node && node.nodeType === 3 && pattern.exec(node.nodeValue)) {
        node.nodeValue = node.nodeValue.replace(pattern, '');
      }
    };
    /**
     * Removes leading and trailing whitespace nodes
     * 
     * @private
     * @param {Node} elem The node
     */


    var trimWhitespace = function trimWhitespace(elem) {
      if (elem) {
        while (isWhitespace(elem.firstChild)) {
          // trim leading whitespace text nodes
          elem.removeChild(elem.firstChild);
        } // trim leading whitespace text


        trimPattern(elem.firstChild, LEADING);

        while (isWhitespace(elem.lastChild)) {
          // trim trailing whitespace text nodes
          elem.removeChild(elem.lastChild);
        } // trim trailing whitespace text


        trimPattern(elem.lastChild, TRAILING);
      }
    };
    /**
     * Converts the markup to DOM nodes
     * 
     * @private
     * @param {string|Markup} value The node
     * @return {Node}
     */


    var toDOM = function toDOM(value) {
      var wrapper = createElement('div');
      wrapper.innerHTML = '' + value; // trim extraneous whitespace

      trimWhitespace(wrapper); // eliminate wrapper for single nodes

      if (wrapper.childNodes.length === 1) {
        return wrapper.firstChild;
      } // create a document fragment to hold elements


      var frag = createElement('');

      while (wrapper.firstChild) {
        frag.appendChild(wrapper.firstChild);
      }

      return frag;
    };
    /**
     * Default error handler
     * @ignore
     * @param {Error} ex
     * @return {Node}
     */


    var onError = function onError(ex) {
      return document.createTextNode('[' + ex + ']');
    };
    /* override this to perform custom error handling during binding */


    JsonML.onerror = null;
    /**
     * also used by JsonML.BST
     * @ignore
     * @param {Node} elem
     * @param {*} jml
     * @param {function} filter
     * @return {Node}
     */

    var patch = JsonML.patch = function (elem, jml, filter) {
      for (var i = 1; i < jml.length; i += 1) {
        if (isArray(jml[i]) || 'string' === typeof jml[i]) {
          // append children
          appendDOM(elem, toHTML(jml[i], filter));
        } else if (isMarkup(jml[i])) {
          appendDOM(elem, toDOM(jml[i].value));
        } else if ('object' === _typeof(jml[i]) && jml[i] !== null && elem.nodeType === 1) {
          // add attributes
          elem = addAttributes(elem, jml[i]);
        }
      }

      return elem;
    };
    /**
     * Main builder entry point
     * @ignore
     * @param {string|array} jml
     * @param {function} filter
     * @return {Node}
     */


    var toHTML = JsonML.toHTML = function (jml, filter) {
      try {
        if (!jml) {
          return null;
        }

        if ('string' === typeof jml) {
          return document.createTextNode(jml);
        }

        if (isMarkup(jml)) {
          return toDOM(jml.value);
        }

        if (!isArray(jml) || 'string' !== typeof jml[0]) {
          throw new SyntaxError('invalid JsonML');
        }

        var tagName = jml[0]; // tagName

        if (!tagName) {
          // correctly handle a list of JsonML trees
          // create a document fragment to hold elements
          var frag = createElement('');

          for (var i = 1; i < jml.length; i += 1) {
            appendDOM(frag, toHTML(jml[i], filter));
          } // trim extraneous whitespace


          trimWhitespace(frag); // eliminate wrapper for single nodes

          if (frag.childNodes.length === 1) {
            return frag.firstChild;
          }

          return frag;
        }

        if (tagName.toLowerCase() === 'style' && document.createStyleSheet) {
          // IE requires this interface for styles
          patch(document.createStyleSheet(), jml, filter); // in IE styles are effective immediately

          return null;
        }

        var elem = patch(createElement(tagName), jml, filter); // trim extraneous whitespace

        trimWhitespace(elem);
        return elem && isFunction(filter) ? filter(elem) : elem;
      } catch (ex) {
        try {
          // handle error with complete context
          var err = isFunction(JsonML.onerror) ? JsonML.onerror : onError;
          return err(ex, jml, filter);
        } catch (ex2) {
          return document.createTextNode('[' + ex2 + ']');
        }
      }
    };
    /**
     * Not super efficient.
     * TODO: port render.js from DUEL
     * @ignore
     * @param {string|array} jml JsonML structure
     * @return {string} HTML text
     */


    JsonML.toHTMLText = function (jml, filter) {
      var elem = toHTML(jml, filter);

      if (elem.outerHTML) {
        return elem.outerHTML;
      }

      var parent = createElement('div');
      parent.appendChild(elem);
      var html = parent.innerHTML;
      parent.removeChild(elem);
      return html;
    };
  })(JsonML, document);
}

/* harmony default export */ __webpack_exports__["default"] = (JsonML);

/***/ }),

/***/ "./src/enums.js":
/*!**********************!*\
  !*** ./src/enums.js ***!
  \**********************/
/*! exports provided: AdviserPlacementType, AnnotationType, ChildrenPlacementType, Colors, ConnectorLabelPlacementType, ConnectorPlacementType, ConnectorShapeType, ConnectorStyleType, ConnectorType, ElbowType, Enabled, GraphicsType, GroupByType, HorizontalAlignmentType, ItemType, LabelType, Layers, LineType, LoopsLayoutMode, NavigationMode, NeighboursSelectionMode, OrientationType, PageFitMode, PlacementType, RenderingMode, SegmentType, SelectionPathMode, ShapeType, SideFlag, TextOrientationType, UpdateMode, VectorRelationType, VerticalAlignmentType, Visibility, ZOrderType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdviserPlacementType", function() { return AdviserPlacementType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnnotationType", function() { return AnnotationType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChildrenPlacementType", function() { return ChildrenPlacementType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Colors", function() { return Colors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConnectorLabelPlacementType", function() { return ConnectorLabelPlacementType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConnectorPlacementType", function() { return ConnectorPlacementType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConnectorShapeType", function() { return ConnectorShapeType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConnectorStyleType", function() { return ConnectorStyleType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConnectorType", function() { return ConnectorType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElbowType", function() { return ElbowType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Enabled", function() { return Enabled; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphicsType", function() { return GraphicsType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupByType", function() { return GroupByType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HorizontalAlignmentType", function() { return HorizontalAlignmentType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemType", function() { return ItemType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LabelType", function() { return LabelType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Layers", function() { return Layers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineType", function() { return LineType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoopsLayoutMode", function() { return LoopsLayoutMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavigationMode", function() { return NavigationMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NeighboursSelectionMode", function() { return NeighboursSelectionMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrientationType", function() { return OrientationType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageFitMode", function() { return PageFitMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlacementType", function() { return PlacementType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderingMode", function() { return RenderingMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SegmentType", function() { return SegmentType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectionPathMode", function() { return SelectionPathMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShapeType", function() { return ShapeType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SideFlag", function() { return SideFlag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextOrientationType", function() { return TextOrientationType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateMode", function() { return UpdateMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VectorRelationType", function() { return VectorRelationType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VerticalAlignmentType", function() { return VerticalAlignmentType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Visibility", function() { return Visibility; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZOrderType", function() { return ZOrderType; });
/**
 * @typedef {number} AdviserPlacementType
 **/

/**
 * Defines leftward or rightward item placement relative to the referenced item.
 * In case of assitants and advisers the referenced item is their imediate parent.
 * In case of family diagram the referenced item is spouse or sibling in the row. 
 *  
 * @enum {AdviserPlacementType}
 */
var AdviserPlacementType = {
  /**
   * Auto select by layout manager
   */
  Auto: 0,

  /**
   * Left side
   */
  Left: 2,

  /**
   * Right side
   */
  Right: 3
};
/**
 * @typedef {number} AnnotationType
 **/

/**
 * Defines type of on-screen and in-layout annotation object. Annotations are geometrical 
 * figures drawn around or bound to existing nodes of the diagram.
 *
 * @enum {AnnotationType}
 */

var AnnotationType = {
  /**
   * Connector lines between two nodes of the diagram. They are drawn on top of existing
   * diagram layout and they don't affect nodes placement. So it is users responsibility to
   * prserve space between nodes for them.
   */
  Connector: 0,

  /**
   * Shape annotation is a possibility to draw some geometrical
   * shapes over several nodes of the diagram. 
   */
  Shape: 1,

  /**
   * Highlight path annotation traces path between given sequence of nodes 
   * over existing connector lines in the diagram.
   */
  HighlightPath: 2,

  /**
   * In-layout label annotation. Label anntations are placed in layout between nodes,
   * they preserve space between nodes, so they don't overlap neighbouring nodes.
   * Label annotations are designed for autoplacement and bundling of connection lines between 
   * nodes when needed.
   */
  Label: 3,

  /**
   * Background annotation highlights nodes via drawing rectangular shape in background.
   * If shapes overlap the same style neighbouring shapes they are merged into one continuous shape. 
   */
  Background: 4
};
/**
 * @typedef {number} ChildrenPlacementType
 **/

/**
 * Defines shape of children formation. By default a node's children are always placed in a horizontal line 
 * below the parent node. On a large scale this may result in the end user having to scroll screens 
 * in order to view all of the nodes. To compensate for this, we provide the option of placing all 
 * of the children of a parent node in a sqaure/matrix formation. This will reduce sideways screen 
 * scrolling by compacting the child nodes into a much smaller area on the screen.
 *  
 * @enum {ChildrenPlacementType}
 */

var ChildrenPlacementType = {
  /**
   * Auto. This mode lets you set children layout at the component level
   * and then redefine it for individual nodes if needed.
   */
  Auto: 0,

  /**
   * Children placed in vertical column
   */
  Vertical: 1,

  /**
   * Horizontal children layout
   */
  Horizontal: 2,

  /**
   * Matrix formation of the children
   */
  Matrix: 3
};
/**
 * @typedef {string} Colors
 **/

/**
 * Just a list of named colors.
 * 
 * @ignore
 * @enum {Colors}
 */

var Colors = {
  AliceBlue: "#f0f8ff",
  AntiqueWhite: "#faebd7",
  Aqua: "#00ffff",
  Aquamarine: "#7fffd4",
  Azure: "#f0ffff",
  Beige: "#f5f5dc",
  Bisque: "#ffe4c4",
  Black: "#000000",
  BlanchedAlmond: "#ffebcd",
  Blue: "#0000ff",
  BlueViolet: "#8a2be2",
  Brown: "#a52a2a",
  BurlyWood: "#deb887",
  Bronze: "#cd7f32",
  CadetBlue: "#5f9ea0",
  ChartReuse: "#7fff00",
  Chocolate: "#d2691e",
  Coral: "#ff7f50",
  CornflowerBlue: "#6495ed",
  Cornsilk: "#fff8dc",
  Crimson: "#dc143c",
  Cyan: "#00ffff",
  DarkBlue: "#00008b",
  DarkCyan: "#008b8b",
  DarkGoldenrod: "#b8860b",
  DarkGray: "#a9a9a9",
  DarkGreen: "#006400",
  DarkKhaki: "#bdb76b",
  DarkMagenta: "#8b008b",
  DarkOliveGreen: "#556b2f",
  Darkorange: "#ff8c00",
  DarkOrchid: "#9932cc",
  DarkRed: "#8b0000",
  DarkSalmon: "#e9967a",
  DarkSeaGreen: "#8fbc8f",
  DarkSlateBlue: "#483d8b",
  DarkSlateGray: "#2f4f4f",
  DarkTurquoise: "#00ced1",
  DarkViolet: "#9400d3",
  DeepPink: "#ff1493",
  DeepSkyBlue: "#00bfff",
  DimGray: "#696969",
  DodgerBlue: "#1e90ff",
  FireBrick: "#b22222",
  FloralWhite: "#fffaf0",
  ForestGreen: "#228b22",
  Fuchsia: "#ff00ff",
  Gainsboro: "#dcdcdc",
  GhostWhite: "#f8f8ff",
  Gold: "#ffd700",
  Goldenrod: "#daa520",
  Gray: "#808080",
  Green: "#008000",
  GreenYellow: "#adff2f",
  Honeydew: "#f0fff0",
  Hotpink: "#ff69b4",
  IndianRed: "#cd5c5c",
  Indigo: "#4b0082",
  Ivory: "#fffff0",
  Khaki: "#f0e68c",
  Lavender: "#e6e6fa",
  LavenderBlush: "#fff0f5",
  Lawngreen: "#7cfc00",
  Lemonchiffon: "#fffacd",
  LightBlue: "#add8e6",
  LightCoral: "#f08080",
  LightCyan: "#e0ffff",
  LightGoldenrodYellow: "#fafad2",
  LightGray: "#d3d3d3",
  LightGreen: "#90ee90",
  LightPink: "#ffb6c1",
  LightSalmon: "#ffa07a",
  LightSeaGreen: "#20b2aa",
  LightSkyBlue: "#87cefa",
  LightSlateGray: "#778899",
  LightSteelBlue: "#b0c4de",
  LightYellow: "#ffffe0",
  Lime: "#00ff00",
  Limegreen: "#32cd32",
  Linen: "#faf0e6",
  Magenta: "#ff00ff",
  Maroon: "#800000",
  MediumAquamarine: "#66cdaa",
  MediumBlue: "#0000cd",
  MediumOrchid: "#ba55d3",
  MediumPurple: "#9370d8",
  MediumSeaGreen: "#3cb371",
  MediumSlateBlue: "#7b68ee",
  MediumSpringGreen: "#00fa9a",
  MediumTurquoise: "#48d1cc",
  MediumVioletRed: "#c71585",
  MidnightBlue: "#191970",
  MintCream: "#f5fffa",
  MistyRose: "#ffe4e1",
  Moccasin: "#ffe4b5",
  NavajoWhite: "#ffdead",
  Navy: "#000080",
  Oldlace: "#fdf5e6",
  Olive: "#808000",
  Olivedrab: "#6b8e23",
  Orange: "#ffa500",
  OrangeRed: "#ff4500",
  Orchid: "#da70d6",
  PaleGoldenRod: "#eee8aa",
  PaleGreen: "#98fb98",
  PaleTurquoise: "#afeeee",
  PaleVioletRed: "#d87093",
  Papayawhip: "#ffefd5",
  Peachpuff: "#ffdab9",
  Peru: "#cd853f",
  Pink: "#ffc0cb",
  Plum: "#dda0dd",
  PowderBlue: "#b0e0e6",
  Purple: "#800080",
  Red: "#ff0000",
  RosyBrown: "#bc8f8f",
  RoyalBlue: "#4169e1",
  SaddleBrown: "#8b4513",
  Salmon: "#fa8072",
  SandyBrown: "#f4a460",
  SeaGreen: "#2e8b57",
  Seashell: "#fff5ee",
  Sienna: "#a0522d",
  Silver: "#c0c0c0",
  SkyBlue: "#87ceeb",
  SlateBlue: "#6a5acd",
  SlateGray: "#708090",
  Snow: "#fffafa",
  SpringGreen: "#00ff7f",
  SteelBlue: "#4682b4",
  Tan: "#d2b48c",
  Teal: "#008080",
  Thistle: "#d8bfd8",
  Tomato: "#ff6347",
  Turquoise: "#40e0d0",
  Violet: "#ee82ee",
  Wheat: "#f5deb3",
  White: "#ffffff",
  WhiteSmoke: "#f5f5f5",
  Yellow: "#ffff00",
  YellowGreen: "#9acd32"
};
/**
 * @typedef {number} ConnectorLabelPlacementType
 **/

/**
 * Label placement relative to connector annotation. Connector annotation is bound and drawn between two nodes
 * defined by two properties: `fromItem` and `toItem`. Label can be placed close to "start", "end" nodes or in between of them
 *  along the connector line. 
 *
 * @enum {ConnectorLabelPlacementType}
 */

var ConnectorLabelPlacementType = {
  From: 0,
  Between: 1,
  To: 2
};
/**
 * @typedef {number} ConnectorPlacementType
 **/

/**
 * Connector placement type defines style of connector line drawing over diagram layout. It supports two options: 
 * the `Straight` is classic direct line connecting two nodes, this is the most expected style of connector annotation
 * drawing over diagram, the second style is called `Offbeat` and it design to dynamically adopt to nodes mutual 
 * location and gap between them. It uses free hand line style drawing going from start to the end nodes. Since every diagram 
 * is packed with various connection lines, this annotation placement style is deliberately made not straight, so it can be 
 * noticeable on top of other lines of the diagram.
 *
 * @enum {ConnectorPlacementType}
 */

var ConnectorPlacementType = {
  /**
   * Places connector annotation in the way that it does not overlap underlying diagram connector lines.
   * If nodes are close to each other and gap between them cannot fit annotation, then 
   * it will be drawn on the side of the nodes, so it will have enough space for arrow and label.
   */
  Offbeat: 0,

  /**
   * Straight line annotation between nodes. This annotation mode provides basic conflict resolution between annotations
   * overlapping each other. If two or more straight annotations overlap each other then layout engine will 
   * add extra offset to them, so they will be drawn in parallel to each other.
   */
  Straight: 1
};
/**
 * @typedef {number} ConnectorShapeType
 **/

/**
 * Connector shape type defines number of lines and arrows at their ends drawn between nodes of the connector annotation.
 * This feature combined with basic conflict resolution, which places overlapping annotations in parallel when they overlap each other,
 * gives you full flexibility over variations of possible connector lines between two given nodes of diagram.
 *
 * @enum {ConnectorShapeType}
 */

var ConnectorShapeType = {
  /**
   * Single line with one arrow
   */
  OneWay: 0,

  /**
   * Two parallel lines with single arrows
   */
  TwoWay: 1,

  /**
   * Single line with 2 arrows.
   */
  BothWay: 2
};
var ConnectorStyleType = {
  Extra: 0,
  Regular: 1,
  Highlight: 2
};
/**
 * @typedef {number} ConnectorType
 **/

/**
 * Connection lines style. This option is only applicable to nodes minimized to markers or lines.
 * Full size nodes are always connected with squared connection lines
 *  
 * @enum {ConnectorType}
 */

var ConnectorType = {
  /**
   * Orthogonal connection lines
   */
  Squared: 0,

  /**
   * Angular direct node to node connection lines
   */
  Angular: 1,

  /**
   * Curved direct node to node connection lines
   */
  Curved: 2
};
/**
 * @typedef {number} ElbowType
 **/

/**
 * Elbow style of connection lines
 *  
 * @enum {ElbowType}
 */

var ElbowType = {
  /**
   * No elbow
   */
  None: 0,

  /**
   * Dot marker at the intersection
   */
  Dot: 1,

  /**
   * Bevel elbow
   */
  Bevel: 2,

  /**
   * Round elbow
   */
  Round: 3
};
/**
 * Defines option state.
 * 
 * @readonly
 * @enum {number}
 */

var Enabled = {
  /**
   * Option state is auto defined.
   */
  Auto: 0,

  /**
   * Enabled
   */
  True: 1,

  /**
   * Disabled
   */
  False: 2
};
/**
 * @typedef {number} GraphicsType
 **/

/**
 * Graphics elements rendering mode
 *  
 * @enum {GraphicsType}
 */

var GraphicsType = {
  /**
   * Scalable Vector Graphics
   */
  SVG: 0,

  /**
   * HTML Canvas
   */
  Canvas: 1
};
/**
 * @typedef {number} GroupByType
 **/

/**
 * This enumeration defines objects gravity in the chart relative to parents and children.
 * For example connection lines can be drawn with arrows, so this enumeration controls
 * direction of arrows up towards parents or down towards children in the hierarchy.
 * The other example is nodes placement close to their immediate parents or immediate children 
 * in case when parents and children are offset from them by multiple levels in hierarchy.
 *  
 * @enum {GroupByType}
 */

var GroupByType = {
  None: 0,
  Parents: 1,
  Children: 2
};
/**
 * @typedef {number} HorizontalAlignmentType
 **/

/**
 * Horizontal alignment
 *  
 * @enum {HorizontalAlignmentType}
 */

var HorizontalAlignmentType = {
  Center: 0,
  Left: 1,
  Right: 2
};
/**
 * @typedef {number} ItemType
 **/

/**
 * This enumeration defines child node placement relative to its parent node. By default all children that belong 
 * to a parent node are of the same rank and status between each other and due to that, are always aligned below
 * the parent and are organized in the same way. However for special cases were the end user wishes to have a child
 * that is seperate from the rest of it's siblings, we provide custom child types that the end user can use to
 * place diffrent ranking nodes anywhere around the parent node. These placement options give a lot of space for
 * the creation of roles such as an Assistant, Adviser, various Partners and co-heads that may be in the organization.
 * Additionally, by default a node's regular children are always placed in a horizontal line below the parent node. See children
 * placement type options for regular children layout.
 *  
 * @enum {ItemType}
 */

var ItemType = {
  /**
   * Regular node is a default placement of child nodes in form of horizontal row.
   */
  Regular: 0,

  /**
   * Adviser is drawn at the same row as parent node on the left or right side and connected horizontally to it. 
   */
  Adviser: 2,

  /**
   * Assitant node is drawn at row in between parent and child rows and connected horizontally
   * to connection line going from parent to the regualr children
   */
  Assistant: 1,

  /**
   * Sub assitant is variation of assitant node type.
   * It has the same placement but it is connected by the top side of the node to the connector line going to the parent node.
   */
  SubAssistant: 4,

  /**
   * Sub adviser is variation of adviser node type.
   * It has the same placement but it is connected by the top side of the node to the connector line going to the parent node.
   */
  SubAdviser: 5,

  /**
   * General partner is immitation of multiple inheritance in the oraganizational chart hierarchy.
   * General partner node is drawn side by side with its parent and remaining regular children
   * are visually connected to both of them like they are their parents.
   * Another layout feature of the general partner is that it is connected to parents of its immediate logical parent as well,
   * so visually it becomes a child of its grand parent.
   */
  GeneralPartner: 6,

  /**
   * Limited partner is variation of general partner. The only difference is that is is not conencte to its logical grand parent.
   */
  LimitedPartner: 7,

  /**
   * Adviser partner is a variation of limited partner. The only difference is that it has an extra connection line to its parent.
   */
  AdviserPartner: 8
};
var LabelType = {
  Regular: 0,
  Dummy: 1,
  Fixed: 2,
  None: 3
};
var Layers = {
  BackgroundAnnotation: 2,
  BackgroundAnnotations: 3,
  BackgroundConnectorAnnotation: 4,
  BackgroundHighlightPathAnnotations: 5,
  Connector: 6,
  ForegroundHighlightPathAnnotations: 7,
  Highlight: 8,
  Marker: 9,
  Label: 10,
  Cursor: 11,
  Item: 12,
  ForegroundAnnotations: 13,
  ForegroundConnectorAnnotation: 14,
  Annotation: 15,
  Controls: 16
};
/**
 * @typedef {number} LineType
 **/

/**
 * Line style of connection lines.
 *  
 * @enum {LineType}
 */

var LineType = {
  Solid: 0,
  Dotted: 1,
  Dashed: 2
};
/**
 * @typedef {number} LoopsLayoutMode
 **/

/**
 * Loops layout mode. Configuration may contain loop references between items, so control tries to find layout minimizing number of loops between levels, 
 * so majority of references ideally should go in one direction. This option disables optimization and 
 * forces items levels order to match their order in `items` collection. For example if you have two nodes `A` and `B` referencing each other as a parent, 
 * then it is not defined which one is going to be on the top of the diagram. Set this option to `KeepItemsOrder`, if you need the first item in your collection to be
 * on the top, otherwise control will optimize loops layout in order to minimize number of loops in diagram.
 *  
 * @enum {LoopsLayoutMode}
 */

var LoopsLayoutMode = {
  /**
   * Optimized. Control searches for layout producing minimal number of feedback loops in the diagram.
   */
  Optimized: 0,

  /**
   * Keeps order of items on levels, the same as in `items` collection property.
   */
  KeepItemsOrder: 1
};
/**
 * @typedef {number} NavigationMode
 **/

/**
 * Interactivity mode. Control implements standard behaivour of classic desktop UI controls. It supports single selected node - cursor.
 * It supports on mouse over node visual feedback - highlight. It supports selection of group of nodes - selected items. 
 * All that functionality can be disabled depending on your application requirements.
 *  
 * @enum {NavigationMode}
 */

var NavigationMode = {
  /**
   * Everything is on.
   */
  Default: 0,

  /**
   * Cursor selection only without highlight. 
   */
  CursorOnly: 1,

  /**
   * Mouse over feedback only
   */
  HighlightOnly: 3,

  /**
   * No interactivity
   */
  Inactive: 2
};
/**
 * @typedef {number} NavigationMode
 **/

/**
 * Neighbors selection mode. The control supports diagram auto fit into screen view. It is achieved via drawing nodes in form of markers.
 * So small nodes make diagram fit into the screen space, but they have no details. Our solution is to show cursor and selected items
 * of the diagram in full size and draw all other as markers.
 *
 * This enumeration controls visibility of neighbours of the cursor node in the auto fit mode. It allows to draw 
 * them in full size regardless of available space.
 *
 * @enum {NavigationMode}
 */

var NeighboursSelectionMode = {
  /**
   * Selects parents and children of the cursor item
   */
  ParentsAndChildren: 0,

  /**
   * Selects parents, children, spouses and siblings of the cursor item.
   */
  ParentsChildrenSiblingsAndSpouses: 1
};
/**
 * @typedef {number} OrientationType
 **/

/**
 * Controls diagram layout orientation. The control can be rotated in any direction, this is needed for arabic support and various layout.
 *  
 * @enum {OrientationType}
 */

var OrientationType = {
  Top: 0,
  Bottom: 1,
  Left: 2,
  Right: 3,
  None: 4
};
/**
 * @typedef {number} PageFitMode
 **/

/**
 * Fits diagram into available screen space. When diagram size significantly larger that available screen space, its scrolling and navigation
 * becomes problematic, so we support automatic diagram fit into the screen space via rendering some of its nodes in form of small markers.
 * Control supports several page fit mode options which can match your requirements depending on diagram layout, orientation and number of nodes.
 * 
 * Autosize - this option is opposite to auto fit. It lets you expand control size to fit all diagram nodes full size without scrollbars.
 *  
 * @enum {PageFitMode}
 */

var PageFitMode = {
  /**
   * Disabled. All nodes are being rendered using their templates.
   */
  None: 0,

  /**
   * Fits diagram into the view width, so it has no horizontal scrollbar.
   */
  PageWidth: 1,

  /**
   * Fits diagram into the view hight, so it has no vertical scrollbar.
   */
  PageHeight: 2,

  /**
   * Fits diagram into the view so it has no scrollbars.
   */
  FitToPage: 3,

  /**
   * This is opposite mode to auto fit. In this mode diagram controls its size, it sets its size to fit all nodes and render them full size using templates.
   */
  AutoSize: 5,

  /**
   * Renders all nodes as markers regardless of available screen space. Control selects and renders full size cursor, its neighbours and selected nodes only.
   * Don't forget to disable selection path as well, so nodes from cursor up to the root are not selected.
   */
  SelectionOnly: 6
};
/**
 * @typedef {number} PlacementType
 **/

/**
 * Defines element placement relative to rectangular area it is bound to.
 *  
 * @enum {PlacementType}
 */

var PlacementType = {
  /**
   * Defined by other control options.
   */
  Auto: 0,
  TopLeft: 8,
  Top: 1,
  TopRight: 2,
  RightTop: 11,
  Right: 3,
  RightBottom: 12,
  BottomRight: 4,
  Bottom: 5,
  BottomLeft: 6,
  LeftBottom: 10,
  Left: 7,
  LeftTop: 9
};
/**
 * @typedef {number} RenderingMode
 **/

/**
 * This enumeration is used to tell rendering callback functions current state of the template.
 * It is needed for proper events binding and content updates.
 *
 * @enum {RenderingMode}
 */

var RenderingMode = {
  /**
   * Template is just created.
   */
  Create: 0,

  /**
   * Template is reused and update is needed.
   */
  Update: 1
};
var SegmentType = {
  Line: 0,
  Move: 1,
  QuadraticArc: 2,
  CubicArc: 3,
  Dot: 4
};
/**
 * @typedef {number} SelectionPathMode
 **/

/**
 * Selection path mode. This enumeration controls visibility of nodes between cursor and the root of the diagram in the auto fit mode. It allows to draw 
 * them in full size regardless of available space and auto fit mode.
 * 
 * The control supports diagram auto fit into screen view. It is achieved via drawing nodes in form of markers.
 * So small nodes make diagram fit into the screen space, but they have no details. Our solution is to show cursor and selected items
 * of the diagram in full size and draw all other diagram nodes as markers.
 *
 * @enum {SelectionPathMode}
 */

var SelectionPathMode = {
  /**
   * No selection path
   */
  None: 0,

  /**
   * Selects cursor node parents up to the root are renders them full size regardless of available space.
   */
  FullStack: 1
};
/**
 * @typedef {number} ShapeType
 **/

/**
 * Shapes
 *  
 * @enum {ShapeType}
 */

var ShapeType = {
  Rectangle: 0,
  Oval: 1,
  Triangle: 2,
  CrossOut: 3,
  Circle: 4,
  Rhombus: 5,
  Wedge: 7,
  FramedOval: 8,
  FramedTriangle: 9,
  FramedWedge: 10,
  FramedRhombus: 11,
  None: 6
};
var SideFlag = {
  Top: 1,
  Right: 2,
  Bottom: 4,
  Left: 8
};
/**
 * @typedef {number} TextOrientationType
 **/

/**
 * Text rotation
 *  
 * @enum {TextOrientationType}
 */

var TextOrientationType = {
  /**
   * Regular horizontal text
   */
  Horizontal: 0,

  /**
   * Rotate text left for 90 degree.
   */
  RotateLeft: 1,

  /**
   * Rotate text right for 90 degree.
   */
  RotateRight: 2,

  /**
   * Depends on other options.
   */
  Auto: 3
};
/**
 * @typedef {number} UpdateMode
 **/

/**
 * Controls update of the diagram
 *
 * @enum {UpdateMode}
 */

var UpdateMode = {
  /**
   * Forces control to make a full chart redraw. It is equivalent to initial chart creation. 
   * It removes everything from placeholder and renders all elements again.
   */
  Recreate: 0,

  /**
   * Optimized refresh. It only updates visual elements which needs to be updated.
   */
  Refresh: 1,

  /**
   * Updates highlight position only
   */
  PositonHighlight: 2
};
/**
 * @typedef {number} VectorRelationType
 **/

/**
 * Defines relation between two vectors
 *
 * @enum {VectorRelationType}
 */

var VectorRelationType = {
  None: 0,
  Null: 1,
  Collinear: 2,
  Opposite: 3
};
/**
 * @typedef {number} VerticalAlignmentType
 **/

/**
 * Controls nodes vertical alignment inside row of nodes. If row of nodes contains nodes of
 * multiple sizes then small nodes are vertically aligned relative to their large neighbours.
 *  
 * @enum {VerticalAlignmentType}
 */

var VerticalAlignmentType = {
  Top: 0,
  Middle: 1,
  Bottom: 2
};
/**
 * @typedef {number} Visibility
 **/

/**
 * Minimal nodes visibility in the diagram. If auto fit of diagram into current page size is enabled, then
 * this option controls minimum allowed size of diagram nodes.
 *  
 * @enum {Visibility}
 */

var Visibility = {
  /**
   * Selects best visibility mode.
   */
  Auto: 0,

  /**
   * Regular template based diagram nodes
   */
  Normal: 1,

  /**
   * Diagram draws nodes in form of markers
   */
  Dot: 2,

  /**
   * Diagram only draws connection lines and hides actuall nodes.
   */
  Line: 3,

  /**
   * Makes node invisible in layout. If node has no parents then 
   * its connection lines are hidden as well.
   * 
   * @ignore
   */
  Invisible: 4
};
/**
 * @typedef {number} ZOrderType
 **/

/**
 * Option to draw annotation in the foreground or in the backgound of diagram nodes.
 *  
 * @enum {ZOrderType}
 */

var ZOrderType = {
  /**
   * Depends on annotation type.
   */
  Auto: 0,

  /**
   * Background
   */
  Background: 1,

  /**
   * Foreground
   */
  Foreground: 2
};

/***/ }),

/***/ "./src/graphics/structs/Size.js":
/*!**************************************!*\
  !*** ./src/graphics/structs/Size.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Size; });
/**
 * @class Size
 * @classdesc Size object defines width and height.
 * 
 * @param {Size} arg0 Size object to clone.
 * 
 * @param {number} arg0 Width.
 * @param {number} arg1 Height.
 */
function Size(arg0, arg1) {
  /**
   * The width
   * @type {number}
   */
  this.width = 0;
  /**
   * The height
   * @type {number}
   */

  this.height = 0;

  switch (arguments.length) {
    case 1:
      this.width = arg0.width;
      this.height = arg0.height;
      break;

    case 2:
      this.width = arg0;
      this.height = arg1;
      break;

    default:
      break;
  }
}
;
/**
 * Inverts size dimensions
 * 
 * @returns {Size} Returns reference to the current size.
 */

Size.prototype.invert = function () {
  var width = this.width;
  this.width = this.height;
  this.height = width;
  return this;
};
/**
 * Scales the size by the specified value
 * 
 * @param {number} scale
 * @returns {Size} Returns reference to the current size.
 */


Size.prototype.scale = function (scale) {
  this.width = this.width * scale;
  this.height = this.height * scale;
  return this;
};
/**
 * Returns square size
 * 
 * @returns {number} Returns square size.
 */


Size.prototype.space = function () {
  return this.width * this.height;
};
/**
 * Returns size in form of CSS style object.
 * 
 * @param {string} [units="px"] The string name of units.
 * @returns {object} CSS style object
 */


Size.prototype.getCSS = function (units) {
  units = units !== undefined ? units : "px";
  var result = {
    width: this.width + units,
    height: this.height + units
  };
  return result;
};
/**
 * Crops the size by the other size object.
 * 
 * @param {Size} size The size to use as the crop boundaries.
 * @returns {Size} Returns reference to the current size object
 */


Size.prototype.cropBySize = function (size) {
  this.width = Math.min(this.width, size.width);
  this.height = Math.min(this.height, size.height);
  return this;
};
/**
 * Extends the current size by the other size.
 * 
 * @param {Size} size The size to use as extension.
 * @returns {Size} Returns reference to the current size object
 */


Size.prototype.maxSize = function (size) {
  this.width = Math.max(this.width, size.width);
  this.height = Math.max(this.height, size.height);
  return this;
};
/**
 * Expands the current size by the thickness object.
 * 
 * @param {Thickness} thickness The thickness to use for expansion.
 * @returns {Size} Returns reference to the current size object
 */


Size.prototype.addThickness = function (thickness) {
  this.width = Math.max(0, this.width + thickness.left + thickness.right);
  this.height = Math.max(0, this.height + thickness.top + thickness.bottom);
  return this;
};
/**
 * Shrinks the current size by the thickness object.
 * 
 * @param {Thickness} thickness The thickness to use for contraction.
 * @returns {Size} Returns reference to the current size object
 */


Size.prototype.removeThickness = function (thickness) {
  this.width = Math.max(0, this.width - thickness.left - thickness.right);
  this.height = Math.max(0, this.height - thickness.top - thickness.bottom);
  return this;
};
/**
 * Validates size properties
 * 
 * @returns {boolean} Returns true if size properties are valid.
 */


Size.prototype.validate = function () {
  if (isNaN(this.width) || isNaN(this.height)) {
    throw "Invalid size.";
  }
};

/***/ }),

/***/ "./src/graphics/structs/Thickness.js":
/*!*******************************************!*\
  !*** ./src/graphics/structs/Thickness.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Thickness; });
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * @class Thickness
 * @classdesc Class describes the thickness of a frame around rectangle.
 * 
 * @param {number} left Left.
 * @param {number} top Top.
 * @param {number} right Right.
 * @param {number} bottom Bottom.
 */
function Thickness(arg0, arg1, arg2, arg3) {
  /**
   * The thickness for the left side of the rectangle.
   */
  this.left = 0;
  /**
   * The thickness for the upper side of the rectangle.
   */

  this.top = 0;
  /**
   * The thickness for the right side of the rectangle.
   */

  this.right = 0;
  /**
   * The thickness for the bottom side of the rectangle.
   */

  this.bottom = 0;

  switch (arguments.length) {
    case 1:
      if (arg0 !== null && _typeof(arg0) == "object") {
        this.left = arg0.left;
        this.top = arg0.top;
        this.right = arg0.right;
        this.bottom = arg0.bottom;
      } else {
        this.left = arg0;
        this.top = arg0;
        this.right = arg0;
        this.bottom = arg0;
      }

      break;

    case 4:
      this.left = arg0;
      this.top = arg1;
      this.right = arg2;
      this.bottom = arg3;
      break;
  }

  return this;
}
;
/**
 * Checks object is empty
 * 
 * @returns {boolean} Returns true if object has no thickness defined for any of its sides
 */

Thickness.prototype.isEmpty = function () {
  return this.left === 0 && this.top === 0 && this.right === 0 && this.bottom === 0;
};
/**
 * Maximum thickness.
 * 
 * @param {Thickness} thickness The thickness to compaire with.
 * @returns {Thickness} Returns reference to the current thickness object
 */


Thickness.prototype.maxThickness = function (thickness) {
  this.left = Math.max(this.left, thickness.left);
  this.top = Math.max(this.top, thickness.top);
  this.right = Math.max(this.right, thickness.right);
  this.bottom = Math.max(this.bottom, thickness.bottom);
  return this;
};
/**
 * Add thickness.
 * 
 * @param {Thickness} thickness The thickness to add.
 * @returns {Thickness} Returns reference to the current thickness object
 */


Thickness.prototype.addThickness = function (arg0, arg1, arg2, arg3) {
  switch (arguments.length) {
    case 1:
      if (arg0 !== null && _typeof(arg0) == "object") {
        this.left += arg0.left;
        this.top += arg0.top;
        this.right += arg0.right;
        this.bottom += arg0.bottom;
      } else {
        this.left += arg0;
        this.top += arg0;
        this.right += arg0;
        this.bottom += arg0;
      }

      break;

    case 4:
      this.left += arg0;
      this.top += arg1;
      this.right += arg2;
      this.bottom += arg3;
      break;
  }

  return this;
};
/**
 * Scales the thickness by the specified value
 * 
 * @param {number} scale
 * @returns {Thickness} Returns reference to the current size.
 */


Thickness.prototype.scale = function (scale) {
  this.left = this.left * scale;
  this.top = this.top * scale;
  this.right = this.right * scale;
  this.bottom = this.bottom * scale;
  return this;
};
/**
 * Returns thickness object in form of CSS style string. It is conversion to padding style string.
 * 
 * @param {string} [units="px"] The string name of units.
 * @returns {string} CSS style string.
 */


Thickness.prototype.toString = function (units) {
  units = units !== undefined ? units : "px";
  return this.left + units + ", " + this.top + units + ", " + this.right + units + ", " + this.bottom + units;
};

/***/ })

/******/ });
});
//# sourceMappingURL=javascriptsamples.js.map