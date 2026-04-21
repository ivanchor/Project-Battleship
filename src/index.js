import "./style.css"

import { ui } from "./ui";
import { player } from "./player";

const playerA = new player("Human")
const playerB = new player("CPU")
playerA.gameboard.addShipHorizontal(0,0,1)
let boardA = ui.renderBoard(playerA)
let boardB = ui.renderBoard(playerB)
const gameScreen = ui.renderGameScreen(playerA, playerB)




const body = document.querySelector("body")
body.append(gameScreen)
// body.append(boardA)
// body.append(boardB)
// body.append(ui.renderGameScreen())