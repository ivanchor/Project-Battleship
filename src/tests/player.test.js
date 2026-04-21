/* eslint-disable no-undef */
import { player } from "../player";
import { ship } from "../ship";

test('Create player', () => {
    const human = new player("person")

    expect(human.name).toBe("person")
})

test('Create player', () => {
    const human = new player("person")
    human.gameboard.addShipHorizontal(0,0,1)
    expect(human.gameboard.board[0][0].ship).toBeInstanceOf(ship)
})