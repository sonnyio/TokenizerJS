var assert = require('assert');

var Token = require('../src/Token.js');

describe('Token', function() {
  describe('new Token(..)', function() {
    it('should throw error for starting position that is not an integer', function() {
      try{
        var token = new Token("0", "123");
        assert(false);
      }
      catch(error){
        assert(true);
      }
    });

    it('should throw error for no value token', function() {
      try{
        var token = new Token(10, "");
        assert(false);
      }
      catch(error){
        assert(true);
      }
    });    

    it('should successfully create a new token.', function() {
      var token = new Token(0, "123");
    });        

  });
});
