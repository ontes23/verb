/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');
var generate = require('marked-toc');


/**
 * Generate a Table of Contents.
 *
 * @param  {String} str
 * @param  {Object} options
 *
 * @return {String} the Table of Contents
 * @api public
 */

module.exports = function(str, options) {
  var opts = _.extend({}, options);
  return generate(str, opts).toc || {};
};