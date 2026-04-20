/* eslint-disable no-undef */
import { player } from "../player";

test('Create player', () => {
    const human = new player("person")

    expect(human.name).toBe("person")
})