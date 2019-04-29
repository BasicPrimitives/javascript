# Partner Item Types
In organizational structure we have situations when people share responsibilities, it is situation of co-CEO's.  So in order to show such org structure in regular hierarchy we add our second CEO item as child and set its type to Partner. Partner item shares its parent's children, so parent and partner have horizontal line connecting them visually into one group and their children connected to it.

Chart supports 3 types of partner types:

* GeneralPartner
* LimitedPartner
* AdviserPartner

They all share children and the difference is how they are connected to each other. The following example shows GeneralPartner which is connected to parent of its parent, so visually they are 100% equal on org chart.

For the sake of simplicity Partner restricted off having its own children by design, so if user defines children for partner, they auto converted into partner's assistants. 

Use ItemConfig.adviserPlacementType option to place partners to the left or right side of their parent;

## General Partner

[JavaScript](javascript.controls/CaseGeneralPartnerItemType.html)
[JQuery](jquery.widgets/CaseGeneralPartnerItemType.html)

## Limited Partner

Limited Partner is variation of GeneralPartner having no connection to its parent. It is only connected to shared with its parent children.
It can be placed on the left or right side of parent hierarchy. 

[JavaScript](javascript.controls/CaseLimitedPartnerItemType.html)
[JQuery](jquery.widgets/CaseLimitedPartnerItemType.html)

## Adviser Partner

Adviser Partner item type is a combination of Partner and Adviser types. It is horizontally connected to its parent like Adviser and at the same time it shares children of its parent like Partner.

[JavaScript](javascript.controls/CaseAdviserPartnerItemType.html)
[JQuery](jquery.widgets/CaseAdviserPartnerItemType.html)