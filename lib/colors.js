// Copyright (c) 2017 Kevin Mo. All rights reserved.

var chalk = require('chalk');

exports.colors = {
  title: chalk.cyan.bold,
  message: chalk.blue,
  messageCyan: chalk.cyan,
  error: chalk.red,
  input: chalk.magenta
}

exports.doesSupportColor = function() {
  return chalk.supportsColor;
}
