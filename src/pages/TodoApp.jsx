import { useState, useEffect } from "react";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";

function TodoApp() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
     const savedTasks = localStorage.getItem("tasks");

  return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [filter, setFilter] = useState("all");
  useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);

  const addTask = (taskText) => {
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((taskItem) =>
        taskItem.id === id
          ? { ...taskItem, completed: !taskItem.completed }
          : taskItem
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((taskItem) => taskItem.id !== id));
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find((taskItem) => taskItem.id === id);

    if (!taskToEdit) {
      return;
    }

    const updatedText = window.prompt(
      "Edit your task:",
      taskToEdit.text
    );

    if (updatedText !== null && updatedText.trim() !== "") {
      setTasks(
        tasks.map((taskItem) =>
          taskItem.id === id
            ? { ...taskItem, text: updatedText.trim() }
            : taskItem
        )
      );
    }
  };

  // Filter tasks
  const filteredTasks = tasks.filter((taskItem) => {
    if (filter === "completed") {
      return taskItem.completed;
    }

    if (filter === "pending") {
      return !taskItem.completed;
    }

    return true;
  });

  return (
    <section className="page">
      <div className="page-header">
        <h1>📝 To-Do App</h1>
        <p>Organize your daily tasks and stay productive.</p>
      </div>

      <TodoForm
        task={task}
        setTask={setTask}
        addTask={addTask}
      />

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button
          className={
            filter === "all"
              ? "filter-btn active"
              : "filter-btn"
          }
          onClick={() => setFilter("all")}
        >
          All
        </button>

        <button
          className={
            filter === "pending"
              ? "filter-btn active"
              : "filter-btn"
          }
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>

        <button
          className={
            filter === "completed"
              ? "filter-btn active"
              : "filter-btn"
          }
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      {/* Task List */}
      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <h3>No tasks found</h3>
            <p>
              Try adding a task or changing the filter.
            </p>
          </div>
        ) : (
          filteredTasks.map((taskItem) => (
            <TodoItem
              key={taskItem.id}
              task={taskItem}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default TodoApp;