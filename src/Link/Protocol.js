var Token = require("../Token.js")

/**
 * Protocol Token.
 */
var Protocol = function(start, value){
  Token.call(this, start, value);
}

Protocol.prototype = Object.create(Token.prototype, {
    constructor: {
      value: Protocol,
      enumerable: false
    }
});

/**
 * The protocol portion of the URL.
 *
 * Grammar
 *  PROTOCOL  :=  PRO "://"
 *  PRO       :=  (Non-whitespace string of characters.)
 * 
 * @params start Number the position in `text`
 *   to start parsing at.
 * @params text String the text to parse.
 * @returns Protocol | Number - Protocol Token if one was found.
 *   Final position otherwise.
 */
Protocol.parse = function(start, text){
  var value = "";
  var found = false;
  var i = start;

  for(i; i < text.length; i++){
    if(/^[a-z0-9]+$/i.test(text[i])){
      value += text[i];
    }
    else if(text[i] == ':' && text[i+1] == '/' && text[i+2] == '/'){
      found = true;
      value += "://";
      break;
    }
    else {
      return i;
    }
  }
  
  if(found){
    return new Protocol(start, value);
  }
  
  return i;
}

module.exports = Protocol;

