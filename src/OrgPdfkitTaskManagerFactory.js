import OrgConfig from './configs/OrgConfig';
import OrgItemConfig from './configs/OrgItemConfig';
import TemplateConfig from './configs/TemplateConfig';
import BackgroundAnnotationConfig from './configs/BackgroundAnnotationConfig';
import ConnectorAnnotationConfig from './configs/ConnectorAnnotationConfig';
import HighlightPathAnnotationConfig from './configs/HighlightPathAnnotationConfig';
import ShapeAnnotationConfig from './configs/ShapeAnnotationConfig';
import LevelAnnotationConfig from './configs/LevelAnnotationConfig';
 
import { ZOrderType, Colors } from './enums';

import OptionsTask from './tasks/options/OptionsTask';
import CalloutOptionTask from './tasks/options/CalloutOptionTask';
import EndPointsOptionTask from './tasks/options/EndPointsOptionTask';
import ConnectorsOptionTask from './tasks/options/ConnectorsOptionTask';
import OrgItemsOptionTask from './tasks/options/OrgItemsOptionTask';
import ItemsSizesOptionTask from './tasks/options/ItemsSizesOptionTask';
import TemplatesOptionTask from './tasks/options/TemplatesOptionTask';
import OrientationOptionTask from './tasks/options/OrientationOptionTask';
import OrgVisualTreeOptionTask from './tasks/options/OrgVisualTreeOptionTask';
import CursorItemOptionTask from './tasks/options/selection/CursorItemOptionTask';
import HighlightItemOptionTask from './tasks/options/selection/HighlightItemOptionTask';
import SelectedItemsOptionTask from './tasks/options/selection/SelectedItemsOptionTask';

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
import ItemTemplateParamsTask from './tasks/templates/ItemTemplateParamsTask';
import GroupTitleTemplateTask from './tasks/templates/GroupTitleTemplateTask';
import CheckBoxTemplateTask from './tasks/templates/CheckBoxTemplateTask';
import ButtonsTemplateTask from './tasks/templates/ButtonsTemplateTask';
import AnnotationLabelTemplateTask from './tasks/templates/AnnotationLabelTemplateTask';
import EndPointTemplateTask from './tasks/templates/EndPointTemplateTask';
import LevelAnnotationTemplateTask from './tasks/templates/LevelAnnotationTemplateTask';

import VisualTreeTask from './tasks/transformations/VisualTreeTask';
import VisualTreeLevelsTask from './tasks/transformations/VisualTreeLevelsTask';
import ExtractNestedLayoutsTask from './tasks/transformations/OrgExtractNestedLayoutsTask';
import CreateLayoutsTreeTask from './tasks/transformations/OrgCreateLayoutsTreeTask';

import ConnectionsGraphTask from './tasks/transformations/ConnectionsGraphTask';
import HighlightItemTask from './tasks/transformations/selection/HighlightItemTask';
import CursorItemTask from './tasks/transformations/selection/CursorItemTask';
import SelectedItemsTask from './tasks/transformations/selection/SelectedItemsTask';

import DummyCombinedNormalVisibilityItemsTask from './tasks/transformations/selection/DummyCombinedNormalVisibilityItemsTask';

import FrameSizeTask from './tasks/layout/FrameSizeTask';
import LevelTitleSizeTask from './tasks/layout/LevelTitleSizeTask';
import ApplyLayoutChangesTask from './tasks/layout/ApplyLayoutChangesTask';
import DummyCurrentControlSizeTask from './tasks/layout/DummyCurrentControlSizeTask';
import ItemsPositionsTask from './tasks/transformations/ItemsPositionsTask';
import AlignDiagramTask from './tasks/layout/AlignDiagramTask';
import CreateTransformTask from './tasks/layout/CreateTransformTask';
import PaletteManagerTask from './tasks/transformations/PaletteManagerTask';

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
import DrawTreeItemsTask from './tasks/renders/DrawTreeItemsTask';
import DrawConnectorsTask from './tasks/renders/DrawConnectorsTask';
import DrawLevelAnnotationTitlesTask from './tasks/renders/DrawLevelAnnotationTitlesTask';
import DrawLevelAnnotationBackgroundTask from './tasks/renders/DrawLevelAnnotationBackgroundTask';

import TaskManager from './managers/TaskManager';

