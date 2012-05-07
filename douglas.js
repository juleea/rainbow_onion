/* Borrowed from Douglas Crockford */

Object.prototype.begetObject = function () {
    function F() {}
    F.prototype = this;
    return new F();
};