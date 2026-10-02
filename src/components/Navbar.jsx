function Navbar({ activePage, setActivePage }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">✓</span>
        <span>Task & Notes</span>
      </div>

      <div className="nav-buttons">
        <button
          className={activePage === "todo" ? "nav-btn active" : "nav-btn"}
          onClick={() => setActivePage("todo")}
        >
          📝 To-Do
        </button>

        <button
          className={activePage === "notes" ? "nav-btn active" : "nav-btn"}
          onClick={() => setActivePage("notes")}
        >
          📒 Notes
        </button>
      </div>
    </nav>
  );
}

export default Navbar;