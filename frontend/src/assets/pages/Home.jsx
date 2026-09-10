import React, { useEffect, useRef, useState } from "react";

import {
  ArrowRight,
  BookLock,
  CheckCircle2,
  NotebookPen,
  Zap,
} from "lucide-react";

import "../../App.css";
import VariableProximity from "../components/VariableProximity";
import ParticleText from "../components/ParticleText";
import GlowCursor from "../components/GlowCursor";
import GlareHover from "../components/GlareHover";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const containerRef = useRef(null);

  // =========================
  // Reminder State
  // =========================
  const [notes, setNotes] = useState([]);
  const [reminderNote, setReminderNote] = useState(null);

  // =========================
  // Fetch Notes
  // =========================
  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");

      // If user is not logged in, don't fetch notes
      if (!token) {
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/notes/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch notes"
        );
      }

      setNotes(data.notes || []);
    } catch (error) {
      console.error("Fetch notes error:", error);
    }
  };

  // Fetch notes when Home loads
  useEffect(() => {
    fetchNotes();
  }, []);

  // =========================
  // Check Reminders
  // =========================
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();

      const dueReminder = notes.find(
        (note) =>
          note.reminder?.enabled === true &&
          note.reminder?.date &&
          note.reminder?.notified === false &&
          new Date(note.reminder.date) <= now
      );

      if (dueReminder) {
        setReminderNote(dueReminder);
      }
    };

    checkReminders();

    // Check every second
    const interval = setInterval(
      checkReminders,
      1000
    );

    return () => clearInterval(interval);
  }, [notes]);

  // =========================
  // Dismiss Reminder
  // =========================
  const handleDismiss = async () => {
    if (!reminderNote) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/notes/${reminderNote._id}/reminder/dismiss`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to dismiss reminder"
        );
      }

      // Close popup
      setReminderNote(null);

      // Update local notes
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === reminderNote._id
            ? {
                ...note,
                reminder: {
                  ...note.reminder,
                  notified: true,
                },
              }
            : note
        )
      );
    } catch (error) {
      console.error(
        "Dismiss reminder error:",
        error
      );
    }
  };

  return (
    <GlowCursor>
      <div
        ref={containerRef}
        className="min-h-screen bg-slate-950 text-white"
      >
        {/* =========================
            Navbar
        ========================== */}
        <Navbar />

        {/* =========================
            Reminder Popup
        ========================== */}
        {reminderNote && (
          <div
            className="fixed right-6 top-6 z-50
                       w-80 rounded-xl
                       border border-blue-500/30
                       bg-slate-900 p-5
                       shadow-2xl"
          >
            {/* Reminder Header */}
            <div className="mb-4 flex items-center gap-3">
              <div
                className="flex h-10 w-10
                           items-center justify-center
                           rounded-full
                           bg-blue-500/10
                           text-xl"
              >
                🔔
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  Reminder
                </h3>

                <p className="text-xs text-slate-400">
                  You have a reminder
                </p>
              </div>
            </div>

            {/* Note Title */}
            <h4 className="font-semibold text-blue-400">
              {reminderNote.title}
            </h4>

            {/* Note Content */}
            <p
              className="mt-2 text-sm
                         leading-6 text-slate-400"
            >
              {reminderNote.content}
            </p>

            {/* Dismiss Button */}
            <button
              type="button"
              onClick={handleDismiss}
              className="mt-4 w-full rounded-lg
                         bg-blue-600 px-4 py-2
                         text-sm font-semibold
                         text-white transition
                         hover:bg-blue-500"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* =========================
            Hero Section
        ========================== */}
        <section
          className="mx-auto m-10 flex
                     min-h-[75vh] max-w-7xl
                     items-center justify-center
                     px-6 pt-30"
        >
          <div className="max-w-3xl text-center">
            {/* Hero Heading */}
            <div
              className="text-5xl font-bold
                         leading-tight sm:text-6xl
                         md:text-7xl"
            >
              <div>
                <VariableProximity
                  label="Organize your"
                  fromFontVariationSettings="'wght' 400, 'opsz' 12"
                  toFontVariationSettings="'wght' 900, 'opsz' 48"
                  containerRef={containerRef}
                  radius={100}
                  falloff="linear"
                />
              </div>

              <div className="mt-2">
                <VariableProximity
                  label="thoughts beautifully."
                  className="text-blue-500"
                  fromFontVariationSettings="'wght' 400, 'opsz' 12"
                  toFontVariationSettings="'wght' 900, 'opsz' 48"
                  containerRef={containerRef}
                  radius={100}
                  falloff="linear"
                />
              </div>
            </div>

            {/* Hero Description */}
            <p
              className="mx-auto mt-6 max-w-2xl
                         text-lg leading-8 text-slate-400"
            >
              Capture your ideas, manage your notes,
              and keep everything organized in one
              simple and modern workspace.
            </p>

            {/* Hero Features */}
            <div
              className="mt-8 flex flex-wrap
                         justify-center gap-6
                         text-sm text-slate-500"
            >
              <span className="flex items-center gap-2">
                <CheckCircle2
                  size={18}
                  className="text-green-400"
                />
                Easy to use
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2
                  size={18}
                  className="text-green-400"
                />
                Secure
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2
                  size={18}
                  className="text-green-400"
                />
                Fast
              </span>
            </div>

            {/* Small Tagline */}
            <div className="max-w-3xl pt-10 text-center">
              <p
                className="mb-5 text-sm font-semibold
                           uppercase tracking-widest
                           text-blue-400"
              >
                <span
                  className="inline-block
                             transition-transform
                             duration-300
                             hover:scale-110"
                >
                  Simple.
                </span>{" "}

                <span
                  className="inline-block
                             transition-transform
                             duration-300
                             hover:scale-110"
                >
                  Secure.
                </span>{" "}

                <span
                  className="inline-block
                             transition-transform
                             duration-300
                             hover:scale-110"
                >
                  Organized.
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* =========================
            Features Section
        ========================== */}
        <section
          id="features"
          className="mx-auto max-w-7xl
                     px-6 py-24"
        >
          <div className="mx-auto max-w-2xl text-center">
            {/* Features Heading */}
            <div
              className="text-4xl font-extrabold
                         uppercase tracking-widest
                         text-blue-400"
            >
              <VariableProximity
                label="Features"
                fromFontVariationSettings="'wght' 400, 'opsz' 12"
                toFontVariationSettings="'wght' 900, 'opsz' 48"
                containerRef={containerRef}
                radius={100}
                falloff="linear"
              />
            </div>

            {/* Features Subtitle */}
            <div
              className="mt-20 h-40 w-full
                         text-2xl uppercase"
            >
              <VariableProximity
                label="EVERYTHING YOU NEED FOR YOUR NOTES"
                fromFontVariationSettings="'wght' 400, 'opsz' 12"
                toFontVariationSettings="'wght' 900, 'opsz' 48"
                containerRef={containerRef}
                radius={100}
                falloff="linear"
              />
            </div>

            <p className="mb-6 text-slate-400">
              Keep your ideas organized with simple
              and useful tools.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Create Notes */}
            <div
              className="rounded-xl border
                         border-slate-800
                         bg-slate-900 p-7
                         transition-all duration-300
                         ease-out hover:scale-105
                         hover:border-blue-500
                         hover:shadow-lg"
            >
              <div className="mb-5 mt-4 text-3xl">
                <NotebookPen
                  size={56}
                  color="#8f6161"
                  strokeWidth={1.75}
                />
              </div>

              <h3 className="text-xl font-semibold">
                Create Notes
              </h3>

              <p
                className="mt-3 leading-7
                           text-slate-400"
              >
                Create, edit and manage your personal
                notes from one convenient place.
              </p>
            </div>

            {/* Secure */}
            <div
              className="rounded-xl border
                         border-slate-800
                         bg-slate-900 p-7
                         transition-all duration-300
                         ease-out hover:scale-105
                         hover:border-blue-500
                         hover:bg-gray-200
                         hover:text-black
                         hover:shadow-lg"
            >
              <div className="mb-5 text-3xl">
                <BookLock
                  size={56}
                  color="#8f6161"
                  strokeWidth={1.75}
                />
              </div>

              <h3 className="text-xl font-semibold">
                Secure
              </h3>

              <p
                className="mt-3 leading-7
                           text-slate-400
                           hover:text-black"
              >
                Your account and personal notes are
                protected with secure authentication.
              </p>
            </div>

            {/* Fast and Simple */}
            <div
              className="rounded-xl border
                         border-slate-800
                         bg-slate-900 p-7
                         transition-all duration-300
                         ease-out hover:scale-105
                         hover:border-blue-500
                         hover:shadow-lg"
            >
              <div className="mb-5 text-3xl">
                <Zap
                  size={56}
                  color="#8f6161"
                  strokeWidth={1.75}
                />
              </div>

              <h3 className="text-xl font-semibold">
                Fast and Simple
              </h3>

              <p
                className="mt-3 leading-7
                           text-slate-400"
              >
                A clean and simple interface that makes
                managing your notes quick and easy.
              </p>
            </div>
          </div>
        </section>

        {/* =========================
            CTA Section
        ========================== */}
        <section
          className="mx-auto max-w-5xl
                     px-6 py-24"
        >
          <GlareHover
            width="100%"
            height="auto"
            background="#0f172a"
            borderRadius="1rem"
            borderColor="#1e293b"
            glareColor="#ffffff"
            glareOpacity={0.2}
            glareAngle={45}
            glareSize={300}
            transitionDuration={800}
            playOnce={false}
          >
            <div className="p-10 text-center sm:p-14">
              <h2
                className="text-3xl font-bold
                           sm:text-4xl"
              >
                Ready to organize your ideas?
              </h2>

              <p
                className="mx-auto mt-4 max-w-xl
                           text-slate-400"
              >
                Start managing your notes today.
              </p>

              <button
                type="button"
                onClick={() =>
                  (window.location.href =
                    "/create-note")
                }
                className="mt-7 cursor-pointer
                           rounded-lg bg-blue-600
                           px-7 py-3 font-semibold
                           hover:bg-blue-500"
              >
                Create Your Notes
              </button>
            </div>
          </GlareHover>
        </section>

        {/* =========================
            Footer
        ========================== */}
        <Footer />
      </div>
    </GlowCursor>
  );
};

export default Home;