/**
 * Created by piranha on 30.12.14.
 */

(function() {

  var todoView = angular.module('app.todoView', ['app.todoService']);

  todoView.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/todo', {
      templateUrl: '/views/todo.tpl.html',
      controller: 'TodoController',
      resolve: {
        'todos': ['$todo', function($todo) {
          return $todo.find();
        }]
      }
    });
  }]);

})();
