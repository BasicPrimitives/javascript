import ObjectReader from '../../readers/ObjectReader';
import ValueReader from '../../readers/ValueReader';
import { PageFitMode } from '../../enums';
import Size from '../../graphics/structs/Size';
import Thickness from '../../graphics/structs/Thickness';

export default function CurrentControlSizeTask(layoutOptionsTask, itemsSizesOptionTask, frameSizeTask, levelTitleSizeTask) {
  var _data = {},
    _hash = {},
    _dataTemplate = new ObjectReader({
      scrollPanelSize: new ObjectReader({
        width: new ValueReader(["number"], true),
        height: new ValueReader(["number"], true)
      }, true),
      optimalPanelSize: new ObjectReader({
        width: new ValueReader(["number"], true),
        height: new ValueReader(["number"], true)
      }, true),
      hasFrame: new ValueReader(["boolean"], true),
      hasLevelTitles: new ValueReader(["boolean"], true)
    });

  function process() {
    var result = false,
      context = { isChanged: false, hash: _hash },
      layoutOptions = layoutOptionsTask.getOptions(),
      { pageFitMode } = itemsSizesOptionTask.getOptions(),
      frameThickness = new Thickness(frameSizeTask.getThickness()),
      levelTitlesThickness = new Thickness(levelTitleSizeTask.getOptions().thickness);

    // disable outer level titles if its square space is bigger than viewport
    layoutOptions.hasLevelTitles = false;
    if(levelTitlesThickness.isPositive()) {
      let viewportSize = new Size(layoutOptions.scrollPanelSize);
      viewportSize.removeThickness(levelTitlesThickness);
      if(layoutOptions.scrollPanelSize.space() < viewportSize.space() * 2) {
        layoutOptions.scrollPanelSize = viewportSize;
        layoutOptions.hasLevelTitles = true;
      }
    }      

    // disable frame if its square space is bigger than viewport
    layoutOptions.hasFrame = false;
    if(frameThickness.isPositive()) {
      let viewportSize = new Size(layoutOptions.scrollPanelSize);
      viewportSize.removeThickness(frameThickness);
      if(layoutOptions.scrollPanelSize.space() < viewportSize.space() * 2) {
        layoutOptions.scrollPanelSize = viewportSize;
        layoutOptions.hasFrame = true;
      }
    }

    layoutOptions.optimalPanelSize = new Size(layoutOptions.scrollPanelSize.width - 25, layoutOptions.scrollPanelSize.height - 25)

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

  function getOptions() {
    return _data;
  }

  return {
    process: process,
    getOptions: getOptions
  };
};