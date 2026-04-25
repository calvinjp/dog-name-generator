import "./gender-filter.css";

type GenderFilterProps = {
  selectedGender: string[];
  setSelectedGender: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function GenderFilter({
  selectedGender,
  setSelectedGender,
}: GenderFilterProps) {
  return (
    <div>
      <button
        onClick={() => setSelectedGender(["M"])}
        className={
          selectedGender.length === 1 && selectedGender[0] === "M"
            ? "active"
            : ""
        }
      >
        Male
      </button>

      <button
        onClick={() => setSelectedGender(["F"])}
        className={
          selectedGender.length === 1 && selectedGender[0] === "F"
            ? "active"
            : ""
        }
      >
        Female
      </button>

      <button
        onClick={() => setSelectedGender(["M", "F"])}
        className={selectedGender.length === 2 ? "active" : ""}
      >
        Both
      </button>
    </div>
  );
}
