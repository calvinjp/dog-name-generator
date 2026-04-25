import { useEffect, useState } from "react";
import "./App.css";
import { getCategoriesData, getLettersData, getNamesData } from "./api/utils";
import GenderFilter from "./components/gender-filter/gender-filter";
import CategoryFilter from "./components/category-filter/category-filter";
import NameFilter from "./components/name-filter/name-filter";
import NamesList from "./components/names-list/names-list";

export type PetName = {
  id: string;
  title: string;
  definition: string;
  gender: string[];
  categories: string[];
};

export type Category = {
  id: string;
  name: string;
  description: string;
};

export type FilterGroup = {
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
  const [selectedName, setSelectedName] = useState<PetName | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

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

  // resets the page to 1 when new filters are applied
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedLetter, selectedGender, selectedCategories, selectedFilterGroup]);

  return (
    <>
      <GenderFilter
        selectedGender={selectedGender}
        setSelectedGender={setSelectedGender}
      />
      <CategoryFilter
        categories={categories}
        selectedFilterGroup={selectedFilterGroup}
        setSelectedFilterGroup={setSelectedFilterGroup}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        filterGroups={filterGroups}
      />
      <NameFilter
        letters={letters}
        selectedLetter={selectedLetter}
        setSelectedLetter={setSelectedLetter}
      />
      <NamesList
        petNames={petNames}
        categories={categories}
        selectedLetter={selectedLetter}
        selectedGender={selectedGender}
        selectedCategories={selectedCategories}
        selectedName={selectedName}
        currentPage={currentPage}
        setSelectedName={setSelectedName}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default App;
