import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { createTask } from "../services/api";
import { useNavigate } from "react-router";

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
    .test("due_date-after-start_date", "Due date must be after start date", function (value) {
      if (!value) return true;
      const { start_date } = this.parent;
      return new Date(value) >= new Date(start_date);
    }),
  description: yup.string().optional().max(500, "Description must be less than 500 characters"),
  status: yup
    .mixed<"to_do" | "in_progress" | "done">()
    .required("Status is required")
    .oneOf(["to_do", "in_progress", "done"], "Please select a valid status"),
  priority: yup
    .mixed<"low" | "medium" | "high">()
    .required("Priority is required")
    .oneOf(["low", "medium", "high"], "Please select a valid priority"),
  assignee_id: yup
    .string()
    .optional()
    .test("assignee_id", "Assignee ID must be a number ≥ 1", (value) => {
      if (!value) return true;
      const num = Number(value);
      return !isNaN(num) && num >= 1;
    }),
});

export default function CreateTaskPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
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

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
     const parsedData = {
    ...data,
    assignee_id: data.assignee_id ? Number(data.assignee_id) : undefined,
  };
    try {
       
        await createTask(parsedData);
      navigate("/tasks");
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-blue-600"> Create New Task</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block font-medium text-gray-700">
            Title
          </label>
          <input
            {...register("title")}
            id="title"
            type="text"
            placeholder="Enter task title"
            className="w-full p-2 border rounded"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register("description")}
            id="description"
            rows={3}
            placeholder="Enter task description"
            className="w-full p-2 border rounded"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Start Date */}
        <div>
          <label htmlFor="start_date" className="block font-medium text-gray-700">
            Start Date
          </label>
          <input
            {...register("start_date")}
            id="start_date"
            type="date"
            className="w-full p-2 border rounded"
          />
          {errors.start_date && <p className="text-red-500 text-sm">{errors.start_date.message}</p>}
        </div>

        {/* Due Date */}
        <div>
          <label htmlFor="due_date" className="block font-medium text-gray-700">
            Due Date
          </label>
          <input
            {...register("due_date")}
            id="due_date"
            type="date"
            className="w-full p-2 border rounded"
          />
          {errors.due_date && <p className="text-red-500 text-sm">{errors.due_date.message}</p>}
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block font-medium text-gray-700">
            Status
          </label>
          <select {...register("status")} id="status" className="w-full p-2 border rounded">
            <option value="to_do">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
        </div>

        {/* Priority */}
        <div>
          <label htmlFor="priority" className="block font-medium text-gray-700">
            Priority
          </label>
          <select {...register("priority")} id="priority" className="w-full p-2 border rounded">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && <p className="text-red-500 text-sm">{errors.priority.message}</p>}
        </div>

        <div>
          <label htmlFor="assignee_id" className="block font-medium text-gray-700">
            Assignee ID
          </label>
          <input
            {...register("assignee_id")}
            id="assignee_id"
            type="number"
            placeholder="Enter assignee ID"
            className="w-full p-2 border rounded"
          />
          {errors.assignee_id && <p className="text-red-500 text-sm">{errors.assignee_id.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}
