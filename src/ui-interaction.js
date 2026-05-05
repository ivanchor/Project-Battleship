import { ui } from "./ui";
import { gameManager } from "./game-manager";

// Values needed to run game
    const game = new gameManager("Human", "CPU")
    const playerA = game.playerA
    const playerB = game.playerB


// Select '.battlefield-body' to change HTML
const body = document.querySelector(".battlefield-body")

// Start screen
function startScreen(){
    const screen = ui.renderStartScreen()
    body.replaceChildren(screen)

    const startButton = document.querySelector(".titleScreen-start-button")
    startButton.addEventListener("click", () => {
        gameScreen()
    })
}

// Gaming screen
function gameScreen(){
    addPlayerShips()
    addComputerShips()
    const screen = ui.renderGameScreen(playerA, playerB)
    body.replaceChildren(screen)

    const cpuBoard = document.querySelector(".battlefield-two")
    cpuBoard.addEventListener("click", (e) => cpuBoardClick(e))
}

// Clicking on cpu board to attack
function cpuBoardClick(e){
    if(game.currentTurn === playerB) return

    // Get HTML for cpu board
    const cpuBoard = document.querySelector(".battlefield-two table")
    // Get HTML for current turn
    const currentTurn = document.querySelector(".current-turn")

    // Get tile by clicking
    const clickedTile = e.target.closest("td")

    // If not tile, e.g labels, or grid lines, do nothing
    if(!clickedTile) return

    // Get row and column of tile
    const row = clickedTile.dataset.x
    const column = clickedTile.dataset.y

    const move = game.makeMove(row, column)
    
    // If tile has been clicked, dont make move 
    if(!move) return

    // Not game over
    if(!move.gameOver){
        const currentPlayer = `Current Turn: ${game.currentTurn.name}`
        currentTurn.replaceChildren(currentPlayer)
        // Cpu makes move after player
        cpuAttack()
    }
    else{
        gameOverScreen()
    }

    // const opBoard = game.getOpponent()
    // console.log(`Current Turn: ${game.currentTurn.name}`)
    // console.log(`Clicked on tile: ${row}, ${column}`)
    // console.log(`Tile hit status: ${opBoard.gameboard.board[row][column].isHit}`)

    // Replace cpu board with new updated UI
    const newBoard = ui.renderBoard(playerB, true)
    cpuBoard.replaceChildren(newBoard)


}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

// Computer attack, after player move
async function cpuAttack(){
    const humanBoard = document.querySelector(".battlefield-one table")

    const delay = Math.floor(Math.random() * 2000)
    await wait(delay)

    let move = null

    while (!move) {
        const cpuRow = Math.floor(Math.random() * 10)
        const cpuColumn = Math.floor(Math.random() * 10)

        move = game.makeMove(cpuRow, cpuColumn)

        // If already attacked, try again
        if(!move) continue

        if(move.gameOver) gameOverScreen()
        //console.log(`CPU attacked: Row ${cpuRow}, Column ${cpuColumn}`)
    }
    // Get HTML for current turn
    const currentTurn = document.querySelector(".current-turn")
    const currentPlayer = `Current Turn: ${game.currentTurn.name}`
    currentTurn.replaceChildren(currentPlayer)

    const newBoard = ui.renderBoard(playerA, false)
    humanBoard.replaceChildren(newBoard)

}

// Game Over Screen
function gameOverScreen(){
    const screen = ui.renderGameOverScreen(game.winner)
    body.replaceChildren(screen)

    const restartButton = document.querySelector(".gameOverScreen-button")
    restartButton.addEventListener('click', () => {
        game.resetGame()
        startScreen()
    })
}

// Add ships to player board
function addPlayerShips(){
    game.playerA.gameboard.addShipHorizontal(0,0,2)
    game.playerA.gameboard.addShipHorizontal(2,4,5)
    game.playerA.gameboard.addShipHorizontal(9,4,3)
    game.playerA.gameboard.addShipVertical(5,7,3)
    game.playerA.gameboard.addShipVertical(4,3,4)

    // game.playerA.gameboard.receiveAttack(0,0)
    // game.playerA.gameboard.receiveAttack(1,0)

}

// Add ships to computer board
function addComputerShips(){
    game.playerB.gameboard.addShipHorizontal(0,3,2)
    game.playerB.gameboard.addShipHorizontal(6,2,3)
    game.playerB.gameboard.addShipHorizontal(8,1,5)
    game.playerB.gameboard.addShipVertical(2,0,3)
    game.playerB.gameboard.addShipVertical(3,8,4) 
}

function runGame(){
    startScreen()
}

export {runGame}