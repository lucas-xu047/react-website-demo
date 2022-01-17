import React, { Component } from "react";
import Square from './Square'

export default class Board extends Component {
    constructor(props) {
        super(props);
    }

    renderSquare(i, flag) {
        return <Square key={i} flag={flag} value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />
    }

    render() {
        let { winIndexs } = this.props
        const row = [0, 1, 2]
        const col = [0, 1, 2]
        let boardMap = row.map(i =>
            <div className="board-row" key={i} >
                {
                    col.map(j => {
                        let ind = j + i * 3
                        let highlight = winIndexs.includes(ind)
                        return this.renderSquare(ind, highlight)
                    }
                    )
                }
            </div >
        )
        return (
            <div>
                { boardMap}
                {/* <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div> */}
            </div >
        );
    }
}
