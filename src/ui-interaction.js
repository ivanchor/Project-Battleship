import { ui } from "./ui";
import { player } from "./player";
import { gameManager } from "./game-manager";

// Values needed to run game
    const playerA = new player("Human")
    const playerB = new player("CPU")


// Select '.battlefield-body' to change HTML
const body = document.querySelector(".battlefield-body")

// Start screen
function startScreen(){
    const screen = ui.renderStartScreen()
    body.replaceChildren(screen)

    const startButton = document.querySelector(".titleScreen-start-button")
    startButton.addEventListener("click", () => {
        console.log("PRESSED BUTTON")
    })
}

// Gaming screen
function gameScreen(){
    const screen = ui.renderGameScreen()
}

function runGame(){
    // const playerA = new player("Human")
    // const playerB = new player("CPU")

    // // Add ships to playerA, Human
    // playerA.gameboard.addShipHorizontal(0,0,2)
    // playerA.gameboard.addShipHorizontal(2,4,5)
    // playerA.gameboard.addShipHorizontal(9,4,3)
    // playerA.gameboard.addShipVertical(5,7,3)
    // playerA.gameboard.addShipVertical(4,3,4)

    // // Add ships to playerB, CPU


    // const gameScreen = ui.renderGameScreen(playerA, playerB)
    // const startScreen = ui.renderStartScreen()
    // const gameOverScreen = ui.renderGameOverScreen(playerA)



    // // const body = document.querySelector("body")
    // body.append(gameScreen)
    // body.append(startScreen)
    // body.append(gameOverScreen)
    startScreen()
}

export {runGame}