"use strict";
exports.__esModule = true;
var types_1 = require("../types");
var FoodManager = /** @class */ (function () {
    function FoodManager() {
    }
    FoodManager.prototype.addFood = function (grid, amount) {
        amount = amount || 1;
        for (var i = 0; i < grid.size; i++) {
            for (var x = 0; x < grid.size; x++) {
                var coords = [i, x];
                grid.set(coords, new types_1.Food(coords));
                grid.set(coords, new types_1.Food(coords));
            }
        }
        return grid;
    };
    FoodManager.prototype.clearFood = function (grid) {
        grid.grid.forEach(function (row, x) {
            row.forEach(function (col, y) {
                col.forEach(function (v) {
                    if (v instanceof types_1.Food)
                        grid.remove([x, y], v);
                });
            });
        });
        return grid;
    };
    FoodManager.prototype.removeAllFrom = function (grid, _a) {
        var x = _a[0], y = _a[1];
        grid.grid[x][y].forEach(function (v) {
            if (v.type === 'food')
                grid = grid.remove([x, y], v);
        });
        return grid;
    };
    return FoodManager;
}());
exports["default"] = FoodManager;
