import "./names-list.css";
import type { Category, PetName } from "../../App";

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

  return (
    <div>
      <div className="name-buttons">
        {currentItems.map((petName) => (
          <button key={petName.id} onClick={() => setSelectedName(petName)}>
            {petName.title}
          </button>
        ))}
      </div>

      <button
        onClick={() => setCurrentPage((prev) => prev + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
      <button
        onClick={() => setCurrentPage((prev) => prev - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      <div>
        <p>{selectedName?.gender}</p>
        {selectedNameCategories.map((category) => (
          <p>{category.name}</p>
        ))}
        <p
          dangerouslySetInnerHTML={{ __html: selectedName?.definition ?? "" }} // prevents the tags from showing up
        />
        <p>Related Name</p>
        <p>Abu Abby Abe</p>{" "}
        {/* NOTE: There doesn't seem to be any related name info
              from the data provided, hardcoded for now */}
      </div>
    </div>
  );
}
