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
    graphics: null,
    controlSize: null,
  },
    _debug = false;

  function getOptions() {
    return _data.options;
  }

  function getGraphics() {
    return _data.graphics;
  }

  function setLayout(options) {
    var { graphics } = _data,
      { frameMousePanelRect, titlesMousePanelRect, scrollPanelRect, controlSize } = options;

    graphics.position("frameplaceholder", frameMousePanelRect.x, frameMousePanelRect.y, frameMousePanelRect.width, frameMousePanelRect.height );
    graphics.position("titlesplaceholder", titlesMousePanelRect.x, titlesMousePanelRect.y, titlesMousePanelRect.width, titlesMousePanelRect.height );
    graphics.position("placeholder", scrollPanelRect.x, scrollPanelRect.y, scrollPanelRect.width, scrollPanelRect.height);

    _data.controlSize = controlSize;
  }

  function _disableNotAvailableFunctionality() {
    /* disable functionality not available in PDF */
    _data.options.scale = 1;
    _data.options.showFrame = false;
    _data.options.hasButtons = Enabled.False;
    _data.options.pageFitMode = PageFitMode.AutoSize;
    _data.options.autoSizeMinimum = new Size(0, 0);
    _data.options.autoSizeMaximum = new Size(1000000, 1000000);
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
    _data.graphics.clean();

    _data.doc.restore();

    return new Size(_data.controlSize);
  }

  /**
   * Calculates size of the diagram required to render all nodes without truncation.
   * 
   * @returns {Size} Returns size of the diagram
   */
  function getSize() {
    _data.tasks = createTaskManager(getOptions, getGraphics, setLayout, templates);
    _data.graphics = new PdfGraphics(_data.doc);
    _data.graphics.debug = _debug;

    _disableNotAvailableFunctionality();

    _data.tasks.process('OptionsTask', 'ApplyLayoutChangesTask', _debug);
    _data.graphics.clean();
    
    return new Size(_data.controlSize);
  }

  return {
    draw: draw,
    getSize: getSize
  };
};
