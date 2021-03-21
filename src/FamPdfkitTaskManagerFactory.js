import FamConfig from './configs/FamConfig';
import FamItemConfig from './configs/FamItemConfig';
import TemplateConfig from './configs/TemplateConfig';
import PaletteItemConfig from './configs/PaletteItemConfig';
import BackgroundAnnotationConfig from './configs/BackgroundAnnotationConfig';
import ConnectorAnnotationConfig from './configs/ConnectorAnnotationConfig';
import HighlightPathAnnotationConfig from './configs/HighlightPathAnnotationConfig';
import ShapeAnnotationConfig from './configs/ShapeAnnotationConfig';
import LabelAnnotationConfig from './configs/LabelAnnotationConfig';
import LevelAnnotationConfig from './configs/LevelAnnotationConfig';

import { ZOrderType, Colors } from './enums';

// reused tasks from org diagram
import CalloutOptionTask from './tasks/options/CalloutOptionTask';
import ConnectorsOptionTask from './tasks/options/ConnectorsOptionTask';
import FamItemsOptionTask from './tasks/options/FamItemsOptionTask';
import ItemsSizesOptionTask from './tasks/options/ItemsSizesOptionTask';
import TemplatesOptionTask from './tasks/options/TemplatesOptionTask';
import OrientationOptionTask from './tasks/options/OrientationOptionTask';
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

import ReadTemplatesTask from './tasks/templates/ReadTemplatesTask';
import ItemTemplateParamsTask from './tasks/templates/ItemTemplateParamsTask';
import GroupTitleTemplateTask from './tasks/templates/GroupTitleTemplateTask';
import CheckBoxTemplateTask from './tasks/templates/CheckBoxTemplateTask';
import ButtonsTemplateTask from './tasks/templates/ButtonsTemplateTask';
import AnnotationLabelTemplateTask from './tasks/templates/AnnotationLabelTemplateTask';
import LevelAnnotationTemplateTask from './tasks/templates/LevelAnnotationTemplateTask';

import ConnectionsGraphTask from './tasks/transformations/ConnectionsGraphTask';
import HighlightItemTask from './tasks/transformations/selection/HighlightItemTask';
import CursorItemTask from './tasks/transformations/selection/CursorItemTask';
import SelectedItemsTask from './tasks/transformations/selection/SelectedItemsTask';

import DummyCombinedNormalVisibilityItemsTask from './tasks/transformations/selection/DummyCombinedNormalVisibilityItemsTask';

import FrameSizeTask from './tasks/layout/FrameSizeTask';
import LevelTitleSizeTask from './tasks/layout/LevelTitleSizeTask';
import ApplyLayoutChangesTask from './tasks/layout/ApplyLayoutChangesTask';
import DummyCurrentControlSizeTask from './tasks/layout/DummyCurrentControlSizeTask';
import AlignDiagramTask from './tasks/layout/AlignDiagramTask';
import CreateTransformTask from './tasks/layout/CreateTransformTask';
import PaletteManagerTask from './tasks/transformations/PaletteManagerTask';

import ViewPortPlacementTask from './tasks/layout/ViewPortPlacementTask';
import VerticalOffsetTask from './tasks/layout/VerticalOffsetTask';

import FamLogicalLevelsPlacementTask from './tasks/layout/FamLogicalLevelsPlacementTask';
import MergeLevelIntervalsTask from './tasks/layout/MergeLevelIntervalsTask';

import DrawHighlightPathAnnotationTask from './tasks/renders/DrawHighlightPathAnnotationTask';
import DrawBackgroundAnnotationTask from './tasks/renders/DrawBackgroundAnnotationTask';
import DrawConnectorAnnotationTask from './tasks/renders/DrawConnectorAnnotationTask';
import DrawShapeAnnotationTask from './tasks/renders/DrawShapeAnnotationTask';
import DrawCursorTask from './tasks/renders/DrawCursorTask';
import DrawHighlightTask from './tasks/renders/DrawHighlightTask';
import DrawTreeItemsTask from './tasks/renders/DrawTreeItemsTask';
import DrawConnectorsTask from './tasks/renders/DrawConnectorsTask';

import DrawLevelAnnotationTitlesTask from './tasks/renders/DrawLevelAnnotationTitlesTask';
import DrawLevelAnnotationBackgroundTask from './tasks/renders/DrawLevelAnnotationBackgroundTask';

