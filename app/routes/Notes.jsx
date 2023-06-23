import { redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import NewNote, { links as newNoteLinks } from '../components/NewNote';
import NoteList, { links as noteListLinks } from '../components/NoteList';
import { getStoredNotes, storeNotes } from '../data/notes';

// Remember ALL Components are pre-rendered on the server, where the finished HTML code is sent to the client, along with JS code
const Notes = () => {
  // useLoaderData gives us access to the returned data from the below Remix loader function
  // We use useLoaderData to print data to the screen
  const notes = useLoaderData();

  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
};

export default Notes;

// The native Remix loader function  is used to fetch/GET data
// Like the action function it is ALWAYS run on the server
// The loader function can use async/await, but does not need to
// The data you return in the loader is sent to the client, and in this case the notes Component
export const loader = async () => {
  const notes = await getStoredNotes();

  // By returning notes, gives the above Notes Component access to the raw data by using the useLoaderData() hook, provided by Remix
  // Note: the data is temporarily converted to a data string  so you cannot return any objects, will ONLY get the plain data i.e. strings
  return notes;
};

// Remix will be looking for the action function
// Note: EVERYTHING we put into the action function will run on the backend/server
// Remix will ONLY store code in the action() function on the server
// The action function can use async/await, but does not need to
export const action = async ({ request }) => {
  // This is how we can extract form data e.g. from the inputs the user types in
  const formData = await request.formData();

  // use the get method to extract value by the name we assigned to the input elements' name attribute
  //   const noteData = {
  //     title: formData.get('title'),
  //     content: formData.get('content'),
  //   };

  // Alternatively as a shorthand to the above object with title/content props, we can use the built-in JS Object, and chain the default fromEntries() function, and in pass in the formData object
  // This will convert the formData object into a plain JS object
  // And it WILL have a title and content properties because they were the name attributes attached to the inputs in the form
  const noteData = Object.fromEntries(formData);

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
  // redirect returns a new response object that redirects the user. Remember every redirect is a NEW request
  // Just provide the path you want to redirect the user to
  return redirect('/notes');
};

// We are using a technique called surfacing Component styles
// Remix will be looking for the links function
export const links = () => {
  // Merge links of any Components we may be using into one array: this is a pattern called Surfacing Links
  // Calling the links function we are importing from newNote, and then spreading out it all in a new array
  // This way we can reuse the styles (css files) from e.g. NewNote, and we know the styles are specifically from NewNote.jsx
  // Using this pattern to create a consistent API for making styles available
  return [...newNoteLinks(), ...noteListLinks()];
};
