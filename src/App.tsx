import { useEffect, useState } from "react";
import "./App.css";
import { getCategoriesData, getLettersData, getNamesData } from "./api/utils";

type PetName = {
  id: string;
  title: string;
  definition: string;
  gender: string[];
  categories: string[];
};

type Category = {
  id: string;
  name: string;
  description: string;
};

type FilterGroup = {
  id: string;
  label: string;
  categoryIds: string[];
};
function App() {
  const [petNames, setPetNames] = useState<PetName[]>([]);
  const [letters, setLetters] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filterGroups, setFilterGroups] = useState<FilterGroup[]>([]);
  const [selectedFilterGroup, setSelectedFilterGroup] =
    useState<FilterGroup | null>(null);
  const [selectedLetter, setSelectedLetter] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string[]>(["M", "F"]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedName, setSelectedName] = useState<PetName>();

  const filteredCategories = categories.filter((category) =>
    selectedFilterGroup?.categoryIds?.includes(category.id),
  );

  const filteredNames = petNames.filter((name) => {
    const matchesLetter = name.title.startsWith(selectedLetter);
    const matchesGender = name.gender.some((g) => selectedGender.includes(g));
    const matchesCategory =
      selectedCategories.length === 0 ||
      name.categories.some((id) => selectedCategories.includes(id));

    return matchesLetter && matchesGender && matchesCategory;
  });

  const selectedNameCategories = categories.filter((category) =>
    selectedName?.categories?.includes(category.id),
  );

  useEffect(() => {
    async function getData() {
      const namesData = await getNamesData();
      setPetNames(namesData);
      const lettersData = await getLettersData();
      setLetters(lettersData);
      const categoriesData = await getCategoriesData();
      setCategories(categoriesData.data);
      setFilterGroups(categoriesData.filterGroups);
    }
    getData();
  }, []);

  function handleFilterGroupSelect(filterGroup: any) {
    if (filterGroup === selectedFilterGroup) {
      setSelectedFilterGroup(null);
    } else {
      setSelectedFilterGroup(filterGroup);
    }
  }

  function handleLetterSelect(letter: string) {
    if (letter === selectedLetter) {
      setSelectedLetter("");
    } else {
      setSelectedLetter(letter);
    }
  }

  function handleSelectedGender(gender: string[]) {
    setSelectedGender(gender);
  }

  function toggleCategory(id: string) {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  }

  function handleSelectName(petName: PetName) {
    setSelectedName(petName);
    console.log(petName);
  }

  return (
    <>
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

      <div>
        {/* <h1>Choose your pet's gender</h1> */}
        <button
          onClick={() => {
            handleSelectedGender(["M"]);
          }}
        >
          Male
        </button>
        <button
          onClick={() => {
            handleSelectedGender(["F"]);
          }}
        >
          Female
        </button>
        <button
          onClick={() => {
            handleSelectedGender(["M", "F"]);
          }}
        >
          Both
        </button>
      </div>
      <div>
        {/* <h1>Filters:</h1> */}
        {filterGroups.map((filterGroup) => (
          <button
            key={filterGroup.id}
            onClick={() => {
              handleFilterGroupSelect(filterGroup);
            }}
          >
            {filterGroup.label}
          </button>
        ))}
      </div>
      <div>
        {filteredCategories.map((category) => (
          <label key={category.id} style={{ display: "block" }}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(category.id)}
              onChange={() => toggleCategory(category.id)}
            />
            {category.name}
          </label>
        ))}
      </div>
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
      <div className="name-buttons">
        {filteredNames.map((petName) => (
          <button key={petName.id} onClick={() => handleSelectName(petName)}>
            {petName.title}
          </button>
        ))}
      </div>
    </>
  );
}

export default App;
