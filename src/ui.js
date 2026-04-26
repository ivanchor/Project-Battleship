const ui = (() => {

    // Render gameboards for player
    function renderBoard(player){
        let gameboard = player.gameboard
        // Table to show gameboard
        const table = document.createElement("table")
        // headers, eg. A B C
        const header = document.createElement("thead")
        const headerRow = document.createElement("tr")
        // Body of game board, actual board
        const body = document.createElement("tbody");
        
        // Skip first column, create headers, A B C, for horizontal axis
        for(let boardColumn = 0; boardColumn < 10+1; boardColumn++){
            const headerLetter = `${String.fromCharCode(64 + boardColumn)}`
            const columnHeader = document.createElement("th")
            
            if(boardColumn > 0){
                columnHeader.textContent = headerLetter
            }
            headerRow.append(columnHeader)
        }

        // Create rows for board
        for(let boardRow = 0; boardRow < 10; boardRow++){
            // Create Row, add header number, 1 2 3, for vertical axis
            const row = document.createElement("tr")
            const rowHeader = document.createElement("th")
            rowHeader.textContent = `${boardRow + 1}`
            row.append(rowHeader)

            // Create tabledata cells for gameboard tiles
            for(let boardColumn = 0; boardColumn < 10; boardColumn++){
                let tile = gameboard.board[boardRow][boardColumn]
                const tileHTML = document.createElement("td")
                tileHTML.dataset.x = boardRow
                tileHTML.dataset.y = boardColumn

                if(tile.ship !== null) tileHTML.textContent = "S"
                row.append(tileHTML)
            } 
            body.append(row)
        }
        header.append(headerRow)
        table.append(header, body)
        return table
    }

    // Render game area for both players
    function renderGameScreen(playerOne, playerTwo){
        const battleScreen = document.createElement("div")
        battleScreen.classList.add("game-screen")

        const playerOneBattlefieldName = `${playerOne.name}'s Armada`
        const playerTwoBattlefieldName = `${playerTwo.name}'s Armada`

        const playerOneBoard = this.renderBoard(playerOne)
        const playerTwoBoard = this.renderBoard(playerTwo)

        battleScreen.innerHTML = `
            <div class="battlefield-container battlefield-container-one">
                <div class="battlefield-name">${playerOneBattlefieldName}</div>
                <div class="battlefield battlefield-one"></div>
            </div>
            <div class="battlefield-container battlefield-container-two">
                <div class="battlefield-name enemy">${playerTwoBattlefieldName}</div>
                <div class="battlefield battlefield-two"></div>
            </div>
        `

        battleScreen
            .querySelector(".battlefield-one")
            .appendChild(playerOneBoard);

        battleScreen
            .querySelector(".battlefield-two")
            .appendChild(playerTwoBoard);

        return battleScreen;
    }

    // Render start screen
    function renderStartScreen(){
        const titleScreen = document.createElement("div")
        titleScreen.classList.add("title-screen")
        titleScreen.innerHTML = `
            <div class="titleScreen-text">Battlefield</div>
            <button class="titleScreen-start-button">Start Game</div>
        `
        
        return titleScreen
    }

    // Render game over screen
    function renderGameOverScreen(winner){
        const gameOverScreen = document.createElement("div")
        gameOverScreen.classList.add("gameOver-screen")

        const winnerName = `${winner.name} wins`

        gameOverScreen.innerHTML = `
            <div class="gameOverScreen-text">Game Over ${winnerName}</div>
            <button class="gameOverScreen-button">Play Again</div>
        `
        return gameOverScreen
    }

    return {renderBoard, renderGameScreen, renderStartScreen, renderGameOverScreen}
})() 

export {ui}