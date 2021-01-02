import ObjectReader from '../../readers/ObjectReader';
import ValueReader from '../../readers/ValueReader';
import Thickness from '../../graphics/structs/Thickness';
import { AdviserPlacementType, OrientationType } from '../../enums';

export default function LevelTitleSizeTask(levelTitlePlacementOptionTask, levelAnnotationOptionTask, orientationOptionTask, scaleOptionTask) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new ObjectReader({
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

    _data = _dataTemplate.read(_data, getThickness(), "options", context);

    return context.isChanged;
  }

  function getThickness() {
    var { levelTitlePlaceInside, levelTitlePanelSize, levelTitlePlacementType } = levelTitlePlacementOptionTask.getOptions(),
      { scale } = scaleOptionTask.getOptions(),
      { orientationType } = orientationOptionTask.getOptions(),
      annotations = levelAnnotationOptionTask.getAnnotations(),
      thickness = new Thickness(0, 0, 0, 0);

    if(annotations.length > 0) {
      if(levelTitlePlaceInside) {
        levelTitlePanelSize = -levelTitlePanelSize;
      }
      switch(levelTitlePlacementType) {
        case AdviserPlacementType.Right:
          switch(orientationType) {
            case OrientationType.Left:
              thickness = new Thickness(0, levelTitlePanelSize, 0, 0);
              break;
            case OrientationType.Right:
              thickness = new Thickness(0, 0, 0, levelTitlePanelSize);
              break;
            case OrientationType.Top:
            case OrientationType.Bottom:
              thickness = new Thickness(0, 0, levelTitlePanelSize, 0);
            default:
              break;
          }            
          break;
        case AdviserPlacementType.Left:
        default:
          switch(orientationType) {
            case OrientationType.Left:
              thickness = new Thickness(0, 0, 0, levelTitlePanelSize);
              break;
            case OrientationType.Right:
              thickness = new Thickness(0, levelTitlePanelSize, 0, 0);
              break;
            case OrientationType.Top:
            case OrientationType.Bottom:
              thickness = new Thickness(levelTitlePanelSize, 0, 0, 0);
            default:
              break;
          }
          break;
      }
      thickness.scale(scale);
    }

    return { thickness: thickness };
  }

  function getOptions() {
    return _data;
  }

  return {
    process: process,
    getOptions: getOptions
  };
};