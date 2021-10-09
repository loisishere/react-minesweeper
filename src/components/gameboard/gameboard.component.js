import { useState, useEffect } from "react";
import GameRowComponent from "../gamerow/gamerow.component";
import "./gameboard.component.css";
import CreateBoard from "../create";
import reveal from "../reveal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSmile,
  faDizzy,
  faSurprise,
  faGrinStars,
} from "@fortawesome/free-regular-svg-icons";

function GameboardComponent() {
  const [gameboardState, setGameboard] = useState([]);
  const [levelState, setLevel] = useState("easy");
  const [gameOverState, setGameOver] = useState(false);
  const [gameStatusState, setGameStatus] = useState("");
  const [flaggedBombsState, setFlaggedBombs] = useState(0);
  const [smilingResetState, setSmilingReset] = useState(faSmile);
  const levels = { easy: [9, 9, 10], medium: [16, 16, 40], hard: [16, 30, 99] };
  const setBoard = () => {
    // Default easy setting
    const newBoard = CreateBoard(...levels[levelState]);
    setGameboard(newBoard);
  };
  const restartBoard = () => () => {
    // Default easy setting
    const restartedBoard = CreateBoard(...levels[levelState]);
    setGameOver(false);
    setGameboard(restartedBoard);
  };
  useEffect(() => {
    setBoard();
  }, []);

  useEffect(() => {
    setBoard();
  }, [levelState]);

  useEffect(() => {
    const gamboardSize = gameboardState.board
      ? gameboardState.board.flatMap((board) => board).length
      : 0;
    setFlaggedBombs(
      gameboardState.board
        ? gameboardState.board
            .flatMap((board) => board)
            .filter((cell) => cell.flagged === true && cell.isThisABomb === "X")
            .length
        : 0
    );
    const revealed = gameboardState.board
      ? gameboardState.board
          .flatMap((board) => board)
          .filter((cell) => cell.revealed === true && cell.isThisABomb === "")
          .length
      : 0;
    if (gamboardSize > 0 && gamboardSize - flaggedBombsState === revealed) {
      setGameOver(true);
      setSmilingReset(faGrinStars);
      setGameStatus("You Win");
    }
    setSmilingReset(faSmile);
  }, [gameboardState, flaggedBombsState]);

  const onChangeHandler = () => (event) => {
    setLevel(event.target.value);
  };
  const onMouseDownHandler = () => () => {
    setSmilingReset(faSurprise);
  };
  const onClickHandler = (row, column) => () => {
    if (
      gameboardState.board[row][column].isThisABomb === "X" &&
      gameboardState.board[row][column].flagged === false
    ) {
      setGameOver(true);
      setSmilingReset(faDizzy);
      setGameStatus("You Lose!");
      return;
    }
    const revealedBoard = { board: reveal(row, column, gameboardState.board) };
    setGameboard(revealedBoard);
  };

  const onKeyPressHandler = (row, column) => (event) => {
    if (event.which === 32) {
      const flaggedBoard = {
        board: gameboardState.board.map((game_row, row_index) =>
          game_row.map((game_column, column_index) =>
            row_index === row && column_index === column
              ? { ...game_column, flagged: !game_column.flagged }
              : game_column
          )
        ),
      };
      setGameboard(flaggedBoard);
    }
  };
  return (
    <div className={`gameboard ${gameOverState ? "gameOver" : ""}`}>
      <select value="easy" onChange={onChangeHandler()}>
        <option value="easy">Easy 9x9; 10 bombs</option>
        <option value="medium">Medium 16x16; 40 bombs</option>
        <option value="hard">Hard 16x30; 99 bombs</option>
      </select>

      <div className="gameboardDetails"><span>{flaggedBombsState}</span>      <button onClick={restartBoard()}>
        <FontAwesomeIcon icon={smilingResetState} />
      </button></div>
      {gameboardState.board
        ? gameboardState.board.map((gameRow, row) => {
            return (
              <div key={row}>
                <GameRowComponent
                  gameRow={gameRow}
                  row={row}
                  onClickHandler={onClickHandler}
                  onKeyPressHandler={onKeyPressHandler}
                  onMouseDownHandler={onMouseDownHandler}
                />
              </div>
            );
          })
        : null}
      {!gameOverState || (
        <div className="gameOverContainer">
          <span
            style={{ color: gameStatusState.includes("Win") ? "green" : "red" }}
          >
            {gameStatusState}
          </span>
          <button onClick={restartBoard()}>Restart?</button>
        </div>
      )}
    </div>
  );
}
export default GameboardComponent;
