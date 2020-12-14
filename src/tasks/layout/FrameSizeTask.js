import ObjectReader from '../../readers/ObjectReader';
import ValueReader from '../../readers/ValueReader';
import Thickness from '../../graphics/structs/Thickness';
import Size from '../../graphics/structs/Size';

export default function FrameSizeTask(frameOptionTask, readTemplatesTask, scaleOptionTask) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new ObjectReader({
    median: new ObjectReader({
      left: new ValueReader(["number"], false, 0),
      top: new ValueReader(["number"], false, 0),
      right: new ValueReader(["number"], false, 0),
      bottom: new ValueReader(["number"], false, 0)
    }, false, new Thickness(0, 0, 0, 0)),
    thickness: new ObjectReader({
      left: new ValueReader(["number"], false, 0),
      top: new ValueReader(["number"], false, 0),
      right: new ValueReader(["number"], false, 0),
      bottom: new ValueReader(["number"], false, 0)
    }, false, new Thickness(0, 0, 0, 0))
  });

  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    };

    _data = _dataTemplate.read(_data, getFrameSize(), "options", context);

    return context.isChanged;
  }

  function getFrameSize() {
    var frameOptions = frameOptionTask.getOptions(),
      showFrame = frameOptions.showFrame,
      frameInnerPadding = frameOptions.frameInnerPadding,
      frameOuterPadding = frameOptions.frameOuterPadding,
      scale = scaleOptionTask.getOptions().scale,
      median = new Thickness(0, 0, 0, 0),
      thickness = new Thickness(0, 0, 0, 0);

    if(showFrame) {
      var maximumMarkerSize = new Size(0, 0),
          maximumMarkerPadding = new Thickness(0, 0, 0, 0),
          index, len,
          templates = readTemplatesTask.getItemTemplates();

      for (index = 0, len = templates.length; index < len; index += 1) {
        var template = templates[index];
        var templateConfig = template.templateConfig,
            cursorPadding = new Thickness(templateConfig.cursorPadding),
            highlightPadding = new Thickness(templateConfig.highlightPadding);
        
        cursorPadding.addThickness(templateConfig.cursorBorderWidth);
        highlightPadding.addThickness(templateConfig.highlightBorderWidth);

        maximumMarkerSize.maxSize(templateConfig.minimizedItemSize);
        maximumMarkerPadding.maxThickness(templateConfig.cursorPadding);
        maximumMarkerPadding.maxThickness(templateConfig.highlightPadding);
      }

      median = new Thickness(Math.ceil(maximumMarkerSize.width / 2.0) + maximumMarkerPadding.right, 
        Math.ceil(maximumMarkerSize.height / 2.0) + maximumMarkerPadding.bottom, 
        Math.ceil(maximumMarkerSize.width / 2.0) + maximumMarkerPadding.left, 
        Math.ceil(maximumMarkerSize.height / 2.0) + maximumMarkerPadding.top
      );
      median.addThickness(frameInnerPadding);
      median.scale(scale);
      thickness = new Thickness(maximumMarkerSize.width + maximumMarkerPadding.left + maximumMarkerPadding.right, 
        maximumMarkerSize.height + maximumMarkerPadding.top + maximumMarkerPadding.bottom, 
        maximumMarkerSize.width + maximumMarkerPadding.left + maximumMarkerPadding.right, 
        maximumMarkerSize.height + maximumMarkerPadding.top + maximumMarkerPadding.bottom
      );
      thickness.addThickness(frameInnerPadding);
      thickness.addThickness(frameOuterPadding);
      thickness.scale(scale);
    }
    return { median: median, thickness: thickness };
  }

  function getMedian() {
    return _data.median;
  }

  function getThickness() {
    return _data.thickness;
  }

  return {
    process: process,
    getMedian: getMedian,
    getThickness: getThickness
  };
};