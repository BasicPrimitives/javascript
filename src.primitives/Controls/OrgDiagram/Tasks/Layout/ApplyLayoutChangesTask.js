primitives.orgdiagram.ApplyLayoutChangesTask = function (getGraphics, setLayout, itemsSizesOptionTask,
  currentControlSizeTask, scaleOptionTask, alignDiagramTask, frameSizeTask) {
  var _data = {
    viewportSize: null,
    frameThickness: null,
    framePlaceholderSize: null
  };

  function process() {
    var graphics = getGraphics(),
      scale = scaleOptionTask.getOptions().scale,
      itemsSizesOptions = itemsSizesOptionTask.getOptions(),
      contentSize = alignDiagramTask.getContentSize(),
      viewportSize = currentControlSizeTask.getScrollPanelSize(),
      frameThickness = frameSizeTask.getThickness(),
      autoSize = (itemsSizesOptions.pageFitMode == primitives.common.PageFitMode.AutoSize);

    /* scaled content size */
    var scaledContentSize = new primitives.common.Size(contentSize);
    scaledContentSize.scale(scale);

    if (autoSize) {
      /* resize element to fit placeholder if control in autosize mode */
      viewportSize = new primitives.common.Size(scaledContentSize.width + 25, scaledContentSize.height + 25);
      viewportSize.addThickness(frameThickness);
      viewportSize.cropBySize(itemsSizesOptions.autoSizeMaximum);
      viewportSize.maxSize(itemsSizesOptions.autoSizeMinimum);//ignore jslint

      // disable frame if its square space is bigger than viewport
      var framedViewportSize = new primitives.common.Size(viewportSize);
      framedViewportSize.removeThickness(frameThickness);

      if(viewportSize.space() < framedViewportSize.space() * 2) {
        viewportSize = framedViewportSize;
      } else {
        frameThickness = new primitives.common.Thickness( 0, 0, 0, 0 );
      }
    }

    var controlSize = new primitives.common.Size(viewportSize);
    controlSize.addThickness(frameThickness);


    var framePlaceholderSize = new primitives.common.Size(controlSize);
    framePlaceholderSize.scale(1 / scale);

    graphics.resize("placeholder", contentSize.width, contentSize.height);
    graphics.resize("frameplaceholder", framePlaceholderSize.width, framePlaceholderSize.height );

    setLayout({
      scale: scale,
      autoSize: autoSize,
      contentSize: contentSize,
      scaledContentSize: scaledContentSize,
      viewportSize: viewportSize,
      frameThickness: frameThickness,
      controlSize: controlSize,
      framePlaceholderSize: framePlaceholderSize
    });

    _data.viewportSize = viewportSize;
    _data.frameThickness = frameThickness;
    _data.framePlaceholderSize = framePlaceholderSize;
    return true;
  }

  function getOptimalPanelSize() {
    return new primitives.common.Size(_data.viewportSize.width - 25, _data.viewportSize.height - 25);
  }

  function getScrollPanelSize() {
    return new primitives.common.Size(_data.viewportSize.width, _data.viewportSize.height);
  }

  function getFrameThickness() {
    return new primitives.common.Thickness(_data.frameThickness);
  }

  return {
    process: process,
    getOptimalPanelSize: getOptimalPanelSize,
    getScrollPanelSize: getScrollPanelSize,
    getFrameThickness: getFrameThickness
  };
};