import Point from './graphics/structs/Point';
import Rect from './graphics/structs/Rect';
import { UpdateMode, OrientationType } from './enums';
import { isNullOrEmpty } from './common';
import createGraphics, { isChrome } from './graphics/createGraphics';
import { getFixOfPixelAlignment, getInnerSize, getElementOffset } from './graphics/dom';
import JsonML from './common/jsonml-html';
import { mergeObjects } from './common';

/**
 * JavaScript Abstract Control
 * @class BaseControl
 */
export default function BaseControl(element, options, taskManagerFactory, eventArgsFactory, templates) {
  var _data = {
    name: "orgdiagram",
    options: options,
    tasks: null,
    graphics: null,
    mouse: null,
    layout: {
      element: element,
      controlPanel: null,
      frameMousePanel: null,
      framePlaceholder: null,
      titlesMousePanel: null,
      titlesPlaceholder: null,
      scrollPanel: null,
      mousePanel: null,
      placeholder: null,
      calloutPlaceholder: null,
      forceCenterOnCursor: true
    }
  },
    _dragFrom,
    _scrollFrom,
    _scrollTo,
    _dragImage,
    _dragTimer,
    _debug = false,
    _timer = null;

  /**
   * Performs full redraw of the diagram contents via reevaluating all API options. This method has to be called explicitly
   * after all options are set in order to update controls contents.
   * 
   * @param {UpdateMode} updateMode 
   * @param {boolean} forceCenterOnCursor 
   */
  function update(updateMode, forceCenterOnCursor) {
    if (forceCenterOnCursor == null) {
      forceCenterOnCursor = true;
    }
    switch (updateMode) {
      case UpdateMode.Refresh:
        refresh(forceCenterOnCursor, _debug);
        break;
      case UpdateMode.PositonHighlight:
        positionHighlight(_debug);
        break;
      default:
        redraw();
        break;
    }
  }

  /**
   * Removes all elements control added to DOM including event listeners.
   */
  function destroy() {
    unbind(_data.layout);
    cleanLayout(_data.layout);

    _data.tasks = null;
    _data.graphics = null;
  }

  function redraw() {
    unbind(_data.layout);
    cleanLayout(_data.layout);

    createLayout(_data.layout, _data.name);
    bind(_data.layout);
    _data.tasks = taskManagerFactory(getOptions, getGraphics, getLayout, setLayout, templates);
    _data.graphics = createGraphics(_data.layout.element);
    _data.graphics.debug = _debug;

    refresh(true, _debug);
  }

  function refresh(forceCenterOnCursor, debug) {
    var centerOnCursorTask,
      placeholderOffset;

    //_data.layout.scrollPanel.css({
    //  "display": "none",
    //  "-webkit-overflow-scrolling": "auto"
    //});

    //this.graphics.begin();

    _data.layout.forceCenterOnCursor = forceCenterOnCursor;
    _data.tasks.process('OptionsTask', null, debug);

    _data.graphics.end();

    //_data.layout.scrollPanel.css({
    //  "display": "block"
    //});

    if (forceCenterOnCursor) {
      /* scroll to offset */
      centerOnCursorTask = _data.tasks.getTask("CenterOnCursorTask");
      placeholderOffset = centerOnCursorTask.getPlaceholderOffset();
      _data.layout.scrollPanel.scrollLeft = placeholderOffset.x;
      _data.layout.scrollPanel.scrollTop = placeholderOffset.y;
    }
    //_data.layout.scrollPanel.css({
    //  "-webkit-overflow-scrolling": "touch"
    //});

    /* fix pixel alignment */
    var pixelAlignmentFix = getFixOfPixelAlignment(_data.layout.element);
    JsonML.applyStyles(_data.layout.scrollPanel, {
      "marginBottom": "0px",
      "marginRight": "0px",
      "marginLeft": pixelAlignmentFix.width + "px", /* fixes div pixel alignment */
      "marginTop": pixelAlignmentFix.height + "px"
    });
  }

  function positionHighlight(debug) {
    _data.layout.forceCenterOnCursor = false;
    _data.tasks.process('HighlightItemOptionTask', null, debug);

    _data.graphics.end();
  }

  function redrawCurrentViewPort(debug) {
    _data.layout.forceCenterOnCursor = false;
    _data.tasks.process('LayoutOptionsTask', null, debug);

    _data.graphics.end();
  }

  function onScroll(event) {
    if (_timer == null) {
      _timer = window.setTimeout(function () {
        redrawCurrentViewPort(_debug);
        window.clearTimeout(_timer);
        _timer = null;
      }, 200);
    }
  }

  /**
   * Call this method to update controls configuration. Control uses default Config instance to initialize itself, 
   * so it sets only options provided in the options parameter.
   * 
   * @param {object} options Options
   */
  function setOptions(options) {
    for (var option in options) {
      if (options.hasOwnProperty(option)) {
        _data.options[option] = options[option];
      }
    }
  }

  /**
   * This method returns current configuration object.
   * 
   * @returns {object} Returns reference to current configuration object
   */
  function getOptions() {
    return _data.options;
  }

  /**
   * This method returns configuration option by name.
   * 
   * @param {*} option Option name
   */
  function getOption(option) {
    return _data.options[option];
  }

  /**
   * Sets configuration option of the control by name.
   * 
   * @param {*} option Option name
   * @param {*} value Option value
   */
  function setOption(option, value) {
    return _data.options[option] = value;
  }

  function getGraphics() {
    return _data.graphics;
  }

  function getLayout() {
    var layout = _data.layout,
      scrollPanelSize = getInnerSize(layout.controlPanel),
      placeholderOffset = new Point(layout.scrollPanel.scrollLeft, layout.scrollPanel.scrollTop);
    return {
      forceCenterOnCursor: layout.forceCenterOnCursor,
      scrollPanelSize: scrollPanelSize,
      placeholderOffset: placeholderOffset
    }
  }

  function setLayout(layoutOptions) {
    var layout = _data.layout,
      pixelAlignmentFix = getFixOfPixelAlignment(layout.element);

    JsonML.applyStyles(layout.controlPanel, {
      "marginLeft": pixelAlignmentFix.width + "px", /* fixes div pixel alignment */
      "marginTop": pixelAlignmentFix.height + "px"
    });

    /* set scroll panel position */
    JsonML.applyStyles(layout.scrollPanel, layoutOptions.scrollPanelRect.getCSS());

    /* set scaled content panel for tracking mouse events without scaling */
    JsonML.applyStyles(layout.mousePanel, layoutOptions.mousePanelSize.getCSS());

    /* set size and scale of content panel */
    var scaleText = "scale(" + layoutOptions.scale + "," + layoutOptions.scale + ")";
    var scaleProperties = {
      "transform-origin": "0 0",
      "transform": scaleText,
      "-ms-transform": scaleText, /* IE 9 */
      "-webkit-transform": scaleText, /* Safari and Chrome */
      "-o-transform": scaleText, /* Opera */
      "-moz-transform": scaleText /* Firefox */
    };
    JsonML.applyStyles(layout.placeholder, mergeObjects(scaleProperties, layoutOptions.placeholderSize.getCSS()));

    if (layoutOptions.autoSize) {
      /* resize element to fit placeholder if control in auto size mode */
      JsonML.applyStyles(layout.element, layoutOptions.controlSize.getCSS());
    }

    /* set titles panel scale and size */
    JsonML.applyStyles(layout.titlesMousePanel, layoutOptions.titlesMousePanelRect.getCSS());
    JsonML.applyStyles(layout.titlesPlaceholder, mergeObjects(scaleProperties, layoutOptions.titlesPlaceholderSize.getCSS()));

    /* set frame panel scale and size */
    JsonML.applyStyles(layout.frameMousePanel, layoutOptions.frameMousePanelRect.getCSS());
    JsonML.applyStyles(layout.framePlaceholder, mergeObjects(scaleProperties, layoutOptions.framePlaceholderSize.getCSS()));
    
    layout.scrollPanel.setAttribute("class", layoutOptions.scrollPanelRect.left > 0 ? name : "bp-scrollframe " + name);
  }

  function createLayout(layout, name) {
    var viewportSize = getInnerSize(layout.element),
      viewportRect = new Rect(0, 0, viewportSize.width, viewportSize.height),
      pixelAlignmentFix = getFixOfPixelAlignment(element);


    JsonML.appendDOM(layout.element, JsonML.toHTML(
      ["div", /* root control panel */
        {
          "tabindex": 0,
          "style": {
            "position": "relative",
            "overflow": "hidden",
            "top": "0px",
            "left": "0px",
            "width": "100%",
            "height": "100%",
            "padding": "0px",
            "marginBottom": "0px",
            "marginRight": "0px",
            "marginLeft": pixelAlignmentFix.width + "px", /* fixes div pixel alignment */
            "marginTop": pixelAlignmentFix.height + "px"
          },
          "name": "controlPanel",
          "class": name,
          "$": function (element) { layout.controlPanel = element; }
        },
        ["div", /* frameMousePanel - frame mouse tracking events panel */
          {
            "style": mergeObjects({
              position: "absolute",
              overflow: "hidden"
            },
              viewportRect.getCSS()),
            "name": "frameMousePanel",
            "class": name,
            "$": function (element) { layout.frameMousePanel = element; }
          },
          ["div", /* frameplaceholder - contents scalable panel */
            {
              "style": mergeObjects({
                position: "absolute",
                overflow: "hidden"
              },
                viewportRect.getCSS()),
              "name": "framePlaceholder",
              "class": ["frameplaceholder", name],
              "$": function (element) { layout.framePlaceholder = element; }
            }
          ]
        ],
        ["div", /* titlesMousePanel - titles mouse tracking events panel */
          {
            "style": mergeObjects({
              position: "absolute",
              overflow: "hidden"
            },
              viewportRect.getCSS()),
            "name": "titlesMousePanel",
            "class": ["bp-titles-frame", name],
            "$": function (element) { layout.titlesMousePanel = element; }
          },
          ["div", /* titlesplaceholder - contents scalable panel */
            {
              "style": mergeObjects({
                position: "absolute",
                overflow: "hidden"
              },
                viewportRect.getCSS()),
              "name": "titlesPlaceholder",
              "class": ["titlesplaceholder", name],
              "$": function (element) { layout.titlesPlaceholder = element; }
            }
          ]
        ],
        ["div", /* scrollPanel - root scroll panel */
          {
            "style": mergeObjects({
              position: "absolute",
              "overflow": "auto",
              "-webkit-overflow-scrolling": "touch",
              "top": "0px",
              "left": "0px",
              "width": viewportRect.width + "px",
              "height": viewportRect.height + "px"
            },
              viewportRect.getCSS()),
            "name": "scrollPanel",
            "class": name,
            "$": function (element) { layout.scrollPanel = element; }
          },
          ["div", /* mousePanel - mouse tracking events panel */
            {
              "style": mergeObjects({
                position: "absolute",
                overflow: "visible"
              },
                viewportRect.getCSS()),
              "name": "mousePanel",
              "class": name,
              "$": function (element) { layout.mousePanel = element; }
            },
            ["div", /* placeholder - contents scalable panel */
              {
                "style": mergeObjects({
                  position: "absolute",
                  overflow: "hidden"
                },
                  viewportRect.getCSS()),
                "name": "placeholder",
                "class": ["placeholder", name],
                "$": function (element) { layout.placeholder = element; }
              },
              ["div", /* calloutPlaceholder - callout panel */
                {
                  "style": {
                    position: "absolute",
                    overflow: "visible",
                    top: "0px",
                    left: "0px",
                    width: "0px",
                    height: "0px"
                  },
                  "name": "calloutPlaceholder",
                  "class": ["calloutplaceholder", name],
                  "$": function (element) { layout.calloutPlaceholder = element; }
                }
              ]
            ]
          ]
        ]
      ])
    );
  }

  function cleanLayout() {
    var controlPanel = _data.layout.controlPanel;
    if (controlPanel != null) {
      var parent = controlPanel.parentNode;
      if (parent != null) {
        parent.removeChild(controlPanel);
      }
    }
  }

  function bind(layout) {
    layout.mousePanel.addEventListener('mousemove', onMouseMove);
    layout.mousePanel.addEventListener('click', onMouseClick);
    layout.mousePanel.addEventListener('dblclick', onMouseDblClick);
    layout.mousePanel.addEventListener('change', onCheckboxChange);

    layout.element.addEventListener('keydown', onKeyDown);

    layout.scrollPanel.addEventListener('scroll', onScroll);

    if (_data.options.enablePanning && isChrome()) {
      layout.scrollPanel.draggable = true;
      layout.scrollPanel.addEventListener('dragstart', onDragStart);
      layout.scrollPanel.addEventListener('drag', onDragScroll);
      layout.scrollPanel.addEventListener('dragend', onDragScroll);
      layout.scrollPanel.addEventListener('dragover', onDragOver);
    }

    layout.frameMousePanel.addEventListener('mousemove', onFrameMouseMove);
    layout.frameMousePanel.addEventListener('click', onFrameMouseClick);
  }

  function unbind(layout) {
    if (layout.mousePanel != null) {
      layout.mousePanel.removeEventListener("mousemove", onMouseMove);
      layout.mousePanel.removeEventListener("click", onMouseClick);
      layout.mousePanel.removeEventListener("dblclick", onMouseDblClick);
      layout.mousePanel.removeEventListener("change", onCheckboxChange);
    }
    if (layout.element != null) {
      layout.element.removeEventListener("keydown", onKeyDown);
    }
    if (layout.scrollPanel != null) {
      layout.scrollPanel.removeEventListener("scroll", onScroll);
      layout.scrollPanel.removeEventListener('dragstart', onDragStart);
      layout.scrollPanel.removeEventListener('drag', onDragScroll);
      layout.scrollPanel.removeEventListener('dragend', onDragScroll);
      layout.scrollPanel.removeEventListener('dragover', onDragOver);
    }

    if (layout.frameMousePanel != null) {
      layout.frameMousePanel.removeEventListener('mousemove', onFrameMouseMove);
      layout.frameMousePanel.removeEventListener('click', onFrameMouseClick);
    }
  }

  function onFrameMouseMove(event) {
    var placeholderOffset = getElementOffset(_data.layout.frameMousePanel),
      x = event.pageX - placeholderOffset.left,
      y = event.pageY - placeholderOffset.top;
    var projectItemsToFrameTask = _data.tasks.getTask("ProjectItemsToFrameTask"),
      highlightItemOptionTask = _data.tasks.getTask("HighlightItemOptionTask"),
      itemId;

    if (highlightItemOptionTask.hasHighlightEnabled()) {
      itemId = projectItemsToFrameTask.getTreeItemForMousePosition(x, y, highlightItemOptionTask.getGravityRadius());
      setHighlightItem(event, itemId);
    }
  }

  function onFrameMouseClick(event) {
    var placeholderOffset = getElementOffset(_data.layout.frameMousePanel),
      x = event.pageX - placeholderOffset.left,
      y = event.pageY - placeholderOffset.top,
      projectItemsToFrameTask = _data.tasks.getTask("ProjectItemsToFrameTask"),
      cursorItemOptionTask = _data.tasks.getTask("CursorItemOptionTask"),
      highlightItemOptionTask = _data.tasks.getTask("HighlightItemOptionTask"),
      newCursorItemId = projectItemsToFrameTask.getTreeItemForMousePosition(x, y, highlightItemOptionTask.getGravityRadius()),
      target,
      eventArgs;
    target = event.target;
    if (newCursorItemId !== null) {
      eventArgs = getEventArgs(null, newCursorItemId);
      trigger("onMouseClick", event, eventArgs);
      if (!eventArgs.cancel) {
        if (cursorItemOptionTask.hasCursorEnabled()) {
          setCursorItem(event, newCursorItemId);
          _data.layout.element.focus();
        }
      }
    }
  }

  function onMouseMove(event) {
    var placeholderOffset = getElementOffset(_data.layout.mousePanel),
      x = event.pageX - placeholderOffset.left,
      y = event.pageY - placeholderOffset.top,
      createTransformTask = _data.tasks.getTask("CreateTransformTask"),
      highlightItemOptionTask = _data.tasks.getTask("HighlightItemOptionTask"),
      itemId;

    if (highlightItemOptionTask.hasHighlightEnabled()) {
      itemId = createTransformTask.getTreeItemForMousePosition(x, y, highlightItemOptionTask.getGravityRadius());
      setHighlightItem(event, itemId);
    }
  }

  function onCheckboxChange(event) {
    var target = event.target;
    var selectedId = target.getAttribute("data-id");
    if (selectedId != null) {
      var selectedItems = (_data.options.selectedItems || []).slice();
      var eventArgs = getEventArgs(null, selectedId);
      var position = selectedItems.findIndex(function(itemid) { return selectedId === itemid});
      trigger("onSelectionChanging", event, eventArgs);
      if (!eventArgs.cancel) {
        if (position >= 0) {
          selectedItems.splice(position, 1);
        }
        else {
          selectedItems.push(selectedId);
        }
        _data.options.selectedItems = selectedItems;

        if (position < 0) {
          target.setAttribute("checked", "checked");
        } else {
          target.removeAttribute("checked");
        }

        //refresh(false, false);

        trigger("onSelectionChanged", event, eventArgs);
      }
    }
  }

  function onMouseClick(event) {
    var placeholderOffset = getElementOffset(_data.layout.mousePanel),
      x = event.pageX - placeholderOffset.left,
      y = event.pageY - placeholderOffset.top,
      createTransformTask = _data.tasks.getTask("CreateTransformTask"),
      cursorItemOptionTask = _data.tasks.getTask("CursorItemOptionTask"),
      highlightItemOptionTask = _data.tasks.getTask("HighlightItemOptionTask"),
      newCursorItemId = createTransformTask.getTreeItemForMousePosition(x, y, highlightItemOptionTask.getGravityRadius()),
      target,
      buttonName,
      eventArgs;
    target = event.target;
    if (newCursorItemId !== null) {
      var buttonName = target.getAttribute("data-buttonname");
      if(isNullOrEmpty(buttonName)) {
        buttonName = target.parentNode && target.parentNode.getAttribute("data-buttonname");
      };
      if (!isNullOrEmpty(buttonName)) {
        eventArgs = getEventArgs(null, newCursorItemId, buttonName);
        trigger("onButtonClick", event, eventArgs);
      }
      else if (target.getAttribute("name") === "checkbox" || target.getAttribute("name") === "selectiontext") { //ignore jslint

      }
      else {
        eventArgs = getEventArgs(null, newCursorItemId);
        trigger("onMouseClick", event, eventArgs);
        if (!eventArgs.cancel) {
          if (cursorItemOptionTask.hasCursorEnabled()) {
            setCursorItem(event, newCursorItemId);
            _data.layout.element.focus();
          }
        }
      }
    }
  }

  function onMouseDblClick(event) {
    var eventArgs,
      highlightItemTask = _data.tasks.getTask("HighlightItemTask"),
      highlightTreeItem = highlightItemTask.getHighlightTreeItem();

    if (highlightTreeItem !== null) {
      eventArgs = getEventArgs(null, highlightTreeItem);
      trigger("onMouseDblClick", event, eventArgs);
    }
  }

  function onKeyDown(event) {
    var highlightItemTask = _data.tasks.getTask("HighlightItemTask"),
      highlightItemOptionTask = _data.tasks.getTask("HighlightItemOptionTask"),
      cursorItemTask = _data.tasks.getTask("CursorItemTask"),
      cursorItemOptionTask = _data.tasks.getTask("CursorItemOptionTask"),
      alignDiagramTask = _data.tasks.getTask('AlignDiagramTask'),
      createTransformTask = _data.tasks.getTask('CreateTransformTask'),
      transform = createTransformTask.getTransform(),
      navigationItem = null,
      newNavigationItem,
      direction = null,
      accepted,
      layout = _data.layout;

    if (highlightItemOptionTask.hasHighlightEnabled() && cursorItemOptionTask.hasCursorEnabled()) {
      navigationItem = highlightItemTask.getHighlightTreeItem();
      if (navigationItem === null) {
        navigationItem = cursorItemTask.getCursorTreeItem();
      }
    } else if (highlightItemOptionTask.hasHighlightEnabled()) {
      navigationItem = highlightItemTask.getHighlightTreeItem();
    } else if (cursorItemOptionTask.hasCursorEnabled()) {
      navigationItem = cursorItemTask.getCursorTreeItem();
    }


    if (navigationItem != null) {
      switch (event.which) {
        case 13: /*Enter*/
          if (cursorItemOptionTask.hasCursorEnabled()) {
            setCursorItem(event, navigationItem);
            event.preventDefault();
            layout.element.focus();
          }
          break;
        case 40: /*Down*/
          direction = OrientationType.Bottom;
          break;
        case 38: /*Up*/
          direction = OrientationType.Top;
          break;
        case 37: /*Left*/
          direction = OrientationType.Left;
          break;
        case 39: /*Right*/
          direction = OrientationType.Right;
          break;
      }

      if (direction != null) {

        accepted = false;

        while (!accepted) {
          accepted = true;

          direction = transform.getOrientation(direction);
          newNavigationItem = alignDiagramTask.getNextItem(navigationItem, direction);

          if (newNavigationItem != null) {
            event.preventDefault();
            if (highlightItemOptionTask.hasHighlightEnabled()) {
              setHighlightItem(event, newNavigationItem);
            } else if (cursorItemOptionTask.hasCursorEnabled()) {
              setCursorItem(event, newNavigationItem);
            }

          }
        }
        layout.element.focus();
      }
    }
  }

  function onDragStart(event) {
    var scrollPanel = _data.layout.scrollPanel;
    _dragFrom = new Point(event.clientX, event.clientY);
    _scrollFrom = new Point(scrollPanel.scrollLeft, scrollPanel.scrollTop);
    _dragImage = _dragImage || new Image(); //ignore jslint
    event.dataTransfer.setDragImage(_dragImage, 0, 0);
  }

  function onDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  function onDragScroll(event) {
    _scrollTo = new Point(_scrollFrom.x - (event.clientX - _dragFrom.x), _scrollFrom.y - (event.clientY - _dragFrom.y));
    if (_dragTimer == null) {
      _dragTimer = window.setTimeout(function () {
        var scrollPanel = _data.layout.scrollPanel;
        scrollPanel.scrollLeft = _scrollTo.x;
        scrollPanel.scrollTop = _scrollTo.y;
        window.clearTimeout(_dragTimer);
        _dragTimer = null;
      }, 50);
    }
  }

  function setHighlightItem(event, newHighlightItemId) {
    var result = true,
      eventArgs;
    if (newHighlightItemId !== null) {
      if (newHighlightItemId !== _data.options.highlightItem) {
        eventArgs = getEventArgs(_data.options.highlightItem, newHighlightItemId);

        _data.options.highlightItem = newHighlightItemId;

        trigger("onHighlightChanging", event, eventArgs);

        if (!eventArgs.cancel) {
          refresh(false, false);

          trigger("onHighlightChanged", event, eventArgs);
        } else {
          result = false;
        }
      }
    } else {
      if (_data.options.highlightItem !== null) {
        eventArgs = getEventArgs(_data.options.highlightItem, null);

        _data.options.highlightItem = null;

        trigger("onHighlightChanging", event, eventArgs);

        if (!eventArgs.cancel) {
          refresh(false, false);

          trigger("onHighlightChanged", event, eventArgs);
        } else {
          result = false;
        }
      }
    }
    return result;
  }

  function setCursorItem(event, newCursorItemId) {
    var eventArgs;
    if (newCursorItemId !== _data.options.cursorItem) {
      eventArgs = getEventArgs(_data.options.cursorItem, newCursorItemId);

      _data.options.cursorItem = newCursorItemId;

      trigger("onCursorChanging", event, eventArgs);

      if (!eventArgs.cancel) {
        refresh(true, _debug);

        trigger("onCursorChanged", event, eventArgs);
      }
    }
  }

  function getEventArgs(oldTreeItemId, newTreeItemId, name) {
    return eventArgsFactory(_data, oldTreeItemId, newTreeItemId, name);
  }

  function trigger(eventHandlerName, event, eventArgs) {
    var eventHandler = _data.options[eventHandlerName];
    if (eventHandler != null) {
      eventHandler(event, eventArgs);
    }
  }

  update(); /* init control on create */

  return {
    destroy: destroy,
    setOptions: setOptions,
    getOptions: getOptions,
    setOption: setOption,
    getOption: getOption,
    update: update
  };
};
