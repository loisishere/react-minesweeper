import "./gamerow.component.css";
import GameCellComponent from "../gamecell/gamecell.component";

function GameRowComponent(props) {
  const {
    gameRow,
    row,
    onClickHandler,
    onKeyPressHandler,
    onMouseDownHandler,
  } = props;
  return (
    <div className="gamerow">
      {gameRow.map((gamecell, column) => (
        <div key={column}>
          <GameCellComponent
            row={row}
            gameCell={gamecell}
            column={column}
            onMouseDownHandler={onMouseDownHandler}
            onClickHandler={onClickHandler}
            onKeyPressHandler={onKeyPressHandler}
          />
        </div>
      ))}
    </div>
  );
}

export default GameRowComponent;
