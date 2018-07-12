var Token = require("../Token.js")

/**
 * Link Token.
 */
var Path = function(start, value, paths){
  this.path = paths;
  Token.call(this, start, value);
}

Path.prototype = Object.create(Token.prototype, {
    constructor: {
      value: Path,
      enumerable: false
    }
});

/**
 * Attempts to parse the path portion of a clickable link.
 * 
 * A path is a series of non-whitespace characters with the
 * path and possible query string. 
 * `/path/123` and `/a/b?c=123&d` are all valid paths.
 * 
 * Grammar
 *  PATH      := "/"
 *            := "/" NW 
 *            := "/" NW PATH
 *            := "?" NW
 *  NW        := (Non-whitespace string of characters.)
 *
 *
 * @params start Number the position in `text`
 *   to start parsing at.
 * @params text String the text to parse.
 * @returns Link | Number - Path Token if one was found.
 *   Final position otherwise.
 */
Path.parse = function(start, text){
  var value = "";
  var i = start;
  var part = "";
  var paths = [];
  
  for(i; i < text.length; i++){
    if(/\S/.test(text[i])){
      if(text[i] == "/"){
        part = "";
        paths.push(part);
      }
      else {
        part += text[i];
      }
      
      value += text[i];
    }
    else {
      break;
    }
  }
  
  if(part.length != 0){
    paths.push(part);
  }
  
  if(value.length > 0){
    return new Path(start, value, paths);
  }

  return i;
}

module.exports = Path;

