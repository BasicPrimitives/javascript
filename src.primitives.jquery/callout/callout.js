/*
 * jQuery UI Callout
 *
 * Basic Primitives Callout.
 *
 * Depends:
 *  jquery.ui.core.js
 *  jquery.ui.widget.js
 */
if (typeof jQuery != "undefined") {
  (function ($) {
    $.widget("ui.bpCallout", new primitives.callout.Controller());
  }(jQuery));
}; //ignore jslint