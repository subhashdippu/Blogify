import React, { useState } from "react"; // <-- added useState
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(""); // <-- new state for error

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoginError(""); // clear previous errors
      const response = await axios.post(
        "http://localhost:4001/api/auth/login",
        data
      );

      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      setLoginError(error.response?.data?.message || "Login failed"); // <-- set error to show below form
    }
  };

  const handleGoogleLogin = () => {
    alert("Google login simulated.");
  };

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="mb-5 w-full px-8 py-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold text-lg mb-4 text-center">Welcome Back</h3>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Login Error */}
          {loginError && (
            <p className="text-red-500 text-center mb-4">{loginError}</p> // <-- show backend error here
          )}

          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>

        <div className="flex justify-center gap-4 mt-5">
          <FaGoogle onClick={handleGoogleLogin} className="cursor-pointer" />
          <FaFacebookF className="cursor-pointer" />
          <FaGithub className="cursor-pointer" />
        </div>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
