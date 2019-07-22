primitives.orgdiagram.TemplatesOptionTask = function (optionsTask, defaultConfig, defaultButtonConfig, defaultTemplateConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new primitives.common.ObjectReader({
    groupTitleVerticalAlignment: new primitives.common.EnumerationReader(primitives.common.VerticalAlignmentType, false, defaultConfig.groupTitleVerticalAlignment),
    groupTitleHorizontalAlignment: new primitives.common.EnumerationReader(primitives.common.HorizontalAlignmentType, false, defaultConfig.groupTitleHorizontalAlignment),
    groupTitleOrientation: new primitives.common.EnumerationReader(primitives.text.TextOrientationType, false, defaultConfig.groupTitleOrientation),
    groupTitleFontSize: new primitives.common.ValueReader(["string"], false, defaultConfig.groupTitleFontSize),
    groupTitleFontFamily: new primitives.common.ValueReader(["string"], false, defaultConfig.groupTitleFontFamily),
    groupTitleColor: new primitives.common.ValueReader(["string"], false, defaultConfig.groupTitleColor),
    groupTitleFontWeight: new primitives.common.ValueReader(["string"], false, defaultConfig.groupTitleFontWeight),
    groupTitleFontStyle: new primitives.common.ValueReader(["string"], false, defaultConfig.groupTitleFontStyle),

    itemTitleFirstFontColor: new primitives.common.ValueReader(["string"], false, defaultConfig.itemTitleFirstFontColor),
    itemTitleSecondFontColor: new primitives.common.ValueReader(["string"], false, defaultConfig.itemTitleSecondFontColor),
    selectCheckBoxLabel: new primitives.common.ValueReader(["string"], false, defaultConfig.selectCheckBoxLabel),
    onItemRender: new primitives.common.FunctionReader(),
    onCursorRender: new primitives.common.FunctionReader(),
    onHighlightRender: new primitives.common.FunctionReader(),
    templates: new primitives.common.ArrayReader(
      new primitives.common.ObjectReader({
        name: new primitives.common.ValueReader(["string"], true),
        isActive: new primitives.common.ValueReader(["boolean"], false, defaultTemplateConfig.isActive),
        itemSize: new primitives.common.ObjectReader({
          width: new primitives.common.ValueReader(["number"], false, defaultTemplateConfig.itemSize.width),
          height: new primitives.common.ValueReader(["number"], false, defaultTemplateConfig.itemSize.height)
        }, false, defaultTemplateConfig.itemSize),
        itemBorderWidth: new primitives.common.ValueReader(["number"], false, defaultTemplateConfig.itemBorderWidth),
        itemTemplate: new primitives.common.ValueReader(["string", "object"], true),
        minimizedItemShapeType: new primitives.common.EnumerationReader(primitives.common.ShapeType, true),
        minimizedItemSize: new primitives.common.ObjectReader({
          width: new primitives.common.ValueReader(["number"], false, defaultTemplateConfig.minimizedItemSize.width),
          height: new primitives.common.ValueReader(["number"], false, defaultTemplateConfig.minimizedItemSize.height)
        }, false, defaultTemplateConfig.minimizedItemSize),
        minimizedItemCornerRadius: new primitives.common.ValueReader(["number"], true),
        minimizedItemLineWidth: new primitives.common.ValueReader(["number"], false, defaultTemplateConfig.minimizedItemLineWidth),
        minimizedItemBorderColor: new primitives.common.ValueReader(["string"], true),
        minimizedItemLineType: new primitives.common.EnumerationReader(primitives.common.LineType, false, defaultTemplateConfig.minimizedItemLineType),
        minimizedItemFillColor: new primitives.common.ValueReader(["string"], true),
        minimizedItemOpacity: new primitives.common.ValueReader(["number"], false, defaultTemplateConfig.minimizedItemOpacity),
        highlightPadding: new primitives.common.ObjectReader({
          left: new primitives.common.ValueReader(["number"], false, defaultTemplateConfig.highlightPadding.left),
          top: new primitives.common.ValueReader(["number"], false, defaultTemplateConfig.highlightPadding.top),
          right: new primitives.common.ValueReader(["number"], false, defaultTemplateConfig.highlightPadding.right),
          bottom: new primitives.common.ValueReader(["number"], false, defaultTemplateConfig.highlightPadding.bottom)
        }, false, defaultTemplateConfig.highlightPadding),
        highlightBorderWidth: new primitives.common.ValueReader(["number"], false, defaultTemplateConfig.highlightBorderWidth),
        highlightTemplate: new primitives.common.ValueReader(["string", "object"], true),
        cursorPadding: new primitives.common.ObjectReader({
          left: new primitives.common.ValueReader(["number"], false, defaultTemplateConfig.cursorPadding.left),
          top: new primitives.common.ValueReader(["number"], false, defaultTemplateConfig.cursorPadding.top),
          right: new primitives.common.ValueReader(["number"], false, defaultTemplateConfig.cursorPadding.right),
          bottom: new primitives.common.ValueReader(["number"], false, defaultTemplateConfig.cursorPadding.bottom)
        }, false, defaultTemplateConfig.cursorPadding),
        cursorBorderWidth: new primitives.common.ValueReader(["number"], false, defaultTemplateConfig.cursorBorderWidth),
        cursorTemplate: new primitives.common.ValueReader(["string", "object"], true),
        buttons: new primitives.common.ArrayReader(new primitives.common.ObjectReader({
          name: new primitives.common.ValueReader(["string"], true),
          icon: new primitives.common.ValueReader(["string"], true),
          text: new primitives.common.ValueReader(["boolean"], false, false),
          tooltip: new primitives.common.ValueReader(["string"], true),
          size: new primitives.common.ObjectReader({
            width: new primitives.common.ValueReader(["number"], false, defaultButtonConfig.size.width),
            height: new primitives.common.ValueReader(["number"], false, defaultButtonConfig.size.height)
          }, false, defaultButtonConfig.size)
        }),
          true,
          "name"
        ),
        onButtonsRender: new primitives.common.FunctionReader()
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