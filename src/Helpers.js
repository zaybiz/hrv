const _ = require('lodash');

module.exports = {
  asciiToArray(text){
    const re=/\r\n|\n\r|\n|\r/g;
    return text.replace(re,"\n").split("\n");
  }
}
