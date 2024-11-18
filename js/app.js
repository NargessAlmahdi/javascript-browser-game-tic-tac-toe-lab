/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
/*---------------------------- Variables (state) ----------------------------*/
let board = ['', '', '', '', '', '', '', '', '']
let turns = 'X'
let winner = false
let tie = false

/*------------------------ Cached Element References ------------------------*/
const squaresEls = document.querySelectorAll('.sqr')
let messageEl = document.querySelector('#message')
// const squareIndex = document.querySelectorAll('#id')
const resetBtnEl = document.querySelector('#reset')
/*-------------------------------- Functions --------------------------------*/
function init () {
    board = ['', '', '', '', '', '', '', '', '']
    turns = 'X'
    winner = false
    tie = false
    render()
    messageEl.textContent = "X, it's your turn!"
}
function render() {
    updateBoard()
    updateMessage()
}

function placePiece (index){
    if(board[index] === '' && !winner && !tie) {
        board[index] = turns

        const squareEl = squaresEls[index]
        if(turns === 'X'){
            squareEl.style.color = '#ED1B84'
    }
    else{
        squareEl.style.color = '#F4EF29'
    }
    }

    console.log(board)
}
function checkForWinner () {
    if (board[0] !== '' && board[0] === board[1] && board[0] === board[2]){
        winner = true
    }
    if (board[3] !== '' && board[3] === board[4] && board[3] === board[5]){
        winner = true
    }
    if (board[6] !== '' && board[6] === board[7] && board[6] === board[8]){
        winner = true
    }
    if (board[0] !== '' && board[0] === board[3] && board[0] === board[6]){
        winner = true
    }
    if (board[1] !== '' && board[1] === board[4] && board[1] === board[7]){
        winner = true
    }
    if (board[2] !== '' && board[2] === board[5] && board[2] === board[8]){
        winner = true
    }
    if (board[0] !== '' && board[0] === board[4] && board[0] === board[8]){
        winner = true
    }
    if (board[2] !== '' && board[2] === board[4] && board[2] === board[6]){
        winner = true
    }
}
function updateBoard () {
    board.forEach((value, index) => {
        squaresEls[index].textContent = value
    })
}
function updateMessage () {
    if (winner){
        messageEl.textContent = `${turns} won!`
    }
    else if (tie){
        messageEl.textContent = `It's a tie!`
    } 
    else {
        messageEl.textContent = `${turns}, it's your turn!`
    }
}
function handleClick(squareIndex) {
    placePiece(squareIndex)
    checkForWinner()
    checkForTie()
    switchPlayerTurn()
    render()
}

function resetBoard(){
    board = ['', '', '', '', '', '', '', '', '']
    if (tie === true){
        if(turns === 'O'){
            turns = 'O'
        }else{
            turns = 'X'
        }
    }else{
        if(winner === true && turns === 'X'){
            turns = 'O'
        }else{
            turns = 'X'
        }
    }
    
    winner = false
    tie = false
    render()
}

function switchPlayerTurn () {
    if (winner === true){
        return
    }
    if (turns === 'X') {
        turns = 'O'
    } else if (turns === 'O'){
        turns = 'X'
    }
    console.log(`Current turn is ${turns}`)
    }
function checkForTie () {
    if (winner === true){
        return
    } 
    else if (!board.includes('')){
        tie = true
    } 
    else {
        tie = false
    }
    console.log(`Is there a tie: ${tie}`)
}
/*----------------------------- Event Listeners -----------------------------*/
squaresEls.forEach((squareEl, squareIndex) => {
    squareEl.addEventListener('click', () => handleClick(squareIndex))
})
resetBtnEl.addEventListener('click', () => resetBoard())

