# EasyTry 1.0.2

A lightweight   library for profanity words filter, random genrator, etc..
  
# Instalation 

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

**Simple Filter**

```js   
    var Profanity = require('easytry').Profanity;
    var Filter = new Profanity();
    console.log(Filter.clean('Example sentences to be filtered'))
```
**Options in Filter**

```js   

```