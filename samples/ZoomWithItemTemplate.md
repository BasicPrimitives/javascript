# Zoom using Item template
When we scale our diagram, the primary objective is to enlarge or downsize nodes to fit the chart into available screen space and overview its layout.
We design our components primarily for business applications, where usability requirements constrain text size. If the text is too small and unreadable, it is a UI bug. When we design our nodes templates for various zoom levels, we can change their size, but we have to keep minimal font size unchanged, so nodes become small and contain less text. The same happens when we increase nodes in size, we don't increase fonts endlessly. It is not needed. Instead, we pack more content into the template, so our nodes become more informative. 
Usage of custom node templates for various scales guarantees that users see node content, regardless of the zoom level. You design, tune and test templates for every zoom level individually.
You protect yourself against UX support tickets caused by misuse of the zoom. Users may accidentally scroll the mouse over the diagram and zoom it out into a meaningless graphics element. The user would not comprehend that it is the diagram on the screen anymore.
Scaling diagrams with custom templates is very similar to developing responsive web applications for desktop and mobile.  The screen space is so different that desktop application is not readable on mobile phone screen without adjustments. 

See item template use case for more details about templates usage.

[JavaScript](javascript.controls/CaseZoomWithItemTemplate.html)