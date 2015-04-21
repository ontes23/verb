'use strict';

/**
 * Module dependencies.
 */

var _ = require('lodash');
var through = require('through2');
var reflinks = require('helper-reflinks');
var utils = require('../utils');

/**
 * Append reflinks to `file.contents`
 */

module.exports = function reflinks_() {
  var verb = this;

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }
    if (file.isStream()) {
      this.emit('error', new utils.PluginError('verb-init:', 'Streaming is not supported.'));
      return cb();
    }

    try {
      if (file.path.indexOf('README') === -1 || file.options.reflinks === true) {
        this.push(file);
        return cb();
      }

      verb.union('reflinks', file.data.reflinks || []);
      var list = verb.get('reflinks') || [];

      if (!list || !list.length) {
        this.push(file);
        return cb();
      }

      var stream = this;
      var str = file.contents.toString();
      str += '\n\n<!-- reflinks generated by verb-reflinks plugin -->\n\n';

      reflinks(list, function (err, res) {
        if (err) {
          stream.emit('error', new utils.PluginError('verb-reflinks:', err));
          return cb();
        }

        file.contents = new Buffer(str + res);
        stream.push(file);
        return cb();
      });

    } catch (err) {
      this.emit('error', new utils.PluginError('verb-reflinks:', err));
      return cb();
    }
  });
};