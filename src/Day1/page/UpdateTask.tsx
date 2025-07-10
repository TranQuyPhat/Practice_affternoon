import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { getTaskById, updateTask } from "../services/api";
import { useNavigate, useParams } from "react-router";

interface IFormInput {
  title: string;
  start_date: string;
  due_date?: string;
  description?: string;
  status: "to_do" | "in_progress" | "done";
  priority: "low" | "medium" | "high";
  assignee_id?: string;
}

const schema: yup.ObjectSchema<IFormInput> = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  start_date: yup
    .string()
    .required("Start date is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date"),
  due_date: yup
    .string()
    .optional()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date")
    .test(
      "due_date-after-start_date",
      "Due date must be after start date",
      function (value) {
        if (!value) return true;
        const { start_date } = this.parent;
        return new Date(value) >= new Date(start_date);
      }
    ),
  description: yup
    .string()
    .optional()
    .max(500, "Description must be less than 500 characters"),
  status: yup
    .mixed<"to_do" | "in_progress" | "done">()
    .required("Status is required")
    .oneOf(["to_do", "in_progress", "done"], "Please select a valid status"),
  priority: yup
    .mixed<"low" | "medium" | "high">()
    .required("Priority is required")
    .oneOf(["low", "medium", "high"], "Please select a valid priority"),
  assignee_id: yup
    .number()
    .min(1, "Assignee ID must be a positive number")
    .test("assignee_id", "Assignee ID cannot be empty if provided", (value) => {
      if (!value) return true;
      return !isNaN(Number(value)) && Number(value) >= 1;
    }),
});

export default function UpdateTaskPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  // react form hook
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      start_date: "",
      due_date: "",
      description: "",
      status: "to_do",
      priority: "medium",
      assignee_id: "",
    },
    mode: "onChange",
  });
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const task = await getTaskById(id ? parseInt(id) : 0);
        reset({
          title: task.title,
          start_date: task.start_date ? task.start_date.split("T")[0] : "",
          due_date: task.due_date ? task.due_date.split("T")[0] : "",

          description: task.description,
          status: task.status,
          priority: task.priority,
          assignee_id: task.assignee_id ? task.assignee_id.toString() : "", // Convert to string if needed
        });
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [id, reset]);

  const onSubmit: SubmitHandler<IFormInput> = async (data: any) => {
    try {
      await updateTask(id ? parseInt(id) : 0, data);
      navigate("/tasks");
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task. Please try again.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-black text-center p-4 m-4">Update</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 w-[600px] mx-auto"
      >
        <div>
          <label htmlFor="title" className="block font-medium text-black">
            Title:
          </label>
          <input
            className="w-full p-2 border rounded"
            {...register("title")}
            type="text"
            id="title"
            name="title"
            placeholder="Enter task title"
          />
          {errors.title && <p className="error">{errors.title.message}</p>}
        </div>
        <div>
          <label htmlFor="description" className="block font-medium text-black">
            Description:
          </label>
          <input
            className="w-full p-2 border rounded"
            {...register("description")}
            type="text"
            id="description"
            name="description"
            placeholder="Enter task description"
          />
          {errors.description && (
            <p className="error">{errors.description.message}</p>
          )}
        </div>

        {/* start_date */}
        <div>
          <label htmlFor="start_date" className="block font-medium text-black">
            Start Date:
          </label>
          <input
            className="w-full p-2 border rounded"
            {...register("start_date")}
            type="date"
            id="start_date"
            name="start_date"
            placeholder="YYYY-MM-DD"
          />
          {errors.start_date && (
            <p className="error">{errors.start_date.message}</p>
          )}
        </div>

        {/* due_date */}
        <div>
          <label htmlFor="due_date" className="block font-medium text-black">
            Due Date:
          </label>
          <input
            className="w-full p-2 border rounded"
            {...register("due_date")}
            type="date"
            id="due_date"
            name="due_date"
            placeholder="YYYY-MM-DD"
          />
          {errors.due_date && (
            <p className="error">{errors.due_date.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="status">Status:</label>
          <select
            className="w-full p-2 border rounded"
            {...register("status")}
            id="status"
            name="status"
          >
            <option value="to_do">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          {errors.status && <p className="error">{errors.status.message}</p>}
        </div>

        <div>
          <label htmlFor="priority" className="block font-medium text-black">
            Priority:
          </label>
          <select
            className="w-full p-2 border rounded"
            {...register("priority")}
            id="priority"
            name="priority"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && (
            <p className="error">{errors.priority.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="assignee_id" className="block font-medium text-black">
            Assignee ID:
          </label>
          <input
            className="w-full p-2 border rounded"
            {...register("assignee_id")}
            type="text"
            id="assignee_id"
            name="assignee_id"
            placeholder="Enter assignee ID"
          />
          {errors.assignee_id && (
            <p className="error">{errors.assignee_id.message}</p>
          )}
        </div>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 px-4 py-2 text-white font-bold rounded hover:bg-blue-600"
            type="submit"
          >
            Update Task
          </button>
        </div>
      </form>
    </div>
  );
}
