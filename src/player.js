import { gameboard } from "./gameboard"

class player{
    constructor(name){
        this.name = name
        this. gameboard = new gameboard()
    }
}

export {player}