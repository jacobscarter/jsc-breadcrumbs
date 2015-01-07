/**
 * Easy to use breadcrumbs for AngularJS
 * @version v1.0.1 - 2015-01-07 * @link https://github.com/jacobscarter/jsc-breadcrumbs
 * @author Jacob Carter <jacob@ieksolutions.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
angular.module('templates-jscBreadcrumbs', ['template.html']);

angular.module("template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template.html",
    "<div class=\"back-button\" ng-hide=\"hide\" ng-click=\"backButton()\">\n" +
    "	<a>BACK</a>\n" +
    "</div>");
}]);

var jscBreadcrumbs = angular.module('jscBreadcrumbs', ['templates-jscBreadcrumbs']);

jscBreadcrumbs.directive('jscBreadcrumbs', ['$rootScope', '$log', '$state', '$stateParams', 'JSCBreadcrumbs',
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
                
                $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){

                    if(sessionStorage.getItem('jscBreadcrumbs') && angular.isArray(JSON.parse(sessionStorage.getItem('jscBreadcrumbs')))){
                        breadcrumbs = JSON.parse(sessionStorage.getItem('jscBreadcrumbs'));
                    }


                    //resetting breadcrumb if fromState matches reset state
                    for(var i in resetArray){
                        if(fromState.name === resetArray[i]){
                            breadcrumbs.length = 0;
                        }
                    }


                    //hide breadcrumbs logic
                    if(toParams.breadcrumbs && toParams.breadcrumbs.doNotShow === true){
                        JSCBreadcrumbs.breadcrumbData.hide = true;
                        $scope.hide = JSCBreadcrumbs.breadcrumbData.hide;
                    } else {
                        JSCBreadcrumbs.breadcrumbData.hide = false;
                        $scope.hide = JSCBreadcrumbs.breadcrumbData.hide;
                    }

                    //I have seperated the below into several if statements so the truthy checks aren't
                    //impossible to understand

                    //check to stop duplicate adding of states for multiple loading of directive
                    //this is why I hate digest cycle sometimes...
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
                        $scope.breadcrumbPop();
                    }

                    
                
                    sessionStorage.setItem('jscBreadcrumbs', JSON.stringify(breadcrumbs));


                    //if breadcrumbs array is empty we wont show breadcrumbs
                    if(breadcrumbs.length === 0){
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
                    $state.go(breadcrumbObject.state.name, breadcrumbObject.params);
                    breadcrumbs.splice(breadcrumbs.length -2, 2);
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
angular.module('templates-jscBreadcrumbs', ['template.html']);

angular.module("template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template.html",
    "<div class=\"back-button\" ng-hide=\"hide\" ng-click=\"backButton()\">\n" +
    "	<a>BACK</a>\n" +
    "</div>");
}]);

jscBreadcrumbs.factory('JSCBreadcrumbs', ['$rootScope', '$state', '$log', '$timeout',
	function ($rootScope, $state, $log, $timeout) {



	//breadcrumbs
	
	var breadcrumbsArray = [];
	var breadcrumbData = {};
	breadcrumbData.hide = false;
	

	var breadcrumbsPop = function(){
		breadcrumbsArray = JSON.parse(sessionStorage.getItem('jscBreadcrumbs'));
		breadcrumbsArray.pop();
		sessionStorage.setItem('jscBreadcrumbs', JSON.stringify(breadcrumbsArray));
		//return breadcrumbs;
	};

	var breadcrumbs = function(){
		breadcrumbsArray = JSON.parse(sessionStorage.getItem('jscBreadcrumbs'));
		return breadcrumbsArray;
	}


	return {
		breadcrumbs : breadcrumbs,
		breadcrumbsPop : breadcrumbsPop,
		breadcrumbData : breadcrumbData
	}

}]);