export default function OrgPdfkitTaskManagerFactory(getOptions, getGraphics, setLayout, templates) {
  var tasks = new TaskManager();

  // Dependencies
  tasks.addDependency('options', getOptions);
  tasks.addDependency('graphics', getGraphics);
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

  tasks.addDependency('showElbowDots', false);
  tasks.addDependency('null', null);
  tasks.addDependency('foreground', ZOrderType.Foreground);
  tasks.addDependency('background', ZOrderType.Background);

  // Options
  tasks.addTask('OptionsTask', ['options'], OptionsTask, Colors.Black);

  tasks.addTask('CalloutOptionTask', ['OptionsTask', 'defaultConfig', 'defaultItemConfig'], CalloutOptionTask, Colors.Navy);
  tasks.addTask('EndPointsOptionTask', ['OptionsTask', 'defaultConfig'], EndPointsOptionTask, Colors.Navy);
  tasks.addTask('ConnectorsOptionTask', ['OptionsTask', 'defaultConfig'], ConnectorsOptionTask, Colors.Navy);
  tasks.addTask('ItemsOptionTask', ['OptionsTask', 'defaultItemConfig'], OrgItemsOptionTask, Colors.Navy);
  tasks.addTask('ItemsSizesOptionTask', ['OptionsTask', 'defaultConfig', 'defaultItemConfig'], ItemsSizesOptionTask, Colors.Navy);
  tasks.addTask('TemplatesOptionTask', ['OptionsTask', 'defaultConfig', 'defaultTemplateConfig'], TemplatesOptionTask, Colors.Navy);
  tasks.addTask('OrientationOptionTask', ['OptionsTask', 'defaultConfig'], OrientationOptionTask, Colors.Navy);
  tasks.addTask('VisualTreeOptionTask', ['OptionsTask', 'defaultConfig'], OrgVisualTreeOptionTask, Colors.Navy);

  tasks.addTask('CursorItemOptionTask', ['OptionsTask', 'defaultConfig'], CursorItemOptionTask, Colors.Navy);
  tasks.addTask('HighlightItemOptionTask', ['OptionsTask', 'defaultConfig'], HighlightItemOptionTask, Colors.Navy);
  tasks.addTask('SelectedItemsOptionTask', ['OptionsTask'], SelectedItemsOptionTask, Colors.Navy);

  tasks.addTask('SplitAnnotationsOptionTask', ['OptionsTask'], SplitAnnotationsOptionTask, Colors.Cyan);

  tasks.addTask('ForegroundShapeAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultShapeAnnotationConfig', 'foreground'], ShapeAnnotationOptionTask, Colors.Navy);
  tasks.addTask('BackgroundShapeAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultShapeAnnotationConfig', 'background'], ShapeAnnotationOptionTask, Colors.Navy);
  tasks.addTask('ForegroundHighlightPathAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultHighlightPathAnnotationConfig', 'foreground'], HighlightPathAnnotationOptionTask, Colors.Navy);
  tasks.addTask('BackgroundHighlightPathAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultHighlightPathAnnotationConfig', 'background'], HighlightPathAnnotationOptionTask, Colors.Navy);
  tasks.addTask('ForegroundConnectorAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultConnectorAnnotationConfig', 'foreground'], ConnectorAnnotationOptionTask, Colors.Navy);
  tasks.addTask('BackgroundConnectorAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultConnectorAnnotationConfig', 'background'], ConnectorAnnotationOptionTask, Colors.Navy);
  tasks.addTask('BackgroundAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultBackgroundAnnotationConfig'], BackgroundAnnotationOptionTask, Colors.Navy);
  tasks.addTask('LevelAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultLevelAnnotationConfig'], LevelAnnotationOptionTask, Colors.Navy)

  tasks.addTask('ScaleOptionTask', ['OptionsTask', 'defaultConfig'], ScaleOptionTask, Colors.Navy);
  tasks.addTask('FrameOptionTask', ['OptionsTask', 'defaultConfig'], FrameOptionTask, Colors.Navy);
  tasks.addTask('LevelTitlePlacementOptionTask', ['OptionsTask', 'defaultConfig'], LevelTitlePlacementOptionTask, Colors.Navy);
  tasks.addTask('LevelTitleTemplateOptionTask', ['OptionsTask', 'defaultConfig'], LevelTitleTemplateOptionTask, Colors.Navy);

  // Transformations
  tasks.addTask('CombinedContextsTask', ['ItemsOptionTask'], CombinedContextsTask, Colors.Cyan);
  tasks.addTask('OrgTreeTask', ['ItemsOptionTask'], OrgTreeTask, Colors.Red);

  // Transformations / Templates
  tasks.addTask('ReadTemplatesTask', ['TemplatesOptionTask', 'templates'], ReadTemplatesTask, Colors.Cyan);
  // TODO: Add jsPDF templates
  tasks.addTask('ItemTemplateParamsTask', ['ItemsSizesOptionTask', 'CursorItemOptionTask', 'ReadTemplatesTask'], ItemTemplateParamsTask, Colors.Cyan);
  tasks.addTask('GroupTitleTemplateTask', ['TemplatesOptionTask', 'templates'], GroupTitleTemplateTask, Colors.Cyan);
  tasks.addTask('CheckBoxTemplateTask', ['ItemsSizesOptionTask', 'templates'], CheckBoxTemplateTask, Colors.Cyan);
  tasks.addTask('ButtonsTemplateTask', ['ItemsSizesOptionTask', 'templates'], ButtonsTemplateTask, Colors.Cyan);
  tasks.addTask('AnnotationLabelTemplateTask', ['ItemsOptionTask', 'templates'], AnnotationLabelTemplateTask, Colors.Cyan);
  tasks.addTask('EndPointTemplateTask', ['EndPointsOptionTask', 'templates'], EndPointTemplateTask, Colors.Cyan);
  tasks.addTask('LevelAnnotationTemplateTask', ['OrientationOptionTask', 'LevelTitleTemplateOptionTask', 'templates'], LevelAnnotationTemplateTask, Colors.Cyan);
  
  tasks.addTask('VisualTreeTask', ['OrgTreeTask', 'null', 'VisualTreeOptionTask'], VisualTreeTask, Colors.Red);
  tasks.addTask('VisualTreeLevelsTask', ['VisualTreeTask', 'ItemTemplateParamsTask'], VisualTreeLevelsTask, Colors.Red);
  tasks.addTask('ExtractNestedLayoutsTask', ['OptionsTask'], ExtractNestedLayoutsTask, Colors.Red);
  tasks.addTask('CreateLayoutsTreeTask', ['VisualTreeTask', 'VisualTreeLevelsTask', 'ExtractNestedLayoutsTask'], CreateLayoutsTreeTask, Colors.Red);

  tasks.addTask('ConnectionsGraphTask', ['graphics', 'CreateTransformTask', 'ConnectorsOptionTask', 'VisualTreeLevelsTask', 'ExtractNestedLayoutsTask', 'AlignDiagramTask'], ConnectionsGraphTask, Colors.Cyan);

  // Transformations/Selections
  tasks.addTask('HighlightItemTask', ['HighlightItemOptionTask', 'null'], HighlightItemTask, Colors.Cyan);

  tasks.addTask('CursorItemTask', ['CursorItemOptionTask', 'null'], CursorItemTask, Colors.Cyan);
  tasks.addTask('SelectedItemsTask', ['SelectedItemsOptionTask', 'ItemsOptionTask'], SelectedItemsTask, Colors.Cyan);
  tasks.addTask('CombinedNormalVisibilityItemsTask', ['OptionsTask'], DummyCombinedNormalVisibilityItemsTask, Colors.Cyan);

  tasks.addTask('FrameSizeTask', ['FrameOptionTask', 'ReadTemplatesTask', 'ScaleOptionTask'], FrameSizeTask, Colors.Navy);
  tasks.addTask('LevelTitleSizeTask', ['LevelTitlePlacementOptionTask', 'LevelAnnotationOptionTask', 'OrientationOptionTask', 'ScaleOptionTask'], LevelTitleSizeTask, Colors.Navy);
  tasks.addTask('CurrentControlSizeTask', ['OptionsTask'], DummyCurrentControlSizeTask, Colors.Cyan);
  tasks.addTask('ItemsPositionsTask', ['CurrentControlSizeTask', 'ScaleOptionTask', 'OrientationOptionTask', 'ItemsSizesOptionTask', 'ConnectorsOptionTask', 'VisualTreeOptionTask',
    'CreateLayoutsTreeTask',
    'ItemTemplateParamsTask',
    'CursorItemTask', 'CombinedNormalVisibilityItemsTask'], ItemsPositionsTask, Colors.Red);

  tasks.addTask('AlignDiagramTask', ['OrientationOptionTask', 'ItemsSizesOptionTask', 'VisualTreeOptionTask', 'ScaleOptionTask', 'CurrentControlSizeTask', 'null', 'ItemsPositionsTask'], AlignDiagramTask, Colors.Red);
  tasks.addTask('CreateTransformTask', ['OrientationOptionTask', 'ScaleOptionTask', 'AlignDiagramTask'], CreateTransformTask, Colors.Cyan);

  // Managers
  tasks.addTask('PaletteManagerTask', ['ConnectorsOptionTask', 'null'], PaletteManagerTask, Colors.Cyan);

  tasks.addTask('ApplyLayoutChangesTask', ['graphics', 'setLayout', 'ItemsSizesOptionTask', 'CurrentControlSizeTask', 'ScaleOptionTask', 'AlignDiagramTask', 'FrameSizeTask', 'LevelTitleSizeTask'], ApplyLayoutChangesTask, Colors.Green);
  tasks.addTask('ViewPortPlacementTask', ['ScaleOptionTask', 'CenterOnCursorTask', 'CreateTransformTask', 'ApplyLayoutChangesTask'], ViewPortPlacementTask, Colors.Green);  
  tasks.addTask('VerticalOffsetTask', ['ViewPortPlacementTask'], VerticalOffsetTask, Colors.Green);  

  tasks.addTask('LogicalLevelsPlacementTask', ['OrgTreeTask', 'VisualTreeTask', 'AlignDiagramTask'], OrgLogicalLevelsPlacementTask, Colors.Green);
  tasks.addTask('MergeLevelIntervalsTask', ['LevelAnnotationOptionTask', 'LogicalLevelsPlacementTask'], MergeLevelIntervalsTask, Colors.Green); 

  // Renders
  tasks.addTask('DrawBackgroundAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'BackgroundAnnotationOptionTask', 'VisualTreeTask', 'AlignDiagramTask'], DrawBackgroundAnnotationTask, Colors.Green);
  tasks.addTask('DrawBackgroundShapeAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'BackgroundShapeAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'background', 'DrawBackgroundAnnotationTask' /*dummy dependency enforeces drawing order */], DrawShapeAnnotationTask, Colors.Green);
  tasks.addTask('DrawBackgroundConnectorAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'BackgroundConnectorAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'CursorItemOptionTask', 'EndPointsOptionTask', 'EndPointTemplateTask', 'background', 'DrawBackgroundShapeAnnotationTask'], DrawConnectorAnnotationTask, Colors.Green);

  tasks.addTask('DrawTreeItemsTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'null',
    'ItemsSizesOptionTask',
    'CombinedContextsTask',
    'AlignDiagramTask', 'null',
    'ItemTemplateParamsTask',
    'CursorItemTask', 'SelectedItemsTask',
    'GroupTitleTemplateTask', 'CheckBoxTemplateTask', 'ButtonsTemplateTask',
    'DrawBackgroundConnectorAnnotationTask'
  ], DrawTreeItemsTask, Colors.Green);

  tasks.addTask('DrawBackgroundHighlightPathAnnotationTask', ['graphics', 'ConnectorsOptionTask', 'ForegroundHighlightPathAnnotationOptionTask', 'ConnectionsGraphTask', 'foreground', 'DrawTreeItemsTask'], DrawHighlightPathAnnotationTask, Colors.Cyan);
  tasks.addTask('DrawConnectorsTask', ['graphics', 'ConnectionsGraphTask', 'ConnectorsOptionTask', 'showElbowDots', 'PaletteManagerTask', 'DrawBackgroundHighlightPathAnnotationTask'], DrawConnectorsTask, Colors.Green);
  tasks.addTask('DrawForegroundHighlightPathAnnotationTask', ['graphics', 'ConnectorsOptionTask', 'BackgroundHighlightPathAnnotationOptionTask', 'ConnectionsGraphTask', 'background', 'DrawConnectorsTask'], DrawHighlightPathAnnotationTask, Colors.Cyan);

  tasks.addTask('DrawForegroundShapeAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'ForegroundShapeAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'foreground', 'DrawForegroundHighlightPathAnnotationTask'], DrawShapeAnnotationTask, Colors.Green);
  tasks.addTask('DrawForegroundConnectorAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'ForegroundConnectorAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'CursorItemOptionTask', 'EndPointsOptionTask', 'EndPointTemplateTask', 'foreground', 'DrawForegroundShapeAnnotationTask'], DrawConnectorAnnotationTask, Colors.Green);


  tasks.addTask('DrawCursorTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'CombinedContextsTask', 'AlignDiagramTask', 'ItemTemplateParamsTask', 'CursorItemTask', 'SelectedItemsTask', 'DrawForegroundConnectorAnnotationTask'], DrawCursorTask, Colors.Green);
  tasks.addTask('DrawHighlightTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'CombinedContextsTask', 'AlignDiagramTask', 'ItemTemplateParamsTask', 'HighlightItemTask', 'CursorItemTask', 'SelectedItemsTask', 'DrawCursorTask'], DrawHighlightTask, Colors.Green);

  tasks.addTask('DrawLevelAnnotationBackgroundTask', ['graphics', 'VerticalOffsetTask', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'LevelAnnotationOptionTask', 'MergeLevelIntervalsTask', 'LevelAnnotationTemplateTask'], DrawLevelAnnotationBackgroundTask, Colors.Green);
  tasks.addTask('DrawLevelAnnotationTitlesTask', ['graphics', 'VerticalOffsetTask', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'LevelAnnotationOptionTask', 'MergeLevelIntervalsTask', 'LevelAnnotationTemplateTask', 'LevelTitlePlacementOptionTask'], DrawLevelAnnotationTitlesTask, Colors.Green);

  return tasks;
}
