import React from 'react'
import {Item} from '../models/Item'
import {createPortal} from 'react-dom'

interface Props {
    active: boolean
    onLoad: (items: Item[]) => void
    onClose: () => void
}

class ItemPack {
    static load(): ItemPack[] {
        const result: ItemPack[] = []
        const storageStr = localStorage.getItem('palettes') || '{}'
        const storage = JSON.parse(storageStr)

        for (let name in storage) {
            if (!storage.hasOwnProperty(name)) continue

            const pack = new ItemPack(name, storage[name])
            result.push(pack)
        }

        return result
    }

    name: string
    items: Item[]

    constructor(name: string, colors: string) {
        this.name = name
        this.items = []

        for (let color of colors.split(';')) {
            this.items.push(Item.fromHex(color))
        }
    }
}

export default class LoadModal extends React.Component<Props, any> {
    modalElement: HTMLElement = document.getElementById('modals')!

    private onSelection(pack: ItemPack) {
        this.props.onLoad(pack.items)
        this.props.onClose()
    }

    render() {
        const packs = ItemPack.load()
        if (!this.props.active) return null

        return createPortal(
            <>
                <div className="modal-backdrop"/>
                <div className="modal">
                    <header>
                        Load palette
                    </header>

                    <div>
                        {packs.map(pack => (
                            <div key={'pack_' + pack.name} className="pack" onClick={() => this.onSelection(pack)}>
                                <label>{pack.name}</label>
                                <div className="color-preview">
                                    {pack.items.map(item => (
                                        <div key={item.id}
                                             className="color"
                                             style={{backgroundColor: item.color.toString()}}/>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <footer>
                        <button onClick={() => this.props.onClose()}>Cancel</button>
                    </footer>
                </div>
            </>,
            this.modalElement,
        )
    }
}
