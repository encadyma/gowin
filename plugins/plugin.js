// Copyright (c) 2017 Kevin Mo. All rights reserved.

/* Example plugin configuration:

exports.config = plugin.configurePlugin({
  name: "My Plugin",          // Your plugin's display name
  slug: "myplugin",           // What your users will type in
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
