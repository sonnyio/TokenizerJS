var Token = require("../Token.js")
var tlds = require("tlds");

/**
 * Link Token.
 */
var Host = function(start, value, hostParts, port){
  this.host = hostParts;
  this.tld = hostParts[hostParts.length - 1];
  this.port = port;
  Token.call(this, start, value);
}

Host.prototype = Object.create(Token.prototype, {
    constructor: {
      value: Host,
      enumerable: false
    }
});

/**
 * The Host portion of a URL
 *
 * Grammar
 *  HOST      :=  "localhost"
 *            :=  SUB "." SUB
 *            :=  SUB "." HOST
 *            :=  SUB "." HOST ":" PORT
 *  PORT      :=  NUM NUM
 *            :=  NUM NUM NUM
 *            :=  NUM NUM NUM NUM
 *            :=  NUM NUM NUM NUM NUM
 *  NUM       :=  0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
 *
 * @params start Number the position in `text`
 *   to start parsing at.
 * @params text String the text to parse.
 * @returns Host | Number - Host Token if one was found.
 *   Final position otherwise.
 */
Host.parse = function(start, text){
  var value = "";
  var i = start;
  var state = 1;
  var port = "";  
  var part = "";
  var hostParts = [];

  for(i; i < text.length; i++){
    if(state == 1){
      if(/[a-zA-Z\u00a1-\uffff0-9]/.test(text[i])){
        part += text[i];
        value += text[i];
      }
      else if (text[i] == '.'){
        hostParts.push(part);
        part = "";
        value += ".";
      }
      else if (text[i] == ':'){
        state = 2;
        value += ':'
      }
      else {
        break;
      }
    }
    else if(state == 2){
      if(/[0-9]/.test(text[i])){
        port += text[i];
        value += text[i];
      }
      else {
        break;
      }
    }
  }

  if(part.length > 0){
    hostParts.push(part);
  }

  if(hostParts.length > 0 && (port.length == 0 || (port.length >= 2 && port.length <= 5))){
    if(hostParts.length == 1){
      if(hostParts[0] == "localhost"){
        return new Host(start, value, hostParts, port);
      }
      
      return i;
    }
    else if(tlds.indexOf(hostParts[hostParts.length - 1]) != -1){
      return new Host(start, value, hostParts, port);
    }
  }

  return i;
}

module.exports = Host;
