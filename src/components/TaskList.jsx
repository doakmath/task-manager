import { useEffect, useState } from "react";
import { getTasks, deleteTask, toggleTaskCompletion } from "../db/indexedDB";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const storedTasks = await getTasks();
    setTasks(storedTasks);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks(); // Refresh the task list
  };

  const handleToggleComplete = async (id, completed) => {
    await toggleTaskCompletion(id, completed);
    loadTasks(); // Refresh task list
  };

  return (
    <div className="task-list">
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`task-item ${task.completed ? "completed" : ""}`}
          >
            <span
              className={`checkmark ${task.completed ? "checked" : "unchecked"}`}
              onClick={() => handleToggleComplete(task.id, !task.completed)}
            >
              {task.completed ? "✅" : "⬜"}
            </span>
            <span>{task.title}</span>
            <button onClick={() => handleDelete(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
