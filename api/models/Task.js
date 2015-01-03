/**
 * Task.js
 *
 * @description :: Tasks inside todolists
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  _statusChanged: false,

  beforeUpdate: function(valuesToUpdate, cb) {
    this._statusChanged = (valuesToUpdate.done !== 'undefined');
    cb();
  },

  afterUpdate: function(values, cb) {
    var statusChanged = this._statusChanged;

    Todo.findOne(values.list).exec(function(err, todo) {
      if(err) {
        return cb(err);
      }

      if(statusChanged) {
        if(values.done) {
          todo.tasksDone ++;
        } else {
          todo.tasksDone --;
        }
      }

      todo.save(function(err) {
        if(err) {
          return cb(err);
        }

        cb();
      });
    });
  },

  afterCreate: function(values, cb) {
    Todo.findOne(values.list).exec(function(err, todo) {
      if(err) {
        return cb(err);
      }

      todo.tasksCount ++;
      todo.save(function(err) {
        if(err) {
          return cb(err);
        }

        cb();
      });
    });
  },

  afterDestroy: function(destroyedTasks, cb) {
    Todo.find({
      id: _.uniq(_.pluck(destroyedTasks, 'list'))
    }).exec(function(err, todos) {
      if(err) {
        return cb(err);
      }

      var tasks = _.groupBy(destroyedTasks, 'list');
      var finished = _.after(todos.length, cb);

      todos.forEach(function(todo, idx, array) {
        todo.tasksDone -= (_.where(tasks[todo.id], {
          done: true
        })).length;

        todo.tasksCount -= tasks[todo.id].length;
        todo.save(finished);
      });
    });

    /* DEPRECATED CODE (SEE ABOVE)
       Universal solution using underscore if our application allows to
       destroy multiple tasks from different todo-lists at the same time

    var finished = _.after(destroyedTasks.length, function(err) {
      if(err) {
        return cb(err);
      }

      cb();
    });

    _.each(destroyedTasks, function(task, idx, array) {
      Todo.findOne(task.list).exec(function(err, todo) {
        if(err) {
          return finished(err);
        }

        if(task.done) {
          todo.tasksDone --;
        }

        todo.tasksCount --;
        todo.save(function(err) {
          if(err) {
            return finished(err);
          }

          finished();
        });
      })
    }); */
  },

  attributes: {

    description: {
      type: 'string',
      required: true
    },

    done: {
      type: 'boolean',
      defaultsTo: false
    },

    list: {
      model: 'Todo',
      required: true
    }

  }
};

