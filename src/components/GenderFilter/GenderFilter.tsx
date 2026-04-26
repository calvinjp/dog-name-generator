import styles from "./GenderFilter.module.css";

type GenderFilterProps = {
  selectedGender: string[];
  setSelectedGender: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function GenderFilter({
  selectedGender,
  setSelectedGender,
}: GenderFilterProps) {
  return (
    <div className={styles.center}>
      <p className={styles.genderHeader}>Choose your pet's gender</p>
      <div className={styles.buttonRow}>
        <button
          onClick={() => setSelectedGender(["M"])}
          className={`${styles.genderButton} ${
            selectedGender.length === 1 && selectedGender[0] === "M"
              ? styles.active
              : ""
          }`}
        >
          Male
        </button>

        <button
          onClick={() => setSelectedGender(["F"])}
          className={`${styles.genderButton} ${
            selectedGender.length === 1 && selectedGender[0] === "F"
              ? styles.active
              : ""
          }`}
        >
          Female
        </button>

        <button
          onClick={() => setSelectedGender(["M", "F"])}
          className={`${styles.genderButton} ${
            selectedGender.length === 2 ? styles.active : ""
          }`}
        >
          Both
        </button>
      </div>
    </div>
  );
}
