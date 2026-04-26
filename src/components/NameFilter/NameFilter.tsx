import styles from "./NameFilter.module.css";

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
    <div className={styles.container}>
      <p className={styles.letterFilterHeader}>All pets names</p>
      <div className={styles.buttonRow}>
        {letters.map((letter) => (
          <button
            className={`${styles.letterButton} ${
              selectedLetter === letter ? styles.active : ""
            }`}
            key={letter}
            onClick={() => {
              handleLetterSelect(letter);
            }}
          >
            {letter}{" "}
          </button>
        ))}
      </div>
    </div>
  );
}
