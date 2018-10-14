import React, { Component } from 'react';
import './App.css';

class App extends Component{

  constructor() {
    super();
    this.state = {
      /*turn: 'X',
      gameEnded: false, */
      winner: undefined,
      board: Array(9).fill(''),
      /*totalMoves: 0*/
    }
    this.gameState = {
      turn: 'X',
      gameLocked: false,
      gameEnded: false,
      board: Array(9).fill(''),
      totalMoves: 0
    }
  }

  clicked(box){

    if(this.gameState.gameEnded || this.gameState.gameLocked) return;

    /* Prevent duplication*/
    if(this.gameState.board[box.dataset.square] == ''){
      this.gameState.board[box.dataset.square] = this.gameState.turn;
      box.innerText = this.gameState.turn;

      /* If statement within the getState.
          if turn = X; continue
          else turn = O;
          else turn = O;
       */
      /*this.setState({*/
      /*  turn: this.state.turn == 'X' ? 'O' : 'X', */
        /*board: this.state.board,*/
        /*totalMoves: this.state.totalMoves++*/
      /*})*/

      this.gameState.turn = this.gameState.turn == 'X' ? 'O' : 'X'
    }

    var result = this.checkWinner();

    if (result == 'X') {
      this.gameState.gameEnded = true;
      this.setState({
        /*gameEnded: true,*/
        winner: 'X',
        winnerLine: 'Match won by X'
      });
    }else if (result == 'O') {
      this.gameState.gameEnded = true;
      this.setState({
        /*gameEnded: true,*/
        winner: 'O',
        winnerLine: 'Match won by O'
      });

    }else if (result == 'draw') {
      this.gameState.gameEnded = true;
      this.setState({
        /*gameEnded: true,*/
        winner: 'draw',
        winnerLine: 'Match has drawn'
      });
    }

    if (this.gameState.turn == 'O' && !this.gameState.gameEnded) {

      /* Time Delay*/
      setTimeout(()=>{
        this.gameState.gameLocked = true;
        do{
          var random = Math.floor(Math.random()*9);

        }while (this.gameState.board[random] != '');
        this.gameState.gameLocked = false;
        this.clicked(document.querySelectorAll('.square')[random]);
      }, 1000);

    }

  }


  /* Winner logic*/
  checkWinner(){

    /*winner moves*/
    var moves = [[0,3,6],[1,4,7],[2,5,8], /* columns */
                [0,4,8],[2,4,6],          /* diagonals */
                [0,1,2],[3,4,5],[6,7,8]];  /* rows */

    /* Check board for winner */
    var board = this.gameState.board;
    for(let i = 0; i<moves.length;i++){
      if(board[moves[i][0]] == board[moves[i][1]] && board[moves[i][1]] == board[moves[i][2]]){
        return board[moves[i][0]]
      }
    }

    if(this.gameState.totalMoves == 9){
      return 'draw';
    }
  }




  render() {
    return (
      <div id = "game">
          <div id = "status">{this.state.winnerLine}</div>
          <div id = "head">
            Tic Tac toe Game
          </div>
          <div id = "board" onClick={(e)=>this.clicked(e.target)}>
            <div className = "square" data-square = "0"></div>
            <div className = "square" data-square = "1"></div>
            <div className = "square" data-square = "2"></div>
            <div className = "square" data-square = "3"></div>
            <div className = "square" data-square = "4"></div>
            <div className = "square" data-square = "5"></div>
            <div className = "square" data-square = "6"></div>
            <div className = "square" data-square = "7"></div>
            <div className = "square" data-square = "8"></div>
          </div>
      </div>
    );
  }
}

export default App;
