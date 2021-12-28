export var GroupType = {
    Items: 0,
    Assistants: 1,
    RowChildren: 2,
    Children: 3
};

export var RowType = {
    Items: 0,
    Advisers: 1,
    SubAdvisers: 2,
    Assistants: 3,
    SubAssistants: 4,
    RowChildren: 5,
    Children: 6
  };

export var RowTypeToGroupTypeMap = {};
RowTypeToGroupTypeMap[RowType.Items] = GroupType.Items;
RowTypeToGroupTypeMap[RowType.Advisers] = GroupType.Items;
RowTypeToGroupTypeMap[RowType.SubAdvisers] = GroupType.Items;
RowTypeToGroupTypeMap[RowType.Assistants] = GroupType.Assistants;
RowTypeToGroupTypeMap[RowType.SubAssistants] = GroupType.Assistants;
RowTypeToGroupTypeMap[RowType.RowChildren] = GroupType.RowChildren;
RowTypeToGroupTypeMap[RowType.Children] = GroupType.Children;