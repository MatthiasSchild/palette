import {Palette} from '../models/Palette'
import React from 'react'
import {Color} from '../models/Color'

interface Props {
    palette: Palette
}

interface State {
    selected: number
}

export default class IllustrationViewer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {selected: 0}
    }

    private colors(): Color[] {
        return this.props.palette.items.map(item => item.color)
    }

    private illustration0() {
        const colors = this.colors()
        if (colors.length === 0) return null

        const color0 = colors[0 % colors.length]
        const color1 = colors[1 % colors.length]
        const color2 = colors[2 % colors.length]
        const color3 = colors[3 % colors.length]

        return (
            <svg width="100%" height="100%" viewBox="0 0 1024 600" version="1.1">
                <rect className="background" x="0" y="0" width="1024" height="600"
                      style={{fill: color0.toString()}}/>
                <path className="backshadow" d="M128,0L1024,0L1024,448L128,0Z"
                      style={{fill: color0.tone(0.6).toString()}}/>

                <g className="boxes">
                    <g className="box2">
                        <path className="front"
                              d="M374.597,337.688L232.052,266.416L232.052,123.87L374.597,195.143L374.597,337.688Z"
                              style={{fill: color2.toString()}}/>
                        <path className="top"
                              d="M232.052,123.87L338.961,70.416L481.506,141.688L374.597,195.143L232.052,123.87Z"
                              style={{fill: color2.tone(1.4).toString()}}/>
                        <path className="side"
                              d="M481.506,141.688L374.597,195.143L374.597,337.688L481.506,284.234L481.506,141.688Z"
                              style={{fill: color2.tone(0.8).toString()}}/>
                    </g>

                    <g className="box1">
                        <path className="front1"
                              d="M664.779,506.052L408.779,378.052L408.779,122.052L664.779,250.052L664.779,506.052Z"
                              style={{fill: color1.toString()}}/>
                        <path className="top1"
                              d="M408.779,122.052L600.779,26.052L856.779,154.052L664.779,250.052L408.779,122.052Z"
                              style={{fill: color1.tone(1.4).toString()}}/>
                        <path className="side1"
                              d="M856.779,154.052L664.779,250.052L664.779,506.052L856.779,410.052L856.779,154.052Z"
                              style={{fill: color1.tone(0.8).toString()}}/>
                    </g>

                    <g className="box3">
                        <path className="front2"
                              d="M361.299,573.948L167.221,476.909L167.221,282.831L361.299,379.87L361.299,573.948Z"
                              style={{fill: color3.toString()}}/>
                        <path className="top2"
                              d="M167.221,282.831L312.78,210.052L506.858,307.091L361.299,379.87L167.221,282.831Z"
                              style={{fill: color3.tone(1.4).toString()}}/>
                        <path className="side2"
                              d="M506.858,307.091L361.299,379.87L361.299,573.948L506.858,501.169L506.858,307.091Z"
                              style={{fill: color3.tone(0.8).toString()}}/>
                    </g>
                </g>
            </svg>
        )
    }

    private illustration1() {
        const colors = this.colors()
        if (colors.length === 0) return null

        const color0 = colors[0 % colors.length]
        const color1 = colors[1 % colors.length]
        const color2 = colors[2 % colors.length]
        const color3 = colors[3 % colors.length]

        return (
            <svg width="100%" height="100%" viewBox="0 0 1024 600" version="1.1">
                <rect id="background" x="0" y="0" width="1024" height="600"
                      style={{fill: color0.toString()}}/>

                <g id="header">
                    <rect id="header1" x="0" y="0" width="1024" height="50"
                          style={{fill: color1.toString()}}/>
                    <text x="19.912px" y="35.745px"
                          style={{fontFamily: 'Arial', fontSize: '30px', fill: color1.tone(0.5).toString()}}>
                        YOUR LOGO
                    </text>
                </g>

                <rect id="footer" x="0" y="480" width="1024" height="120"
                      style={{fill: color2.toString()}}/>

                <rect id="nav" x="0" y="50" width="300" height="430"
                      style={{fill: color3.toString()}}/>

                <g id="articles">
                    <rect id="article3" x="320" y="380" width="680" height="100"
                          style={{fill: color0.tone(0.8).toString()}}/>
                    <rect id="article2" x="320" y="220" width="680" height="140"
                          style={{fill: color0.tone(0.8).toString()}}/>
                    <rect id="article1" x="320" y="60" width="680" height="140"
                          style={{fill: color0.tone(0.8).toString()}}/>
                </g>
            </svg>
        )
    }

    render() {
        return (
            <div className="illustrations">
                <div className="item-group mb">
                    <button onClick={() => this.setState({selected: 0})}>Simple</button>
                    <button onClick={() => this.setState({selected: 1})}>Website</button>
                </div>

                {this.state.selected === 0 ? this.illustration0() : null}
                {this.state.selected === 1 ? this.illustration1() : null}
            </div>
        )
    }
}
