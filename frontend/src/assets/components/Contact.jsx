import React, { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { errorEmitter, successEmitter } from "../../toasttify.Emitter";
import GlowCursor from "./GlowCursor";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useTheme } from "../../context/ThemeContext";

const Contact = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      errorEmitter("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/user/createContact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      console.log("Contact response:", data);

      if (!response.ok) {
        errorEmitter(data.message || "Something went wrong");
        return;
      }

      successEmitter(data.message || "Message sent successfully!");

      // Clear form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact error:", error);

      errorEmitter("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlowCursor className="min-h-screen">
      <Navbar />

      <div
        className={`min-h-screen px-6 pt-26 transition-colors duration-300 ${
          darkMode
            ? "bg-slate-950 text-white"
            : "bg-white text-slate-900"
        }`}
      >
        {/* Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">
            Contact <span className="text-blue-500">Us</span>
          </h1>

          <p
            className={`mt-4 text-lg ${
              darkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Have a question, suggestion, or feedback? We'd love to hear from
            you.
          </p>
        </div>

        {/* Main Content */}
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          {/* Contact Information */}
          <div
            className={`rounded-2xl border p-8 transition-colors duration-300 ${
              darkMode
                ? "border-slate-800 bg-slate-900"
                : "border-slate-200 bg-slate-50"
            }`}
          >
            <h2 className="mb-4 text-2xl font-semibold">
              Get in touch
            </h2>

            <p
              className={`mb-8 leading-7 ${
                darkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Whether you need help with your notes, want to report an issue,
              or simply want to share your feedback, feel free to reach out to
              us.
            </p>

            {/* Email */}
            <div className="mb-7 flex items-start gap-4">
              <div className="rounded-lg bg-blue-600/10 p-3">
                <Mail className="text-blue-500" size={24} />
              </div>

              <div>
                <h3 className="font-semibold">Email</h3>

                <a
                  href="mailto:support@notebook.com"
                  className={`transition hover:text-blue-400 ${
                    darkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  support@notebook.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="mb-7 flex items-start gap-4">
              <div className="rounded-lg bg-blue-600/10 p-3">
                <Phone className="text-blue-500" size={24} />
              </div>

              <div>
                <h3 className="font-semibold">Phone</h3>

                <a
                  href="tel:+919999999999"
                  className={`transition hover:text-blue-400 ${
                    darkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  +91 99999 99999
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-blue-600/10 p-3">
                <MapPin className="text-blue-500" size={24} />
              </div>

              <div>
                <h3 className="font-semibold">Location</h3>

                <p
                  className={
                    darkMode ? "text-slate-400" : "text-slate-600"
                  }
                >
                  India
                </p>
              </div>
            </div>

            {/* Back Home */}
            <button
              onClick={() => navigate("/")}
              className={`mt-10 cursor-pointer rounded-lg border px-6 py-3 font-medium transition ${
                darkMode
                  ? "border-slate-700 text-slate-300 hover:bg-white hover:text-black"
                  : "border-slate-300 text-slate-700 hover:bg-slate-900 hover:text-white"
              }`}
            >
              Back to Home
            </button>
          </div>

          {/* Contact Form */}
          <div
            className={`rounded-2xl border p-8 transition-colors duration-300 ${
              darkMode
                ? "border-slate-800 bg-slate-900"
                : "border-slate-200 bg-slate-50"
            }`}
          >
            <h2 className="mb-6 text-2xl font-semibold">
              Send us a message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className={`mb-2 block text-sm font-medium ${
                    darkMode ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 ${
                    darkMode
                      ? "border-slate-700 bg-slate-950 text-white placeholder:text-slate-500"
                      : "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400"
                  }`}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className={`mb-2 block text-sm font-medium ${
                    darkMode ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 ${
                    darkMode
                      ? "border-slate-700 bg-slate-950 text-white placeholder:text-slate-500"
                      : "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400"
                  }`}
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className={`mb-2 block text-sm font-medium ${
                    darkMode ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  Subject
                </label>

                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 ${
                    darkMode
                      ? "border-slate-700 bg-slate-950 text-white placeholder:text-slate-500"
                      : "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400"
                  }`}
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className={`mb-2 block text-sm font-medium ${
                    darkMode ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  rows="5"
                  className={`w-full resize-none rounded-lg border px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 ${
                    darkMode
                      ? "border-slate-700 bg-slate-950 text-white placeholder:text-slate-500"
                      : "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400"
                  }`}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`group flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold transition ${
                  loading
                    ? "cursor-not-allowed bg-slate-500 text-white"
                    : "cursor-pointer bg-blue-600 text-white hover:scale-[1.02] hover:bg-blue-500"
                }`}
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </GlowCursor>
  );
};

export default Contact;


















