import React from 'react';
import Board from './board';
import History from './history';
import "./game.css"

class Game extends React.Component {
    DEFAULT_BOARD_MESSAGE = "Next Player : ";
    X_VALUE = "";
    O_VALUE = "";
    
    constructor(props) {
        super(props);
        this.randomizeChars();
        this.state = {
            history: [],
            squares : Array(9).fill(null),
            nextPlayerChar :  this.O_VALUE,
            boardMsg : this.DEFAULT_BOARD_MESSAGE,
            gameOver : false,
            winnerCells: []
        };
    }

    randomizeChars() {
        if(parseInt(Math.random() * 10) < 5) {
            this.X_VALUE = 'X';
            this.O_VALUE = 'O';
        } else {
            this.X_VALUE = 'O';
            this.O_VALUE = 'X';
        }
    }

    initializeGame() {
        this.randomizeChars();
        this.setState({
            history: [],
            squares : Array(9).fill(null),
            nextPlayerChar :  this.O_VALUE,
            boardMsg : this.DEFAULT_BOARD_MESSAGE,
            gameOver : false,
            winnerCells: []
        });
    }    

    changeNextPlayer () {
        this.setState({
            nextPlayerChar: (this.state.history.length % 2 === 0)
                        ? this.X_VALUE
                        : this.O_VALUE 
        });
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        
        if(squares[i] === null && !this.state.gameOver) {
            squares[i] = this.state.nextPlayerChar;

            const history = this.state.history.slice();
            history.push({
                "player": this.state.nextPlayerChar,
                "position": i
            });

            this.setState({
                squares: squares,
                history: history
            });
            this.calculateEndGame(squares, i);
            this.changeNextPlayer();
        }
    }

    isAVerticalWin(squares, col) {
        col %= 3;

        return  squares[col] === squares[col + 3] && 
                squares[col] === squares[col + 6];
    }

    isAHorizontalWin(squares, position) {
        let row = parseInt(position / 3) * 3;

        return  squares[row] === squares[row + 1] && 
                squares[row] === squares[row + 2];
    }

    isADiagonalWin(squares, i) {
        return (( ( (i % 4 === 0) && squares[0] === squares[4] && squares[4] === squares[8])  || 
                  ( (i % 4 === 2) && squares[2] === squares[4] && squares[4] === squares[6]) ) );
    }

    handleTie() {
        this.setState({
            boardMsg: "It's a Tie !",
            nextPlayerChar :  "",
            gameOver : true
        });
    }

    handleWin(playerSymbol) {
        this.setState({
            boardMsg: "Player " + playerSymbol + " has won !",
            nextPlayerChar :  "",
            gameOver : true
        });
    }

    goBackToMovement(index) {
        const history = this.state.history.slice();
        const squares = this.state.squares.slice();

        if(!this.state.gameOver) {
            for(let i = history.length - 1 ; i >= index; i-- ) {
                squares[history[i].position] = null;
                history.pop();
            }

            this.setState({
                history,
                squares,
                boardMsg : this.DEFAULT_BOARD_MESSAGE,
                gameOver: false,
                nextPlayerChar: (history.length % 2 === 1)
                        ? this.X_VALUE
                        : this.O_VALUE 
            });
        }
    }

    calculateEndGame(squares, i) {
        // Magic Number shows where the Win happened.
        // Sum these numbers :
        // 1 - Vertical Win
        // 2 - Horizontal Win
        // 4 - Diagonal Win

        let magicNumber =  
                (this.isAVerticalWin   (squares, i)) * 1 + 
                (this.isAHorizontalWin (squares, i)) * 2 + 
                (this.isADiagonalWin   (squares, i)) * 4;

        if( magicNumber > 0) {
            if(squares[i] === this.X_VALUE) {
                this.handleWin(this.X_VALUE);
            } else if(squares[i] === this.O_VALUE) {
                this.handleWin(this.O_VALUE);
            }
        
            this.setWinnerCells(i, magicNumber);
        } else if(this.state.history.length + 1 === 9) {
            this.handleTie();
        }
    }

    restartGame() {
        this.initializeGame();
    }
    
    setWinnerCells(i, magicNumber) {
        const winnerCells = this.state.winnerCells.slice();
        let aux = i;

        if(magicNumber === 1 || magicNumber === 3  || magicNumber === 5) {
            aux = i % 3;
            winnerCells.push(aux, aux+3, aux+6);
        }

        if(magicNumber === 2 || magicNumber === 3 || magicNumber === 6) {
            aux = parseInt(i/3) * 3;
            winnerCells.push(aux, aux+1, aux+2);
        }

        if(magicNumber === 4 || magicNumber === 5 || magicNumber === 6) {
            aux = i%4;
            if(aux === 2) {
                winnerCells.push(2, 4, 6);
            } else if(aux === 0) {
                winnerCells.push(0, 4, 8);
            }
        }

        this.setState({
            winnerCells: winnerCells
        });
    }

    render() {
        return (
            <div className="container">
                <div className="major-title text-center">Tic Tac Toe</div>
                <Board 
                    boardMsg={this.state.boardMsg}
                    nextPlayerChar={this.state.nextPlayerChar}
                    handleClick={i => this.handleClick(i)}
                    squares={this.state.squares}
                    winnerCells={this.state.winnerCells}
                    gameOver={this.state.gameOver}/>
                <hr />
                <div className="container text-center">
                    <button className="btn blue" 
                            onClick={() => this.restartGame()}>
                                Restart Game
                    </button>
                </div>
                <History 
                    gameOver={this.state.gameOver}
                    history={this.state.history}
                    goBackToMovement={i => this.goBackToMovement(i)}/>
            </div>    
        );
    };
}

export default Game;
