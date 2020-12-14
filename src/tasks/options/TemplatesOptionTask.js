import ArrayReader from '../../readers/ArrayReader';
import ValueReader from '../../readers/ValueReader';
import ObjectReader from '../../readers/ObjectReader';
import EnumerationReader from '../../readers/EnumerationReader';
import FunctionReader from '../../readers/FunctionReader';
import { LineType, ShapeType, TextOrientationType, HorizontalAlignmentType, VerticalAlignmentType, Enabled } from '../../enums';

export default function TemplatesOptionTask(optionsTask, defaultConfig, defaultTemplateConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new ObjectReader({
    groupTitleVerticalAlignment: new EnumerationReader(VerticalAlignmentType, false, defaultConfig.groupTitleVerticalAlignment),
    groupTitleHorizontalAlignment: new EnumerationReader(HorizontalAlignmentType, false, defaultConfig.groupTitleHorizontalAlignment),
    groupTitleOrientation: new EnumerationReader(TextOrientationType, false, defaultConfig.groupTitleOrientation),
    groupTitleFontSize: new ValueReader(["string"], false, defaultConfig.groupTitleFontSize),
    groupTitleFontFamily: new ValueReader(["string"], false, defaultConfig.groupTitleFontFamily),
    groupTitleColor: new ValueReader(["string"], false, defaultConfig.groupTitleColor),
    groupTitleFontWeight: new ValueReader(["string"], false, defaultConfig.groupTitleFontWeight),
    groupTitleFontStyle: new ValueReader(["string"], false, defaultConfig.groupTitleFontStyle),

    itemTitleFirstFontColor: new ValueReader(["string"], false, defaultConfig.itemTitleFirstFontColor),
    itemTitleSecondFontColor: new ValueReader(["string"], false, defaultConfig.itemTitleSecondFontColor),
    selectCheckBoxLabel: new ValueReader(["string"], false, defaultConfig.selectCheckBoxLabel),
    onItemRender: new FunctionReader(),
    onCursorRender: new FunctionReader(),
    onHighlightRender: new FunctionReader(),
    templates: new ArrayReader(
      new ObjectReader({
        name: new ValueReader(["string"], true),
        isActive: new ValueReader(["boolean"], false, defaultTemplateConfig.isActive),
        itemSize: new ObjectReader({
          width: new ValueReader(["number"], false, defaultTemplateConfig.itemSize.width),
          height: new ValueReader(["number"], false, defaultTemplateConfig.itemSize.height)
        }, false, defaultTemplateConfig.itemSize),
        itemBorderWidth: new ValueReader(["number"], false, defaultTemplateConfig.itemBorderWidth),
        itemTemplate: new ValueReader(["string", "object"], true),
        minimizedItemShapeType: new EnumerationReader(ShapeType, true),
        minimizedItemSize: new ObjectReader({
          width: new ValueReader(["number"], false, defaultTemplateConfig.minimizedItemSize.width),
          height: new ValueReader(["number"], false, defaultTemplateConfig.minimizedItemSize.height)
        }, false, defaultTemplateConfig.minimizedItemSize),
        minimizedItemCornerRadius: new ValueReader(["number"], true),
        minimizedItemLineWidth: new ValueReader(["number"], false, defaultTemplateConfig.minimizedItemLineWidth),
        minimizedItemBorderColor: new ValueReader(["string"], true),
        minimizedItemLineType: new EnumerationReader(LineType, false, defaultTemplateConfig.minimizedItemLineType),
        minimizedItemFillColor: new ValueReader(["string"], true),
        minimizedItemOpacity: new ValueReader(["number"], false, defaultTemplateConfig.minimizedItemOpacity),
        highlightPadding: new ObjectReader({
          left: new ValueReader(["number"], false, defaultTemplateConfig.highlightPadding.left),
          top: new ValueReader(["number"], false, defaultTemplateConfig.highlightPadding.top),
          right: new ValueReader(["number"], false, defaultTemplateConfig.highlightPadding.right),
          bottom: new ValueReader(["number"], false, defaultTemplateConfig.highlightPadding.bottom)
        }, false, defaultTemplateConfig.highlightPadding),
        highlightBorderWidth: new ValueReader(["number"], false, defaultTemplateConfig.highlightBorderWidth),
        highlightTemplate: new ValueReader(["string", "object"], true),
        cursorPadding: new ObjectReader({
          left: new ValueReader(["number"], false, defaultTemplateConfig.cursorPadding.left),
          top: new ValueReader(["number"], false, defaultTemplateConfig.cursorPadding.top),
          right: new ValueReader(["number"], false, defaultTemplateConfig.cursorPadding.right),
          bottom: new ValueReader(["number"], false, defaultTemplateConfig.cursorPadding.bottom)
        }, false, defaultTemplateConfig.cursorPadding),
        cursorBorderWidth: new ValueReader(["number"], false, defaultTemplateConfig.cursorBorderWidth),
        cursorTemplate: new ValueReader(["string", "object"], true),
        hasButtons: new EnumerationReader(Enabled, false, defaultTemplateConfig.hasButtons),
        onButtonsRender: new FunctionReader()
      }),
      true,
      "name"
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
    getOptions: getOptions,
    description: "Checks items template options."
  };
};