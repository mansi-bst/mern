import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  ShieldCheck,
  Search,
  Edit3,
  Trash2,
  Cloud,
  Lock,
  Smartphone,
  Zap,
} from "lucide-react";
import GlowCursor from "../components/GlowCursor";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const features = [
  {
    icon: FileText,
    title: "Create Notes",
    description:
      "Create and organize your personal notes quickly with a simple and intuitive interface.",
  },
  {
    icon: Edit3,
    title: "Edit Anytime",
    description:
      "Update your notes whenever you need. Make changes without creating a new note.",
  },
  {
    icon: Trash2,
    title: "Delete Notes",
    description:
      "Remove unwanted notes easily and keep your notebook clean and organized.",
  },
  {
    icon: Search,
    title: "Quick Search",
    description:
      "Find your notes quickly using powerful search functionality.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Authentication",
    description:
      "Your account is protected with secure authentication and user-specific access.",
  },
  {
    icon: Lock,
    title: "Private Notes",
    description:
      "Your notes are private and accessible only through your authenticated account.",
  },
  {
    icon: Cloud,
    title: "Cloud Storage",
    description:
      "Keep your notes stored securely in the cloud and access them whenever you need.",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description:
      "Enjoy a consistent experience across desktops, tablets, and mobile devices.",
  },
  {
    icon: Zap,
    title: "Fast & Simple",
    description:
      "Designed for speed and simplicity so you can focus on your ideas instead of complicated tools.",
  },
];

const Features = () => {
   const navigate = useNavigate();
  
  return (
    <>
    <GlowCursor>
    <Navbar/>
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Hero Section */}
      <section className="px-6 pt-20 pb-16 text-center">
        <div className="mx-auto max-w-3xl">

          <span className="inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
            Powerful Features
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Everything you need to
            <span className="text-blue-500"> organize your ideas</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            Notebook gives you simple and powerful tools to create, manage,
            organize, and protect your notes in one place.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-10 rounded-lg border border-slate-700 px-6 py-3 font-medium text-slate-300 hover:bg-white hover:text-black transition cursor-pointer"
          >
            Back to Home
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-6xl px-6 pb-24">

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-7 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/60 hover:bg-slate-900"
              >

                {/* Icon */}
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white">
                  <Icon size={24} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mt-3 leading-7 text-slate-400">
                  {feature.description}
                </p>

              </div>
            );
          })}

        </div>

      </section>

      {/* Bottom CTA */}
      <section className="border-t border-slate-800 px-6 py-20">
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center sm:p-14">

          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to organize your ideas?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Start creating your notes today and keep your important ideas
            organized in one secure place.
          </p>

          <button
            onClick={() => (window.location.href = "/register")}
            className="mt-8 rounded-lg bg-blue-600 px-7 py-3 font-semibold transition-all duration-200 hover:scale-105 hover:bg-blue-500"
          >
            Get Started
          </button>

        </div>
      </section>
      <Footer/>
    </div>
    </GlowCursor>
    </>
  );
};

export default Features;

