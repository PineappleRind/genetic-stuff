class Food {
    location: {
        x: number;
        y: number;
    }
    size: number;
    constructor() {
        this.location = {
            x: Math.floor(Math.random() * 100),
            y: Math.floor(Math.random() * 100)
        };
        this.size = Math.floor(Math.random() * 2);
        return this
    }
}
interface SimulationOptions {
    gridSize?: number;
    time: number;
    genes?: Gene[];
    startPopulation?: number;
}
interface Gene {
    name: string;
    values: {
        [key: string]: number;
    };
}
class Person {
    id: number;
    genes: Gene[];
    constructor(id: number, genes: Gene[]) {
        this.id = id;
        this.genes = genes || [];
    }
}
type SimulationEvent = 'gift' | 'birth' | 'death' | 'tick';

export { Gene, Food, SimulationOptions, Person, SimulationEvent };