// family diagram specific tasks
import OptionsTask from './tasks/options/OptionsTask';
import VisualTreeOptionTask from './tasks/options/FamVisualTreeOptionTask';
import HideGrandParentsConnectorsOptionTask from './tasks/options/HideGrandParentsConnectorsOptionTask';
import ExtractNestedLayoutsOptionTask from './tasks/options/ExtractNestedLayoutsOptionTask';
import NormalizeOptionTask from './tasks/options/NormalizeOptionTask';
import OrderFamilyNodesOptionTask from './tasks/options/OrderFamilyNodesOptionTask';
import LinePaletteOptionTask from './tasks/options/LinePaletteOptionTask';
import UserDefinedNodesOrderTask from './tasks/transformations/UserDefinedNodesOrderTask';
import LogicalFamilyTask from './tasks/transformations/LogicalFamilyTask';
import RemoveLoopsTask from './tasks/transformations/RemoveLoopsTask';
import LabelAnnotationOptionTask from './tasks/options/annotations/LabelAnnotationOptionTask';
import LabelAnnotationTemplateOptionTask from './tasks/options/annotations/LabelAnnotationTemplateOptionTask';
import LabelAnnotationPlacementOptionTask from './tasks/options/annotations/LabelAnnotationPlacementOptionTask';

import AddLabelAnnotationsTask from './tasks/transformations/AddLabelAnnotationsTask';
import HideGrandParentsConnectorsTask from './tasks/transformations/HideGrandParentsConnectorsTask';
import BindFamilyConnectorsTask from './tasks/transformations/BindFamilyConnectorsTask';
import ExtractNestedLayoutsTask from './tasks/transformations/ExtractNestedLayoutsTask';
import NormalizeLogicalFamilyTask from './tasks/transformations/NormalizeLogicalFamilyTask';
import OrderFamilyNodesTask from './tasks/transformations/OrderFamilyNodesTask';
import LabelAnnotationTemplateParamsTask from './tasks/templates/LabelAnnotationTemplateParamsTask';
import CombinedTemplateParamsTask from './tasks/templates/CombinedTemplateParamsTask';
import CreateLayoutsTreeTask from './tasks/transformations/CreateLayoutsTreeTask';
import ItemsPositionsTask from './tasks/transformations/FamItemsPositionsTask';

import TaskManager from './managers/TaskManager';

