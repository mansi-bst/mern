
import React, { useRef, useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { errorEmitter, successEmitter } from "../../toasttify.Emitter";
import GlowCursor from "./GlowCursor";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Contact = () => {
  const navigate = useNavigate();

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

      successEmitter(
        data.message || "Message sent successfully!"
      );

      // Clear form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact error:", error);

      errorEmitter(
        "Unable to connect to server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  const containerRef = useRef(null);

  return (
    <>
    
     <GlowCursor className="min-h-screen">
      <Navbar/>
    <div className="min-h-screen bg-slate-950 text-white px-6 pt-26">

      {/* Header */}
      <div className="mx-auto max-w-3xl text-center mb-14">
        <h1 className="text-4xl sm:text-5xl font-bold">
          Contact <span className="text-blue-500">Us</span>
        </h1>

        <p className="mt-4 text-slate-400 text-lg">
          Have a question, suggestion, or feedback?
          We'd love to hear from you.
        </p>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-2">

        {/* Contact Information */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

          <h2 className="text-2xl font-semibold mb-4">
            Get in touch
          </h2>

          <p className="text-slate-400 leading-7 mb-8">
            Whether you need help with your notes, want to report
            an issue, or simply want to share your feedback, feel
            free to reach out to us.
          </p>

          {/* Email */}
          <div className="flex items-start gap-4 mb-7">
            <div className="rounded-lg bg-blue-600/10 p-3">
              <Mail className="text-blue-500" size={24} />
            </div>

            <div>
              <h3 className="font-semibold">
                Email
              </h3>

              <a
                href="mailto:support@notebook.com"
                className="text-slate-400 hover:text-blue-400 transition"
              >
                support@notebook.com
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4 mb-7">
            <div className="rounded-lg bg-blue-600/10 p-3">
              <Phone className="text-blue-500" size={24} />
            </div>

            <div>
              <h3 className="font-semibold">
                Phone
              </h3>

              <a
                href="tel:+919999999999"
                className="text-slate-400 hover:text-blue-400 transition"
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
              <h3 className="font-semibold">
                Location
              </h3>

              <p className="text-slate-400">
                India
              </p>
            </div>
          </div>

          {/* Back Home */}
          <button
            onClick={() => navigate("/")}
            className="mt-10 rounded-lg border border-slate-700 px-6 py-3 font-medium text-slate-300 hover:bg-white hover:text-black transition cursor-pointer"
          >
            Back to Home
          </button>
        </div>

        {/* Contact Form */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

          <h2 className="text-2xl font-semibold mb-6">
            Send us a message
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-slate-300"
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
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-slate-300"
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
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
              />
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className="block mb-2 text-sm font-medium text-slate-300"
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
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-slate-300"
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
                className="w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500 hover:scale-[1.02] disabled:cursor-not-allowed disabled:bg-slate-700"
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
      <Footer/>

    </div>
    </GlowCursor>
    </>
  );
};


export default Contact;
