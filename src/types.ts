class Food {
    location: {
        x: number;
        y: number;
    }
    type: string = 'food'
    constructor([x,y]: number[]) {
        this.location = {
            x: x,
            y: y
        };
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
type SimulationEvent = 'gift' | 'population' | 'tick' | 'food' | 'move' | 'death' | 'birth';
type GridValue = Person | Food;

export { Gene, Food, SimulationOptions, Person, SimulationEvent, GridValue };