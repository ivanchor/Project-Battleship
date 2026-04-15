/* eslint-disable no-undef */
import { tile } from "../tile";

test('Create tile', () => {
    const myTile = new tile()
    expect(myTile.ship).toBe(null)
    expect(myTile.isHit).toBe(false)
})