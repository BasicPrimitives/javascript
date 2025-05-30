import AnnotationLabelTemplate from './templates/html/AnnotationLabelTemplate';
import EndPointTemplate from './templates/html/EndPointTemplate';
import ButtonsTemplate from './templates/html/ButtonsTemplate';
import CustomRenderTemplate from './templates/html/CustomRenderTemplate';
import CheckBoxTemplate from './templates/html/CheckBoxTemplate';
import CursorTemplate from './templates/html/CursorTemplate';
import DotHighlightTemplate from './templates/html/DotHighlightTemplate';
import GroupTitleTemplate from './templates/html/GroupTitleTemplate';
import HighlightTemplate from './templates/html/HighlightTemplate';
import ItemTemplate from './templates/html/ItemTemplate';
import UserTemplate from './templates/html/UserTemplate';
import LevelTitleTemplate from './templates/html/LevelTitleTemplate';
import LevelBackgroundTemplate from './templates/html/LevelBackgroundTemplate';
import LabelAnnotationTemplate from './templates/html/LabelAnnotationTemplate';

import BaseControl from './BaseControl';
import FamTaskManagerFactory from './FamTaskManagerFactory';
import FamEventArgsFactory from './FamEventArgsFactory';
/**
* Creates JavaScript Family Diagram Control
 * @class Control
 * @param {object} element Reference to placeholder `div` element in the DOM. The control renders diagram content
 * inside of that div element and adds events listeners.
 * @param {FamConfig} options Family Diagram Configuration object
 * 
 * @returns {FamDiagram} Returns reference to family diagram control. Since control adds event listeners bound
 * to its contents, call `destroy` method to clean up everything.
 */
export default function FamDiagram(element, options, templates) {
  return BaseControl(element, options, FamTaskManagerFactory, FamEventArgsFactory, {
    AnnotationLabelTemplate,
    EndPointTemplate,
    ButtonsTemplate,
    CustomRenderTemplate,
    CheckBoxTemplate,
    CursorTemplate,
    DotHighlightTemplate,
    GroupTitleTemplate,
    HighlightTemplate,
    ItemTemplate,
    UserTemplate,
    LevelTitleTemplate,
    LevelBackgroundTemplate,
    /* FamDiagram specific templates */
    LabelAnnotationTemplate,
    ...templates
  });
};
