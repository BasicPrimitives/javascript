/*
 * jQuery UI Shape
 *
 * Basic Primitives Shape.
 *
 * Depends:
 *  jquery.ui.core.js
 *  jquery.ui.widget.js
 */
if (typeof jQuery != "undefined") {
  (function ($) {
    $.widget("ui.bpShape", new primitives.shape.Controller());
  }(jQuery));
}; //ignore jslint