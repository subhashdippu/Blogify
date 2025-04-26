import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
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

          {/* Submit */}
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn bg-green-500 text-white w-full"
            >
              Login
            </button>
          </div>

          {/* Signup Link */}
          <div className="text-center mt-4">
            Don't have an account?
            <Link to="/signup" className="ml-2 underline text-blue-600">
              Signup here
            </Link>
          </div>
        </form>

        {/* Social Buttons */}
        <div className="text-center space-x-3 mt-6">
          <button
            onClick={handleGoogleLogin}
            className="btn btn-circle hover:bg-green-500 hover:text-white"
          >
            <FaGoogle />
          </button>
          <button className="btn btn-circle hover:bg-green-500 hover:text-white">
            <FaFacebookF />
          </button>
          <button className="btn btn-circle hover:bg-green-500 hover:text-white">
            <FaGithub />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
