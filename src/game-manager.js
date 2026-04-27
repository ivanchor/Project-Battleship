import { player } from "./player"

class gameManager{
    constructor(playerA, playerB){
        this.playerA = new player(playerA)
        this.playerB = new player(playerB)
        
        this.currentTurn = this.playerA
        this.winner = null
        this.gameOver = false
    }

    getOpponent(){
        return this.currentTurn === this.playerA
            ? this.playerB
            : this.playerA
    }

    makeMove(row, column){
        // Stop if game over
        if(this.gameOver) return

        // Get opponent board
        const opponent = this.getOpponent()
        const board = opponent.gameboard

        // If hit already, do nothing
        const tile = board.board[row][column]
        if(tile.isHit) return

        // Hit
        const result = board.attackShip(row, column)

        // Check if all ships sunk
        if(board.allShipsSunk()){
            this.winner = this.currentTurn
            this.gameOver = true
        }

        // Change turn
        this.switchTurn()

        return {
            result,
            row,
            column,
            nextPlayer: this.currentTurn,
            gameOver: this.gameOver,
            winner: this.winner
        }
    }

    switchTurn(){
        this.currentTurn =
            this.currentTurn === this.playerA
                ? this.playerB
                : this.playerA
    }

    resetGame() {
        this.currentTurn = this.playerA
        this.winner = null
        this.gameOver = false

        this.playerA.gameboard.reset()
        this.playerB.gameboard.reset()
    }
}

export {gameManager}