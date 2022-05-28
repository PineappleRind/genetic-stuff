import { Person, Food } from './types';
export default class Grid {
    size: number;
    data: number[][];
    constructor(size: number) {
        this.size = size;
        this.data = this.init()
    }
    add = ([x, y]: number[], amt?: number) => {
        this.data[x][y] += (amt || 1)
        return this;
    }
    remove = ([x, y]: number[], amt?: number) => {
        this.data[x][y] -= (amt || 1)
        return this;
    };
    get = ([x, y]: number[]) => {
        return this.data[x][y];
    }
    init = (): number[][] => {
        return Array.from(Array(this.size), () => Array(this.size).fill(0));
    }
}