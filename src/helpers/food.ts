import { Food } from '../types'
import Grid from './grid';

export default class FoodManager {
    private food: Food[];
    constructor() {
        this.food = [];
    }
    addFood(grid: Grid, amount?: number) {
        amount = amount || 1;
        this.food.push(new Food())
        return this
    }
    clearFood() {
        this.food = []
        return this
    }
}