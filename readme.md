# EasyTry 1.0.2

A lightweight JavaScript library for profanity words filter, random genrator, etc..
  
# Instalation 
var EasyTry = require('easytry');

Using npm:   
```js   
    $ npm i easytry
    $ npm i --save easytry 
```

In Node.js: 
**Use ES5  JavaScript syntax**
```js   
    var EasyTry = require('easytry');
```

**Use ES6 JavaScript syntax**
```js   
    import EasyTry as 'easytry'
```

# Example Usage   

## Profanity Word Filer
 A Javascript fuction for detecting and filtering profanity words. Support for Multi Language is included.

    |    Arabic     |     German    |    English    |     French    |    Russian    |    Spanish    |    Italian    |
    |---------------|---------------|---------------|---------------|---------------|---------------|---------------|
    |       ar      |       de      |       en      |       fr      |       ru      |       es      |       it      |
     
> **ProTip:** Other **Language** are not allowed.

**Use ES5  JavaScript syntax**
```js   
    var EasyTry = require('easytry');
    EasyTry.Profanity.Filter('Example sentences to be filtered', 'en')
```

**Use ES6 JavaScript syntax**
```js   
    import { Profanity } as 'easytry';
    Profanity.Filter('Example sentences to be filtered', 'en')
```