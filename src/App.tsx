import React from 'react'
import './App.sass'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import {faGlobe} from '@fortawesome/free-solid-svg-icons'
import ColorViewer from './components/ColorViewer'
import {Color} from './models/Color'
import {Palette} from './models/Palette'
import {Item} from './models/Item'
import IllustrationViewer from './components/IllustrationViewer'
import {generateSass} from './generators/Sass'

interface State {
    palette: Palette
}

export default class App extends React.Component<any, State> {
    private static startDownload(filename: string, text: string) {
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    private inputNewColor: HTMLInputElement | null = null

    constructor(props: any) {
        super(props)
        this.state = {palette: new Palette()}

        // bind handlers
        this.onButtonRandomize = this.onButtonRandomize.bind(this)
        this.onButtonAddItem = this.onButtonAddItem.bind(this)
        this.onButtonExportSass = this.onButtonExportSass.bind(this)
        this.onButtonExportScss = this.onButtonExportScss.bind(this)
        this.onButtonAddColor = this.onButtonAddColor.bind(this)
    }

    private onButtonRandomize() {
        for (let item of this.state.palette.items) {
            if (!item.locked) {
                item.color.randomize()
            }
        }
        this.setState({palette: this.state.palette})
    }

    private onButtonAddItem() {
        const palette = this.state.palette
        palette.items.push(new Item())
        this.setState({palette})
    }

    private onButtonExportSass() {
        const content = generateSass(this.state.palette, 'sass')
        App.startDownload('palette.sass', content)
    }

    private onButtonExportScss() {
        const content = generateSass(this.state.palette, 'scss')
        App.startDownload('palette.scss', content)
    }

    private onButtonAddColor() {
        const input = this.inputNewColor
        if (input === null) return

        const value = input.value
        const expr = /^#?([0-9a-f]{6})$/i
        const match = value.match(expr)

        if (match) {
            const item = Item.fromHex(match[1])
            const palette = this.state.palette
            palette.items.push(item)
            this.setState({palette})

            input.value = ''
        } else {
            // TODO make input red!
        }
    }

    private onButtonLock(item: Item, locked: boolean) {
        const palette = this.state.palette
        for (let i of palette.items) {
            if (i === item) {
                i.locked = locked
            }
        }
        this.setState({palette})
    }

    private onButtonComp(item: Item, comp: Color) {
        const items: Item[] = []
        const palette = this.state.palette
        for (let i of palette.items) {
            items.push(i)
            if (i === item) {
                const newItem = item.copy()
                newItem.color = comp
                items.push(newItem)
            }
        }
        palette.items = items
        this.setState({palette})
    }

    private onButtonMoveUp(item: Item) {
        const newList: Item[] = []
        const palette = this.state.palette

        // Skip when list is empty or item == first element
        if (palette.items.length === 0) return
        if (palette.items[0] === item) return

        for (let i of palette.items) {
            // if i != item, just add i to the list
            // it i == item, add i before the last element
            if (i === item) {
                newList.splice(newList.length - 1, 0, i)
            } else {
                newList.push(i)
            }
        }

        palette.items = newList
        this.setState({palette})
    }

    private onButtonMoveDown(item: Item) {
        const newList: Item[] = []
        const palette = this.state.palette

        // Skip when list is empty or item == last element
        if (palette.items.length === 0) return
        if (palette.items[palette.items.length - 1] === item) return

        // This backup will hold the item which should be moved for the next position
        let backup: Item | null = null

        for (let i of palette.items) {
            // if i != item, just add i to the list and add backup if not null
            // it i == item, set backup to i and continue
            if (i === item) {
                backup = i
            } else {
                newList.push(i)

                if (backup !== null) {
                    newList.push(backup)
                    backup = null
                }
            }
        }

        palette.items = newList
        this.setState({palette})
    }

    private onButtonDelete(item: Item) {
        const items = []
        const palette = this.state.palette
        for (let i of palette.items) {
            if (i !== item) {
                items.push(i)
            }
        }
        palette.items = items
        this.setState({palette})
    }

    render() {
        return (
            <div className="App">
                <div className="container">

                    <div id="header">
                        <h1>palette.schild.io</h1>

                        <div className="right">
                            <a href="https://github.com/MatthiasSchild/palette" target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={faGithub}/>
                            </a>
                            <a href="https://matthiasschild.de/" target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={faGlobe}/>
                            </a>
                        </div>
                    </div>

                    <div id="content">
                        <div>
                            <span className="item-group mr">
                                <button onClick={this.onButtonRandomize}>RANDOMIZE</button>
                                <button onClick={this.onButtonAddItem}>Add item</button>
                            </span>

                            <span className="item-group">
                                <span className="item">Export</span>
                                <button onClick={this.onButtonExportScss}>.scss</button>
                                <button onClick={this.onButtonExportSass}>.sass</button>
                            </span>
                        </div>

                        <div className="item-group mt">
                            <button onClick={this.onButtonAddColor}>Add color</button>
                            <input type="text" className="item" ref={(c) => this.inputNewColor = c}/>
                        </div>

                        <hr/>

                        {this.state.palette.items.map(item => (
                            <ColorViewer key={item.id}
                                         locked={item.locked}
                                         color={item.color}
                                         onLock={val => this.onButtonLock(item, val)}
                                         onComp={comp => this.onButtonComp(item, comp)}
                                         onMoveUp={() => this.onButtonMoveUp(item)}
                                         onMoveDown={() => this.onButtonMoveDown(item)}
                                         onDelete={() => this.onButtonDelete(item)}/>
                        ))}

                        <hr/>

                        <IllustrationViewer palette={this.state.palette}/>
                    </div>

                </div>
            </div>
        )
    }
}
