import React from 'react';
import logo from './logo.svg';
import './App.css';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';

/*This function takes props as an input and return what should be rendered*/
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
/* change the code to pass props called a value to the square */
class Board extends React.Component {
  /*we are defining a constructor to take the values from propes that is properties*/
  constructor(props) {
    super(props);
    /*defining the initial state of a variable*/
    this.state = {
      /*we are creating 9 empty blocks of array*/ 
      squares: Array(9).fill(null),
      /*we are assigning x as first defaultly*/
      xIsNext: true,
    };
  }

  handleClick(i) {
    /*slice selets the portion of an array on which we have clicked*/
    const squares = this.state.squares.slice();
    
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    /*whenever the set state is called the render method wil be called automatically */
    this.setState({
      squares: squares,
      /*Each time a player moves x will be flip to zero and vice versa*/
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
      /*The value of current box is assingned to the variable value*/
        value={this.state.squares[i]}
        /*binding thw handleclick function to onclick variable*/
        onClick={() => this.handleClick(i)}
      />
    );
  }
/*calling render method*/
  render() {
    /*Storing the result to winner contant*/
    const winner = calculateWinner(this.state.squares);
    /*declaring a variable named status*/
    let status;
    if (winner) {
      /*displaying the winner*/
      status = 'Winner: ' + winner;
    } else {
      /*if the winner is not yet known we need to ask next player to enter*/
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
   /*returns the value of the each boxes*/
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
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
        </div>
      </div>
    );
  }
}
/* making the class as default*/
export default class Game extends React.Component {
  render() {
    /*calling the class named Board*/
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  /*calling the game class*/ 
  <Game />,
  document.getElementById('root')
);

/*Finding the winner by checking the rules*/
function calculateWinner(squares) {
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
