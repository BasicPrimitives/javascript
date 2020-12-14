import GroupTitleTemplate from './GroupTitleTemplate';
import { TextOrientationType, VerticalAlignmentType, Colors, HorizontalAlignmentType }  from '../../enums';

test('GroupTitleTemplate', () => {
    var options = {
        groupTitleOrientation: TextOrientationType.Horizontal, 
        groupTitleHorizontalAlignment: HorizontalAlignmentType.Center, 
        groupTitleVerticalAlignment: VerticalAlignmentType.Middle,
        groupTitleFontSize: "12px",
        groupTitleFontFamily: "Arial",
        groupTitleColor: Colors.RoyalBlue,
        groupTitleFontWeight: "normal",
        groupTitleFontStyle: "normal"
    }
    expect(new GroupTitleTemplate(options) != null).toBe(true);
});