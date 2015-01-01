/**
 * Created by piranha on 31.12.14.
 */

(function() {

  var todoService = angular.module('app.todoService', ['ngResource']);

  todoService.provider('$todo', function() {

    this.$get = ['$resource', function($resource) {

      return $resource(
        '/todo/:todo_id', {
          todo_id: '@id'
        }, {
          'find':     { method: 'GET', isArray: true },
          'findOne':  { method: 'GET', params: { populate: 'tasks' } },
          'create':   { method: 'POST' },
          'destroy':  { method: 'DELETE' },
          'update':   { method: 'PUT' }
        }
      );

    }];

  });

})();
