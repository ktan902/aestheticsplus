//@codekit-append "dev-dependents.devinabox.js";
//@codekit-append "dev-prefix.bcEngine.js";
//@codekit-append "dev-ActiveNav.js";
//@codekit-append "dev-Crumbs.js";
//@codekit-append "dev-Date.js";
//@codekit-append "dev-FormMagic.js";
//@codekit-append "dev-SameAs.js";
//@codekit-append "dev-Secure.js"
//@codekit-append "dev-Trigger.js";
//@codekit-append "dev-UnSecure.js";
//@codekit-append "dev-suffix.bcEngine.js";

/* **********************************************
     Begin dev-dependents.devinabox.js
********************************************** */

/* ActiveNav */
  //@codekit-append "jquery-closest-descendant/dist/closestDescendant.min.js";
/* Date */
  //@codekit-append "bower_components/moment/moment.js";
/* FormMagic */
  //@codekit-append "bcvalidation.js";

/* **********************************************
     Begin closestDescendant.min.js
********************************************** */

/*!
 * .closestDescendant( selector [, findAll ] )
 * https://github.com/tlindig/jquery-closest-descendant
 *
 * v0.1.2 - 2014-02-17
 *
 * Copyright (c) 2014 Tobias Lindig
 * http://tlindig.de/
 *
 * License: MIT
 *
 * Author: Tobias Lindig <dev@tlindig.de>
 */
!function(a){a.fn.closestDescendant=function(b,c){if(!b||""===b)return a();c=c?!0:!1;var d=a();return this.each(function(){var e=a(this),f=[];for(f.push(e);f.length>0;)for(var g=f.shift(),h=g.children(),i=0;i<h.length;++i){var j=a(h[i]);if(j.is(b)){if(d.push(j[0]),!c)return!1}else f.push(j)}}),d}}(jQuery);

/* **********************************************
     Begin moment.js
********************************************** */

//! moment.js
//! version : 2.7.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

