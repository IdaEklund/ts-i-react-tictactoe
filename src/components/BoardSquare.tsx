//Props som används i varje spelruta.
type Props = {
  index: number;
  squareValue: string;
  onClick: (index: number) => void;
};

//När en spelare klickar på en ruta så markeras rutan med ett "X" eller "O".
export default function BoardSquare({ index, squareValue, onClick }: Props) {
  return (
    <div className="board-square" onClick={() => onClick(index)}>
      <p>{squareValue}</p>
    </div>
  );
}
