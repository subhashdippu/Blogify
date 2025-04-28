import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios"; // Import axios for making API calls

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false); // Loading state for button
  const [errorMessage, setErrorMessage] = useState(""); // To display any errors from backend

  const onSubmit = async (data) => {
    setLoading(true); // Set loading to true when submitting
    setErrorMessage(""); // Clear previous errors
    try {
      // Make POST request to backend for signup
      const response = await axios.post(
        "http://localhost:4001/api/auth/signup",
        {
          name: data.name,
          email: data.email,
          password: data.password,
        }
      );

      alert(response.data.message); // Alert with message from backend (signup success)
      setLoading(false); // Reset loading state
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Something went wrong!"); // Display error message
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="mb-5 w-full px-8 py-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold text-lg mb-4 text-center">
            Create an Account
          </h3>

          {/* Name */}
          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="input input-bordered w-full"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

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
              className="btn bg-blue-500 text-white w-full"
              disabled={loading} // Disable button when loading
            >
              {loading ? "Signing up..." : "Sign up"}{" "}
              {/* Show loading text if loading */}
            </button>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}

          {/* Login Link */}
          <div className="text-center mt-4">
            Already have an account?
            <Link to="/login" className="ml-2 underline text-green-600">
              Login here
            </Link>
          </div>
        </form>

        {/* Social Buttons */}
        <div className="text-center space-x-3 mt-6">
          <button className="btn  btn-circle hover:bg-green-500 hover:text-white">
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

export default Signup;
