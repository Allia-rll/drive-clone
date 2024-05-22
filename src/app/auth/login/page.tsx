"use client";
import { LoginInput } from "@/types/formsInterfaces/loginInput";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();
  const router = useRouter();
  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    try {
      const { username, password } = data;
      const response = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if(response?.ok){
        router.push("/dashboard");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="bg-gray-900 flex items-center justify-center h-screen">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center mb-4 text-white">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-100 text-sm font-semibold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="bg-slate-800 w-full px-4 py-2 border focus:ring focus:ring-blue-500 focus:border-blue-500 border-gray-600 placeholder-gray-400 rounded-lg text-white"
              placeholder="James Brown"
              {...register("username", {
                required: {
                  value: true,
                  message: "Username is required",
                },
              })}
            />
            {errors?.username && (
              <span className="text-red-600 py-8">
                {errors.username.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-100  text-sm font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-slate-800 w-full px-4 py-2 border focus:ring focus:ring-blue-500 focus:border-blue-500 border-gray-600 placeholder-gray-400 rounded-lg text-white"
              placeholder="••••••••"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
              })}
            />
            {errors?.password && (
              <span className="text-red-600 py-8">
                {errors.password.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
