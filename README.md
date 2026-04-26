# Dog Name Generator

Dog name generator

## SetUp Instructions

Follow these steps to set up and run the project locally.

### 1. Install dependencies

In the terminal, run:
npm install

### 2. Open in browser

http://localhost:5173

## Architecture Explanation

This project follows a centralized state management pattern where the top-level (parent) component owns all application state using React hooks (useState).
Child components are presentational and modular, receiving data and callbacks via props.

## Assumptions

There doesn't seem to be any related name info from the data provided, so I just hardcoded it.
Omitted the gender symbol on the additonal info because female symbol was not available. (Not part of functional requirements, plus looks it awkward if I try putting a placeholder)
