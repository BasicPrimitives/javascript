import ValueReader from '../../readers/ValueReader';
import ObjectReader from '../../readers/ObjectReader';
import EnumerationReader from '../../readers/EnumerationReader';
import { ConnectorType, GroupByType, ElbowType, LineType } from '../../enums';

export default function ConnectorsOptionTask(optionsTask, defaultConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new ObjectReader({
    arrowsDirection: new EnumerationReader(GroupByType, false, defaultConfig.arrowsDirection),
    showExtraArrows: new ValueReader(["boolean"], false, defaultConfig.showExtraArrows),
    extraArrowsMinimumSpace: new ValueReader(["number"], false, defaultConfig.extraArrowsMinimumSpace),
    connectorType: new EnumerationReader(ConnectorType, false, defaultConfig.hasOwnProperty("connectorType") ? defaultConfig.connectorType : ConnectorType.Squared),
    showNeigboursConnectorsHighlighted: new EnumerationReader(ConnectorType, false, defaultConfig.hasOwnProperty("showNeigboursConnectorsHighlighted") ? defaultConfig.showNeigboursConnectorsHighlighted : false),
    elbowType: new EnumerationReader(ElbowType, false, defaultConfig.elbowType),
    bevelSize: new ValueReader(["number"], false, defaultConfig.bevelSize),
    elbowDotSize: new ValueReader(["number"], false, defaultConfig.elbowDotSize),
    linesColor: new ValueReader(["string"], false, defaultConfig.linesColor),
    linesWidth: new ValueReader(["number"], false, defaultConfig.linesWidth),
    linesType: new EnumerationReader(LineType, false, defaultConfig.linesType),
    highlightLinesColor: new ValueReader(["string"], false, defaultConfig.highlightLinesColor),
    highlightLinesWidth: new ValueReader(["number"], false, defaultConfig.highlightLinesWidth),
    highlightLinesType: new EnumerationReader(LineType, false, defaultConfig.highlightLinesType)
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