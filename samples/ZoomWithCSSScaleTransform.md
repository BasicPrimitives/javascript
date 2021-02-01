# Zoom using CSS scale transform

The control supports scale option setting CSS scale transform of the control's content. It scales everything except scroll bars and correctly handles mouse event coordinates.

CSS scale transform produces unreadable text and corrupts graphics lines in some desktop browsers. It looks good on mobile devices. We suggest testing your diagram on various devices to ensure a consistent user experience.  

Use custom item templates for various zoom levels, so your application would be responsive regardless of available screen space and scale.

[JavaScript](javascript.controls/CaseZoomWithCSSScaleTransform.html)
