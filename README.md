# jsc-breadcrumbs
A Breadcrumb Module for Angular Apps

This module is for Angular applications that use uiRouter.  A version for ngRoute is coming soon!

##Installation

`bower install jsc-breadcrumbs --save`

This will give you access to jscBreadcrumbs and all of it's dependencies.

##Use

Include script file and css file:

`<script src="lib/jsc-breadcrumbs/jsc-breadcrumbs.min.js"></script>`

`<link href="lib/jsc-breadcrumbs/jscbreadcrumbs.css" rel="stylesheet">`

To use jscBreadcrumbs, first include it in your module:

`angular.module('myApp', ['jscBreadcrumbs']);`

Next include the directive in your `index.html` file or it's equivalent:

`<jsc-breadcrumbs></jsc-breadcrumbs>`

Now to specifiy what kind of breadcrumbs you want...

##How It Works

jscBreadcrumbs stores the previous states and their parameters in sessionStorage.  The storing of both states and parameters allows you to travel back is states and not lose any dynamic data such as URL params (or any other parameters you set)

There is a back button and breadcrumb trails option. to take advantage of these set the attribute in the directive element to true. i.e.

`<jsc-breadcrumbs backbutton="true"></jsc-breadcrumbs>`

`<jsc-breadcrumbs breadcrumbtrail="true"></jsc-breadcrumbs>`

##Features

There is a JSCBreadcrumbs Service that makes some methods available to you.  To use this service include `JSCBreadcrumbs` in your controller dependency injection.

Currently these methods include: 
 * `JSCBreadcrumbs.breadcrumbs()` -> returns breadcrumbs array
 * `JSCBreadcrumbs.breadcrumbsPop()` -> removes the last item on the breadcrumb array

You can also add params to each state that will affect the breadcrumbs behavior.  Below is an example:

    $state('dashboard', {
        url : '/dashboard',
        templateUrl : 'dashboard.html',
        controller : 'DashboardCtrl',
        data : {
            breadcrumbs : {
                doNotShow : true,
                doNoteStore : true,
                name : 'Dashboard',
                reset : true,
            }
        }
    });

The `doNotShow` param will hide the back button (the back button is also hidden when no breadcrumbs are stored).
The `doNotStore` param will not store that state in the breadcrumb history.
The `name` param will set the name that is displayed in the breadcrumb trail.
The `reset` param lets the breadcrumb directive know to reset the breadcrumbs when you enter this state.

