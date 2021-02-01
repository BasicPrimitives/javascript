# AngularJS Organizational Chart directive example
This example demonstrates how AngularJS directive can wrap Organizational Chart Control. It illustrates the implementation of the following features:

* Destroy - AngularJS directive has to destroy control. Otherwise, its event handlers would stay bound to placeholder DOM elements.
* Update Mode - to render control faster, the directive should reuse existing control and use appropriate update method for changing cursor, highlight, or full control contents refresh.
* Events looping - directive watches for scope properties and updates control, so we have to avoid infinite update loops when applying changes from the diagram back to its scope object.
* ItemTemplate - directive uses AngularJS templates, and it shares items scopes between application and control.
* Buttons - by default, the control uses regular HTML buttons. In the case of AngularJS, we have to customize node and cursor templates to use AngularJS buttons.

[AngularJS](angularjs.directives/CaseAngularJSFirstOrganizationalChartDirective.html)
