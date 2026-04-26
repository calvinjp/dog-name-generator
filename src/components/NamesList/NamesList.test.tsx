import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NamesList from "./NamesList";
import type { Category } from "../../App";

const categories: Category[] = [
  {
    id: "019c8a34-3585-7249-b7c2-a4f85945291e",
    name: "Cartoon",
    description: "\u003Cp\u003E\u003C/p\u003E",
  },
  {
    id: "019c8a34-35ed-737c-acff-a43af999817c",
    name: "Celebrities",
    description: null,
  },
  {
    id: "019c8a34-35f2-70b1-b866-69a4921d15a8",
    name: "Disney",
    description: null,
  },
];

const petNames = [
  {
    id: "019c8a34-3f34-70c8-8f5e-3657bb9b328b",
    title: "Aaron",
    definition:
      "\u003Cp\u003EAaron is a Hebrew male name that means 'exalted'. There are interpretations of the name that suggest the meaning is 'teacher' or 'mountain of strength'. This is a great name for a pet that is strong in mind and in build.\u003C/p\u003E\r\n",
    gender: ["M"],
    categories: [
      "019c8a34-3621-715f-96e3-a9ce5aa5de45",
      "019c8a34-362d-7087-99c4-1a4eb48d3f6b",
    ],
  },
  {
    id: "019c8a34-3641-704d-a1b0-e2e394bfaa26",
    title: "Abby",
    definition:
      "Originally a Hebrew name with biblical origins, Abby means 'father's joy'. Perfect for any daddy's girls!",
    gender: ["F"],
    categories: [
      "019c8a34-3619-7134-a023-806d72219174",
      "019c8a34-3621-715f-96e3-a9ce5aa5de45",
    ],
  },
  {
    id: "019c8a34-3648-73c9-8100-760fc0d8f9e6",
    title: "Abu",
    definition:
      "\u003Cp\u003EThe name Abu is a male name of African origin that means 'Nobility'. It is also often used as a nickname as it can also mean 'father of' in Indian culture.\u003C/p\u003E\r\n\r\n\u003Cp\u003EThe name Abu is most famous as the mischevious pet monkey of Aladdin!\u003C/p\u003E\r\n",
    gender: ["M"],
    categories: [
      "019c8a34-35f2-70b1-b866-69a4921d15a8",
      "019c8a34-3621-715f-96e3-a9ce5aa5de45",
    ],
  },
];

const setup = (propsOverride = {}) => {
  const setSelectedName = jest.fn();
  const setCurrentPage = jest.fn();

  const props = {
    petNames,
    categories,
    currentPage: 1,
    selectedLetter: "",
    selectedGender: ["M", "F"],
    selectedCategories: [],
    selectedName: null,

    setSelectedName,
    setCurrentPage,
    ...propsOverride,
  };

  return {
    user: userEvent.setup(),
    setSelectedName,
    setCurrentPage,
    ...render(<NamesList {...props} />),
  };
};

test("Renders pet names", () => {
  setup();

  expect(screen.getByText("Aaron")).toBeInTheDocument();
  expect(screen.getByText("Abu")).toBeInTheDocument();
});
