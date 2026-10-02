function NoteCard({ note, editNote, deleteNote }) {
  return (
    <div className="note-card">
      <div className="note-card-content">
        <h3>{note.title}</h3>
        <span className="note-category">
           {note.category}
        </span>

        <p>{note.content}</p>

        <small>{note.date}</small>
      </div>

      <div className="note-actions">
        <button
          className="edit-button"
          onClick={() => editNote(note.id)}
        >
          Edit
        </button>

        <button
          className="delete-button"
          onClick={() => deleteNote(note.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default NoteCard;