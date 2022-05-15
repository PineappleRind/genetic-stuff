var Simulation = /** @class */ (function () {
    function Simulation(options) {
        this.population = [];
        this.foodQueue = [];
        this.tick = 0;
        this.population = [];
        this.time = 1000 || options.time;
    }
    Simulation.prototype.begin = function () {
        setInterval(function () {
            this.update();
        }, this.time);
    };
    Simulation.prototype.addListener = function (event, callback) {
        this.events[event] = callback;
    };
    Simulation.prototype.update = function () {
        var _this = this;
        this.tick++;
        this.population.forEach(function (person) {
            person.age++;
            person.stats.hunger++;
            if (person.age >= 100) {
                _this.population.splice(_this.population.indexOf(person), 1);
            }
            _this.foodQueue.push(person);
        });
    };
    return Simulation;
}());
var sim = new Simulation({
    time: 1000,
    genes: [
        {
            name: 'generous',
            values: {
                giving: 0.5
            }
        }
    ]
});
sim.begin();
