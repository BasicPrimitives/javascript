import PaletteManager from '../../graphics/structs/PaletteManager';

export default function PaletteManagerTask(connectorsOptionTask, linePaletteOptionTask) {
  var _paletteManager;

  function process() {
    var linesPalette = [];
    if (linePaletteOptionTask != null) {
      linesPalette = linePaletteOptionTask.getOptions().linesPalette;
    }
    _paletteManager = new PaletteManager(connectorsOptionTask.getOptions(), linesPalette);

    return true;
  }

  function getPaletteManager() {
    return _paletteManager;
  }

  return {
    process: process,
    getPaletteManager: getPaletteManager
  };
};