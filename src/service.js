jscBreadcrumbs.factory('JSCBreadcrumbs', ['$rootScope', '$state', '$log', '$timeout',
	function ($rootScope, $state, $log, $timeout) {



	//breadcrumbs
	var breadcrumbsArray = [];
	var breadcrumbData = {};
	breadcrumbData.hide = true;
	

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