import Size from './graphics/structs/Size';
import PdfGraphics from './graphics/PdfGraphics';
import { PageFitMode, Enabled } from './enums';
/**
 * Creates PDFKit Family Diagram Plugin
 * @class BasePdfkitPlugin
 * 
 * @param {object} options Family Diagram Configuration object
 * 
 * @returns {BasePdfkitPlugin} Returns reference to PDFKit Plugin instance.
 */
export default function BasePdfkitPlugin(options, createTaskManager, templates) {
  var _data = {
    doc: null,
    options: options,
    tasks: null,
    graphics: null
  },
    _scale,
    _debug = false;

  function getOptions() {
    return _data.options;
  }

  function getGraphics() {
    return _data.graphics;
  }

  function setLayout(options) {

  }

  function _disableNotAvailableFunctionality() {
    /* disable functionality not available in PDF */
    _data.options.hasButtons = Enabled.False;
    _data.options.pageFitMode = PageFitMode.AutoSize;
    _data.options.autoSizeMaximum = new Size(100000, 100000);
  }

  /**
   * Calculates size of the diagram required to render all nodes without truncation.
   * 
   * @param {object} doc PDFKit document
   * @param {number} positionX Diagram placement X coordinate
   * @param {number} positionY Diagram placement Y coordinate
   * @returns {Size} Returns size of the diagram
   */
  function draw(doc, positionX, positionY) {
    _data.doc = doc;

    _data.tasks = createTaskManager(getOptions, getGraphics, setLayout, templates);
    _data.graphics = new PdfGraphics(_data.doc);
    _data.graphics.debug = _debug;

    _disableNotAvailableFunctionality();

    _data.doc.save();

    _data.doc.translate(positionX, positionY);

    _data.tasks.process('OptionsTask', null, _debug);

    _data.doc.restore();

    var alignDiagramTask = _data.tasks.getTask("AlignDiagramTask");

    return new Size(alignDiagramTask.getContentSize());
  }

  /**
   * Calculates size of the diagram required to render all nodes without truncation.
   * 
   * @returns {Size} Returns size of the diagram
   */
  function getSize() {
    _data.tasks = createTaskManager(getOptions, getGraphics, setLayout, templates);

    _disableNotAvailableFunctionality();

    _data.tasks.process('OptionsTask', 'AlignDiagramTask', _debug);

    var alignDiagramTask = _data.tasks.getTask("AlignDiagramTask");

    return new Size(alignDiagramTask.getContentSize());
  }

  return {
    draw: draw,
    getSize: getSize
  };
};
