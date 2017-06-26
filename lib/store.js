// Copyright (c) 2017 Kevin Mo. All rights reserved.

var Store = require("configstore");

var _output = require('./output');
var _storage = new Store('gowin', {
  plugins: {}
});

exports.doesExistInPluginStore = function (slug) {
  return _storage.has('plugins.'+slug);
}

exports.initPluginStore = function (plugin) {
  if (plugin.config.hasStore()) {
    _storage.set(getPath(plugin), plugin.config.getDefaultStore());
    _output.log("store", "Successfully initiated new plugin storage for "+plugin.config.getName());
    _output.log("store", "Reference: File is located in "+_storage.path);
    console.log(_storage.get());
  } else {
    _output.logError("store", "Application does not use plugin storage. Skipping.");
  }
}

exports.postValue = function (plugin, key, value) {
  if (plugin.config.hasStore()) {
    _storage.set(getPath(plugin)+'.'+key, value);
  } else {
    _output.logError("store", "Application does not use plugin storage. Invalid operation.");
  }
}

exports.postValueArray = function (plugin, key, item) {
  if (plugin.config.hasStore()) {
    if (!_storage.has(getPath(plugin)+'.'+key)) {
      _storage.set(getPath(plugin)+'.'+key, []);
    }
    var newArray = _storage.get(getPath(plugin)+'.'+key);
    newArray.push(item);
    _storage.set(getPath(plugin)+'.'+key, newArray);
  } else {
    _output.logError("store", "Application does not use plugin storage. Invalid operation.");
  }
}

exports.getValue = function (plugin, key) {
  if (plugin.config.hasStore()) {
    if (_storage.has(getPath(plugin)+'.'+key)) {
      return {
        success: true,
        data: _storage.get(getPath(plugin)+'.'+key)
      };
    } else {
      return {success: false};
    }
  } else {
    _output.logError("store", "Application does not use plugin storage. Invalid operation.");
    return {success: false};
  }
}

// Returns path
function getPath (plugin) {
  return 'plugins.'+plugin.config.getSlug();
}
