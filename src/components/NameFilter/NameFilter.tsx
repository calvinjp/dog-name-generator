import "./NameFilter.module.css";

type NameFilterProps = {
  letters: string[];
  selectedLetter: string;
  setSelectedLetter: React.Dispatch<React.SetStateAction<string>>;
};

export default function NameFilter({
  letters,
  selectedLetter,
  setSelectedLetter,
}: NameFilterProps) {
  function handleLetterSelect(letter: string) {
    if (letter === selectedLetter) {
      setSelectedLetter("");
    } else {
      setSelectedLetter(letter);
    }
  }
  return (
    <div className="button-row">
      {letters.map((letter) => (
        <button
          key={letter}
          onClick={() => {
            handleLetterSelect(letter);
          }}
        >
          {letter}{" "}
        </button>
      ))}
    </div>
  );
}
