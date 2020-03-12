primitives.orgdiagram.DrawItemLabelsTask = function (getGraphics, createTranfromTask, applyLayoutChangesTask,
  labelsOptionTask,
  alignDiagramTask) {

  function process() {
    var labelsOption = labelsOptionTask.getOptions();

    var params = {
      graphics: getGraphics(),
      transform: createTranfromTask.getTransform(),
      treeItemsPositions: alignDiagramTask.getItemsPositions()
    };

    var options = {
      showLabels: labelsOption.showLabels,
      labelFontSize: labelsOption.labelFontSize,
      labelFontFamily: labelsOption.labelFontFamily,
      labelFontStyle: labelsOption.labelFontStyle,
      labelFontWeight: labelsOption.labelFontWeight,
      labelColor: labelsOption.labelColor,
      itemsOptions: labelsOptionTask.getItemsOptions(),
      labelSize: labelsOption.labelSize,
      labelOrientation: labelsOption.labelOrientation,
      labelPlacement: labelsOption.labelPlacement,
      labelOffset: labelsOption.labelOffset
    };

    params.graphics.reset("placeholder", primitives.common.Layers.Label);

    redrawLabels(params, options);

    return false;
  }

  function redrawLabels(params, options) {
    var labels = [];
    if (options.showLabels == primitives.common.Enabled.Auto || options.showLabels == primitives.common.Enabled.True) {
      for (var treeItemId in params.treeItemsPositions) {
        if (params.treeItemsPositions.hasOwnProperty(treeItemId)) {
          var labelOptions = options.itemsOptions[treeItemId],
            treeItemPosition = params.treeItemsPositions[treeItemId],
            actualPosition = treeItemPosition.actualPosition;

          if (labelOptions != null) {
            params.transform.transformRect(actualPosition.x, actualPosition.y, actualPosition.width, actualPosition.height, true,
              this, function (x, y, width, height) {

                switch (treeItemPosition.actualVisibility) {
                  case primitives.common.Visibility.Normal:
                    if (options.showLabels == primitives.common.Enabled.Auto) {
                      // Don't allow labels overlap normal items in Auto mode
                      label = new primitives.common.Label(x, y, width, height);
                      label.weight = 10000;
                      label.labelType = primitives.common.LabelType.Dummy;
                      labels.push(label);
                    }
                    break;
                  case primitives.common.Visibility.Dot:
                  case primitives.common.Visibility.Line:
                    var label = createLabel(x, y, width, height, labelOptions, treeItemPosition, options);
                    if (label != null) {
                      labels.push(label);
                    }
                    break;
                  default:
                    break;
                }
              });//ignore jslint
          }
        }
      }
    }

    /* Auto resolve overllapings between nodes */
    if (options.showLabels == primitives.common.Enabled.Auto) {
      primitives.common.getCrossingRectangles(this, labels, function (label1, label2) {
        if (label1.isActive && label2.isActive) {
          switch (label1.labelType) {
            case primitives.common.LabelType.Dummy:
              switch (label2.labelType) {
                case primitives.common.LabelType.Dummy:
                  break;
                case primitives.common.LabelType.Regular:
                  label2.isActive = false;
                  break;
                case primitives.common.LabelType.Fixed:
                  label2.isActive = false;
                  break;
              }
              break;
            case primitives.common.LabelType.Fixed:
              switch (label2.labelType) {
                case primitives.common.LabelType.Dummy:
                  label1.isActive = false;
                  break;
                case primitives.common.LabelType.Regular:
                  label2.isActive = false;
                  break;
                case primitives.common.LabelType.Fixed:
                  break;
              }
              break;
            case primitives.common.LabelType.Regular:
              switch (label2.labelType) {
                case primitives.common.LabelType.Dummy:
                  label1.isActive = false;
                  break;
                case primitives.common.LabelType.Regular:
                  if (label1.weight <= label2.weight) {
                    label1.isActive = false;
                  } else {
                    label2.isActive = false;
                  }
                  break;
                case primitives.common.LabelType.Fixed:
                  label1.isActive = false;
                  break;
              }
              break;
          }
        }
      });
    }

    /* Draw labels */
    params.graphics.activate("placeholder", primitives.common.Layers.Label);
    var attr = {
      "fontSize": options.labelFontSize,
      "fontFamily": options.labelFontFamily,
      "fontStyle": options.labelFontStyle,
      "fontWeight": options.labelFontWeight,
      "fontColor": options.labelColor
    };

    for (var index = 0, len = labels.length; index < len; index += 1) {
      var label = labels[index];
      if (label.isActive) {
        switch (label.labelType) {
          case primitives.common.LabelType.Regular:
          case primitives.common.LabelType.Fixed:
            params.graphics.text(label.x, label.y, label.width, label.height, label.text,
              label.labelOrientation,
              label.horizontalAlignmentType,
              label.verticalAlignmentType,
              attr);
            break;
        }
      }
    }
  }

  function createLabel(x, y, width, height, labelOptions, treeItemPosition, options) {
    var result = null,
      labelWidth,
      labelHeight,
      labelSize,
      labelPlacement,
      weight;


    if (!primitives.common.isNullOrEmpty(labelOptions.label)) {
      var labelType = getLabelType(treeItemPosition.actualVisibility, labelOptions.showLabel, options.showLabels);

      switch (labelType) {
        case primitives.common.LabelType.Regular:
          weight = treeItemPosition.leftPadding + treeItemPosition.rightPadding;
          break;
        case primitives.common.LabelType.Fixed:
          weight = 10000;
          break;
        case primitives.common.LabelType.None:
          weight = 0;
          break;
      }

      if (labelType != primitives.common.LabelType.None) {
        labelSize = (labelOptions.labelSize != null) ? labelOptions.labelSize : options.labelSize;

        var labelOrientation = (labelOptions.labelOrientation != primitives.text.TextOrientationType.Auto) ? labelOptions.labelOrientation :
          (options.labelOrientation != primitives.text.TextOrientationType.Auto) ? options.labelOrientation :
            primitives.text.TextOrientationType.Horizontal;

        labelPlacement = (labelOptions.labelPlacement != primitives.common.PlacementType.Auto) ? labelOptions.labelPlacement :
          (options.labelPlacement != primitives.common.PlacementType.Auto) ? options.labelPlacement :
            primitives.common.PlacementType.Top;

        switch (labelOrientation) {
          case primitives.text.TextOrientationType.Horizontal:
            labelWidth = labelSize.width;
            labelHeight = labelSize.height;
            break;
          case primitives.text.TextOrientationType.RotateLeft:
          case primitives.text.TextOrientationType.RotateRight:
            labelHeight = labelSize.width;
            labelWidth = labelSize.height;
            break;
        }

        var position = getLabelPosition(labelPlacement, labelOrientation, x, y, width, height, labelWidth, labelHeight, options.labelOffset);

        result = new primitives.common.Label(position.position);
        result.labelType = labelType;
        result.weight = weight;
        result.text = labelOptions.label;


        result.labelOrientation = labelOrientation;
        result.horizontalAlignmentType = position.horizontalAlignmentType;
        result.verticalAlignmentType = position.verticalAlignmentType;
      }
    }
    return result;
  }

  function getLabelType(actualVisibility, showLabel, showLabels) {
    var result = primitives.common.LabelType.None;
    switch (showLabel) {
      case primitives.common.Enabled.Auto:
        switch (showLabels) {
          case primitives.common.Enabled.Auto:
            switch (actualVisibility) {
              case primitives.common.Visibility.Line:
              case primitives.common.Visibility.Dot:
                result = primitives.common.LabelType.Regular;
                break;
              default:
                break;
            }
            break;
          case primitives.common.Enabled.False:
            break;
          case primitives.common.Enabled.True:
            result = primitives.common.LabelType.Fixed;
            break;
        }
        break;
      case primitives.common.Enabled.False:
        break;
      case primitives.common.Enabled.True:
        result = primitives.common.LabelType.Fixed;
        break;
    }
    return result;
  }

  function getLabelPosition(labelPlacement, labelOrientation, x, y, width, height, labelWidth, labelHeight, labelOffset) {
    var position,
      horizontalAlignmentType,
      verticalAlignmentType;

    switch (labelPlacement) {
      case primitives.common.PlacementType.Auto:
      case primitives.common.PlacementType.Top:
        position = new primitives.common.Rect(x + width / 2.0 - labelWidth / 2.0, y - labelOffset - labelHeight, labelWidth, labelHeight);
        switch (labelOrientation) {
          case primitives.text.TextOrientationType.Horizontal:
            horizontalAlignmentType = primitives.common.HorizontalAlignmentType.Center;
            verticalAlignmentType = primitives.common.VerticalAlignmentType.Bottom;
            break;
          case primitives.text.TextOrientationType.RotateLeft:
            horizontalAlignmentType = primitives.common.HorizontalAlignmentType.Left;
            verticalAlignmentType = primitives.common.VerticalAlignmentType.Middle;
            break;
          case primitives.text.TextOrientationType.RotateRight:
            horizontalAlignmentType = primitives.common.HorizontalAlignmentType.Right;
            verticalAlignmentType = primitives.common.VerticalAlignmentType.Middle;
            break;
        }
        break;
      case primitives.common.PlacementType.TopRight:
      case primitives.common.PlacementType.RightTop:
        position = new primitives.common.Rect(x + width + labelOffset, y - labelOffset - labelHeight, labelWidth, labelHeight);
        switch (labelOrientation) {
          case primitives.text.TextOrientationType.Horizontal:
            horizontalAlignmentType = primitives.common.HorizontalAlignmentType.Left;
            verticalAlignmentType = primitives.common.VerticalAlignmentType.Bottom;
            break;
          case primitives.text.TextOrientationType.RotateLeft:
            horizontalAlignmentType = primitives.common.HorizontalAlignmentType.Left;
            verticalAlignmentType = primitives.common.VerticalAlignmentType.Top;
            break;
          case primitives.text.TextOrientationType.RotateRight:
            horizontalAlignmentType = primitives.common.HorizontalAlignmentType.Right;
            verticalAlignmentType = primitives.common.VerticalAlignmentType.Bottom;
            break;
        }
        break;
      case primitives.common.PlacementType.Right:
        position = new primitives.common.Rect(x + width + labelOffset, y + height / 2.0 - labelHeight / 2.0, labelWidth, labelHeight);
        switch (labelOrientation) {
          case primitives.text.TextOrientationType.Horizontal:
            horizontalAlignmentType = primitives.common.HorizontalAlignmentType.Left;
            verticalAlignmentType = primitives.common.VerticalAlignmentType.Middle;
            break;
          case primitives.text.TextOrientationType.RotateLeft:
            horizontalAlignmentType = primitives.common.HorizontalAlignmentType.Center;
            verticalAlignmentType = primitives.common.VerticalAlignmentType.Top;
            break;
          case primitives.text.TextOrientationType.RotateRight:
            horizontalAlignmentType = primitives.common.HorizontalAlignmentType.Center;
            verticalAlignmentType = primitives.common.VerticalAlignmentType.Bottom;
            break;
        }
        break;
      case primitives.common.PlacementType.BottomRight:
      case primitives.common.PlacementType.RightBottom:
        position = new primitives.common.Rect(x + width + labelOffset, y + height + labelOffset, labelWidth, labelHeight);
        switch (labelOrientation) {
          case primitives.text.TextOrientationType.Horizontal:
            horizontalAlignmentType = primitives.common.HorizontalAlignmentType.Left;
            verticalAlignmentType = primitives.common.VerticalAlignmentType.Top;
            break;
          case primitives.text.TextOrientationType.RotateLeft:
            horizontalAlignmentType = primitives.common.HorizontalAlignmentType.Right;
            verticalAlignmentType = primitives.common.VerticalAlignmentType.Top;
            break;
          case primitives.text.TextOrientationType.RotateRight:
            horizontalAlignmentType = primitives.common.HorizontalAlignmentType.Left;
            verticalAlignmentType = primitives.common.VerticalAlignmentType.Bottom;
            break;
        }
        break;
      case primitives.common.PlacementType.Bottom:
        position = new primitives.common.Rect(x + width / 2.0 - labelWidth / 2.0, y + height + labelOffset, labelWidth, labelHeight);
        switch (labelOrientation) {
          case primitives.text.TextOrientationType.Horizontal:
            horizontalAlignmentType = primitives.common.HorizontalAlignmentType.Center;
            verticalAlignmentType = primitives.common.VerticalAlignmentType.Top;
            break;
          case primitives.text.TextOrientationType.RotateLeft:
            horizontalAlignmentType = primitives.common.HorizontalAlignmentType.Right;
            verticalAlignmentType = primitives.common.VerticalAlignmentType.Middle;
            break;
          case primitives.text.TextOrientationType.RotateRight:
            horizontalAlignmentType = primitives.common.HorizontalAlignmentType.Left;
            verticalAlignmentType = primitives.common.VerticalAlignmentType.Middle;
            break;
        }
        break;
      case primitives.common.PlacementType.BottomLeft:
      case primitives.common.PlacementType.LeftBottom:
        position = new primitives.common.Rect(x - labelWidth - labelOffset, y + height + labelOffset, labelWidth, labelHeight);
        switch (labelOrientation) {
          case primitives.text.TextOrientationType.Horizontal:
            horizontalAlignmentType = primitives.common.HorizontalAlignmentType.Right;
            verticalAlignmentType = primitives.common.VerticalAlignmentType.Top;
            break;
          case primitives.text.TextOrientationType.RotateLeft:
            horizontalAlignmentType = primitives.common.HorizontalAlignmentType.Right;
            verticalAlignmentType = primitives.common.VerticalAlignmentType.Bottom;
            break;
          case primitives.text.TextOrientationType.RotateRight:
            horizontalAlignmentType = primitives.common.HorizontalAlignmentType.Left;
            verticalAlignmentType = primitives.common.VerticalAlignmentType.Top;
            break;
        }
        break;
      case primitives.common.PlacementType.Left:
        position = new primitives.common.Rect(x - labelWidth - labelOffset, y + height / 2.0 - labelHeight / 2.0, labelWidth, labelHeight);
        switch (labelOrientation) {
          case primitives.text.TextOrientationType.Horizontal:
            horizontalAlignmentType = primitives.common.HorizontalAlignmentType.Right;
            verticalAlignmentType = primitives.common.VerticalAlignmentType.Middle;
            break;
          case primitives.text.TextOrientationType.RotateLeft:
            horizontalAlignmentType = primitives.common.HorizontalAlignmentType.Center;
            verticalAlignmentType = primitives.common.VerticalAlignmentType.Bottom;
            break;
          case primitives.text.TextOrientationType.RotateRight:
            horizontalAlignmentType = primitives.common.HorizontalAlignmentType.Center;
            verticalAlignmentType = primitives.common.VerticalAlignmentType.Top;
            break;
        }
        break;
      case primitives.common.PlacementType.TopLeft:
      case primitives.common.PlacementType.LeftTop:
        position = new primitives.common.Rect(x - labelWidth - labelOffset, y - labelOffset - labelHeight, labelWidth, labelHeight);
        switch (labelOrientation) {
          case primitives.text.TextOrientationType.Horizontal:
            horizontalAlignmentType = primitives.common.HorizontalAlignmentType.Right;
            verticalAlignmentType = primitives.common.VerticalAlignmentType.Bottom;
            break;
          case primitives.text.TextOrientationType.RotateLeft:
            horizontalAlignmentType = primitives.common.HorizontalAlignmentType.Left;
            verticalAlignmentType = primitives.common.VerticalAlignmentType.Bottom;
            break;
          case primitives.text.TextOrientationType.RotateRight:
            horizontalAlignmentType = primitives.common.HorizontalAlignmentType.Right;
            verticalAlignmentType = primitives.common.VerticalAlignmentType.Top;
            break;
        }
        break;
    }

    return {
      position: position,
      horizontalAlignmentType: horizontalAlignmentType,
      verticalAlignmentType: verticalAlignmentType
    };
  }

  return {
    process: process
  };
};