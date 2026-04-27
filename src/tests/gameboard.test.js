/* eslint-disable no-undef */
import { gameboard } from "../gameboard";
import { ship } from "../ship";

test('Create gameboard', () => {
    const game = new gameboard()
    expect(game.board[0][1].ship).toBe(null)
    expect(game.board[0][1].isHit).toBe(false)
})

test('Add ship horizontal', () => {
    const game = new gameboard()
    game.addShipHorizontal(0,1,5)

    expect(game.board[0][1].ship).toBeInstanceOf(ship)
    expect(game.board[0][2].ship).toBeInstanceOf(ship)
    expect(game.board[0][3].ship).toBeInstanceOf(ship)
    expect(game.board[0][4].ship).toBeInstanceOf(ship)
    expect(game.board[0][5].ship).toBeInstanceOf(ship)
    expect(game.board[0][6].ship).toBe(null)   
})

test('Add ship vertical', () => {
    const game = new gameboard()
    game.addShipVertical(0,1,2)

    expect(game.board[0][1].ship).toBeInstanceOf(ship)
    expect(game.board[1][1].ship).toBeInstanceOf(ship)
    expect(game.board[2][1].ship).toBe(null)
    
})

test('Cant add horizontal, to close to edge', () =>{
    const game = new gameboard()
    game.addShipHorizontal(0,7,4)

    expect(game.board[0][7].ship).toBe(null)
})

test('Cant add vertical, to close to edge', () =>{
    const game = new gameboard()
    game.addShipVertical(7,0,4)

    expect(game.board[7][0].ship).toBe(null)
})

test('Cant add horizontal, overlap another ship', () =>{
    const game = new gameboard()
    game.addShipHorizontal(2,5,4)
    game.addShipHorizontal(2,3,4)

    expect(game.board[2][3].ship).toBe(null)
    expect(game.board[2][5].ship).toBeInstanceOf(ship)
})

test('Cant add vertical, overlap another ship', () =>{
    const game = new gameboard()
    game.addShipVertical(3,5,4)
    game.addShipVertical(1,5,4)

    expect(game.board[1][5].ship).toBe(null)
    expect(game.board[3][5].ship).toBeInstanceOf(ship)
})

test('Different ships', () => {
    const game = new gameboard()
    game.addShipHorizontal(0,0,2)
    game.addShipHorizontal(1,0,2)

    expect(game.board[0][0].ship).not.toBe(game.board[1][0].ship)
})

test('Attack ship', () => {
    const game = new gameboard()
    game.addShipHorizontal(0,0,2)
    game.receiveAttack(0,0)

    expect(game.board[0][0].isHit).toBe(true)
})

test('Miss ship', () => {
    const game = new gameboard()
    game.addShipHorizontal(0,0,2)
    game.receiveAttack(1,1)
    game.receiveAttack(2,2)

    expect(game.missedShots).toContainEqual([1,1])
})

test('All ships sunk(True), only 1 ship', () => {
    const game = new gameboard()
    game.addShipHorizontal(0,0,2)
    game.receiveAttack(0,0)
    game.receiveAttack(0,1)

    expect(game.allShipsSunk()).toBe(true)
})

test('All ships sunk(True), 2 ships', () => {
    const game = new gameboard()
    game.addShipHorizontal(0,0,2)
    game.addShipHorizontal(1,0,2)
    game.receiveAttack(0,0)
    game.receiveAttack(0,1)

    game.receiveAttack(1,0)
    game.receiveAttack(1,1)

    expect(game.allShipsSunk()).toBe(true)
})

test('All ships sunk(False), only 1 ship', () => {
    const game = new gameboard()
    game.addShipHorizontal(0,0,2)
    game.receiveAttack(0,0)


    expect(game.allShipsSunk()).toBe(false)
})

test('All ships sunk(False), 2 ship, 1 sunk', () => {
    const game = new gameboard()
    game.addShipHorizontal(0,0,2)
    game.addShipHorizontal(1,0,2)
    game.receiveAttack(0,0)
    game.receiveAttack(0,1)


    expect(game.allShipsSunk()).toBe(false)
})

test('Reset gameboard', () => {
    const game = new gameboard()
    game.addShipHorizontal(0,0,2)
    game.receiveAttack(0,0)
    game.receiveAttack(0,1)

    game.clearBoard()

    expect(game.board[0][0].ship).toBe(null)
    expect(game.board[0][0].isHit).toBe(false)

    expect(game.board[0][1].ship).toBe(null)
    expect(game.board[0][1].isHit).toBe(false)
})