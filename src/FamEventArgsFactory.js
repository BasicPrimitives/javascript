import FamEventArgs from './events/FamEventArgs';
import { getElementOffset } from './graphics/dom';
import Rect from './graphics/structs/Rect';

export default function FamEventArgsFactory(data, oldTreeItemId, newTreeItemId, name) {
  var result = new FamEventArgs(),
    combinedContextsTask = data.tasks.getTask("CombinedContextsTask"),
    alignDiagramTask = data.tasks.getTask("AlignDiagramTask"),
    logicalFamilyTask = data.tasks.getTask("LogicalFamilyTask"),
    oldItemConfig = combinedContextsTask.getConfig(oldTreeItemId),
    newItemConfig = combinedContextsTask.getConfig(newTreeItemId),
    family = logicalFamilyTask.getLogicalFamily(),
    itemPosition,
    offset,
    panelOffset;

  if (oldItemConfig && oldItemConfig.id != null) {
    result.oldContext = oldItemConfig;
  }

  if (newItemConfig && newItemConfig.id != null) {
    result.context = newItemConfig;

    family.loopParents(this, newItemConfig.id, function (itemid, item, levelIndex) {
      if (levelIndex > 0) {
        return family.BREAK;
      }
      result.parentItems.push(combinedContextsTask.getConfig(itemid));
    });

    family.loopChildren(this, newItemConfig.id, function (itemid, item, levelIndex) {
      if (levelIndex > 0) {
        return family.BREAK;
      }
      result.childrenItems.push(combinedContextsTask.getConfig(itemid));
    });

    panelOffset = getElementOffset(data.layout.mousePanel);
    offset = getElementOffset(data.layout.element);
    itemPosition = alignDiagramTask.getItemPosition(newTreeItemId);
    result.position = new Rect(itemPosition.actualPosition)
      .translate(panelOffset.left, panelOffset.top)
      .translate(-offset.left, -offset.top);
  }

  if (name != null) {
    result.name = name;
  }

  return result;
};