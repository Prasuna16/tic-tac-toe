import React from 'react'
import Board from './board'

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stats: true,
            step: 1,
            start: true,
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
            return squares[a];
          }
        }
        return null;
    }
    jump(i) {
        if (i === 1) {
            this.setState({
                start: true,
            })
        }
        this.setState({
            step: i,
        })
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.step);
        console.log(this.state.step, " step ", history.length, " first ", this.state.history.length)
        const current = history[history.length - 1];
        const sq = current.squares.slice();
        if (this.calculateWinner(current.squares) || current.squares[i]) return;
        sq[i] = history.length % 2 == 0 ? 'O' : 'X'
        history.push({
            squares: sq
        });
        this.setState({
            history: history,
            step: history.length,
            start: false,
        })
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.step - 1];
        const winner = this.calculateWinner(current.squares);
        let status;
        var flag = 0;
        if (winner  && !this.state.start) {
            status = 'Winner: ' + winner;
            flag = 1;
        } else {
            if (history.length === 10 && !this.state.start) {
                status = 'Draw Match!'
                flag = -1;
            } else {
                status = 'Next player: ' + (this.state.history.length % 2 == 0 && !this.state.start ? 'O' : 'X');
            }
        }
        var rows = [];
        rows.push(<div key='0'><button className="button" onClick={() => {this.jump(1)}}>Start the game</button><br></br></div>)
        for (let i = 1; i < history.length; i++) {
            rows.push(<div key={i}><button className="button" onClick={() => {this.jump(i + 1)}}>Go to move #{i}</button><br></br></div>);
        }
        return (
            <div className="game">
                <div className = "game-board">
                    <Board squares={current.squares}
                    click={(i) => this.handleClick(i)}
                    status={status} />
                </div>
                <div className="game-info">
                    <div style={flag === 1 ? {color: "green", fontSize: "26px", fontWeight: "bold"} : flag === -1 ? {color: "red", fontSize: "24px", fontWeight: "bold"} : {color: "black"}}>{status}</div>
                    <div>{rows}</div>
                </div>
            </div>
        )
    }
}

export default Game;