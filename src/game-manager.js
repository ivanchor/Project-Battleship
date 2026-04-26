class gameManager{
    constructor(playerA, playerB){
        this.playerA = playerA
        this.playerB = playerB
        
        this.currentTurn = playerA
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
        const opponent = this.getOpponent
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

        // If no winner, change turn
        if(!this.gameOver) this.swtichTurn()

        return {
            result,
            row,
            column,
            nextPlayer: this.currentTurn,
            gameOver: this.gameOver,
            winner: this.winner
        }
    }

    switchTUrn(){
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