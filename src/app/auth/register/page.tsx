"use client";
import { RegisterInput } from "@/types/formsInterfaces/registerInput";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { onRegister } from "./actions/onRegister";

export default function Register() {
  const {
    watch,
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterInput>();

  const onSubmit: SubmitHandler<RegisterInput> = async (data) => {
    try {
      await onRegister(data);
    } catch (error) {
      if (error instanceof Error) {
        setError("username", { type: "manual", message: error.message });
      }
    }
  };

  return (
    <div className="bg-gray-900 flex items-center justify-center h-screen">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center mb-4 text-white">
          Create a new account
        </h2>
        <p className="text-gray-300 text-center mb-6">
          Enter your details to register.
        </p>
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
                required: { value: true, message: "Username is required" },
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
              htmlFor="email"
              className="block text-gray-100 text-sm font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-slate-800 w-full px-4 py-2 border focus:ring focus:ring-blue-500 focus:border-blue-500 border-gray-600 placeholder-gray-400 rounded-lg text-white"
              placeholder="James Brown"
              {...register("email", {
                required: { value: true, message: "Email is required" },
              })}
            />
            {errors?.email && (
              <span className="text-red-600 py-8">{errors.email.message}</span>
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
                required: { value: true, message: "Password is required" },
              })}
            />
            {errors?.password && (
              <span className="text-red-600 py-8">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirm-password"
              className="block text-gray-100  text-sm font-semibold mb-2"
            >
              Confirm password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="bg-slate-800 w-full px-4 py-2 border focus:ring focus:ring-blue-500 focus:border-blue-500 border-gray-600 placeholder-gray-400 rounded-lg text-white"
              placeholder="••••••••"
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "Password confirmation is required",
                },
                validate: (value) => {
                  if (value !== watch("password")) {
                    return "Passwords do not match";
                  }
                  return true;
                },
              })}
            />
            {errors?.confirmPassword && (
              <span className="text-red-600 py-8">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
