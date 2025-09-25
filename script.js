class gameBoard {
    gameboardArray = [[null, null, null], [null, null, null], [null, null, null]];
    
    constructor() {

    }
    
    writeGameboardArray(sign, coordinates) {
        this.gameboardArray[coordinates[1]][coordinates[0]] = sign;
    }

    getGameboardArray() {
        return JSON.parse(JSON.stringify(this.gameboardArray));
    }

    checkIfEmpty(coordinates) {
        if (this.gameboardArray[coordinates[1]][coordinates[0]] == null) {
            return true;
        }
        else {
            return false;
        }
    }

    resetGameBoard() {
        this.gameboardArray = [[null, null, null], [null, null, null], [null, null, null]];
    }
}

class Player {
    constructor(playerSign) {
        this.sign = playerSign
    }

    chooseMove(coordinates) {
        if (gameboard.checkIfEmpty(coordinates)) {
            gameboard.writeGameboardArray(this.sign, coordinates)
            return 0;
        }
        else {
            return 420;
        }
    }
}

class Game {
    numMoves = 0
    xPlayer = new Player('X')
    oPlayer = new Player('O')
    gameWinner = false

    resetGame() {
        gameboard.resetGameBoard()
        this.oPlayer = new Player('O')
        this.xPlayer = new Player('X')
        this.gameWinner = false
        this.numMoves = 0
    }

    checkIfGameOver() {
        const gameboardArrayClone = gameboard.getGameboardArray()
        //check if game won by X
        if (this.gameWinner == false){
            
            if (
                //Check for horizontal cases
                (gameboardArrayClone[0][0] == 'X' && gameboardArrayClone[0][1] == 'X' && gameboardArrayClone[0][2] == 'X') ||
                (gameboardArrayClone[1][0] == 'X' && gameboardArrayClone[1][1] == 'X' && gameboardArrayClone[1][2] == 'X') ||
                (gameboardArrayClone[2][0] == 'X' && gameboardArrayClone[2][1] == 'X' && gameboardArrayClone[2][2] == 'X') ||

                //Check for vertical cases
                (gameboardArrayClone[0][0] == 'X' && gameboardArrayClone[1][0] == 'X' && gameboardArrayClone[2][0] == 'X') ||
                (gameboardArrayClone[0][1] == 'X' && gameboardArrayClone[1][1] == 'X' && gameboardArrayClone[2][1] == 'X') ||
                (gameboardArrayClone[0][2] == 'X' && gameboardArrayClone[1][2] == 'X' && gameboardArrayClone[2][2] == 'X') ||

                //Check for diagonal cases
                (gameboardArrayClone[0][0] == 'X' && gameboardArrayClone[1][1] == 'X' && gameboardArrayClone[2][2] == 'X') ||
                (gameboardArrayClone[0][2] == 'X' && gameboardArrayClone[1][1] == 'X' && gameboardArrayClone[2][0] == 'X')
            ) 
            {
                this.gameWinner = 'X'
            }

            //Check if game won by O
            else if (
                //Check for horizontal cases
                (gameboardArrayClone[0][0] == 'O' && gameboardArrayClone[0][1] == 'O' && gameboardArrayClone[0][2] == 'O') ||
                (gameboardArrayClone[1][0] == 'O' && gameboardArrayClone[1][1] == 'O' && gameboardArrayClone[1][2] == 'O') ||
                (gameboardArrayClone[2][0] == 'O' && gameboardArrayClone[2][1] == 'O' && gameboardArrayClone[2][2] == 'O') ||

                //Check for vertical cases
                (gameboardArrayClone[0][0] == 'O' && gameboardArrayClone[1][0] == 'O' && gameboardArrayClone[2][0] == 'O') ||
                (gameboardArrayClone[0][1] == 'O' && gameboardArrayClone[1][1] == 'O' && gameboardArrayClone[2][1] == 'O') ||
                (gameboardArrayClone[0][2] == 'O' && gameboardArrayClone[1][2] == 'O' && gameboardArrayClone[2][2] == 'O') ||

                //Check for diagonal cases
                (gameboardArrayClone[0][0] == 'O' && gameboardArrayClone[1][1] == 'O' && gameboardArrayClone[2][2] == 'O') ||
                (gameboardArrayClone[0][2] == 'O' && gameboardArrayClone[1][1] == 'O' && gameboardArrayClone[2][0] == 'O')
            )
            {
                this.gameWinner = 'O'
            }

            else if (this.numMoves == 9) {
                this.gameWinner = 'Draw'
            }
        }
        return this.gameWinner
        
    }
        

    gameMove(coordinate) {
        let moveResult = 0

        if (this.numMoves%2 == 0) {     //Player 1 move
            moveResult = this.xPlayer.chooseMove(coordinate)
            console.log(gameboard.getGameboardArray())
        }
        else {                  //Player 2 move
            moveResult = this.oPlayer.chooseMove(coordinate)
            console.log(gameboard.getGameboardArray())
        }
        if (moveResult == 0) {
            this.numMoves++;
        }
    }

}



const game = new Game;
const gameboard = new gameBoard;

//DOM stuff
const grid = document.querySelector("#ttt-grid")
const gameResult = document.querySelector("#game-result")
const resetButton = document.querySelector("#reset-button")
function resetGrid() {
    grid.innerHTML = "<div data-coord='00'></div>   <div data-coord='10'></div>  <div data-coord='20'></div>  <div data-coord='01'></div>   <div data-coord='11'></div>     <div data-coord='21'></div>     <div data-coord='02'></div>     <div data-coord='12'></div>     <div data-coord='22'></div>"
}

function handleGridClick(event) {
    let DOMCoordinate = event.target.dataset.coord;
    game.gameMove(DOMCoordinate)
    event.target.innerHTML = gameboard.getGameboardArray()[DOMCoordinate[1]][DOMCoordinate[0]]
    
    let gameOverResult = game.checkIfGameOver()
    if (gameOverResult != false) {
        if (gameOverResult == 'X') {
            gameResult.innerHTML = 'Game over; X won'
        }
        else if(gameOverResult == 'O') {
            gameResult.innerHTML = 'Game over; O won'
        }
        else if(gameOverResult == 'Draw') {
            gameResult.innerHTML = 'Game over; Draw'
        }
        event.target.parentNode.removeEventListener('click', handleGridClick)
    }
}


grid.addEventListener('click', handleGridClick)
resetButton.addEventListener('click', () => {
    resetGrid()
    game.resetGame()
    gameResult.innerHTML = ''
    grid.addEventListener('click', handleGridClick)
})