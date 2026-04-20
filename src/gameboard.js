import { ship } from "./ship";
import { tile } from "./tile";

class gameboard{

    constructor(){
        this.ships = []
        this.missedShots = []
        this.board = this.createBoard()

    }

    createBoard(){
        const board = Array(10)
            .fill(null)
            .map(() => Array(10)
            .fill(null)
            .map(() => new tile()))
        return board
    }

    addShipHorizontal(row, column, length){
        // If length is too long, dont add ship, result in out of bounds ship
        if(column + length > 10) return false

        // Check ship would overlap another ship
        for (let i = 0; i < length; i++)
            if (this.board[row][column + i].ship !== null) 
                return false;

        // Creates new ship
        const myShip = new ship(length)
        this.ships.push(myShip)

        // Add ship to board
        for (let i = 0; i < length; i++) {
            this.board[row][column + i].ship = myShip
        }
    }
    

    addShipVertical(row, column, length){
        // If length is too long, dont add ship, result in out of bounds ship
        if(row + length > 10) return false

        // Check ship would overlap another ship
        for (let i = 0; i < length; i++)
            if (this.board[row + i][column].ship !== null) 
                return false;

        // Creates new ship
        const myShip = new ship(length)
        this.ships.push(myShip)

        // Add ship to board
        for (let i = 0; i < length; i++) {
            this.board[row + i][column].ship = myShip
        }
    }

    receiveAttack(row, column){
        // Get board tile
        const boardTile = this.board[row][column]

        // Get ship
        const boardShip = boardTile.ship
        
        // If spot has been hit already, don't hit again
        if(boardTile.isHit) return

        // If tile is ship, hit ship
        if(boardShip) this.attackShip(row, column)
            
        // If tile not ship, add attack to missedShots
        if(!boardShip) this.attackMiss(row, column)

        // Change tile isHit status to true
        boardTile.isHit = true
    }

    attackShip(row, column){
        const ship = this.board[row][column].ship
        ship.hit()
    }

    attackMiss(row, column){
        this.missedShots.push([row, column])
    }

    allShipsSunk(){
        // Goes through ship list, if any are not sunk, return false
        for(let i = 0; i<this.ships.length; i++){
            if(!this.ships[i].isSunk())
                return false
        }
        return true
    }

}

export {gameboard}