//React
import React from "react";
// Hooks
import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";

type FormData = {
  todo: string;
};

const UserDashboard = () => {
  const [todos, setTodos] = React.useState("");
  const [addTodo, setAddTodo] = React.useState(false);

  const { user } = useAuth();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <div className="w-full max-w-[65ch] mx-auto ">
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:gap-5">
        <label>Add new Todo:</label>
        <div className="flex items-stretch">
          <input
            {...register("todo")}
            value={todos}
            required
            className="outline-none p-2 text-base sm:text-lg text-slate-900 flex-1"
            onChange={(e) => setTodos(e.target.value)}
          />
          <button className="w-fit px-4 sm:px-6 py-2 sm:py-3 bg-pink text-slate-900 font-medium text-base duration-300 hover:opacity-60">
            Add
          </button>
        </div>
        {user && <></>}
        <button
          type="submit"
          className="text-bg-cyan-300 border border-solid border-cyan-300 py-2 text-center uppercase font-medium text-lg duration-300 hover:opacity-30"
        >
          ADD TODO
        </button>
      </form>
    </div>
  );
};

export default UserDashboard;
