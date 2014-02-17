/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var chalk = require('chalk');
var _ = require('lodash');

/**
 * Adds filters to the context
 *
 * @name filters
 * @param {Object} options
 * @return {Object}
 * @api private
 */

exports.init = function (phaser) {
  var opts = _.extend({}, phaser.options);
  var extendContext = phaser.utils.extendContext;

  var filters = {};
  var builtIns = ['lib/filters/*.js'];

  /**
   * Built-in filters
   */

  _.extend(filters, extendContext(phaser, builtIns));

  /**
   * User-defined
   */

  _.extend(filters, extendContext(phaser, opts.filters));

  phaser.verbose.info(filters);
  phaser.verbose.info(_.keys(filters).length + ' filters registered.', chalk.green('OK.'));
  phaser.context = _.extend({}, phaser.context, filters);
};