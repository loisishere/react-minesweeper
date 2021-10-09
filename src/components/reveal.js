export default function reveal(row, column, board) {

     if(board[row][column].isThisABomb === "" && board[row][column].revealed === false && board[row][column].flagged === false){
       
         if(board[row][column].bombProxyCount === 0){
             if(column > 0){
                board[row][column].revealed = true;
                reveal(row, column - 1, board);
             }
             if(column < board[row].length - 1){
                board[row][column].revealed = true;
                reveal(row, column + 1,board);
             }
             if(row > 0){
                board[row][column].revealed = true;
                reveal(row - 1, column,board);
             }
             if(row < board.length - 1){
                board[row][column].revealed = true;
                reveal(row + 1, column,board);
             }
             if(column > 0 && row > 0){
                board[row][column].revealed = true;
                reveal(row - 1, column - 1, board);
             }
             if(column > 0 && row < board.length - 1){
                board[row][column].revealed = true;
                reveal(row + 1, column - 1, board);
             }
             if(column < board[row].length - 1 && row > 0){
                board[row][column].revealed = true;
                reveal(row - 1, column + 1, board);
             }
             if(column < board[row].length - 1 && row < board.length - 1){
                board[row][column].revealed = true;
                reveal(row + 1, column + 1, board);
             }

             
            }
            else{
            if(column > 0 && board[row][column - 1].bombProxyCount === 0){
               board[row][column].revealed = true;
               reveal(row, column - 1, board);
            }
            if(column < board[row].length - 1 && board[row][column + 1].bombProxyCount === 0){
               board[row][column].revealed = true;
               reveal(row, column + 1,board);
            }
            if(row > 0 && board[row - 1][column].bombProxyCount === 0){
               board[row][column].revealed = true;
               reveal(row - 1, column,board);
            }
            if(row < board.length - 1 && board[row + 1][column].bombProxyCount === 0){
               board[row][column].revealed = true;
               reveal(row + 1, column,board);
            }
            if(column > 0 && row > 0 && board[row - 1][column - 1].bombProxyCount === 0){
               board[row][column].revealed = true;
               reveal(row - 1, column - 1, board);
            }
            if(column > 0 && row < board.length - 1 && board[row + 1][column - 1].bombProxyCount === 0){
               board[row][column].revealed = true;
               reveal(row + 1, column - 1, board);
            }
            if(column < board[row].length - 1 && row > 0  && board[row - 1][column + 1].bombProxyCount === 0){
               board[row][column].revealed = true;
               reveal(row - 1, column + 1, board);
            }
            if(column < board[row].length - 1 && row < board.length - 1 && board[row + 1][column + 1].bombProxyCount === 0){
               board[row][column].revealed = true;
               reveal(row + 1, column + 1, board);
            }
        }
     }
     return board;
   }