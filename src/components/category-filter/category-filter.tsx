import "./category-filter.css";
import type { Category, FilterGroup } from "../../App";

type CategoryFilterProps = {
  categories: Category[];
  selectedFilterGroup: FilterGroup | null;
  setSelectedFilterGroup: React.Dispatch<
    React.SetStateAction<FilterGroup | null>
  >;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  filterGroups: FilterGroup[];
};

export default function CategoryFilter({
  categories,
  selectedFilterGroup,
  setSelectedFilterGroup,
  selectedCategories,
  setSelectedCategories,
  filterGroups,
}: CategoryFilterProps) {
  const filteredCategories = categories.filter((category) =>
    selectedFilterGroup?.categoryIds?.includes(category.id),
  );

  function handleFilterGroupSelect(filterGroup: any) {
    if (filterGroup === selectedFilterGroup) {
      setSelectedFilterGroup(null);
    } else {
      setSelectedFilterGroup(filterGroup);
    }
  }

  function toggleCategory(id: string) {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  }
  return (
    <div>
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
    </div>
  );
}
