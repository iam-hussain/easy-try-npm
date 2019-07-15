class Incrementer {

    constructor(options = {}) {
        Object.assign(this, {
            uppercase: options.uppercase ? true : false,
            incrementer_by: options.incrementer_by || 1,
            last_numer: options.uppercase ? (options.formate || '000aa0').toUpperCase() : (options.formate || '000aa0'),
        })
    }

    checkNextChange(str) {
        if (str == '9' || str == 'z' || str == 'Z') {
            return true
        } else {
            return false
        }
    }

    upgradeNext(str) {
        var charCode = str.charCodeAt(0);
        if (str == '9') {
            return '0'
        } else if (str == 'z') {
            return 'a'
        } else if (str == 'Z') {
            return 'A'
        } else {
            return String.fromCharCode(++charCode);
        }
    }

    updateNext(str, loopJSON) {
        var loop = loopJSON.firstTime ? this.incrementer_by : loopJSON.nextChange;
        var nextChange = 0;
        while (loop > 0) {
            nextChange = this.checkNextChange(str) ? nextChange + 1 : nextChange;
            str = this.upgradeNext(str);
            loop--;
        }
        return {
            firstTime: false,
            nextChange: nextChange,
            str: str,
        }
    }

    doIncrement(str) {
        var myNext = str.replace(/([^a-z0-9]+)/gi, '');
        var i = myNext.length - 1;
        var loopJSON = {
            firstTime: true
        };
        while (i >= 0) {
            loopJSON = this.updateNext(str.substr(i, 1), loopJSON)
            myNext = myNext.substr(0, i) + loopJSON.str + myNext.substr(i + 1);
            i = loopJSON.nextChange == 0 ? 0 : i;
            i--;
        }
        return myNext;
    }

    next(input) {
        var string = input ? input : this.last_numer;
        string = input = this.uppercase ? string.toUpperCase() : string;
        var lastSegment = string.split(/[_/:\-;\\]+/).pop();
        var priorSegment = string.substr(0, string.indexOf(lastSegment));
        var nextNumber = this.doIncrement(lastSegment);
        this.last_numer = this.last_numer == string ? nextNumber : this.last_numer;
        return priorSegment + nextNumber;
    }
}


module.exports = Incrementer;