var Token = require("./Token.js")

/**
 * Mention Token.
 */
var Mention = function(start, value){
  Token.call(this, start, value);
}

Mention.prototype = Object.create(Token.prototype, {
    constructor: {
      value: Mention,
      enumerable: false
    }
});

/**
 * A Mention token is an '@' symbol
 * followed by a minimum of 3 alphanumeric
 * or underscore characters.
 *
 * @params start Number the position in `text` 
 *   to start parsing at.
 * @params text String the text to parse. 
 * 
 * @returns Mention | Number - A new Mention token
 *   if one was found. The ending position if none
 *   was found.
 */
Mention.parse = function(start, text){
  if(text[start] != '@'){
    return start;
  }

  var value = "@";
  var i = start+1;
  
  for(i; i < text.length; i++){
    if(/^[a-z0-9_]+$/i.test(text[i])){
      value += text[i];
    }
    else {
      break;
    }
  }
  
  if(value.length >= 4){
    return new Mention(start, value);
  }
  
  return i;
}

module.exports = Mention;
