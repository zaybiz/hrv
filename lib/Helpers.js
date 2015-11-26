"use strict";

var _ = require('lodash');

module.exports = {
  asciiToArray: function asciiToArray(text) {
    var re = /\r\n|\n\r|\n|\r/g;
    return text.replace(re, "\n").split("\n");
  }
};