/**
 * Task.js
 *
 * @description :: Tasks inside todolists
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

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

