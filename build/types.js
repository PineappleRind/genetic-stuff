"use strict";
exports.__esModule = true;
exports.Person = exports.Food = void 0;
var Food = /** @class */ (function () {
    function Food(_a) {
        var x = _a[0], y = _a[1];
        this.type = 'food';
        this.location = {
            x: x,
            y: y
        };
        return this;
    }
    return Food;
}());
exports.Food = Food;
var Person = /** @class */ (function () {
    function Person(id, genes) {
        this.type = 'person';
        this.id = id;
        this.genes = genes || [];
    }
    return Person;
}());
exports.Person = Person;
