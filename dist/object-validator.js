"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var type_factory_1 = require("./type-factory");
var validation_result_1 = require("./validation-result");
var ruleset_validators_1 = require("./ruleset-validators");
var ObjectValidator = /** @class */ (function () {
    function ObjectValidator(model) {
        this._model = model;
        this._validationErrors = new Array();
        this._clonedModel = type_factory_1.TypeFactory.getTypeClone(model);
    }
    /* Deprecated after 1.1.0 */
    ObjectValidator.prototype.For = function (predicate, ruleSet) {
        var val = predicate(this._model);
        var validator = new RuleSetValidator(val, this._model, predicate);
        var errorResult = ruleSet(validator);
        this.addErrors(errorResult.Errors);
        return this;
    };
    ObjectValidator.prototype.ForDateProperty = function (predicate, ruleSet) {
        var val = predicate(this._model);
        var errorResult;
        errorResult = ruleSet(new ruleset_validators_1.DateRuleSetValidator(val, this._model, predicate));
        this.addErrors(errorResult.Errors);
        return this;
    };
    ObjectValidator.prototype.ForStringProperty = function (predicate, ruleSet) {
        var val = predicate(this._model);
        var errorResult;
        errorResult = ruleSet(new ruleset_validators_1.StringRuleSetValidator(val, this._model, predicate));
        this.addErrors(errorResult.Errors);
        return this;
    };
    ObjectValidator.prototype.ForNumberProperty = function (predicate, ruleSet) {
        var val = predicate(this._model);
        var errorResult;
        errorResult = ruleSet(new ruleset_validators_1.NumberRuleSetValidator(val, this._model, predicate));
        this.addErrors(errorResult.Errors);
        return this;
    };
    ObjectValidator.prototype.ForType = function (predicate, ruleSet) {
        var val = predicate(this._model);
        var validator = new ObjectValidator(val);
        var errorResult = ruleSet(validator);
        this.addErrors(errorResult.Errors);
        return this;
    };
    ObjectValidator.prototype.NotNull = function (predicate, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        var val = predicate(this._model);
        if (val == null) {
            this.processErrors(predicate, val, message, errorIdentifier);
        }
        return this;
    };
    ObjectValidator.prototype.IsNull = function (predicate, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        var val = predicate(this._model);
        if (val != null) {
            this.processErrors(predicate, val, message, errorIdentifier);
        }
        return this;
    };
    ObjectValidator.prototype.NotEmpty = function (predicate, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        var val = predicate(this._model);
        if (val.match(/^\s*$/) != null) {
            this.processErrors(predicate, val, message, errorIdentifier);
        }
        return this;
    };
    ObjectValidator.prototype.IsEmpty = function (predicate, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        var val = predicate(this._model);
        if (val.match(/^\s*$/) == null) {
            this.processErrors(predicate, val, message, errorIdentifier);
        }
        return this;
    };
    ObjectValidator.prototype.Length = function (predicate, lowerBound, upperBound, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        var val = predicate(this._model);
        if (!(val.length >= lowerBound && val.length <= upperBound)) {
            this.processErrors(predicate, val, message, errorIdentifier);
        }
        return this;
    };
    ObjectValidator.prototype.Matches = function (predicate, regex, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        var val = predicate(this._model);
        if (val.match(/^\s*$/) == null) {
            if (val.match(regex) == null) {
                this.processErrors(predicate, val, message, errorIdentifier);
            }
        }
        return this;
    };
    ObjectValidator.prototype.NotMatches = function (predicate, regex, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        var val = predicate(this._model);
        if (val.match(/^\s*$/) == null) {
            if (val.match(regex) != null) {
                this.processErrors(predicate, val, message, errorIdentifier);
            }
        }
        return this;
    };
    ObjectValidator.prototype.CreditCard = function (predicate, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        var val = predicate(this._model);
        if ((!this.luhnAlgorithm(val.toString())) || (val.toString().match(/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/) == null)) {
            this.processErrors(predicate, val, message, errorIdentifier);
        }
        return this;
    };
    ObjectValidator.prototype.IsCreditCard = function (predicate, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        var val = predicate(this._model);
        if ((!this.luhnAlgorithm(val)) || (val.toString().match(/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/) == null)) {
            this.processErrors(predicate, val, message, errorIdentifier);
        }
        return this;
    };
    ObjectValidator.prototype.Email = function (predicate, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        var val = predicate(this._model);
        if (val.toString().match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/) == null) {
            this.processErrors(predicate, val, message, errorIdentifier);
        }
        return this;
    };
    ObjectValidator.prototype.If = function (predicate, then) {
        if (predicate(this._model)) {
            var errorResult = then(new ObjectValidator(this._model));
            this.addErrors(errorResult.Errors);
        }
        return this;
    };
    ObjectValidator.prototype.ForEach = function (predicate, action) {
        var _this = this;
        var array = predicate(this._model);
        if (array != null && array.length > 0) {
            array.forEach(function (item) { return _this.addErrors(action(new ObjectValidator(item)).Errors); });
        }
        return this;
    };
    ObjectValidator.prototype.IsLowercase = function (predicate, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        var val = predicate(this._model);
        if (val.match(/^\s*$/) == null) {
            if (val.match(/^[a-z]+$/) == null) {
                this.processErrors(predicate, val, message, errorIdentifier);
            }
        }
        return this;
    };
    ObjectValidator.prototype.IsUppercase = function (predicate, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        var val = predicate(this._model);
        if (val.match(/^\s*$/) == null) {
            if (val.match(/^[A-Z]+$/) == null) {
                this.processErrors(predicate, val, message, errorIdentifier);
            }
        }
        return this;
    };
    ObjectValidator.prototype.IsMixedcase = function (predicate, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        var val = predicate(this._model);
        if (val.match(/^\s*$/) == null) {
            if (val.match(/^(?=.*?[a-z])(?=.*?[A-Z])[a-zA-Z]+$/) == null) {
                this.processErrors(predicate, val, message, errorIdentifier);
            }
        }
        return this;
    };
    ObjectValidator.prototype.Contains = function (predicate, subString, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        var val = predicate(this._model);
        if (val.match(/^\s*$/) == null) {
            if (val.indexOf(subString) < 0) {
                this.processErrors(predicate, val, message, errorIdentifier);
            }
        }
        return this;
    };
    ObjectValidator.prototype.IsNumeric = function (predicate, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        var val = predicate(this._model);
        if (val.match(/^\s*$/) == null) {
            if (val.match(/^\d+$/) == null) {
                this.processErrors(predicate, val, message, errorIdentifier);
            }
        }
        return this;
    };
    ObjectValidator.prototype.IsAlpha = function (predicate, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        var val = predicate(this._model);
        if (val.match(/^\s*$/) == null) {
            if (val.match(/^[a-zA-Z]+$/) == null) {
                this.processErrors(predicate, val, message, errorIdentifier);
            }
        }
        return this;
    };
    ObjectValidator.prototype.IsAlphaNumeric = function (predicate, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        var val = predicate(this._model);
        if (val.match(/^\s*$/) == null) {
            if (val.match(/^(?=.*?[a-zA-Z])(?=.*?\d)[a-zA-Z0-9]+$/) == null) {
                this.processErrors(predicate, val, message, errorIdentifier);
            }
        }
        return this;
    };
    ObjectValidator.prototype.IsGuid = function (predicate, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        var val = predicate(this._model);
        if (val.match(/^\s*$/) == null) {
            if (val.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i) == null) {
                this.processErrors(predicate, val, message, errorIdentifier);
            }
        }
        return this;
    };
    ObjectValidator.prototype.IsBase64 = function (predicate, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        var val = predicate(this._model);
        if (val.match(/^\s*$/) == null) {
            if (val.match(/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/i) == null) {
                this.processErrors(predicate, val, message, errorIdentifier);
            }
        }
        return this;
    };
    ObjectValidator.prototype.IsUrl = function (predicate, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        var val = predicate(this._model);
        if (val.match(/^\s*$/) == null) {
            if (val.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/) == null) {
                this.processErrors(predicate, val, message, errorIdentifier);
            }
        }
        return this;
    };
    ObjectValidator.prototype.IsCountryCode = function (predicate, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        var val = predicate(this._model);
        if (val.match(/^\s*$/) == null) {
            if (val.match(/^(AF|AX|AL|DZ|AS|AD|AO|AI|AQ|AG|AR|AM|AW|AU|AT|AZ|BS|BH|BD|BB|BY|BE|BZ|BJ|BM|BT|BO|BQ|BA|BW|BV|BR|IO|BN|BG|BF|BI|KH|CM|CA|CV|KY|CF|TD|CL|CN|CX|CC|CO|KM|CG|CD|CK|CR|CI|HR|CU|CW|CY|CZ|DK|DJ|DM|DO|EC|EG|SV|GQ|ER|EE|ET|FK|FO|FJ|FI|FR|GF|PF|TF|GA|GM|GE|DE|GH|GI|GR|GL|GD|GP|GU|GT|GG|GN|GW|GY|HT|HM|VA|HN|HK|HU|IS|IN|ID|IR|IQ|IE|IM|IL|IT|JM|JP|JE|JO|KZ|KE|KI|KP|KR|KW|KG|LA|LV|LB|LS|LR|LY|LI|LT|LU|MO|MK|MG|MW|MY|MV|ML|MT|MH|MQ|MR|MU|YT|MX|FM|MD|MC|MN|ME|MS|MA|MZ|MM|NA|NR|NP|NL|NC|NZ|NI|NE|NG|NU|NF|MP|NO|OM|PK|PW|PS|PA|PG|PY|PE|PH|PN|PL|PT|PR|QA|RE|RO|RU|RW|BL|SH|KN|LC|MF|PM|VC|WS|SM|ST|SA|SN|RS|SC|SL|SG|SX|SK|SI|SB|SO|ZA|GS|SS|ES|LK|SD|SR|SJ|SZ|SE|CH|SY|TW|TJ|TZ|TH|TL|TG|TK|TO|TT|TN|TR|TM|TC|TV|UG|UA|AE|GB|US|UM|UY|UZ|VU|VE|VN|VG|VI|WF|EH|YE|ZM|ZW)$/) == null) {
                this.processErrors(predicate, val, message, errorIdentifier);
            }
        }
        return this;
    };
    ObjectValidator.prototype.IsDateOn = function (predicate, date, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        date.setHours(0, 0, 0, 0);
        var val = predicate(this._model);
        val.setHours(0, 0, 0, 0);
        if ((val != null) && !(val.getFullYear() == date.getFullYear() && val.getMonth() == date.getMonth() && val.getDate() == date.getDate())) {
            this.processErrors(predicate, val, message, errorIdentifier);
        }
        return this;
    };
    ObjectValidator.prototype.IsDateAfter = function (predicate, date, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        date.setHours(0, 0, 0, 0);
        var val = predicate(this._model);
        val.setHours(0, 0, 0, 0);
        if ((val != null) && (val <= date)) {
            this.processErrors(predicate, val, message, errorIdentifier);
        }
        return this;
    };
    ObjectValidator.prototype.IsDateOnOrAfter = function (predicate, date, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        date.setHours(0, 0, 0, 0);
        var val = predicate(this._model);
        val.setHours(0, 0, 0, 0);
        if ((val != null) && (val < date)) {
            this.processErrors(predicate, val, message, errorIdentifier);
        }
        return this;
    };
    ObjectValidator.prototype.IsDateBefore = function (predicate, date, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        date.setHours(0, 0, 0, 0);
        var val = predicate(this._model);
        val.setHours(0, 0, 0, 0);
        if ((val != null) && (val >= date)) {
            this.processErrors(predicate, val, message, errorIdentifier);
        }
        return this;
    };
    ObjectValidator.prototype.IsDateOnOrBefore = function (predicate, date, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        date.setHours(0, 0, 0, 0);
        var val = predicate(this._model);
        val.setHours(0, 0, 0, 0);
        if (val > date) {
            this.processErrors(predicate, val, message, errorIdentifier);
        }
        return this;
    };
    ObjectValidator.prototype.IsDateBetween = function (predicate, startDate, endDate, inclusive, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);
        var val = predicate(this._model);
        val.setHours(0, 0, 0, 0);
        if (!(inclusive ? startDate <= val && val <= endDate : startDate < val && val < endDate)) {
            this.processErrors(predicate, val, message, errorIdentifier);
        }
        return this;
    };
    ObjectValidator.prototype.IsDateLeapYear = function (predicate, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        var val = predicate(this._model);
        val.setHours(0, 0, 0, 0);
        var year = val.getFullYear();
        if (!(!((year % 4) || (!(year % 100) && year % 400)))) {
            this.processErrors(predicate, val, message, errorIdentifier);
        }
        return this;
    };
    ObjectValidator.prototype.IsNumberEqual = function (predicate, number, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        var val = predicate(this._model);
        if (val != number) {
            this.processErrors(predicate, val, message, errorIdentifier);
        }
        return this;
    };
    ObjectValidator.prototype.IsNumberNotEqual = function (predicate, number, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        var val = predicate(this._model);
        if (val == number) {
            this.processErrors(predicate, val, message, errorIdentifier);
        }
        return this;
    };
    ObjectValidator.prototype.IsNumberLessThan = function (predicate, number, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        var val = predicate(this._model);
        if (val >= number) {
            this.processErrors(predicate, val, message, errorIdentifier);
        }
        return this;
    };
    ObjectValidator.prototype.IsNumberLessThanOrEqual = function (predicate, number, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        var val = predicate(this._model);
        if (val > number) {
            this.processErrors(predicate, val, message, errorIdentifier);
        }
        return this;
    };
    ObjectValidator.prototype.IsNumberGreaterThan = function (predicate, number, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        var val = predicate(this._model);
        if (val <= number) {
            this.processErrors(predicate, val, message, errorIdentifier);
        }
        return this;
    };
    ObjectValidator.prototype.IsNumberGreaterThanOrEqual = function (predicate, number, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        var val = predicate(this._model);
        if (val < number) {
            this.processErrors(predicate, val, message, errorIdentifier);
        }
        return this;
    };
    ObjectValidator.prototype.Required = function (predicate, must, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        var val = predicate(this._model);
        if (val == null || !must(this._model, val)) {
            this.processErrors(predicate, val, message, errorIdentifier);
        }
        return this;
    };
    ObjectValidator.prototype.getPropertyName = function (expression) {
        try {
            return expression(this._clonedModel)();
        }
        catch (ex) {
            return "";
        }
    };
    ObjectValidator.prototype.addErrors = function (errors) {
        var _this = this;
        if (errors != null && errors.length > 0) {
            errors.forEach(function (e) { return _this._validationErrors.push(e); });
        }
    };
    ObjectValidator.prototype.processErrors = function (predicate, val, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        if (errorIdentifier == null) {
            this._validationErrors.push(new validation_result_1.ValidationError(this.getPropertyName(predicate), val, message));
        }
        else {
            this._validationErrors.push(new validation_result_1.ValidationError(errorIdentifier, val, message));
        }
    };
    ObjectValidator.prototype.luhnAlgorithm = function (cc) {
        cc = cc.replace(' ', '');
        var sum = 0;
        var doubleUp = false;
        /* from the right to left, double every other digit starting with the second to last digit.*/
        for (var i = cc.length - 1; i >= 0; i--) {
            var curDigit = parseInt(cc.charAt(i));
            /* double every other digit starting with the second to last digit */
            if (doubleUp) {
                /* doubled number is greater than 9 than subtracted 9 */
                if ((curDigit * 2) > 9) {
                    sum += (curDigit * 2) - 9;
                }
                else {
                    sum += curDigit * 2;
                }
            }
            else {
                sum += curDigit;
            }
            var doubleUp = !doubleUp;
        }
        /* sum and divide it by 10. If the remainder equals zero, the original credit card number is valid.  */
        return (sum % 10) == 0;
    };
    ObjectValidator.prototype.ToResult = function () {
        return new validation_result_1.ValidationResult(this._validationErrors);
    };
    return ObjectValidator;
}());
exports.ObjectValidator = ObjectValidator;
/* Deprecated after 1.1.0 */
var RuleSetValidator = /** @class */ (function () {
    function RuleSetValidator(property, model, predicate) {
        this._model = model;
        this._predicate = predicate;
        this._property = property;
        this._validationErrors = new Array();
        this._clonedModel = type_factory_1.TypeFactory.getTypeClone(this._model);
    }
    RuleSetValidator.prototype.NotNull = function (message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        if (this._property == null) {
            this.processErrors(this._property, message, errorIdentifier);
        }
        return this;
    };
    RuleSetValidator.prototype.IsNull = function (message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        if (this._property != null) {
            this.processErrors(this._property, message, errorIdentifier);
        }
        return this;
    };
    RuleSetValidator.prototype.NotEmpty = function (message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        if (this._property.toString().match(/^\s*$/) != null) {
            this.processErrors(this._property.toString(), message, errorIdentifier);
        }
        return this;
    };
    RuleSetValidator.prototype.IsEmpty = function (message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        if (this._property.toString().match(/^\s*$/) == null) {
            this.processErrors(this._property.toString(), message, errorIdentifier);
        }
        return this;
    };
    RuleSetValidator.prototype.Length = function (lowerBound, upperBound, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        if (!(this._property.toString().length >= lowerBound && this._property.toString().length <= upperBound)) {
            this.processErrors(this._property.toString(), message, errorIdentifier);
        }
        return this;
    };
    RuleSetValidator.prototype.Matches = function (regex, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        if (this._property.toString().match(/^\s*$/) == null) {
            if (this._property.toString().match(regex) == null) {
                this.processErrors(this._property.toString(), message, errorIdentifier);
            }
        }
        return this;
    };
    RuleSetValidator.prototype.NotMatches = function (regex, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        if (this._property.toString().match(/^\s*$/) == null) {
            if (this._property.toString().match(regex) != null) {
                this.processErrors(this._property.toString(), message, errorIdentifier);
            }
        }
        return this;
    };
    RuleSetValidator.prototype.CreditCard = function (message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        if (this._property.toString().match(/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/) == null) {
            this.processErrors(this._property, message, errorIdentifier);
        }
        return this;
    };
    RuleSetValidator.prototype.Email = function (message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        if (this._property.toString().match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/) == null) {
            this.processErrors(this._property, message, errorIdentifier);
        }
        return this;
    };
    RuleSetValidator.prototype.IsLowercase = function (message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        if (this._property.toString().match(/^\s*$/) == null) {
            if (this._property.toString().match(/^[a-z]+$/) == null) {
                this.processErrors(this._property.toString(), message, errorIdentifier);
            }
        }
        return this;
    };
    RuleSetValidator.prototype.IsUppercase = function (message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        if (this._property.toString().match(/^\s*$/) == null) {
            if (this._property.toString().match(/^[A-Z]+$/) == null) {
                this.processErrors(this._property.toString(), message, errorIdentifier);
            }
        }
        return this;
    };
    RuleSetValidator.prototype.IsMixedcase = function (message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        if (this._property.toString().match(/^\s*$/) == null) {
            if (this._property.toString().match(/^(?=.*?[a-z])(?=.*?[A-Z])[a-zA-Z]+$/) == null) {
                this.processErrors(this._property.toString(), message, errorIdentifier);
            }
        }
        return this;
    };
    RuleSetValidator.prototype.IsNumeric = function (message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        if (this._property.toString().match(/^\s*$/) == null) {
            if (this._property.toString().match(/^\d+$/) == null) {
                this.processErrors(this._property.toString(), message, errorIdentifier);
            }
        }
        return this;
    };
    RuleSetValidator.prototype.IsAlpha = function (message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        if (this._property.toString().match(/^\s*$/) == null) {
            if (this._property.toString().match(/^[a-zA-Z]+$/) == null) {
                this.processErrors(this._property.toString(), message, errorIdentifier);
            }
        }
        return this;
    };
    RuleSetValidator.prototype.IsAlphaNumeric = function (message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        if (this._property.toString().match(/^\s*$/) == null) {
            if (this._property.toString().match(/^(?=.*?[a-zA-Z])(?=.*?\d)[a-zA-Z0-9]+$/) == null) {
                this.processErrors(this._property.toString(), message, errorIdentifier);
            }
        }
        return this;
    };
    RuleSetValidator.prototype.IsGuid = function (message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        if (this._property.toString().match(/^\s*$/) == null) {
            if (this._property.toString().match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i) == null) {
                this.processErrors(this._property.toString(), message, errorIdentifier);
            }
        }
        return this;
    };
    RuleSetValidator.prototype.IsBase64 = function (message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        if (this._property.toString().match(/^\s*$/) == null) {
            if (this._property.toString().match(/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/i) == null) {
                this.processErrors(this._property.toString(), message, errorIdentifier);
            }
        }
        return this;
    };
    RuleSetValidator.prototype.IsUrl = function (message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        if (this._property.toString().match(/^\s*$/) == null) {
            if (this._property.toString().match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/) == null) {
                this.processErrors(this._property.toString(), message, errorIdentifier);
            }
        }
        return this;
    };
    RuleSetValidator.prototype.IsCountryCode = function (message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        if (this._property.toString().match(/^\s*$/) == null) {
            if (this._property.toString().match(/^(AF|AX|AL|DZ|AS|AD|AO|AI|AQ|AG|AR|AM|AW|AU|AT|AZ|BS|BH|BD|BB|BY|BE|BZ|BJ|BM|BT|BO|BQ|BA|BW|BV|BR|IO|BN|BG|BF|BI|KH|CM|CA|CV|KY|CF|TD|CL|CN|CX|CC|CO|KM|CG|CD|CK|CR|CI|HR|CU|CW|CY|CZ|DK|DJ|DM|DO|EC|EG|SV|GQ|ER|EE|ET|FK|FO|FJ|FI|FR|GF|PF|TF|GA|GM|GE|DE|GH|GI|GR|GL|GD|GP|GU|GT|GG|GN|GW|GY|HT|HM|VA|HN|HK|HU|IS|IN|ID|IR|IQ|IE|IM|IL|IT|JM|JP|JE|JO|KZ|KE|KI|KP|KR|KW|KG|LA|LV|LB|LS|LR|LY|LI|LT|LU|MO|MK|MG|MW|MY|MV|ML|MT|MH|MQ|MR|MU|YT|MX|FM|MD|MC|MN|ME|MS|MA|MZ|MM|NA|NR|NP|NL|NC|NZ|NI|NE|NG|NU|NF|MP|NO|OM|PK|PW|PS|PA|PG|PY|PE|PH|PN|PL|PT|PR|QA|RE|RO|RU|RW|BL|SH|KN|LC|MF|PM|VC|WS|SM|ST|SA|SN|RS|SC|SL|SG|SX|SK|SI|SB|SO|ZA|GS|SS|ES|LK|SD|SR|SJ|SZ|SE|CH|SY|TW|TJ|TZ|TH|TL|TG|TK|TO|TT|TN|TR|TM|TC|TV|UG|UA|AE|GB|US|UM|UY|UZ|VU|VE|VN|VG|VI|WF|EH|YE|ZM|ZW)$/) == null) {
                this.processErrors(this._property.toString(), message, errorIdentifier);
            }
        }
        return this;
    };
    RuleSetValidator.prototype.Contains = function (subString, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        if (this._property.toString().match(/^\s*$/) == null) {
            if (this._property.toString().indexOf(subString) < 0) {
                this.processErrors(this._property.toString(), message, errorIdentifier);
            }
        }
        return this;
    };
    RuleSetValidator.prototype.Required = function (must, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        if (this._property == null || !must(this._model, this._property)) {
            this.processErrors(this._property, message, errorIdentifier);
        }
        return this;
    };
    RuleSetValidator.prototype.ToResult = function () {
        return new validation_result_1.ValidationResult(this._validationErrors);
    };
    RuleSetValidator.prototype.processErrors = function (val, message, errorIdentifier) {
        if (errorIdentifier === void 0) { errorIdentifier = null; }
        if (errorIdentifier == null) {
            this._validationErrors.push(new validation_result_1.ValidationError(this.getPropertyName(this._predicate), val, message));
        }
        else {
            this._validationErrors.push(new validation_result_1.ValidationError(errorIdentifier, val, message));
        }
    };
    RuleSetValidator.prototype.getPropertyName = function (expression) {
        try {
            return expression(this._clonedModel)();
        }
        catch (ex) {
            return "";
        }
    };
    return RuleSetValidator;
}());
