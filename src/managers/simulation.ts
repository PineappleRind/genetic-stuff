import { Person, SimulationOptions, SimulationEvent, Gene, Food } from '../types';
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
        this.events = {}
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
    protected nextGen(): void {
        let { dispatchEvent, food, grid, population } = this;
        this.tick++;
        dispatchEvent('tick', this.tick);
        grid = food.addFood(food.clearFood(grid), population.length);
        let births = 0, deaths = 0
        population.forEach(person => {
            let randomCoords = [Math.floor(Math.random() * this.grid.size), Math.floor(Math.random() * this.grid.size)];
            if (grid.countPeople(randomCoords) > 0) return;
            grid.set(randomCoords, person);
            console.log(grid[randomCoords[0], randomCoords[1]]);
            dispatchEvent('move', { coords: randomCoords, person: person });
            const foodIntake = grid.consumeFood(randomCoords, person);
            dispatchEvent('food', foodIntake);
            grid = food.removeAllFrom(grid, randomCoords);
            if (foodIntake === 2) {
                const newPerson = new Person(population.length, person.genes);
                this.population.push(newPerson);
                dispatchEvent('population', { population: this.population.length });
                dispatchEvent('birth', {births: births++});
            } else if (foodIntake === 0) {
                this.population.splice(this.population.indexOf(person), 1);
                dispatchEvent('population', { population: this.population.length });
                dispatchEvent('death', {deaths: deaths++});
            }
            return
        })
        grid = grid.removeAllPeople()
    }
    /**
     * Add an event listener.
     * @param event The event to listen for. Valid events are `birth`, `death`, `age`, `tick`, and `gift`.
     * @param callback The callback to execute when the event is triggered.
     */
    addListener = (event: SimulationEvent, callback: Function) => { this.events[event] = callback; return this; };
    private dispatchEvent = (event: SimulationEvent, data: any): void => this.events[event] ? this.events[event](data) : false;
}
