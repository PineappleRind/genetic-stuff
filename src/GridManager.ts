let GridCellFlags = {
    default: 0b0000,
    food:    0b0001,
    person:  0b0100,
}
class GridCell {
    protected content: number;
    constructor() {
        this.content = 0b0000
    }
    has = (type: string) => this.content & GridCellFlags[type]
    remove = (type: string, amt: number) => {
        if (amt > 2) return this.remove(type, 2)
        this.content &= ~(GridCellFlags[type] * amt)
        return this
    }
    add = (type: string, amt: number) => {
        if (amt > 2) return this.add(type, 2)
        this.content |= GridCellFlags[type] * amt
        return this
    }
    reset = () => {
        this.content = 0b0000
        return this
    }
}

export default class Grid {
    size: number;
    data: GridCell[][];
    protected foodLocations: number[][]
    constructor(size: number) {
        this.size = size;
        this.data = this.init()
    }
    add = ([x, y]: number[], type: number, amt?: number) => {
        return this.data[x][y].add(type === 1 ? 'person' : 'food', amt)
    }
    remove = ([x, y]: number[], amt?: number) => {
        this.data[x][y].remove('person', amt)
        return this;
    };
    get = ([x, y]: number[]) => {
        return this.data[x][y];
    }
    findFood = () => {
        return this.foodLocations.shift()
    }
    init = (): GridCell[][] => {
        return Array.from(Array(this.size), () => Array(this.size).fill( new GridCell() ));
    }
    fillGrid = (amt: number) => {
        for (let i = 0; i < amt; i++) {
            let [rx, ry] = [
                Math.floor(Math.random() * this.data[0].length),
                Math.floor(Math.random() * this.data.length)
            ]
            if (this.data[rx][ry].has('food')) i--
            else this.data[rx][ry].add('food', 1)
        }
    }
}