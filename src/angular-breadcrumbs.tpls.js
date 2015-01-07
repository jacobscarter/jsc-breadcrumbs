angular.module('templates-jscBreadcrumbs', ['template.html']);

angular.module("template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template.html",
    "<div class=\"back-button\" ng-hide=\"hide\" ng-click=\"backButton()\" class=\"menu-link\">\n" +
    "	<p>back</p>\n" +
    "</div>");
}]);
