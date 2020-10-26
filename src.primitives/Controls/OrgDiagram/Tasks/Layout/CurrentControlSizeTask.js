primitives.orgdiagram.CurrentControlSizeTask = function (layoutOptionsTask, itemsSizesOptionTask, frameSizeTask) {
  var _data = {
    scrollPanelSize: null
  },
    _hash = {},
    _dataTemplate = new primitives.common.ObjectReader({
      scrollPanelSize: new primitives.common.ObjectReader({
        width: new primitives.common.ValueReader(["number"], true),
        height: new primitives.common.ValueReader(["number"], true)
      }, true)
    });

  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    },
      layoutOptions = layoutOptionsTask.getOptions(),
      result = false,
      pageFitMode = itemsSizesOptionTask.getOptions().pageFitMode,
      thickness = frameSizeTask.getThickness();

    // disable frame if its square space is bigger than viewport
    var viewportSize = new primitives.common.Size(layoutOptions.scrollPanelSize);
    viewportSize.removeThickness(thickness);

    if(layoutOptions.scrollPanelSize.space() < viewportSize.space() * 2) {
      layoutOptions.scrollPanelSize = viewportSize;
      layoutOptions.frameThickness = thickness;
    } else {
      layoutOptions.frameThickness = new primitives.common.Thickness( 0, 0, 0, 0 );
    }

    _data = _dataTemplate.read(_data, layoutOptions, "layout", context);

    switch (pageFitMode) {
      case primitives.common.PageFitMode.PageWidth:
      case primitives.common.PageFitMode.PageHeight:
      case primitives.common.PageFitMode.FitToPage:
      case primitives.common.PageFitMode.None:
      case primitives.common.PageFitMode.SelectionOnly:
        result = context.isChanged;
        break;
      default:
        break;

    }

    return result;
  }

  function getScrollPanelSize() {
    return new primitives.common.Size(_data.scrollPanelSize);
  }

  function getOptimalPanelSize() {
    return new primitives.common.Size(_data.scrollPanelSize.width - 25, _data.scrollPanelSize.height - 25);
  }

  return {
    process: process,
    getScrollPanelSize: getScrollPanelSize,
    getOptimalPanelSize: getOptimalPanelSize
  };
};