import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { registerUserApi } from "../fetchApi/users/register";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { loginUserApi, loginWithGoogle } from "../fetchApi/users/login";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/auth/authSlice.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const navigate = useNavigate();
  const {
    isLoading: isLoadingRegister,
    isError: isErrorRegister,
    isSuccess: isSuccessRegister,
    error: errorRegister,
    mutate: handleRegister,
  } = useMutation({
    mutationFn: registerUserApi,
    onSuccess: () => {
      toast.success("Sign up success");
      onTogglePage();
    },
  });

  const {
    mutate: handleLogin,
    isLoading: isLoadingLogin,

    isError: isErrorLogin,
    error: errorLogin,
  } = useMutation({
    mutationFn: loginUserApi,
    onSuccess: (data) => {
      const { token, ...user } = data;
      localStorage.setItem("token", data.token);
      dispatch(
        login({
          user: user,
          token: token,
        })
      );
      toast.success("Login success");
      navigate("/");
    },
  });

  const onTogglePage = () => {
    setIsLoginPage((cur) => {
      reset();
      return !cur;
    });
  };

  const onSubmit = (data) => {
    if (!isLoginPage) {
      delete data.confirm_password;
      handleRegister(data);
    } else {
      handleLogin(data);
    }
  };

  useEffect(() => {
    if (user) {
      return navigate("/");
    }
  }, [navigate, user]);

  return (
    <div className="my-8 w-full flex flex-col gap-8  items-start">
      <div className="flex flex-col gap-3 border-t-2 border-b-2 w-full border-gray-300 py-8">
        <h1 className="text-3xl font-bold text-orange-600">
          {isLoginPage ? "Sign in to Cticket" : "Sign up to Cticket"}
        </h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 font-semibold">
            {isLoginPage ? "Don't you have an account?" : "You have an account"}
          </span>
          <span
            onClick={onTogglePage}
            className="font-bold text-red-600 hover:text-red-800 transition duration-300 cursor-pointer"
          >
            {" "}
            {isLoginPage ? "Sign up" : "Sign in"}{" "}
          </span>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full border-b-2 gap-3 border-gray-300 pb-8"
      >
        {isErrorLogin || isErrorRegister || isSuccessRegister
          ? (isErrorLogin || isErrorRegister) && (
              <p className="text-red-500 bg-red-600/20 w-full py-3 rounded-lg text-center">
                {isErrorLogin ? errorLogin.message : errorRegister.message}
              </p>
            )
          : isSuccessRegister && (
              <p className="text-green-500 bg-green-600/20 w-full py-3 rounded-lg text-center">
                Sign up success
              </p>
            )}
        {/* {(isErrorLogin || isErrorRegister) && (
          <p className="text-red-500 bg-red-600/20 w-full py-3 rounded-lg text-center">
            {isErrorLogin ? errorLogin.message : errorRegister.message}
          </p>
        )}
        {isSuccessRegister && !isSuccessLogin ? (
          <p className="text-green-500 bg-green-600/20 w-full py-3 rounded-lg text-center">
            Sign up success
          </p>
        ) : (
          ""
        )} */}
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email address",
            },
          })}
          className={`${
            errors.email ? "outline-red-600" : ""
          } w-full rounded-lg px-2 py-4 duration-300 transition-all  outline-none`}
          placeholder="Email"
          type="email"
        />
        {errors.email && (
          <p className="text-left text-red-600 text-sm italic w-full">
            {errors.email.message}
          </p>
        )}
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              message: "Passwords min length great than 10",
              value: 10,
            },
            maxLength: {
              message: "Passwords max length less than or equal 16",
              value: 16,
            },
          })}
          className={`${
            errors.password ? "outline-red-600" : ""
          } w-full rounded-lg px-2 py-4 duration-300 transition-all  outline-none`}
          placeholder="Password"
          type="password"
        />
        {errors.password && (
          <p className="text-left text-red-600 text-sm italic w-full">
            {errors.password.message}
          </p>
        )}
        {!isLoginPage && (
          <input
            {...register("confirm_password", {
              required: "Confirm password is required",
              validate: (value) => {
                const password = watch("password");
                return (
                  value === password ||
                  "Password do not match with confirm password"
                );
              },
            })}
            className={`${
              errors.confirm_password ? "outline-red-600" : ""
            } w-full rounded-lg px-2 py-4 duration-300 transition-all  outline-none`}
            placeholder="Confirm password"
            type="password"
          />
        )}
        {errors.confirm_password && (
          <p className="text-left text-red-600 text-sm italic w-full">
            {errors.confirm_password.message}
          </p>
        )}
        <button
          type="submit"
          className="w-full font-semibold text-white bg-orange-600 py-3 rounded-xl flex items-center justify-center gap-3"
        >
          {(isLoadingRegister || isLoadingLogin) && <Loader size={20} />}
          {isLoginPage ? "Login" : "Register"}
        </button>
      </form>

      <span
        className="text-center w-full relative before:absolute before:w-[50px] before:h-[2px] before:bg-gray-300
      before:bottom-[50%] before:translate-y-[50%] before:translate-x-[50%] 
      after:absolute after:w-[50px] after:h-[2px] after:bg-gray-300
      after:bottom-[50%] after:translate-y-[50%] after:-translate-x-[150%]
      "
      >
        <span className="z-30">OR</span>
      </span>
      <button
        onClick={() => loginWithGoogle()}
        className="flex text-black font-semibold items-center justify-center gap-3 w-full bg-white py-2 rounded-xl"
      >
        <FcGoogle size={20} />
        Sign with Google
      </button>
    </div>
  );
};

export default Login;
