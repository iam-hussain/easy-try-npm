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

## Next Incrementer

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

```js   
    var Filter = new EasyTry.Profanity();
    console.log(Filter.clean("Don't be an ash0le")); //Don't be an ******
```
### Placeholder Overrides
*Placeholder Overrides*
```js   
    //Placeholder Overrides
    var Filter = new EasyTry.Profanity({ placeHolder: 'x'});
    console.log(Filter.clean("Don't be an ash0le")); //Don't be an xxxxxx
```

    //Regex Overrides
    var Filter = new EasyTry.Profanity({ regex: /\*|\.|$/gi });
    var Filter = new EasyTry.Profanity({ replaceRegex:  /[A-Za-z0-9가-힣_]/g }); 
    //multilingual support for word filtering


    //Add words to the blacklist
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


    //Instantiate with an empty list
    var Filter = new EasyTry.Profanity({ emptyList: true }); 
    Filter.clean('hell this wont clean anything'); //hell this wont clean anything


    //Remove words from the blacklist
    var Filter = new EasyTry.Profanity();    
    Filter.removeWords('hells' 'sadist');
    Filter.clean("some hells word!"); //some hells word!
    //or use an array using the spread operator
    var removeWords = ['hells', 'sadist'];
    Filter.removeWords(...removeWords);
    Filter.clean("some sadist hells word!"); //some sadist hells word!

```


 A Javascript fuction for detecting and filtering profanity words. Support for Multi Language is included.

    |    Arabic     |     German    |    English    |     French    |    Russian    |    Spanish    |    Italian    |
    |---------------|---------------|---------------|---------------|---------------|---------------|---------------|
    |       ar      |       de      |       en      |       fr      |       ru      |       es      |       it      |
     
> **ProTip:** Other **Language** are not allowed.


