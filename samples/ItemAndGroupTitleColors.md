# Item & group title colors

Item's title background color may be used for indicating the group of nodes in the diagram and may vary in a wide range of colors. At the same time, the title font color should always be readable on every background. So taking these considerations into account, the control has two options setting font color for node titles: `itemTitleFirstFontColor` and `itemTitleSecondFontColor`. The control selects the most readable font color using the `highestContrast` function.  It returns the highest contrast color from two on the given background color. See functions reference.

[JavaScript](javascript.controls/CaseItemAndGroupTitleColors.html)
[PDFKit](pdfkit.plugins/ItemAndGroupTitleColors.html)

![Screenshot](javascript.controls/__image_snapshots__/CaseItemAndGroupTitleColors-snap.png)