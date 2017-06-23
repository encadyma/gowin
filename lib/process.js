// Process inputs

plugins = require('../plugins');

exports.process = function(plugin, route) {
  console.log("[gowin/process] Wanted to run plugin:", plugin);
  console.log("[gowin/process] Route to pass into module:", route);

  if (plugins.executePluginBySlug(plugin, route)) {
    //console.log("Could execute plugin.");
  } else {
    console.log("Could not find plugin.");
  }
}
