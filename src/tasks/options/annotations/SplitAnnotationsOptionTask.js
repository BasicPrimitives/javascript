import { ZOrderType, AnnotationType } from '../../../enums';

export default function SplitAnnotationsOptionTask(optionsTask) {
  var _data = {
    annotations: {}
  };

  function process() {
    var options = optionsTask.getOptions(),
      annotations = options.annotations,
      index, len,
      annotationConfig,
      annotationType,
      zOrderType,
      key,
      hash = {};

    if (Array.isArray(annotations)) {
      for (index = 0, len = annotations.length; index < len; index += 1) {
        annotationConfig = annotations[index];
        annotationType = annotationConfig.annotationType;

        switch (annotationType) {
          case AnnotationType.Shape:
          case AnnotationType.Connector:
          case AnnotationType.HighlightPath:
            switch (annotationConfig.zOrderType) {
              case ZOrderType.Background:
                zOrderType = ZOrderType.Background;
                break;
              case ZOrderType.Foreground:
              case ZOrderType.Auto: //ignore jslint
              default:
                zOrderType = ZOrderType.Foreground;
                break;
            }
            break;
          case AnnotationType.Background:
          case AnnotationType.Label: //ignore jslint
          default:
            zOrderType = null;
            break;
        }

        if (annotationType != null) {
          key = annotationType * 1000 + (zOrderType || 0);

          if (!hash.hasOwnProperty(key)) {
            hash[key] = [];
          }
          hash[key].push(annotationConfig);
        }
      }
    }

    _data.annotations = hash;

    return true;
  }

  function getAnnotations(annotationType, zOrderType) {
    var key = annotationType * 1000 + (zOrderType || 0);
    return _data.annotations[key];
  }

  return {
    process: process,
    getAnnotations: getAnnotations
  };
};