/**
 * Token
 * Basic description of the token.
 * A token has a zero-based starting
 * and ending position and a string value.
 */
module.exports = function Token(start, value){
  if(!Number.isInteger(start)){   
    throw new Error("Attempting to create a new Token with starting position "
                   +"'"+start+"' of type '"+(typeof start)+"', but Token must"
                   +" have an integer value as it's starting position.");  
  }

  if(value.length == 0){
    throw new Error("Attempting to create a new Token with no value at "+start);
  }
  
  this.start = start;
  this.end = start + value.length - 1;  
  this.value = value;
}
