import ObjectReader from '../../readers/ObjectReader';
import ValueReader from '../../readers/ValueReader';
import { PageFitMode } from '../../enums';
import Thickness from '../../graphics/structs/Thickness';
import Size from '../../graphics/structs/Size';

export default function CurrentControlSizeTask(layoutOptionsTask, itemsSizesOptionTask, frameSizeTask) {
  var _data = {
    scrollPanelSize: null
  },
    _hash = {},
    _dataTemplate = new ObjectReader({
      scrollPanelSize: new ObjectReader({
        width: new ValueReader(["number"], true),
        height: new ValueReader(["number"], true)
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
    var viewportSize = new Size(layoutOptions.scrollPanelSize);
    viewportSize.removeThickness(thickness);

    if(layoutOptions.scrollPanelSize.space() < viewportSize.space() * 2) {
      layoutOptions.scrollPanelSize = viewportSize;
      layoutOptions.frameThickness = thickness;
    } else {
      layoutOptions.frameThickness = new Thickness( 0, 0, 0, 0 );
    }

    _data = _dataTemplate.read(_data, layoutOptions, "layout", context);

    switch (pageFitMode) {
      case PageFitMode.PageWidth:
      case PageFitMode.PageHeight:
      case PageFitMode.FitToPage:
      case PageFitMode.None:
      case PageFitMode.SelectionOnly:
        result = context.isChanged;
        break;
      default:
        break;

    }

    return result;
  }

  function getScrollPanelSize() {
    return new Size(_data.scrollPanelSize);
  }

  function getOptimalPanelSize() {
    return new Size(_data.scrollPanelSize.width - 25, _data.scrollPanelSize.height - 25);
  }

  return {
    process: process,
    getScrollPanelSize: getScrollPanelSize,
    getOptimalPanelSize: getOptimalPanelSize
  };
};