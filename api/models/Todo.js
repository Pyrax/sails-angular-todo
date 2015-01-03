/**
 * Todo.js
 *
 * @description :: List containing different tasks
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      unique: true,
      required: true,
      size: 64
    },

    tasksDone: {
      type: 'integer',
      defaultsTo: 0
    },

    tasksCount: {
      type: 'integer',
      defaultsTo: 0
    },

    tasks: {
      collection: 'Task',
      via: 'list'
    }

  }
};

