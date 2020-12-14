import BasePdfkitPlugin from './BasePdfkitPlugin';
import FamPdfkitTaskManagerFactory from './FamPdfkitTaskManagerFactory';
/**
 * Creates PDFKit Family Diagram Plugin
 * @class FamDiagramPdfkit
 * 
 * @param {FamConfig} options Organizational Chart Configuration object
 * 
 * @returns {FamDiagramPdfkit} Returns reference to Family Diagram PDFKit renderer instance.
 */
export default function FamDiagramPdfkit(options) {
  return BasePdfkitPlugin(options, FamPdfkitTaskManagerFactory);
};
