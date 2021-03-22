import Rect from '../../graphics/structs/Rect';
import { Layers, Enabled, LabelType, TextOrientationType, PlacementType, Visibility, HorizontalAlignmentType, VerticalAlignmentType } from '../../enums';
import Label from '../../graphics/structs/Label';
import { isNullOrEmpty } from '../../common';
import getCrossingRectangles from '../../algorithms/getCrossingRectangles';

export default function DrawItemLabelsTask(getGraphics, createTransformTask, applyLayoutChangesTask,
  labelsOptionTask,
  alignDiagramTask) {

  function process() {
    var labelsOption = labelsOptionTask.getOptions();

    var params = {
      graphics: getGraphics(),
      transform: createTransformTask.getTransform(),
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

    params.graphics.reset("placeholder", Layers.Label);

    redrawLabels(params, options);

    return false;
  }

  function redrawLabels(params, options) {
    var labels = [];
    if (options.showLabels == Enabled.Auto || options.showLabels == Enabled.True) {
      for (var treeItemId in params.treeItemsPositions) {
        if (params.treeItemsPositions.hasOwnProperty(treeItemId)) {
          var labelOptions = options.itemsOptions[treeItemId],
            treeItemPosition = params.treeItemsPositions[treeItemId],
            actualPosition = treeItemPosition.actualPosition;

          if (labelOptions != null) {
            params.transform.transformRect(actualPosition.x, actualPosition.y, actualPosition.width, actualPosition.height, true,
              this, function (x, y, width, height) {

                switch (treeItemPosition.actualVisibility) {
                  case Visibility.Normal:
                    if (options.showLabels == Enabled.Auto) {
                      // Don't allow labels overlap normal items in Auto mode
                      label = new Label(x, y, width, height);
                      label.weight = 10000;
                      label.labelType = LabelType.Dummy;
                      labels.push(label);
                    }
                    break;
                  case Visibility.Dot:
                  case Visibility.Line:
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
    if (options.showLabels == Enabled.Auto) {
      getCrossingRectangles(this, labels, function (label1, label2) {
        if (label1.isActive && label2.isActive) {
          switch (label1.labelType) {
            case LabelType.Dummy:
              switch (label2.labelType) {
                case LabelType.Dummy:
                  break;
                case LabelType.Regular:
                  label2.isActive = false;
                  break;
                case LabelType.Fixed:
                  label2.isActive = false;
                  break;
              }
              break;
            case LabelType.Fixed:
              switch (label2.labelType) {
                case LabelType.Dummy:
                  label1.isActive = false;
                  break;
                case LabelType.Regular:
                  label2.isActive = false;
                  break;
                case LabelType.Fixed:
                  break;
              }
              break;
            case LabelType.Regular:
              switch (label2.labelType) {
                case LabelType.Dummy:
                  label1.isActive = false;
                  break;
                case LabelType.Regular:
                  if (label1.weight <= label2.weight) {
                    label1.isActive = false;
                  } else {
                    label2.isActive = false;
                  }
                  break;
                case LabelType.Fixed:
                  label1.isActive = false;
                  break;
              }
              break;
          }
        }
      });
    }

    /* Draw labels */
    params.graphics.activate("placeholder", Layers.Label);
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
          case LabelType.Regular:
          case LabelType.Fixed:
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


    if (!isNullOrEmpty(labelOptions.label)) {
      var labelType = getLabelType(treeItemPosition.actualVisibility, labelOptions.showLabel, options.showLabels);

      switch (labelType) {
        case LabelType.Regular:
          weight = treeItemPosition.actualSize.width + treeItemPosition.actualSize.height;
          break;
        case LabelType.Fixed:
          weight = 10000;
          break;
        case LabelType.None:
          weight = 0;
          break;
      }

      if (labelType != LabelType.None) {
        labelSize = (labelOptions.labelSize != null) ? labelOptions.labelSize : options.labelSize;

        var labelOrientation = (labelOptions.labelOrientation != TextOrientationType.Auto) ? labelOptions.labelOrientation :
          (options.labelOrientation != TextOrientationType.Auto) ? options.labelOrientation :
            TextOrientationType.Horizontal;

        labelPlacement = (labelOptions.labelPlacement != PlacementType.Auto) ? labelOptions.labelPlacement :
          (options.labelPlacement != PlacementType.Auto) ? options.labelPlacement :
            PlacementType.Top;

        switch (labelOrientation) {
          case TextOrientationType.Horizontal:
            labelWidth = labelSize.width;
            labelHeight = labelSize.height;
            break;
          case TextOrientationType.RotateLeft:
          case TextOrientationType.RotateRight:
            labelHeight = labelSize.width;
            labelWidth = labelSize.height;
            break;
        }

        var position = getLabelPosition(labelPlacement, labelOrientation, x, y, width, height, labelWidth, labelHeight, options.labelOffset);

        result = new Label(position.position);
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
    var result = LabelType.None;
    switch (showLabel) {
      case Enabled.Auto:
        switch (showLabels) {
          case Enabled.Auto:
            switch (actualVisibility) {
              case Visibility.Line:
              case Visibility.Dot:
                result = LabelType.Regular;
                break;
              default:
                break;
            }
            break;
          case Enabled.False:
            break;
          case Enabled.True:
            result = LabelType.Fixed;
            break;
        }
        break;
      case Enabled.False:
        break;
      case Enabled.True:
        result = LabelType.Fixed;
        break;
    }
    return result;
  }

  function getLabelPosition(labelPlacement, labelOrientation, x, y, width, height, labelWidth, labelHeight, labelOffset) {
    var position,
      horizontalAlignmentType,
      verticalAlignmentType;

    switch (labelPlacement) {
      case PlacementType.Auto:
      case PlacementType.Top:
        position = new Rect(x + width / 2.0 - labelWidth / 2.0, y - labelOffset - labelHeight, labelWidth, labelHeight);
        switch (labelOrientation) {
          case TextOrientationType.Horizontal:
            horizontalAlignmentType = HorizontalAlignmentType.Center;
            verticalAlignmentType = VerticalAlignmentType.Bottom;
            break;
          case TextOrientationType.RotateLeft:
            horizontalAlignmentType = HorizontalAlignmentType.Left;
            verticalAlignmentType = VerticalAlignmentType.Middle;
            break;
          case TextOrientationType.RotateRight:
            horizontalAlignmentType = HorizontalAlignmentType.Right;
            verticalAlignmentType = VerticalAlignmentType.Middle;
            break;
        }
        break;
      case PlacementType.TopRight:
      case PlacementType.RightTop:
        position = new Rect(x + width + labelOffset, y - labelOffset - labelHeight, labelWidth, labelHeight);
        switch (labelOrientation) {
          case TextOrientationType.Horizontal:
            horizontalAlignmentType = HorizontalAlignmentType.Left;
            verticalAlignmentType = VerticalAlignmentType.Bottom;
            break;
          case TextOrientationType.RotateLeft:
            horizontalAlignmentType = HorizontalAlignmentType.Left;
            verticalAlignmentType = VerticalAlignmentType.Top;
            break;
          case TextOrientationType.RotateRight:
            horizontalAlignmentType = HorizontalAlignmentType.Right;
            verticalAlignmentType = VerticalAlignmentType.Bottom;
            break;
        }
        break;
      case PlacementType.Right:
        position = new Rect(x + width + labelOffset, y + height / 2.0 - labelHeight / 2.0, labelWidth, labelHeight);
        switch (labelOrientation) {
          case TextOrientationType.Horizontal:
            horizontalAlignmentType = HorizontalAlignmentType.Left;
            verticalAlignmentType = VerticalAlignmentType.Middle;
            break;
          case TextOrientationType.RotateLeft:
            horizontalAlignmentType = HorizontalAlignmentType.Center;
            verticalAlignmentType = VerticalAlignmentType.Top;
            break;
          case TextOrientationType.RotateRight:
            horizontalAlignmentType = HorizontalAlignmentType.Center;
            verticalAlignmentType = VerticalAlignmentType.Bottom;
            break;
        }
        break;
      case PlacementType.BottomRight:
      case PlacementType.RightBottom:
        position = new Rect(x + width + labelOffset, y + height + labelOffset, labelWidth, labelHeight);
        switch (labelOrientation) {
          case TextOrientationType.Horizontal:
            horizontalAlignmentType = HorizontalAlignmentType.Left;
            verticalAlignmentType = VerticalAlignmentType.Top;
            break;
          case TextOrientationType.RotateLeft:
            horizontalAlignmentType = HorizontalAlignmentType.Right;
            verticalAlignmentType = VerticalAlignmentType.Top;
            break;
          case TextOrientationType.RotateRight:
            horizontalAlignmentType = HorizontalAlignmentType.Left;
            verticalAlignmentType = VerticalAlignmentType.Bottom;
            break;
        }
        break;
      case PlacementType.Bottom:
        position = new Rect(x + width / 2.0 - labelWidth / 2.0, y + height + labelOffset, labelWidth, labelHeight);
        switch (labelOrientation) {
          case TextOrientationType.Horizontal:
            horizontalAlignmentType = HorizontalAlignmentType.Center;
            verticalAlignmentType = VerticalAlignmentType.Top;
            break;
          case TextOrientationType.RotateLeft:
            horizontalAlignmentType = HorizontalAlignmentType.Right;
            verticalAlignmentType = VerticalAlignmentType.Middle;
            break;
          case TextOrientationType.RotateRight:
            horizontalAlignmentType = HorizontalAlignmentType.Left;
            verticalAlignmentType = VerticalAlignmentType.Middle;
            break;
        }
        break;
      case PlacementType.BottomLeft:
      case PlacementType.LeftBottom:
        position = new Rect(x - labelWidth - labelOffset, y + height + labelOffset, labelWidth, labelHeight);
        switch (labelOrientation) {
          case TextOrientationType.Horizontal:
            horizontalAlignmentType = HorizontalAlignmentType.Right;
            verticalAlignmentType = VerticalAlignmentType.Top;
            break;
          case TextOrientationType.RotateLeft:
            horizontalAlignmentType = HorizontalAlignmentType.Right;
            verticalAlignmentType = VerticalAlignmentType.Bottom;
            break;
          case TextOrientationType.RotateRight:
            horizontalAlignmentType = HorizontalAlignmentType.Left;
            verticalAlignmentType = VerticalAlignmentType.Top;
            break;
        }
        break;
      case PlacementType.Left:
        position = new Rect(x - labelWidth - labelOffset, y + height / 2.0 - labelHeight / 2.0, labelWidth, labelHeight);
        switch (labelOrientation) {
          case TextOrientationType.Horizontal:
            horizontalAlignmentType = HorizontalAlignmentType.Right;
            verticalAlignmentType = VerticalAlignmentType.Middle;
            break;
          case TextOrientationType.RotateLeft:
            horizontalAlignmentType = HorizontalAlignmentType.Center;
            verticalAlignmentType = VerticalAlignmentType.Bottom;
            break;
          case TextOrientationType.RotateRight:
            horizontalAlignmentType = HorizontalAlignmentType.Center;
            verticalAlignmentType = VerticalAlignmentType.Top;
            break;
        }
        break;
      case PlacementType.TopLeft:
      case PlacementType.LeftTop:
        position = new Rect(x - labelWidth - labelOffset, y - labelOffset - labelHeight, labelWidth, labelHeight);
        switch (labelOrientation) {
          case TextOrientationType.Horizontal:
            horizontalAlignmentType = HorizontalAlignmentType.Right;
            verticalAlignmentType = VerticalAlignmentType.Bottom;
            break;
          case TextOrientationType.RotateLeft:
            horizontalAlignmentType = HorizontalAlignmentType.Left;
            verticalAlignmentType = VerticalAlignmentType.Bottom;
            break;
          case TextOrientationType.RotateRight:
            horizontalAlignmentType = HorizontalAlignmentType.Right;
            verticalAlignmentType = VerticalAlignmentType.Top;
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