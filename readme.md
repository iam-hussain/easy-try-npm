# EasyTry 1.0.2

A lightweight   library for profanity words filter, random genrator, etc..
  
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

## Next Incrementer

```js   
var Incrementer = EasyTry.Incrementer();

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
> **Note:** Default **formate** for Incrementer **000aa0**.