/* eslint-disable no-undef */
import { gameManager } from "../game-manager";

test('Create gameboard', () => {
    const game = new gameManager("human", "computer")

    expect(game.playerA.name).toBe("human")
    expect(game.playerB.name).toBe("computer")
    expect(game.currentTurn).toBe(game.playerA)
    expect(game.winner).toBe(null)
    expect(game.gameOver).toBe(false)
    expect(game.getOpponent()).toBe(game.playerB)
})

test('make move, hit', () => {
    const game = new gameManager("human", "computer")
    game.playerA.gameboard.addShipHorizontal(0,0,1)
    game.playerB.gameboard.addShipHorizontal(0,0,1)

    game.makeMove(0,0)


    expect(game.currentTurn).toBe(game.playerB)
    expect(game.getOpponent()).toBe(game.playerA)
    expect(game.playerB.gameboard.allShipsSunk()).toBe(true)
    expect(game.playerA.gameboard.allShipsSunk()).toBe(false)
    expect(game.winner).toBe(game.playerA)
    
})

test('make move, miss', () => {
    const game = new gameManager("human", "computer")
    game.playerA.gameboard.addShipHorizontal(0,0,1)
    game.playerB.gameboard.addShipHorizontal(0,0,1)

    game.makeMove(5,5)


    expect(game.currentTurn).toBe(game.playerB)
    expect(game.getOpponent()).toBe(game.playerA)
    expect(game.playerB.gameboard.allShipsSunk()).toBe(false)
    expect(game.playerA.gameboard.allShipsSunk()).toBe(false)
    expect(game.winner).toBe(null)
    
})

test('reset gameManager', () => {
    const game = new gameManager("human", "computer")
    game.playerA.gameboard.addShipHorizontal(0,0,1)
    game.playerB.gameboard.addShipHorizontal(0,0,1)
    game.makeMove(0,0)

    game.resetGame()

    expect(game.currentTurn).toBe(game.playerA)
    expect(game.gameOver).toBe(false)
    expect(game.winner).toBe(null)
})