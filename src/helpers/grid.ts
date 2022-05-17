import { Person, Food, GridValue } from '../types';
export default class Grid {
    size: number;
    grid: GridValue[][][];
    constructor(size: number) {
        this.size = size;
        this.grid = Array.from(Array(size), () => Array(size).fill([]));
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
    countFood = ([x, y]: number[]) => this.grid[x][y].filter(v => v.type === 'food').length;
    countPeople = ([x, y]: number[]) => this.grid[x][y].filter(v => v.type === 'person').length;
    consumeFood = ([x, y]: number[], person: Person) => {
        const food = this.countFood([x, y]);
        console.log('There is ' + food + ' food at ' + x + ',' + y);
        if (food === 0) return 0;
        this.grid[x][y] = this.grid[x][y].filter(v => v !== food[0]);
        return food;
    }
    removeAllPeople = () => {
        this.grid.forEach((row: [], x: number) => {
            row.forEach((col: [], y: number) => {
                col.forEach((v: GridValue) => {
                    if (v instanceof Person) this.remove([x, y], v);
                })
            })
        })
        return this;
    }
}