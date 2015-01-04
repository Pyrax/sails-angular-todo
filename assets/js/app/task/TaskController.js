/**
 * Created by piranha on 31.12.14.
 */

(function() {

  var taskController = angular.module('app.taskController', ['app.taskService']);

  taskController.controller('TaskController', ['$scope', '$location', '$routeParams', '$task', 'todoList', function($scope, $location, $routeParams, $task, todoList) {
    $scope.todoList = todoList;

    $scope.viewTodos = function() {
      $location.path('/todo');
    };

    $scope.addTask = function() {
      var obj = {
        description: $scope.addTaskName,
        list: parseInt($routeParams.todo_id)
      };

      $task.create(obj).$promise.then(function(result) {
        $scope.addTaskName = '';

        delete result.$promise;
        delete result.$resolved;

        $scope.todoList.tasks.push(result);
      });
    };

    $scope.destroyTask = function(idx) {
      $task.destroy({
        task_id: $scope.todoList.tasks[idx].id
      }).$promise.then(function(result) {
          $scope.todoList.tasks.splice(idx, 1);
      });
    };

    $scope.updateTaskStatus = function(task) {
      $task.update({
        task_id: task.id
      }, {
        done: !task.done
      }).$promise.then(function(result) {
        task.done = !task.done;

        if(task.done) {
          $scope.todoList.tasksDone ++;
        } else {
          $scope.todoList.tasksDone --;
        }
      });
    };
  }]);

})();
