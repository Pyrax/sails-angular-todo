/**
 * Created by piranha on 04.01.15.
 */

(function() {

  var taskFilter = angular.module('app.taskFilter', []);

  taskFilter.filter('tasksActive', function() {
    return function(tasks, filterByDone) {
      var res = [];
      filterByDone = filterByDone || false;

      angular.forEach(tasks, function(task) {
        if(filterByDone) {
          if(task.done === true) {
            res.push(task);
          }
        } else {
          if(task.done === false) {
            res.push(task);
          }
        }
      });

      return res;
    };
  });

})();
