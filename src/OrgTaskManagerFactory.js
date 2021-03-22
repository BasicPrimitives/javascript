import TaskManager from './managers/TaskManager';
import { Colors, ZOrderType } from './enums';

import OrgConfig from './configs/OrgConfig';
import OrgItemConfig from './configs/OrgItemConfig';
import TemplateConfig from './configs/TemplateConfig';
import BackgroundAnnotationConfig from './configs/BackgroundAnnotationConfig';
import ConnectorAnnotationConfig from './configs/ConnectorAnnotationConfig';
import HighlightPathAnnotationConfig from './configs/HighlightPathAnnotationConfig';
import ShapeAnnotationConfig from './configs/ShapeAnnotationConfig';
import LevelAnnotationConfig from './configs/LevelAnnotationConfig';

import OptionsTask from './tasks/options/OptionsTask';
import CalloutOptionTask from './tasks/options/CalloutOptionTask';
import ConnectorsOptionTask from './tasks/options/ConnectorsOptionTask';
import OrgItemsOptionTask from './tasks/options/OrgItemsOptionTask';
import ItemsContentOptionTask from './tasks/options/ItemsContentOptionTask';
import ItemsSizesOptionTask from './tasks/options/ItemsSizesOptionTask';
import LabelsOptionTask from './tasks/options/LabelsOptionTask';
import TemplatesOptionTask from './tasks/options/TemplatesOptionTask';
import OrientationOptionTask from './tasks/options/OrientationOptionTask';
import OrgVisualTreeOptionTask from './tasks/options/OrgVisualTreeOptionTask';
import MinimizedItemsOptionTask from './tasks/options/MinimizedItemsOptionTask';
import CursorItemOptionTask from './tasks/options/selection/CursorItemOptionTask';
import HighlightItemOptionTask from './tasks/options/selection/HighlightItemOptionTask';
import SelectedItemsOptionTask from './tasks/options/selection/SelectedItemsOptionTask';
import CursorSelectionPathModeOptionTask from './tasks/options/selection/CursorSelectionPathModeOptionTask';

import SplitAnnotationsOptionTask from './tasks/options/annotations/SplitAnnotationsOptionTask';
import ShapeAnnotationOptionTask from './tasks/options/annotations/ShapeAnnotationOptionTask';
import HighlightPathAnnotationOptionTask from './tasks/options/annotations/HighlightPathAnnotationOptionTask';
import ConnectorAnnotationOptionTask from './tasks/options/annotations/ConnectorAnnotationOptionTask';
import BackgroundAnnotationOptionTask from './tasks/options/annotations/BackgroundAnnotationOptionTask';
import LevelAnnotationOptionTask from './tasks/options/annotations/LevelAnnotationOptionTask';

import ScaleOptionTask from './tasks/options/ScaleOptionTask';
import FrameOptionTask from './tasks/options/FrameOptionTask';
import LevelTitlePlacementOptionTask from './tasks/options/LevelTitlePlacementOptionTask';
import LevelTitleTemplateOptionTask from './tasks/options/LevelTitleTemplateOptionTask';

import CombinedContextsTask from './tasks/transformations/CombinedContextsTask';
import OrgTreeTask from './tasks/transformations/OrgTreeTask';

import ReadTemplatesTask from './tasks/templates/ReadTemplatesTask';
import ActiveItemsTask from './tasks/templates/ActiveItemsTask';
import ItemTemplateParamsTask from './tasks/templates/ItemTemplateParamsTask';
import GroupTitleTemplateTask from './tasks/templates/GroupTitleTemplateTask';
import CheckBoxTemplateTask from './tasks/templates/CheckBoxTemplateTask';
import ButtonsTemplateTask from './tasks/templates/ButtonsTemplateTask';
import AnnotationLabelTemplateTask from './tasks/templates/AnnotationLabelTemplateTask';
import LevelAnnotationTemplateTask from './tasks/templates/LevelAnnotationTemplateTask';

