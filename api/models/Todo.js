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

    tasks: {
      collection: 'Task',
      via: 'list'
    }

  }
};

