var Token = require("../Token.js");
var Protocol = require("./Protocol.js");
var Auth = require("./Auth.js");
var Host = require("./Host.js");
var Path = require("./Path.js");

/**
 * Link Token.
 */
var Link = function(start, value, elements){
  this.elements = elements;
  Token.call(this, start, value);
}

Link.prototype = Object.create(Token.prototype, {
    constructor: {
      value: Link,
      enumerable: false
    }
});

/**
 * Attempts to parse a clickable Link based on the following format.
 * 
 * ┌─────────────────────────────────────────────────────────────────────────────────────┐
 * │                                            Link Token                               │
 * ├──────────┬──┬─────────────────────┬─────────────────────┬───────────────────────────┤
 * │ Protocol │  │        Auth         │        Host         │           Path            │
 * │(optional)│  │      (optional)     │      (required)     │          (optional)       │
 * │          │  │                     │                     │          
 * "  https:   //    user   :   pass   @ sub.host.com : 8080   /p/a/t/h  ?  query=string "
 * │          │  │                     │   hostname     port │                           │
 * └──────────┴──┴─────────────────────┴─────────────────────┴───────────────────────────┘
 *
 * A clickable link could be something simple like `google.com` or more complex like 
 * `https://google.com` etc. The goal is to identify potential links that follow the 
 * above format. Using something like `url.parse("google.com")` will fail, even though
 * a user would expect to be able to click on that link.
 *
 * Grammar
 *   LINK     :=   HOST
 *            :=   HOST PATH 
 *            :=   AUTH "@" HOST 
 *            :=   AUTH "@" HOST PATH 
 *            :=   PROTOCOL HOST
 *            :=   PROTOCOL HOST PATH 
 *            :=   PROTOCOL AUTH "@" HOST 
 *            :=   PROTOCOL AUTH "@" HOST PATH 
 * 
 *  PROTOCOL  :=  PRO "://"
 *  PRO       :=  (Non-whitespace string of characters.)
 * 
 *  AUTH      :=  USER ":" PASS
 *  USER      :=  (Non-whitespace string of characters.)
 *  PASS      :=  (Non-whitespace string of characters.)
 *
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
 *  PATH      := "/"
 *            := "/" NW 
 *            := "/" NW PATH
 *            := "?" NW
 *  NW        := (Non-whitespace string of characters.)
 * 
 *
 * (Graphic adapted from https://nodejs.org/docs/latest/api/url.html)  
 *
 * @params start Number the position in `text`
 *   to start parsing at.
 * @params text String the text to parse.
 * @returns Link | Number - Link Token if one was found.
 *   Final position otherwise.
 */
Link.parse = function(start, text){
  var value = "";
  var i = start;
  var found = false;
  
  let elements = {
    protocol: {
      tokenizer: Protocol,
      required: false
    },
    auth: {
      tokenizer: Auth,
      required: false      
    },
    host: {
      tokenizer: Host,
      required: true      
    },
    path: {
      tokenizer: Path,
      required: false      
    }
  }

  var keys = Object.keys(elements);

  for(var j = 0; j < keys.length; j++){
    var key = keys[j];
    var token = elements[key].tokenizer.parse(i, text);

    elements[key].value = token;
    
    if(typeof token != 'number'){
      i = token.end+1;
      value += token.value;
    }
    else if(elements[key].required){
      return token;
    }

    delete elements[key].tokenizer;    
  };

  if(value.length > 0){
    return new Link(start, value, elements);
  }

  return i;
}

module.exports = Link;




