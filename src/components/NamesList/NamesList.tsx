import styles from "./NamesList.module.css";
import type { Category, PetName } from "../../App";
import chevron from "../../icons/Chevron.svg";
import dog from "../../images/Dog.png";

type NamesListProps = {
  petNames: PetName[];
  categories: Category[];
  selectedLetter: string;
  selectedGender: string[];
  selectedCategories: string[];
  selectedName: PetName | null;
  currentPage: number;
  setSelectedName: React.Dispatch<React.SetStateAction<PetName | null>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function NamesList({
  petNames,
  categories,
  currentPage,
  selectedLetter,
  selectedGender,
  selectedCategories,
  selectedName,
  setSelectedName,
  setCurrentPage,
}: NamesListProps) {
  // filters
  const filteredNames = petNames.filter((name) => {
    const matchesLetter = name.title.startsWith(selectedLetter);
    const matchesGender = name.gender.some((g) => selectedGender.includes(g));
    const matchesCategory =
      selectedCategories.length === 0 ||
      name.categories.some((id) => selectedCategories.includes(id));

    return matchesLetter && matchesGender && matchesCategory;
  });

  // categories that the selected name belongs to
  const selectedNameCategories = categories.filter((category) =>
    selectedName?.categories?.includes(category.id),
  );

  // pagination
  const itemsPerPage = 11;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredNames.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredNames.length / itemsPerPage);

  function handleSelectName(name: PetName) {
    if (name === selectedName) {
      setSelectedName(null);
    } else {
      setSelectedName(name);
    }
  }

  return (
    <div className={styles.container}>
      <div
        className={`${styles.nameListContainer} ${
          !selectedName ? styles.centered : ""
        }`}
      >
        {!selectedName && <img src={dog} alt="dog" />}

        <div className={styles.pagination}>
          <button
            className={styles.chevronButton}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
          >
            <img src={chevron} alt="iconUp" className={styles.chevronUp} />
          </button>
          <button
            className={styles.chevronButton}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
          >
            <img src={chevron} alt="iconDown" className={styles.chevronDown} />
          </button>
        </div>
        <div className={styles.buttonColumn}>
          {currentItems.map((petName) => (
            <button
              className={`${styles.nameButton} ${
                selectedName === petName ? styles.active : ""
              }`}
              key={petName.id}
              onClick={() => handleSelectName(petName)}
            >
              {petName.title}
            </button>
          ))}
        </div>
      </div>

      {selectedName && (
        <div className={styles.info}>
          {/* Omitted the gender part, female symbol not available, not part of functional requirements, plus looks awkward if I try putting a placeholder */}
          {/* <div className={styles.gender}>
          {selectedName?.gender.includes("M") ? (
            <img src={male} alt="male" />
          ) : (
            <></>
          )}
          {selectedName?.gender.includes("F") ? <h3>Female</h3> : <></>} 
       </div> */}
          <div className={styles.categories}>
            <p className={styles.category}>
              {selectedNameCategories.map((c) => c.name).join(" - ")}
            </p>
          </div>
          <p
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: selectedName?.definition ?? "" }} // prevents the tags from showing up
          />
          <p className={styles.relatedNameHeader}>Related Name</p>
          <p className={styles.relatedNames}>Abu Abby Abe</p>{" "}
          {/* NOTE: There doesn't seem to be any related name info
              from the data provided, hardcoded for now */}
        </div>
      )}
    </div>
  );
}
