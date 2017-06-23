// Libraries
var plugin = require('./plugin');
var out = require('../lib/output');

// Configuration
exports.config = plugin.configurePlugin({
  name: "Slack",
  slug: "slack"
});

// Must return slug.
exports.getSlug = function() {
  return "slack";
}

// Must return name.
exports.getName = function() {
  return "Slack";
}

exports.execute = function(route) {
  var subdomain = route;
  if (!plugin.hasRoute(subdomain)) {
    subdomain = out.ask(this, "Type in the subdomain name of your Slack team (xxxxx.slack.com):");
  }
  out.print(this, "Redirecting to https://"+subdomain+".slack.com...");
  out.openURL("https://"+subdomain+".slack.com");
}
