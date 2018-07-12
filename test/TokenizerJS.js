var assert = require('assert');

var TokenizerJS = require('../TokenizerJS.js');

describe('TokenizerJS', function() {
  describe("Hashtags", function() {
    it('should recognize simple hashtag', function() {
      var result =  TokenizerJS("Hello #world");

      assert(result.hashtags.length == 1);
    });
    
    it('should recognize multiple hashtags', function() {
      var result =  TokenizerJS("Hello #world #world2 and #world3");
      assert(result.hashtags.length == 3);
      assert(result.hashtags[0].start == 6);
    });
  
    it('should recognize single hashtag', function() {    
      var result =  TokenizerJS("#single");
      assert(result.hashtags.length == 1);
      assert(result.hashtags[0].start == 0);    
    });
    
    it('should recognize part of hashtag', function() {    
      var result =  TokenizerJS("Ok this is a #single!tag");
      assert(result.hashtags.length == 1);
      assert(result.hashtags[0].value == "#single");
    });
    
    it('should recognize multiple hashtags with no space', function() {    
      var result =  TokenizerJS("Ok this is a #single#tag");
      assert(result.hashtags.length == 2);
      assert(result.hashtags[0].value == "#single");
      assert(result.hashtags[1].value == "#tag");    
    });
    
    it('should not recognize bad hashtags', function() {    
      var result =  TokenizerJS("Ok this is bad #$");
      assert(result.hashtags.length == 0);
    });  
  });

  describe('Mentions', function(){
    it('should recognize a mention', function() {    
      var result =  TokenizerJS("Hello @sonny");
      assert(result.mentions.length == 1);
    });

    it('should recognize a two mentions', function() {    
      var result =  TokenizerJS("Hello @sonny and @_john");
      assert(result.mentions.length == 2);
      assert(result.mentions[0].start == 6);      
    });
    
    it('should recognize a single mention', function() {    
      var result =  TokenizerJS("@sin_gle");
      assert(result.mentions.length == 1);
    });              
    
    it('should recognize a 3 character mention', function() {    
      var result =  TokenizerJS("Hello @son");
      assert(result.mentions.length == 1);
    });

    it('should not recognize a <3 character mention', function() {
      var result =  TokenizerJS("Hello @so @s @");
      assert(result.mentions.length == 0);
    });

    it('should not recognize a bad part of  mention', function() {
      var result =  TokenizerJS("Hello @sonny* ");
      assert(result.mentions.length == 1);
      assert(result.mentions[0].value == "@sonny");
    });    
  });

  describe("Hashtags and Mentions", function() {
    it('should recognize simple hashtag and mention', function() {
      var result =  TokenizerJS("Hello #world and @sonny");
      assert(result.hashtags.length == 1);
      assert(result.mentions.length == 1);
    });
    
    it('should recognize multiple hashtags and mentions', function() {
      var result =  TokenizerJS("Hello #world @sonny #world2 @john_john and #world3 @jack");
      assert(result.hashtags.length == 3);
      assert(result.hashtags[0].start == 6);
      
      assert(result.mentions.length == 3);
      assert(result.mentions[0].start == 13);
    });
      
    it('should recognize part of hashtag and mention', function() {    
      var result =  TokenizerJS("Ok this is a #single!tag @sonny!n");
      assert(result.hashtags.length == 1);
      assert(result.mentions.length == 1);      
      assert(result.hashtags[0].value == "#single");
      assert(result.mentions[0].value == "@sonny");      
    });    
  });
  
  describe("Links", function() {
    it("should recognize link with auth", function(){
      var result = TokenizerJS("Hello https://sonny:dog@www.google.com");
      assert(result.links.length == 1);
      assert(result.links[0].value == "https://sonny:dog@www.google.com");
    });
    
    it("should recognize link without protocol", function(){
      var result = TokenizerJS("Hello www.google.com");
      assert(result.links.length == 1);
      assert(result.links[0].value == "www.google.com");      
    });

    it("should recognize link without protocol or www.", function(){
      var result = TokenizerJS("Hello google.com");
      assert(result.links.length == 1);
      assert(result.links[0].value == "google.com");
    });

    it("should not recognize link with invalid top level domain", function(){
      var result = TokenizerJS("Hello google.cakldfjklom");
      assert(result.links.length == 0);
    });

    it("should recognize localhost", function(){
      var result = TokenizerJS("Hello ://localhost:1001");
      assert(result.links.length == 1);      
    });                
  });
});

