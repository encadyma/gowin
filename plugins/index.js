// Array of plugins
var slack = require('./slack');

// Import your plugin above and input it into your array here
var plugins = [
  slack
];

exports.plugins = plugins;

exports.executePluginBySlug = function (slug, route) {
  var isPlugin = false;
  var selectedPlugin = null;

  plugins.forEach(function(value, index) {
    if (value.getSlug() === slug) {
      selectedPlugin = value;
      isPlugin = true;
    }
  });

  if (isPlugin) {
    selectedPlugin.execute(route);
  }

  return selectedPlugin;
}
