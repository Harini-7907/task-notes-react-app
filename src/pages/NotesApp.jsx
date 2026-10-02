import { useState, useEffect } from "react";
import NoteForm from "../components/NoteForm";
import NoteCard from "../components/NoteCard";

function NotesApp() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Study");
  const [notes, setNotes] = useState(() => {
  const savedNotes = localStorage.getItem("notes");

  return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [editingNote, setEditingNote] = useState(null);
  const [search, setSearch] = useState("");
  useEffect(() => {
  localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);
  const filteredNotes = notes.filter((note) => {
  const searchText = search.toLowerCase();

  return (
    note.title.toLowerCase().includes(searchText) ||
    note.content.toLowerCase().includes(searchText)
  );
 });

  const saveNote = () => {
    if (editingNote) {
      setNotes(
        filteredNotes.map((note) =>
          note.id === editingNote
            ? {
                ...note,
                title: title.trim(),
                content: content.trim(),
              }
            : note
        )
      );

      setEditingNote(null);
    } else {
      const newNote = {
        id: Date.now(),
        title: title.trim(),
        content: content.trim(),
        category: category,
        date: new Date().toLocaleDateString(),
      };

      setNotes([...notes, newNote]);
    }
  };

  const editNote = (id) => {
    const noteToEdit = notes.find((note) => note.id === id);

    if (!noteToEdit) {
      return;
    }

    setTitle(noteToEdit.title);
    setContent(noteToEdit.content);
    setCategory(noteToEdit.category || "Study");
    setEditingNote(id);
  };

  const deleteNote = (id) => {
    setNotes(
      notes.filter((note) => note.id !== id)
    );
  };

  const cancelEdit = () => {
    setTitle("");
    setContent("");
    setCategory("Study");
    setEditingNote(null);
  };

  return (
    <section className="page">
      <div className="page-header">
        <h1>📒 Notes App</h1>
        <p>Create, organize and manage your notes.</p>
      </div>

      <NoteForm
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        category={category}
        setCategory={setCategory}
        saveNote={saveNote}
        editingNote={editingNote}
        cancelEdit={cancelEdit}
      />
      <div className="note-search">
        <input
           type="text"
           placeholder="🔍 Search your notes..."
           value={search}
           onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="notes-list">
        {filteredNotes.length === 0 ? (
          <div className="empty-state">
            <h3>No notes yet</h3>
            <p>Create your first note above.</p>
          </div>
        ) : (
          notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              editNote={editNote}
              deleteNote={deleteNote}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default NotesApp;