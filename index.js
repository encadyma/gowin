#!/usr/bin/env node

var gowin = require('commander');

var _output = require('./lib/output');
var processing = require('./lib/process');

// Launch!
_output.log('launch', 'gowin has touchdown.');

// Accepting arguments
gowin.arguments("<launch-string>")
  .action(function (launchString) {
    var launchArgs = launchString.split("/");
    processing.process(launchArgs[0], launchArgs[1]);
  })
  .parse(process.argv);
