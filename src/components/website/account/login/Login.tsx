// React
import { FC, useState } from "react";
// import { signIn } from "next-auth/react";

//others
import { FcGoogle } from "react-icons/fc";
// React Hook
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";

// Interfaces

interface submitData {
  email: string;
  password: string;
}

const LoginPage: FC = () => {
  const [isLoginIn, setIsLoginIn] = useState<boolean>(true);

  const { signUp, logIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<submitData>();

  const onSubmit = handleSubmit(({ email, password }) => {
    if (isLoginIn) {
      try {
        logIn(email, password);
      } catch (error) {
        console.log("Incorrect email or password");
      }
      return;
    }
    signUp(email, password);
  });

  const handleGoogleLogin = async () => {
    console.log("Google Login");
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center text-xs sm:text-sm">
      <form
        onSubmit={onSubmit}
        className="flex flex-col justify-center items-center w-full max-w-[40ch] gap-4 sm:gap-4 "
      >
        <h1 className="font-extrabold text-2xl select-none">
          {isLoginIn ? "Login" : "Register"}
        </h1>
        <input
          type="text"
          placeholder="Email"
          className="outline-none duration-300 border-b-2 border-solid border-white  focus:border-blue1 text-slate-900 p-2 w-full max-w-[40ch]"
          {...register("email", {
            required: true,
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Please enter a valid email",
            },
          })}
        />
        {errors.email && (
          <span className="text-pink w-full max-w-[40ch] border border-solid text-center">
            {errors.email?.message}
          </span>
        )}
        <input
          type="password"
          placeholder="Password"
          className="outline-none duration-300 border-b-2 border-solid border-white  focus:border-blue1 text-slate-900 p-2 w-full max-w-[40ch]"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <span className="text-pink w-full max-w-[40ch] border border-solid text-center">
            This field is required
          </span>
        )}
        <button
          type="submit"
          className="w-full max-w-[40ch] border border-white border-solid uppercase py-2 duration-500 relative after:absolute after:top-0 after:right-full after:bg-blue1 after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-500 hover:text-slate-900"
        >
          <h2 className="relative z-20">Submit</h2>
        </button>
        <button
          type="button"
          className="w-full max-w-[40ch] border border-white border-solid uppercase py-2 duration-500 relative after:absolute after:top-0 after:right-full after:bg-blue1 after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-500 hover:text-slate-900"
          onClick={() => handleGoogleLogin()}
        >
          <h2 className="flex justify-center gap gap-4 items-center relative z-20">
            Sign in with <FcGoogle />
          </h2>
        </button>
        <h2
          className="duration-300 hover:scale-110 cursor-pointer"
          onClick={() => setIsLoginIn(!isLoginIn)}
        >
          {!isLoginIn ? "Login" : "Register"}
        </h2>
      </form>
    </div>
  );
};

export default LoginPage;
