function TodoItem({ task, toggleTask, deleteTask, editTask }) {
  return (
    <div className={`task-card ${task.completed ? "completed" : ""}`}>
      <div className="task-info">
        <button
          className="check-button"
          onClick={() => toggleTask(task.id)}
        >
          {task.completed ? "✓" : ""}
        </button>

        <div>
          <span className="task-text">{task.text}</span>

          <span className="task-status">
            {task.completed ? "Completed" : "Pending"}
          </span>
        </div>
      </div>

      <div className="task-actions">
        <button
          className="edit-button"
          onClick={() => editTask(task.id)}
        >
          Edit
        </button>

        <button
          className="delete-button"
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;