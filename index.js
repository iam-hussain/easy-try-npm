var Profanity = require('./Profanity/profanity');
var Incrementer = require('./nextNumber/nextNumber');

var filter = new Profanity();

var incrementer = new Incrementer({uppercase : true, incrementer_by: 500, formate : '99Zz99'});

console.log(incrementer.next('aaa999AZz999'), " === ",incrementer.next(), "  ==  ", incrementer.next(), "  ==  ", incrementer.next(), "  ==  ", incrementer.next(), "  ==  ", incrementer.next(), "  ==  ", incrementer.next(), "  ==  ", incrementer.next(), "  ==  ", incrementer.next())

console.log(filter.clean("Fuck off little boy", 'sdsd'))

console.log(filter.isCorrectLang('es'))


module.exports.Profanity = Profanity;