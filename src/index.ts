import { Person, SimulationOptions, SimulationEvent, Gene, Food } from './types';
import Grid from './GridManager';
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
    protected tick: number;
    protected events: {
        [key: string]: Function
    }

    constructor(options: SimulationOptions) {
        this.tick = 0;
        this.population = [];
        this.genes = options.genes || [];
        this.events = {}
        if (options.startPopulation) {
            this.population = Array.from({ length: options.startPopulation }, (_v, i): Person => new Person(i, this.genes));
        }
        this.grid = new Grid(options.gridSize || 30);
        this.tickStep = 1000 || options.time;
        return this;
    }
    /**
     * Begins the simulation. This will run until the `stop` method is called.
     * @returns {Simulation}
     */
    begin(): Simulation {
        this.nextGen()
        this.genInterval = setInterval(() => this.nextGen(), this.tickStep)
        return this;
    }
    /**
     * Stops the simulation.
     */
    stop(): Simulation {
        clearInterval(this.genInterval);
        return this
    }
    /**
     * Gets the current grid status.
     */
    getGrid(): Grid {
        return this.grid;
    }
    protected nextGen(): void {
        let { dispatchEvent, grid, population } = this;
        this.tick++;
        dispatchEvent('tick', this.tick);
        grid.init()
        let births = 0, deaths = 0
        population.forEach(person => {
            // Get random coordinates per person
            let xy = [Math.floor(Math.random() * this.grid.size), Math.floor(Math.random() * this.grid.size)];
            
            return
        })
    }
    /**
     * Add an event listener.
     * @param event The event to listen for. Valid events are `birth`, `death`, `age`, `tick`, and `gift`.
     * @param callback The callback to execute when the event is triggered.
     */
    addListener = (event: SimulationEvent, callback: Function) => { this.events[event] = callback; return this; };
    private dispatchEvent = (event: SimulationEvent, data: any): void => this.events[event] ? this.events[event](data) : false;
}
