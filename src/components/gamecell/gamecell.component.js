import "./gamecell.component.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";

function GameCellComponent(props) {
  const { column, gameCell, onClickHandler, row, onKeyPressHandler,onMouseDownHandler } = props;
  const onMouseOverHandler = (event) => {
    event.target.focus();
  };
  const proxyCountColorStyles = [
    "",
    "#264afb",
    "#3e7c06",
    "#e93f33",
    "#0b1f7b",
    "#7c1d16",
    "#377c7c",
    "#bdbdbd",
    "#7b7b7b",
  ];
  return (
    <div
      key={column}
      tabIndex="0"
      style={{ color: proxyCountColorStyles[gameCell.bombProxyCount] }}
      onClick={onClickHandler(row, column)}
      onMouseOver={onMouseOverHandler}
      onKeyPress={onKeyPressHandler(row, column)}
      className={`gamecell ${gameCell.revealed ? "" : "revealed"}`}
      onMouseDown={onMouseDownHandler()}
    >
      {`${
        gameCell.bombProxyCount > 0 &&
        !gameCell.isThisABomb &&
        gameCell.revealed
          ? gameCell.bombProxyCount
          : ""
      }`}
      {gameCell.flagged && !gameCell.revealed ? (
        <FontAwesomeIcon icon={faFlag} />
      ) : null}
    </div>
  );
}

export default GameCellComponent;