import VisualTreeTask from './tasks/transformations/VisualTreeTask';
import VisualTreeLevelsTask from './tasks/transformations/VisualTreeLevelsTask';
import OrgExtractNestedLayoutsTask from './tasks/transformations/OrgExtractNestedLayoutsTask';
import ConnectionsGraphTask from './tasks/transformations/ConnectionsGraphTask';
import HighlightItemTask from './tasks/transformations/selection/HighlightItemTask';
import CursorItemTask from './tasks/transformations/selection/CursorItemTask';
import OrgCursorNeighboursTask from './tasks/transformations/selection/OrgCursorNeighboursTask';
import SelectedItemsTask from './tasks/transformations/selection/SelectedItemsTask';
import OrgSelectionPathItemsTask from './tasks/transformations/selection/OrgSelectionPathItemsTask';

import NormalVisibilityItemsByAnnotationTask from './tasks/transformations/selection/NormalVisibilityItemsByAnnotationTask';
import NormalVisibilityItemsByConnectorAnnotationTask from './tasks/transformations/selection/NormalVisibilityItemsByConnectorAnnotationTask';

import CombinedNormalVisibilityItemsTask from './tasks/transformations/selection/CombinedNormalVisibilityItemsTask';

import FrameSizeTask from './tasks/layout/FrameSizeTask';
import LevelTitleSizeTask from './tasks/layout/LevelTitleSizeTask';
import LayoutOptionsTask from './tasks/options/LayoutOptionsTask';
import CurrentControlSizeTask from './tasks/layout/CurrentControlSizeTask';
import CurrentScrollPositionTask from './tasks/layout/CurrentScrollPositionTask';
import OrgItemsPositionsTask from './tasks/transformations/OrgItemsPositionsTask';
import AlignDiagramTask from './tasks/layout/AlignDiagramTask';
import CreateTransformTask from './tasks/layout/CreateTransformTask';
import PaletteManagerTask from './tasks/transformations/PaletteManagerTask';

import ApplyLayoutChangesTask from './tasks/layout/ApplyLayoutChangesTask';
import CenterOnCursorTask from './tasks/layout/CenterOnCursorTask';
import ProjectItemsToFrameTask from './tasks/layout/ProjectItemsToFrameTask';

import ViewPortPlacementTask from './tasks/layout/ViewPortPlacementTask';
import VerticalOffsetTask from './tasks/layout/VerticalOffsetTask';

import OrgLogicalLevelsPlacementTask from './tasks/layout/OrgLogicalLevelsPlacementTask';
import MergeLevelIntervalsTask from './tasks/layout/MergeLevelIntervalsTask';

import DrawBackgroundAnnotationTask from './tasks/renders/DrawBackgroundAnnotationTask';
import DrawHighlightPathAnnotationTask from './tasks/renders/DrawHighlightPathAnnotationTask';
import DrawConnectorAnnotationTask from './tasks/renders/DrawConnectorAnnotationTask';
import DrawShapeAnnotationTask from './tasks/renders/DrawShapeAnnotationTask';
import DrawCursorTask from './tasks/renders/DrawCursorTask';
import DrawHighlightTask from './tasks/renders/DrawHighlightTask';
import DrawHighlightAnnotationTask from './tasks/renders/DrawHighlightAnnotationTask';
import DrawTreeItemsTask from './tasks/renders/DrawTreeItemsTask';
import DrawMinimizedItemsTask from './tasks/renders/DrawMinimizedItemsTask';
import DrawConnectorsTask from './tasks/renders/DrawConnectorsTask';
import DrawItemLabelsTask from './tasks/renders/DrawItemLabelsTask';
import DrawFrameItemsTask from './tasks/renders/DrawFrameItemsTask';
import DrawFrameHighlightTask from './tasks/renders/DrawFrameHighlightTask';
import DrawLevelAnnotationTitlesTask from './tasks/renders/DrawLevelAnnotationTitlesTask';
import DrawLevelAnnotationBackgroundTask from './tasks/renders/DrawLevelAnnotationBackgroundTask';

