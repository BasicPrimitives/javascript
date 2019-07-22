primitives.orgdiagram.ApplyLayoutChangesTask = function (getGraphics, setLayout, itemsSizesOptionTask,
  currentControlSizeTask, scaleOptionTask, alignDiagramTask) {
  var _data = {
    scrollPanelSize: null
  };

  function process() {
    var graphics = getGraphics(),
      scaleOptions = scaleOptionTask.getOptions(),
      itemsSizesOptions = itemsSizesOptionTask.getOptions(),
      contentSize = alignDiagramTask.getContentSize(),
      scrollPanelSize = currentControlSizeTask.getScrollPanelSize();

    graphics.resize("placeholder", contentSize.width, contentSize.height);

    _data.scrollPanelSize = setLayout({
      scale: (scaleOptions.scale),
      contentSize: contentSize,
      scrollPanelSize: scrollPanelSize,
      autoSize: (itemsSizesOptions.pageFitMode == primitives.common.PageFitMode.AutoSize),
      autoSizeMaximum: (itemsSizesOptions.autoSizeMaximum),
      autoSizeMinimum: (itemsSizesOptions.autoSizeMinimum)
    });

    return true;
  }

  function getOptimalPanelSize() {
    return new primitives.common.Size(_data.scrollPanelSize.width - 25, _data.scrollPanelSize.height - 25);
  }

  return {
    process: process,
    getOptimalPanelSize: getOptimalPanelSize
  };
};