class Food {
    location: {
        x: number;
        y: number;
    }
    constructor([x,y]: number[]) {
        this.location = {
            x: x,
            y: y
        };
        return this
    }
}
class Person {
    id: number;
    genes: Gene[];
    type: string = 'person'
    location: {
        x: number;
        y: number;
    }
    constructor(id: number, genes: Gene[]) {
        this.id = id;
        this.genes = genes || [];
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

type SimulationEvent = 'gift' | 'population' | 'tick' | 'food' | 'move' | 'death' | 'birth';
type GridValue = Person | Food;

export { Gene, Food, SimulationOptions, Person, SimulationEvent, GridValue };