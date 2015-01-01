/**
 * Created by piranha on 30.12.14.
 */

(function() {

  var app = angular.module('app', ['ngRoute', 'app.todoModule', 'app.taskModule']);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({
      redirectTo: '/todo'
    });
  }]);

})();
