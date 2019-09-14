primitives.orgdiagram.Widget = function (Config, taskManagerFactory, eventArgsFactory, templates) {
  this.widgetEventPrefix = "orgdiagram";

  this.options = new Config();

  this.control = null;

  this.taskManagerFactory = taskManagerFactory;
  this.eventArgsFactory = eventArgsFactory;
  this.templates = templates;
};

primitives.orgdiagram.Widget.prototype._create = function () {
  this.element.addClass("ui-widget");

  this.control = primitives.orgdiagram.BaseControl(this.element[0], this._readOptions(this.options), this.taskManagerFactory, this.eventArgsFactory, this.templates);
};

/**
 * Removes all elements control added to DOM incluidng event listeners.
 */
primitives.orgdiagram.Widget.prototype.destroy = function () {
  this.control.destroy();
};

/**
 * Makes full redraw of diagram contents reevaluating all options. This method has to be called explisitly
 * after all options are set in order to update controls contents.
 * 
 * @param {UpdateMode} updateMode 
 * @param {bollean} forceCenterOnCursor 
 */
primitives.orgdiagram.Widget.prototype.update = function (updateMode, centerOnCursor) {
  this.control.update(updateMode, centerOnCursor);
};

primitives.orgdiagram.Widget.prototype._setOption = function (key, value) {
  jQuery.Widget.prototype._setOption.apply(this, arguments);

  switch (key) {
    case "disabled":
      var handles = jQuery([]);
      if (value) {
        handles.filter(".ui-state-focus").blur();
        handles.removeClass("ui-state-hover");
        handles.propAttr("disabled", true);
        this.element.addClass("ui-disabled");
      } else {
        handles.propAttr("disabled", false);
        this.element.removeClass("ui-disabled");
      }
      break;
    default:
      break;
  }

  this.control.setOptions(this._readOptions(this.options));
};

primitives.orgdiagram.Widget.prototype._readOptions = function (options) {
  var result = {},
    self = this;
  /* shallow copy */
  for (var property in options) {
    if (options.hasOwnProperty(property)) {
      switch (property) {
        case 'onHighlightChanged':
        case 'onCursorChanged':
        case 'onSelectionChanging':
        case 'onButtonClick':
        case 'onMouseClick':
        case 'onMouseDblClick':
          result[property] = function (property) {
            return function (event, eventArgs) {
              self._trigger(property, event, eventArgs);
            };
          }(property);
          break;
        case 'onItemRender':
        case 'onCursorRender':
        case 'onHighlightRender':
          result[property] = function (property) {
            return function (event, eventArgs) {
              eventArgs.element = jQuery(eventArgs.element);
              self._trigger(property, event, eventArgs);
            };
          }(property);
          break;
        case 'onHighlightChanging':
          result[property] = function (event, eventArgs) {
            var options = self.control.getOptions();
            self.options.highlightItem = options.highlightItem;

            self._trigger("onHighlightChanging", event, eventArgs);
          };
          break;
        case 'onCursorChanging':
          result[property] = function (event, eventArgs) {
            var options = self.control.getOptions();
            self.options.cursorItem = options.cursorItem;

            self._trigger("onCursorChanging", event, eventArgs);
          };
          break;
        case 'onSelectionChanged':
          result[property] = function (event, eventArgs) {
            var options = self.control.getOptions();
            self.options.selectedItems = options.selectedItems;

            self._trigger("onSelectionChanged", event, eventArgs);
          };
          break;
        default:
          result[property] = options[property];
          break;
      }
    }
  }
  return result;
};