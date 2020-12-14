import Polyline from './Polyline';

export default function PolylinesBuffer() {
  var polylines = {};

  function _getPolyline(polylines, paletteItem) {
    if (!polylines[paletteItem.toString()]) {
      polylines[paletteItem.toString()] = new Polyline(paletteItem);
    }
    return polylines[paletteItem.toString()];
  }

  function getPolyline(paletteItem) {
    return _getPolyline(polylines, paletteItem);
  }

  function loop(thisArg, onItem) {
    var key,
      polyline;
    if (onItem != null) {
      for (key in polylines) {
        if (polylines.hasOwnProperty(key)) {
          polyline = polylines[key];
          if (polyline) {
            polyline.optimizeMoveSegments();

            if (onItem.call(thisArg, polyline)) {
              break;
            }
          }
        }
      }
    }
  }

  function addInverted(callbackFun, copyOnly) {
    var backupPolylines, backupPolyline;

    /* backup polylines */
    backupPolylines = polylines;
    polylines = {};

    if (callbackFun != null) {
      callbackFun(this);
    }

    /* add inverted polylines to backup collection */
    loop(this, function (polyline) {
      backupPolyline = _getPolyline(backupPolylines, polyline.paletteItem);

      if (!copyOnly) {
        backupPolyline.addInverted(polyline);
      } else {
        polyline.mergeTo(backupPolyline);
      }
    });

    /* restore polylines */
    polylines = backupPolylines;
  }

  function transform(transformArg, forward) {
    loop(this, function (polyline) {
      polyline.transform(transformArg, forward);
    });
  }

  return {
    getPolyline: getPolyline,
    loop: loop,
    addInverted: addInverted,
    transform: transform
  };
};