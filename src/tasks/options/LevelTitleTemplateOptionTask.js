import ValueReader from '../../readers/ValueReader';
import ObjectReader from '../../readers/ObjectReader';
import EnumerationReader from '../../readers/EnumerationReader';
import { HorizontalAlignmentType, VerticalAlignmentType, TextOrientationType } from '../../enums';

export default function LevelTitleTemplateOptionTask(optionsTask, defaultConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new ObjectReader({
    levelTitleOrientation: new EnumerationReader(TextOrientationType, false, defaultConfig.levelTitleOrientation),
    levelTitleVerticalAlignment: new EnumerationReader(VerticalAlignmentType, false, defaultConfig.levelTitleVerticalAlignment),
    levelTitleHorizontalAlignment: new EnumerationReader(HorizontalAlignmentType, false, defaultConfig.levelTitleHorizontalAlignment),
    levelTitleFontSize: new ValueReader(["string"], false, defaultConfig.levelTitleFontSize),
    levelTitleFontFamily: new ValueReader(["string"], false, defaultConfig.levelTitleFontFamily),
    levelTitleFontColor: new ValueReader(["string"], false, defaultConfig.levelTitleFontColor),
    levelTitleColor: new ValueReader(["string"], false, defaultConfig.levelTitleColor),
    levelTitleFontWeight: new ValueReader(["string"], false, defaultConfig.levelTitleFontWeight),
    levelTitleFontStyle: new ValueReader(["string"], false, defaultConfig.levelTitleFontStyle)
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
    getOptions: getOptions,
    description: "Level annotation title template options."
  };
};
