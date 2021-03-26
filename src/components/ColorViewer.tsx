import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowDown, faArrowUp, faLock, faLockOpen, faSync, faTrash} from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import './ColorViewer.sass'
import {Color} from '../models/Color'

interface Props {
    locked: boolean
    color: Color
    onLock?: (val: boolean) => void
    onComp?: (comp: Color) => void
    onMoveUp?: () => void
    onMoveDown?: () => void
    onDelete?: () => void
}

export default class ColorViewer extends React.Component<Props, any> {
    constructor(props: any) {
        super(props)

        this.onButtonLock = this.onButtonLock.bind(this)
        this.onButtonComp = this.onButtonComp.bind(this)
        this.onButtonDelete = this.onButtonDelete.bind(this)
    }

    private onButtonLock() {
        const val = !this.props.locked
        this.props.onLock?.(val)
    }

    private onButtonComp() {
        const comp = this.props.color.complementary()
        this.props.onComp?.(comp)
    }

    private onButtonDelete() {
        this.props.onDelete?.()
    }

    render() {
        const color = this.props.color
        let cols = []
        let i = 0.2
        while (i <= 1.8) {
            const c = color.tone(i)
            const key = color.toString() + '-' + i
            const classes = c.brightness() < 0.5 ? 'item wide' : 'item wide dark'
            const click = () => {
                navigator.clipboard?.writeText(c.toString())
            }

            cols.push(
                <button key={key}
                        className={classes}
                        style={{backgroundColor: c.toString()}}
                        onClick={click}>
                    {c.toString()}
                </button>,
            )
            i += 0.2
        }

        return (
            <div className="item-group color-viewer">
                <button className="fixed" onClick={this.onButtonLock}>
                    <FontAwesomeIcon icon={this.props.locked ? faLock : faLockOpen}/>
                </button>
                <button className="fixed" onClick={this.onButtonComp}>
                    <FontAwesomeIcon icon={faSync}/>
                </button>
                <button className="fixed" onClick={() => this.props.onMoveUp?.()}>
                    <FontAwesomeIcon icon={faArrowUp}/>
                </button>
                <button className="fixed" onClick={() => this.props.onMoveDown?.()}>
                    <FontAwesomeIcon icon={faArrowDown}/>
                </button>
                {cols}
                <button onClick={this.onButtonDelete}>
                    <FontAwesomeIcon icon={faTrash}/>
                </button>
            </div>
        )
    }
}
