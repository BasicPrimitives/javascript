import Thickness from '../graphics/structs/Thickness';
import Size from '../graphics/structs/Size';
import { LineType, Enabled } from '../enums';

/**
 * @class TemplateConfig
 * @classdesc Template configuration object defines DOM elements for node content, cursor and highlight visual representation.
 * They are grouped into one configuration object because if we decide to customize cursor or highlight templates most likely
 * we are going to make them item template specific. At the same time control does not require all 3 of them to be defined.
 * If cursor or highlight templates properties are not set in template configuration object then control uses internal
 * default template for all of them. Generally all 3 templates can be set to null, so default templates are going to be used
 * by control.
 */
export default function TemplateConfig() {
  /**
   * Name. Every template configuration object has name property, it is being used to reference templates from items.
   * This name is used to as an argument of call back rendering function as well. If item has not template name set 
   * it uses default template for rendering.
   * 
   * @type {string}
   */
  this.name = null;

  /**
   * If true it makes templated items inactive in diagram layout. Inactive items are regular items excluded from navigation, that means 
   * when use auto fit mode, selection of neighboring node to inactive item makes all nodes of inactive item shown in full
   * size as well. Inactive items play a role of in layout annotations having no user interaction and templated with HTML.
   * For example they can be used to add titles into family diagram layout or terminator items indicating that upon reaching
   * them diagram would load extra nodes into layout.
   * 
   * @type {boolean}
   */
  this.isActive = true;

  /**
   * Size. Control deals with fixed size layout, it makes no guesses about content and size of nodes.
   * So we don't support in any form nodes auto sizing. In order to support such feature control should measure content
   * of every node before rendering cycle. Taking into account that nodes visibility depends on available space it is going
   * to be infinite loop of diagram layout and nodes measure iterations. The more space we provide to nodes the less number 
   * of diagram nodes is going to be visible. So control expect that node size is hard valued in template configuration.
   * 
   * @type {Size}
   */
  this.itemSize = new Size(120, 100);

  /**
   * Border width. We use archaic method to layout cursor and highlight frames around nodes, so we need to know border
   * width in order measure gaps between them properly.
   * 
   * @type {number}
   */
  this.itemBorderWidth = 1;

  /**
   * Item template. Supported template formats: Control provide two distinct ways to define item templates.
   * The original one is based on setting HTML elements content via innerHTML DOM element property, see following reference 
   * at https://developer.mozilla.org web site for more details. The modern way is to use JSON ML library that is our recommended
   * solution for templates definition, see following web site for more details http://www.jsonml.org/. This is only 3d party
   * MIT licensed code included into our code base, everything else is 100% authentic. We adopted it with minor modifications,
   * it generally works according to its original design.
   * 
   * The control calls `onItemRender` callback function when specific node cursor needs to be rendered with this template.
   * 
   * @type {string|object}
   */
  this.itemTemplate = null;

  /**
   * Marker type. The shape of the marker when node is minimized by auto fit. The control supports auto fit of the diagram into available screen space.
   * When diagram size significantly larger than available screen space, its scrolling and navigation becomes problematic,
   * so control supports automatic diagram fit into the screen space via rendering some of its nodes in form of small markers.
   * So this option sets marker shape for nodes templated with this template.
   * 
   * @type {ShapeType}
   */
  this.minimizedItemShapeType = null;

  /**
   * Marker size.
   * 
   * @type {Size}
   */
  this.minimizedItemSize = new Size(4, 4);

  /**
   * Marker corder radius for simple squares. By default it is null and dots displayed as cycles. If corner radius set to 0 then
   * they are displayed as regular squares.
   * 
   * @type {number}
   */
  this.minimizedItemCornerRadius = null;

  /**
   * Marker border line width
   * 
   * @type {number}
   */
  this.minimizedItemLineWidth = 1;

  /**
   * Marker border line color. By default it is the same as `itemTitleColor` of rendered node.
   * 
   * @type {string}
   */
  this.minimizedItemBorderColor = null;

  /*
    Marker border line pattern
    
    @type {LineType}
  */
  this.minimizedItemLineType = LineType.Solid;

  /**
   * Marker fill color. By default it is the same as `itemTitleColor` of rendered node.
   * 
   * @type {string}
   */
  this.minimizedItemFillColor = null;

  /**
   * Marker fill color opacity.
   * 
   * @type {number}
   */
  this.minimizedItemOpacity = 1;

  /**
   * Highlight frame offset from node.
   * 
   * @type {Thickness}
   */
  this.highlightPadding = new Thickness(2, 2, 2, 2);

  /**
   * Highlight frame border width.
   * 
   * @type {number}
   */
  this.highlightBorderWidth = 1;

  /**
   * Highlight Template.
   * 
   * The control calls `onHighlightRender` callback function when specific node highlight needs to be rendered with this template.
   * 
   * @type {string|object}
   */
  this.highlightTemplate = null;

  /**
   * Cursor frame offset from node.
   * 
   * @type {Thickness}
   */
  this.cursorPadding = new Thickness(3, 3, 3, 3);

  /**
   * Cursor frame border width.
   * 
   * @type {number}
   */
  this.cursorBorderWidth = 2;

  /**
   * Cursor Template.
   * 
   * The control calls `onCursorRender` callback function when specific node cursor needs to be rendered with this template.
   * 
   * @type {string|object}
   */
  this.cursorTemplate = null;

  /**
   * Sets buttons panel visibility.
   * 
   * `Auto` - depends on master config `hasButtons` property setting.
   * `True` - visible
   * `False` - hidden
   * 
   * @group Templates
   * @type {boolean}
   */
  this.hasButtons = Enabled.Auto;

  /**
   * This callback function is used in React component. It basically makes buttons obsolete 
   * and gives end user possibility to render any content in buttons panel.
   * 
   * @ignore
   */
  this.onButtonsRender = null;
};
