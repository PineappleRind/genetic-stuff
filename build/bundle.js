// src/types.ts
class Person {
  id;
  genes;
  type = "person";
  location;
  constructor(id, genes) {
    this.id = id;
    this.genes = genes || [];
  }
}

// src/GridManager.ts
var GridCellFlags = {
  default: 0,
  food: 1,
  person: 4
};

class GridCell {
  content;
  constructor() {
    this.content = 0;
  }
  has = (type) => this.content & GridCellFlags[type];
  remove = (type, amt) => {
    if (amt > 2)
      return this.remove(type, 2);
    this.content &= ~(GridCellFlags[type] * amt);
    return this;
  };
  add = (type, amt) => {
    if (amt > 2)
      return this.add(type, 2);
    this.content |= GridCellFlags[type] * amt;
    return this;
  };
  reset = () => {
    this.content = 0;
    return this;
  };
}

class Grid {
  size;
  data;
  foodLocations;
  constructor(size) {
    this.size = size;
    this.data = this.init();
  }
  add = ([x, y], type, amt) => {
    return this.data[x][y].add(type === 1 ? "person" : "food", amt);
  };
  remove = ([x, y], amt) => {
    this.data[x][y].remove("person", amt);
    return this;
  };
  get = ([x, y]) => {
    return this.data[x][y];
  };
  findFood = () => {
    return this.foodLocations.shift();
  };
  init = () => {
    return Array.from(Array(this.size), () => Array(this.size).fill(new GridCell));
  };
  fillGrid = (amt) => {
    for (let i = 0;i < amt; i++) {
      let [rx, ry] = [
        Math.floor(Math.random() * this.data[0].length),
        Math.floor(Math.random() * this.data.length)
      ];
      if (this.data[rx][ry].has("food"))
        i--;
      else
        this.data[rx][ry].add("food", 1);
    }
  };
}

// src/index.ts
class Simulation {
  tickStep;
  population = [];
  genes = [];
  genInterval;
  grid;
  tick;
  events;
  constructor(options) {
    this.tick = 0;
    this.population = [];
    this.genes = options.genes || [];
    this.events = {};
    if (options.startPopulation) {
      this.population = Array.from({ length: options.startPopulation }, (_v, i) => new Person(i, this.genes));
    }
    this.grid = new Grid(options.gridSize || 30);
    this.tickStep = 1000;
    return this;
  }
  begin() {
    this.nextGen();
    this.genInterval = setInterval(() => this.nextGen(), this.tickStep);
    return this;
  }
  stop() {
    clearInterval(this.genInterval);
    return this;
  }
  getGrid() {
    return this.grid;
  }
  nextGen() {
    let { dispatchEvent, grid, population } = this;
    this.tick++;
    dispatchEvent("tick", this.tick);
    grid.init();
    let births = 0, deaths = 0;
    population.forEach((person) => {
      let xy = [Math.floor(Math.random() * this.grid.size), Math.floor(Math.random() * this.grid.size)];
      return;
    });
  }
  addListener = (event, callback) => {
    this.events[event] = callback;
    return this;
  };
  dispatchEvent = (event, data) => this.events[event] ? this.events[event](data) : false;
}
export {
  Simulation as default
};
