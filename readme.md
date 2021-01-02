# [Basic Primitives](https://www.basicprimitives.com) Diagrams for JavaScript

Data visualization components library that implements organizational chart and multi-parent dependency diagrams, contains implementations of JavaScript Controls and PDF rendering plugins.

### Project references
* [http://www.basicprimitives.com](https://www.basicprimitives.com) project home and React Live Demos.
* [GitHub](https://github.com/BasicPrimitives) Github repositories.
* [NPM](https://www.npmjs.com/package/basicprimitives) official - release packages.
* [Basic Primitives for React Live Demos](https://basicprimitives.github.io/react/) - github live site
* [Basic Primitives for JavaScript, Bootstrap and PDFkit Live Demos & Samples](https://basicprimitives.github.io/javascript/) - github live site

## Supported Diagrams:
* Organizational Chart
* Family tree & Inheritance Chart
* Multi-parent hierarchical chart
* Dependencies Visualization
* PERT - Program Evaluation and Review Technique Diagram
* DAG - Directed Acyclic Graph visualization
* Business Ownership Diagram

## Products:
### Basic Primitives Diagrams for [React:](https://reactjs.org/)
* [create-react-app](https://github.com/facebook/create-react-app#readme) compatible 
* [react-dnd](http://react-dnd.github.io/react-dnd/about) compatible 
* [JSX](https://reactjs.org/docs/introducing-jsx.html) templates
* 100% [Virtual DOM](https://reactjs.org/docs/faq-internals.html) rendering cycle, i.e. no direct DOM rendering

### Basic Primitives Diagrams for JavaScript:
* 100% client side JavaScript layout and rendering.
* No dependencies on 3rd party libraries.
* Works in all major modern browsers: Internet Explorer, Edge, Chrome, Firefox, Safari and mobile browsers. 
* Rendering in [SVG](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) and [Canvas](https://en.wikipedia.org/wiki/Canvas_element) modes depending on user options.

### Basic Primitives [PDFkit plugin:](http://pdfkit.org/)
* Browser based or NodeJS based PDF rendering

## Open Source:
One of the key features of our product is that under any of the licenses, free or not, you are allowed to download the source code and make your own edits to it. This allows for  personal modifications and security for your product. Additionally the library's source code can be validated and easily tested through the use of our samples, demos and unit tests.
The samples, demos and unit tests can be found online and are also provided within the product packages.

## Product for visual data analysis of diagrams:
Business intelligence systems and applications are designed for two major areas: reporting and analytics. Reporting based applications display the original data as is, so reported data should be 100% complete, no data should have any discrepancies or be omitted in the form of improperly rounded values or excessive abbreviations. On the other side, there are applications that are designed for data analytics and are focused on the most valuable and user relevant data. Going as far as removing data that is deemed irrelevant by the end user depending on what they are interested in analyzing. Our components provide various API options to the developers, so they can configurate our diagrams and use them for both of the mentioned above scenarios.

#### Auto layout and fitting the diagram into a single screen space:
When using a graphics editor to manually draw your diagrams, it is common place to have large gaps between the nodes. This can make the diagram/chart unreadable, hard to edit and navigate. On top of that, on a large scale the diagram could have screen size intervals between items. Admittedly the computer UI does allow the user to scale and fit the diagram in order to visualize it on a single screen. But in that case, the items become small and unreadable as there is no scaling priority and the items are just too small to be readable [Here is PDF example demonstrating the problem.](samples/images/sparse_data_problem.pdf) The primary goal of our approach to organizational charts and other diagrams visualization is to resolve these issues. Our product component specializes in displaying large diagrams in a single screen or nearly removing all scrolling while at the same time not affecting the diagram's usability. This is only possible when the diagramming component is in control of the auto layout for the nodes.

* Minimizing nodes into markers and labels: Our component provides a special mode that renders the diagram nodes in the form of markers. This is a highly scalable form that is capable of rendering large numbers of nodes while not affecting the rendering performance. With this, huge diagrams can be fit into available screen space.
* The user has focused navigation as they go node by node. The key nodes are kept full size as the less relevant nodes in the user view are minimized. The user also has the option to customize which nodes are relevant via selection, annotations and navigation options. By default the chart displays the cursor selected item and its neighbors in full size and minimizes all other less relevant nodes. By clicking on neighboring nodes the user will move the focus of interest to the newly selected part of the diagram. Local zoom around the cursor item works for all available diagrams.
* Pinning of items in diagram. All selected/checked items are always displayed full size. All other items stay minimized. This allows to pin/select items in different branches of the diagram and show them side by side within available screen space for comparison.
* Diagram auto layout consistency. Our auto layout provides visual consistency across all diagramming documents. The user can customize the visual appearance for any diagrams that they wish manually. All users have various skills and preferences, so auto layout provides consistent default diagram viewing throughout the organization.
* Always up to date. Your application's diagrams will not be effected by changes in the component's layout algorithms and application data. Your visualizations will always be up to date and in sync with your data.

#### Stable rules based auto layout of multi parent hierarchies
The core problem of dependency diagrams layout is the endless number of permutations. As a result every time we make any changes to the diagram's relations, we get a new "optimal" layout. However that "optimal" layout can be so different from the previous "optimal" layout that the end user needs to relearn the diagram again and again. This becomes worse the more nodes you have. Analysis takes so much time, that it makes the automatic diagram layout useless. So it is very important that diagram does not change much between user edits.
So in order to overcome that problem we added support of user rules that the auto layout algorithm follows. The problem is that "hard" rules are equivalent to manual layout if we start to define the placement of every node manually. Which destroys the whole point of even having auto layout for the nodes. So we introduced "soft" rules, which our control follows as long as they don't contradict to the purpose. Our control does ignore them when they are not applicable.
* Moderate layout changes between edits. Multi parent hierarchy diagram does not change much when we add or remove nodes. Developer is encouraged to add order of nodes relative to each other, but that order does not enforce layout, control still has flexibility to choose optimal layout itself.

#### Auto sorting the diagram nodes into levels
It is not obvious, but by default we distribute all nodes in the diagram into distinct levels. This gives the end user a clear indication about a node's relations. For any given node, all nodes that are below it in the diagram, are either it's dependents or minors. On the contrary any nodes found above the node are either its parents or superiors. This is a simple and straightforward visual sorting method that helps when analyzing and viewing large diagrams.

#### Auto alignment of nodes relative to each other
Our auto layout that is responsible for our diagrams, focuses a lot of effort on the alignment of the nodes when visualizing them. This is very important because when the end user is analyzing the diagram it is easier to identify their dependencies by looking at their alignment and positions rather then tracing lines between nodes. For example if a set of nodes are organized into a pyramid formation, the pyramid shape itself gives a clear indication about the mutual relation or the group structure of the nodes. In such an ideal case,minimal to no connection lines should be needed. This is the ultimate goal when visualizing diagrams, that in an ideal case every node should be placed in such way that no connection lines are necessary in order to show the node's relations within the diagram.

#### Customizable Placement of children
By default all direct children that belong to a parent node are of the same rank and status between each other and due to that, are always aligned below the parent and are organized in the same way. However for special cases were the end user wishes to have a child that is separate from the rest of it's siblings, we provide custom child types that the end user can use to place different ranking nodes anywhere around the parent node. These placement options give a lot of space for the creation of roles such as an Assistant, Adviser, various Partners and co-heads that may be in the organization. Additionally, by default a node's children are always placed in a horizontal line below the parent node. On a large scale this may result in the end user having to scroll screens in order to view all of the nodes. To compensate for this, we provide the option of placing all of the children of a parent node in a square/matrix formation. This will reduce sideways screen scrolling by compacting the child nodes into a much smaller area on the screen.

#### Automatic transformation of connection lines between nodes
A diagram can have multiple parent and child nodes all be part of one large relationship with each other. This type of relationship results in an excessive number of connections between the nodes and creates a visual clutter in the diagram. In extreme cases this makes the diagram unreadable.

The following is an example of a complete bipartite graph. As visible every parent node is connected with every child node.

![Complete Bipartite Graph](samples/images/cbp88.png)

This is definitely an extreme example of family relations, but it could happen and the component automatically groups connectors into bundles so it produces the following optimized set of relations: 

![Complete Bipartite Graph Bundled](samples/images/cbp88bundled.png)

This connector bundling method is actively used throughout the product in order to increase the readability of the diagrams.

#### Automatic elimination of redundant relations between nodes
Another typical problem with visualizing connections is the possible excessive amount of connections that can take place between multiple grandchild and grandparent nodes. Usually when we draw family diagrams we are more interested to see the overall order of dependencies over the more direct and specific node relations. In a family tree we know that all the nodes are directly linked to one another via their immediate parent. Because of this, we can remove the direct connections between non-immediate parents, reducing the amount of visual clutter on the screen and still get the same order of dependencies. By doing this the diagram becomes a lot easier to analyze, view and navigate.

![Excessive amount of connections](samples/images/cbp88everyparent.png)

### Annotating diagram nodes
Every time we make changes to our diagrams, we need to visualize the performed modifications otherwise it is hard to trace the changes before and after the modification occurred. So in order to visualize the diagram's transition from one state to another, the control provides various annotations to the end user. Annotations are API elements that are attached to the diagram nodes. We draw our annotations either in front of the nodes or in the background. The annotations don't affect the nodes placement in any way. As a result the control redraws them instantaneously without rendering or recalculating the actual diagram layout. The general logic of annotations is that they are not supposed to be displayed for every node in the diagram. The application is supposed to create them and add them to the diagram depending on the context of the current user cursor or operation that the user is performing with the data. It should be noted that annotations have minimal mutual conflict resolution. As a result it is very easy to clutter the diagram with an excessive number of annotations. But they are nevertheless very useful when describing or giving node specific context or details to the diagram.

* Connector lines - Direct lines between nodes across the diagram.
* Background - It is an equivalent to highlighting text with a marker. The component merges overlapping background annotations into one if they overlap each other.
* Highlight path - A highlighter styled line that highlights the connections between directly connected nodes and helps the end user navigate the diagram.
* Shape annotations - Similar to background annotations, but are drawn in front of nodes in the form of custom shapes. 
* In-layout labels - Are annotations that are drawn over connector lines but are also taken into consideration when calculating and rendering the layout of the diagram. Because of this, they do not cross any nodes, however can effect loading times as the entire diagram is rendered.

## First time user experience with our product
Visualizing diagrams is a complex task which requires a lot of tuning. So long before we get something visible on the screen, we need to set and configurate a lot of diagram options. In order to make the starting experience simple, our component provides default functionality for almost everything:
* Default node template - You just need to provide your data and the first diagram will be rendered.
* Standard collection control features - Our product follows the standard behavior for regular list and tree collection controls available in many other frameworks.
* User buttons panel - A custom in layout context panel with buttons. The diagram needs maximum screen space, so cutting screen real estate on the sides of the diagram for the buttons panel takes valuable space out of diagram. Placing the buttons in pop-up context menus or panels is also not ideal since it decreases UI discoverability and first time user experience. So our component reserves space right inside of the diagram layout for the buttons panel.
* Basic visual categories - Our data visualization component has various ways to display basic data categories: titles, vertical titles, title colors and photos.

## Free for Non-commercial:
Do you want to use a Basic Primitives diagram for a personal website, a school site or a non-profit organization? Then you don't need the author's permission. Just go on and use the Basic Primitives diagram. However for commercial website and project uses, see our License and Pricing.

## Compatibility:
* Works in AngularJS directive
* Works in jQuery UI widgets

## Performance:
Through a full API you can add, remove and modify individual items and their properties. The component will only update visual elements affected by the API changes. We put in a lot of effort in order to make it happen!

Copyright (c) 2013 - 2021 Basic Primitives Inc
* [Non-commercial - Free](http://creativecommons.org/licenses/by-nc/3.0/)
* [Commercial and government licenses](license.pdf)
