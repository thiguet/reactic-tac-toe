import React from 'react';
import Square from './square';
import "./board.css"

class Board extends React.Component {
    renderSquare(i) {
        return (
          <Square
            key={i}
            magicNumber={this.props.magicNumber}
            shake={this.props.winnerCells.filter(cell => i === cell).length > 0}
            value={this.props.squares[i]}
            onClick={() => this.props.handleClick(i)}
          />
        );
    }

    getListBoard() {
        let squares = this.props.squares;
        const matriz = Array(squares.length / 3).fill(Array(squares.length / 3));

        squares.forEach( (value, index) => {
            matriz[parseInt(index/3)][index%3] = value;
        });
        
        const listItems = matriz.map((row, i) => {
            return <div key={i} className={"container-fluid"}>
                        {row.map((value, j) => this.renderSquare(i*3+j))}
                   </div>
        });
        
        return listItems;
    }

    render() {
        return (
            <div className="text-center">
                <div className="title">{this.props.boardMsg}
                {
                    !this.props.gameOver 
                        ? <span className="playerSymbol">{this.props.nextPlayerChar}</span>                
                        : ""     
                }
                </div>
                <hr />
                <div className="container board"> 
                    {this.getListBoard()}
                </div>
            </div>
        );
    };
}

export default Board;