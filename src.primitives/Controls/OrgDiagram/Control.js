/**
 * Creates JavaScript Organizational Chart Control
 * 
 * @param {object} element Reference to placeholder `div` element in the DOM. The control renders diagram content
 * inside of that div element and adds events listeners.
 * @param {Config} options Family Chart Configuration object
 * 
 * @returns {orgdiagram} Returns reference to family diagram control. Since control adds event listeners bound
 * to its contents, call `destroy` method to clean up everything.
 */
primitives.orgdiagram.Control = function (element, options) {
  return primitives.orgdiagram.BaseControl(element, options, primitives.orgdiagram.TaskManagerFactory, primitives.orgdiagram.EventArgsFactory, {
    AnnotationLabelTemplate: primitives.common.AnnotationLabelTemplate,
    ButtonsTemplate: primitives.common.ButtonsTemplate,
    CheckBoxTemplate: primitives.common.CheckBoxTemplate,
    CursorTemplate: primitives.common.CursorTemplate,
    DotHighlightTemplate: primitives.common.DotHighlightTemplate,
    GroupTitleTemplate: primitives.common.GroupTitleTemplate,
    HighlightTemplate: primitives.common.HighlightTemplate,
    ItemTemplate: primitives.common.ItemTemplate,
    UserTemplate: primitives.common.UserTemplate,
    /* famDiagram specific templates */
    LabelAnnotationTemplate: primitives.common.LabelAnnotationTemplate
  });
};
