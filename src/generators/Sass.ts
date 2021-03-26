import {Palette} from '../models/Palette'

export function generateSass(palette: Palette, filetype: string): string {
    const colors = palette.items.map(i => i.color)
    const tones = [0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8]
    let content = ""

    colors.forEach((color, index) => {
        content += `// Color #${index}\n`

        tones.forEach((tone, toneIndex) => {
            const varName = `color${index}_${toneIndex}`

            switch (filetype) {
                case 'sass':
                    content += `$${varName}: ${color.tone(tone).toString()}\n`
                    break
                case 'scss':
                    content += `$${varName}: ${color.tone(tone).toString()};\n`
                    break
            }
        })

        content += '\n'
    })

    return content
}
