export default function CreateBoard(rowLength, columnLength, numberOfBombsNeedingPlacement){
    // bomb number is based on rowLength value
    let defaultValues = {
        isThisABomb: "",
        bombProxyCount: 0,
        flagged: false,
        revealed: false
    };
    let gameboardArray = [];
    // Do not know why this does not work
    // let gameboardArray = new Array(rowLength).fill(new Array(columnLength).fill(Object.assign({}, defaultValues)) ))
    for (let row = 0; row < rowLength; row++) {
        let newColumn = [];
        for (let column = 0; column < columnLength; column++) {
          newColumn.push({...defaultValues});
        }
        gameboardArray.push(newColumn);
      }
    let bombPlacementArray = [];
    let numberOfBombsPlaced = 0;
    while(numberOfBombsPlaced < numberOfBombsNeedingPlacement){
        const randomRow = Math.floor(Math.random() * rowLength);
        const randomCol = Math.floor(Math.random() * columnLength);
        if(gameboardArray[randomRow][randomCol].isThisABomb === ""){
            gameboardArray[randomRow][randomCol].isThisABomb = "X";
            bombPlacementArray.push([randomRow, randomCol]);
            numberOfBombsPlaced++;
          }
    }

    // Lets count all the squares with bombs as neighbors
    for (let row = 0; row < rowLength; row++) {
        for (let column = 0; column < columnLength; column++) {
          if (gameboardArray[row][column].isThisABomb === "X") {
            continue;
          }else{
			gameboardArray[row][column].bombProxyCount = (
				// Direct Top
				Number(gameboardArray[row === 0 ? 0 :row - 1][column].isThisABomb === "X") +
				// Direct Bottom
				Number(gameboardArray[row + 1 === rowLength ? row : row + 1][column].isThisABomb === "X") +
				// Direct Left
				Number(gameboardArray[row][column === 0 ? 0 : column - 1].isThisABomb === "X") +
				// Direct Right
				Number(gameboardArray[row][column + 1 === columnLength ? column : column + 1].isThisABomb === "X") +
				// Top Left
				Number(gameboardArray[row === 0 ? 0 :row - 1][column === 0 ? 0 : column - 1].isThisABomb === "X") +
				// Bottom Left
				Number(gameboardArray[row + 1 === rowLength ? row : row + 1][column === 0 ? 0 : column - 1].isThisABomb === "X") +
				// Top Right
				Number(gameboardArray[row === 0 ? 0 :row - 1][column + 1 === columnLength ? column : column + 1].isThisABomb === "X") +
				// Bottom Right
				Number(gameboardArray[row + 1 === rowLength ? row : row + 1][column + 1 === columnLength ? column : column + 1].isThisABomb === "X")
			)
		  }
        
        }
      }
    return {board: gameboardArray };
}

