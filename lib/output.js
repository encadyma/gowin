// Output to user through various mediums (ex. open browser link)

var prompt = require('syncprompt');
var openBrowser = require('open');

exports.openURL = function (url) {
  console.log("[gowin/output] Opening "+url);
  openBrowser(url);
  return true;
}

exports.print = function (plugin, message) {
  console.log("[%s] %s", plugin.config.getName(), message);
}

exports.ask = function (plugin, message) {
  var answer = prompt("["+plugin.config.getName()+"] "+message+" ");
  return answer;
}
