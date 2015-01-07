angular.module('templates-jscBreadcrumbs', ['template.html']);

angular.module("template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template.html",
    "<div class=\"jscbreadcrumbs\">\n" +
    "	<div class=\"back-button\" ng-hide=\"hide\" ng-click=\"backButton()\" ng-if=\"backButtonShow\">\n" +
    "		<a>BACK</a>\n" +
    "	</div>\n" +
    "	<div class=\"breadcrumb-trail\" ng-if=\"breadcrumbTrailShow\" ng-hide=\"hide\">\n" +
    "		<ul>\n" +
    "			<li ng-repeat=\"item in trailArray\" ng-click=\"breadcrumbClick($index)\">{{item.name}} /</li>\n" +
    "		</ul>\n" +
    "	</div>\n" +
    "</div>");
}]);
