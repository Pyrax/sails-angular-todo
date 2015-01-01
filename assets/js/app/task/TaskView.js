/**
 * Created by piranha on 31.12.14.
 */

(function() {

  var taskView = angular.module('app.taskView', ['app.todoService']);

  taskView.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/todo/:todo_id', {
      templateUrl: '/views/task.tpl.html',
      controller: 'TaskController',
      resolve: {
        'todoList': ['$todo', '$route', function($todo, $route) {

          // get all tasks of our list
          return $todo.findOne({
            todo_id: $route.current.params.todo_id
          });

        }]
      }
    });
  }]);

})();
