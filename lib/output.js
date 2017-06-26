// Copyright (c) 2017 Kevin Mo. All rights reserved.

// Output to user through various mediums (ex. open browser link, print to terminal, etc.)

var prompt = require('syncprompt');
var openBrowser = require('open');

var _colors = require('./colors').colors;

exports.openURL = function (url) {
  exports.log('output', "Opening "+url+" using default browser.");
  openBrowser(url);
}

exports.print = function (plugin, message) {
  console.log(_colors.title("["+plugin.config.getName()+"]") + " " + _colors.messageCyan(message));
}

exports.log = function (name, message) {
  console.log(_colors.title("[gowin/"+name+"]") + " " + _colors.message(message));
}

exports.logError = function (name, message) {
  console.log(_colors.title("[gowin/"+name+"]") + " " + _colors.error(message));
}

exports.ask = function (plugin, message) {
  var answer = prompt(_colors.title("["+plugin.config.getName()+" @ plugins/"+plugin.config.getSlug()+"] ") + _colors.input(message));
  return answer;
}
