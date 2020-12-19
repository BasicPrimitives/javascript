# AngularJS Organizational Chart directive example
This example demonstrates how Organizational Chart Control can be wrapped into AngularJS directive. It demonstrates implementation of the following features:

* Destroy - AngularJS directive has to destroy control otherwise its event handlers would stay bound to placeholder DOM element.
* Update Mode - in order to render control faster, directive should reuse existing control and use appropriate update method for changing cursor, highlight or full control contents refresh.
* Events looping - directive watches for scope properties and updates control, so we have to avoid infinite update loops when we apply changes from control back to its scope object.
* ItemTemplate - directive uses AngularJS templates and it shares items scopes between application and control.
* Buttons - by default, control uses regular HTML buttons, in case of AngularJS we have to customize item and cursor templates to use AngularJS buttons.

[AngularJS](angularjs.directives/CaseAngularJSFirstOrganizationalChartDirective.html)
