import {Color} from './Color'

export class Item {
    private static expr = /^#?([a-z0-9]{2})([a-z0-9]{2})([a-z0-9]{2})$/i
    static nextId = 1

    static fromHex(hex: string): Item {
        const match = hex.match(Item.expr)

        const item = new Item()
        if (match !== null) {
            item.color.red = parseInt(match[1], 16)
            item.color.green = parseInt(match[2], 16)
            item.color.blue = parseInt(match[3], 16)
        }
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
