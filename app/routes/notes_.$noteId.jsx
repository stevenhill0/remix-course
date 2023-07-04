import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import { getStoredNotes } from '~/data/notes';
import styles from '~/styles/note-details.css';

export default function NoteDetailsPage() {
  const note = useLoaderData();

  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all Notes</Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p id="note-details-content">{note.content}</p>
    </main>
  );
}

export async function loader({ params }) {
  const notes = await getStoredNotes();
  const noteId = params.noteId;
  console.log(noteId);
  const selectedNote = notes.find((note) => note.id === noteId);

  // Setting up server error response
  if (!selectedNote) {
    throw json(
      { message: 'Could not find note for id ' + noteId },
      { status: 404 }
    );
  }

  return selectedNote;
}

// We are exporting from the links function so we can reuse the stylesheet for note-details.css
export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export function meta({ data }) {
  return {
    title: data.title,
    description: 'Manage your notes with ease.',
  };
}
