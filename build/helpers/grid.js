"use strict";
exports.__esModule = true;
var types_1 = require("../types");
var Grid = /** @class */ (function () {
    function Grid(size) {
        var _this = this;
        this.set = function (_a, value) {
            var x = _a[0], y = _a[1];
            _this.grid[x][y].push(value);
            return _this;
        };
        this.remove = function (_a, value) {
            var x = _a[0], y = _a[1];
            _this.grid[x][y] = _this.grid[x][y].filter(function (v) { return v !== value; });
            return _this;
        };
        this.get = function (_a) {
            var x = _a[0], y = _a[1];
            return _this.grid[x][y];
        };
        this.countFood = function (_a) {
            var x = _a[0], y = _a[1];
            return _this.grid[x][y].filter(function (v) { return v.type === 'food'; }).length;
        };
        this.countPeople = function (_a) {
            var x = _a[0], y = _a[1];
            return _this.grid[x][y].filter(function (v) { return v.type === 'person'; }).length;
        };
        this.consumeFood = function (_a, person) {
            var x = _a[0], y = _a[1];
            var food = _this.countFood([x, y]);
            console.log('There is ' + food + ' food at ' + x + ',' + y);
            if (food === 0)
                return 0;
            _this.grid[x][y] = _this.grid[x][y].filter(function (v) { return v !== food[0]; });
            return food;
        };
        this.removeAllPeople = function () {
            _this.grid.forEach(function (row, x) {
                row.forEach(function (col, y) {
                    col.forEach(function (v) {
                        if (v instanceof types_1.Person)
                            _this.remove([x, y], v);
                    });
                });
            });
            return _this;
        };
        this.size = size;
        this.grid = Array.from(Array(size), function () { return Array(size).fill([]); });
    }
    return Grid;
}());
exports["default"] = Grid;
