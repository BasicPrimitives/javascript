export default function CheckBoxTemplate(selectCheckBoxLabel) {
  var _checked = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAF/SURBVDhPpZM7rwFREMf/u4hEY5vVkigoSERiKwq1QqOh28R30QnFRqnSKHwFn0C37Sbi0SCE2KzE41wzd/feG48g91ftmdn5zznzkLLZrNhutzidTvgEv98PRVEgxeNx0e12EYvFcDweXfdjZFmGEIKDx+MxdF0HotGomEwmV/tnUAzFyqT8KrNHLpdDJpPBZrPh81UHLPAO7XYb6/Ua8/kcpmnC5/NBkqT3BJbLJRqNBgKBACqVCgqFAg6HA/veEiiVSlBVFZfLBZ1Ox7V+81KAMtPVV6sV+v2+a/2FBeg9RDqdhqZp/E1Mp1O0Wi32V6tVLuAtLEBvGw6HmM1m2O/3yOfz7CyXy4hEItz3ZrPJtr/8dIEKUiwWYRgGX3e32yGZTOJ8PnMBB4MBB9xy14VarcaZFosFQqEQHMdBvV5HIpFw/3gATZNlWTxdHr1eT4TDYZFKpVzLPRRDsU9HeTQaCdu23dM91wKzwNNlCgaDXINHW0pF95bpn+us4AsY2TIOZFyZ9AAAAABJRU5ErkJggg==',
    _unchecked = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAACjSURBVDhPrZNNCsQgDEY/f2q33sCCN+iNPJlXE2/gTtDiVBln1TJo+zZBJS+YELLvewkhIOeMETjnkFKCaK2LtRbbtiGl9H2+hlKKUkpLds7BGAMopYr3/rwfo+bUXFrN/yrfcXrQBDMwxkAImRfEGFucFnTeEdT/zNIEy7K0wyi/KfSGjPJoCp13BDM9EEK0eLtM67riOI7LLa0F+zI9XGeJDyTldfBA9FNyAAAAAElFTkSuQmCC';

  function template() {
    return {};
  }

  function getHashCode() {
    return 0;
  }

  function render(doc, position, data) {
    var image = data.isSelected ? _checked : _unchecked;

    doc.save();

    /* photo */
    doc.image(image, position.x, position.y);

    doc.font('Helvetica', 11)
      .text(selectCheckBoxLabel, position.x + 20, position.y + 4, {
        ellipsis: true,
        width: (position.width - 4),
        height: position.height,
        align: 'left'
      });

    doc.restore();
  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
};