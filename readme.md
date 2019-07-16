# EasyTry 1.0.2

A lightweight library for profanity words filter, auto generate unique alphanumeric id as incremental sequentially, etc..
  
# Instalation 

Using npm:   
```js   
$ npm i easytry
$ npm i --save easytry 
```

In Node.js: 
```js   
var EasyTry = require('easytry');
```

# Example Usage   

## Next Incrementer
A Javascript function to generate alphanumeric increment sequentially. Used for auto generating unique alphanumeric id with specified pattern


```js   
var Incrementer = new EasyTry.Incrementer();

Incrementer.next('2019/01/ABC001')
// => 2017/08/ABC002
Incrementer.next('aaa999AZz999')
// => aaa999BAa000
```

**Options**

```js   
var Incrementer = new EasyTry.Incrementer({uppercase : true, incrementer_by: 10, formate : 'aaAA001'});

Incrementer.next()
// => AAAA011
Incrementer.next()
// => AAAA021
Incrementer.next('AAA999BAA009')
// => AAA999BAA499
```
> **Note:** Default value for Incrementer  **uppercase : false, incrementer_by: 1, formate : '000aa0'**.


## Profanity Word Filer
 A Javascript function for detecting and filtering profanity words. Support for Multi Language is included.

```js   
    var Filter = new EasyTry.Profanity({lang : 'en'});
    console.log(Filter.clean("Don't be an ash0le")); //Don't be an ******
    //Allowed Language are ['ar','cs','da','en','eo','es','fa','fi','fr','hi','hu','it','ja','ko','nl','no','pl','pt','ru','sv','th','tlh','zh']
```
> **Note:** Default value for Profanity  **lang : 'en', placeHolder: '*'**.

**Placeholder Overrides**
```js   
var Filter = new EasyTry.Profanity({ placeHolder: 'x'});
console.log(Filter.clean("Don't be an ash0le")); //Don't be an xxxxxx
```

**Regex Overrides**
```js
var Filter = new EasyTry.Profanity({ regex: /\*|\.|$/gi });
var Filter = new EasyTry.Profanity({ replaceRegex:  /[A-Za-z0-9가-힣_]/g }); 
//multilingual support for word filtering
```

**Add words to the blacklist**
```js
var Filter = new EasyTry.Profanity(); 
Filter.addWords('some', 'bad', 'word');
Filter.clean("some bad word!") //**** *** ****!

//or use an array using the spread operator

var newBadWords = ['some', 'bad', 'word'];
Filter.addWords(...newBadWords);
Filter.clean("some bad word!") //**** *** ****!

//or

var Filter = new Filter({ list: ['some', 'bad', 'word'] }); 
Filter.clean("some bad word!") //**** *** ****!
```

**Instantiate with an empty list**
```js
var Filter = new EasyTry.Profanity({ emptyList: true }); 
Filter.clean('hell this wont clean anything'); //hell this wont clean anything
```

**Remove words from the blacklist**
```js
var Filter = new EasyTry.Profanity();    
Filter.removeWords('hells' 'sadist');
Filter.clean("some hells word!"); //some hells word!

//or use an array using the spread operator

var removeWords = ['hells', 'sadist'];
Filter.removeWords(...removeWords);
Filter.clean("some sadist hells word!"); //some sadist hells word!
```

**Export words list with language**
```js
var Filter = new EasyTry.Profanity();    
Filter.wordsList('en'); // [ "*dyke", "*shit*", "2g1c", "4r5e", "5h1t", "5hit"...]
Filter.wordsList('es'); // [ "Asesinato", "Bollera", "Cabron", "Cabrón", "Caca", "Chupada",..]
// on error lang is 'en'
```

