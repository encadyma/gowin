// Copyright (c) 2017 Kevin Mo. All rights reserved.
// Slack is a property of Slack Technologies, Inc

// Libraries
var _  = require('underscore');
var plugin = require('./plugin');
var out = require('../lib/output');
var storage = require('../lib/store');

// Configuration
exports.config = plugin.configurePlugin({
  name: "Slack",
  slug: "slack",
  store: {
    usingStore: true,
    teams: [
      // Format: {subdomain: "gowin", displayName: "The Gowin Slack", shortcut: "go"}
    ]
  }
});


// Main function that is called by plugin
exports.execute = function(route) {

  // Check if input is null
  if (!plugin.hasRoute(route)) {
    route = out.ask(this, "Type in the subdomain name of your Slack team (xxxxx.slack.com): ");
  }

  route = route.toLowerCase();

  var subdomain = "";

  // Not found within the database, or only the default entry exists.
  if (checkIfExisting('teams', route) === 0) {
    // Create a default entry + shortcut!
    subdomain = route;

    // Prompt for titles
    var display = out.ask(this, "Enter in your Slack team's name for '"+subdomain+".slack.com' (ex: Example Company Slack): ");
    var shortcut = out.ask(this, "Enter in a memorable shortcut for '"+subdomain+".slack.com': slack/");

    // Cache it!
    cacheTeam(subdomain, subdomain, subdomain);
    cacheTeam(subdomain, display, shortcut.toLowerCase());
  } else {
    // Find subdomain based on shortcut
    route = route.toLowerCase();

    var team = _.where(storage.getValue(exports, 'teams').data, {shortcut: route})[0];
    subdomain = team.subdomain;
    display = team.displayName;
  }

  // Redirect to subdomain
  out.print(this, "Redirecting to "+display+" (https://"+subdomain+".slack.com)...");
  out.openURL("https://"+subdomain+".slack.com");
}


// Store the actual value in a storage database
function cacheTeam (sub, display, short) {
  out.print(exports, "Sending request to gowin/store to cache https://"+sub+".slack.com.");

  // Check for duplication
  if (storage.getValue(exports, 'teams').success) {
    if (checkIfExisting('teams', sub) > 1) {
      out.print(exports, "Notice! Value already stored in!");
    } else {
      storage.postValueArray(exports, 'teams', {
        subdomain: sub, displayName: display, shortcut: short
      });
    }
  }

}

// Returns how many values are existing
function checkIfExisting (ref, route) {
  return _.filter(
    storage.getValue(exports, ref).data,
    function (val) {
      return val.subdomain === route || val.shortcut === route;
    }
  ).length;
}
