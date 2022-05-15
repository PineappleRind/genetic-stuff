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
    };
}
declare type SimulationEvent = 'gift' | 'birth' | 'death' | 'age' | 'tick';
export declare class Simulation {
    tick: number;
    time: number;
    population: Person[];
    foodQueue: Person[];
    events: {
        [key: string]: Function;
    };
    constructor(options: SimulationOptions);
    begin(): void;
    addListener(event: SimulationEvent, callback: Function): void;
    update(): void;
}
export {};
