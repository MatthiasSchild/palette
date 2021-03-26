import {Color} from './Color'

export class Item {
    static nextId = 1

    static fromHex(hex: string): Item {
        const item = new Item()
        item.color.red = parseInt(hex.substr(0, 2), 16)
        item.color.green = parseInt(hex.substr(2, 2), 16)
        item.color.blue = parseInt(hex.substr(4, 2), 16)
        return item
    }

    id: number
    color: Color

    locked: boolean

    constructor() {
        this.id = Item.nextId++
        this.color = new Color()
        this.color.randomize()
        this.locked = false
    }

    copy(): Item {
        const item = new Item()
        item.color.red = this.color.red
        item.color.green = this.color.green
        item.color.blue = this.color.blue
        item.locked = this.locked
        return item
    }
}
