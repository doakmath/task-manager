import { useState } from "react";
import { addTask } from "../db/indexedDB";

export default function TaskForm({ onTaskAdded }) {
    const [title, setTitle] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title) return;
        await addTask({ title, completed: false });
        onTaskAdded(); // Refresh the task list
        setTitle("");
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="New task..."
                required
            />
            <button type="submit">Add Task</button>
        </form>
    );
}
