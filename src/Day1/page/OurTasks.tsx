import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context";
import { deleteTaskById, getTasks } from "../services/api";
import type { Task } from "../type/task";
import { useNavigate } from "react-router";
import SearchTasks from "../components/SearchTask";

export default function OurTasks() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<{ status: string; priority: string }>({
    status: "",
    priority: "",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleOnEdit = (taskId: number) => {
    navigate(`/update-task/${taskId}`);
  };

  const handleOnSearch = (filters: { status?: string; priority?: string }) => {
    setFilters(filters);
  };
const handleOnDelete = async (id: number) => {
  if (!window.confirm("Are you sure you want to delete this task?")) return;

  try {
    await deleteTaskById(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
    console.log(`Deleted task ${id}`);
  } catch (err) {
    console.error("Failed to delete task:", err);
    alert("Delete failed");
  }
};

  const filteredTasks = tasks.filter((task) => {
    let matches = true;
    if (filters.status && task.status !== filters.status) matches = false;
    if (filters.priority && task.priority !== filters.priority) matches = false;
    return matches;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-10">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          All Tasks
        </h2>

        <SearchTasks onSearch={handleOnSearch} />

        <div className="overflow-x-auto mt-6">
          <table className="min-w-full border divide-y divide-gray-200">
            <thead className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Priority</th>
                <th className="px-4 py-2">Due Date</th>
                <th className="px-4 py-2">Assignee</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100 text-center align-middle">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50 text-sm">
                    <td className="px-4 py-2">{task.id}</td>
                    <td className="px-4 py-2 font-medium text-gray-800 text-left">
                      {task.title}
                    </td>
                    <td className="px-4 py-2 text-gray-600 text-left">
                      {task.description}
                    </td>
                    <td className="px-4 py-2 capitalize">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold
                        ${task.status === "to_do" ? "bg-gray-200 text-gray-800" : ""}
                        ${task.status === "in_progress" ? "bg-yellow-200 text-yellow-800" : ""}
                        ${task.status === "done" ? "bg-green-200 text-green-800" : ""}
                        `}
                      >
                        {task.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-4 py-2 capitalize">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold
                        ${task.priority === "low" ? "bg-blue-100 text-blue-800" : ""}
                        ${task.priority === "medium" ? "bg-orange-100 text-orange-800" : ""}
                        ${task.priority === "high" ? "bg-red-100 text-red-800" : ""}
                        `}
                      >
                        {task.priority}
                      </span>
                    </td>

                    <td className="px-4 py-2">
                      {task.due_date
                        ? new Date(task.due_date).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-4 py-2">{task.assignee_id}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleOnEdit(task.id)}
                        className="text-gray-900 hover:bg-amber-500 bg-amber-400 p-2 rounded mx-2"
                      >
                        Edit
                      </button>
                        <button
                        onClick={() => handleOnDelete(task.id)}
                        className="text-gray-50 hover:bg-red-700 bg-red-600 p-2 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center text-gray-500 py-4">
                    No tasks match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
  );
}
