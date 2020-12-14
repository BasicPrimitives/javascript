import OrgEventArgs from './events/OrgEventArgs';
import Rect from './graphics/structs/Rect';
import { getElementOffset } from './graphics/dom';

export default function EventArgsFactory(data, oldTreeItemId, newTreeItemId, name) {
  var result = new OrgEventArgs(),
    combinedContextsTask = data.tasks.getTask("CombinedContextsTask"),
    alignDiagramTask = data.tasks.getTask("AlignDiagramTask"),
    oldItemConfig = combinedContextsTask.getConfig(oldTreeItemId),
    newItemConfig = combinedContextsTask.getConfig(newTreeItemId),
    itemPosition,
    actualPosition,
    offset,
    panelOffset;

  if (oldItemConfig && oldItemConfig.id != null) {
    result.oldContext = oldItemConfig;
  }

  if (newItemConfig && newItemConfig.id != null) {
    result.context = newItemConfig;

    if (newItemConfig.parent !== null) {
      result.parentItem = combinedContextsTask.getConfig(newItemConfig.parent);
    }

    panelOffset = getElementOffset(data.layout.mousePanel);
    offset = getElementOffset(data.layout.element);
    itemPosition = alignDiagramTask.getItemPosition(newTreeItemId),
      result.position = new Rect(itemPosition.actualPosition)
        .translate(panelOffset.left, panelOffset.top)
        .translate(-offset.left, -offset.top);
  }

  if (name != null) {
    result.name = name;
  }

  return result;
};
