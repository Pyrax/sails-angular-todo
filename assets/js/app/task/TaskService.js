/**
 * Created by piranha on 01.01.15.
 */

(function() {

  var taskService = angular.module('app.taskService', ['ngResource']);

  taskService.provider('$task', function() {

    this.$get = ['$resource', function($resource) {

      return $resource(
        '/task/:task_id', {
          task_id: '@id'
        }, {
          'findOne':  { method: 'GET' },
          'create':   { method: 'POST' },
          'destroy':  { method: 'DELETE' },
          'update':   { method: 'PUT' }
        }
      );

    }];

  });

})();
