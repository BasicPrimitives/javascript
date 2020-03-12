primitives.orgdiagram.ConnectorsOptionTask = function (optionsTask, defaultConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new primitives.common.ObjectReader({
    arrowsDirection: new primitives.common.EnumerationReader(primitives.common.GroupByType, false, defaultConfig.arrowsDirection),
    showExtraArrows: new primitives.common.ValueReader(["boolean"], false, defaultConfig.showExtraArrows),
    extraArrowsMinimumSpace: new primitives.common.ValueReader(["number"], false, defaultConfig.extraArrowsMinimumSpace),
    connectorType: new primitives.common.EnumerationReader(primitives.common.ConnectorType, false, defaultConfig.hasOwnProperty("connectorType") ? defaultConfig.connectorType : primitives.common.ConnectorType.Squared),
    showNeigboursConnectorsHighlighted: new primitives.common.EnumerationReader(primitives.common.ConnectorType, false, defaultConfig.hasOwnProperty("showNeigboursConnectorsHighlighted") ? defaultConfig.showNeigboursConnectorsHighlighted : false),
    elbowType: new primitives.common.EnumerationReader(primitives.common.ElbowType, false, defaultConfig.elbowType),
    bevelSize: new primitives.common.ValueReader(["number"], false, defaultConfig.bevelSize),
    elbowDotSize: new primitives.common.ValueReader(["number"], false, defaultConfig.elbowDotSize),
    linesColor: new primitives.common.ValueReader(["string"], false, defaultConfig.linesColor),
    linesWidth: new primitives.common.ValueReader(["number"], false, defaultConfig.linesWidth),
    linesType: new primitives.common.EnumerationReader(primitives.common.LineType, false, defaultConfig.linesType),
    highlightLinesColor: new primitives.common.ValueReader(["string"], false, defaultConfig.highlightLinesColor),
    highlightLinesWidth: new primitives.common.ValueReader(["number"], false, defaultConfig.highlightLinesWidth),
    highlightLinesType: new primitives.common.EnumerationReader(primitives.common.LineType, false, defaultConfig.highlightLinesType)
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
    description: "Checks connector lines drawing options."
  };
};