export async function getNamesData() {
  const res = await fetch("/names.json");
  if (!res.ok) {
    throw new Error(`Failed to fetch names`);
  }
  const data = await res.json();
  return data.data;
}
export async function getLettersData() {
  const res = await fetch("/letters.json");
  if (!res.ok) {
    throw new Error(`Failed to fetch letters`);
  }
  const data = await res.json();
  return data.data;
}

export async function getCategoriesData() {
  const res = await fetch("/categories.json");
  if (!res.ok) {
    throw new Error(`Failed to fetch categories`);
  }
  const data = await res.json();
  return data;
}
