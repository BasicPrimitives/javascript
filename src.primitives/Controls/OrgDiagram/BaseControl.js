/**
 * JavaScript Abstract Control
 * @class BaseControl
 */
primitives.orgdiagram.BaseControl = function (element, options, taskManagerFactory, eventArgsFactory, templates) {
  var _data = {
    name: "orgdiagram",
    options: options,
    tasks: null,
    graphics: null,
    mouse: null,
    layout: {
      element: element,
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
    _scale,
    _debug = false,
    _timer = null;

  /**
   * Makes full redraw of diagram contents reevaluating all options. This method has to be called explisitly
   * after all options are set in order to update controls contents.
   * 
   * @param {UpdateMode} updateMode 
   * @param {bollean} forceCenterOnCursor 
   */
  function update(updateMode, forceCenterOnCursor) {
    if (forceCenterOnCursor == null) {
      forceCenterOnCursor = true;
    }
    switch (updateMode) {
      case primitives.common.UpdateMode.Refresh:
        refresh(forceCenterOnCursor, _debug);
        break;
      case primitives.common.UpdateMode.PositonHighlight:
        positionHighlight(_debug);
        break;
      default:
        redraw();
        break;
    }
  }

  /**
   * Removes all elements control added to DOM incluidng event listeners.
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
    _data.graphics = primitives.common.createGraphics(_data.options.graphicsType, _data.layout.element);
    _data.graphics.debug = _debug;

    refresh(true, _debug);
  }

  function refresh(forceCenterOnCursor, debug) {
    var centerOnCursorTask,
      placeholderOffset;

    //_data.layout.scrollPanel.css({
    //	"display": "none",
    //	"-webkit-overflow-scrolling": "auto"
    //});

    //this.graphics.begin();

    _data.layout.forceCenterOnCursor = forceCenterOnCursor;
    _data.tasks.process('OptionsTask', null, debug);

    _data.graphics.end();

    //_data.layout.scrollPanel.css({
    //	"display": "block"
    //});

    if (forceCenterOnCursor) {
      /* scroll to offset */
      centerOnCursorTask = _data.tasks.getTask("CenterOnCursorTask");
      placeholderOffset = centerOnCursorTask.getPlaceholderOffset();
      _data.layout.scrollPanel.scrollLeft = placeholderOffset.x;
      _data.layout.scrollPanel.scrollTop = placeholderOffset.y;
    }
    //_data.layout.scrollPanel.css({
    //	"-webkit-overflow-scrolling": "touch"
    //});

    /* fix pixel alignment */
    var pixelAlignmentFix = primitives.common.getFixOfPixelALignment(_data.layout.element);
    primitives.common.JsonML.applyStyles(_data.layout.scrollPanel, {
      "top": "0px",
      "left": "0px",
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
      scrollPanelSize = primitives.common.getInnerSize(layout.element),
      placeholderOffset = new primitives.common.Point(layout.scrollPanel.scrollLeft, layout.scrollPanel.scrollTop);
    return {
      forceCenterOnCursor: layout.forceCenterOnCursor,
      scrollPanelSize: scrollPanelSize,
      placeholderOffset: placeholderOffset
    }
  }

  function setLayout(layoutOptions) {
    var layout = _data.layout;

    /* set size of panel with content */
    var mousePanelSize = new primitives.common.Size(layoutOptions.contentSize);
    mousePanelSize.scale(1 * layoutOptions.scale);
    primitives.common.JsonML.applyStyles(layout.mousePanel, mousePanelSize.getCSS());

    /* set size of panel with content */
    primitives.common.JsonML.applyStyles(layout.placeholder, layoutOptions.contentSize.getCSS());

    /* set CSS scale of content */
    var scaletext = "scale(" + layoutOptions.scale + "," + layoutOptions.scale + ")";

    primitives.common.JsonML.applyStyles(layout.placeholder, {
      "transform-origin": "0 0",
      "transform": scaletext,
      "-ms-transform": scaletext, /* IE 9 */
      "-webkit-transform": scaletext, /* Safari and Chrome */
      "-o-transform": scaletext, /* Opera */
      "-moz-transform": scaletext /* Firefox */
    });

    var scrollPanelSize = new primitives.common.Size(layoutOptions.scrollPanelSize);
    if (layoutOptions.autoSize) {
      /* resize element to fit placeholder if control in autosize mode */
      scrollPanelSize = new primitives.common.Size(mousePanelSize.width + 25, mousePanelSize.height + 25);
      scrollPanelSize.cropBySize(layoutOptions.autoSizeMaximum);
      scrollPanelSize.addSize(layoutOptions.autoSizeMinimum);//ignore jslint
      primitives.common.JsonML.applyStyles(layout.element, scrollPanelSize.getCSS());
    }

    /* set scroll of content */
    primitives.common.JsonML.applyStyles(layout.scrollPanel, scrollPanelSize.getCSS());

    return scrollPanelSize;
  }

  function createLayout(layout, name) {
    var elementSize = primitives.common.getInnerSize(layout.element),
      scrollPanelRect = new primitives.common.Rect(0, 0, elementSize.width, elementSize.height),
      placeholderRect = new primitives.common.Rect(scrollPanelRect),
      pixelAlignmentFix = primitives.common.getFixOfPixelALignment(element);


    primitives.common.JsonML.appendDOM(layout.element, primitives.common.JsonML.toHTML(
      ["div", /* scrollPanel - root scroll panel */
        {
          "tabindex": 0,
          "style": {
            "position": "relative",
            "overflow": "auto",
            "-webkit-overflow-scrolling": "touch",
            "top": "0px",
            "left": "0px",
            "width": scrollPanelRect.width + "px",
            "height": scrollPanelRect.height + "px",
            "padding": "0px",
            "marginBottom": "0px",
            "marginRight": "0px",
            "marginLeft": pixelAlignmentFix.width + "px", /* fixes div pixel alignment */
            "marginTop": pixelAlignmentFix.height + "px"
          },
          "class": name,
          "$": function (element) { layout.scrollPanel = element; }
        },
        ["div", /* mousePanel - mouse tracking events panel */
          {
            "style": primitives.common.mergeObjects({
              position: "absolute",
              overflow: "hidden"
            },
              placeholderRect.getCSS()),
            "class": name,
            "$": function (element) { layout.mousePanel = element; }
          },
          ["div", /* placeholder - contents scalable panel */
            {
              "style": primitives.common.mergeObjects({
                position: "absolute",
                overflow: "hidden"
              },
                placeholderRect.getCSS()),
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
                "class": ["calloutplaceholder", name],
                "$": function (element) { layout.calloutPlaceholder = element; }
              }
            ]
          ]
        ]
      ])
    );
  }

  function cleanLayout(layout) {
    if (_data.layout.scrollPanel != null) {
      var parent = _data.layout.scrollPanel.parentNode;
      if (parent != null) {
        parent.removeChild(_data.layout.scrollPanel);
      }
    }
  }

  function bind(layout) {
    layout.mousePanel.addEventListener('mousemove', onMouseMove);
    layout.mousePanel.addEventListener('click', onMouseClick);
    layout.mousePanel.addEventListener('dblclick', onMouseDblClick);
    layout.mousePanel.addEventListener('change', onCheckboxChange);

    layout.scrollPanel.addEventListener('keydown', onKeyDown);
    layout.scrollPanel.addEventListener('scroll', onScroll);
    if (_data.options.enablePanning && primitives.common.isChrome()) {
      layout.scrollPanel.draggable = true;
      layout.scrollPanel.addEventListener('dragstart', onDragStart);
      layout.scrollPanel.addEventListener('drag', onDragScroll);
      layout.scrollPanel.addEventListener('dragend', onDragScroll);
      layout.scrollPanel.addEventListener('dragover', onDragOver);
    }
  }

  function unbind(layout) {
    if (layout.mousePanel != null) {
      layout.mousePanel.removeEventListener("mousemove", onMouseMove);
      layout.mousePanel.removeEventListener("click", onMouseClick);
      layout.mousePanel.removeEventListener("dblclick", onMouseDblClick);
      layout.mousePanel.removeEventListener("change", onCheckboxChange);
    }
    if (layout.scrollPanel != null) {
      layout.scrollPanel.removeEventListener("keydown", onKeyDown);
      layout.scrollPanel.removeEventListener("scroll", onScroll);

      layout.scrollPanel.removeEventListener('dragstart', onDragStart);
      layout.scrollPanel.removeEventListener('drag', onDragScroll);
      layout.scrollPanel.removeEventListener('dragend', onDragScroll);
      layout.scrollPanel.removeEventListener('dragover', onDragOver);
    }
  }

  function onMouseMove(event) {
    var placeholderOffset = primitives.common.getElementOffset(_data.layout.mousePanel),
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
      var position = primitives.common.indexOf(selectedItems, selectedId);
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
    var placeholderOffset = primitives.common.getElementOffset(_data.layout.mousePanel),
      x = event.pageX - placeholderOffset.left,
      y = event.pageY - placeholderOffset.top,
      createTransformTask = _data.tasks.getTask("CreateTransformTask"),
      cursorItemOptionTask = _data.tasks.getTask("CursorItemOptionTask"),
      highlightItemOptionTask = _data.tasks.getTask("HighlightItemOptionTask"),
      item,
      newCursorItemId = createTransformTask.getTreeItemForMousePosition(x, y, highlightItemOptionTask.getGravityRadius()),
      target,
      button,
      buttonname,
      eventArgs,
      position,
      selectedItems;
    target = event.target;
    if (newCursorItemId !== null) {
      if (primitives.common.hasClass(target, _data.name + "button") || primitives.common.hasClass(target.parentNode, _data.name + "button")) {
        button = primitives.common.hasClass(target, _data.name + "button") ? target : target.parentNode;
        buttonname = button.getAttribute("data-buttonname");

        eventArgs = getEventArgs(null, newCursorItemId, buttonname);
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
            _data.layout.scrollPanel.focus();
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
            layout.scrollPanel.focus();
          }
          break;
        case 40: /*Down*/
          direction = primitives.common.OrientationType.Bottom;
          break;
        case 38: /*Up*/
          direction = primitives.common.OrientationType.Top;
          break;
        case 37: /*Left*/
          direction = primitives.common.OrientationType.Left;
          break;
        case 39: /*Right*/
          direction = primitives.common.OrientationType.Right;
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
        layout.scrollPanel.focus();
      }
    }
  }

  function onDragStart(event) {
    var scrollPanel = _data.layout.scrollPanel;
    _dragFrom = new primitives.common.Point(event.clientX, event.clientY);
    _scrollFrom = new primitives.common.Point(scrollPanel.scrollLeft, scrollPanel.scrollTop);
    _dragImage = _dragImage || new Image(); //ignore jslint
    event.dataTransfer.setDragImage(_dragImage, 0, 0);
  }

  function onDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  function onDragScroll(event) {
    _scrollTo = new primitives.common.Point(_scrollFrom.x - (event.clientX - _dragFrom.x), _scrollFrom.y - (event.clientY - _dragFrom.y));
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
