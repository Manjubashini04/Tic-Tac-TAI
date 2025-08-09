export const checkWinner = (board) => {

    const lines = [
        [0, 1, 2], // Top Row 
        [3, 4, 5], // Middle Row
        [6, 7, 8], // Bottom Row

        [0, 3, 6], // Left Column
        [1, 4, 7], // Middle Column
        [2, 5, 8], // Right Column

        [0, 4, 8], // Diagonal from Top Left to Bottom-Right diagonal
        [2, 4, 6]  // Diagonal from Top Right to Bottom-Left diagonal
    ];

    //loop through each possible winninh

    for (let line of lines) {

        const [a, b, c] = line;
        // check if
        //There's something in board[a] (not null)
        //and board[a] is equal to board[b]
        //board[a] == board[c]
        if(board[a] && board[a] === board[b] && board[a] === board[c]){
            return {winner: board[a], line}; // return "X" or "O"
        }
    }
    // if no winner found but all cells are failed, its a draw
    if(board.every(cell => cell !== null)){
        return {winner: "draw", line: []}; // return "draw"
    }
    //if no winner and the board is not full yet, return null(game continues)
    return null;// game continues
}