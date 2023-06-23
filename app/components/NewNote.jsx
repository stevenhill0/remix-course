import { Form, useNavigation } from '@remix-run/react';
import styles from './NewNote.css';

function NewNote() {
  // The useNavigation hook contains useful data about ongoing requests that may be happening behind the scenes
  const navigation = useNavigation();

  // Example: we can access the state property to see whether we are submitting data/loading data/not doing anything
  const isSubmitting = navigation.state === 'submitting';

  // Example: submission property to get more info on the latest form submission
  // Like the path where the request was sent; what the method was; or what kind of data was submitted
  // navigation.submission

  // Example: can use the type prop to see if you were redirected
  // navigation.type

  return (
    <Form method="post" id="note-form">
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows="5" required />
      </p>
      <div className="form-actions">
        {/* We are adding the isSubmitting prop to tell React to disable when submitting */}
        <button disabled={isSubmitting}>
          {/* Using isSubmitting to change the text depending on the state */}
          {isSubmitting ? 'Adding...' : 'Add Note'}
        </button>
      </div>
    </Form>
  );
}

export default NewNote;

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
