/* eslint-disable no-undef */
import { ship } from "../ship";

test('Hit counter increase', () => {
    const myShip = new ship(5)
    myShip.hit()
    expect(myShip.getHitCounter()).toBe(1)
})

test('Ship not sunk', () =>{
    const myShip = new ship(5)
    expect(myShip.isSunk()).toBe(false)
})

test('Ship is sunk', () =>{
    const myShip = new ship(5)
    myShip.hit()
    myShip.hit()
    myShip.hit()
    myShip.hit()
    myShip.hit()
    expect(myShip.isSunk()).toBe(true)
})