import styles from "./CategoryFilter.module.css";
import type { Category, FilterGroup } from "../../App";
import icon from "../../../public/icons/Chevron.svg";

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
      <div className={styles.filterBar}>
        <h4>Filters:</h4>
        <div className={styles.buttonRow}>
          {filterGroups.map((filterGroup) => (
            <button
              className={styles.categoryButton}
              key={filterGroup.id}
              onClick={() => {
                handleFilterGroupSelect(filterGroup);
              }}
            >
              {filterGroup.label}
              <img
                src={icon}
                alt="icon"
                className={`${styles.chevron} ${
                  selectedFilterGroup?.id === filterGroup.id
                    ? styles.active
                    : ""
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {selectedFilterGroup ? (
        <div className={styles.dropdown}>
          {filteredCategories.map((category) => (
            <label key={category.id}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() => toggleCategory(category.id)}
              />
              {category.name}
            </label>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
