import { useForm } from 'react-hook-form';

interface IFormInput {
  status: string;
  priority: string;
}

type Props = {
  onSearch?: (filters: IFormInput) => void;
};

export default function SearchTasks({ onSearch }: Props) {
  // react form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      status: '',
      priority: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: IFormInput) => {
    if (onSearch && typeof onSearch === 'function') {
      onSearch(data);
    }
  };

  return (
    <div>
       <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-wrap items-end gap-4 bg-gray-50 p-4 rounded-lg shadow-sm"
    >
      {/* Status */}
      <div className="flex flex-col">
        <label htmlFor="status" className="font-medium text-gray-700">
          Status
        </label>
        <select
          {...register('status')}
          id="status"
          className="p-2 border rounded w-48"
        >
          <option value="">All</option>
          <option value="to_do">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      {/* Priority */}
      <div className="flex flex-col">
        <label htmlFor="priority" className="font-medium text-gray-700">
          Priority
        </label>
        <select
          {...register('priority')}
          id="priority"
          className="p-2 border rounded w-48"
        >
          <option value="">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Submit button */}
      <div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold"
        >
          Search
        </button>
      </div>
    </form>
    </div>
  );
}