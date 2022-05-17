import { Food, GridValue } from '../types'
import Grid from './grid';

export default class FoodManager {
    addFood(grid: Grid, amount?: number) {
        amount = amount || 1;
        for (let i = 0; i < grid.size; i++) {
            for (let x = 0; x < grid.size; x++) {
                let coords = [i, x];
                grid.set(coords, new Food(coords));
                grid.set(coords, new Food(coords));
            }
        }
        return grid
    }
    clearFood(grid: Grid) {
        grid.grid.forEach((row: [], x: number) => {
            row.forEach((col: [], y: number) => {
                col.forEach((v: GridValue) => {
                    if (v instanceof Food) grid.remove([x, y], v);
                })
            })
        })

        return grid
    }
    removeAllFrom(grid: Grid, [x, y]: number[]) {
        grid.grid[x][y].forEach((v: GridValue) => {
            if (v.type === 'food') grid = grid.remove([x, y], v);
        })
        return grid
    }
}