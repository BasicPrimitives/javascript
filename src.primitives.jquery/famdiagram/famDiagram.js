/*
 * jQuery UI Diagram
 *
 * Basic Primitives family diagram.
 *
 * Depends:
 *  jquery.ui.core.js
 *  jquery.ui.widget.js
 */
if (typeof jQuery != "undefined") {
  (function ($) {
    $.widget("ui.famDiagram", new primitives.orgdiagram.Widget(primitives.famdiagram.Config, primitives.famdiagram.TaskManagerFactory, primitives.famdiagram.EventArgsFactory, {
      AnnotationLabelTemplate: primitives.common.AnnotationLabelTemplate,
      ButtonsTemplate: primitives.common.jQueryButtonsTemplate,
      CheckBoxTemplate: primitives.common.CheckBoxTemplate,
      CursorTemplate: primitives.common.CursorTemplate,
      DotHighlightTemplate: primitives.common.DotHighlightTemplate,
      GroupTitleTemplate: primitives.common.GroupTitleTemplate,
      HighlightTemplate: primitives.common.HighlightTemplate,
      ItemTemplate: primitives.common.ItemTemplate,
      UserTemplate: primitives.common.UserTemplate,
      /* famDiagram specific templates */
      LabelAnnotationTemplate: primitives.common.LabelAnnotationTemplate
    }));
  }(jQuery));
}; //ignore jslint