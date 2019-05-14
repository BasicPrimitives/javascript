# [Basic Primitives](https://www.basicprimitives.com)

JavaScript Diagrams Library - implements organizational and multi-parent diagrams. 
Library contains implementations of JavaScript Controls and PDFkit plugins. PDFkit is NodeJS and in browser PDF rendering library.
Diagrams visualize nodes using HTML templates combined with HTML5 Canvas and SVG graphics elements. 
Diagrams work in all major modern browsers Internet Explorer, Chrome, Firefox, Safari including mobile browsers.

## Supported Diagrams

* Hierarchy Visualization
* Organizational Chart
* Multi-parent hierarchical chart
* Family Tree
* Dependencies Diagram
* PERT chart
* Financial Ownership Diagram

## Getting Started

* [http://www.basicprimitives.com](https://www.basicprimitives.com) project home.
* [NPM](https://www.npmjs.com/package/basicprimitives) official release package.
* [GitHub](https://github.com/BasicPrimitives) repositories.
* [GitHub repository based static Demos & Samples](https://basicprimitives.github.io/javascript/).
* [React Live Demos](http://react.basicprimitives.com:8080)

## Pure JavaScript
* 100% client side JavaScript layout and rendering.
* Implemented without dependencies on 3d party libraries.
* Works in all major modern browsers Internet Explorer, Edge, Chrome, Firefox, Safari and mobile browsers. Supports graphics rendering in SVG and Canvas modes depending on user options.

### PDF support
* 100% JavaScript in-browser or NodeJS PDF rendering based [PDFkit](https://www.npmjs.com/package/pdfkit) (MIT) library.

## Free for Non-commercial
* Do you want to use Basic Primitives Diagram for a personal website, a school site or a non-profit organization? Then you don't need the author's permission, just go on and use Basic Primitives Diagram. For commercial websites and projects, see [License and Pricing](https://www.basicprimitives.com/index.php?option=com_content&view=article&id=14&Itemid=18&lang=en).

## Open

One of the key features of Basic Primitives Diagram that under any of the licenses, free or not, you are allowed to download the source code and make your own edits. This allows personal modifications and a great flexibility. The comprehensive set of samples, demos and unit tests guarantees quality of the library's source code.

## Created for visual data analytics of hierarchies and dependencies
Business Intelligence systems and applications are designed for two major areas: Reporting and Analytics. Reporting applications are meant to be a legal statements, so reported data should be 100% complete, it should not have any discrepancy in form of omitted data, improperly rounded values or excessive abbreviations. On the other side, applications designed for data analytics should show only the most valuable and related data to current user focus and gracefully degrade details for less relevant data. So control provide API options for visual data analysis of diagrams:

### Auto layout
The main problem of diagrams drawn in graphics editor is in sparse distribution of items on layout. Large gaps between nodes make chart hard to overview, edit and navigate. Sometimes the chart is so big that it could have screen size intervals between items. This issue makes the whole idea of visualizing diagrams useless. At the same time computer UI allows to scale and fit visualization into screen, but in that case items become small and unreadable. The primary goal of our approach to Organizational chart and other diagrams visualization is to resolve these issues and make good use of them at the same time. The widget finds the best way to display a large hierarchy within available screen space without scrolling or with minimal scrolling not affecting usability. 

* Diagram shape overview. Widget minimizes items in order to fit diagram visualization into available screen space and provides user with  possibility to overview general diagram layout.
* User focus navigation goes node by node. Chart displays cursor item and its neighbors full size and minimizes all other less relevant nodes. By clicking on neighboring nodes user will move the focus of interest to the newly selected part of the diagram. 
* Pinning of items in diagram. All selected/check marked items are always displayed full size, all other items stay minimized, so it allows to pin/select items in different branches and show them side by side within available screen space for location comparison.
* Diagram design consistency. Auto layout without user's manual editing provides visual consistency across all diagramming documents. All users have various skills and preferences, so auto layout provides consistent diagrams visualization.
* Always up to date. Your application diagrams will not be affected by changes in Widget's layout algorithms and application data. Your visualizations will be always up to date and in sync with your data. 

### Annotations
Every time we make changes to diagram we need to visualize performed modification otherwise it is hard to trace changes before and after modification. So in order to visualize diagram transition from one state to another control provides annotations. Annotations are API elements attached to diagram nodes and are drawn in front or in the background of them. Annotations don't change nodes placement, so controls redraw them instantaneously without diagram layout. The general logic of annotations is that they are not supposed to be displayed for every node in diagram, application is supposed to create them and add to diagram in the context of current user cursor or operation, user perform with data. Annotations compared to diagram layout itself have minimal conflict resolution abilities. So it is very easy to clutter diagram with excessive number of annotations. But they come very handy when we need to add context specific visuals.

## API
### Provides simple API for the most common use cases
* Default item template - allows to render first diagram with minimal options defined.
* Selection Check Box - provide selection API similar to regular tree and list controls
* User buttons panel - custom in layout context panel with buttons
* Vertical node titles
* Labels

### Flexible API for more complex use cases
* Customizable item, highlight and cursor content templates. 
* Custom layout parent/child relation types: Adviser, Assistant and various partners. Multiple parents, multiple managers or co-heads visualization.
* Custom children and leaves layout: Vertical, Horizontal and Matrix
* Left/Right layout alignment support.
* Events

### Compatible
* Works in AngularJS and ReactJS
* Works in jQuery UI widgets. 
* Supports nested components and nodes templates
* Supports Drag & Drop frameworks

### Dynamic
* Through a full API you can add, remove and modify individual items and their properties at any other time after organizational chart rendering. Widget update time is as fast as its navigation.


### License

Copyright (c) 2013 - 2019 Basic Primitives Inc
* [Non-commercial - Free](http://creativecommons.org/licenses/by-nc/3.0/)
* [Commercial and government licenses](http://www.basicprimitives.com/pdf/license.pdf)

