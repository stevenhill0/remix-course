import NewNote, { links as newNoteLinks } from '../components/NewNote';

const notes = () => {
  return (
    <main>
      <NewNote />
    </main>
  );
};
export default notes;

// We are using a technique called surfacing Component styles
export const link = () => {
  // Merge links of any Components we may be using into one array: this is a pattern called Surfacing Links
  // Calling the links function we are importing from newNote, and then spreading out it all in a new array
  // Using this pattern to create a consistent API for making styles available
  return [...newNoteLinks()];
};
