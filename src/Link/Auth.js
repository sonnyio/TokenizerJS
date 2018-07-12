var Token = require("../Token.js")

/**
 * Link Token.
 */
var Auth = function(start, value, user, pass){
  this.user = user;
  this.pass = pass;
  Token.call(this, start, value);
}

Auth.prototype = Object.create(Token.prototype, {
    constructor: {
      value: Auth,
      enumerable: false
    }
});

/**
 * The Auth portion of a URL is non whitespace
 * characters seperated by a `:` followed by another
 * set of non whitespace characters.
 * 
 * Grammar
 * AUTH := USER:PASS
 * USER := (Non-whitespace string of characters.)
 * PASS := (Non-whitespace string of characters.)
 *
 * @params start Number the position in `text`
 *   to start parsing at.
 * @params text String the text to parse.
 * @returns Auth | Number - Auth Token if one was found.
 *   Final position otherwise.
 */
Auth.parse = function(start, text){
  var value = "";
  var i = start;
  var found = false;
  var state = 1;
  var user = "";
  var pass = "";
  
  for(i; i < text.length; i++){
    if(state == 1 && text[i] == ':'){
      value += ":";
      state = 2;
    }
    else if(state == 2 && text[i] == '@'){
      value += "@";
      found = true;
      break;
    }
    else if(/\S/.test(text[i])){
      value += text[i];
      
      if(state == 1){
        user += text[i];
      }
      else {
        pass += text[i];        
      }
    }
    else {
      return i;
    }
  }

  if(found){
    return new Auth(start, value, user, pass);
  }

  return i;
}

module.exports = Auth;

