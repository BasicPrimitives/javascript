import AnnotationLabelTemplate from './templates/html/AnnotationLabelTemplate';
import ButtonsTemplate from './templates/html/ButtonsTemplate';
import CheckBoxTemplate from './templates/html/CheckBoxTemplate';
import CursorTemplate from './templates/html/CursorTemplate';
import DotHighlightTemplate from './templates/html/DotHighlightTemplate';
import GroupTitleTemplate from './templates/html/GroupTitleTemplate';
import HighlightTemplate from './templates/html/HighlightTemplate';
import ItemTemplate from './templates/html/ItemTemplate';
import UserTemplate from './templates/html/UserTemplate';
import LabelAnnotationTemplate from './templates/html/LabelAnnotationTemplate';
import LevelTitleTemplate from './templates/html/LevelTitleTemplate';
import LevelBackgroundTemplate from './templates/html/LevelBackgroundTemplate';

import OrgTaskManagerFactory from './OrgTaskManagerFactory';
import OrgEventArgsFactory from './OrgEventArgsFactory';
import BaseControl from './BaseControl';
/**
 * Creates JavaScript Organizational Chart Control
 * @class Control
 * @param {object} element Reference to placeholder `div` element in the DOM. The control renders diagram content
 * inside of that div element and adds events listeners.
 * @param {OrgConfig} options Organizational Chart Configuration object
 * 
 * @returns {OrgDiagram} Returns reference to Organizational Chart control. Since control adds event listeners bound
 * to its contents, call `destroy` method to clean up everything.
 */
export default function OrgDiagram(element, options, templates) {
  return BaseControl(element, options, OrgTaskManagerFactory, OrgEventArgsFactory, {
    AnnotationLabelTemplate,
    ButtonsTemplate,
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
