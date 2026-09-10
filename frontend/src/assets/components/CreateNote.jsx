import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, X } from "lucide-react";
import GlowCursor from "./GlowCursor";

const CreateNote = () => {
  const navigate = useNavigate();
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderDate, setReminderDate] = useState("");

  const [note, setNote] = useState({
    title: "",
    content: "",
    category: "",
    priority: "Medium",
    tags: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNote((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/notes/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...note,
            reminderEnabled,
            reminderDate: reminderEnabled
              ? new Date(reminderDate).toISOString()
              : null,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create note");
      }

      console.log("Note created:", data);

      navigate("/notes");
    } catch (error) {
      console.error("Create note error:", error);
    }
  };

  return (
    <>
      <GlowCursor>
        <div className="min-h-screen bg-slate-950 px-4 py-8 text-white">
          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate(-1)}
                  className="rounded-lg border border-slate-700 p-2
                         text-slate-300 transition
                         hover:bg-slate-800 hover:text-white"
                >
                  <ArrowLeft size={20} />
                </button>

                <div>
                  <h1 className="text-3xl font-bold">Create Note</h1>

                  <p className="mt-1 text-sm text-slate-400">
                    Write down your thoughts and ideas
                  </p>
                </div>
              </div>
            </div>

            {/* Form Card */}
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-slate-800
                     bg-slate-900 p-6 shadow-xl sm:p-8"
            >
              {/* Title */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Note Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={note.title}
                  onChange={handleChange}
                  placeholder="Enter note title..."
                  required
                  className="w-full rounded-lg border border-slate-700
                         bg-slate-950 px-4 py-3 text-white
                         outline-none transition
                         placeholder:text-slate-500
                         focus:border-blue-500 focus:ring-2
                         focus:ring-blue-500/20"
                />
              </div>

              {/* Content */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Content
                </label>

                <textarea
                  name="content"
                  value={note.content}
                  onChange={handleChange}
                  placeholder="Write your note here..."
                  rows="10"
                  required
                  className="w-full resize-none rounded-lg
                         border border-slate-700 bg-slate-950
                         px-4 py-3 text-white outline-none
                         transition placeholder:text-slate-500
                         focus:border-blue-500 focus:ring-2
                         focus:ring-blue-500/20"
                />
              </div>

              {/* Category + Priority */}
              <div className="mb-6 grid gap-6 sm:grid-cols-2">
                {/* Category */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">
                    Category
                  </label>

                  <select
                    name="category"
                    value={note.category}
                    onChange={handleChange}
                    className="w-full rounded-lg border
                           border-slate-700 bg-slate-950
                           px-4 py-3 text-white outline-none
                           focus:border-blue-500
                           focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="">Select category</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Study">Study</option>
                    <option value="Ideas">Ideas</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Priority */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">
                    Priority
                  </label>

                  <select
                    name="priority"
                    value={note.priority}
                    onChange={handleChange}
                    className="w-full rounded-lg border
                           border-slate-700 bg-slate-950
                           px-4 py-3 text-white outline-none
                           focus:border-blue-500
                           focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              {/* Tags */}
              <div className="mb-8">
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Tags
                </label>

                <input
                  type="text"
                  name="tags"
                  value={note.tags}
                  onChange={handleChange}
                  placeholder="e.g. react, javascript, learning"
                  className="w-full rounded-lg border border-slate-700
                         bg-slate-950 px-4 py-3 text-white
                         outline-none transition
                         placeholder:text-slate-500
                         focus:border-blue-500 focus:ring-2
                         focus:ring-blue-500/20"
                />

                <p className="mt-2 text-xs text-slate-500">
                  Separate multiple tags with commas.
                </p>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-slate-300">
                      Reminder
                    </label>

                    <p className="mt-1 text-xs text-slate-500">
                      Get a notification at the selected time
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setReminderEnabled(!reminderEnabled);

                      if (reminderEnabled) {
                        setReminderDate("");
                      }
                    }}
                    className={`relative h-6 w-11 rounded-full transition ${
                      reminderEnabled ? "bg-blue-600" : "bg-slate-700"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                        reminderEnabled ? "left-6" : "left-1"
                      }`}
                    />
                  </button>
                </div>

                {reminderEnabled && (
                  <div className="mt-4">
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Reminder Date & Time
                    </label>

                    <input
                      type="datetime-local"
                      value={reminderDate}
                      onChange={(e) => setReminderDate(e.target.value)}
                      min={new Date().toISOString().slice(0, 16)}
                      required={reminderEnabled}
                      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex items-center justify-center gap-2
                         rounded-lg border border-slate-700
                         px-5 py-3 text-sm font-medium
                         text-slate-300 transition
                         hover:bg-slate-800 hover:text-white"
                >
                  <X size={18} />
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2
                         rounded-lg bg-blue-600 px-5 py-3
                         text-sm font-medium text-white
                         transition hover:bg-blue-500
                         hover:shadow-lg hover:shadow-blue-500/20"
                >
                  <Save size={18} />
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      </GlowCursor>
    </>
  );
};

export default CreateNote;
