function TodoForm({ task, setTask, addTask }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    if (task.trim() === "") {
      return;
    }

    addTask(task);
    setTask("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What do you need to do?"
        value={task}
        onChange={(event) => setTask(event.target.value)}
      />

      <button type="submit">
        + Add Task
      </button>
    </form>
  );
}

export default TodoForm;