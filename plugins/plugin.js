
/* Example plugin configuration:
exports.config = plugin.configurePlugin({
  name: "Slack",
  slug: "slack",
  store: {
    usingStore: false/true
  }
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
    },
    hasStore: function() {
      return config.store.usingStore;
    },
    getDefaultStore: function() {
      return config.store;
    }
  }
}

exports.hasRoute = function(route) {
  return !(!route || /^\s*$/.test(route));
}