(function (undefined) {

    /************************************
        Constants
    ************************************/

    var moment,
        VERSION = "2.7.0",
        // the global-scope this is NOT the global object in Node.js
        globalScope = typeof global !== 'undefined' ? global : this,
        oldGlobalMoment,
        round = Math.round,
        i,

        YEAR = 0,
        MONTH = 1,
        DATE = 2,
        HOUR = 3,
        MINUTE = 4,
        SECOND = 5,
        MILLISECOND = 6,

        // internal storage for language config files
        languages = {},

        // moment internal properties
        momentProperties = {
            _isAMomentObject: null,
            _i : null,
            _f : null,
            _l : null,
            _strict : null,
            _tzm : null,
            _isUTC : null,
            _offset : null,  // optional. Combine with _isUTC
            _pf : null,
            _lang : null  // optional
        },

        // check for nodeJS
        hasModule = (typeof module !== 'undefined' && module.exports),

        // ASP.NET json date format regex
        aspNetJsonRegex = /^\/?Date\((\-?\d+)/i,
        aspNetTimeSpanJsonRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,

        // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
        // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
        isoDurationRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,

        // format tokens
        formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g,
        localFormattingTokens = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,

        // parsing token regexes
        parseTokenOneOrTwoDigits = /\d\d?/, // 0 - 99
        parseTokenOneToThreeDigits = /\d{1,3}/, // 0 - 999
        parseTokenOneToFourDigits = /\d{1,4}/, // 0 - 9999
        parseTokenOneToSixDigits = /[+\-]?\d{1,6}/, // -999,999 - 999,999
        parseTokenDigits = /\d+/, // nonzero number of digits
        parseTokenWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, // any word (or two) characters or numbers including two/three word month in arabic.
        parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/gi, // +00:00 -00:00 +0000 -0000 or Z
        parseTokenT = /T/i, // T (ISO separator)
        parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123
        parseTokenOrdinal = /\d{1,2}/,

        //strict parsing regexes
        parseTokenOneDigit = /\d/, // 0 - 9
        parseTokenTwoDigits = /\d\d/, // 00 - 99
        parseTokenThreeDigits = /\d{3}/, // 000 - 999
        parseTokenFourDigits = /\d{4}/, // 0000 - 9999
        parseTokenSixDigits = /[+-]?\d{6}/, // -999,999 - 999,999
        parseTokenSignedNumber = /[+-]?\d+/, // -inf - inf

        // iso 8601 regex
        // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
        isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,

        isoFormat = 'YYYY-MM-DDTHH:mm:ssZ',

        isoDates = [
            ['YYYYYY-MM-DD', /[+-]\d{6}-\d{2}-\d{2}/],
            ['YYYY-MM-DD', /\d{4}-\d{2}-\d{2}/],
            ['GGGG-[W]WW-E', /\d{4}-W\d{2}-\d/],
            ['GGGG-[W]WW', /\d{4}-W\d{2}/],
            ['YYYY-DDD', /\d{4}-\d{3}/]
        ],

        // iso time formats and regexes
        isoTimes = [
            ['HH:mm:ss.SSSS', /(T| )\d\d:\d\d:\d\d\.\d+/],
            ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],
            ['HH:mm', /(T| )\d\d:\d\d/],
            ['HH', /(T| )\d\d/]
        ],

        // timezone chunker "+10:00" > ["10", "00"] or "-1530" > ["-15", "30"]
        parseTimezoneChunker = /([\+\-]|\d\d)/gi,

        // getter and setter names
        proxyGettersAndSetters = 'Date|Hours|Minutes|Seconds|Milliseconds'.split('|'),
        unitMillisecondFactors = {
            'Milliseconds' : 1,
            'Seconds' : 1e3,
            'Minutes' : 6e4,
            'Hours' : 36e5,
            'Days' : 864e5,
            'Months' : 2592e6,
            'Years' : 31536e6
        },

        unitAliases = {
            ms : 'millisecond',
            s : 'second',
            m : 'minute',
            h : 'hour',
            d : 'day',
            D : 'date',
            w : 'week',
            W : 'isoWeek',
            M : 'month',
            Q : 'quarter',
            y : 'year',
            DDD : 'dayOfYear',
            e : 'weekday',
            E : 'isoWeekday',
            gg: 'weekYear',
            GG: 'isoWeekYear'
        },

        camelFunctions = {
            dayofyear : 'dayOfYear',
            isoweekday : 'isoWeekday',
            isoweek : 'isoWeek',
            weekyear : 'weekYear',
            isoweekyear : 'isoWeekYear'
        },

        // format function strings
        formatFunctions = {},

        // default relative time thresholds
        relativeTimeThresholds = {
          s: 45,   //seconds to minutes
          m: 45,   //minutes to hours
          h: 22,   //hours to days
          dd: 25,  //days to month (month == 1)
          dm: 45,  //days to months (months > 1)
          dy: 345  //days to year
        },

        // tokens to ordinalize and pad
        ordinalizeTokens = 'DDD w W M D d'.split(' '),
        paddedTokens = 'M D H h m s w W'.split(' '),

        formatTokenFunctions = {
            M    : function () {
                return this.month() + 1;
            },
            MMM  : function (format) {
                return this.lang().monthsShort(this, format);
            },
            MMMM : function (format) {
                return this.lang().months(this, format);
            },
            D    : function () {
                return this.date();
            },
            DDD  : function () {
                return this.dayOfYear();
            },
            d    : function () {
                return this.day();
            },
            dd   : function (format) {
                return this.lang().weekdaysMin(this, format);
            },
            ddd  : function (format) {
                return this.lang().weekdaysShort(this, format);
            },
            dddd : function (format) {
                return this.lang().weekdays(this, format);
            },
            w    : function () {
                return this.week();
            },
            W    : function () {
                return this.isoWeek();
            },
            YY   : function () {
                return leftZeroFill(this.year() % 100, 2);
            },
            YYYY : function () {
                return leftZeroFill(this.year(), 4);
            },
            YYYYY : function () {
                return leftZeroFill(this.year(), 5);
            },
            YYYYYY : function () {
                var y = this.year(), sign = y >= 0 ? '+' : '-';
                return sign + leftZeroFill(Math.abs(y), 6);
            },
            gg   : function () {
                return leftZeroFill(this.weekYear() % 100, 2);
            },
            gggg : function () {
                return leftZeroFill(this.weekYear(), 4);
            },
            ggggg : function () {
                return leftZeroFill(this.weekYear(), 5);
            },
            GG   : function () {
                return leftZeroFill(this.isoWeekYear() % 100, 2);
            },
            GGGG : function () {
                return leftZeroFill(this.isoWeekYear(), 4);
            },
            GGGGG : function () {
                return leftZeroFill(this.isoWeekYear(), 5);
            },
            e : function () {
                return this.weekday();
            },
            E : function () {
                return this.isoWeekday();
            },
            a    : function () {
                return this.lang().meridiem(this.hours(), this.minutes(), true);
            },
            A    : function () {
                return this.lang().meridiem(this.hours(), this.minutes(), false);
            },
            H    : function () {
                return this.hours();
            },
            h    : function () {
                return this.hours() % 12 || 12;
            },
            m    : function () {
                return this.minutes();
            },
            s    : function () {
                return this.seconds();
            },
            S    : function () {
                return toInt(this.milliseconds() / 100);
            },
            SS   : function () {
                return leftZeroFill(toInt(this.milliseconds() / 10), 2);
            },
            SSS  : function () {
                return leftZeroFill(this.milliseconds(), 3);
            },
            SSSS : function () {
                return leftZeroFill(this.milliseconds(), 3);
            },
            Z    : function () {
                var a = -this.zone(),
                    b = "+";
                if (a < 0) {
                    a = -a;
                    b = "-";
                }
                return b + leftZeroFill(toInt(a / 60), 2) + ":" + leftZeroFill(toInt(a) % 60, 2);
            },
            ZZ   : function () {
                var a = -this.zone(),
                    b = "+";
                if (a < 0) {
                    a = -a;
                    b = "-";
                }
                return b + leftZeroFill(toInt(a / 60), 2) + leftZeroFill(toInt(a) % 60, 2);
            },
            z : function () {
                return this.zoneAbbr();
            },
            zz : function () {
                return this.zoneName();
            },
            X    : function () {
                return this.unix();
            },
            Q : function () {
                return this.quarter();
            }
        },

        lists = ['months', 'monthsShort', 'weekdays', 'weekdaysShort', 'weekdaysMin'];

    // Pick the first defined of two or three arguments. dfl comes from
    // default.
    function dfl(a, b, c) {
        switch (arguments.length) {
            case 2: return a != null ? a : b;
            case 3: return a != null ? a : b != null ? b : c;
            default: throw new Error("Implement me");
        }
    }

    function defaultParsingFlags() {
        // We need to deep clone this object, and es5 standard is not very
        // helpful.
        return {
            empty : false,
            unusedTokens : [],
            unusedInput : [],
            overflow : -2,
            charsLeftOver : 0,
            nullInput : false,
            invalidMonth : null,
            invalidFormat : false,
            userInvalidated : false,
            iso: false
        };
    }

    function deprecate(msg, fn) {
        var firstTime = true;
        function printMsg() {
            if (moment.suppressDeprecationWarnings === false &&
                    typeof console !== 'undefined' && console.warn) {
                console.warn("Deprecation warning: " + msg);
            }
        }
        return extend(function () {
            if (firstTime) {
                printMsg();
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    function padToken(func, count) {
        return function (a) {
            return leftZeroFill(func.call(this, a), count);
        };
    }
    function ordinalizeToken(func, period) {
        return function (a) {
            return this.lang().ordinal(func.call(this, a), period);
        };
    }

    while (ordinalizeTokens.length) {
        i = ordinalizeTokens.pop();
        formatTokenFunctions[i + 'o'] = ordinalizeToken(formatTokenFunctions[i], i);
    }
    while (paddedTokens.length) {
        i = paddedTokens.pop();
        formatTokenFunctions[i + i] = padToken(formatTokenFunctions[i], 2);
    }
    formatTokenFunctions.DDDD = padToken(formatTokenFunctions.DDD, 3);


    /************************************
        Constructors
    ************************************/

    function Language() {

    }

    // Moment prototype object
    function Moment(config) {
        checkOverflow(config);
        extend(this, config);
    }

    // Duration Constructor
    function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 36e5; // 1000 * 60 * 60
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._bubble();
    }

    /************************************
        Helpers
    ************************************/


    function extend(a, b) {
        for (var i in b) {
            if (b.hasOwnProperty(i)) {
                a[i] = b[i];
            }
        }

        if (b.hasOwnProperty("toString")) {
            a.toString = b.toString;
        }

        if (b.hasOwnProperty("valueOf")) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function cloneMoment(m) {
        var result = {}, i;
        for (i in m) {
            if (m.hasOwnProperty(i) && momentProperties.hasOwnProperty(i)) {
                result[i] = m[i];
            }
        }

        return result;
    }

    function absRound(number) {
        if (number < 0) {
            return Math.ceil(number);
        } else {
            return Math.floor(number);
        }
    }

    // left zero fill a number
    // see http://jsperf.com/left-zero-filling for performance comparison
    function leftZeroFill(number, targetLength, forceSign) {
        var output = '' + Math.abs(number),
            sign = number >= 0;

        while (output.length < targetLength) {
            output = '0' + output;
        }
        return (sign ? (forceSign ? '+' : '') : '-') + output;
    }

    // helper function for _.addTime and _.subtractTime
    function addOrSubtractDurationFromMoment(mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = duration._days,
            months = duration._months;
        updateOffset = updateOffset == null ? true : updateOffset;

        if (milliseconds) {
            mom._d.setTime(+mom._d + milliseconds * isAdding);
        }
        if (days) {
            rawSetter(mom, 'Date', rawGetter(mom, 'Date') + days * isAdding);
        }
        if (months) {
            rawMonthSetter(mom, rawGetter(mom, 'Month') + months * isAdding);
        }
        if (updateOffset) {
            moment.updateOffset(mom, days || months);
        }
    }

    // check if is an array
    function isArray(input) {
        return Object.prototype.toString.call(input) === '[object Array]';
    }

    function isDate(input) {
        return  Object.prototype.toString.call(input) === '[object Date]' ||
                input instanceof Date;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function normalizeUnits(units) {
        if (units) {
            var lowered = units.toLowerCase().replace(/(.)s$/, '$1');
            units = unitAliases[units] || camelFunctions[lowered] || lowered;
        }
        return units;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (inputObject.hasOwnProperty(prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    function makeList(field) {
        var count, setter;

        if (field.indexOf('week') === 0) {
            count = 7;
            setter = 'day';
        }
        else if (field.indexOf('month') === 0) {
            count = 12;
            setter = 'month';
        }
        else {
            return;
        }

        moment[field] = function (format, index) {
            var i, getter,
                method = moment.fn._lang[field],
                results = [];

            if (typeof format === 'number') {
                index = format;
                format = undefined;
            }

            getter = function (i) {
                var m = moment().utc().set(setter, i);
                return method.call(moment.fn._lang, m, format || '');
            };

            if (index != null) {
                return getter(index);
            }
            else {
                for (i = 0; i < count; i++) {
                    results.push(getter(i));
                }
                return results;
            }
        };
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            if (coercedNumber >= 0) {
                value = Math.floor(coercedNumber);
            } else {
                value = Math.ceil(coercedNumber);
            }
        }

        return value;
    }

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    function weeksInYear(year, dow, doy) {
        return weekOfYear(moment([year, 11, 31 + dow - doy]), dow, doy).week;
    }

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    function checkOverflow(m) {
        var overflow;
        if (m._a && m._pf.overflow === -2) {
            overflow =
                m._a[MONTH] < 0 || m._a[MONTH] > 11 ? MONTH :
                m._a[DATE] < 1 || m._a[DATE] > daysInMonth(m._a[YEAR], m._a[MONTH]) ? DATE :
                m._a[HOUR] < 0 || m._a[HOUR] > 23 ? HOUR :
                m._a[MINUTE] < 0 || m._a[MINUTE] > 59 ? MINUTE :
                m._a[SECOND] < 0 || m._a[SECOND] > 59 ? SECOND :
                m._a[MILLISECOND] < 0 || m._a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (m._pf._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }

            m._pf.overflow = overflow;
        }
    }

    function isValid(m) {
        if (m._isValid == null) {
            m._isValid = !isNaN(m._d.getTime()) &&
                m._pf.overflow < 0 &&
                !m._pf.empty &&
                !m._pf.invalidMonth &&
                !m._pf.nullInput &&
                !m._pf.invalidFormat &&
                !m._pf.userInvalidated;

            if (m._strict) {
                m._isValid = m._isValid &&
                    m._pf.charsLeftOver === 0 &&
                    m._pf.unusedTokens.length === 0;
            }
        }
        return m._isValid;
    }

    function normalizeLanguage(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function makeAs(input, model) {
        return model._isUTC ? moment(input).zone(model._offset || 0) :
            moment(input).local();
    }

    /************************************
        Languages
    ************************************/


    extend(Language.prototype, {

        set : function (config) {
            var prop, i;
            for (i in config) {
                prop = config[i];
                if (typeof prop === 'function') {
                    this[i] = prop;
                } else {
                    this['_' + i] = prop;
                }
            }
        },

        _months : "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        months : function (m) {
            return this._months[m.month()];
        },

        _monthsShort : "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        monthsShort : function (m) {
            return this._monthsShort[m.month()];
        },

        monthsParse : function (monthName) {
            var i, mom, regex;

            if (!this._monthsParse) {
                this._monthsParse = [];
            }

            for (i = 0; i < 12; i++) {
                // make the regex if we don't have it already
                if (!this._monthsParse[i]) {
                    mom = moment.utc([2000, i]);
                    regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                    this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (this._monthsParse[i].test(monthName)) {
                    return i;
                }
            }
        },

        _weekdays : "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdays : function (m) {
            return this._weekdays[m.day()];
        },

        _weekdaysShort : "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysShort : function (m) {
            return this._weekdaysShort[m.day()];
        },

        _weekdaysMin : "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        weekdaysMin : function (m) {
            return this._weekdaysMin[m.day()];
        },

        weekdaysParse : function (weekdayName) {
            var i, mom, regex;

            if (!this._weekdaysParse) {
                this._weekdaysParse = [];
            }

            for (i = 0; i < 7; i++) {
                // make the regex if we don't have it already
                if (!this._weekdaysParse[i]) {
                    mom = moment([2000, 1]).day(i);
                    regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                    this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (this._weekdaysParse[i].test(weekdayName)) {
                    return i;
                }
            }
        },

        _longDateFormat : {
            LT : "h:mm A",
            L : "MM/DD/YYYY",
            LL : "MMMM D YYYY",
            LLL : "MMMM D YYYY LT",
            LLLL : "dddd, MMMM D YYYY LT"
        },
        longDateFormat : function (key) {
            var output = this._longDateFormat[key];
            if (!output && this._longDateFormat[key.toUpperCase()]) {
                output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (val) {
                    return val.slice(1);
                });
                this._longDateFormat[key] = output;
            }
            return output;
        },

        isPM : function (input) {
            // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
            // Using charAt should be more compatible.
            return ((input + '').toLowerCase().charAt(0) === 'p');
        },

        _meridiemParse : /[ap]\.?m?\.?/i,
        meridiem : function (hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'pm' : 'PM';
            } else {
                return isLower ? 'am' : 'AM';
            }
        },

        _calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        calendar : function (key, mom) {
            var output = this._calendar[key];
            return typeof output === 'function' ? output.apply(mom) : output;
        },

        _relativeTime : {
            future : "in %s",
            past : "%s ago",
            s : "a few seconds",
            m : "a minute",
            mm : "%d minutes",
            h : "an hour",
            hh : "%d hours",
            d : "a day",
            dd : "%d days",
            M : "a month",
            MM : "%d months",
            y : "a year",
            yy : "%d years"
        },
        relativeTime : function (number, withoutSuffix, string, isFuture) {
            var output = this._relativeTime[string];
            return (typeof output === 'function') ?
                output(number, withoutSuffix, string, isFuture) :
                output.replace(/%d/i, number);
        },
        pastFuture : function (diff, output) {
            var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
            return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);
        },

        ordinal : function (number) {
            return this._ordinal.replace("%d", number);
        },
        _ordinal : "%d",

        preparse : function (string) {
            return string;
        },

        postformat : function (string) {
            return string;
        },

        week : function (mom) {
            return weekOfYear(mom, this._week.dow, this._week.doy).week;
        },

        _week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 1st is the first week of the year.
        },

        _invalidDate: 'Invalid date',
        invalidDate: function () {
            return this._invalidDate;
        }
    });

    // Loads a language definition into the `languages` cache.  The function
    // takes a key and optionally values.  If not in the browser and no values
    // are provided, it will load the language file module.  As a convenience,
    // this function also returns the language values.
    function loadLang(key, values) {
        values.abbr = key;
        if (!languages[key]) {
            languages[key] = new Language();
        }
        languages[key].set(values);
        return languages[key];
    }

    // Remove a language from the `languages` cache. Mostly useful in tests.
    function unloadLang(key) {
        delete languages[key];
    }

    // Determines which language definition to use and returns it.
    //
    // With no parameters, it will return the global language.  If you
    // pass in a language key, such as 'en', it will return the
    // definition for 'en', so long as 'en' has already been loaded using
    // moment.lang.
    function getLangDefinition(key) {
        var i = 0, j, lang, next, split,
            get = function (k) {
                if (!languages[k] && hasModule) {
                    try {
                        require('./lang/' + k);
                    } catch (e) { }
                }
                return languages[k];
            };

        if (!key) {
            return moment.fn._lang;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            lang = get(key);
            if (lang) {
                return lang;
            }
            key = [key];
        }

        //pick the language from the array
        //try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
        //substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
        while (i < key.length) {
            split = normalizeLanguage(key[i]).split('-');
            j = split.length;
            next = normalizeLanguage(key[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                lang = get(split.slice(0, j).join('-'));
                if (lang) {
                    return lang;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return moment.fn._lang;
    }

    /************************************
        Formatting
    ************************************/


    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, "");
        }
        return input.replace(/\\/g, "");
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = "";
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {

        if (!m.isValid()) {
            return m.lang().invalidDate();
        }

        format = expandFormat(format, m.lang());

        if (!formatFunctions[format]) {
            formatFunctions[format] = makeFormatFunction(format);
        }

        return formatFunctions[format](m);
    }

    function expandFormat(format, lang) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return lang.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }


    /************************************
        Parsing
    ************************************/


    // get the regex to find the next token
    function getParseRegexForToken(token, config) {
        var a, strict = config._strict;
        switch (token) {
        case 'Q':
            return parseTokenOneDigit;
        case 'DDDD':
            return parseTokenThreeDigits;
        case 'YYYY':
        case 'GGGG':
        case 'gggg':
            return strict ? parseTokenFourDigits : parseTokenOneToFourDigits;
        case 'Y':
        case 'G':
        case 'g':
            return parseTokenSignedNumber;
        case 'YYYYYY':
        case 'YYYYY':
        case 'GGGGG':
        case 'ggggg':
            return strict ? parseTokenSixDigits : parseTokenOneToSixDigits;
        case 'S':
            if (strict) { return parseTokenOneDigit; }
            /* falls through */
        case 'SS':
            if (strict) { return parseTokenTwoDigits; }
            /* falls through */
        case 'SSS':
            if (strict) { return parseTokenThreeDigits; }
            /* falls through */
        case 'DDD':
            return parseTokenOneToThreeDigits;
        case 'MMM':
        case 'MMMM':
        case 'dd':
        case 'ddd':
        case 'dddd':
            return parseTokenWord;
        case 'a':
        case 'A':
            return getLangDefinition(config._l)._meridiemParse;
        case 'X':
            return parseTokenTimestampMs;
        case 'Z':
        case 'ZZ':
            return parseTokenTimezone;
        case 'T':
            return parseTokenT;
        case 'SSSS':
            return parseTokenDigits;
        case 'MM':
        case 'DD':
        case 'YY':
        case 'GG':
        case 'gg':
        case 'HH':
        case 'hh':
        case 'mm':
        case 'ss':
        case 'ww':
        case 'WW':
            return strict ? parseTokenTwoDigits : parseTokenOneOrTwoDigits;
        case 'M':
        case 'D':
        case 'd':
        case 'H':
        case 'h':
        case 'm':
        case 's':
        case 'w':
        case 'W':
        case 'e':
        case 'E':
            return parseTokenOneOrTwoDigits;
        case 'Do':
            return parseTokenOrdinal;
        default :
            a = new RegExp(regexpEscape(unescapeFormat(token.replace('\\', '')), "i"));
            return a;
        }
    }

    function timezoneMinutesFromString(string) {
        string = string || "";
        var possibleTzMatches = (string.match(parseTokenTimezone) || []),
            tzChunk = possibleTzMatches[possibleTzMatches.length - 1] || [],
            parts = (tzChunk + '').match(parseTimezoneChunker) || ['-', 0, 0],
            minutes = +(parts[1] * 60) + toInt(parts[2]);

        return parts[0] === '+' ? -minutes : minutes;
    }

    // function to convert string input to date
    function addTimeToArrayFromToken(token, input, config) {
        var a, datePartArray = config._a;

        switch (token) {
        // QUARTER
        case 'Q':
            if (input != null) {
                datePartArray[MONTH] = (toInt(input) - 1) * 3;
            }
            break;
        // MONTH
        case 'M' : // fall through to MM
        case 'MM' :
            if (input != null) {
                datePartArray[MONTH] = toInt(input) - 1;
            }
            break;
        case 'MMM' : // fall through to MMMM
        case 'MMMM' :
            a = getLangDefinition(config._l).monthsParse(input);
            // if we didn't find a month name, mark the date as invalid.
            if (a != null) {
                datePartArray[MONTH] = a;
            } else {
                config._pf.invalidMonth = input;
            }
            break;
        // DAY OF MONTH
        case 'D' : // fall through to DD
        case 'DD' :
            if (input != null) {
                datePartArray[DATE] = toInt(input);
            }
            break;
        case 'Do' :
            if (input != null) {
                datePartArray[DATE] = toInt(parseInt(input, 10));
            }
            break;
        // DAY OF YEAR
        case 'DDD' : // fall through to DDDD
        case 'DDDD' :
            if (input != null) {
                config._dayOfYear = toInt(input);
            }

            break;
        // YEAR
        case 'YY' :
            datePartArray[YEAR] = moment.parseTwoDigitYear(input);
            break;
        case 'YYYY' :
        case 'YYYYY' :
        case 'YYYYYY' :
            datePartArray[YEAR] = toInt(input);
            break;
        // AM / PM
        case 'a' : // fall through to A
        case 'A' :
            config._isPm = getLangDefinition(config._l).isPM(input);
            break;
        // 24 HOUR
        case 'H' : // fall through to hh
        case 'HH' : // fall through to hh
        case 'h' : // fall through to hh
        case 'hh' :
            datePartArray[HOUR] = toInt(input);
            break;
        // MINUTE
        case 'm' : // fall through to mm
        case 'mm' :
            datePartArray[MINUTE] = toInt(input);
            break;
        // SECOND
        case 's' : // fall through to ss
        case 'ss' :
            datePartArray[SECOND] = toInt(input);
            break;
        // MILLISECOND
        case 'S' :
        case 'SS' :
        case 'SSS' :
        case 'SSSS' :
            datePartArray[MILLISECOND] = toInt(('0.' + input) * 1000);
            break;
        // UNIX TIMESTAMP WITH MS
        case 'X':
            config._d = new Date(parseFloat(input) * 1000);
            break;
        // TIMEZONE
        case 'Z' : // fall through to ZZ
        case 'ZZ' :
            config._useUTC = true;
            config._tzm = timezoneMinutesFromString(input);
            break;
        // WEEKDAY - human
        case 'dd':
        case 'ddd':
        case 'dddd':
            a = getLangDefinition(config._l).weekdaysParse(input);
            // if we didn't get a weekday name, mark the date as invalid
            if (a != null) {
                config._w = config._w || {};
                config._w['d'] = a;
            } else {
                config._pf.invalidWeekday = input;
            }
            break;
        // WEEK, WEEK DAY - numeric
        case 'w':
        case 'ww':
        case 'W':
        case 'WW':
        case 'd':
        case 'e':
        case 'E':
            token = token.substr(0, 1);
            /* falls through */
        case 'gggg':
        case 'GGGG':
        case 'GGGGG':
            token = token.substr(0, 2);
            if (input) {
                config._w = config._w || {};
                config._w[token] = toInt(input);
            }
            break;
        case 'gg':
        case 'GG':
            config._w = config._w || {};
            config._w[token] = moment.parseTwoDigitYear(input);
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, lang;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = dfl(w.GG, config._a[YEAR], weekOfYear(moment(), 1, 4).year);
            week = dfl(w.W, 1);
            weekday = dfl(w.E, 1);
        } else {
            lang = getLangDefinition(config._l);
            dow = lang._week.dow;
            doy = lang._week.doy;

            weekYear = dfl(w.gg, config._a[YEAR], weekOfYear(moment(), dow, doy).year);
            week = dfl(w.w, 1);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < dow) {
                    ++week;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from begining of week
                weekday = w.e + dow;
            } else {
                // default to begining of week
                weekday = dow;
            }
        }
        temp = dayOfYearFromWeeks(weekYear, week, weekday, doy, dow);

        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function dateFromConfig(config) {
        var i, date, input = [], currentDate, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear) {
            yearToUse = dfl(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse)) {
                config._pf._overflowDayOfYear = true;
            }

            date = makeUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        config._d = (config._useUTC ? makeUTCDate : makeDate).apply(null, input);
        // Apply timezone offset from input. The actual zone can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() + config._tzm);
        }
    }

    function dateFromObject(config) {
        var normalizedInput;

        if (config._d) {
            return;
        }

        normalizedInput = normalizeObjectUnits(config._i);
        config._a = [
            normalizedInput.year,
            normalizedInput.month,
            normalizedInput.day,
            normalizedInput.hour,
            normalizedInput.minute,
            normalizedInput.second,
            normalizedInput.millisecond
        ];

        dateFromConfig(config);
    }

    function currentDateArray(config) {
        var now = new Date();
        if (config._useUTC) {
            return [
                now.getUTCFullYear(),
                now.getUTCMonth(),
                now.getUTCDate()
            ];
        } else {
            return [now.getFullYear(), now.getMonth(), now.getDate()];
        }
    }

    // date from string and format string
    function makeDateFromStringAndFormat(config) {

        if (config._f === moment.ISO_8601) {
            parseISO(config);
            return;
        }

        config._a = [];
        config._pf.empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var lang = getLangDefinition(config._l),
            string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, lang).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    config._pf.unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    config._pf.empty = false;
                }
                else {
                    config._pf.unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                config._pf.unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        config._pf.charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            config._pf.unusedInput.push(string);
        }

        // handle am pm
        if (config._isPm && config._a[HOUR] < 12) {
            config._a[HOUR] += 12;
        }
        // if is 12 am, change hours to 0
        if (config._isPm === false && config._a[HOUR] === 12) {
            config._a[HOUR] = 0;
        }

        dateFromConfig(config);
        checkOverflow(config);
    }

    function unescapeFormat(s) {
        return s.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        });
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function regexpEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    // date from string and array of format strings
    function makeDateFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            config._pf.invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = extend({}, config);
            tempConfig._pf = defaultParsingFlags();
            tempConfig._f = config._f[i];
            makeDateFromStringAndFormat(tempConfig);

            if (!isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += tempConfig._pf.charsLeftOver;

            //or tokens
            currentScore += tempConfig._pf.unusedTokens.length * 10;

            tempConfig._pf.score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    // date from iso format
    function parseISO(config) {
        var i, l,
            string = config._i,
            match = isoRegex.exec(string);

        if (match) {
            config._pf.iso = true;
            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(string)) {
                    // match[5] should be "T" or undefined
                    config._f = isoDates[i][0] + (match[6] || " ");
                    break;
                }
            }
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(string)) {
                    config._f += isoTimes[i][0];
                    break;
                }
            }
            if (string.match(parseTokenTimezone)) {
                config._f += "Z";
            }
            makeDateFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function makeDateFromString(config) {
        parseISO(config);
        if (config._isValid === false) {
            delete config._isValid;
            moment.createFromInputFallback(config);
        }
    }

    function makeDateFromInput(config) {
        var input = config._i,
            matched = aspNetJsonRegex.exec(input);

        if (input === undefined) {
            config._d = new Date();
        } else if (matched) {
            config._d = new Date(+matched[1]);
        } else if (typeof input === 'string') {
            makeDateFromString(config);
        } else if (isArray(input)) {
            config._a = input.slice(0);
            dateFromConfig(config);
        } else if (isDate(input)) {
            config._d = new Date(+input);
        } else if (typeof(input) === 'object') {
            dateFromObject(config);
        } else if (typeof(input) === 'number') {
            // from milliseconds
            config._d = new Date(input);
        } else {
            moment.createFromInputFallback(config);
        }
    }

    function makeDate(y, m, d, h, M, s, ms) {
        //can't just apply() to create a date:
        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var date = new Date(y, m, d, h, M, s, ms);

        //the date constructor doesn't accept years < 1970
        if (y < 1970) {
            date.setFullYear(y);
        }
        return date;
    }

    function makeUTCDate(y) {
        var date = new Date(Date.UTC.apply(null, arguments));
        if (y < 1970) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    function parseWeekday(input, language) {
        if (typeof input === 'string') {
            if (!isNaN(input)) {
                input = parseInt(input, 10);
            }
            else {
                input = language.weekdaysParse(input);
                if (typeof input !== 'number') {
                    return null;
                }
            }
        }
        return input;
    }

    /************************************
        Relative Time
    ************************************/


    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, lang) {
        return lang.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime(milliseconds, withoutSuffix, lang) {
        var seconds = round(Math.abs(milliseconds) / 1000),
            minutes = round(seconds / 60),
            hours = round(minutes / 60),
            days = round(hours / 24),
            years = round(days / 365),
            args = seconds < relativeTimeThresholds.s  && ['s', seconds] ||
                minutes === 1 && ['m'] ||
                minutes < relativeTimeThresholds.m && ['mm', minutes] ||
                hours === 1 && ['h'] ||
                hours < relativeTimeThresholds.h && ['hh', hours] ||
                days === 1 && ['d'] ||
                days <= relativeTimeThresholds.dd && ['dd', days] ||
                days <= relativeTimeThresholds.dm && ['M'] ||
                days < relativeTimeThresholds.dy && ['MM', round(days / 30)] ||
                years === 1 && ['y'] || ['yy', years];
        args[2] = withoutSuffix;
        args[3] = milliseconds > 0;
        args[4] = lang;
        return substituteTimeAgo.apply({}, args);
    }


    /************************************
        Week of Year
    ************************************/


    // firstDayOfWeek       0 = sun, 6 = sat
    //                      the day of the week that starts the week
    //                      (usually sunday or monday)
    // firstDayOfWeekOfYear 0 = sun, 6 = sat
    //                      the first week is the week that contains the first
    //                      of this day of the week
    //                      (eg. ISO weeks use thursday (4))
    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
        var end = firstDayOfWeekOfYear - firstDayOfWeek,
            daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),
            adjustedMoment;


        if (daysToDayOfWeek > end) {
            daysToDayOfWeek -= 7;
        }

        if (daysToDayOfWeek < end - 7) {
            daysToDayOfWeek += 7;
        }

        adjustedMoment = moment(mom).add('d', daysToDayOfWeek);
        return {
            week: Math.ceil(adjustedMoment.dayOfYear() / 7),
            year: adjustedMoment.year()
        };
    }

    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
        var d = makeUTCDate(year, 0, 1).getUTCDay(), daysToAdd, dayOfYear;

        d = d === 0 ? 7 : d;
        weekday = weekday != null ? weekday : firstDayOfWeek;
        daysToAdd = firstDayOfWeek - d + (d > firstDayOfWeekOfYear ? 7 : 0) - (d < firstDayOfWeek ? 7 : 0);
        dayOfYear = 7 * (week - 1) + (weekday - firstDayOfWeek) + daysToAdd + 1;

        return {
            year: dayOfYear > 0 ? year : year - 1,
            dayOfYear: dayOfYear > 0 ?  dayOfYear : daysInYear(year - 1) + dayOfYear
        };
    }

    /************************************
        Top Level Functions
    ************************************/

    function makeMoment(config) {
        var input = config._i,
            format = config._f;

        if (input === null || (format === undefined && input === '')) {
            return moment.invalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = getLangDefinition().preparse(input);
        }

        if (moment.isMoment(input)) {
            config = cloneMoment(input);

            config._d = new Date(+input._d);
        } else if (format) {
            if (isArray(format)) {
                makeDateFromStringAndArray(config);
            } else {
                makeDateFromStringAndFormat(config);
            }
        } else {
            makeDateFromInput(config);
        }

        return new Moment(config);
    }

    moment = function (input, format, lang, strict) {
        var c;

        if (typeof(lang) === "boolean") {
            strict = lang;
            lang = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c = {};
        c._isAMomentObject = true;
        c._i = input;
        c._f = format;
        c._l = lang;
        c._strict = strict;
        c._isUTC = false;
        c._pf = defaultParsingFlags();

        return makeMoment(c);
    };

    moment.suppressDeprecationWarnings = false;

    moment.createFromInputFallback = deprecate(
            "moment construction falls back to js Date. This is " +
            "discouraged and will be removed in upcoming major " +
            "release. Please refer to " +
            "https://github.com/moment/moment/issues/1407 for more info.",
            function (config) {
        config._d = new Date(config._i);
    });

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return moment();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    moment.min = function () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    };

    moment.max = function () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    };

    // creating with utc
    moment.utc = function (input, format, lang, strict) {
        var c;

        if (typeof(lang) === "boolean") {
            strict = lang;
            lang = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c = {};
        c._isAMomentObject = true;
        c._useUTC = true;
        c._isUTC = true;
        c._l = lang;
        c._i = input;
        c._f = format;
        c._strict = strict;
        c._pf = defaultParsingFlags();

        return makeMoment(c).utc();
    };

    // creating with unix timestamp (in seconds)
    moment.unix = function (input) {
        return moment(input * 1000);
    };

    // duration
    moment.duration = function (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            parseIso;

        if (moment.isDuration(input)) {
            duration = {
                ms: input._milliseconds,
                d: input._days,
                M: input._months
            };
        } else if (typeof input === 'number') {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetTimeSpanJsonRegex.exec(input))) {
            sign = (match[1] === "-") ? -1 : 1;
            duration = {
                y: 0,
                d: toInt(match[DATE]) * sign,
                h: toInt(match[HOUR]) * sign,
                m: toInt(match[MINUTE]) * sign,
                s: toInt(match[SECOND]) * sign,
                ms: toInt(match[MILLISECOND]) * sign
            };
        } else if (!!(match = isoDurationRegex.exec(input))) {
            sign = (match[1] === "-") ? -1 : 1;
            parseIso = function (inp) {
                // We'd normally use ~~inp for this, but unfortunately it also
                // converts floats to ints.
                // inp may be undefined, so careful calling replace on it.
                var res = inp && parseFloat(inp.replace(',', '.'));
                // apply sign while we're at it
                return (isNaN(res) ? 0 : res) * sign;
            };
            duration = {
                y: parseIso(match[2]),
                M: parseIso(match[3]),
                d: parseIso(match[4]),
                h: parseIso(match[5]),
                m: parseIso(match[6]),
                s: parseIso(match[7]),
                w: parseIso(match[8])
            };
        }

        ret = new Duration(duration);

        if (moment.isDuration(input) && input.hasOwnProperty('_lang')) {
            ret._lang = input._lang;
        }

        return ret;
    };

    // version number
    moment.version = VERSION;

    // default format
    moment.defaultFormat = isoFormat;

    // constant that refers to the ISO standard
    moment.ISO_8601 = function () {};

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    moment.momentProperties = momentProperties;

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    moment.updateOffset = function () {};

    // This function allows you to set a threshold for relative time strings
    moment.relativeTimeThreshold = function(threshold, limit) {
      if (relativeTimeThresholds[threshold] === undefined) {
        return false;
      }
      relativeTimeThresholds[threshold] = limit;
      return true;
    };

    // This function will load languages and then set the global language.  If
    // no arguments are passed in, it will simply return the current global
    // language key.
    moment.lang = function (key, values) {
        var r;
        if (!key) {
            return moment.fn._lang._abbr;
        }
        if (values) {
            loadLang(normalizeLanguage(key), values);
        } else if (values === null) {
            unloadLang(key);
            key = 'en';
        } else if (!languages[key]) {
            getLangDefinition(key);
        }
        r = moment.duration.fn._lang = moment.fn._lang = getLangDefinition(key);
        return r._abbr;
    };

    // returns language data
    moment.langData = function (key) {
        if (key && key._lang && key._lang._abbr) {
            key = key._lang._abbr;
        }
        return getLangDefinition(key);
    };

    // compare moment object
    moment.isMoment = function (obj) {
        return obj instanceof Moment ||
            (obj != null &&  obj.hasOwnProperty('_isAMomentObject'));
    };

    // for typechecking Duration objects
    moment.isDuration = function (obj) {
        return obj instanceof Duration;
    };

    for (i = lists.length - 1; i >= 0; --i) {
        makeList(lists[i]);
    }

    moment.normalizeUnits = function (units) {
        return normalizeUnits(units);
    };

    moment.invalid = function (flags) {
        var m = moment.utc(NaN);
        if (flags != null) {
            extend(m._pf, flags);
        }
        else {
            m._pf.userInvalidated = true;
        }

        return m;
    };

    moment.parseZone = function () {
        return moment.apply(null, arguments).parseZone();
    };

    moment.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    /************************************
        Moment Prototype
    ************************************/


    extend(moment.fn = Moment.prototype, {

        clone : function () {
            return moment(this);
        },

        valueOf : function () {
            return +this._d + ((this._offset || 0) * 60000);
        },

        unix : function () {
            return Math.floor(+this / 1000);
        },

        toString : function () {
            return this.clone().lang('en').format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
        },

        toDate : function () {
            return this._offset ? new Date(+this) : this._d;
        },

        toISOString : function () {
            var m = moment(this).utc();
            if (0 < m.year() && m.year() <= 9999) {
                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            } else {
                return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            }
        },

        toArray : function () {
            var m = this;
            return [
                m.year(),
                m.month(),
                m.date(),
                m.hours(),
                m.minutes(),
                m.seconds(),
                m.milliseconds()
            ];
        },

        isValid : function () {
            return isValid(this);
        },

        isDSTShifted : function () {

            if (this._a) {
                return this.isValid() && compareArrays(this._a, (this._isUTC ? moment.utc(this._a) : moment(this._a)).toArray()) > 0;
            }

            return false;
        },

        parsingFlags : function () {
            return extend({}, this._pf);
        },

        invalidAt: function () {
            return this._pf.overflow;
        },

        utc : function () {
            return this.zone(0);
        },

        local : function () {
            this.zone(0);
            this._isUTC = false;
            return this;
        },

        format : function (inputString) {
            var output = formatMoment(this, inputString || moment.defaultFormat);
            return this.lang().postformat(output);
        },

        add : function (input, val) {
            var dur;
            // switch args to support add('s', 1) and add(1, 's')
            if (typeof input === 'string' && typeof val === 'string') {
                dur = moment.duration(isNaN(+val) ? +input : +val, isNaN(+val) ? val : input);
            } else if (typeof input === 'string') {
                dur = moment.duration(+val, input);
            } else {
                dur = moment.duration(input, val);
            }
            addOrSubtractDurationFromMoment(this, dur, 1);
            return this;
        },

        subtract : function (input, val) {
            var dur;
            // switch args to support subtract('s', 1) and subtract(1, 's')
            if (typeof input === 'string' && typeof val === 'string') {
                dur = moment.duration(isNaN(+val) ? +input : +val, isNaN(+val) ? val : input);
            } else if (typeof input === 'string') {
                dur = moment.duration(+val, input);
            } else {
                dur = moment.duration(input, val);
            }
            addOrSubtractDurationFromMoment(this, dur, -1);
            return this;
        },

        diff : function (input, units, asFloat) {
            var that = makeAs(input, this),
                zoneDiff = (this.zone() - that.zone()) * 6e4,
                diff, output;

            units = normalizeUnits(units);

            if (units === 'year' || units === 'month') {
                // average number of days in the months in the given dates
                diff = (this.daysInMonth() + that.daysInMonth()) * 432e5; // 24 * 60 * 60 * 1000 / 2
                // difference in months
                output = ((this.year() - that.year()) * 12) + (this.month() - that.month());
                // adjust by taking difference in days, average number of days
                // and dst in the given months.
                output += ((this - moment(this).startOf('month')) -
                        (that - moment(that).startOf('month'))) / diff;
                // same as above but with zones, to negate all dst
                output -= ((this.zone() - moment(this).startOf('month').zone()) -
                        (that.zone() - moment(that).startOf('month').zone())) * 6e4 / diff;
                if (units === 'year') {
                    output = output / 12;
                }
            } else {
                diff = (this - that);
                output = units === 'second' ? diff / 1e3 : // 1000
                    units === 'minute' ? diff / 6e4 : // 1000 * 60
                    units === 'hour' ? diff / 36e5 : // 1000 * 60 * 60
                    units === 'day' ? (diff - zoneDiff) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                    units === 'week' ? (diff - zoneDiff) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                    diff;
            }
            return asFloat ? output : absRound(output);
        },

        from : function (time, withoutSuffix) {
            return moment.duration(this.diff(time)).lang(this.lang()._abbr).humanize(!withoutSuffix);
        },

        fromNow : function (withoutSuffix) {
            return this.from(moment(), withoutSuffix);
        },

        calendar : function (time) {
            // We want to compare the start of today, vs this.
            // Getting start-of-today depends on whether we're zone'd or not.
            var now = time || moment(),
                sod = makeAs(now, this).startOf('day'),
                diff = this.diff(sod, 'days', true),
                format = diff < -6 ? 'sameElse' :
                    diff < -1 ? 'lastWeek' :
                    diff < 0 ? 'lastDay' :
                    diff < 1 ? 'sameDay' :
                    diff < 2 ? 'nextDay' :
                    diff < 7 ? 'nextWeek' : 'sameElse';
            return this.format(this.lang().calendar(format, this));
        },

        isLeapYear : function () {
            return isLeapYear(this.year());
        },

        isDST : function () {
            return (this.zone() < this.clone().month(0).zone() ||
                this.zone() < this.clone().month(5).zone());
        },

        day : function (input) {
            var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            if (input != null) {
                input = parseWeekday(input, this.lang());
                return this.add({ d : input - day });
            } else {
                return day;
            }
        },

        month : makeAccessor('Month', true),

        startOf: function (units) {
            units = normalizeUnits(units);
            // the following switch intentionally omits break keywords
            // to utilize falling through the cases.
            switch (units) {
            case 'year':
                this.month(0);
                /* falls through */
            case 'quarter':
            case 'month':
                this.date(1);
                /* falls through */
            case 'week':
            case 'isoWeek':
            case 'day':
                this.hours(0);
                /* falls through */
            case 'hour':
                this.minutes(0);
                /* falls through */
            case 'minute':
                this.seconds(0);
                /* falls through */
            case 'second':
                this.milliseconds(0);
                /* falls through */
            }

            // weeks are a special case
            if (units === 'week') {
                this.weekday(0);
            } else if (units === 'isoWeek') {
                this.isoWeekday(1);
            }

            // quarters are also special
            if (units === 'quarter') {
                this.month(Math.floor(this.month() / 3) * 3);
            }

            return this;
        },

        endOf: function (units) {
            units = normalizeUnits(units);
            return this.startOf(units).add((units === 'isoWeek' ? 'week' : units), 1).subtract('ms', 1);
        },

        isAfter: function (input, units) {
            units = typeof units !== 'undefined' ? units : 'millisecond';
            return +this.clone().startOf(units) > +moment(input).startOf(units);
        },

        isBefore: function (input, units) {
            units = typeof units !== 'undefined' ? units : 'millisecond';
            return +this.clone().startOf(units) < +moment(input).startOf(units);
        },

        isSame: function (input, units) {
            units = units || 'ms';
            return +this.clone().startOf(units) === +makeAs(input, this).startOf(units);
        },

        min: deprecate(
                 "moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",
                 function (other) {
                     other = moment.apply(null, arguments);
                     return other < this ? this : other;
                 }
         ),

        max: deprecate(
                "moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",
                function (other) {
                    other = moment.apply(null, arguments);
                    return other > this ? this : other;
                }
        ),

        // keepTime = true means only change the timezone, without affecting
        // the local hour. So 5:31:26 +0300 --[zone(2, true)]--> 5:31:26 +0200
        // It is possible that 5:31:26 doesn't exist int zone +0200, so we
        // adjust the time as needed, to be valid.
        //
        // Keeping the time actually adds/subtracts (one hour)
        // from the actual represented time. That is why we call updateOffset
        // a second time. In case it wants us to change the offset again
        // _changeInProgress == true case, then we have to adjust, because
        // there is no such time in the given timezone.
        zone : function (input, keepTime) {
            var offset = this._offset || 0;
            if (input != null) {
                if (typeof input === "string") {
                    input = timezoneMinutesFromString(input);
                }
                if (Math.abs(input) < 16) {
                    input = input * 60;
                }
                this._offset = input;
                this._isUTC = true;
                if (offset !== input) {
                    if (!keepTime || this._changeInProgress) {
                        addOrSubtractDurationFromMoment(this,
                                moment.duration(offset - input, 'm'), 1, false);
                    } else if (!this._changeInProgress) {
                        this._changeInProgress = true;
                        moment.updateOffset(this, true);
                        this._changeInProgress = null;
                    }
                }
            } else {
                return this._isUTC ? offset : this._d.getTimezoneOffset();
            }
            return this;
        },

        zoneAbbr : function () {
            return this._isUTC ? "UTC" : "";
        },

        zoneName : function () {
            return this._isUTC ? "Coordinated Universal Time" : "";
        },

        parseZone : function () {
            if (this._tzm) {
                this.zone(this._tzm);
            } else if (typeof this._i === 'string') {
                this.zone(this._i);
            }
            return this;
        },

        hasAlignedHourOffset : function (input) {
            if (!input) {
                input = 0;
            }
            else {
                input = moment(input).zone();
            }

            return (this.zone() - input) % 60 === 0;
        },

        daysInMonth : function () {
            return daysInMonth(this.year(), this.month());
        },

        dayOfYear : function (input) {
            var dayOfYear = round((moment(this).startOf('day') - moment(this).startOf('year')) / 864e5) + 1;
            return input == null ? dayOfYear : this.add("d", (input - dayOfYear));
        },

        quarter : function (input) {
            return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
        },

        weekYear : function (input) {
            var year = weekOfYear(this, this.lang()._week.dow, this.lang()._week.doy).year;
            return input == null ? year : this.add("y", (input - year));
        },

        isoWeekYear : function (input) {
            var year = weekOfYear(this, 1, 4).year;
            return input == null ? year : this.add("y", (input - year));
        },

        week : function (input) {
            var week = this.lang().week(this);
            return input == null ? week : this.add("d", (input - week) * 7);
        },

        isoWeek : function (input) {
            var week = weekOfYear(this, 1, 4).week;
            return input == null ? week : this.add("d", (input - week) * 7);
        },

        weekday : function (input) {
            var weekday = (this.day() + 7 - this.lang()._week.dow) % 7;
            return input == null ? weekday : this.add("d", input - weekday);
        },

        isoWeekday : function (input) {
            // behaves the same as moment#day except
            // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
            // as a setter, sunday should belong to the previous week.
            return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
        },

        isoWeeksInYear : function () {
            return weeksInYear(this.year(), 1, 4);
        },

        weeksInYear : function () {
            var weekInfo = this._lang._week;
            return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
        },

        get : function (units) {
            units = normalizeUnits(units);
            return this[units]();
        },

        set : function (units, value) {
            units = normalizeUnits(units);
            if (typeof this[units] === 'function') {
                this[units](value);
            }
            return this;
        },

        // If passed a language key, it will set the language for this
        // instance.  Otherwise, it will return the language configuration
        // variables for this instance.
        lang : function (key) {
            if (key === undefined) {
                return this._lang;
            } else {
                this._lang = getLangDefinition(key);
                return this;
            }
        }
    });

    function rawMonthSetter(mom, value) {
        var dayOfMonth;

        // TODO: Move this out of here!
        if (typeof value === 'string') {
            value = mom.lang().monthsParse(value);
            // TODO: Another silent failure?
            if (typeof value !== 'number') {
                return mom;
            }
        }

        dayOfMonth = Math.min(mom.date(),
                daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function rawGetter(mom, unit) {
        return mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]();
    }

    function rawSetter(mom, unit, value) {
        if (unit === 'Month') {
            return rawMonthSetter(mom, value);
        } else {
            return mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }

    function makeAccessor(unit, keepTime) {
        return function (value) {
            if (value != null) {
                rawSetter(this, unit, value);
                moment.updateOffset(this, keepTime);
                return this;
            } else {
                return rawGetter(this, unit);
            }
        };
    }

    moment.fn.millisecond = moment.fn.milliseconds = makeAccessor('Milliseconds', false);
    moment.fn.second = moment.fn.seconds = makeAccessor('Seconds', false);
    moment.fn.minute = moment.fn.minutes = makeAccessor('Minutes', false);
    // Setting the hour should keep the time, because the user explicitly
    // specified which hour he wants. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    moment.fn.hour = moment.fn.hours = makeAccessor('Hours', true);
    // moment.fn.month is defined separately
    moment.fn.date = makeAccessor('Date', true);
    moment.fn.dates = deprecate("dates accessor is deprecated. Use date instead.", makeAccessor('Date', true));
    moment.fn.year = makeAccessor('FullYear', true);
    moment.fn.years = deprecate("years accessor is deprecated. Use year instead.", makeAccessor('FullYear', true));

    // add plural methods
    moment.fn.days = moment.fn.day;
    moment.fn.months = moment.fn.month;
    moment.fn.weeks = moment.fn.week;
    moment.fn.isoWeeks = moment.fn.isoWeek;
    moment.fn.quarters = moment.fn.quarter;

    // add aliased format methods
    moment.fn.toJSON = moment.fn.toISOString;

    /************************************
        Duration Prototype
    ************************************/


    extend(moment.duration.fn = Duration.prototype, {

        _bubble : function () {
            var milliseconds = this._milliseconds,
                days = this._days,
                months = this._months,
                data = this._data,
                seconds, minutes, hours, years;

            // The following code bubbles up values, see the tests for
            // examples of what that means.
            data.milliseconds = milliseconds % 1000;

            seconds = absRound(milliseconds / 1000);
            data.seconds = seconds % 60;

            minutes = absRound(seconds / 60);
            data.minutes = minutes % 60;

            hours = absRound(minutes / 60);
            data.hours = hours % 24;

            days += absRound(hours / 24);
            data.days = days % 30;

            months += absRound(days / 30);
            data.months = months % 12;

            years = absRound(months / 12);
            data.years = years;
        },

        weeks : function () {
            return absRound(this.days() / 7);
        },

        valueOf : function () {
            return this._milliseconds +
              this._days * 864e5 +
              (this._months % 12) * 2592e6 +
              toInt(this._months / 12) * 31536e6;
        },

        humanize : function (withSuffix) {
            var difference = +this,
                output = relativeTime(difference, !withSuffix, this.lang());

            if (withSuffix) {
                output = this.lang().pastFuture(difference, output);
            }

            return this.lang().postformat(output);
        },

        add : function (input, val) {
            // supports only 2.0-style add(1, 's') or add(moment)
            var dur = moment.duration(input, val);

            this._milliseconds += dur._milliseconds;
            this._days += dur._days;
            this._months += dur._months;

            this._bubble();

            return this;
        },

        subtract : function (input, val) {
            var dur = moment.duration(input, val);

            this._milliseconds -= dur._milliseconds;
            this._days -= dur._days;
            this._months -= dur._months;

            this._bubble();

            return this;
        },

        get : function (units) {
            units = normalizeUnits(units);
            return this[units.toLowerCase() + 's']();
        },

        as : function (units) {
            units = normalizeUnits(units);
            return this['as' + units.charAt(0).toUpperCase() + units.slice(1) + 's']();
        },

        lang : moment.fn.lang,

        toIsoString : function () {
            // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
            var years = Math.abs(this.years()),
                months = Math.abs(this.months()),
                days = Math.abs(this.days()),
                hours = Math.abs(this.hours()),
                minutes = Math.abs(this.minutes()),
                seconds = Math.abs(this.seconds() + this.milliseconds() / 1000);

            if (!this.asSeconds()) {
                // this is the same as C#'s (Noda) and python (isodate)...
                // but not other JS (goog.date)
                return 'P0D';
            }

            return (this.asSeconds() < 0 ? '-' : '') +
                'P' +
                (years ? years + 'Y' : '') +
                (months ? months + 'M' : '') +
                (days ? days + 'D' : '') +
                ((hours || minutes || seconds) ? 'T' : '') +
                (hours ? hours + 'H' : '') +
                (minutes ? minutes + 'M' : '') +
                (seconds ? seconds + 'S' : '');
        }
    });

    function makeDurationGetter(name) {
        moment.duration.fn[name] = function () {
            return this._data[name];
        };
    }

    function makeDurationAsGetter(name, factor) {
        moment.duration.fn['as' + name] = function () {
            return +this / factor;
        };
    }

    for (i in unitMillisecondFactors) {
        if (unitMillisecondFactors.hasOwnProperty(i)) {
            makeDurationAsGetter(i, unitMillisecondFactors[i]);
            makeDurationGetter(i.toLowerCase());
        }
    }

    makeDurationAsGetter('Weeks', 6048e5);
    moment.duration.fn.asMonths = function () {
        return (+this - this.years() * 31536e6) / 2592e6 + this.years() * 12;
    };


    /************************************
        Default Lang
    ************************************/


    // Set default language, other languages will inherit from English.
    moment.lang('en', {
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    /* EMBED_LANGUAGES */

    /************************************
        Exposing Moment
    ************************************/

    function makeGlobal(shouldDeprecate) {
        /*global ender:false */
        if (typeof ender !== 'undefined') {
            return;
        }
        oldGlobalMoment = globalScope.moment;
        if (shouldDeprecate) {
            globalScope.moment = deprecate(
                    "Accessing Moment through the global scope is " +
                    "deprecated, and will be removed in an upcoming " +
                    "release.",
                    moment);
        } else {
            globalScope.moment = moment;
        }
    }

    // CommonJS module is defined
    if (hasModule) {
        module.exports = moment;
    } else if (typeof define === "function" && define.amd) {
        define("moment", function (require, exports, module) {
            if (module.config && module.config() && module.config().noGlobal === true) {
                // release the global variable
                globalScope.moment = oldGlobalMoment;
            }

            return moment;
        });
        makeGlobal(true);
    } else {
        makeGlobal();
    }
}).call(this);


/* **********************************************
     Begin bcvalidation.js
********************************************** */

    // validationFunctions.js and EN validatelang
    if (typeof jslang == "undefined") {
      LoadLangV("EN")
    }else {
      if (jslang == "JP") {
        jslang = "JA"
      }
      if (jslang == "CS") {
        jslang = "CZ"
      }
      if (jslang == "SI") {
        jslang = "SL"
      }
      LoadLangV(jslang)
    }
    if (validatelang === undefined && jslang === 'EN') {
      var validatelang = {
        Currency: {
          MustNumber: " must be a number and cannot be empty\n",
          NoSymbol: " amount you entered must be a number without currency symbol\n"
          },
        Number: {
          MustNumber: " must be a number and cannot be empty\n",
          NoDecimal: " must be a number (no decimal points) and cannot be empty\n" 
          },
        Float: {
          MustNumber: " must be a number and may contain a decimal point.\n" 
          },
        Enter: {
          PleaseEnter: "- Please enter "
        },              
        Select: {
          PleaseSelect: "- Please select ",
          MustSelect: " must be selected\n"
        },
        Email: {
          ValidEmail: "- Please enter a valid email address\n",
          Illegal: "- The email address contains illegal characters\n"
        },
        CheckDate: {
          ValidDate: " as a valid date.\n"
        },
        Others:{
          CannotContain: " cannot contain ",
          WhiteSpace: "white spaces\n",
          Character: "character.\n"
        },
        IP:{
          Illegal: "- Please enter a valid IP Address"
        }
      },
      dpicklang = {
        Su: 'Su',
        Mo: 'Mo',
        Tu: 'Tu',
        We: 'We',
        Th: 'Th',
        Fr: 'Fr',
        Sa: 'Sa',
        Jan: 'Jan',
        Feb: 'Feb',
        Mar: 'Mar',
        Apr: 'Apr',
        May: 'May',
        Jun: 'Jun',
        Jul: 'Jul',
        Aug: 'Aug',
        Sep: 'Sep',
        Oct: 'Oct',
        Nov: 'Nov',
        Dec: 'Dec',
        Today: 'Today',
        Clear: 'Clear',
        Close: 'Close'
      };
    }
    function LoadLangV(b) {
      if (document.getElementById("RADEDITORSTYLESHEET0")) {
        return
      }else {
        var c = document.createElement("script");
        c.setAttribute("src", "/BcJsLang/ValidationFunctions.aspx?lang=" + b);
        document.getElementsByTagName("head")[0].appendChild(c);
      }
    }

    function formfield(j, d) {
      switch (d) {
        case "firstupper":
          var b = true;
          var e = true;
          for (var g = 1; g < j.length; g++) {
            var f = j.charCodeAt(g);
            if (f >= 65 && f <= 90) {
              e = false
            }
            if (f >= 97 && f <= 127) {
              b = false
            }
          }
          if (b || e) {
            var h = j.split(" ");
            j = "";
            for (var g = 0; g < h.length; g++) {
              if (h[g].length >= 1) {
                j = j + " " + h[g].substring(0, 1).toUpperCase() + h[g].substring(1).toLowerCase()
              }
            }
          }
          j = j.replace(".", "");
          j = j.replace(",", "");
          break;
        case "firstupperspecial":
          var h = j.split(" ");
          j = "";
          for (var g = 0; g < h.length; g++) {
            if (h[g].length >= 1) {
              j = j + " " + h[g].substring(0, 1).toUpperCase() + h[g].substring(1)
            }
          }
          break;
        case "alllower":
          j = j.toLowerCase();
          break;
        case "allupper":
          j = j.toUpperCase();
          break;
        default:
          break
      }
      if (j.substring(0, 1) == " ") {
        j = j.substring(1)
      }
      return j
    }

    function isCurrency(b, d) {
      var g = "";
      if (b.length == 0) {
        g = "- " + d + validatelang.Currency.MustNumber
      } else {
        for (var f = 0; f < b.length; f++) {
          var e = b.charAt(f);
          if ((e < "0") || (e > "9")) {
            if (e != "." && e != ",") {
              g = "- " + d + validatelang.Currency.NoSymbol
            }
          }
        }
      }
      return g
    }

    function isNumeric(b, d) {
      var g = "";
      if (b.length == 0) {
        g = "- " + d + validatelang.Number.MustNumber
      } else {
        var f;
        for (f = 0; f < b.length; f++) {
          var e = b.charAt(f);
          if ((e < "0") || (e > "9")) {
            g = "- " + d + validatelang.Number.NoDecimal;
            return g
          }
        }
      }
      return g
    }

    function isFloat(b, d) {
      var g = "";
      var f;
      if (b.length == 0) {
        g = "- " + d + validatelang.Float.MustNumber
      } else {
        for (f = 0; f < b.length; f++) {
          var e = b.charAt(f);
          if (((e < "0") || (e > "9"))) {
            if (e != "." && e != ",") {
              g = "- " + d + validatelang.Float.MustNumber;
              return g
            }
          }
        }
      }
      return g
    }

    function isEmpty(d, c) {
      var b = "";
      if (d.trim().length == 0) {
        b = validatelang.Enter.PleaseEnter + c + "\n"
      }
      return b
    }

    function checkDropdown(d, c) {
      var b = "";
      if (d === null) d = "";
      if (d.length == 0 || d == " " || d == "") {
        b = validatelang.Select.PleaseSelect + c + "\n"
      }
      return b
    }

    function checkEmail(e) {
      var b = "";
      if (e.length > 0) {
        var c = /^[^@]+@[^@]+\.[^@]{2,6}$/;
        if (!(c.test(e))) {
          b = validatelang.Email.ValidEmail
        } else {
          var d = /[\+\(\)\<\>\,\;\:\\\"\[\]]/;
          if (e.match(d)) {
            b = validatelang.Email.Illegal
          }
        }
      } else {
        b = validatelang.Email.ValidEmail
      }
      return b
    }

    function checkSelected(c, e) {
      var b = "- " + e + validatelang.Select.MustSelect;
      if (c.length > 0) {
        for (var d = 0; d < c.length; d++) {
          if (c[d].disabled == false && c[d].checked == true) {
            b = ""
          }
        }
      } else {
        if (c.disabled == false && c.checked == true) {
          b = ""
        }
      }
      return b
    }

    function getRadioSelected(b) {
      if (b.length > 0) {
        for (var c = 0; c < b.length; c++) {
          if (b[c].disabled == false && b[c].checked == true) {
            return b[c].value
          }
        }
      } else {
        if (b.disabled == false && b.checked == true) {
          return b.value
        }
      }
      return null
    }

    function checkSelectedX(c, h) {
      var b = "- " + h + validatelang.Select.MustSelect;
      var e = document.getElementById(c);
      var g = e.getElementsByTagName("td");
      var f;
      for (var d = 0; d < g.length; d++) {
        f = g[d].firstChild;
        if (f && (f.type == "checkbox" || f.type == "radio")) {
          if (f.disabled == false && f.checked == true) {
            b = ""
          }
        }
      }
      return b
    }

    function checkSpaces(e, c) {
      var b = "";
      for (var d = 0; d < e.length; d++) {
        if (e.charAt(d) == " ") {
          b = "- " + c + validatelang.Others.CannotContain + validatelang.Others.WhiteSpace
        }
      }
      return b
    }

    function checkUrlChar(f, d) {
      var b = "";
      for (i = 0; i < f.length; i++) {
        var e = f.charAt(i);
        switch (e) {
          case "/":
          case "\\":
          case "#":
          case "?":
          case ":":
          case "@":
          case "=":
          case "&":
          case '"':
          case "|":
          case "_":
          case ".":
          case "%":
            b = "- " + d + validatelang.Others.CannotContain + "[" + e + "] " + validatelang.Others.Character;
            return b
        }
      }
      return b
    }

    function isInteger(b) {
      var e;
      if (b.length == 0) {
        return false
      }
      for (e = 0; e < b.length; e++) {
        var d = b.charAt(e);
        if (((d < "0") || (d > "9"))) {
          return false
        }
      }
      return true
    }

    function checkDate(c, b) {
      var e = "";
      if (c.length == 0) {
        e = validatelang.Enter.PleaseEnter + b + validatelang.CheckDate.ValidDate;
        return e
      }
      return e
    }

    function appendBreak(b) {
      return b = b + "\n"
    }
    String.prototype.trim = function() {
      a = this.replace(/^\s+/, "");
      return a.replace(/\s+$/, "")
    };

    function addEventSimple(d, c, b) {
      if (d.addEventListener) {
        d.addEventListener(c, b, false)
      } else {
        if (d.attachEvent) {
          d.attachEvent("on" + c, b)
        }
      }
    }

    function sendRequestSync(d, f, e) {
      var c = createXMLHTTPObject();
      if (!c) {
        return
      }
      var b = (e) ? "POST" : "GET";
      c.open(b, d, false);
      c.setRequestHeader("User-Agent", "XMLHTTP/1.0");
      if (e) {
        c.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
      }
      c.send(e);
      if (c.status === 200) {
        return c.responseText
      }
    }
    var XMLHttpFactories = [
      function() {
        return new XMLHttpRequest()
      },
      function() {
        return new ActiveXObject("Msxml2.XMLHTTP")
      },
      function() {
        return new ActiveXObject("Msxml3.XMLHTTP")
      },
      function() {
        return new ActiveXObject("Microsoft.XMLHTTP")
      }
    ];

    function createXMLHTTPObject() {
      var d = false;
      for (var c = 0; c < XMLHttpFactories.length; c++) {
        try {
          d = XMLHttpFactories[c]()
        } catch (b) {
          continue
        }
        break
      }
      return d
    }
    for (var i = 0; i < document.forms.length; i++) {
      initCaptchaOnForm(document.forms[i])
    }

    function initCaptchaOnForm(b) {
      if (b._CaptchaHookedUp) {
        return
      }
      if (!b.CaptchaV2) {
        return
      }
      if (!b.CaptchaHV2) {
        return
      }
      b._CaptchaHookedUp = true
    }

    function captchaIsInvalid(h, e, j) {
      if ((h._CaptchaTextValidated === true) && (h._CaptchaTextIsInvalid === false)) {
        return ""
      }
      if (typeof h.ReCaptchaChallenge != "undefined") {
        var c = Recaptcha.get_challenge();
        var g = Recaptcha.get_response();
        if (g.trim().length == 0) {
          return "- " + e
        }
        h.ReCaptchaAnswer.value = Recaptcha.get_response();
        h.ReCaptchaChallenge.value = Recaptcha.get_challenge();
        var d = sendRequestSync("/ValidateCaptcha.ashx?key=" + c + "&answer=" + g + "&imageVerificationType=recaptcha");
        h._CaptchaTextIsInvalid = d == "false";
        h._CaptchaTextValidated = true;
        if (h._CaptchaTextIsInvalid) {
          regenerateCaptcha(h)
        }
      } else {
        var c = $(h).find('[name=CaptchaHV2]').val();
        var g = $(h).find('[name=CaptchaV2]').val();
        var b = 6;
        if (g.trim().length == 0) {
          return "- " + e
        }
        if (g.length != b) {
          h._CaptchaTextIsInvalid = true
        } else {
          var d = sendRequestSync("/ValidateCaptcha.ashx?key=" + c + "&answer=" + g);
          h._CaptchaTextIsInvalid = d == "false";
          h._CaptchaTextValidated = true;
          if (h._CaptchaTextIsInvalid) {
            regenerateCaptcha(h)
          }
        }
      } if (h._CaptchaTextIsInvalid) {
        return "- " + j
      }
      return ""
    }

    function regenerateCaptcha(h) {
      h._CaptchaTextValidated = false;
      h._CaptchaTextIsInvalid = true;
      if (typeof h.ReCaptchaChallenge != "undefined") {
        Recaptcha.reload()
      } else {
        var d = sendRequestSync("/CaptchaHandler.ashx?Regenerate=true&rand=" + Math.random());
        h.CaptchaHV2.value = d;
        h.CaptchaV2.value = "";
        var j = h.getElementsByTagName("img");
        if (j.length == 0) {
          if ((h.parentNode.nodeName.toLowerCase() == "p") && (h.parentNode.nextSibling) && (h.parentNode.nextSibling.nodeName.toLowerCase() == "table") && (h.parentNode.nextSibling.className == "webform")) {
            j = h.parentNode.nextSibling.getElementsByTagName("img")
          }
        }
        for (var b = 0; b < j.length; b++) {
          var m = j[b].src;
          var c = m.toLowerCase();
          if (c.indexOf("/captchahandler.ashx") > -1) {
            var g = c.indexOf("?id=") + 4;
            var k = c.indexOf("&", g);
            var l = m.substring(g, k);
            var e = m.replace(l, d);
            j[b].src = e;
            break
          }
        }
      }
    }

    function isNumericIfVisible(b, d) {
      var g = "";
      if (b.style.display == "inline") {
        if (b.value.length == 0) {
          g = "- " + d + validatelang.Number.MustNumber
        } else {
          var f;
          for (f = 0; f < b.value.length; f++) {
            var e = b.value.charAt(f);
            if ((e < "0") || (e > "9")) {
              g = "- " + d + validatelang.Number.NoDecimal;
              return g
            }
          }
        }
      }
      return g
    }

    function checkIPAddress(c) {
      var b = /^\s*((0|[1-9]\d?|1\d{2}|2[0-4]\d|25[0-5])\.){3}(0|[1-9]\d?|1\d{2}|2[0-4]\d|25[0-5])\s*$/;
      if (b.test(c)) {
        return ""
      }
      return validatelang.IP.Illegal
    };
    

    function LoadLangD(a) {
      var b = document.createElement("script");
      b.setAttribute("src", "/BcJsLang/Java_DatePicker.aspx?lang=" + a);
      document.getElementsByTagName("head")[0].appendChild(b)
    }
    var datePickerDivID = "datepicker";
    var iFrameDivID = "datepickeriframe";
    var dayArrayShort;
    var monthArrayShort;
    var dateSeparator = "-";
    var datePickerInit = 0;

    function InitDatePicker() {
      dayArrayShort = new Array(dpicklang.Su, dpicklang.Mo, dpicklang.Tu, dpicklang.We, dpicklang.Th, dpicklang.Fr, dpicklang.Sa);
      monthArrayShort = new Array(dpicklang.Jan, dpicklang.Feb, dpicklang.Mar, dpicklang.Apr, dpicklang.May, dpicklang.Jun, dpicklang.Jul, dpicklang.Aug, dpicklang.Sep, dpicklang.Oct, dpicklang.Nov, dpicklang.Dec);
      datePickerInit = 1
    }
    if (document.all) {
      document.onmousedown = captureMousePosition
    } else {
      if (document.getElementById) {
        document.onmousedown = captureMousePosition
      }
    }
    var mousex;
    var mousey;

    function captureMousePosition(a) {
      if (document.all) {
        mousex = window.event.x + document.body.scrollLeft;
        if (document.documentElement && document.documentElement.scrollTop > 0) {
          mousey = window.event.y + document.documentElement.scrollTop
        } else {
          mousey = window.event.y + document.body.scrollTop
        }
      } else {
        if (document.getElementById) {
          mousex = a.pageX;
          mousey = a.pageY
        }
      }
    }

    function displayDatePicker(b) {
      if (datePickerInit == 0) {
        InitDatePicker()
      }
      var d = document.getElementById(b);
      var a = d.offsetLeft;
      var e = d.offsetTop + d.offsetHeight;
      var c = d;
      while (c.offsetParent) {
        c = c.offsetParent;
        a += c.offsetLeft;
        e += c.offsetTop
      }
      if (mousex < a) {
        a = mousex
      }
      if (mousey < e) {
        e = mousey
      }
      drawDatePicker(d, a, e)
    }

    function displayDatePicker2(b) {
      if (datePickerInit == 0) {
        InitDatePicker()
      }
      var d = b;
      var a = d.offsetLeft;
      var e = d.offsetTop + d.offsetHeight;
      var c = d;
      while (c.offsetParent) {
        c = c.offsetParent;
        a += c.offsetLeft;
        e += c.offsetTop
      }
      if (mousex < a) {
        a = mousex
      }
      if (mousey < e) {
        e = mousey
      }
      drawDatePicker(d, a, e)
    }

    function drawDatePicker(d, b, c) {
      var e = getFieldDate(d.value);
      if (!document.getElementById(datePickerDivID)) {
        var f = document.createElement("div");
        f.setAttribute("id", datePickerDivID);
        f.setAttribute("class", "dpDiv");
        f.setAttribute("style", "visibility: hidden; padding: 9px; color: #666666");
        document.body.appendChild(f)
      }
      var a = document.getElementById(datePickerDivID);
      a.style.position = "absolute";
      a.style.left = b + "px";
      a.style.top = c + "px";
      a.style.border = "1px solid #999999";
      a.style.backgroundColor = "#ffffff";
      a.style.visibility = (a.style.visibility == "visible" ? "hidden" : "visible");
      a.style.zIndex = 900000000;
      refreshDatePicker(d.name, e.getFullYear(), e.getMonth(), e.getDate())
    }

    function refreshDatePicker(j, k, p, r) {
      var e = new Date();
      if ((p >= 0) && (k > 0)) {
        e = new Date(k, p, 1)
      } else {
        r = e.getDate();
        e.setDate(1)
      }
      var B = "\r\n";
      var g = "<style>.text {font: 10px arial; color: #666666}</style>" + B;
      var w = "<table class='date'>" + B;
      var x = "</table>" + B;
      var v = "<tr style='cursor:hand'>";
      var u = "<tr>";
      var z = "<tr>";
      var y = "</tr>" + B;
      var s = "<td>";
      var c = "<td align='center' colspan='7' style='text-align: center'>";
      var C = "<td>";
      var f = "<td align='center' colspan='7'>";
      var A = "<td style='border-bottom: 1px solid #f0f0f0; text-align: center; font-size: 9px; color: #999;'>";
      var d = "<td style='text-align: center; color: #666666; font-size: 10px; padding: 3px' ";
      var o = "</td>" + B;
      var b = "<div>";
      var h = "<div style='background: #005ba7; color: #ffffff'>";
      var l = "</div>";
      var t = g + w;
      t += v + c;
      t += "<select id='ddMonth' style='font: 10px Arial;' onChange='refreshDatePicker(\"" + j + '", document.getElementById("ddYear").value, this.options[this.selectedIndex].value);\'>';
      for (var m = 0; m <= 11; m++) {
        if (e.getMonth() == m) {
          t += "<option selected value=" + m + ">" + monthArrayShort[m] + "</option>"
        } else {
          t += "<option value=" + m + ">" + monthArrayShort[m] + "</option>"
        }
      }
      t += "</select>";
      t += "<select id='ddYear' style='font: 10px Arial;' onChange='refreshDatePicker(\"" + j + '", this.options[this.selectedIndex].value, document.getElementById("ddMonth").value);\'>';
      for (m = 1920; m <= 2099; m++) {
        if (e.getFullYear() == m) {
          t += "<option selected value=" + m + ">" + m + "</option>"
        } else {
          t += "<option value=" + m + ">" + m + "</option>"
        }
      }
      t += "</select>";
      t += o + y;
      t += u;
      for (m = 0; m < dayArrayShort.length; m++) {
        t += A + dayArrayShort[m] + o
      }
      t += y;
      t += v;
      for (m = 0; m < e.getDay(); m++) {
        t += s + "&nbsp;" + o
      }
      do {
        var n = e.getDate();
        TD_onclick = " onclick=\"updateDateField('" + j + "', '" + getDateString(e) + "');\">";
        if (n == r) {
          t += d + TD_onclick + h + n + l + o
        } else {
          t += d + TD_onclick + n + o
        } if (e.getDay() == 6) {
          t += y + v
        }
        e.setDate(e.getDate() + 1)
      } while (e.getDate() > 1);
      if (e.getDay() > 0) {
        for (m = 6; m > e.getDay(); m--) {
          t += s + "&nbsp;" + o
        }
      }
      t += y;
      var q = new Date();
      var a = "Today is " + dayArrayShort[q.getDay()] + ", " + monthArrayShort[q.getMonth()] + " " + q.getDate();
      t += z + f;
      t += "<button class='button' style='font: 10px arial;background-color:white;' onClick='refreshDatePicker(\"" + j + "\");'>" + dpicklang.Today + "</button> ";
      t += "<button class='button' style='font: 10px arial;background-color:white;' onClick='clearDateField(\"" + j + "\");'>" + dpicklang.Clear + "</button> ";
      t += "<button class='button' style='font: 10px arial;background-color:white;' onClick='updateDateField(\"" + j + "\");'>" + dpicklang.Close + "</button>";
      t += o + y;
      t += x;
      document.getElementById(datePickerDivID).innerHTML = t;
      if (document.all) {
        adjustiFrame()
      }
    }

    function getDateString(b) {
      var a = "00" + b.getDate();
      var c = monthArrayShort[b.getMonth()];
      a = a.substring(a.length - 2);
      return a + dateSeparator + c + dateSeparator + b.getFullYear()
    }

    function getFieldDate(h) {
      var g;
      if (h.length == 0) {
        g = new Date();
        return g
      }
      var f, c, e;
      var j = h.indexOf(dateSeparator);
      var b = h.indexOf(dateSeparator, j + 1);
      f = h.substring(0, j);
      c = h.substring(j + 1, b);
      for (var a = 0; a < monthArrayShort.length; a++) {
        if (monthArrayShort[a] == c) {
          c = a
        }
      }
      e = h.substring(b + 1);
      if (e > 2099) {
        f = 31;
        c = 11;
        e = 2099
      }
      g = new Date(e, c, f);
      return g
    }

    function updateDateField(b, a) {
      var c = document.getElementsByName(b).item(0);
      if (a) {
        c.value = a
        $('[name='+b+']').trigger('change');
      }
      hideDatePicker();
      if ((a) && (typeof(datePickerClosed) == "function")) {
        datePickerClosed(c)
      }
    }

    function hideDatePicker() {
      if (document.getElementById(datePickerDivID)) {
        document.getElementById(datePickerDivID).style.visibility = "hidden";
        adjustiFrame()
      }
    }

    function clearDateField(a) {
      var b = document.getElementsByName(a).item(0);
      b.value = ""
    }

    function adjustiFrame(a, b) {
      if (!document.getElementById(iFrameDivID)) {
        var d = document.createElement("iFrame");
        d.setAttribute("id", iFrameDivID);
        d.setAttribute("src", "javascript:false;");
        d.setAttribute("scrolling", "no");
        d.setAttribute("frameborder", "0");
        document.body.appendChild(d)
      }
      if (!a) {
        a = document.getElementById(datePickerDivID)
      }
      if (!b) {
        b = document.getElementById(iFrameDivID)
      }
      try {
        b.style.position = "absolute";
        b.style.width = a.offsetWidth;
        b.style.height = a.offsetHeight;
        b.style.top = a.style.top;
        b.style.left = a.style.left;
        b.style.zIndex = a.style.zIndex - 1;
        b.style.visibility = a.style.visibility
      } catch (c) {}
    }

    function DisplayTextBox(e, f) {
      var b = document.getElementById("Days");
      var c = document.getElementById("LBDays");
      var d = document.getElementById("neverRB");
      var a = document.getElementById("daysRB");
      if (e == a) {
        b.style.display = "inline";
        c.style.display = "inline";
        b.value = f;
        setTimeout(function() {
          a.checked = true;
          d.checked = false
        }, 0)
      } else {
        if (e == d) {
          b.style.display = "none";
          c.style.display = "none";
          b.value = f;
          setTimeout(function() {
            d.checked = true;
            a.checked = false
          }, 0)
        }
      }
    };

/* **********************************************
     Begin dev-prefix.bcEngine.js
********************************************** */

/*
 * Dev-in-a-Box @Copyright ONE Creative and Adam Cook. License can be obtained from bcappstore.com. Documentation at onecreative.pro/apps/dev-in-a-box/docs.
 *
 * Changelog
 *
 * 2.1.2
 * - Changed bc.path to lowercase to help avoid bugs in tricks like ActiveNav
 * - Added bc.secureurl
 *
 * 2.1.1
 * - Fixed bug where user-specified options with true or false statements ended up causing errors.
 *
 * 2.1.0
 * - Changed bcVars to bc
 * - Added utility function, bc.escape(), to escape characters and variables for RegExp use.
 * - Performance improvements: changed :first and :last to .first and .last, cached window, document, and body, and changed .each to for.
 * - Added utility function, bc.jsonify(), to return variously formatted strings as valid json
 *
 * 2.0.0
 * - Changed plugin name to devinabox
 * - Changed all references of bcp to bc
 * - Changed bcpVars.bcp to bcVars.modules
 * - Changed pagenameDA to pagenameAttr
 * - Changed hostDA to sitehostAttr
 * - Removed data-bcp-options. Using the primary data attributes instead.
 * - Changed dataOptions to options
 *
 * 1.0.2
 * - Fixed remaining reference to #bcplugins.
 * - Changed bcpVars.siteURL to bcVars.sitehost for better readability
 * - Changed siteURLDA to hostDA for better readability and accuracy
 * - Added bcVars.settings, based on the new default of settingsAttr = bc-settings (in the suffix)
 *
 * 1.0.1
 * - Changed bcpID value from bcplugins to bcmodules in the suffix, allowing more versatility in its use.
 *
 * Next changes:
 * - Allow plugin to be placed in document head (not recommended, but allowed)
 * 
 */

;(function ($,win) {
	"use strict";
	$.bcEngine = function(options) {

		// bc represents the plugin defaults. These are constants throughout the functions
		var doc = win.document,body = $(doc.body),bc = $.extend({},$.bcEngine.defaults,options),
			_jsonify_brace = /^[{\[]/, _jsonify_token = /[^,:{}\[\]]+/g, _jsonify_quote = /^['"](.*)['"]$/, _jsonify_escap = /(["])/g;

			bc.settingsAttr = bc.dataPrefix+'-'+bc.settingsAttr;
			bc.pagenameAttr = bc.dataPrefix+'-'+bc.pagenameAttr;
			bc.pageaddressAttr = bc.dataPrefix+'-'+bc.pageaddressAttr;
			bc.sitehostAttr = bc.dataPrefix+'-'+bc.sitehostAttr;
			bc.siteurlAttr = bc.dataPrefix+'-'+bc.siteurlAttr;
			bc.securezoneAttr = bc.dataPrefix+'-'+bc.securezoneAttr;
			bc.loginstatusAttr = bc.dataPrefix+'-'+bc.loginstatusAttr;
			bc.addthisidAttr = bc.dataPrefix+'-'+bc.addthisidAttr;
			bc.googleanalyticsAttr = bc.dataPrefix+'-'+bc.googleanalyticsAttr;
			
			bc.modules = body.find('#'+bc.modulesID);
			bc.pagename = (body.find('[data-'+bc.pagenameAttr+']').first().is('#'+bc.modulesID)) ? body.find('[data-'+bc.pagenameAttr+']').last().data(bc.pagenameAttr) : body.find('[data-'+bc.pagenameAttr+']').first().data(bc.pagenameAttr);
			bc.pageaddress = bc.modules.data(bc.pageaddressAttr);
			bc.sitehost = '//'+bc.modules.data(bc.sitehostAttr);
			bc.siteurl = '//'+bc.modules.data(bc.siteurlAttr);
			bc.secureurl = '//'+bc.modules.data(bc.secureurlAttr);
			bc.path = win.location.pathname.toLowerCase();
			bc.pathArray = bc.path.split(/(?=\/#?[a-zA-Z0-9])/g);
			bc.param = win.location.search;
			bc.paramArray = bc.param.split(/(?=&#?[a-zA-Z0-9])/g);
			bc.hash = win.location.hash;
			bc.addthisid = bc.modules.data(bc.addthisidAttr);
			bc.googleanalytics = bc.modules.data(bc.googleanalyticsAttr);
			bc.escape = function(str) { return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"); };
			bc.jsonify = function(str) {
				// Wrap with `{}` if not JavaScript object literal
				str = $.trim(str);
				if (_jsonify_brace.test(str) === false) str = '{' + str + '}';

				// Retrieve token and convert to JSON
				return str.replace(_jsonify_token, function (a) {
					a = $.trim(a);
					// Keep some special strings as they are
					if ('' === a || 'true' === a || 'false' === a || 'null' === a || (!isNaN(parseFloat(a)) && isFinite(a))) return a;
					// For string literal: 1. remove quotes at the top end; 2. escape double quotes in the middle; 3. wrap token with double quotes
					else return '"'+ a.replace(_jsonify_quote, '$1').replace(_jsonify_escap, '\\$1')+ '"';
				});
			};
			

		var options,obj,arr=[],str="",userDefined={},module = [],functions = {},defaults = {},version={};

		version.bcEngine = '2.1.1';

		/*------------------------------------------*/
		/* Begin plugin modules           */
		/*------------------------------------------*/

/* **********************************************
     Begin dev-ActiveNav.js
********************************************** */


// Begin ActiveNav()
/*------------------------------------------*/

module.push('ActiveNav');
functions.ActiveNav = ActiveNav;
version.ActiveNav = '2.2.2';

/*
 * Changelog
 *
 * 2.2.2
 * - Fixed bug where ActiveNav would not add active classes to links with absolute URLs
 * - removeClass now leaves the class on the nav if there is no active link found.
 *
 * 2.2.1
 * - Added removeClass option, which aids in battling FOUC by allowing a designer to hard-code classes to their navigation (to make it appear a certain way on load), which will be removed after ActiveNav is finished initializing.
 * - Improved performance by replacing .each() loops with for() loops in the trick's code.
 *
 * 2.2.0
 * - Added support for url hashes
 * - Made ActiveNav respond to url changes, even if there is no page refresh
 * - Added option to change url when referenced anchor tags reach a specified distance from the top of the window
 *
 * 2.1.2
 * - Changed bcVars to bc
 *
 * 2.1.1
 * - Fixed bug where the levelClass would not be added to the navigation in situations where no active element was found.
 *
 * 2.1.0
 * - Added removeHidden option. removeHidden removes the parent elements of level and the children of lastLevel from the DOM. Default is true. This is good for SEO (no hidden content).
 * - Added lastLevel option. Adds lastLevelClass to the specified level of the navigation. Default is 0 (off).
 * - Removed activeElement. ActiveNav is designed to work with unordered lists.
 * - Added levelTitle. Determines whether or not the parent element of level will remain, adding context to the menu items below it.
 * - Added unlinkTitle. Setting this option to true will replace the levelTitle's link element with a span.
 *
 * 2.0.0
 * - Replaced bc-settings data attribute with a variable
 * - Changed bcp to bc
 * - Changed dataOptions to userDefined
 * - Removed unnecessary return
 * - Added support for selecting specific levels of navigation through level. Good for using the same dynamic menu for both primary and secondary navigation.
 *
 * 1.0.1
 * - Fixed a settings conflict when more than one plugin instance existed on a page. It was using the settings for the last plugin instance on the page. Now stores settings in a data attribute on the selector.
 *
 * Next changes:
 *
 */

function ActiveNav(selector, bc, userDefined) {
	defaults = { // define the defaults here if there are any. If not, still leave this variable here. It resets defaults from any previous use.
		navClass: 'activenav',
		activeClass: 'active',
		level: 1,
		levelClass: 'level',
		lastLevel: 0,
		lastLevelClass: 'lastlevel',
		levelTitle: false,
		levelTitleClass: 'leveltitle',
		unlinkTitle: false,
		removeHidden: true,
		activeHash: false,
		hashSupport: true,
		hashOffset: 30,
		removeClass: ''
	};
	selector.data(bc.settingsAttr, $.extend({}, bc, defaults, userDefined));
	var settings = selector.data(bc.settingsAttr);

	// vars
	var shortPath, activeLinks, currentLink, gotIt = 0,
		first, segment, last, currentHash;

	function makeActive(activeLinks, first, last) {
		for(var i=0, len = $(activeLinks).size(); i<len;i++){
			var _this = activeLinks[i];
			$(_this).parentsUntil(first, 'li').addClass(settings.activeClass);
			$(_this).closest(first).children('ul').addClass(settings.levelClass);
		}
		
		if (settings.level > 1 && settings.levelTitle !== false) {
			$('.' + settings.levelClass).parent('li').addClass(settings.levelTitleClass);
			if (settings.levelTitle !== false && settings.unlinkTitle !== false) {
				$('.' + settings.levelTitleClass).children('a').replaceWith('<span>' + $('.' + settings.levelTitleClass).children('a').html() + '</span>');
			}
		}
		if (settings.level > 1 && settings.removeHidden === true) {
			if (settings.levelTitle !== false) {
				segment = $('.' + settings.levelTitleClass).detach();
				selector.children('ul').html(segment);
			} else {
				segment = selector.find('.' + settings.levelClass).detach();
				selector.html(segment);
			}
		}
	}
	function updateHashUrl(hash) {
		if (settings.activeHash)
			history.pushState({}, "", hash);
	}

	function initHashChange(hash) {
		if (hash != null) settings.hash = hash;
		else settings.hash = win.location.hash; // reset the settings.hash

		currentHash = settings.hash;
		settings.pathArray = $.grep(settings.pathArray, function(el) {
			return (el.indexOf('#') == -1 || el == settings.hash);
		});
		initActiveNav();
	}

	function initActiveNav() {
		shortPath = settings.path.toLowerCase() + settings.hash.toLowerCase();
		selector.find('.' + settings.activeClass).removeClass(settings.activeClass);
		if (settings.hash !== '') settings.pathArray.push(settings.hash.toLowerCase());

		// This loop returns all matching links from the first iteration that has a match (within level), then exits the loop;
		for (var i = settings.pathArray.length - 1; i >= 0; i--) {
			// Go through each link
			activeLinks = first.find('a').filter(function(index) {
				currentLink = $(this).attr('href').split('?')[0].toLowerCase().replace('https:','').replace('http:','').replace(settings.siteurl,'').replace(settings.sitehost,'');

				if (currentLink === shortPath) {
					gotIt = 1;
					return true;
				}
			});
			if (gotIt === 1) {
				break;
			} else {
				// shorten shortPath and go through the loop again.
				shortPath = shortPath.replace(settings.pathArray[i], '');
			}
		}
		if (activeLinks.length > 1) {
			// Filter remaining activeLinks
			activeLinks = activeLinks.filter(function(index) {

				// shortPath needs to be reset for each link we go through
				shortPath = settings.path.toLowerCase();

				if (settings.path === '/') {
					return true;
				} else {
					for (var i = settings.pathArray.length - 1; i >= 0; i--) {
						currentLink = $(this).attr('href').split('?')[0].toLowerCase();
						if (currentLink === shortPath) {
							return true;
						} else if (shortPath !== "") {
							shortPath = shortPath.replace(settings.pathArray[i], '');
						}
					}
				}
			});
		}
		if (activeLinks.length > 0) {
			makeActive(activeLinks, first, last);
			if ($.trim(settings.removeClass).length > 0) {
				selector.find('.' + settings.removeClass).addBack().removeClass(settings.removeClass);
			}
		}else if (selector.find('.' + settings.levelClass).size() == 0){
			selector.children('ul').addClass(settings.levelClass);
		}
	}

	function outOfView(elem) {
		var docViewTop = $(win).scrollTop();
		var docViewBottom = docViewTop + $(win).height();

		var elemTop = $(elem).offset().top;
		return (elemTop > docViewBottom);
	}
	function inViewTopBottom(elem) {
		var docViewTop = $(win).scrollTop();
		var elemTop = $(elem).offset().top;
		var elemBottom = elemTop + $(elem).height();
		return (docViewTop < elemBottom && docViewTop > elemTop - settings.hashOffset);
	}

	// Add the window hashchange event, to add the active class on hash change
	$(win).off('hashchange');
	$(win).on('hashchange', function() {
		initHashChange();
	});

	if (settings.hashSupport) { // If hashSupport is true. url and navigation automatically updates on page scroll at certain positions
		currentHash = settings.hash;
		var hashLinks = selector.find('a[href*="' + settings.path + '#"]');
		for(var i=0,len = $(hashLinks).size(); i<len;i++){
			$('#' + $(hashLinks[i]).attr('href').split('#')[1]).addClass('hash');
		}
		
		$(doc).off('scroll.ActiveNav');
		$(doc).on('scroll.ActiveNav', function() {
			for(var i=0, len = body.find('.hash').size(); i<len; i++){
				var top = win.pageYOffset, _this=$(body.find('.hash')[i]);
				var distance = top - _this.offset().top;
				var hash = _this.attr('id');
				//if (distance < settings.hashOffset && distance > (-1 * settings.hashOffset) && (currentHash != hash || currentHash.length == 0)) {
				if (inViewTopBottom(_this) && (currentHash != hash || currentHash.length == 0)) {
					currentHash = '#' + hash;
					initHashChange(currentHash);
					updateHashUrl('#' + hash);
				}
			}
			if ($('.hash').size() > 0){
				if (outOfView($('.hash')[0])) {
					currentHash = '';
					initHashChange(currentHash);
					updateHashUrl('#');
				}
			}
		});
	}

	// Add .activenav to the selector element
	selector.addClass(settings.navClass);

	// find level
	first = $(selector);
	if (settings.level > 1) {
		for (i = settings.level - 1; i > 0; i--) {
			first = first.closestDescendant('li', true);
		}
	}
	// find lastLevel
	if (settings.lastLevel > 0) {
		last = $(selector);
		for (i = settings.lastLevel; i > 0; i--) {
			last = last.closestDescendant('li', true);
		}
	} else last = 0;

	$(last).parent('ul').addClass(settings.lastLevelClass);
	if (last !== 0 && settings.removeHidden === true) {
		selector.find('.' + settings.lastLevelClass).closestDescendant('ul', true).remove();
	}

	initActiveNav();
}

/*------------------------------------------*/
// End ActiveNav()


/* **********************************************
     Begin dev-Crumbs.js
********************************************** */

// Begin Crumbs()
/*------------------------------------------*/

module.push('Crumbs');
functions.Crumbs = Crumbs;
version.Crumbs = '2.1.0';

/*
 * Changelog
 *
 * 2.1.0
 * - Added showHome option, allowing the link to the home page to appear first. Default is false.
 * - Added homeTitle option, allowing for a custom crumb name to be applied to the home link. Default is null, which relies on the regular Ajax method for retrieving the name.
 *
 * 2.0.2
 * - Changed bcVars to bc
 *
 * 2.0.1
 * - Fixed a bug where if a person specified "ajax:true;" (the default value) in the options, it would end up false.
 * - Removed doc reference to turn ajax off through the options. It's hard to benefit form Crumbs without ajax.
 * 2.0.0
 * - Updated variable bcpVars.siteURL to bcVars.sitehost
 * - Replaced bc-settings data attribute with a variable.
 * - Changed bcp to bc
 * - Changed dataOptions to userDefined
 * - If two crumbs end up at the same location, keep the first but drop the second. Good for redirect scenarios.
 * - Solve issue with loading crumb data from a secure domain: Blocked loading mixed active content "http://mysite.businesscatalyst.com/page"
 *
 * 1.0.1
 * - Fixed a settings conflict when more than one plugin instance existed on a page. It was using the settings for the last plugin instance on the page. Now stores settings in a data attribute on the selector.
 *
 * Next changes:
 */

function Crumbs (selector,bc,userDefined) {
	defaults = { // define the defaults here if there are any. If not, still leave this variable here. It resets defaults from any previous use.
		separator: '/',
		makespace: '-',
		ajax: true,
		showHome: false,
		homeTitle: 'Home'
	};
	selector.data(bc.settingsAttr,$.extend({},bc,defaults,userDefined));
	var settings = selector.data(bc.settingsAttr);

	/* define variables */
		var separator = ' '+settings.separator+' ',crumbArray,crumbURL,crumb,
		reg,pageArray,paramArray,path,breadcrumbs = '',i=0,useAjax = (settings.ajax===true || settings.ajax==='true') ? true : false;
		crumbArray = settings.pathArray; // This may change its value later in the script, so it's best not to use our global.
		paramArray = settings.paramArray;
		path = settings.path; // This may change its value later in the script, so it's best not to use our global.
		reg = new RegExp(settings.makespace,'g'); // create array of pagenames based on the url
		pageArray = path.replace(reg,' ').split('/');
		pageArray.shift(); // remove the first item (it's empty)
		if (settings.showHome !== false) pageArray.unshift(settings.homeTitle);
		crumbURL = settings.siteurl; // siteurl, as opposed to sitehost, will show the actual domain, whether it's secure or not.
	/* end variable definitions */

	/* cleanup messy paths */
		switch (path) {
			case '/ForumRetrieve.aspx':
				crumbURL += '/ForumRetrieve.aspx';
				crumbArray = paramArray;
				if (settings.param.contains('NoTemplate')) {
					crumbArray.pop();
				}
				break;
			case '/FAQRetrieve.aspx':
				crumbURL += '/FAQRetrieve.aspx';
				crumbArray = paramArray;
				break;
			default: crumbArray = crumbArray;
		}
	/* end cleanup messy paths */

	/* define functions */
		function urlCrumbName (i,crumb,pageArray,paramArray) {
			// choolse the information source for crumb
			crumb = pageArray[i];

			// create rules for special pages
			switch (crumb) {
				case 'OrderRetrievev2.aspx' : crumb = 'shopping cart';break;
				case 'ForumRetrieve.aspx' : crumb = 'forum';break;
				case 'ForumRegister.aspx' : crumb = 'forum registration';break;
				default : crumb = crumb;
			}
			if (paramArray!==undefined) {
				switch (paramArray[0]) {
					case '?Step=13' : crumb = 'checkout';break;
					default : crumb = crumb;
				}
			}
			return crumb;
		}
		function ajaxCrumbName (crumb,response,bcID,pagenameAttr) {
			// choolse the information source for crumb
			crumb = $(response).filter('#'+bcID).data(pagenameAttr);
			return crumb;
		}
		function breadcrumb (i,crumbArray,breadcrumbs,crumbURL,crumb,separator) {
			// put the current breadcrumb together
			if (i<crumbArray.length-1) {
				breadcrumbs = '<a href="'+crumbURL+'">'+crumb+'</a>'+separator;
			}else {
				breadcrumbs = '<span class="this_crumb">'+crumb+'</span>';
			}
			return breadcrumbs;
		}
	/* end function definitions */

	/* build breadcrumbs */
		if (useAjax) {
			// build crumbs with Ajax
			while (i<crumbArray.length) {
				crumbURL += crumbArray[i];
				if (path === '/FAQRetrieve.aspx' && i===0) {
					crumbURL = '/faq';	// workaround for FAQs module
				}else if (i === crumbArray.length-1) {
					breadcrumbs += '<span class="this_crumb">'+settings.pagename+'</span>';
				}else {
					$.ajax({
						url: crumbURL,
						type: 'GET',
						dataType: 'html',
						async: false,
						success: function(response) {
							if (settings.pageaddress === $(response).filter('#'+settings.modulesID).data(settings.pageaddressAttr)) return;
							if (crumbArray[i] === '/' && settings.showHome !== false && settings.homeTitle !== null) {
								crumb = crumb;
							}else {
								crumb = ajaxCrumbName (crumb,response,settings.modulesID,settings.pagenameAttr);		
							}
							breadcrumbs += breadcrumb (i,crumbArray,breadcrumbs,crumbURL,crumb,separator);
						},
						error: function (response){
							if(response.status===404) {
								// Skip this crumb. Breadcrumbs are meant to show us the way back, not match the menu or URL structure.
								// crumb = urlCrumbName (i,crumb,pageArray,paramArray);
								// breadcrumbs += breadcrumb (i,crumbArray,breadcrumbs,crumbURL,crumb,separator);
							}
						}
					});
				}
				i++;
			}
		}else {
			// build crumbs from URL
			while (i<crumbArray.length) {
				crumbURL += crumbArray[i];
				if (crumbArray[i] === '/' && settings.showHome !== false && settings.homeTitle !== null) {
					crumb = crumb;
				}else {
					crumb = urlCrumbName (i,crumb,pageArray,paramArray);
				}
				breadcrumbs += breadcrumb (i,crumbArray,breadcrumbs,crumbURL,crumb,separator);
				i++;
			}
		}
		breadcrumbs = '<span>'+breadcrumbs+'</span>';
	/* end build breadcrumbs */
	return selector.html(breadcrumbs);
}

/*------------------------------------------*/
// End Crumbs()

/* **********************************************
     Begin dev-Date.js
********************************************** */

// Begin Date()
/*------------------------------------------*/

module.push('Date');
functions.Date = Date;
version.Date = '2.2.0';

/*
 * Changelog
 *
 * 2.2.0
 * - Largely rewritten.
 * - Text inside the html element is now used as the date and time information to work with. If nothing is inside the element, the current date and time information is used.
 * - Added 'moment' option, which allows you to specify the format of incoming date and time information. Default is DD-MMM-YYYY.
 * - Removed onlyVal.
 * - Added 'ref' option, which allows you to specify the html attribute from which to reference the date/time information. Default is 'text', except with inputs which default to 'value'.
 * - Added 'target' option, which allows you to specify a comma separated list of html attributes to be used as the target for the outputted date/time info. Default is 'text', except with inputs which default to 'value'.
 *
 * 2.1.0
 * - Added add and subtract options.
 *
 * 2.0.1
 * - Changed bcVars to bc
 *
 * 2.0.0
 * - Rebranded as Date
 * - Incorporates Moment.js for smart formmating of date and time. (http://momentjs.com/docs/#/parsing/string-format/)
 * - Replaced bc-settings data attribute with a variable.
 * - Changed bcp to bc
 * - Changed dataOptions to userDefined
 * - Date can be applied to most elements, including input fields.
 *
 * 1.0.1
 * - Fixed a settings conflict when more than one plugin instance existed on a page. It was using the settings for the last plugin instance on the page. Now stores settings in a data attribute on the selector.
 * - Added a space between the symbol and the year.
 * - Removed 'return' from function, since there is nothing to return to.
 *
 * Next changes:
 *  
 * 
 */

function Date (selector,bc,userDefined) {
	defaults = { // define the defaults here if there are any. If not, still leave this variable here. It resets defaults from any previous use.
		format: 'YYYY',
		add: '',
		subtract: '',
		moment: 'DD-MMM-YYYY',
		ref: 'text', // specify an html attribute (inputs will default to 'value')
		target: 'text' // specify an html attribute (inputs will default to 'value'). Separate multiple targets with commas.
	};
	selector.data(bc.settingsAttr,$.extend({},bc,defaults,userDefined));
	var settings = selector.data(bc.settingsAttr);

	if (settings.add !== '') settings.add = $.parseJSON(settings.jsonify(settings.add));
	if (settings.subtract !== '') settings.subtract = $.parseJSON(settings.jsonify(settings.subtract));

	var ref,value,targets;
	
	if (ref === 'text' && selector.is('input')) ref = 'value';
	ref = (settings.ref === 'text') ? selector.text() : selector.attr(settings.ref);
	value = (ref !== '') ? moment(ref,settings.moment) : moment();
	value = value.add(settings.add).subtract(settings.subtract).format(settings.format);

	targets = settings.target.split(',');
	for (var i=0; i<targets.length; i++) {
		if (targets[i] === 'text' && selector.is('input')) targets[i] = 'value';
		(targets[i] === 'text') ? selector.text(value) : selector.attr(targets[i],value);
	}	
}

/*------------------------------------------*/
// End Date()

/* **********************************************
     Begin dev-FormMagic.js
********************************************** */

// Begin FormMagic()
/*------------------------------------------*/

module.push('FormMagic');
functions.FormMagic = FormMagic;
version.FormMagic = '2.1.4';

/*
 * Changelog
 *
 * 2.1.4
 * - Replaced each() in the code with for(), which is several times faster
 * - Added buttonOnSubmit and buttonAfterSubmit options to allow disabling submit button during and after a form submission.
 * - Fixed issue where the error class was not applied to radio and checkbox inputs when they failed validation.
 * - Fixed issue where an Ajax response would return nothing if the response message element was a direct child of the body element.
 * - Fixed issue where pressing the enter key on a multistep form would validate all steps
 * - Added restoreMessageBox option, which will show the original contents of the box if the form response is empty. Default is true. Great for live searches.
 * - Fixed issues that made building live search boxes difficult.
 * - Added validationError option to allow a custom script to be run when a validation error occurs on submit.
 *
 * 2.1.3
 * - Changed submitFieldName option to submitField, and allowed any CSS selector to be used as the value
 *
 * 2.1.2
 * - Fixed PasswordConfirm
 *
 * 2.1.1
 * - Changed bcVars to bc
 *
 * 2.1.0
 * - Added an active submit feature. Submits the form after a specified field event. Options are 'keyup', 'blur', 'change', and 'dblclick'.
 * - Added beforeSubmit feature. Allows for a specified script to be run after successful validation, but before submission. If the script returns 'stop', FormMagic will skip form submission afterwards.
 * - Added ajax callback functionality for success, error and complete.
 * - Added noSubmit option. Allows for disabling form submission, while allowing all other functionality. Default is false.
 * - Added reCaptcha validation
 * - Added multistep option. Allowing forms to be validated in stages.
 *
 * 2.0.1
 * - Fixed a number of validation bugs introduced in 2.0.0.
 * - Added labelFallback object to provide label names if there is no label element or placeholder attribute to provide it.
 * - Changed hideAfterAjax to afterAjax and added options to it, defaulting to 'remove'. This default prevents multiple spam form submissions.
 * - Validation now works with native Captcha, but not reCaptcha (yet).
 *
 * 2.0.0
 * - Replaced bc-settings data attribute with a variable.
 * - Changed bcp to bc
 * - Changed dataOptions to userDefined
 * - Auto-require FirstName, LastName, EmailAddress, Captcha, ItemName
 * - Allow label to become validation message (default)
 * - Allow placeholder to become validation message (option)
 * - Added Validation for:
 *     Checkbox
 *     Radio
 *     Select
 *     Captcha
 *     Password
 * - Included BC validation and datepicker variables and scripts instead of calling them with Ajax.
 *
 * 1.0.1
 * - Fixed alert mode, some code had not been updated after the last major rewrite. Didn't work at all.
 * - Fixed a settings conflict when more than one plugin instance existed on a page. It was using the settings for the last plugin instance on the page. Now stores settings in a data attribute on the selector.
 *
 */

function FormMagic (selector,bc,userDefined) {
	defaults = { // define the defaults here if there are any. If not, still leave this variable here. It resets defaults from any previous use.
		'requiredClass' : 'required',
		'errorGroupElement' : 'div',
		'errorGroupClass' : 'error-group',
		'errorMessageElement' : 'small',
		'errorClass' : 'error',
		'messageBoxID' : bc.modulesID,
		'messageMode' : 'prepend', // 'append', 'box'
		'restoreMessageBox' : true, // If submission result is empty, the contents of messageBox will be restored. This is particularly helpful with live searches.
		'afterAjax' : 'remove', // 'hide', 'show'
		'useAjax' : false,
		'validateMode' : 'alert', // 'inline'
		'fieldTitleAttr' : 'label', // or specify a field attribute
		'systemMessageClass' : 'system-message',
		'systemErrorMessageClass' : 'system-error-message',
		'successClass' : 'success',
		'submitEvent' : null,
		'submitField' : '[type="submit"]',
		'beforeSubmit' : null, // specify a function to run after validation, but before submission
		'validationError' : null, // specify a function to run after validation returns errors
		'noSubmit' : false, // allow form submission to be bypassed after successful validation.
		'ajaxSuccess' : null, // specify a function to run after an Ajax submission 'success' response
		'ajaxError' : null, // specify a function to run after an Ajax submission 'error' response
		'ajaxComplete' : null, // specify a function to run after an Ajax submission 'complete' response
		'multistep' : false,  // True if this is a multistep form or validations are to be done in steps
		'containers' : '', // multistep container selectors, separated by comma
		'continueButton' : '', // Continue button selector for multi step form
		'backButton' : '', // back button selector for multi step form
		'buttonOnSubmit' : 'disable', // none,disable,hide
		'buttonAfterSubmit' : 'enable' //none,enable,hide,show,disable
	};
	selector.data(bc.settingsAttr,$.extend({},bc,defaults,userDefined));
	var settings = selector.data(bc.settingsAttr);

	// setup some local variables
	var action = selector.attr('action'),requiredFields,required=[],submitCount=0,
		errorArray=[],errorElement='<'+settings.errorGroupElement+' class="'+settings.errorGroupClass+'"></'+settings.errorGroupElement+'>',newRequired,pass={},
		errorTarget,successMessage,messageElement,messageBox,selectorResponse,onChangeBinding,errorElementExists,errorCount=0,autoRequire,currentName,submitField,paymentMethods = selector.find('[name="PaymentMethodType"]'), onlyCCMethod = false, multistepContainers = [],requiredMultistep=[],
		containerIndex=0, lockSubmit = false, messageBoxContents = $('#'+settings.messageBoxID).html(),
		labelFallback = {'Title' : 'Title', 'FirstName' : 'First Name', 'LastName' : 'Last Name', 'FullName' : 'Full Name', 'EmailAddress' : 'Email Address', 'Username' : 'Username', 'Password' : 'Password', 'HomePhone' : 'Home Phone Number', 'WorkPhone' : 'Work Phone Number', 'CellPhone' : 'Cell Phone Number', 'HomeFax' : 'Home Fax Number', 'WorkFax' : 'Work Fax Number', 'HomeAddress' : 'Home Address', 'HomeCity' : 'Home City', 'HomeState' : 'Home State', 'HomeZip' : 'Home Zip', 'HomeCountry' : 'Home Country', 'WorkAddress' : 'WorkAddress', 'WorkCity' : 'Work City', 'WorkState' : 'Work State', 'WorkZip' : 'Work Zip', 'WorkCountry' : 'Work Country', 'WebAddress' : 'Web Address', 'Company' : 'Company', 'DOB' : 'Date of Birth', 'PaymentMethodType' : 'Payment Method', 'BillingAddress' : 'Billing Address', 'BillingCity' : 'Billing City', 'BillingState' : 'Billing State', 'BillingZip' : 'Billing Zip Code', 'BillingCountry' : 'Billing Country', 'ShippingAddress' : 'Shipping Address', 'ShippingCity' : 'Shipping City', 'ShippingState' : 'Shipping State', 'ShippingZip' : 'Shipping Zip Code', 'ShippingCountry' : 'Shipping Country', 'ShippingInstructions' : 'Shipping Instructions', 'ShippingAttention' : 'Shipping Attention', 'Friend01' : 'Friend Email 1', 'Friend02' : 'Friend Email 2', 'Friend03' : 'Friend Email 3', 'Friend04' : 'Friend Email 4', 'Friend05' : 'Friend Email 5', 'Message' : 'Friend Message', 'Anniversary1Title' : 'Anniversary Title', 'Anniversary1' : 'Anniversary', 'Anniversary2Title' : 'Anniversary 2 Title', 'Anniversary2' : 'Anniversary 2', 'Anniversary3Title' : 'Anniversary 3 Title', 'Anniversary3' : 'Anniversary 3', 'Anniversary4Title' : 'Anniversary 4 Title', 'Anniversary4' : 'Anniversary 4', 'Anniversary5Title' : 'Anniversary 5 Title', 'Anniversary5' : 'Anniversary 5', 'FileAttachment' : 'File Attachment', 'CAT_Custom_1423_326' : 'Gender', 'CAT_Custom_1424_326' : 'Height', 'CAT_Custom_1425_326' : 'Marital Status', 'CAT_Custom_1426_326' : 'Has Children', 'CAT_Custom_1427_326' : 'Years in Business', 'CAT_Custom_1428_326' : 'Number of Employees', 'CAT_Custom_1429_326' : 'Annual Revenue', 'CAT_Custom_1430_326' : 'Financial Year', 'InvoiceNumber' : 'Invoice Number', 'CardName' : 'Name on Card', 'CardNumber' : 'Card Number', 'CardExpiryMonth' : 'Card Expiry Month', 'CardExpiryYear' : 'Card Expiry Year', 'CardType' : 'Card Type', 'CardCCV' : 'CCV Number', 'CaptchaV2' : 'Captcha'};
	
	function runValidation (required,counter,total) {
		var rdoChkFlag = false;
		if (counter===0) {errorCount=0;}

		// Check the field for a value change
		required.value = (required.field.val() === undefined) ? '' : required.field.val();

		// verify field types and make adjustments to them as needed.
		if (required.type === 'text' || required.type === 'hidden' || required.type === 'password') {
			switch (required.name) {
				case 'EmailAddress'   : required.type = 'email';      break;
				case 'Friend01'     : required.type = 'email';      break;
				case 'Friend02'     : required.type = 'email';      break;
				case 'Friend03'     : required.type = 'email';      break;
				case 'Friend04'     : required.type = 'email';      break;
				case 'Friend05'     : required.type = 'email';      break;
				case 'DOB'        : required.type = 'date';     break;
				case 'Anniversary1'   : required.type = 'date';     break;
				case 'Anniversary2'   : required.type = 'date';     break;
				case 'Anniversary3'   : required.type = 'date';     break;
				case 'Anniversary4'   : required.type = 'date';     break;
				case 'Anniversary5'   : required.type = 'date';     break;
				case 'Anniversary5'   : required.type = 'date';     break;
				case 'CaptchaV2'    : required.type = 'captcha';    break;
				case 'CardNumber'   : required.type = 'number';     break;
				case 'CardCCV'      : required.type = 'number';     break;
				case 'Amount'     : required.type = 'currency';   break;
				case 'Password'     : required.type = 'password';   break;
				case 'PasswordConfirm'  : required.type = 'passwordconfirm';break;
				case 'Days'       : required.type = 'days';     break;
				default         : required.type = 'text';
			}
		}

		// Run the appropriate validator for the field type
		switch (required.type) {
			case 'select'     : required.message = checkDropdown(required.value, required.label); break;
			case 'radio'      : required.message = checkSelected(selector.find('[name='+required.name+']'), required.label); break;
			case 'checkbox'     : required.message = checkSelected(selector.find('[name='+required.name+']'), required.label); break;
			case 'email'      : required.message = checkEmail(required.value); break;
			case 'date'       : required.message = checkDate(required.value,required.label); break;
			case 'password'     : required.message = (required.value !== "" && required.value.length < 6) ? "- Password must be 6 characters or longer" : isEmpty(required.value,required.label);pass.value = required.value;pass.label = required.label; break;
			case 'passwordconfirm'  : required.message = (pass.value.length > 0 && pass.value !== required.value) ? pass.label+' and '+required.label+' do not match' : ''; break;
			case 'captcha'      : required.message = captchaIsInvalid(selector[0], "Enter Word Verification in box", "Please enter the correct Word Verification as seen in the image"); break;
			case 'currency'     : required.message = isCurrency(required.value, required.label); break;
			case 'number'     : required.message = isNumeric(required.value, required.label); break;
			case 'days'       : required.message = isNumericIfVisible(required.field, required.label); break;
			default         : required.message = isEmpty(required.value,required.label);
		}

		required.message = required.message.replace('- ','').replace('\n','');
		if (required.message !=='') {errorCount++;}

		if (settings.validateMode==='alert') {
			if (required.message !=='') {
				if (errorCount===1) {
					errorArray = '- '+required.message+'\n';
				}else {
					errorArray += '- '+required.message+'\n';
				}
			}
			if (counter===total-1 && errorCount !== 0) {
				alert(errorArray);
			}
		}else if (settings.validateMode==='inline') {
			switch (required.type) {
				case 'radio' : errorTarget = selector.find('label[for='+required.name+']'); rdoChkFlag=true; break;
				case 'checkbox' : errorTarget = selector.find('label[for='+required.name+']'); rdoChkFlag = true; break;
				case 'captcha' : (selector.find('#recaptcha_widget_div').length > 0) ? errorTarget = selector.find('#recaptcha_widget_div') : errorTarget = required.field; break;
				default : errorTarget = required.field;
			}
			if (errorTarget.parent().is(settings.errorGroupElement+'.'+settings.errorGroupClass)) {
				errorElementExists = true;
			}else {
				errorElementExists = false;
			}

			if (required.message !=='') {
				if (errorElementExists) {
					// just replace the error message
					errorTarget.siblings(settings.errorMessageElement+'.'+settings.errorClass).text(required.message);
				}else {
					// add the message into new element
					messageElement = '<'+settings.errorMessageElement+' class="'+settings.errorClass+'">'+required.message+'</'+settings.errorMessageElement+'>';
					errorTarget.addClass(settings.errorClass).wrap(errorElement);
					if (rdoChkFlag) selector.find('[name="' + required.name + '"]').addClass(settings.errorClass);
					errorTarget.parent().append(messageElement);
				}
			}else if (errorElementExists) {
				// remove the element
				errorTarget.siblings(settings.errorMessageElement+'.'+settings.errorClass).remove();
				errorTarget.removeClass(settings.errorClass).unwrap();
				if (rdoChkFlag) selector.find('[name="' + required.name + '"]').removeClass(settings.errorClass);
			}
		}
	}
	function buttonSubmitBehaviour(behavior){
		var submitButton = selector.find('[type="submit"]');
		switch(behavior){
			case 'show':
				submitButton.show();
				break;
			case 'hide':
				submitButton.hide();
				break;
			case 'disable':
				submitButton.attr('disabled','disabled');
				break;
			case 'enable':
				submitButton.removeAttr('disabled');
				break;
			default:
				submitButton.show();
				submitButton.removeAttr('disabled');
		}
	}
	function submitForm(submitCount) {
		if (submitCount===0) {

			buttonSubmitBehaviour(settings.buttonOnSubmit);
			if (settings.useAjax) {
				$.ajax({
					type: 'POST',
					url: action,
					data: selector.serialize(),
					success: function(response) {
						if (response.indexOf(settings.systemMessageClass) > 0) {
							var msg = $(response).find('.'+settings.systemMessageClass);
							if ($(msg).size() > 0) successMessage = msg;
							else successMessage = $(response).filter('.'+settings.systemMessageClass);
							showSuccess(selector,successMessage);
						}else if (response.indexOf(settings.systemErrorMessageClass) > 0) {
							var msg = $(response).find('.'+settings.systemErrorMessageClass);
							if ($(msg).size() > 0) successMessage = msg;
							else successMessage = $(response).filter('.'+settings.systemErrorMessageClass);
							showSuccess(selector,successMessage);
						}
						if (settings.ajaxSuccess != null) executeCallback(window[settings.ajaxSuccess],response);
					},
					error: function(xhr,status) {
						if (settings.ajaxError != null) executeCallback(window[settings.ajaxError],status);
						return false;
					},
					complete: function(xhr,status) {
						if (settings.ajaxComplete != null) executeCallback(window[settings.ajaxComplete],status);
						buttonSubmitBehaviour(settings.buttonAfterSubmit);
					}
				});
			}else {
				selector.off('submit').submit();
			}
			return submitCount++;
		}else{
			alert("This form has already been submitted. Please refresh the page if you need to submit again.");
			return false;
		}
	}
	function executeCallback(callback,param){
		if (typeof callback === 'function') {
			var deferred = $.Deferred();
			if (param) deferred.resolve(callback(param));
			else deferred.resolve(callback());
			return deferred.promise();
		}
	}
	function showSuccess(selector,successMessage) {
		messageBox = $('#'+settings.messageBoxID);

		if (settings.afterAjax!=='show') {selector.fadeOut(0);}
		switch (settings.messageMode) {
			case 'append' : selector.after(messageBox);break;
			case 'prepend': selector.before(messageBox);break;
			case 'box': true;break;
			default : true;
		}

		if (successMessage.html().replace(/\n/g,'').replace(/	/g,'').replace(/ /g,'').length === 0 && settings.restoreMessageBox === true) successMessage = messageBoxContents;
		else if(successMessage.find('.search-results').length) successMessage = successMessage.find('.search-results').html();
		messageBox.html(successMessage).fadeIn();

		if (settings.afterAjax==='remove') {selector.remove();}
	}
	function buildRequiredObject(rField,i) {
		required[i] = {
			name : rField.attr('name'),
			field : rField,
			type : (rField.is('input')) ? rField.attr('type') : rField.get(0).tagName.toLowerCase(),
			value : (rField.val() === undefined) ? '' : rField.val(),
			label : (selector.find('label[for='+rField.attr('name')+']').length > 0) ? selector.find('label[for='+rField.attr('name')+']').text() : rField.attr('placeholder')
		};
		if (required[i].label === undefined) required[i].label = labelFallback[required[i].name];
	}
	function buildMultistepRequiredObject(rField,i) {
		requiredMultistep[i] = {
			name : rField.attr('name'),
			field : rField,
			type : (rField.is('input')) ? rField.attr('type') : rField.get(0).tagName.toLowerCase(),
			value : (rField.val() === undefined) ? '' : rField.val(),
			label : (selector.find('label[for='+rField.attr('name')+']').length > 0) ? selector.find('label[for='+rField.attr('name')+']').text() : rField.attr('placeholder')
		};
		if (requiredMultistep[i].label === undefined) requiredMultistep[i].label = labelFallback[requiredMultistep[i].name];
	}
	function autoRequirePaymentFields(){
		if (paymentMethods.filter(':checked').val() == '1' || onlyCCMethod)
			selector.find('[name="CardName"], [name="CardNumber"], [name="CardExpiryMonth"], [name="CardExpiryYear"], [name="CardType"], [name="CardCCV"]').addClass(settings.requiredClass);
		else
			selector.find('[name="CardName"], [name="CardNumber"], [name="CardExpiryMonth"], [name="CardExpiryYear"], [name="CardType"], [name="CardCCV"]').removeClass(settings.requiredClass);
		BuildRequiredObjectArray();
	}
	function BuildRequiredObjectArray(){
		var i = 0,_this = null
		required=[];
		// Build required array
		requiredFields = selector.find('input, select, button, textarea').filter('.'+settings.requiredClass);
		
		for(var cnt=0,len = requiredFields.size(); cnt < len; cnt++){
			_this = requiredFields[cnt];
			newRequired = selector.find('[name='+$(_this).attr("name")+']').not('.'+settings.requiredClass);
			if (newRequired.length > 0) {
				for(var cnt2=0, len2 = $(newRequired).size(); cnt2<len2; cnt2++){
					var newRequiredItem = $(newRequired[cnt2]);
					newRequiredItem.addClass(settings.requiredClass);
					buildRequiredObject(newRequiredItem,i);
					i++;
				}
			}
			buildRequiredObject($(_this),i);
			i++;
		}
	}
	function showHideNavButtons(index){
		if (multistepContainers.length == 0){
			selector.find(settings.continueButton + ',' + settings.backButton).hide();
			selector.find(settings.submitField).show();
		}
		else if (index == 0){
			selector.find(settings.submitField+', ' + settings.backButton).hide();
			selector.find(settings.continueButton).show();
		}
		else if (index == multistepContainers.length -1){
			selector.find(settings.continueButton).hide();
			selector.find(settings.submitField+', ' + settings.backButton).show();
		}
		else{
			selector.find(settings.continueButton + ',' + settings.backButton).show();
			selector.find(settings.submitField).hide();
		}
	}
	
	// Auto Require certain fields
	autoRequire = ['FirstName','LastName','FullName','EmailAddress','CaptchaV2','ItemName'];
	for (var i = 0; i< autoRequire.length; i++) {
		autoRequire.field = selector.find('[name='+autoRequire[i]+']');
		if (autoRequire.field.length > 0 && autoRequire.field.not('.'+settings.requiredClass)) autoRequire.field.addClass(settings.requiredClass);
	}
	
	// Auto require credit card fields depending upon payment method
	if (paymentMethods.size() == 1)
			if ($(paymentMethods[0]).val() == '1') onlyCCMethod = true;
	//autoRequirePaymentFields();
	paymentMethods.on('click',autoRequirePaymentFields);
	// BuildRequiredObjectArray();
	
	
	
	// If multistep true configure validations on containers
	if (settings.multistep){
		var cont = settings.containers.split(',');
		selector.on('keypress',function(e) {
			if (e.keyCode == 13) {
				e.preventDefault();
				if (selector.find(settings.continueButton).filter(':visible').size() > 0) selector.find(settings.continueButton).filter(':visible').trigger('click'); 
				else selector.find('[type="submit"]:visible').trigger('click');
			}
		});
		for (var i = 0, len = $(cont).size(); i < len; i++) {
			var _this = $(cont[i]);
			multistepContainers.push(_this);
		}
		$(settings.continueButton).on('click',function(){
			buildMultiRequiredObjects(containerIndex);
			for (var i = 0;i<requiredMultistep.length;i++) {
				runValidation(requiredMultistep[i],i,requiredMultistep.length);
			}
			if (errorCount===0) moveToContainer(++containerIndex);

			// Now that submission has been attempted, allow active field validation.
			if (settings.validateMode === 'inline') {
				// Set onChangeBinding to true in order to prevent these bindings from occuring multiple times.
				if (requiredMultistep.length>0) {
					for (var i = 0;i<requiredMultistep.length;i++) {
						requiredMultistep[i].field.off('change.multistep');
						requiredMultistep[i].field.on('change.multistep', function() {
							currentName = $(this).attr('name');
							for (var i = 0;i<requiredMultistep.length;i++) {
								if (currentName === requiredMultistep[i].name) runValidation(requiredMultistep[i],0,1);
							}
						});
					}
				}
			}
		});
		$(settings.backButton).on('click',function(){
			moveToContainer(--containerIndex);
		});
		moveToContainer(containerIndex);
	}
	// Move to container specified by index, (default 0)
	function moveToContainer(index){
		showHideNavButtons(index);
		if (index > multistepContainers.length -1){
			index = multistepContainers.length - 1;
			return;
		}
		
		var currContainer = multistepContainers[index];
		requiredMultistep = new Array();

		for (var count=0,len=$(multistepContainers).size(); count < len; count++){
			$(multistepContainers[count]).removeClass('activeContainer').hide();
		}
		
				
		currContainer.addClass('activeContainer').show();
		if (index > 0) selector.get(0).scrollIntoView();
	}
	function buildMultiRequiredObjects (index) {
		var currContainer = multistepContainers[index];
		requiredMultistep = new Array();

		// Build required array
		requiredFields = currContainer.find('input, select, button, textarea').filter('.'+settings.requiredClass);
		var i = 0;
		for (var cnt = 0, len = $(requiredFields).size(); cnt < len; cnt++){
			_this = requiredFields[cnt];
			newRequired = currContainer.find('[name='+$(_this).attr("name")+']').not('.'+settings.requiredClass);
			if (newRequired.length > 0) {
				for(var cnt2=0, len2 = $(newRequired).size(); cnt2<len2; cnt2++){
					var newRequiredItem = $(newRequired[cnt2]);
					newRequiredItem.addClass(settings.requiredClass);
					buildMultistepRequiredObject(newRequiredItem,i);
					i++;
				}
			}
			buildMultistepRequiredObject($(_this),i);
			i++;
		}
	}
	
	// bind to the submit event of our form
	selector.on('submit',function(event) {
		event.preventDefault();
		
		autoRequirePaymentFields();
		BuildRequiredObjectArray();

		if (lockSubmit) return false;
		else lockSubmit = true;
		for (var i = 0;i<required.length;i++) {
			runValidation(required[i],i,required.length);
		}
		if (errorCount===0) {
			if (settings.beforeSubmit != null) {
				$.when(executeCallback(win[settings.beforeSubmit])).then(function(value) {
					if (value !== 'stop' && settings.noSubmit === false) submitForm(submitCount);
				});
			}else if (settings.noSubmit === false) submitForm(submitCount);
		}
		else
			if (settings.validationError != null) executeCallback(window[settings.validationError]);
		// Now that submission has been attempted, allow active field validation.
		if (settings.validateMode === 'inline' && onChangeBinding !== true) {
			// Set onChangeBinding to true in order to prevent these bindings from occuring multiple times.
			onChangeBinding = true;
			if (required.length>0) {
				for (var i = 0;i<required.length;i++) {
					required[i].field.on('change', function() {
						currentName = $(this).attr('name');
						for (var i = 0;i<required.length;i++) {
							if (currentName === required[i].name) runValidation(required[i],0,1);
						}
					});
				}
			}
		}
		lockSubmit = false;	
	});
	// Activate submitEvent
	if (settings.submitField !== '[type="submit"]') {
		submitField = selector.find(settings.submitField);
		if (submitField.length > 0 && settings.submitEvent != null && settings.submitEvent === 'keyup' || settings.submitEvent === 'blur' || settings.submitEvent === 'change' || settings.submitEvent === 'dblclick') {
			submitField.on(settings.submitEvent,function(){
				selector.submit();
			});
		}
	}
}

/*------------------------------------------*/
// End FormMagic()

/* **********************************************
     Begin dev-SameAs.js
********************************************** */

// Begin SameAs()
/*------------------------------------------*/

module.push('SameAs');
functions.SameAs = SameAs;
version.SameAs = '2.1.2';

/*
 * Changelog
 *
 * 2.2.0
 * - Made SameAs trigger the change event so other scripts can respond to its changes.
 * - Added scope option, which allows you to declare the parent element SameAs looks inside of for fields to copy between.
 * - Changed the default for bothWays from true to false
 * - Added prefix and suffix options, which prepend or append specified characters to the copied value
 *
 * 2.1.0
 * - Added breakOnChange, which allows a user change in the target element to disable SameAs.
 *
 * 2.0.2
 * - Changed bcVars to bc
 *
 * 2.0.1
 * - Namespaced the 'change' events and added a trigger('change') to make the events compatible with other plugins.
 *
 * 2.0.0
 * - Use form element as the group. Remove the group attribute.
 * - Replaced bc-settings data attribute with a variable.
 * - Changed bcp to bc
 * - Changed dataOptions to userDefined
 *
 * 1.0.1
 * - Fixed a settings conflict when more than one plugin instance existed on a page. It was using the settings for the last plugin instance on the page. Now stores settings in a data attribute on the selector.
 *
 * Next changes:
 * 
 */

function SameAs (selector,bc,userDefined) {
	defaults = { // define the defaults here if there are any. If not, still leave this variable here. It resets defaults from any previous use.
		bothWays : false,
		attributeType : 'name',
		clearOnUncheck : true,
		copy : null,
		altCopy : null,
		checkbox : null,
		altCheckbox : null,
		breakOnChange : false, // Requires bothWays:false
		prefix : '',
		suffix : '',
		copyType : 'simple', // string,math,simple
		scope : 'form' // Uses 'form' or css selectors as values
	};
	selector.data(bc.settingsAttr,$.extend({},bc,defaults,userDefined));
	var settings = selector.data(bc.settingsAttr);

	// Setup our variables
	var copyGroup = (settings.scope === 'form') ? selector.closest('form') : body.find(settings.scope),
		copyField, checkbox = copyGroup.find('['+settings.attributeType+'='+settings.checkbox+']'),
		copyFields=[],altCopyFields=[],altCheckbox = copyGroup.find('['+settings.attributeType+'='+settings.altCheckbox+']');

	if(settings.copyType=="simple"){
		settings.copy = settings.copy.replace(/\[/g,"").replace(/\]/g,"");
		copyFields.push(copyGroup.find('['+settings.attributeType+'='+settings.copy+']').not(selector));
	}
	else if(settings.copyType == "alternate"){
		settings.bothWays = false;
		settings.copy = settings.copy.replace(/\[/g,"").replace(/\]/g,"");
		settings.altCopy =settings.altCopy.replace(/\[/g,"").replace(/\]/g,"");
		copyFields.push(copyGroup.find('['+settings.attributeType+'='+settings.copy+']').not(selector));
		altCopyFields.push(copyGroup.find('['+settings.attributeType+'='+settings.altCopy+']').not(selector));
	}
	else{
		settings.bothWays = false;
		GetFieldsResult(true);
	}

	function copyVal(selector,copyFields) {
		if(settings.copyType == "simple" || settings.copyType == "alternate"){
			if(copyFields[0].val().length==0 || ((settings.prefix.length > 0 || settings.suffix.length > 0) && settings.bothWays == true)) selector.val(copyFields[0].val()).trigger('change.sameAs').trigger('change');
			else selector.val(settings.prefix + copyFields[0].val() + settings.suffix).trigger('change.sameAs').trigger('change');
		}
		else{
			var result = GetFieldsResult();
			selector.val(settings.prefix + result + settings.suffix).trigger('change.sameAs').trigger('change');
		}
	}
	function inputChange(selector,copyFields) {
		for (var i = copyFields.length - 1; i >= 0; i--) {
			$(copyFields[i]).on('change.sameAs',function() {
				copyVal(selector,copyFields);
			});
		};
		
		if (settings.bothWays === true) {
			selector.on('change.sameAs',function(){
				if (selector.val() !== copyFields[0].val()) {
					copyVal(copyFields[0],[selector]);
				}
			});
		}
	}
	function checkboxChange(chkbox,selector,copyFields) {
		if (chkbox.prop('checked')) {
			if(chkbox.attr("name") == settings.checkbox)
				altCheckbox.removeAttr('checked');
			else if(chkbox.attr("name") == settings.altCheckbox)
				checkbox.removeAttr('checked');

			copyVal(selector,copyFields);
			inputChange(selector,copyFields);
		}else {
			for (var i = copyFields.length - 1; i >= 0; i--) {
				copyFields[i].off('change.sameAs');
			}
			selector.off('change.sameAs');
			selector.val('').trigger('change.sameAs').trigger('change');
		}
	}
	function GetFieldsResult(init){
		return GetFieldsExpression(init);
	}
	function ConcatExpression(str){
		return str.replace(/\+/g,'').replace(/\-/g,'').replace(/\//g,'').replace(/\*/g,'').replace(/\)/g,'').replace(/\(/g,'');
	}
	function GetFieldsExpression(init){
		var strExpression = settings.copy,expr;
		strExpression = GetfieldVal(strExpression);
		try
		{
			if(settings.copyType == "math"){
				expr = Parser.parse(strExpression);
				return expr.evaluate();
			}
			else
				return ConcatExpression(strExpression);
		}
		catch(e){
			return ConcatExpression(strExpression);
		}

		function GetfieldVal(str){
			var sIndex = -1, eIndex=-1, mode = 0,str2 = str, i;
			for(i=0;i<str.length;i++){
				var charCode = str.charCodeAt(i);
				var field;
				if(charCode == 91 && sIndex == -1){
					sIndex = i; 
					mode = 1;
					continue;
				}
				else if(mode == 1 && charCode == 93 && sIndex > -1){
					eIndex = i;
					field = $('[name="' + str.substring(sIndex+1,eIndex)  + '"]');	
					str2 = str2.replace(str.substring(sIndex,eIndex+1),field.val());
					if(init) copyFields.push(field)
					sIndex = -1;
					eIndex = -1;
					mode=0;
				}
				else if((charCode>=65 && charCode <=90) || (charCode>=97 && charCode <=122) && mode==0){
					if(sIndex == -1)
					{
						sIndex = i;
						continue;
					}
				}
				else if(mode==0 && sIndex > -1 && (charCode==42 || charCode==43|| charCode==45||charCode==47 || charCode == 41)){
					eIndex = i-1;
					field = $('[name="' + str.substring(sIndex,eIndex+1)  + '"]');
					str2 = str2.replace(str.substring(sIndex,eIndex+1),field.val());
					if(init) copyFields.push(field);
					sIndex = -1;
					eIndex = -1;
				}
				else
				{
					continue;
				}
			}
			if(sIndex > -1){
				eIndex = i;
				var f = $('[name="' + str.substring(sIndex,eIndex+1)  + '"]');
				str2 = str2.replace(str.substring(sIndex,eIndex+1),f.val());
				if(init) copyFields.push(f);
			}

			return str2;
		}
	}
	// Choose which method to use
	if (checkbox.length || altCheckbox.length) {
		if(checkbox.length){
			checkboxChange(checkbox,selector,copyFields);
			checkbox.on('change.sameAs',function(){
				checkboxChange(checkbox,selector,copyFields);
			});
			if (settings.breakOnChange !== false) {
				selector.on('change',function() {
					checkbox.off('change.sameAs');
					for (var i = copyFields.length - 1; i >= 0; i--) {
						copyFields[i].off('change.sameAs');
					}
					selector.off('change.sameAs');
				});
			}
		}
		if(altCheckbox.length){
			checkboxChange(altCheckbox,selector,altCopyFields);
			altCheckbox.on('change.sameAs',function(){
				checkboxChange(altCheckbox,selector,altCopyFields);
			});
			if (settings.breakOnChange !== false) {
				selector.on('change',function() {
					altCheckbox.off('change.sameAs');
					for (var i = altCopyFields.length - 1; i >= 0; i--) {
						altCopyFields[i].off('change.sameAs');
					}
					selector.off('change.sameAs');
				});
			}
		}
	}else {
		copyVal(selector,copyFields);
		inputChange(selector,copyFields);
		if (settings.breakOnChange !== false) {
			selector.on('change',function() {
				for (var i = copyFields.length - 1; i >= 0; i--) {
					copyFields[i].off('change.sameAs');
				}
				selector.off('change.sameAs');
			});
		}
	}
}

/*------------------------------------------*/
// End SameAs()

/* **********************************************
     Begin dev-Secure.js
********************************************** */

// Begin Secure()
/*------------------------------------------*/

module.push('Secure');
functions.Secure = Secure;
version.Secure = '1.0.0';

/*
 * Changelogs
 *
 * 1.0.0
 * - Option: unsecureLinks. Does what UnSecure did. Default is true.
 * - Option: onSessionEnd. Allows you to specify a custom function to run a login session ends automatically.
 * - Option: sessionEndRedirect. Allows you to specifiy a redirect when a login session ends automatically.
 *
 * Next changes:
 * 
 */

function Secure (selector,bc,userDefined) {
	defaults = { // define the defaults here if there are any. If not, still leave this variable here. It resets defaults from any previous use.
		unsecureLinks : true,
		onSessionEnd : '',
		sessionEndRedirect : ''
	};
	selector.data(bc.settingsAttr,$.extend({},bc,defaults,userDefined));
	var settings = selector.data(bc.settingsAttr);
	var blurTime,status,bcmodules,secure = settings.siteurl.indexOf('worldsecuresystems'),links,href;

	if(settings.onSessionEnd.length > 0 || settings.sessionEndRedirect.length > 0){
		bcmodules = body.find('#bcmodules');
		status = bcmodules.data('bc-loginstatus');
		if(status===1){
			sessionBehavior();
			bindSessionEvents();	
		}
	}

	if(settings.unsecureLinks == true) unsecureLinks();

	function unsecureLinks () {
		if (secure > -1) {
			links = selector.find('a').not('[href^="mailto:"]').not('[href="/LogOutProcess.aspx"]');
			return links.each(function() {
				href = $(this).attr("href");
				if (href === undefined) {
					href = '';
				}
				if (href.indexOf('http') === -1 && href.indexOf('https') === -1 && href.indexOf('#') === -1) {
					if (href.indexOf('/') !== 0) {
						href = '/' + href;
					}
					href = 'http:'+settings.sitehost + href;
					$(this).attr('href', href);
				}
			});
		}
	}
	function sessionBehavior() {
		$.ajax({
			url: '/',
			type: 'GET',
			success: function(response) {
				bcmodules = $(response).filter('#bcmodules');
				status = bcmodules.data('bc-loginstatus');
				if (status === 0) {
					if (win.location.href.indexOf(bcmodules.data('bc-secureurl')) > -1 && settings.sessionEndRedirect != '') {
						win.location.href = 'https://'+bcmodules.data('bc-sitehost')+ settings.sessionEndRedirect;
					}
					if (settings.onSessionEnd != '') executeCallback(window[settings.onSessionEnd]);
				}else {

				}
			}
		});
	}
	function bindSessionEvents (argument) {
		$(win).on('blur',function(){
			blurTime = moment();
		});
		$(win).on('focus',function(){
			if (moment().diff(blurTime, 'minutes', true) > 5) {
				sessionBehavior();
			}
		});
	}

	function executeCallback(callback){
		if(typeof callback === 'function') {
			var deferred = $.Deferred();
			deferred.resolve(callback());
			return deferred.promise();
		}
	}
}

/*------------------------------------------*/
// End Secure()


/* **********************************************
     Begin dev-Trigger.js
********************************************** */

// Begin Trigger()
/*------------------------------------------*/

module.push('Trigger');
functions.Trigger = Trigger;
version.Trigger = '1.0.1';

/*
 * Changelogs
 *
 * 1.0.1
 * - Added support for checkbox list and radio buttons list
 * - Fixed bugs that made Trigger worthless. It now works great.
 * - Added support for multiple 'triggerValue' values.
 *
 * 1.0.0
 * - 
 *
 * Next changes:
 * 
 */

function Trigger (selector,bc,userDefined) {
	defaults = { // define the defaults here if there are any. If not, still leave this variable here. It resets defaults from any previous use.
		trigger: '',
		event: 'click', // click/change
		triggerValue: '', // value to be used in change event. Separate multiple values with commas.
		onClass:'', // css class to be applied
		offClass:'', // css class to be applied
		toggle:false, // if true, class will be toggled on events
		onCallback :'', // on callback
		offCallback :'' // off callback
	};
	selector.data(bc.settingsAttr,$.extend({},bc,defaults,userDefined));
	var settings = selector.data(bc.settingsAttr);

	var triggerEl;
	settings.triggerValue = settings.triggerValue.split(',');
	if(settings.trigger == '') triggerEl = selector;
	else triggerEl = $(settings.trigger);

	// specified special event change, else a generic event of class application and callbacks will be applied
	switch(settings.event){
		case 'change':
			changeTrigger();
			triggerEl.on(settings.event,function(){
				changeTrigger();
			});break;
		default:
			triggerEl.on(settings.event,triggerEvent);
	}
	
	
	// Generic event for all events
	function triggerEvent(){
			if(settings.toggle === true){
				if(selector.hasClass(settings.onClass)){
					selector.removeClass(settings.onClass).addClass(settings.offClass);
					executeCallback(settings.offCallback);
				}
				else{
					selector.removeClass(settings.offClass).addClass(settings.onClass);
					executeCallback(settings.onCallback);
				}
			}
			else{
				selector.addClass(settings.onClass);
				executeCallback(settings.onCallback);
			}
	}
	
	// Change event
	function changeTrigger(){
			var found = 0;
			for (var i=0; i<settings.triggerValue.length; i++) {
				if(GetValue(triggerEl) == settings.triggerValue[i]) found ++;
			}
			if(found > 0){
				selector.removeClass(settings.offClass).addClass(settings.onClass);
				executeCallback(settings.onCallback);
			}else{
				selector.removeClass(settings.onClass).addClass(settings.offClass);
				executeCallback(settings.offCallback);
			}
	}
	function GetValue(triggerElement) {
		var value;
		if(triggerElement.is('[type=radio]'))
			return triggerElement.filter(':checked').val();
		else if(triggerElement.is('[type=checkbox]')){
			if(settings.triggerValue == '' && triggerElement.filter(':checked').size() > 0)
				return "";
			if(triggerElement.filter("[value='" + settings.triggerValue + "']:checked").size() > 0) 
				return triggerElement.filter("[value='" + settings.triggerValue + "']:checked").val();
			else null;
		}else return triggerElement.val();
	}
	// execute function helper
	function executeCallback(callbackName){
		if(callbackName.length > 0){
			var callback = window[callbackName];
			if(typeof callback === 'function') {
				var deferred = $.Deferred();
				deferred.resolve(callback());
				return deferred.promise();
			}
		}
		
	}
}

/*------------------------------------------*/
// End Trigger()


/* **********************************************
     Begin dev-UnSecure.js
********************************************** */

// Begin UnSecure()
/*------------------------------------------*/

module.push('UnSecure');
functions.UnSecure = UnSecure;
version.UnSecure = '2.0.2';

/*
 * Changelog
 *
 * 2.0.2
 * - Fixed a bug where links with mailto: were being altered
 * - Excluded LogOutProcess.aspx from affected links
 *
 * 2.0.1
 * - Changed bcVars to bc
 *
 * 2.0.0
 * - Changed variable bcpVars.siteURL to bcVars.sitehost
 * - Replaced bc-settings data attribute with a variable.
 * - Changed bcp to bc
 * - Changed dataOptions to userDefined
 *
 * 1.0.1
 * - Fixed a settings conflict when more than one plugin instance existed on a page. It was using the settings for the last plugin instance on the page. Now stores settings in a data attribute on the selector.
 *
 * Next changes:
 * 
 */

function UnSecure (selector,bc,userDefined) {
	defaults = { // define the defaults here if there are any. If not, still leave this variable here. It resets defaults from any previous use.

	};
	selector.data(bc.settingsAttr,$.extend({},bc,defaults,userDefined));
	var settings = selector.data(bc.settingsAttr);

	var secure = settings.siteurl.indexOf('worldsecuresystems'),links,href;

	if (secure > -1) {
		links = selector.find('a').not('[href^="mailto:"]').not('[href="/LogOutProcess.aspx"]');
		return links.each(function() {
			href = $(this).attr("href");
			if (href === undefined) {
				href = '';
			}
			if (href.indexOf('http') === -1 && href.indexOf('https') === -1 && href.indexOf('#') === -1) {
				if (href.indexOf('/') !== 0) {
					href = '/' + href;
				}
				href = 'http:'+settings.sitehost + href;
				$(this).attr('href', href);
			}
		});
	}
}

/*------------------------------------------*/
// End UnSecure()

/* **********************************************
     Begin dev-suffix.bcEngine.js
********************************************** */

		/*------------------------------------------*/
		/* End plugin modules						*/
		/*------------------------------------------*/

		// A function to determine wich functions get called, and to add in the options
		function processModule(functionName){
			obj = $(doc).find('[data-'+bc.dataPrefix+'-'+functionName.toLowerCase()+']');
			if (obj.length > 0){
				for (var a = 0; a<obj.length; a++) {
					userDefined = {},obj.cur = $(obj[a]);
					str = obj.cur.data(bc.dataPrefix+'-'+functionName.toLowerCase());
					if ($.type(str) === 'string' && str.indexOf(':') > -1) {
						if (str.indexOf(';') > -1) {
							str = str.split(';');
							for (var e=0;e<str.length;e++){
								arr = str[e].split(':');
								userDefined[$.trim(arr[0])] = GetOptionValue($.trim(arr.slice(1).join(':')));
							}
						}else {
							arr = str.split(':');
							userDefined[$.trim(arr[0])] = GetOptionValue($.trim(arr.slice(1).join(':')));
						}
					}
					functions[functionName](obj.cur,bc,userDefined);
				}
			}
			function GetOptionValue(valstr){
				switch(valstr.toLowerCase()){
					case 'true': return true;
					case 'false': return false;
					default: return valstr;
				}
			}
		}

		// Run the processModule function against each plugin function's data attribute requirement
		for (var i=0; i<module.length;i++) {
			processModule(module[i]);
		}
		return version;
	};
	$.bcEngine.defaults = {
		'dataPrefix'     : 'bc',
		'settingsAttr'   : 'settings',
		'modulesID'      : 'bcmodules',
		'pagenameAttr'   : 'pagename',
		'pageaddressAttr': 'pageaddress',
		'sitehostAttr'   : 'sitehost', // Always renders the non-secure domain
		'siteurlAttr'    : 'siteurl', // Always renders the url as entered
		'secureurlAttr'  : 'secureurl', // Always shows the secure url
		'securezoneAttr' : 'securezone',
		'loginstatusAttr': 'loginstatus'
	};
})(jQuery,window);

// run
$.bcEngine();