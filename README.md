WP NG
=====

A WordPress plugin to use as a starter for integrating AngularJS components into
WordPress posts and pages. It has been tested on WordPress versions 3.5 and 3.6.

After the plugin is installed, the 'angular-view' shortcode can be used in posts
and pages as:

\[angular-view app=ngApp controller=HelloCtrl template=hello.html\]

Applications and Controllers have to be defined in plugins/wp-ng/client/js/client.js

The sample controller HelloCtrl is provided with the plugin. The bundled ngApp 
application can also be extended and re-used in place of creating a new application.
The HTML template that is used as the ‘view’ for the component must be placed 
in plugins/wp-ng/client/templates/

Custom styles used in the view must be added to plugins/wp-ng/client/css/client-style.css

