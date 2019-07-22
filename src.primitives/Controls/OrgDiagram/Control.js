/*
	Class: primitives.orgdiagram.Control
	JavaScript Organizational Diagram Control. 
	
	Parameters:
	element - reference to DOM element which is used as new control placeholder. 
		Control renders diagram content inside of that DIV placeholder and  adds events listeners.
	options - reference to primitives.orgdiagram.Config class instance.

	Returns: 
	reference to new instance of the control. Control adds event listeners bound to its contents, so if you need to remove it from DOM call destroy() method on the control's instance.
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
