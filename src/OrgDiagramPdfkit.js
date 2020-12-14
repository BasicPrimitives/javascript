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
export default function OrgDiagramPdfkit(options) {
  return BasePdfkitPlugin(options, OrgPdfkitTaskManagerFactory);
};