export default function TaskManagerFactory(getOptions, getGraphics, getLayout, setLayout, templates) {
  var tasks = new TaskManager();

  // Dependencies
  tasks.addDependency('options', getOptions);
  tasks.addDependency('graphics', getGraphics);
  tasks.addDependency('getLayout', getLayout);
  tasks.addDependency('setLayout', setLayout);
  tasks.addDependency('templates', templates);

  tasks.addDependency('defaultConfig', new OrgConfig());
  tasks.addDependency('defaultItemConfig', new OrgItemConfig());
  tasks.addDependency('defaultTemplateConfig', new TemplateConfig());
  
  tasks.addDependency('defaultBackgroundAnnotationConfig', new BackgroundAnnotationConfig());
  tasks.addDependency('defaultConnectorAnnotationConfig', new ConnectorAnnotationConfig());
  tasks.addDependency('defaultHighlightPathAnnotationConfig', new HighlightPathAnnotationConfig());
  tasks.addDependency('defaultShapeAnnotationConfig', new ShapeAnnotationConfig());
  tasks.addDependency('defaultLevelAnnotationConfig', new LevelAnnotationConfig());

  tasks.addDependency('isFamilyChartMode', false);
  tasks.addDependency('showElbowDots', false);
  tasks.addDependency('null', null);
  tasks.addDependency('foreground', ZOrderType.Foreground);
  tasks.addDependency('background', ZOrderType.Background);

  // Options
  tasks.addTask('OptionsTask', ['options'], OptionsTask, Colors.Black);
  tasks.addTask('CalloutOptionTask', ['OptionsTask', 'defaultConfig', 'defaultItemConfig'], CalloutOptionTask, Colors.Navy);
  tasks.addTask('ConnectorsOptionTask', ['OptionsTask', 'defaultConfig'], ConnectorsOptionTask, Colors.Navy);
  tasks.addTask('ItemsOptionTask', ['OptionsTask', 'defaultItemConfig'], OrgItemsOptionTask, Colors.Navy);
  tasks.addTask('ItemsContentOptionTask', ['OptionsTask', 'defaultItemConfig'], ItemsContentOptionTask, Colors.Navy);
  tasks.addTask('ItemsSizesOptionTask', ['OptionsTask', 'defaultConfig', 'defaultItemConfig'], ItemsSizesOptionTask, Colors.Navy);
  tasks.addTask('LabelsOptionTask', ['OptionsTask', 'defaultConfig', 'defaultItemConfig'], LabelsOptionTask, Colors.Navy);
  tasks.addTask('TemplatesOptionTask', ['OptionsTask', 'defaultConfig', 'defaultTemplateConfig'], TemplatesOptionTask, Colors.Navy);
  tasks.addTask('OrientationOptionTask', ['OptionsTask', 'defaultConfig'], OrientationOptionTask, Colors.Navy);
  tasks.addTask('VisualTreeOptionTask', ['OptionsTask', 'defaultConfig'], OrgVisualTreeOptionTask, Colors.Navy);
  tasks.addTask('MinimizedItemsOptionTask', ['OptionsTask'], MinimizedItemsOptionTask, Colors.Navy);

  tasks.addTask('CursorItemOptionTask', ['OptionsTask', 'defaultConfig'], CursorItemOptionTask, Colors.Navy);
  tasks.addTask('HighlightItemOptionTask', ['OptionsTask', 'defaultConfig'], HighlightItemOptionTask, Colors.Navy);
  tasks.addTask('SelectedItemsOptionTask', ['OptionsTask'], SelectedItemsOptionTask, Colors.Navy);
  tasks.addTask('CursorSelectionPathModeOptionTask', ['OptionsTask', 'defaultConfig'], CursorSelectionPathModeOptionTask, Colors.Navy);

  tasks.addTask('SplitAnnotationsOptionTask', ['OptionsTask'], SplitAnnotationsOptionTask, Colors.Cyan);

  tasks.addTask('ForegroundShapeAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultShapeAnnotationConfig', 'foreground'], ShapeAnnotationOptionTask, Colors.Navy);
  tasks.addTask('BackgroundShapeAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultShapeAnnotationConfig', 'background'], ShapeAnnotationOptionTask, Colors.Navy);
  tasks.addTask('ForegroundHighlightPathAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultHighlightPathAnnotationConfig', 'foreground'], HighlightPathAnnotationOptionTask, Colors.Navy);
  tasks.addTask('BackgroundHighlightPathAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultHighlightPathAnnotationConfig', 'background'], HighlightPathAnnotationOptionTask, Colors.Navy);
  tasks.addTask('ForegroundConnectorAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultConnectorAnnotationConfig', 'foreground'], ConnectorAnnotationOptionTask, Colors.Navy);
  tasks.addTask('BackgroundConnectorAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultConnectorAnnotationConfig', 'background'], ConnectorAnnotationOptionTask, Colors.Navy);
  tasks.addTask('BackgroundAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultBackgroundAnnotationConfig'], BackgroundAnnotationOptionTask, Colors.Navy);
  tasks.addTask('LevelAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultLevelAnnotationConfig'], LevelAnnotationOptionTask, Colors.Navy);

  tasks.addTask('ScaleOptionTask', ['OptionsTask', 'defaultConfig'], ScaleOptionTask, Colors.Navy);
  tasks.addTask('FrameOptionTask', ['OptionsTask', 'defaultConfig'], FrameOptionTask, Colors.Navy);
  tasks.addTask('LevelTitlePlacementOptionTask', ['OptionsTask', 'defaultConfig'], LevelTitlePlacementOptionTask, Colors.Navy);
  tasks.addTask('LevelTitleTemplateOptionTask', ['OptionsTask', 'defaultConfig'], LevelTitleTemplateOptionTask, Colors.Navy);

  // Transformations
  tasks.addTask('CombinedContextsTask', ['ItemsContentOptionTask'], CombinedContextsTask, Colors.Cyan);
  tasks.addTask('OrgTreeTask', ['ItemsOptionTask'], OrgTreeTask, Colors.Red);

  // Transformations / Templates
  tasks.addTask('ReadTemplatesTask', ['TemplatesOptionTask', 'templates'], ReadTemplatesTask, Colors.Cyan);
  tasks.addTask('ActiveItemsTask', ['ItemsSizesOptionTask', 'ReadTemplatesTask'], ActiveItemsTask, Colors.Cyan);
  tasks.addTask('ItemTemplateParamsTask', ['ItemsSizesOptionTask', 'CursorItemOptionTask', 'ReadTemplatesTask'], ItemTemplateParamsTask, Colors.Cyan);

  tasks.addTask('GroupTitleTemplateTask', ['TemplatesOptionTask', 'templates'], GroupTitleTemplateTask, Colors.Cyan);
  tasks.addTask('CheckBoxTemplateTask', ['ItemsSizesOptionTask', 'templates'], CheckBoxTemplateTask, Colors.Cyan);
  tasks.addTask('ButtonsTemplateTask', ['ItemsSizesOptionTask', 'templates'], ButtonsTemplateTask, Colors.Cyan);
  tasks.addTask('AnnotationLabelTemplateTask', ['ItemsOptionTask', 'templates'], AnnotationLabelTemplateTask, Colors.Cyan);
  tasks.addTask('LevelAnnotationTemplateTask', ['OrientationOptionTask', 'LevelTitleTemplateOptionTask', 'templates'], LevelAnnotationTemplateTask, Colors.Cyan);

  tasks.addTask('VisualTreeTask', ['OrgTreeTask', 'ActiveItemsTask', 'VisualTreeOptionTask', 'isFamilyChartMode'], VisualTreeTask, Colors.Red);
  tasks.addTask('VisualTreeLevelsTask', ['VisualTreeTask', 'ItemTemplateParamsTask'], VisualTreeLevelsTask, Colors.Red);

  tasks.addTask('OrgExtractNestedLayoutsTask', ['OptionsTask'], OrgExtractNestedLayoutsTask, Colors.Cyan);
  tasks.addTask('ConnectionsGraphTask', ['graphics', 'CreateTransformTask', 'ConnectorsOptionTask', 'VisualTreeLevelsTask', 'OrgExtractNestedLayoutsTask', 'AlignDiagramTask'], ConnectionsGraphTask, Colors.Cyan);

  // Transformations/Selections
  tasks.addTask('HighlightItemTask', ['HighlightItemOptionTask', 'ActiveItemsTask'], HighlightItemTask, Colors.Cyan);

  tasks.addTask('CursorItemTask', ['CursorItemOptionTask', 'ActiveItemsTask'], CursorItemTask, Colors.Cyan);
  tasks.addTask('CursorNeighboursTask', ['CursorItemTask', 'VisualTreeTask'], OrgCursorNeighboursTask, Colors.Cyan);
  tasks.addTask('SelectedItemsTask', ['SelectedItemsOptionTask', 'ItemsOptionTask'], SelectedItemsTask, Colors.Cyan);
  tasks.addTask('SelectionPathItemsTask', ['VisualTreeTask', 'CursorItemTask', 'SelectedItemsTask', 'CursorSelectionPathModeOptionTask'], OrgSelectionPathItemsTask, Colors.Cyan);

  tasks.addTask('NormalVisibilityItemsByForegroundShapeAnnotationTask', ['ForegroundShapeAnnotationOptionTask'], NormalVisibilityItemsByAnnotationTask, Colors.Cyan);
  tasks.addTask('NormalVisibilityItemsByBackgroundShapeAnnotationTask', ['BackgroundShapeAnnotationOptionTask'], NormalVisibilityItemsByAnnotationTask, Colors.Cyan);
  tasks.addTask('NormalVisibilityItemsByBackgroundAnnotationTask', ['BackgroundAnnotationOptionTask'], NormalVisibilityItemsByAnnotationTask, Colors.Cyan);
  tasks.addTask('NormalVisibilityItemsByForegroundHighlightPathAnnotationTask', ['ForegroundHighlightPathAnnotationOptionTask'], NormalVisibilityItemsByAnnotationTask, Colors.Cyan);
  tasks.addTask('NormalVisibilityItemsByBackgroundHighlightPathAnnotationTask', ['BackgroundHighlightPathAnnotationOptionTask'], NormalVisibilityItemsByAnnotationTask, Colors.Cyan);
  tasks.addTask('NormalVisibilityItemsByForegroundConnectorAnnotationTask', ['ForegroundConnectorAnnotationOptionTask'], NormalVisibilityItemsByConnectorAnnotationTask, Colors.Cyan);
  tasks.addTask('NormalVisibilityItemsByBackgroundConnectorAnnotationTask', ['BackgroundConnectorAnnotationOptionTask'], NormalVisibilityItemsByConnectorAnnotationTask, Colors.Cyan);
  tasks.addTask('CombinedNormalVisibilityItemsTask', [
    'ItemsSizesOptionTask',
    'CursorItemTask',
    'CursorNeighboursTask',
    'SelectedItemsTask',
    'SelectionPathItemsTask',
    'NormalVisibilityItemsByForegroundShapeAnnotationTask',
    'NormalVisibilityItemsByBackgroundShapeAnnotationTask',
    'NormalVisibilityItemsByBackgroundAnnotationTask',
    'NormalVisibilityItemsByForegroundHighlightPathAnnotationTask',
    'NormalVisibilityItemsByBackgroundHighlightPathAnnotationTask',
    'NormalVisibilityItemsByForegroundConnectorAnnotationTask',
    'NormalVisibilityItemsByBackgroundConnectorAnnotationTask'], CombinedNormalVisibilityItemsTask, Colors.Cyan);

  // Layout
  tasks.addTask('FrameSizeTask', ['FrameOptionTask', 'ReadTemplatesTask', 'ScaleOptionTask'], FrameSizeTask, Colors.Navy);
  tasks.addTask('LevelTitleSizeTask', ['LevelTitlePlacementOptionTask', 'LevelAnnotationOptionTask', 'OrientationOptionTask', 'ScaleOptionTask'], LevelTitleSizeTask, Colors.Navy);
  tasks.addTask('LayoutOptionsTask', ['getLayout', 'OptionsTask'], LayoutOptionsTask, Colors.Black);
  tasks.addTask('CurrentControlSizeTask', ['LayoutOptionsTask', 'ItemsSizesOptionTask', 'FrameSizeTask', 'LevelTitleSizeTask'], CurrentControlSizeTask, Colors.Black);
  tasks.addTask('CurrentScrollPositionTask', ['LayoutOptionsTask'], CurrentScrollPositionTask, Colors.Black);

  tasks.addTask('ItemsPositionsTask', ['CurrentControlSizeTask', 'ScaleOptionTask', 'OrientationOptionTask', 'ItemsSizesOptionTask', 'ConnectorsOptionTask', 'VisualTreeOptionTask',
    'VisualTreeTask', 'VisualTreeLevelsTask',
    'ItemTemplateParamsTask',
    'CursorItemTask', 'CombinedNormalVisibilityItemsTask'], OrgItemsPositionsTask, Colors.Red);

  tasks.addTask('AlignDiagramTask', ['OrientationOptionTask', 'ItemsSizesOptionTask', 'VisualTreeOptionTask', 'ScaleOptionTask', 'CurrentControlSizeTask', 'ActiveItemsTask', 'ItemsPositionsTask', 'isFamilyChartMode'], AlignDiagramTask, Colors.Red);
  tasks.addTask('CreateTransformTask', ['OrientationOptionTask', 'AlignDiagramTask'], CreateTransformTask, Colors.Cyan);

  // Managers
  tasks.addTask('PaletteManagerTask', ['ConnectorsOptionTask', 'null'], PaletteManagerTask, Colors.Cyan);

  // Apply Layout Changes
  tasks.addTask('ApplyLayoutChangesTask', ['graphics', 'setLayout', 'ItemsSizesOptionTask', 'CurrentControlSizeTask', 'ScaleOptionTask', 'AlignDiagramTask', 'FrameSizeTask', 'LevelTitleSizeTask'], ApplyLayoutChangesTask, Colors.Green);
  tasks.addTask('CenterOnCursorTask', ['LayoutOptionsTask', 'ApplyLayoutChangesTask', 'CurrentScrollPositionTask', 'CursorItemTask', 'AlignDiagramTask', 'CreateTransformTask', 'ScaleOptionTask'], CenterOnCursorTask, Colors.Cyan);
  tasks.addTask('ProjectItemsToFrameTask', ['CreateTransformTask', 'FrameSizeTask',
    'ApplyLayoutChangesTask', 'ScaleOptionTask',
    'AlignDiagramTask', 'CenterOnCursorTask',
    'ItemTemplateParamsTask',
    'SelectedItemsTask'], ProjectItemsToFrameTask, Colors.Green);

  tasks.addTask('ViewPortPlacementTask', ['ScaleOptionTask', 'CenterOnCursorTask', 'CreateTransformTask', 'ApplyLayoutChangesTask'], ViewPortPlacementTask, Colors.Green);  
  tasks.addTask('VerticalOffsetTask', ['ViewPortPlacementTask'], VerticalOffsetTask, Colors.Green);  

  tasks.addTask('LogicalLevelsPlacementTask', ['OrgTreeTask', 'AlignDiagramTask'], OrgLogicalLevelsPlacementTask, Colors.Green);
  tasks.addTask('MergeLevelIntervalsTask', ['LevelAnnotationOptionTask', 'LogicalLevelsPlacementTask'], MergeLevelIntervalsTask, Colors.Green); 

  // Renders
  tasks.addTask('DrawBackgroundAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'BackgroundAnnotationOptionTask', 'VisualTreeTask', 'AlignDiagramTask'], DrawBackgroundAnnotationTask, Colors.Green);

  tasks.addTask('DrawBackgroundHighlightPathAnnotationTask', ['graphics', 'ConnectorsOptionTask', 'ForegroundHighlightPathAnnotationOptionTask', 'ConnectionsGraphTask', 'foreground'], DrawHighlightPathAnnotationTask, Colors.Cyan);
  tasks.addTask('DrawForegroundHighlightPathAnnotationTask', ['graphics', 'ConnectorsOptionTask', 'BackgroundHighlightPathAnnotationOptionTask', 'ConnectionsGraphTask', 'background'], DrawHighlightPathAnnotationTask, Colors.Cyan);

  tasks.addTask('DrawForegroundConnectorAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'ForegroundConnectorAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'foreground'], DrawConnectorAnnotationTask, Colors.Green);
  tasks.addTask('DrawBackgroundConnectorAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'BackgroundConnectorAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'background'], DrawConnectorAnnotationTask, Colors.Green);
  tasks.addTask('DrawForegroundShapeAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'ForegroundShapeAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'foreground'], DrawShapeAnnotationTask, Colors.Green);
  tasks.addTask('DrawBackgroundShapeAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'BackgroundShapeAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'background'], DrawShapeAnnotationTask, Colors.Green);

  tasks.addTask('DrawCursorTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'CombinedContextsTask', 'AlignDiagramTask', 'ItemTemplateParamsTask', 'CursorItemTask', 'SelectedItemsTask'], DrawCursorTask, Colors.Green);
  tasks.addTask('DrawHighlightTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'CombinedContextsTask', 'AlignDiagramTask', 'ItemTemplateParamsTask', 'HighlightItemTask', 'CursorItemTask', 'SelectedItemsTask'], DrawHighlightTask, Colors.Green);
  tasks.addTask('DrawHighlightAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'ScaleOptionTask', 'CombinedContextsTask', 'CalloutOptionTask', 'ReadTemplatesTask', 'AlignDiagramTask', 'CenterOnCursorTask', 'HighlightItemTask', 'CursorItemTask', 'SelectedItemsTask', 'FrameSizeTask'], DrawHighlightAnnotationTask, Colors.Green);

  tasks.addTask('DrawTreeItemsTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'ScaleOptionTask',
    'ItemsSizesOptionTask',
    'CombinedContextsTask',
    'AlignDiagramTask', 'CenterOnCursorTask',
    'ItemTemplateParamsTask',
    'CursorItemTask', 'SelectedItemsTask',
    'GroupTitleTemplateTask', 'CheckBoxTemplateTask', 'ButtonsTemplateTask'
  ], DrawTreeItemsTask, Colors.Green);

  tasks.addTask('DrawMinimizedItemsTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'MinimizedItemsOptionTask', 'ItemTemplateParamsTask', 'AlignDiagramTask'], DrawMinimizedItemsTask, Colors.Green);
  tasks.addTask('DrawConnectorsTask', ['graphics', 'ConnectionsGraphTask', 'ConnectorsOptionTask', 'showElbowDots', 'PaletteManagerTask'], DrawConnectorsTask, Colors.Green);
  tasks.addTask('DrawItemLabelsTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'LabelsOptionTask', 'AlignDiagramTask'], DrawItemLabelsTask, Colors.Green);

  tasks.addTask('DrawFrameItemsTask', ['graphics', 'ApplyLayoutChangesTask', 'ProjectItemsToFrameTask', 'ItemTemplateParamsTask', 'MinimizedItemsOptionTask'], DrawFrameItemsTask, Colors.Green);
  tasks.addTask('DrawFrameHighlightTask', ['graphics', 'ProjectItemsToFrameTask', 'CombinedContextsTask', 'ItemTemplateParamsTask', 'HighlightItemTask', 'CursorItemTask'], DrawFrameHighlightTask, Colors.Green);

  tasks.addTask('DrawLevelAnnotationBackgroundTask', ['graphics', 'VerticalOffsetTask', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'LevelAnnotationOptionTask', 'MergeLevelIntervalsTask', 'LevelAnnotationTemplateTask'], DrawLevelAnnotationBackgroundTask, Colors.Green);
  tasks.addTask('DrawLevelAnnotationTitlesTask', ['graphics', 'VerticalOffsetTask', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'LevelAnnotationOptionTask', 'MergeLevelIntervalsTask', 'LevelAnnotationTemplateTask', 'LevelTitlePlacementOptionTask'], DrawLevelAnnotationTitlesTask, Colors.Green);
  return tasks;
};
