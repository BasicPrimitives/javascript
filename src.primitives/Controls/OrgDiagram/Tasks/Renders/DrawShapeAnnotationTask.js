primitives.orgdiagram.DrawShapeAnnotationTask = function (getGraphics, createTransformTask, applyLayoutChangesTask,
  orientationOptionTask, shapeAnnotationOptionTask, alignDiagramTask, annotationLabelTemplateTask, zOrderType) {
  var _graphics,
    _transform,
    _orientationOptions,
    _annotationLabelTemplate;

  function process() {

    _graphics = getGraphics();

    _transform = createTransformTask.getTransform();
    _orientationOptions = orientationOptionTask.getOptions();

    _annotationLabelTemplate = annotationLabelTemplateTask.getTemplate();

    switch (zOrderType) {
      case primitives.common.ZOrderType.Background://ignore jslint
        _graphics.reset("placeholder", primitives.common.Layers.BackgroundAnnotations);
        break;
      case primitives.common.ZOrderType.Foreground://ignore jslint
        _graphics.reset("placeholder", primitives.common.Layers.ForegroundAnnotations);
        break;
    }

    _drawAnnotations(shapeAnnotationOptionTask.getAnnotations(), alignDiagramTask.getItemPosition);

    return false;
  }

  function _drawAnnotations(annotations, getItemPosition) {
    var panel,
      layer = primitives.common.Layers.ForegroundAnnotations,
      index, len,
      index2, len2,
      index3, len3,
      fromItem,
      toItem,
      shape,
      defaultConfig,
      items, itemsHash, itemPosition, position,
      properties, property,
      annotationConfig,
      uiHash,
      backgroundManager,
      perimeters, treeItem;


    switch (zOrderType) {
      case primitives.common.ZOrderType.Background://ignore jslint
        panel = _graphics.activate("placeholder", primitives.common.Layers.BackgroundAnnotations);
        break;
      case primitives.common.ZOrderType.Foreground://ignore jslint
        panel = _graphics.activate("placeholder", primitives.common.Layers.ForegroundAnnotations);
        break;
    }

    for (index = 0, len = annotations.length; index < len; index += 1) {
      annotationConfig = annotations[index];

      if (annotationConfig.items != null && annotationConfig.items.length > 0) {
        position = new primitives.common.Rect();
        for (index2 = 0, len2 = annotationConfig.items.length; index2 < len2; index2 += 1) {
          itemPosition = getItemPosition(annotationConfig.items[index2]);
          if (itemPosition != null) {
            position.addRect(itemPosition.actualPosition);
          }
        }

        if (!position.isEmpty()) {
          shape = new primitives.common.Shape(_graphics);
          defaultConfig = new primitives.orgdiagram.ShapeAnnotationConfig();
          properties = ["opacity", "cornerRadius", "shapeType", "offset", "lineWidth", "borderColor", "fillColor", "lineType", "labelSize", "labelOffset", "labelPlacement", "zOrderType"];
          for (index3 = 0, len3 = properties.length; index3 < len3; index3 += 1) {
            property = properties[index3];
            shape[property] = annotationConfig.hasOwnProperty(property) ? annotationConfig[property] : defaultConfig[property];
          }

          shape.position = position;
          shape.orientationType = _orientationOptions.orientationType;
          shape.panelSize = panel.size;
          shape.labelTemplate = _annotationLabelTemplate;
          shape.hasLabel = annotationConfig.templateName != null || annotationConfig.label != null;

          uiHash = new primitives.common.RenderEventArgs();
          uiHash.context = annotationConfig;
          uiHash.templateName = shape.labelTemplate;

          _transform.transformRect(position.x, position.y, position.width, position.height, true,
            this, function (x, y, width, height) {
              var position = new primitives.common.Rect(x, y, width, height);
              shape.draw(position, uiHash);
            });//ignore jslint
        }
      }
    }
  }

  return {
    process: process
  };
};