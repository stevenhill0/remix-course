import { redirect } from '@remix-run/node';
import NewNote, { links as newNoteLinks } from '../components/NewNote';
import { getStoredNotes, storeNotes } from '../data/notes';

const notes = () => {
  return (
    <main>
      <NewNote />
    </main>
  );
};
export default notes;

// Remix will be looking for the action function
// Note: EVERYTHING we put into the action function will run on the backend/server
// Remix will ONLY store code in the action() function on the server
export const action = async ({ request }) => {
  // This is how we can extract form data e.g. from the inputs the user types in
  const formData = await request.formData();
  // use the get method to extract value by the name we assigned to the input elements' name attribute
  const noteData = {
    title: formData.get('title'),
    content: formData.get('content'),
  };

  // Add validation

  // Using the utility function to get notes
  const existingNotes = await getStoredNotes();

  // Adding an extra property i.e. id to the noteData object to get a unique ID
  // The date is just a demo for a unique ID
  noteData.id = new Date().toISOString;

  // Getting an updated NOtes object by getting the existing notes and calling concat to join hte noteData with the new note
  const updatedNotes = existingNotes.concat(noteData);

  // Storing the updated notes
  await storeNotes(updatedNotes);

  // Redirecting to another page: using the Remix default redirect function
  // redirect returns a new response object that redirects the user
  // Just provide the path you want to redirect the user to
  return redirect('/notes');
};

// We are using a technique called surfacing Component styles
// Remix will be looking for the links function
export const links = () => {
  // Merge links of any Components we may be using into one array: this is a pattern called Surfacing Links
  // Calling the links function we are importing from newNote, and then spreading out it all in a new array
  // This way we can reuse the styles from NewNote, and we know the styles are specifically from NewNote.jsx
  // Using this pattern to create a consistent API for making styles available
  return [...newNoteLinks()];
};
