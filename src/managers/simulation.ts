import { Person, SimulationOptions, SimulationEvent, Gene } from '../types';
import FoodManager from '../helpers/food';
import Grid from '../helpers/grid';
/**
 * @param {SimulationOptions} options
 * @returns {Simulation}
 */
export default class Simulation {
    tickStep: number;
    population: Person[] = [];
    genes: Gene[] = []
    private genInterval: any;
    protected grid: Grid;
    protected food: FoodManager;
    protected tick: number;
    protected events: {
        [key: string]: Function
    }

    constructor(options: SimulationOptions) {
        this.tick = 0;
        this.population = [];
        this.genes = options.genes || [];
        if (options.startPopulation) {
            this.population = Array.from({ length: options.startPopulation }, (_v, i): Person => new Person(i, this.genes));
        }
        this.grid = new Grid(options.gridSize || 100);
        this.food = new FoodManager();
        this.tickStep = 1000 || options.time;
        return this;
    }
    /**
     * Begins the simulation. This will run until the `stop` method is called.
     * @returns {Simulation}
     */
    begin(): Simulation {
        this.genInterval = setInterval(function () {
            this.nextGen();
        }, this.tickStep)
        return this;
    }
    /**
     * Stops the simulation.
     */
    stop(): Simulation {
        clearInterval(this.genInterval);
        return this
    }
    protected nextGen(): void {
        let { tick, dispatchEvent, food, grid, population } = this;
        tick++;
        dispatchEvent('tick', this.tick);
        food.clearFood().addFood(grid, 
            (population.length - 2) < 0 ? 0 : population.length - 2
        );
        population.forEach(person => {
            let randomCoords = [Math.floor(Math.random() * this.grid.size), Math.floor(Math.random() * this.grid.size)];
            if (grid.countPeople(randomCoords) > 0) return;
            grid.set(randomCoords, person);
        })
    }
    /**
     * Add an event listener.
     * @param event The event to listen for. Valid events are `birth`, `death`, `age`, `tick`, and `gift`.
     * @param callback The callback to execute when the event is triggered.
     */
    addListener = (event: SimulationEvent, callback: Function) => this.events[event] = callback;
    private dispatchEvent = (event: SimulationEvent, data: number): void => this.events[event] ? this.events[event](data) : false;
}
const sim = new Simulation({
    time: 1000,
    genes: [
        {
            name: 'generous',
            values: {
                giving: 0.5
            }
        }
    ],
    startPopulation: 2
});

sim.begin();