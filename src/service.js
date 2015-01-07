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