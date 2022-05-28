class Person {
    constructor(id, genes) {
        this.type = 'person';
        this.id = id;
        this.genes = genes || [];
    }
}

class Grid {
    constructor(size) {
        this.add = ([x, y], amt) => {
            this.data[x][y] += (amt || 1);
            return this;
        };
        this.remove = ([x, y], amt) => {
            this.data[x][y] -= (amt || 1);
            return this;
        };
        this.get = ([x, y]) => {
            return this.data[x][y];
        };
        this.init = () => {
            return Array.from(Array(this.size), () => Array(this.size).fill(0));
        };
        this.size = size;
        this.data = this.init();
    }
}

/**
 * @param {SimulationOptions} options
 * @returns {Simulation}
 */
class Simulation {
    constructor(options) {
        this.population = [];
        this.genes = [];
        /**
         * Add an event listener.
         * @param event The event to listen for. Valid events are `birth`, `death`, `age`, `tick`, and `gift`.
         * @param callback The callback to execute when the event is triggered.
         */
        this.addListener = (event, callback) => { this.events[event] = callback; return this; };
        this.dispatchEvent = (event, data) => this.events[event] ? this.events[event](data) : false;
        this.tick = 0;
        this.population = [];
        this.genes = options.genes || [];
        this.events = {};
        if (options.startPopulation) {
            this.population = Array.from({ length: options.startPopulation }, (_v, i) => new Person(i, this.genes));
        }
        this.grid = new Grid(options.gridSize || 30);
        this.tickStep = 1000 ;
        return this;
    }
    /**
     * Begins the simulation. This will run until the `stop` method is called.
     * @returns {Simulation}
     */
    begin() {
        this.nextGen();
        this.genInterval = setInterval(() => this.nextGen(), this.tickStep);
        return this;
    }
    /**
     * Stops the simulation.
     */
    stop() {
        clearInterval(this.genInterval);
        return this;
    }
    /**
     * Gets the current grid status.
     */
    getGrid() {
        return this.grid;
    }
    nextGen() {
        let { dispatchEvent, grid, population } = this;
        this.tick++;
        dispatchEvent('tick', this.tick);
        grid.init();
        population.forEach(person => {
            // Get random coordinates per person
            [Math.floor(Math.random() * this.grid.size), Math.floor(Math.random() * this.grid.size)];
            return;
        });
    }
}
