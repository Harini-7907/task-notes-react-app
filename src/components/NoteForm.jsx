function NoteForm({
  title,
  setTitle,
  content,
  setContent,
  category,
  setCategory,
  saveNote,
  editingNote,
  cancelEdit,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();

    if (title.trim() === "" || content.trim() === "") {
      return;
    }

    saveNote();

    setTitle("");
    setContent("");
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Note title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <textarea
        placeholder="Write your note here..."
        value={content}
        onChange={(event) => setContent(event.target.value)}
        rows="6"
      />
      <select
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      >
        <option value="Study">📚 Study</option>
        <option value="Project">💻 Project</option>
        <option value="Ideas">💡 Ideas</option>
        <option value="Personal">📝 Personal</option>
</select>

      <div className="note-form-actions">
        <button type="submit">
          {editingNote ? "Update Note" : "+ Add Note"}
        </button>

        {editingNote && (
          <button
            type="button"
            className="cancel-button"
            onClick={cancelEdit}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default NoteForm;