export default function FamPdfkitTaskManagerFactory(getOptions, getGraphics, setLayout, templates) {
  var tasks = new TaskManager();

  // Dependencies
  tasks.addDependency('options', getOptions);
  tasks.addDependency('graphics', getGraphics);
  tasks.addDependency('setLayout', setLayout);
  tasks.addDependency('templates', templates);

  tasks.addDependency('defaultConfig', new FamConfig());
  tasks.addDependency('defaultItemConfig', new FamItemConfig());
  tasks.addDependency('defaultTemplateConfig', new TemplateConfig());
  tasks.addDependency('defaultPaletteItemConfig', new PaletteItemConfig());

  tasks.addDependency('defaultBackgroundAnnotationConfig', new BackgroundAnnotationConfig());
  tasks.addDependency('defaultConnectorAnnotationConfig', new ConnectorAnnotationConfig());
  tasks.addDependency('defaultHighlightPathAnnotationConfig', new HighlightPathAnnotationConfig());
  tasks.addDependency('defaultShapeAnnotationConfig', new ShapeAnnotationConfig());
  tasks.addDependency('defaultLabelAnnotationConfig', new LabelAnnotationConfig());
  tasks.addDependency('defaultLevelAnnotationConfig', new LevelAnnotationConfig());

  tasks.addDependency('isFamilyChartMode', true);/* in regular org diagram we hide branch if it contains only invisible nodes, 
  in the family chart we use invisible items to draw connectors across multiple levels */
  tasks.addDependency('showElbowDots', true);/* in regular org chart we don;t have situations when connector lines cross, but we have such situations in 
  family tree so we need extra visual attribute to distinguish intersections between connectors */
  tasks.addDependency('null', null);
  tasks.addDependency('foreground', ZOrderType.Foreground);
  tasks.addDependency('background', ZOrderType.Background);

  // Options
  tasks.addTask('OptionsTask', ['options'], OptionsTask, Colors.Black);

  tasks.addTask('CalloutOptionTask', ['OptionsTask', 'defaultConfig', 'defaultItemConfig'], CalloutOptionTask, Colors.Navy);
  tasks.addTask('ConnectorsOptionTask', ['OptionsTask', 'defaultConfig'], ConnectorsOptionTask, Colors.Navy);
  tasks.addTask('ItemsOptionTask', ['OptionsTask', 'defaultItemConfig'], FamItemsOptionTask, Colors.Navy);
  tasks.addTask('ItemsSizesOptionTask', ['OptionsTask', 'defaultConfig', 'defaultItemConfig'], ItemsSizesOptionTask, Colors.Navy);
  tasks.addTask('TemplatesOptionTask', ['OptionsTask', 'defaultConfig', 'defaultTemplateConfig'], TemplatesOptionTask, Colors.Navy);
  tasks.addTask('OrientationOptionTask', ['OptionsTask', 'defaultConfig'], OrientationOptionTask, Colors.Navy);
  tasks.addTask('VisualTreeOptionTask', ['OptionsTask', 'defaultConfig'], VisualTreeOptionTask, Colors.Navy);
  tasks.addTask('HideGrandParentsConnectorsOptionTask', ['OptionsTask', 'defaultConfig'], HideGrandParentsConnectorsOptionTask, Colors.Navy);
  tasks.addTask('ExtractNestedLayoutsOptionTask', ['OptionsTask', 'defaultConfig', 'defaultItemConfig'], ExtractNestedLayoutsOptionTask, Colors.Navy)
  tasks.addTask('NormalizeOptionTask', ['OptionsTask', 'defaultConfig'], NormalizeOptionTask, Colors.Navy);
  tasks.addTask('OrderFamilyNodesOptionTask', ['OptionsTask', 'defaultConfig', 'defaultItemConfig'], OrderFamilyNodesOptionTask, Colors.Navy);
  tasks.addTask('LinePaletteOptionTask', ['OptionsTask', 'defaultPaletteItemConfig'], LinePaletteOptionTask, Colors.Navy);

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
  tasks.addTask('UserDefinedNodesOrderTask', ['OrderFamilyNodesOptionTask', 'defaultItemConfig'], UserDefinedNodesOrderTask, Colors.Red);

  tasks.addTask('LogicalFamilyTask', ['ItemsOptionTask'], LogicalFamilyTask, Colors.Cyan);

  tasks.addTask('LabelAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'LogicalFamilyTask', 'defaultLabelAnnotationConfig'], LabelAnnotationOptionTask, Colors.Navy);
  tasks.addTask('LabelAnnotationTemplateOptionTask', ['LabelAnnotationOptionTask', 'defaultLabelAnnotationConfig'], LabelAnnotationTemplateOptionTask, Colors.Navy);
  tasks.addTask('LabelAnnotationPlacementOptionTask', ['LabelAnnotationOptionTask', 'defaultLabelAnnotationConfig'], LabelAnnotationPlacementOptionTask, Colors.Navy);

  tasks.addTask('CombinedContextsTask', ['ItemsOptionTask', 'LabelAnnotationOptionTask'], CombinedContextsTask, Colors.Cyan);

  tasks.addTask('AddLabelAnnotationsTask', ['LabelAnnotationPlacementOptionTask', 'LogicalFamilyTask'], AddLabelAnnotationsTask, Colors.Red);
  tasks.addTask('RemoveLoopsTask', ['AddLabelAnnotationsTask'], RemoveLoopsTask, Colors.Red);
  tasks.addTask('HideGrandParentsConnectorsTask', ['HideGrandParentsConnectorsOptionTask', 'RemoveLoopsTask'], HideGrandParentsConnectorsTask, Colors.Red);
  tasks.addTask('BindFamilyConnectorsTask', ['HideGrandParentsConnectorsTask'], BindFamilyConnectorsTask, Colors.Red);  
  tasks.addTask('ExtractNestedLayoutsTask', ['ExtractNestedLayoutsOptionTask', 'BindFamilyConnectorsTask'], ExtractNestedLayoutsTask, Colors.Red);
  tasks.addTask('NormalizeLogicalFamilyTask', ['NormalizeOptionTask', 'ExtractNestedLayoutsTask'], NormalizeLogicalFamilyTask, Colors.Red);
  tasks.addTask('OrderFamilyNodesTask', ['OrderFamilyNodesOptionTask', 'UserDefinedNodesOrderTask', 'NormalizeLogicalFamilyTask'], OrderFamilyNodesTask, Colors.Red);
  tasks.addTask('CreateLayoutsTreeTask', ['OrderFamilyNodesTask', 'ExtractNestedLayoutsTask'], CreateLayoutsTreeTask, Colors.Red);

  // Transformations / Templates
  tasks.addTask('ReadTemplatesTask', ['TemplatesOptionTask', 'templates'], ReadTemplatesTask, Colors.Cyan);
  tasks.addTask('ItemTemplateParamsTask', ['ItemsSizesOptionTask', 'CursorItemOptionTask', 'ReadTemplatesTask'], ItemTemplateParamsTask, Colors.Cyan);

  tasks.addTask('LabelAnnotationTemplateParamsTask', ['ItemsSizesOptionTask', 'LabelAnnotationTemplateOptionTask', 'ReadTemplatesTask'], LabelAnnotationTemplateParamsTask, Colors.Cyan);
  tasks.addTask('CombinedTemplateParamsTask', ['ItemTemplateParamsTask', 'LabelAnnotationTemplateParamsTask'], CombinedTemplateParamsTask, Colors.Cyan);

  tasks.addTask('GroupTitleTemplateTask', ['TemplatesOptionTask', 'templates'], GroupTitleTemplateTask, Colors.Cyan);
  tasks.addTask('CheckBoxTemplateTask', ['ItemsSizesOptionTask', 'templates'], CheckBoxTemplateTask, Colors.Cyan);
  tasks.addTask('ButtonsTemplateTask', ['ItemsSizesOptionTask', 'templates'], ButtonsTemplateTask, Colors.Cyan);
  tasks.addTask('AnnotationLabelTemplateTask', ['ItemsOptionTask', 'templates'], AnnotationLabelTemplateTask, Colors.Cyan);
  tasks.addTask('LevelAnnotationTemplateTask', ['OrientationOptionTask', 'LevelTitleTemplateOptionTask', 'templates'], LevelAnnotationTemplateTask, Colors.Cyan);

  tasks.addTask('ConnectionsGraphTask', ['graphics', 'CreateTransformTask', 'ConnectorsOptionTask', 'OrderFamilyNodesTask', 'ExtractNestedLayoutsTask', 'AlignDiagramTask', 'RemoveLoopsTask'], ConnectionsGraphTask, Colors.Cyan);
 
  // Transformations/Selections
  tasks.addTask('HighlightItemTask', ['HighlightItemOptionTask', 'null'], HighlightItemTask, Colors.Cyan);

  tasks.addTask('CursorItemTask', ['CursorItemOptionTask', 'null'], CursorItemTask, Colors.Cyan);
  tasks.addTask('SelectedItemsTask', ['SelectedItemsOptionTask', 'ItemsOptionTask'], SelectedItemsTask, Colors.Cyan);

  tasks.addTask('CombinedNormalVisibilityItemsTask', ['OptionsTask'], DummyCombinedNormalVisibilityItemsTask, Colors.Cyan);

  tasks.addTask('FrameSizeTask', ['FrameOptionTask', 'ReadTemplatesTask', 'ScaleOptionTask'], FrameSizeTask, Colors.Navy);
  tasks.addTask('LevelTitleSizeTask', ['LevelTitlePlacementOptionTask', 'LevelAnnotationOptionTask', 'OrientationOptionTask', 'ScaleOptionTask'], LevelTitleSizeTask, Colors.Navy);
  tasks.addTask('CurrentControlSizeTask', ['OptionsTask'], DummyCurrentControlSizeTask, Colors.Cyan);

  tasks.addTask('ItemsPositionsTask', ['CurrentControlSizeTask', 'ScaleOptionTask', 'OrientationOptionTask', 'ItemsSizesOptionTask', 'ConnectorsOptionTask',
    'OrderFamilyNodesOptionTask', 'CreateLayoutsTreeTask',
    'CombinedTemplateParamsTask',
    'CursorItemTask', 'CombinedNormalVisibilityItemsTask'], ItemsPositionsTask, Colors.Red);

  tasks.addTask('AlignDiagramTask', ['OrientationOptionTask', 'ItemsSizesOptionTask', 'VisualTreeOptionTask', 'ScaleOptionTask', 'CurrentControlSizeTask', 'null', 'ItemsPositionsTask', 'isFamilyChartMode'], AlignDiagramTask, Colors.Red);
  tasks.addTask('CreateTransformTask', ['OrientationOptionTask', 'AlignDiagramTask'], CreateTransformTask, Colors.Cyan);

  // Managers
  tasks.addTask('PaletteManagerTask', ['ConnectorsOptionTask', 'LinePaletteOptionTask'], PaletteManagerTask, Colors.Cyan);

  tasks.addTask('ApplyLayoutChangesTask', ['graphics', 'setLayout', 'ItemsSizesOptionTask', 'CurrentControlSizeTask', 'ScaleOptionTask', 'AlignDiagramTask', 'FrameSizeTask', 'LevelTitleSizeTask'], ApplyLayoutChangesTask, Colors.Green);
  tasks.addTask('ViewPortPlacementTask', ['ScaleOptionTask', 'CenterOnCursorTask', 'CreateTransformTask', 'ApplyLayoutChangesTask'], ViewPortPlacementTask, Colors.Green);  
  tasks.addTask('VerticalOffsetTask', ['ViewPortPlacementTask'], VerticalOffsetTask, Colors.Green);  

  tasks.addTask('LogicalLevelsPlacementTask', ['OrderFamilyNodesTask', 'AlignDiagramTask'], FamLogicalLevelsPlacementTask, Colors.Green);
  tasks.addTask('MergeLevelIntervalsTask', ['LevelAnnotationOptionTask', 'LogicalLevelsPlacementTask'], MergeLevelIntervalsTask, Colors.Green); 

  // Renders
  tasks.addTask('DrawBackgroundAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'BackgroundAnnotationOptionTask', 'LogicalFamilyTask', 'AlignDiagramTask'], DrawBackgroundAnnotationTask, Colors.Green);
  tasks.addTask('DrawBackgroundShapeAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'BackgroundShapeAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'background', 'DrawBackgroundAnnotationTask'], DrawShapeAnnotationTask, Colors.Green);
  tasks.addTask('DrawBackgroundConnectorAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'BackgroundConnectorAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'background', 'DrawBackgroundShapeAnnotationTask'], DrawConnectorAnnotationTask, Colors.Green);

  tasks.addTask('DrawBackgroundHighlightPathAnnotationTask', ['graphics', 'ConnectorsOptionTask', 'ForegroundHighlightPathAnnotationOptionTask', 'ConnectionsGraphTask', 'foreground', 'DrawBackgroundConnectorAnnotationTask'], DrawHighlightPathAnnotationTask, Colors.Cyan);
  tasks.addTask('DrawConnectorsTask', ['graphics', 'ConnectionsGraphTask', 'ConnectorsOptionTask', 'showElbowDots', 'PaletteManagerTask', 'DrawBackgroundHighlightPathAnnotationTask'], DrawConnectorsTask, Colors.Green);
  tasks.addTask('DrawForegroundHighlightPathAnnotationTask', ['graphics', 'ConnectorsOptionTask', 'BackgroundHighlightPathAnnotationOptionTask', 'ConnectionsGraphTask', 'background', 'DrawConnectorsTask'], DrawHighlightPathAnnotationTask, Colors.Cyan);

  tasks.addTask('DrawTreeItemsTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'null',
    'ItemsSizesOptionTask',
    'CombinedContextsTask',
    'AlignDiagramTask', 'null',
    'CombinedTemplateParamsTask',
    'CursorItemTask', 'SelectedItemsTask',
    'GroupTitleTemplateTask', 'CheckBoxTemplateTask', 'ButtonsTemplateTask',
    'DrawForegroundHighlightPathAnnotationTask'
  ], DrawTreeItemsTask, Colors.Green);

  tasks.addTask('DrawCursorTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'CombinedContextsTask', 'AlignDiagramTask', 'CombinedTemplateParamsTask', 'CursorItemTask', 'SelectedItemsTask', 'DrawTreeItemsTask'], DrawCursorTask, Colors.Green);
  tasks.addTask('DrawHighlightTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'CombinedContextsTask', 'AlignDiagramTask', 'CombinedTemplateParamsTask', 'HighlightItemTask', 'CursorItemTask', 'SelectedItemsTask', 'DrawCursorTask'], DrawHighlightTask, Colors.Green);

  tasks.addTask('DrawForegroundShapeAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'ForegroundShapeAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'foreground', 'DrawHighlightTask'], DrawShapeAnnotationTask, Colors.Green);
  tasks.addTask('DrawForegroundConnectorAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'ForegroundConnectorAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'foreground', 'DrawForegroundShapeAnnotationTask'], DrawConnectorAnnotationTask, Colors.Green);

  tasks.addTask('DrawLevelAnnotationBackgroundTask', ['graphics', 'VerticalOffsetTask', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'LevelAnnotationOptionTask', 'MergeLevelIntervalsTask', 'LevelAnnotationTemplateTask'], DrawLevelAnnotationBackgroundTask, Colors.Green);
  tasks.addTask('DrawLevelAnnotationTitlesTask', ['graphics', 'VerticalOffsetTask', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'LevelAnnotationOptionTask', 'MergeLevelIntervalsTask', 'LevelAnnotationTemplateTask', 'LevelTitlePlacementOptionTask'], DrawLevelAnnotationTitlesTask, Colors.Green);

  return tasks;
}