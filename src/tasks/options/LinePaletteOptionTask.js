import ValueReader from '../../readers/ValueReader';
import ObjectReader from '../../readers/ObjectReader';
import ArrayReader from '../../readers/ArrayReader';
import EnumerationReader from '../../readers/EnumerationReader';
import { LineType } from '../../enums';

export default function LinePaletteOptionTask(optionsTask, defaultPaletteItemConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new ObjectReader({
    linesPalette: new ArrayReader(
      new ObjectReader({
        lineColor: new ValueReader(["string"], false, defaultPaletteItemConfig.lineColor),
        lineWidth: new ValueReader(["number"], false, defaultPaletteItemConfig.lineWidth),
        lineType: new EnumerationReader(LineType, false, defaultPaletteItemConfig.lineType)
      }),
      false
    )
  });

  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    };

    _data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

    return context.isChanged;
  }

  function getOptions() {
    return _data;
  }

  return {
    process: process,
    getOptions: getOptions
  };
};