# Cursor Item & Mouse click
Organization Chart control has API options equivalent to common UI controls. The cursor item selects a single node in the hierarchy with a mouse click, and the highlight provides visual feedback on mouseover. Selected items collection is equivalent to multi-select in ListView or TreeView controls.  

A soft link is a way to reference one object from another using a unique key or id. Our controls define tree or family structures on the API using a flat array where every node references its parent(s) node(s) with unique ids. We use these unique ids when we need to highlight, set cursor, or select nodes in the diagram. 

To set the current cursor to some node, set the primitives.OrgConfig.cursorItem property to the id of that node.   

The control's navigation depends on the current cursor node. The diagram shows all the current cursor node neighbors and can minimize all other nodes on the chart depending on available screen space and options.  The neighbors are immediate parents, children, and siblings. So cursor item plays a role of local zoom in the chart hierarchy. Users browse diagrams via clicking and moving cursor item around and zooming into data around new cursor node.

Our controls don't update the diagram when you set its properties. It makes it possible to change control properties from multiple places and then make a single update call to apply all the diagram changes. 
The update function has an optional parameter, which allows us to perform a full diagram reset or just a quick refresh.

```JavaScript
control.update(primitives.UpdateMode.Refresh); 
```
The following example shows how to set the cursor item programmatically and listen to notifications about the user's navigation in the chart with primitives.OrgConfig.onCursorChange event. When the user clicks on the node, the control fires two sequential events before and after cursor change and diagram layout update.
onCursorChanging - is called before the control updates the diagram
onCursorChange - is called when diagram update is complete.
For example, use the onCursorChanging event in the web applications to make model changes, modifying diagram nodes and templates for the new cursor node. Return true from the onCursorChanging event handler to suppress the following diagram update and cursor positioning. 

```JavaScript
options.onCursorChanging = function (e, data) {
       return true; /* cancel following onCursorChanged event */
};
```

To make some node inactive, so the user cannot set the cursor to it, set the `isActive` option to false for that item or template configuration objects. See "Inactive items" use case.

If you need to disable mouse interactivity entirely in the diagram, you have to set the cursor and highlight nodes to nulls and deactivate navigation:

```JavaScript
options.cursorItem = null;
options.highlightItem = null;
options.navigationMode = NavigationMode.Inactive;
```

## Keyboard navigation

The control is keyboard focusable. So when it gets focus with TAB or mouse click, there is a blue "outline" around it indicating active keyboard focus. Use primitives.css file to disable or style that "blue" outline.
 
The control supports keyboard arrows keys to choose highlighted node and `Enter` key to set cursor for it. So when the component gets focused, you have to see the blue outline, then you have to use Arrows keys to highlight the item you want to move the cursor to, and then press Enter key to set the cursor to it.  Don't forget that if you need to expand marker nodes, you need to move the cursor node close.  

Suppose your node templates contain HTML elements supporting keyboard focus and keyboard interactivity.  All of them are going to have their TAB order. Use buttons panel to place HTML elements having a keyboard or mouse interactivity elements above all other diagram elements, so they are not blocked. See the context buttons sample for more details.

[JavaScript](javascript.controls/CaseSelectingCursorItem.html)

![Screenshot](javascript.controls/__image_snapshots__/CaseSelectingCursorItem-snap.png)