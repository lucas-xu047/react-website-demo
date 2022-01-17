import React, { Component } from "react";
import Board from './Board'
/**
 * 在游戏历史记录列表显示每一步棋的坐标，格式为 (列号, 行号)。  √
 * 在历史记录列表中加粗显示当前选择的项目。         √
 * 使用两个循环来渲染出棋盘的格子，而不是在代码里写死（hardcode）。      √
 * 添加一个可以升序或降序显示历史记录的按钮。
 * 每当有人获胜时，高亮显示连成一线的 3 颗棋子。         √
 * 当无人获胜时，显示一个平局的消息。          √
 */
class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                    coordinates: { x: '', y: '' }
                }
            ],
            xIsNext: true,
            stepNumber: 0,
        }
    }

    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return { winner: squares[a], winIndexs: [a, b, c] };
            }
        }
        return { winner: null, winIndexs: [] };
    }

    getCoordinates(i) {
        let obj = { x: '', y: '' }
        obj.x = Math.ceil(i / 3)
        obj.y = (i % 3) || 3
        return obj
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (this.calculateWinner(current.squares).winner || current.squares[i]) {
            return;
        }

        const coordinates = this.getCoordinates(i + 1)

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares,
                coordinates
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        })
    }
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const { winner, winIndexs } = this.calculateWinner(current.squares);
        //历史
        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            const coordinates = step.coordinates.x + ":" + step.coordinates.y
            return (
                <li key={move} className={move == this.state.stepNumber ? 'active' : ''}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button> &nbsp;&nbsp; {move != 0 ? '--位置' + coordinates : ''}
                </li>
            )
        })

        let status;
        if (winner) {
            status = (<h2>Winner: {winner}</h2>)
        } else {
            if (this.state.stepNumber == 9) {
                status = (<h2>dogfall</h2>)
            } else {
                status = (<h2>Next player: {this.state.xIsNext ? 'X' : 'O'}</h2>)
            }
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onClick={this.handleClick.bind(this)} winIndexs={winIndexs} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        )
    }
}

export default Game;
