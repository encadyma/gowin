
/* Example plugin configuration:
exports.config = plugin.configurePlugin({
  name: "Slack",
  slug: "slack"
});
*/

// Easily configures any plugin for easy usage
exports.configurePlugin = function(config) {
  return {
    getSlug: function() {
      return config.slug;
    },
    getName: function() {
      return config.name;
    }
  }
}

exports.hasRoute = function(route) {
  return !(!route || /^\s*$/.test(route));
}
