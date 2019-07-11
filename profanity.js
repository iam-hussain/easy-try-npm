var list = require('./languages/en.json')
var regex = /[^a-zA-Z0-9|\$|\@]|\^/g;
var replaceRegex = /\w/g;
var placeHolder =  '*';
function isProfane(string) {
    return string
      .split(/\b/)
      .map(function(w) {
        return w.toLowerCase().replace(regex, '');
      }, this)
      .filter(isProfaneLike, this)
      .shift() || false;
};

function isProfaneLike(word) {
    
    if (!!~list.indexOf(word)) {
        return true;
      }

    return list
      .map(function(w) {
          //console.log(w)
        return new RegExp('^' + w.replace(/(\W)/g, '\\$1') + '$', 'gi');
      }, this)
      .reduce(function(outcome, wordExp) {
        return outcome || wordExp.test(word);
      }, false);
};
function replaceWord(string) {
    return string.replace(regex, '').replace(replaceRegex, placeHolder);
  };

function Filter(string, Lang) {
    list = require('./languages/'+Lang+'.json')
    console.log(list)
    return string.split(/\b/).map(function(word) {
        console.log(" ==word== ", word, " isProfane(word) == ", isProfane(word) )
        return isProfane(word) ? replaceWord(word) : word;
      }.bind(this)).join('');
}
  
module.exports.Filter = Filter;