import AnnotationLabelTemplate from './templates/pdf/AnnotationLabelTemplate';
import CheckBoxTemplate from './templates/pdf/CheckBoxTemplate';
import CursorTemplate from './templates/pdf/CursorTemplate';
import DummyTemplate from './templates/pdf/DummyTemplate';
import GroupTitleTemplate from './templates/pdf/GroupTitleTemplate';
import HighlightTemplate from './templates/pdf/HighlightTemplate';
import ItemTemplate from './templates/pdf/ItemTemplate';
import UserTemplate from './templates/pdf/UserTemplate';
import LabelAnnotationTemplate from './templates/pdf/LabelAnnotationTemplate';
import LevelTitleTemplate from './templates/pdf/LevelTitleTemplate';
import LevelBackgroundTemplate from './templates/pdf/LevelBackgroundTemplate';

import BasePdfkitPlugin from './BasePdfkitPlugin';
import OrgPdfkitTaskManagerFactory from './OrgPdfkitTaskManagerFactory';

/**
 * Creates PDFKit Organizational Chart Plugin
 * @class OrgDiagramPdfkit
 * 
 * @param {OrgConfig} options Organizational Chart Configuration object
 * 
 * @returns {OrgDiagramPdfkit} Returns reference to Organizational Diagram PDFKit renderer instance.
 */
export default function OrgDiagramPdfkit(options, templates) {
  return BasePdfkitPlugin(options, OrgPdfkitTaskManagerFactory, {
    AnnotationLabelTemplate,
    ButtonsTemplate: DummyTemplate,
    CheckBoxTemplate,
    CursorTemplate,
    DotHighlightTemplate: DummyTemplate,
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
