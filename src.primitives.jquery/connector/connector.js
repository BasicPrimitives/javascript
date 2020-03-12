/*
 * jQuery UI Connector
 *
 * Basic Primitives Connector.
 *
 * Depends:
 *  jquery.ui.core.js
 *  jquery.ui.widget.js
 */
if (typeof jQuery != "undefined") {
  (function ($) {
    $.widget("ui.bpConnector", new primitives.connector.Controller());
  }(jQuery));
}; //ignore jslint