// Copyright (c) 2017 Kevin Mo. All rights reserved.

// Process inputs

_plugins = require('../plugins')
_output = require('./output');

exports.process = function(plugin, route) {
  _output.log('process', "Finding plugin with reference '" + plugin + "'.");

  if (_plugins.executePluginBySlug(plugin, route)) {
    _output.log('process', "Executed plugin " + plugin + ".");
  } else {
    _output.logError('process', "Could not find plugin.");
  }
}
