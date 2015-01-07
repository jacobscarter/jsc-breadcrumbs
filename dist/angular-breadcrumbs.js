/**
 * Easy to use Breadcrumbs for AngularJS
 * @version v0.0.1 - 2015-01-07 * @link https://github.com/jacobscarter/angular-breadcrumbs
 * @author Jacob Carter <jacob@ieksolutions.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
angular.module('templates-jscBreadcrumbs', ['template.html']);

angular.module("template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template.html",
    "<div class=\"back-button\" ng-hide=\"hide\" ng-click=\"backButton()\" class=\"menu-link\">\n" +
    "	<p>back</p>\n" +
    "</div>");
}]);

var jscBreadcrumbs = angular.module('jscBreadcrumbs', ['templates-jscBreadcrumbs']);

jscBreadcrumbs.directive('breadcrumbs', ['$rootScope', '$log', '$state', '$stateParams', 'JSCBreadcrumbs',
    function ($rootScope, $log, $state, $stateParams, JSCBreadcrumbs) {

        return {
            restrict: 'E',
            scope: true,
            replace: true,
            templateUrl: 'template.html',
            link: function ($scope, $element, $attrs) {

                var breadcrumbs;
                //list of state that trigger breadcrumb reset when you enter another state from them
                var resetArray = [];
                //this stores the state you just left via backButton
                var backButtonState


                //making sure the breadcrumbs array in directive scope is up to date with the breadcrumbs stored
                //in local storage
                if(sessionStorage.getItem('jscBreadcrumbs') && angular.isArray(JSON.parse(sessionStorage.getItem('jscBreadcrumbs')))){
                    breadcrumbs = JSON.parse(sessionStorage.getItem('jscBreadcrumbs'));
                } else {
                    breadcrumbs = [];
                }                

                
                //if the state has a hide param we wont show breadcrumbs
                if($stateParams.breadcrumbs && $stateParams.breadcrumbs.doNotShow === true){
                    JSCBreadcrumbs.breadcrumbData.hide = true;
                }

                $scope.hide = JSCBreadcrumbs.breadcrumbData.hide;

                console.warn('breadcrumb hide value before statechangestart! ', $scope.hide);
                
                
                $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){

                    if(sessionStorage.getItem('jscBreadcrumbs') && angular.isArray(JSON.parse(sessionStorage.getItem('jscBreadcrumbs')))){
                        breadcrumbs = JSON.parse(sessionStorage.getItem('jscBreadcrumbs'));
                        console.warn('entered if statement to reset breadcrumbs based off what is stored in sessionStorage: ', breadcrumbs);
                    }

                    $log.warn('breadcrumbs directive statechange arguments ', toState, toParams, fromState, fromParams);

                    //resetting breadcrumb if fromState matches reset state
                    for(var i in resetArray){
                        if(fromState.name === resetArray[i]){
                            breadcrumbs.length = 0;
                            console.warn('this is a reset state, we are resetting breadcrumbs! ', breadcrumbs);
                        }
                    }


                    //hide breadcrumbs logic
                    if(toParams.breadcrumbs && toParams.breadcrumbs.doNotShow === true){
                        JSCBreadcrumbs.breadcrumbData.hide = true;
                        $scope.hide = JSCBreadcrumbs.breadcrumbData.hide;
                        $log.warn('entered doNotShow if statement', $scope.hide);
                    } else {
                        JSCBreadcrumbs.breadcrumbData.hide = false;
                        $scope.hide = JSCBreadcrumbs.breadcrumbData.hide;
                        $log.warn('did not enter doNotShow if statement, should be false', $scope.hide);
                    }

                    //I have seperated the below into several if statements so the truthy checks aren't
                    //impossible to understand

                    //check to stop duplicate adding of states for multiple loading of directive
                    //this is why I hate digest cycle sometimes...
                    console.warn('about to push to breadcrumbs array if both args are true: ', fromState.name.length > 0);
                    //if(firstLoop && fromState.name.length > 0){
                    if(fromState.name.length > 0){
                        breadcrumbs.push({
                            state : fromState,
                            params : fromParams
                        });
                        firstLoop = false;
                    } 



                    //check stateParam to see if state should not be stored
                    //this is one of the last steps done!
                    if(fromParams.breadcrumbs && fromParams.breadcrumbs.doNotStore){
                        $log.log('removing breadcrumb that should not be stored - BEFORE REMOVAL: ', angular.copy(breadcrumbs));
                        $scope.breadcrumbPop();
                    }

                    
                

                    //using sessionStorage so breadcrumbs are cleared if user exits page, let me know if
                    //you would rather have localStorage, but I think sessionStorage makes more sense.
                    sessionStorage.setItem('jscBreadcrumbs', JSON.stringify(breadcrumbs));
                    //$log.log('sessionStorage: ', JSON.stringify(breadcrumbs));
                    //$log.log('getItem sessionStorage: ', JSON.parse(sessionStorage.getItem('jscBreadcrumbs')));


                    //if breadcrumbs array is empty we wont show breadcrumbs
                if(breadcrumbs.length === 0){
                    console.warn('breadcrumbs length is 0 so hiding');
                    JSCBreadcrumbs.breadcrumbData.hide = true;
                    $scope.hide = JSCBreadcrumbs.breadcrumbData.hide;
                }



                   

                    

                });




                //used to remove last item from breadcrumb array
                $scope.breadcrumbPop = function(){
                    breadcrumbs.pop();
                    updateStorage(breadcrumbs);  
                };

                //function to update sessionStorage
                function updateStorage(breadcrumbData){
                    sessionStorage.setItem('jscBreadcrumbs', JSON.stringify(breadcrumbData));
                }

                function updateBreadCrumbs(){
                    breadcrumbs = JSON.parse(sessionStorage.getItem('jscBreadcrumbs'));
                }

                $scope.backButton = function(){
                    updateBreadCrumbs();
                    var breadcrumbObject = breadcrumbs[breadcrumbs.length - 1];
                    $log.log('breadcrumbObject ', breadcrumbObject.state.name, breadcrumbObject.params);
                    //$log.log('breadcrumbs object : ', breadcrumbObject);
                    $state.go(breadcrumbObject.state.name, breadcrumbObject.params);
                    //var backButtonState = {}
                    breadcrumbs.splice(breadcrumbs.length -2, 2);
                    $log.log('NEW breadcrumbs array : ', breadcrumbs);
                    sessionStorage.setItem('jscBreadcrumbs', JSON.stringify(breadcrumbs));
                    if(breadcrumbs.length === 0){
                        JSCBreadcrumbs.breadcrumbData.hide = true;
                        $scope.hide = JSCBreadcrumbs.breadcrumbData.hide = true;
                        sessionStorage.removeItem('jscBreadcrumbs');
                    }

                    
                };
                //end Breadcrumbs


            } // link

        }; // return

    }
]);
jscBreadcrumbs.factory('JSCBreadcrumbs', ['$rootScope', '$state', '$log', '$timeout',
	function ($rootScope, $state, $log, $timeout) {



	//breadcrumbs
	
	var breadcrumbs = [];
	var breadcrumbData = {};
	breadcrumbData.hide = false;
	

	var breadcrumbsPop = function(){
		breadcrumbs = JSON.parse(sessionStorage.getItem('jscBreadcrumbs'));
		console.log('breadcrumb being popped off in Menu: ', breadcrumbs);
		breadcrumbs.pop();
		console.log('breadcrumb AFTER being popped off in Menu: ', breadcrumbs);
		sessionStorage.setItem('jscBreadcrumbs', JSON.stringify(breadcrumbs));
		//return breadcrumbs;
	};


	return {
		breadcrumbs : breadcrumbs,
		breadcrumbsPop : breadcrumbsPop,
		breadcrumbData : breadcrumbData
	}

}]);