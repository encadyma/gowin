// Array of plugins
var slack = require('./slack');

// Import your plugin above and input it into your array here
var plugins = [
  slack
];

// -------------------------------
// DO NOT EDIT BELOW THIS LINE
// -------------------------------

var _output = require('../lib/output');
var _storage = require('../lib/store');

exports.plugins = plugins;

exports.executePluginBySlug = function (slug, route) {
  var isPlugin = false;
  var selectedPlugin = null;

  plugins.forEach(function(value, index) {
    if (value.config.getSlug() === slug) {
      selectedPlugin = value;
      isPlugin = true;
    }
  });

  if (isPlugin) {
    if (!_storage.doesExistInPluginStore(selectedPlugin.config.getSlug())) {
      _output.log('plugins', "Initiating new plugin storage for " + selectedPlugin.config.getName());
      _storage.initPluginStore(selectedPlugin);
    }
    selectedPlugin.execute(route);
  }

  return selectedPlugin;
}
