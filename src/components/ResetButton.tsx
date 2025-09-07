//Props som används i "starta om"-knappen.
type Props = {
  onButtonClick: () => void;
};

export default function ResetButton({ onButtonClick }: Props) {
  return (
    <button className="reset-btn" onClick={onButtonClick}>
      Starta om
    </button>
  );
}
