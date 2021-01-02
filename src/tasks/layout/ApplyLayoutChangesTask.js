import Size from '../../graphics/structs/Size';
import Thickness from '../../graphics/structs/Thickness';
import { PageFitMode } from '../../enums';
import Rect from '../../graphics/structs/Rect';
import Point from '../../graphics/structs/Point';

export default function ApplyLayoutChangesTask(getGraphics, setLayout, itemsSizesOptionTask,
  currentControlSizeTask, scaleOptionTask, alignDiagramTask, frameSizeTask, levelTitleSizeTask) {
  var _data = {
    viewportSize: null,
    frameThickness: null,
    framePlaceholderSize: null
  };

  function process() {
    var graphics = getGraphics(),
      { scale } = scaleOptionTask.getOptions(),
      { pageFitMode, autoSizeMinimum, autoSizeMaximum } = itemsSizesOptionTask.getOptions(),
      placeholderSize = alignDiagramTask.getContentSize(),
      { scrollPanelSize, hasFrame, hasLevelTitles } = currentControlSizeTask.getOptions(),
      viewportSize = new Size(scrollPanelSize),
      frameThickness = frameSizeTask.getThickness(),
      titlesThickness = new Thickness(levelTitleSizeTask.getOptions().thickness),
      autoSize = (pageFitMode == PageFitMode.AutoSize);

    /* scaled content size */
    var mousePanelSize = new Size(placeholderSize);
    mousePanelSize.scale(scale);

    if (autoSize) {
      /* resize element to fit placeholder if control is in auto size mode
        25 it is reservation for scrollbars 
        minimum & maximum auto size regulate maximum and minimum diagram size
        it is handy when it is needed to limit oversized diagram expansion
        or diagram is empty or so tiny that it is not clear that it exists at all
      */
      viewportSize = new Size(mousePanelSize.width + 25, mousePanelSize.height + 25);
      viewportSize.addThickness(frameThickness);
      if(titlesThickness.isPositive()) {
        viewportSize.addThickness(titlesThickness);
      }
      viewportSize.cropBySize(autoSizeMaximum);
      viewportSize.maxSize(autoSizeMinimum);//ignore jslint

      // disable frame if its square space is bigger than viewport
      var framedViewportSize = new Size(viewportSize);
      framedViewportSize.removeThickness(frameThickness);
      if(titlesThickness.isPositive()) {
        framedViewportSize.removeThickness(titlesThickness);
      }
      if(viewportSize.space() < framedViewportSize.space() * 2) {
        viewportSize = framedViewportSize;
      } else {
        frameThickness = new Thickness( 0, 0, 0, 0 );
        titlesThickness = new Thickness( 0, 0, 0, 0 );
      }
    } else {
      if(!hasFrame) {
        frameThickness = new Thickness( 0, 0, 0, 0 );
      }
      if(!hasLevelTitles && titlesThickness.isPositive()) {
        titlesThickness = new Thickness( 0, 0, 0, 0 );
      }
    }

    // Control Size
    var decorThickness = new Thickness(frameThickness);
    if(titlesThickness.isPositive()) {
      decorThickness.addThickness(titlesThickness);
    }
    var controlSize = new Size(viewportSize);
    controlSize.addThickness(decorThickness);

    // Scroll panel placement
    var scrollPanelRect = new Rect(decorThickness.left, decorThickness.top, viewportSize.width, viewportSize.height);

    /* frame */
    var framePlaceholderSize = new Size(controlSize);
    var frameMousePanelRect = new Rect(0, 0, framePlaceholderSize.width, framePlaceholderSize.height);
    framePlaceholderSize.scale(1 / scale);

    /* level titles */
    var firstPoint = new Point(0, 0), 
      secondPoint = new Point(0, 0);
    if(titlesThickness.left != 0) {
      firstPoint = new Point(scrollPanelRect.x, scrollPanelRect.y);
      secondPoint = new Point(scrollPanelRect.x - titlesThickness.left, scrollPanelRect.bottom());
    } else if(titlesThickness.right != 0) {
      firstPoint = new Point(scrollPanelRect.right(), scrollPanelRect.y);
      secondPoint = new Point(scrollPanelRect.right() + titlesThickness.right, scrollPanelRect.bottom());
    } else if(titlesThickness.top != 0) {
      firstPoint = new Point(scrollPanelRect.x, scrollPanelRect.y);
      secondPoint = new Point(scrollPanelRect.right(), scrollPanelRect.y - titlesThickness.top);
    } else if(titlesThickness.bottom != 0) {
      firstPoint = new Point(scrollPanelRect.x, scrollPanelRect.bottom());
      secondPoint = new Point(scrollPanelRect.right(), scrollPanelRect.bottom() + titlesThickness.bottom);
    }
    var titlesMousePanelRect = new Rect(firstPoint, secondPoint);
    var titlesPlaceholderSize = new Size(titlesMousePanelRect);
    titlesPlaceholderSize.scale(1 / scale);
    
    graphics.resize("frameplaceholder", framePlaceholderSize.width, framePlaceholderSize.height );
    graphics.resize("titlesplaceholder", titlesPlaceholderSize.width, titlesPlaceholderSize.height );
    graphics.resize("placeholder", placeholderSize.width, placeholderSize.height);

    setLayout({
      autoSize: autoSize, // resize control if true
      controlSize: controlSize, // Sets control Size in auto scale mode
      scale: scale, // scale is needed for scale transform CSS creation

      frameMousePanelRect: frameMousePanelRect,
      framePlaceholderSize: framePlaceholderSize, // the frame content size before CSS Scale Transform applied

      titlesMousePanelRect: titlesMousePanelRect,
      titlesPlaceholderSize: titlesPlaceholderSize, // Titles size before CSS Scale Transform applied

      scrollPanelRect: scrollPanelRect,
      mousePanelSize: mousePanelSize, // Content mouse panel size
      placeholderSize: placeholderSize // Content size before CSS Scale Transform applied

    });

    
    _data.viewportSize = viewportSize;
    _data.frameThickness = frameThickness;
    _data.frameOffset = titlesThickness.isPositive() ? titlesThickness : new Thickness( 0, 0, 0, 0 );
    _data.titlesThickness = titlesThickness;
    _data.framePlaceholderSize = framePlaceholderSize;
    return true;
  }

  function getOptimalPanelSize() {
    return new Size(_data.viewportSize.width - 25, _data.viewportSize.height - 25);
  }

  function getScrollPanelSize() {
    return new Size(_data.viewportSize.width, _data.viewportSize.height);
  }

  function getFrameThickness() {
    return new Thickness(_data.frameThickness);
  }

  function getFrameOffset() {
    return new Thickness(_data.frameOffset);
  }

  function getTitlesThickness() {
    return new Thickness(_data.titlesThickness);
  }

  return {
    process: process,
    getOptimalPanelSize: getOptimalPanelSize,
    getScrollPanelSize: getScrollPanelSize,
    getFrameThickness: getFrameThickness,
    getFrameOffset: getFrameOffset,
    getTitlesThickness: getTitlesThickness
  };
};