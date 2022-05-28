"use strict";
exports.__esModule = true;
var types_1 = require("../types");
var food_1 = require("../helpers/food");
var grid_1 = require("../helpers/grid");
/**
 * @param {SimulationOptions} options
 * @returns {Simulation}
 */
var Simulation = /** @class */ (function () {
    function Simulation(options) {
        var _this = this;
        this.population = [];
        this.genes = [];
        /**
         * Add an event listener.
         * @param event The event to listen for. Valid events are `birth`, `death`, `age`, `tick`, and `gift`.
         * @param callback The callback to execute when the event is triggered.
         */
        this.addListener = function (event, callback) { _this.events[event] = callback; return _this; };
        this.dispatchEvent = function (event, data) { return _this.events[event] ? _this.events[event](data) : false; };
        this.tick = 0;
        this.population = [];
        this.genes = options.genes || [];
        this.events = {};
        if (options.startPopulation) {
            this.population = Array.from({ length: options.startPopulation }, function (_v, i) { return new types_1.Person(i, _this.genes); });
        }
        this.grid = new grid_1["default"](options.gridSize || 100);
        this.food = new food_1["default"]();
        this.tickStep = 1000 || options.time;
        return this;
    }
    /**
     * Begins the simulation. This will run until the `stop` method is called.
     * @returns {Simulation}
     */
    Simulation.prototype.begin = function () {
        var _this = this;
        this.nextGen();
        this.genInterval = setInterval(function () { return _this.nextGen(); }, this.tickStep);
        return this;
    };
    /**
     * Stops the simulation.
     */
    Simulation.prototype.stop = function () {
        clearInterval(this.genInterval);
        return this;
    };
    /**
     * Gets the current grid status.
     */
    Simulation.prototype.getGrid = function () {
        return this.grid;
    };
    Simulation.prototype.nextGen = function () {
        var _this = this;
        var _a = this, dispatchEvent = _a.dispatchEvent, food = _a.food, grid = _a.grid, population = _a.population;
        this.tick++;
        dispatchEvent('tick', this.tick);
        grid = food.addFood(food.clearFood(grid), population.length);
        var births = 0, deaths = 0;
        population.forEach(function (person) {
            var randomCoords = [Math.floor(Math.random() * _this.grid.size), Math.floor(Math.random() * _this.grid.size)];
            if (grid.countPeople(randomCoords) > 0)
                return;
            grid.set(randomCoords, person);
            console.log(grid[randomCoords[0], randomCoords[1]]);
            dispatchEvent('move', { coords: randomCoords, person: person });
            var foodIntake = grid.consumeFood(randomCoords, person);
            dispatchEvent('food', foodIntake);
            grid = food.removeAllFrom(grid, randomCoords);
            if (foodIntake === 2) {
                var newPerson = new types_1.Person(population.length, person.genes);
                _this.population.push(newPerson);
                dispatchEvent('population', { population: _this.population.length });
                dispatchEvent('birth', { births: births++ });
            }
            else if (foodIntake === 0) {
                _this.population.splice(_this.population.indexOf(person), 1);
                dispatchEvent('population', { population: _this.population.length });
                dispatchEvent('death', { deaths: deaths++ });
            }
            return;
        });
        grid = grid.removeAllPeople();
    };
    return Simulation;
}());
exports["default"] = Simulation;
