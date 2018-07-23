
# TokenizerJS

TokenizerJS takes a string as input and returns starting and ending positions and the values of the tokens found within that text. Out of the box, this tokenizer will find Mentions, Hashtags, and Clickable Links. It can easily be extended by created a new Token.

> I learned about Tokenization in a course on compiler construction and i've written a tutorial on this at `https://medium.com/@sonnytrujillo/how-to-parse-hashtags-and-mentions-with-a-tokenizer-in-nodejs-e7756730b573`. If you're unfamiliar with Tokenization and would like more advanded reading on the subject check out http://www.cs.man.ac.uk/~pjj/farrell/comp3.html and the wikipedia page on Lexical Analysis https://en.wikipedia.org/wiki/Lexical_analysis

# How To Use

Include TokenizerJS into your project and then simply call `TokenizerJS(...)`  with your string. An entities object will be returned.

```
var TokenizerJS = require("TokenizerJS");
var result = TokenizerJS("Hello @sonny what do you think about #tokenization? Follow me at twitter.com/sonnytrujillojr");
```
The above input returns the following entities object
```
{
  "hashtags": [
    {
      "start": 37,
      "end": 49,
      "value": "#tokenization"
    }
  ],
  "mentions": [
    {
      "start": 6,
      "end": 11,
      "value": "@sonny"
    }
  ],
  "links": [
    {
      "elements": {
        "host": {
          "value": {
            "host": [
              "twitter",
              "com"
            ],
            "tld": "com",
            "port": "",
            "start": 65,
            "end": 75,
            "value": "twitter.com"
          }
        },
        "path": {
          "value": {
            "path": [
              "",
              "sonnytrujillojr"
            ],
            "start": 76,
            "end": 91,
            "value": "/sonnytrujillojr"
          }
        }
      },
      "start": 65,
      "end": 91,
      "value": "twitter.com/sonnytrujillojr"
    }
  ]
}
```

## Entities Object
TokenizerJS returns an Entities object that contains an array of Hashtags, Mentions, and Links.

```
{
  hashtags: [],
  mentions: [],
  links: []
}
```

## Tokens

TokenizerJS parsed Mentions, Hashtags, and Clickable Links.

### Mentions
A mention is a starts with the `@` followed by three or more alphanumeric or underscore characters. An input of "Hello @sonny" would return the following information

```
{
  hashtags: [],
  mentions: [
   {
     "start": 6,
     "end": 11,
     "value": "@sonny"
   }  
  ],
  links: []
}
```

### Hashtags
A hashtag is a starts with the `#` followed by an one or more alphanumeric characters. An input of "Hello #world" would return the following information

```
{
  hashtags: [
   {
     "start": 6,
     "end": 11,
     "value": "#world"
   }
  ],
  mentions: [],
  links: []
}
```

### Clickable Links
A Clickable Link is a URL that a user would expect to be able to click on. This could be something simple like `google.com` or more complex like `https://google.com` etc. The goal is to identify potential links that follow the above format. Using something like `url.parse("google.com")` will fail, even though a user would expect to be able to click on that link.

```
 ┌─────────────────────────────────────────────────────────────────────────────────────┐
 │                                            Link Token                               │
 ├──────────┬──┬─────────────────────┬─────────────────────┬───────────────────────────┤
 │ Protocol │  │        Auth         │        Host         │           Path            │
 │(optional)│  │      (optional)     │      (required)     │          (optional)       │
 │          │  │                     │                     │          
 "  https:   //    user   :   pass   @ sub.host.com : 8080   /p/a/t/h  ?  query=string "
 │          │  │                     │   hostname     port │                           │
 └──────────┴──┴─────────────────────┴─────────────────────┴───────────────────────────┘
 ```
 

```
Clickable Link Grammar
   LINK      :=   HOST
             :=   HOST PATH 
             :=   AUTH "@" HOST 
             :=   AUTH "@" HOST PATH 
             :=   PROTOCOL HOST
             :=   PROTOCOL HOST PATH 
             :=   PROTOCOL AUTH "@" HOST 
             :=   PROTOCOL AUTH "@" HOST PATH 
  
   PROTOCOL  :=  PRO "://"
   PRO       :=  (Non-whitespace string of characters.)
  
   AUTH      :=  USER ":" PASS
   USER      :=  (Non-whitespace string of characters.)
   PASS      :=  (Non-whitespace string of characters.)
 
   HOST      :=  "localhost"
             :=  SUB "." SUB
             :=  SUB "." HOST
             :=  SUB "." HOST ":" PORT
   PORT      :=  NUM NUM
             :=  NUM NUM NUM
             :=  NUM NUM NUM NUM
             :=  NUM NUM NUM NUM NUM
   NUM       :=  0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  
   PATH      := "/"
             := "/" NW 
             := "/" NW PATH
             := "?" NW
   NW        := (Non-whitespace string of characters.)
```

## Custom Tokens

To create your own tokens you will need to update the `TokenizerJS.js` file to parse your new token. View the `src/Mentions.js` or `src/Hashtags.js` file for the template on how to build your own token.