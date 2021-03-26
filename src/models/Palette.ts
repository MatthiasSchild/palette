import {Item} from './Item'

export class Palette {
    items: Item[]

    constructor() {
        this.items = [
            new Item(),
            new Item(),
            new Item(),
        ]
    }
}
