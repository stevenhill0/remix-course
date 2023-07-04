import { Link } from '@remix-run/react';

import styles from './NoteList.css';

function NoteList({ notes }) {
  return (
    <ul id="note-list">
      {notes.map((note, index) => (
        <li key={note.id} className="note">
          {/* The Link Component supports RELATIVE paths. This means if you type 'note-1': note-1 will appended to the currently active path i.e. localhost:3000/notes/note-1
          If you were to add a slash at the beginning of the path, it will change to an ABSOLUTE path
           */}
          <Link to={'/notes/' + note.id}>
            <article>
              <header>
                <ul className="note-meta">
                  <li>#{index + 1}</li>
                  <li>
                    <time dateTime={note.id}>
                      {new Date(note.id).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </time>
                  </li>
                </ul>
                <h2>{note.title}</h2>
              </header>
              <p>{note.content}</p>
            </article>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;

// Surfacing links by exporting a links function
// I.e. we exporting the CSS styles from this Component to keep it in a central related file. Best practice for good organization
export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
