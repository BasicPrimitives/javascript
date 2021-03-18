import Rect from '../../../graphics/structs/Rect';
import Size from '../../../graphics/structs/Size';
import { Visibility, OrientationType, AdviserPlacementType } from '../../../enums';
import TreeItemPosition from '../../../models/TreeItemPosition';

export default function ItemLayout(treeItem) {
    this.treeItem = treeItem;
}

ItemLayout.prototype.measure = function (levelVisibility, isCursor, isSelected, treeItemTemplate, treeItemsPositions, options) {
    var templateConfig,
        size,
        contentPosition;
    var { orientationType, checkBoxPanelSize, buttonsPanelSize, groupTitlePanelSize, groupTitlePlacementType } = options;

    var treeItemVisibility = (isSelected || isCursor) ? Visibility.Normal : (!this.treeItem.isVisible ? Visibility.Invisible : Visibility.Auto);
    var actualVisibility = (treeItemVisibility === Visibility.Auto) ? levelVisibility : treeItemVisibility;        
    switch (actualVisibility) {
        case Visibility.Normal:
            templateConfig = treeItemTemplate.template.templateConfig;
            size = new Size(templateConfig.itemSize);
            contentPosition = new Rect(0, 0, size.width, size.height);
            if (isCursor) {
                size.height += templateConfig.cursorPadding.top + templateConfig.cursorPadding.bottom;
                size.width += templateConfig.cursorPadding.left + templateConfig.cursorPadding.right;
                contentPosition.x = templateConfig.cursorPadding.left;
                contentPosition.y = templateConfig.cursorPadding.top;
            }
            if (treeItemTemplate.hasSelectorCheckbox) {
                size.height += checkBoxPanelSize;
            }
            if (treeItemTemplate.hasButtons) {
                size.width += buttonsPanelSize;
                switch (groupTitlePlacementType) {
                    case AdviserPlacementType.Right:
                        contentPosition.x += buttonsPanelSize;
                        break;
                }
            }
            if (treeItemTemplate.hasGroupTitle) {
                size.width += groupTitlePanelSize;
                switch (groupTitlePlacementType) {
                    case AdviserPlacementType.Right:
                        break;
                    default:
                        contentPosition.x += groupTitlePanelSize;
                        break;
                }
            }
        break;
        case Visibility.Dot:
            templateConfig = treeItemTemplate.template.templateConfig;
            size = new Size(templateConfig.minimizedItemSize);
        break;
        case Visibility.Line:
        case Visibility.Invisible:
            size = new Size();
        break;
    }

    switch (orientationType) {
        case OrientationType.Left:
        case OrientationType.Right:
            size.invert();
        break;
    }

    var treeItemPosition = new TreeItemPosition();
    treeItemPosition.actualVisibility = actualVisibility;
    treeItemPosition.actualSize = size;
    treeItemPosition.contentPosition = contentPosition;
    return treeItemPosition;
};

ItemLayout.prototype.arrange = function (thisArg, position, layoutDirection, treeItemsPositions, options, onItemPositioned) {
    /* no child layouts */
}