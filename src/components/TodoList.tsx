"use client";

import { useEffect, useState } from "react";

interface Task {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
}

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Error while loading tasks :", err);
    }
  }

  async function addTask() {
    if (!newTask.name.trim()) {
      setError("Task name required");
      return;
    }
  
    setLoading(true);
    setError("");
  
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error while adding task");
      }
  
      const addedTask = await res.json();
      setTasks([...tasks, addedTask]);
      setNewTask({ name: "", description: "" });
    } catch (err) {
      console.error("Error while adding task :", err);
      setError("Can't adding task, please try again later");
    } finally {
      setLoading(false);
    }
  }

  async function deleteTask(id: number) {
    try {
      await fetch("/api/tasks", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Error while deleting task :", err);
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg">
      <div className="flex flex-col gap-3 mb-6">
        <input
          type="text"
          placeholder="Task name"
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          className="border p-2 rounded"
        />

        <button
          onClick={addTask}
          disabled={loading}
          className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-4 py-2 rounded-md 
                     bg-[size:200%_200%] animate-color-shift hover:brightness-110 disabled:bg-gray-400"
        >
          {loading ? "Adding in progress..." : "➕ Add"}
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <ul className="space-y-3">
        {tasks.map((task) => (
          <li key={task.id} className="flex justify-between items-center bg-gray-100 p-3 rounded shadow">
            <div>
              <p className="font-semibold">{task.name}</p>
              {task.description && <p className="text-sm text-gray-600">{task.description}</p>}
            </div>

            <button
              onClick={() => deleteTask(task.id)}
              className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white px-3 py-1 rounded-md 
                         bg-[size:200%_200%] animate-color-shift hover:brightness-110"
            >
              🗑️ Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}