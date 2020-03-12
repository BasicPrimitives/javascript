/*
 * jQuery UI Text
 *
 * Basic Primitives Text.
 *
 * Depends:
 *  jquery.ui.core.js
 *  jquery.ui.widget.js
 */
if (typeof jQuery != "undefined") {
  (function ($) {
    $.widget("ui.bpText", new primitives.text.Controller());
  }(jQuery));
}; //ignore jslint