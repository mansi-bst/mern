import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  CheckCircle,
  Shield,
  Zap,
  Users,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";
import GlowCursor from "../components/GlowCursor";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
    const navigate = useNavigate();
  const containerRef = useRef(null);
  return (
    <>
      <GlowCursor className="min-h-screen">
        <Navbar />

        <div className="min-h-screen bg-slate-950 text-white">
          <button
            onClick={() => navigate("/")}
            className="absolute left-6 top-24 rounded-lg border border-slate-700 p-2
               text-slate-300 transition
               hover:bg-slate-800 hover:text-white"
          >
            <ArrowLeft size={20} />
          </button>

          {/* Hero Section */}
          <section className="mx-auto max-w-6xl px-6 py-20 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-500">
              <BookOpen size={34} />
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              About <span className="text-blue-500">Notebook</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
              Notebook is a simple and secure platform designed to help you
              organize your thoughts, ideas, notes, and important information in
              one convenient place.
            </p>
          </section>

          {/* About Content */}
          <section className="mx-auto max-w-6xl px-6 pb-20">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              {/* Left */}
              <div>
                <h2 className="text-3xl font-bold">
                  Everything you need to organize your ideas
                </h2>

                <p className="mt-5 leading-7 text-slate-400">
                  We created Notebook with one simple goal: to make note-taking
                  easy, organized, and accessible. Whether you are writing down
                  daily thoughts, managing study notes, saving ideas, or keeping
                  track of important information, Notebook gives you a simple
                  space to manage everything.
                </p>

                <p className="mt-4 leading-7 text-slate-400">
                  Instead of keeping your notes scattered across different
                  applications, Notebook allows you to keep them organized in
                  one place and access them whenever you need them.
                </p>

                <Link
                  to="/create-note"
                  className="mt-7 inline-flex items-center gap-2 rounded-lg
              bg-blue-600 px-6 py-3 font-semibold
              transition-all duration-200
              hover:scale-105 hover:bg-blue-500"
                >
                  Start Writing
                  <ArrowRight size={18} />
                </Link>
              </div>

              {/* Right */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
                <h3 className="text-2xl font-semibold">Why Notebook?</h3>

                <div className="mt-7 space-y-6">
                  <div className="flex gap-4">
                    <CheckCircle className="mt-1 shrink-0 text-blue-500" />

                    <div>
                      <h4 className="font-semibold">Simple and Easy</h4>

                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        Create and manage your notes without unnecessary
                        complexity.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Shield className="mt-1 shrink-0 text-blue-500" />

                    <div>
                      <h4 className="font-semibold">Secure</h4>

                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        Your account and notes are protected with secure
                        authentication.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Zap className="mt-1 shrink-0 text-blue-500" />

                    <div>
                      <h4 className="font-semibold">Fast</h4>

                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        Quickly create, update, and access your notes whenever
                        you need them.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="border-y border-slate-800 bg-slate-900/40">
            <div className="mx-auto max-w-6xl px-6 py-20">
              <div className="text-center">
                <h2 className="text-3xl font-bold">
                  Built for Your Everyday Notes
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-slate-400">
                  Whether you are a student, developer, professional, or simply
                  someone who likes keeping things organized, Notebook is built
                  to fit your everyday needs.
                </p>
              </div>

              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Feature 1 */}
                <div className="rounded-xl border border-slate-800 bg-slate-900 p-7 transition-all duration-200 hover:-translate-y-1 hover:border-blue-500">
                  <BookOpen className="text-blue-500" size={30} />

                  <h3 className="mt-5 text-xl font-semibold">Create Notes</h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    Easily create notes and keep your thoughts organized.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="rounded-xl border border-slate-800 bg-slate-900 p-7 transition-all duration-200 hover:-translate-y-1 hover:border-blue-500">
                  <Shield className="text-blue-500" size={30} />

                  <h3 className="mt-5 text-xl font-semibold">
                    Protected Account
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    Secure authentication helps protect your personal notes and
                    account.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="rounded-xl border border-slate-800 bg-slate-900 p-7 transition-all duration-200 hover:-translate-y-1 hover:border-blue-500">
                  <Zap className="text-blue-500" size={30} />

                  <h3 className="mt-5 text-xl font-semibold">Easy to Use</h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    A clean interface makes managing your notes quick and
                    straightforward.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Mission */}
          <section className="mx-auto max-w-4xl px-6 py-20 text-center">
            <Users className="mx-auto text-blue-500" size={36} />

            <h2 className="mt-5 text-3xl font-bold">Our Mission</h2>

            <p className="mt-5 text-lg leading-8 text-slate-400">
              Our mission is to provide a simple digital space where people can
              capture their ideas, organize their thoughts, and stay productive
              without distractions.
            </p>
          </section>
        </div>
        <Footer />
      </GlowCursor>
    </>
  );
};

export default About;
