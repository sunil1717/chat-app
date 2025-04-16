import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Link } from 'react-router-dom';



const Login = () => {


  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({

    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();


    login(formData)
  };





  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-950 to-gray-700 px-4">
      <div className="bg-gradient-to-t from-blue-950 to-gray-700 shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-white mb-6">Welcome back </h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-gray-50 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-gray-50 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 pr-10"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-2.5 text-sm text-blue-600 hover:underline"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-300" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-300" />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Sign In
          </button>
        </form>
        <p className=" text-center text-base-content/60">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            create an account
          </Link>
        </p>
      </div>

    </div>
  )
}

export default Login