import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { errorEmitter, successEmitter } from "../../toasttify.Emitter";

const Signup = () => {
  const [formData, setFormData] = useState({
    Name: "",
    UserName: "",
    Email: "",
    Password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/user/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      console.log("Backend response:", data);

      if (!response.ok) {
         errorEmitter(data.message || "Unable to create account");
        return;
      }

      successEmitter(data.message || "Account created successfully");


      // Signup successful
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.log(error);
      errorEmitter("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Create your Account
          </h1>

          <p className="text-gray-500 mt-2">Sign up to create your account</p>
        </div>

        {/* Error */}
        {error && <div className="mb-4 text-center text-red-500">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="Name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Name
            </label>

            <input
              type="text"
              id="Name"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full rounded-xl outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500 transition px-4 py-2"
            />
          </div>

          {/* Username */}
          <div>
            <label
              htmlFor="UserName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              UserName
            </label>

            <input
              type="text"
              id="UserName"
              name="UserName"
              value={formData.UserName}
              onChange={handleChange}
              placeholder="Enter your username"
              required
              className="w-full rounded-xl outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500 transition px-4 py-2"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="Email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>

            <input
              type="email"
              id="Email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full rounded-xl outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500 transition px-4 py-2"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="Password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>

            <input
              type="password"
              id="Password"
              name="Password"
              value={formData.Password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full rounded-xl outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500 transition px-4 py-2"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 disabled:bg-gray-400"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-blue-600 font-semibold hover:text-blue-800"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
