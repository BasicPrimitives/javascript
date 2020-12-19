# Zoom using CSS scale transform

The control supports scale option setting CSS scale transform of the control's content. It scales everything except scroll bars and properly handles mouse event coordinates.

CSS scale transform produces unreadable text and corrupted lines in desktop browsers, it looks good only in mobile browsers, so we recommend to imitate zoom with collection of item templates of various sizes. See Zoom using Item template sample. In that case you can better control quality of your items at various zoom levels and do graceful content degradation.

[JavaScript](javascript.controls/CaseZoomWithCSSScaleTransform.html)
