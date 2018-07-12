let Hashtag = require("./src/Hashtag.js");
let Link = require("./src/Link/Link.js");
let Mention = require("./src/Mention.js");

/**
 * TokenizerJS
 * 
 * @param text String input to be tokenized.
 * @returns object Entites containing array of 
 *   hashtags, mentions, and links.
 */
module.exports = (text) => {
  var start = 0;
  var value = "";  
  var tokens = [];
  
  var entities = {
    hashtags: [],
    mentions: [],
    links: []
  }

  for(var i = 0; i <= text.length; i++){
    if(text[i] == '#'){
      var hashtag = Hashtag.parse(i, text);
  
      if(typeof hashtag != 'number'){
        i = hashtag.end;
        entities.hashtags.push(hashtag);
      }
    }
    else if(text[i] == '@'){
      var mention = Mention.parse(i, text);
      
      if(typeof mention != 'number'){
        i = mention.end;
        entities.mentions.push(mention);
      }
    }
    else {
      var link = Link.parse(i, text);

      if(typeof link != 'number'){
        i = link.end;
        entities.links.push(link);
      }
      else {
        i = link;
      }
    }
  }
  
  return entities;
}
