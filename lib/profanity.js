var acceptedLang = ['ar','cs','da','en','eo','es','fa','fi','fr','hi','hu','it','ja','ko','nl','no','pl','pt','ru','sv','th','tlh','zh']

class Profanity {
  /**
   * Filter constructor.
   * @constructor
   * @param {object} options - Filter instance options
   * @param {string} options.lang - Instantiate filter with custom language
   * @param {boolean} options.emptyList - Instantiate filter with no blacklist
   * @param {array} options.list - Instantiate filter with custom list
   * @param {string} options.placeHolder - Character used to replace profane words.
   * @param {string} options.regex - Regular expression used to sanitize words before comparing them to blacklist.
   * @param {string} options.replaceRegex - Regular expression used to replace profane words with placeHolder.
   */

  constructor(options = {}) {
    Object.assign(this, {
      lang: this.isCorrectLang(options.lang)? options.lang : 'en',
      list: options.emptyList && [] || Array.prototype.concat.apply(this.isCorrectLang(options.lang)? require('../static/languages/' + options.lang + '.json') : require('../static/languages/en.json'), [options.list || []]),
      exclude: options.exclude || [],
      placeHolder: options.placeHolder || '*',
      regex: options.regex || /[^a-zA-Z0-9|\$|\@]|\^/g,
      replaceRegex: options.replaceRegex || /\w/g
    })
  }

  /**
   * Determine if a string contains accepted language.
   * @param {string} string - String to find the lang accepted or not.
   */
  isCorrectLang(string) {
    return acceptedLang
      .filter((word) => {
        return word == string;
      })
      .length > 0 || false;
  }

  /**
   * Determine if a string contains profane language.
   * @param {string} string - String to evaluate for profanity.
   */
  isProfane(string) {
    return this.list
      .filter((word) => {
        const wordExp = new RegExp(`\\b${word.replace(/(\W)/g, '\\$1')}\\b`, 'gi');
        return !this.exclude.includes(word.toLowerCase()) && wordExp.test(string);
      })
      .length > 0 || false;
  }

  /**
   * Replace a word with placeHolder characters;
   * @param {string} string - String to replace.
   */
  replaceWord(string) {
    return string
      .replace(this.regex, '')
      .replace(this.replaceRegex, this.placeHolder);
  }

  /**
   * Evaluate a string for profanity and return an edited version.
   * @param {string} string - Sentence to filter.
   */
  clean(string) {
    return string.split(/\b/).map((word) => {
      return this.isProfane(word) ? this.replaceWord(word) : word;
    }).join('');
  }

  wordsList(string) {
    return this.isCorrectLang(string) ?  require('../static/languages/' + string + '.json') : this.list;
  }

  /**
   * Add word(s) to blacklist filter / remove words from whitelist filter
   * @param {...string} word - Word(s) to add to blacklist
   */
  addWords() {
    let words = Array.from(arguments);

    this.list.push(...words);

    words
      .map(word => word.toLowerCase())
      .forEach((word) => {
        if (this.exclude.includes(word)) {
          this.exclude.splice(this.exclude.indexOf(word), 1);
        }
      });
  }

  /**
   * Add words to whitelist filter
   * @param {...string} word - Word(s) to add to whitelist.
   */
  removeWords() {
    this.exclude.push(...Array.from(arguments).map(word => word.toLowerCase()));
  }

}


module.exports = Profanity;