/**
 * Created by piranha on 30.12.14.
 */

(function() {

  var todoController = angular.module('app.todoController', ['app.todoService']);

  todoController.controller('TodoController', ['$scope', '$location', '$todo', 'todos', '$log', function($scope, $location, $todo, todos, $log) {
    $scope.todos = todos;

    $scope.viewTodo = function(id) {
      $location.path('/todo/' + id);
    };

    $scope.createTodo = function() {
      var obj = {
        name: $scope.createTodoName
      };

      $todo.create(obj).$promise.then(function(result) {
        $scope.createTodoName = '';

        delete result.$promise;
        delete result.$resolved;

        $scope.todos.push(result);
      });
    };

    $scope.destroyTodo = function(idx) {
      $todo.destroy({
        todo_id: $scope.todos[idx].id
      }).$promise.then(function(result) {
        $scope.todos.splice(idx, 1);
      });
    };
  }]);

})();
