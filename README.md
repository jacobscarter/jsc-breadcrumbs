# jsc-breadcrumbs
A Breadcrumb Module for Angular Apps

This module is for Angular applications that use uiRouter.  A version for ngRoute is coming soon!

##Installation

`bower install jsc-breadcrumbs --save`

This will give you access to jscBreadcrumbs and all of it's dependencies.

##Use

To use jscBreadcrumbs, first include it in your module:

`angular.module('myApp', ['jscBreadcrumbs']);`

Next include the directive in your `index.html` file or it's equivalent:

`<jsc-breadcrumbs></jsc-breadcrumbs>`

That's it! Now a back button will appear to navigate your user back through there travel histroy.

##How It Works

jscBreadcrumbs stores the previous states and their parameters in sessionStorage.  The storing of both states and parameters allows you to travel back is states and not lose any dynamic data such as URL params (or any other parameters you set)

##Features

There is a JSCBreadcrumbs Service that makes some methods available to you.  To use this service include `JSCBreadcrumbs` in your controller dependency injection.

Currently these methods include: 
 * `JSCBreadcrumbs.breadcrumbs()` -> returns breadcrumbs array
 * `JSCBreadcumbs.breadcrumbsPop()` -> removes the last item on the breadcrumb array

You can also add params to each state that will affect the breadcrumbs behavior.  Below is an example:

    $state('dashboard', {
        url : '/dashboard',
        templateUrl : 'dashboard.html',
        controller : 'DashboardCtrl',
        params : {
            breadcrumbs : {
                doNotShow : true,
                doNoteStore : true
            }
        }
    });

The `doNotShow` param will hide the back button (the back button is also hidden when no breadcrumbs are stored)
The `doNotStore` param will not store that state in the breadcrumb history

