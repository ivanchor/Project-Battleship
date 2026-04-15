import { ship } from "./ship";


class gameboard{
    #ships = []
    #missedShots = []
    #board = Array(10)
        .fill(null)
        .map(() => Array(10).fill(null));

    constructor(){

    }

    addShip(row, column, length, direction = 'h'){
        // If length is too long, dont add ship
        // Checks column if direction not 'h'
        if(direction != 'h')
            if(column + length > 10) return false
        else
            if(row + length > 10) return false

        // Creates new ship
        const myShip = new ship(length)
        this.#ships.push(myShip)

        // Add ship to board
        for (let i = 0; i < length; i++) {
            if (direction != 'h') {
                this.#board[row + i][column] = myShip
            } else {
                this.#board[row][column + i] = myShip
            }
        }
    }

    receiveAttack(row, column){
        // If spot has been hit already, don't hit again
        if(this.#board[row][column] === 'x' || this.#board[row][column] === 'o'){
            return
        }

        // Get board cell
        const cell = this.#board[row][column]

        // Hit if ship, miss if not
        if(cell instanceof ship){
            cell.hit()
            this.#board[row][column] = 'o'
        } else {
            this.#board[row][column] = 'x'
            this.#missedShots.push([row][column])
        }
    }

    getMissedShots(){
        return this.#missedShots
    }

    wipedShips(){
        this.#board.filter
    }



    getBoard(){
        return this.#board
    }

}

export {gameboard}