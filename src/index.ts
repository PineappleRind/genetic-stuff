interface SimulationOptions {
    time: number;
    genes: Gene[];
}
interface Gene {
    name: string;
    values: {
        [key: string]: number;
    };
}
interface Person {
    id: number;
    age: number;
    stats: {
        hunger: number;
    }
}
type SimulationEvent = 'gift' | 'birth' | 'death' | 'age' | 'tick';
class Simulation {
    tick: number;
    time: number;
    population: Person[] = [];
    foodQueue: Person[] = [];
    events: {
        [key: string]: Function
    }
    constructor(options: SimulationOptions) {
        this.tick = 0;
        this.population = [];
        this.time = 1000 || options.time;
    }
    begin() {
        setInterval(function () {
            this.update();
        }, this.time)
    }
    addListener(event: SimulationEvent, callback: Function) {
        this.events[event] = callback;
    }
    update() {
        this.tick++;
        this.population.forEach(person => {
            person.age++;
            person.stats.hunger++;
            if (person.age >= 100) {
                this.population.splice(this.population.indexOf(person), 1);
            }
            this.foodQueue.push(person)
        })
    }
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
    ]
});

sim.begin();