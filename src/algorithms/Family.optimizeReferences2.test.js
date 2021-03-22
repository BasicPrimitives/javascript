import Family from './Family';

function getOptimizedFamily(sourceItems) {
    var maximum = 100;
    var family = Family();
  
    var children = {};
  
    for (var parent in sourceItems) {
      var items = sourceItems[parent];
      for (var index = 0; index < items.length; index += 1) {
        if (!children.hasOwnProperty(items[index])) {
          children[items[index]] = [];
        }
        children[items[index]].push(parent);
      }
    }
  
    for (var child in children) {
      family.add(children[child], child, {});
    }
  
    for (var parent in sourceItems) {
      if (children[parent] == null)
        family.add(null, parent, {});
    }
  
    family.optimizeReferences(function () {
      maximum += 1;
      return { id: maximum, isBundle: true };
    });
  
    return family;
}
  
function getFamily(family) {
    var levels = [];
    family.loop(this, function (itemid, item) {
        var newItem = { id: itemid };
        var children = [];
        family.loopChildren(this, itemid, function (itemid, item, levelIndex) {
        if (levelIndex > 0) {
            return family.BREAK;
        }
        children.push(itemid);
        });
        if (children.length > 0) {
        newItem.children = children;
        }
        levels.push(newItem);
    });
    return levels;
}

  
test('optimizeReferences - Test for loops created by references optimizer.', () => {
    var sourceItems = {
        "OptionsTask":[
           "CalloutOptionTask",
           "ConnectorsOptionTask",
           "ItemsOptionTask",
           "RemoveLoopsOptionTask",
           "SpousesOptionTask",
           "ItemsSizesOptionTask",
           "TemplatesOptionTask",
           "OrientationOptionTask",
           "VisualTreeOptionTask",
           "HideGrandParentsConnectorsOptionTask",
           "NormalizeOptionTask",
           "OrderFamilyNodesOptionTask",
           "LinePaletteOptionTask",
           "CursorItemOptionTask",
           "HighlightItemOptionTask",
           "SelectedItemsOptionTask",
           "SplitAnnotationsOptionTask",
           "ScaleOptionTask",
           "FrameOptionTask",
           "LevelTitlePlacementOptionTask",
           "LevelTitleTemplateOptionTask",
           "CombinedNormalVisibilityItemsTask",
           "CurrentControlSizeTask"
        ],
        "CalloutOptionTask":[],
        "ItemsOptionTask":[
           "LogicalFamilyTask",
           "AnnotationLabelTemplateTask",
           "SelectedItemsTask",
           "CombinedContextsTask"
        ],
        "RemoveLoopsOptionTask":[
           "RemoveLoopsTask"
        ],
        "SplitAnnotationsOptionTask":[
           "ForegroundShapeAnnotationOptionTask",
           "BackgroundShapeAnnotationOptionTask",
           "ForegroundHighlightPathAnnotationOptionTask",
           "BackgroundHighlightPathAnnotationOptionTask",
           "ForegroundConnectorAnnotationOptionTask",
           "BackgroundConnectorAnnotationOptionTask",
           "BackgroundAnnotationOptionTask",
           "LevelAnnotationOptionTask",
           "LabelAnnotationOptionTask"
        ],
        "SpousesOptionTask":[
           "AddSpousesTask"
        ],
        "TemplatesOptionTask":[
           "ReadTemplatesTask",
           "GroupTitleTemplateTask"
        ],
        "HideGrandParentsConnectorsOptionTask":[
           "HideGrandParentsConnectorsTask"
        ],
        "ItemsSizesOptionTask":[
           "CheckBoxTemplateTask",
           "ButtonsTemplateTask",
           "ItemTemplateParamsTask",
           "LabelAnnotationTemplateParamsTask",
           "ItemsPositionsTask"
        ],
        "CursorItemOptionTask":[
           "CursorItemTask",
           "ItemTemplateParamsTask"
        ],
        "NormalizeOptionTask":[
           "NormalizeLogicalFamilyTask"
        ],
        "OrderFamilyNodesOptionTask":[
           "UserDefinedNodesOrderTask"
        ],
        "CombinedNormalVisibilityItemsTask":[
           "ItemsPositionsTask"
        ],
        "ConnectorsOptionTask":[
           "PaletteManagerTask",
           "ItemsPositionsTask",
           "ConnectionsGraphTask"
        ],
        "OrientationOptionTask":[
           "LevelAnnotationTemplateTask",
           "LevelTitleSizeTask",
           "ItemsPositionsTask"
        ],
        "ScaleOptionTask":[
           "FrameSizeTask",
           "LevelTitleSizeTask",
           "ItemsPositionsTask"
        ],
        "CurrentControlSizeTask":[
           "ItemsPositionsTask"
        ],
        "LevelTitlePlacementOptionTask":[
           "LevelTitleSizeTask",
           "DrawLevelAnnotationTitlesTask"
        ],
        "FrameOptionTask":[
           "FrameSizeTask"
        ],
        "VisualTreeOptionTask":[
           "AlignDiagramTask"
        ],
        "LinePaletteOptionTask":[
           "PaletteManagerTask"
        ],
        "SelectedItemsOptionTask":[
           "SelectedItemsTask"
        ],
        "HighlightItemOptionTask":[
           "HighlightItemTask"
        ],
        "LevelTitleTemplateOptionTask":[
           "LevelAnnotationTemplateTask"
        ],
        "LogicalFamilyTask":[
           "RemoveLoopsTask",
           "DrawBackgroundAnnotationTask"
        ],
        "ReadTemplatesTask":[
           "ItemTemplateParamsTask",
           "FrameSizeTask",
           "LabelAnnotationTemplateParamsTask"
        ],
        "UserDefinedNodesOrderTask":[
           "OrderFamilyNodesTask"
        ],
        "CursorItemTask":[
           "ItemsPositionsTask",
           "DrawTreeItemsTask"
        ],
        "LevelAnnotationOptionTask":[
           "LevelTitleSizeTask",
           "MergeLevelIntervalsTask"
        ],
        "BackgroundAnnotationOptionTask":[
           "DrawBackgroundAnnotationTask"
        ],
        "AnnotationLabelTemplateTask":[
           "DrawBackgroundShapeAnnotationTask",
           "DrawForegroundShapeAnnotationTask"
        ],
        "BackgroundShapeAnnotationOptionTask":[
           "DrawBackgroundShapeAnnotationTask"
        ],
        "BackgroundConnectorAnnotationOptionTask":[
           "DrawBackgroundConnectorAnnotationTask"
        ],
        "ForegroundHighlightPathAnnotationOptionTask":[
           "DrawBackgroundHighlightPathAnnotationTask"
        ],
        "PaletteManagerTask":[
           "DrawConnectorsTask"
        ],
        "BackgroundHighlightPathAnnotationOptionTask":[
           "DrawForegroundHighlightPathAnnotationTask"
        ],
        "ButtonsTemplateTask":[
           "DrawTreeItemsTask"
        ],
        "CheckBoxTemplateTask":[
           "DrawTreeItemsTask"
        ],
        "GroupTitleTemplateTask":[
           "DrawTreeItemsTask"
        ],
        "SelectedItemsTask":[
           "DrawTreeItemsTask"
        ],
        "HighlightItemTask":[
           "DrawHighlightTask"
        ],
        "ForegroundShapeAnnotationOptionTask":[
           "DrawForegroundShapeAnnotationTask"
        ],
        "ForegroundConnectorAnnotationOptionTask":[
           "DrawForegroundConnectorAnnotationTask"
        ],
        "LevelAnnotationTemplateTask":[
           "DrawLevelAnnotationBackgroundTask",
           "DrawLevelAnnotationTitlesTask"
        ],
        "RemoveLoopsTask":[
           "LabelAnnotationOptionTask",
           "AddLabelAnnotationsTask",
           "ConnectionsGraphTask"
        ],
        "ItemTemplateParamsTask":[
           "CombinedTemplateParamsTask"
        ],
        "LevelTitleSizeTask":[
           "ApplyLayoutChangesTask"
        ],
        "FrameSizeTask":[
           "ApplyLayoutChangesTask"
        ],
        "LabelAnnotationOptionTask":[
           "LabelAnnotationTemplateOptionTask",
           "LabelAnnotationPlacementOptionTask",
           "CombinedContextsTask"
        ],
        "LabelAnnotationPlacementOptionTask":[
           "AddLabelAnnotationsTask"
        ],
        "LabelAnnotationTemplateOptionTask":[
           "LabelAnnotationTemplateParamsTask"
        ],
        "CombinedContextsTask":[
           "DrawTreeItemsTask"
        ],
        "AddLabelAnnotationsTask":[
           "AddSpousesTask"
        ],
        "LabelAnnotationTemplateParamsTask":[
           "CombinedTemplateParamsTask"
        ],
        "AddSpousesTask":[
           "HideGrandParentsConnectorsTask"
        ],
        "CombinedTemplateParamsTask":[
           "ItemsPositionsTask",
           "DrawTreeItemsTask"
        ],
        "HideGrandParentsConnectorsTask":[
           "NormalizeLogicalFamilyTask"
        ],
        "NormalizeLogicalFamilyTask":[
           "OrderFamilyNodesTask"
        ],
        "OrderFamilyNodesTask":[
           "ItemsPositionsTask",
           "LogicalLevelsPlacementTask",
           "ConnectionsGraphTask"
        ],
        "ItemsPositionsTask":[
           "AlignDiagramTask"
        ],
        "AlignDiagramTask":[
           "CreateTransformTask",
           "ApplyLayoutChangesTask",
           "LogicalLevelsPlacementTask"
        ],
        "ApplyLayoutChangesTask":[
           "ViewPortPlacementTask",
           "DrawBackgroundAnnotationTask",
           "DrawLevelAnnotationBackgroundTask",
           "DrawLevelAnnotationTitlesTask",
           "DrawTreeItemsTask"
        ],
        "CreateTransformTask":[
           "ConnectionsGraphTask",
           "ViewPortPlacementTask",
           "DrawBackgroundAnnotationTask",
           "DrawLevelAnnotationBackgroundTask",
           "DrawLevelAnnotationTitlesTask",
           "DrawTreeItemsTask"
        ],
        "LogicalLevelsPlacementTask":[
           "MergeLevelIntervalsTask"
        ],
        "DrawBackgroundAnnotationTask":[
           "DrawBackgroundShapeAnnotationTask"
        ],
        "ConnectionsGraphTask":[
           "DrawBackgroundHighlightPathAnnotationTask"
        ],
        "ViewPortPlacementTask":[
           "VerticalOffsetTask"
        ],
        "MergeLevelIntervalsTask":[
           "DrawLevelAnnotationBackgroundTask",
           "DrawLevelAnnotationTitlesTask"
        ],
        "DrawBackgroundShapeAnnotationTask":[
           "DrawBackgroundConnectorAnnotationTask"
        ],
        "VerticalOffsetTask":[
           "DrawLevelAnnotationBackgroundTask",
           "DrawLevelAnnotationTitlesTask"
        ],
        "DrawBackgroundConnectorAnnotationTask":[
           "DrawBackgroundHighlightPathAnnotationTask"
        ],
        "DrawLevelAnnotationTitlesTask":[
           
        ],
        "DrawLevelAnnotationBackgroundTask":[
           
        ],
        "DrawBackgroundHighlightPathAnnotationTask":[
           "DrawConnectorsTask"
        ],
        "DrawConnectorsTask":[
           "DrawForegroundHighlightPathAnnotationTask"
        ],
        "DrawForegroundHighlightPathAnnotationTask":[
           "DrawTreeItemsTask"
        ],
        "DrawTreeItemsTask":[
           "DrawCursorTask"
        ],
        "DrawCursorTask":[
           "DrawHighlightTask"
        ],
        "DrawHighlightTask":[
           "DrawForegroundShapeAnnotationTask"
        ],
        "DrawForegroundShapeAnnotationTask":[
           "DrawForegroundConnectorAnnotationTask"
        ],
        "DrawForegroundConnectorAnnotationTask":[
           
        ]
     };
    var family = getOptimizedFamily(sourceItems);

    var tempFamily = family.clone();
    family.loopTopo(this, function (itemid, item, levelIndex) {
      tempFamily.removeNode(itemid);
    });

    var levels = getFamily(tempFamily);

    expect(tempFamily.hasNodes()).toBe(false);
    expect(levels).toEqual([]);
});
