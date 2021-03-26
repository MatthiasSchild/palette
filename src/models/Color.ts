export class Color {

    red: number
    green: number
    blue: number

    constructor() {
        this.red = 0
        this.green = 0
        this.blue = 0
    }

    toString(): string {
        const r = this.red.toString(16).padStart(2, '0')
        const g = this.green.toString(16).padStart(2, '0')
        const b = this.blue.toString(16).padStart(2, '0')

        return `#${r}${g}${b}`
    }

    randomize() {
        this.red = Math.floor(Math.random() * 0xff)
        this.green = Math.floor(Math.random() * 0xff)
        this.blue = Math.floor(Math.random() * 0xff)
    }

    tone(factor: number) {
        const f = (val: number) => Math.floor(Math.max(0, Math.min(255, val)))

        const c = new Color()
        c.red = f(this.red * factor)
        c.green = f(this.green * factor)
        c.blue = f(this.blue * factor)
        return c
    }

    brightness(): number {
        return (this.red + this.green + this.blue) / 3 / 256.0
    }

    complementary(): Color {
        const c = new Color()
        c.red = 256 - this.red
        c.green = 256 - this.green
        c.blue = 256 - this.blue
        return c
    }
}
