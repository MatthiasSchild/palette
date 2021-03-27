import React from 'react'
import {createPortal} from 'react-dom'
import {Palette} from '../models/Palette'

interface Props {
    active: boolean
    palette: Palette
    onClose: () => void
}

export default class SaveModal extends React.Component<Props, any> {
    modalElement: HTMLElement = document.getElementById('modals')!
    private inputName: HTMLInputElement | null = null

    private onButtonSave() {
        const name = this.inputName?.value || ''
        if (!name) return

        const colors = this.props.palette.items.map(i => i.color.toString())
        const value = colors.join(';')

        let storageStr = localStorage.getItem('palettes') || '{}'
        let storage = JSON.parse(storageStr)
        storage[name] = value
        storageStr = JSON.stringify(storage)
        localStorage.setItem('palettes', storageStr)
        console.log('palettes =', storageStr)

        this.props.onClose()
    }

    render() {
        if (!this.props.active) return null

        return createPortal(
            <>
                <div className="modal-backdrop"/>
                <div className="modal">
                    <header>
                        Save palette
                    </header>

                    <div>
                        <label>Name:</label>
                        <input type="text" ref={el => {
                            this.inputName = el
                        }}/>
                    </div>

                    <footer className="item-group">
                        <button onClick={() => this.onButtonSave()}>Save</button>
                        <button onClick={() => this.props.onClose()}>Cancel</button>
                    </footer>
                </div>
            </>,
            this.modalElement,
        )
    }
}
