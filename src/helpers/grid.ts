import { Person, Food } from '../types';
type GridValue = Person | Food;
export default class Grid {
    size: number;
    grid: GridValue[][][];
    constructor(size: number) {
        this.size = size;
        this.grid = Array.from(Array(size), () => Array(size).fill(0));
    }
    set = ([x, y]: number[], value: GridValue) => {
        this.grid[x][y].push(value)
        return this;
    }
    remove = ([x, y]: number[], value: GridValue) => {
        this.grid[x][y] = this.grid[x][y].filter(v => v !== value);
        return this;
    };
    get = ([x, y]: number[]) => {
        return this.grid[x][y];
    };
    countPeople = ([x, y]: number[]) => this.grid[x][y].filter(v => {
        typeof v === typeof Person
    }).length;
}