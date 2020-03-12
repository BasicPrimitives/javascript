primitives.orgdiagram.SplitAnnotationsOptionTask = function (optionsTask) {
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

    if (primitives.common.isArray(annotations)) {
      for (index = 0, len = annotations.length; index < len; index += 1) {
        annotationConfig = annotations[index];
        annotationType = annotationConfig.annotationType;

        switch (annotationType) {
          case primitives.common.AnnotationType.Shape:
          case primitives.common.AnnotationType.Connector:
          case primitives.common.AnnotationType.HighlightPath:
            switch (annotationConfig.zOrderType) {
              case primitives.common.ZOrderType.Background:
                zOrderType = primitives.common.ZOrderType.Background;
                break;
              case primitives.common.ZOrderType.Foreground:
              case primitives.common.ZOrderType.Auto: //ignore jslint
              default:
                zOrderType = primitives.common.ZOrderType.Foreground;
                break;
            }
            break;
          case primitives.common.AnnotationType.Background:
          case primitives.common.AnnotationType.Label: //ignore jslint
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