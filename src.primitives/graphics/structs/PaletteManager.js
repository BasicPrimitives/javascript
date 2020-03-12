primitives.common.PaletteManager = function (options, linesPalette) {
  this.palette = [];
  this.cursor = 0;

  var index, len;

  /* pallete based connectors */
  if (linesPalette.length === 0) {
    /* draw all extra as regular */
    this.palette = [new primitives.common.PaletteItem({
      lineColor: options.linesColor,
      lineWidth: options.linesWidth,
      lineType: options.linesType
    })];
    this.paletteLength = this.palette.length;

    this.regularIndex = 0;
  } else {
    for (index = 0, len = linesPalette.length; index < len; index += 1) {
      this.palette.push(new primitives.common.PaletteItem(linesPalette[index]));
    }
    this.paletteLength = this.palette.length;

    /* regular */
    this.palette.push(new primitives.common.PaletteItem({
      lineColor: options.linesColor,
      lineWidth: options.linesWidth,
      lineType: options.linesType
    }));
    this.regularIndex = this.palette.length - 1;
  }

  /* highlight */
  this.palette.push(new primitives.common.PaletteItem({
    lineColor: options.highlightLinesColor,
    lineWidth: options.highlightLinesWidth,
    lineType: options.highlightLinesType
  }));
  this.highlightIndex = this.palette.length - 1;
};

primitives.common.PaletteManager.prototype.selectPalette = function (index) {
  this.cursor = index % this.paletteLength;
};

primitives.common.PaletteManager.prototype.getPalette = function (connectorStyleType) {
  var index = null;
  switch (connectorStyleType) {
    case primitives.common.ConnectorStyleType.Regular:
      index = this.regularIndex;
      break;
    case primitives.common.ConnectorStyleType.Highlight:
      index = this.highlightIndex;
      break;
    case primitives.common.ConnectorStyleType.Extra:
      index = this.cursor;
      break;
  }
  return this.palette[index];
};