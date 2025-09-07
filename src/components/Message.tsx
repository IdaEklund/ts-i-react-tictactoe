//Props som används i vinstmeddelandet.
type Props = {
  win: string;
  showWin: boolean;
};

//Vinstmeddelandet visas om "showWin" är sant.
export default function Message({ win, showWin }: Props) {
  return (
    <div className={`message-div ${showWin && "message-win-div"}`}>{win}</div>
  );
}
