import { useState, useEffect } from "react";
import BoardSquare from "./BoardSquare";
import Message from "./Message";
import ResetButton from "./ResetButton";

export default function GameBoard() {

  
  //En spelplan med 9 tomma rutor skapas. Varje ruta har ett strängvärde.
  const [squareValues, setsquareValues] = useState<string[]>(Array(9).fill(""));

  //En State-variabel som håller koll på vilken spelares tur det är.
  const [userOne, setUserOne] = useState<boolean>(true);

  //En State-variabel som håller koll på om någon spelare har vunnit eller inte.
  //Vid vinst visas en sträng om vem som har vunnit.
  const [win, setWin] = useState<string>("");

  //En State-variabel som säger om ett meddeland om vinst ska visas eller inte.
  const [showWin, setShowWin] = useState<boolean>(false);

  //useEffect används när någon har vunnit, så att vinstmeddelandet visas och förhindrar
  //att nästa spelare får göra ytterligare ett drag. UseEffecten körs vid vinst och när 
  // värdena på spelplanen har ändrats.
  useEffect(() => {
    handleWin();
  }, [squareValues]);

  //Funktion som hanterar spelarnas turordning. Den aktuella spelaren får lägga ut sin symbol
  //någonstans på spelbrädet och därefter blir det den andra spelarens tur.
  function handleTurns(index: number) {
    if (squareValues[index] !== "") return;

    const currentSymbol = userOne ? "O" : "X";

    const next = squareValues.map((squareValue, i) =>
      i === index ? currentSymbol : squareValue
    );
    setsquareValues(next);
    setUserOne(!userOne);
  }

  //Kombinationer på spelbrädet som ger en vinst.
  //Vid vinst kommer ett vinstmeddelande upp som säger vem som vann.
  function handleWin() {
    if (
      (squareValues[0] === "X" &&
        squareValues[1] === "X" &&
        squareValues[2] === "X") ||
      (squareValues[3] === "X" &&
        squareValues[4] === "X" &&
        squareValues[5] === "X") ||
      (squareValues[6] === "X" &&
        squareValues[7] === "X" &&
        squareValues[8] === "X") ||
      (squareValues[0] === "X" &&
        squareValues[3] === "X" &&
        squareValues[6] === "X") ||
      (squareValues[1] === "X" &&
        squareValues[4] === "X" &&
        squareValues[7] === "X") ||
      (squareValues[2] === "X" &&
        squareValues[5] === "X" &&
        squareValues[8] === "X") ||
      (squareValues[0] === "X" &&
        squareValues[4] === "X" &&
        squareValues[8] === "X") ||
      (squareValues[2] === "X" &&
        squareValues[4] === "X" &&
        squareValues[6] === "X")
    ) {
      setShowWin(true);
      setWin("X vann!");
    }
    if (
      (squareValues[0] === "O" &&
        squareValues[1] === "O" &&
        squareValues[2] === "O") ||
      (squareValues[3] === "O" &&
        squareValues[4] === "O" &&
        squareValues[5] === "O") ||
      (squareValues[6] === "O" &&
        squareValues[7] === "O" &&
        squareValues[8] === "O") ||
      (squareValues[0] === "O" &&
        squareValues[3] === "O" &&
        squareValues[6] === "O") ||
      (squareValues[1] === "O" &&
        squareValues[4] === "O" &&
        squareValues[7] === "O") ||
      (squareValues[2] === "O" &&
        squareValues[5] === "O" &&
        squareValues[8] === "O") ||
      (squareValues[0] === "O" &&
        squareValues[4] === "O" &&
        squareValues[8] === "O") ||
      (squareValues[2] === "O" &&
        squareValues[4] === "O" &&
        squareValues[6] === "O")
    ) {
      setShowWin(true);
      setWin("O vann!");
    }
  }

  //Funktion för när man klickar på spelbrädet. Om någon har vunnit avslutas spelet.
  //Om inte turas spelarna om att lägga brickor tills någon vunnit.
  function handleClick(index: number) {
    if (win !== "") return;
    handleTurns(index);
    handleWin();
  }

  //När man klickar på "starta om"-knappen töms spelbrädet och
  //spelet startas om.
  function buttonClick() {
    const reset = squareValues.map(() => "");
    setsquareValues(reset);
    setWin("");
    setShowWin(false);
  }

  //Det som visas på skärmen. Spelrutorna, vinstmeddelandet och 
  //"starta om"-knappen ligger i egna komponenter, dit props
  //skickas.
  return (
    <div className="container">
      <h1>Tic-tac-toe</h1>

      <div className="game-board-layout">
        {squareValues.map((squareValue, i) => (
          <BoardSquare
            key={i}
            index={i}
            squareValue={squareValue}
            onClick={handleClick}
          ></BoardSquare>
        ))}
      </div>

      <Message win={win} showWin={showWin}></Message>

      <ResetButton onButtonClick={buttonClick}></ResetButton>
    </div>
  );
}
