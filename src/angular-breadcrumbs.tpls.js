angular.module('templates-jscBreadcrumbs', ['template.html']);

angular.module("template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template.html",
    "<div class=\"back-button\" ng-hide=\"hide\" ng-click=\"backButton()\">\n" +
    "	<a>BACK</a>\n" +
    "</div>");
}]);
