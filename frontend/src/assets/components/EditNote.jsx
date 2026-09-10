
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import GlowCursor from "./GlowCursor";

const EditNote = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [note, setNote] = useState({
    title: "",
    content: "",
    category: "",
    priority: "Medium",
    tags: "",
  });

  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderDate, setReminderDate] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  //  FETCH NOTE 

  const fetchNote = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/notes/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch note");
      }

      const fetchedNote = data.note;

      // Note data
      setNote({
        title: fetchedNote.title || "",
        content: fetchedNote.content || "",
        category: fetchedNote.category || "",
        priority: fetchedNote.priority || "Medium",
        tags: fetchedNote.tags
          ? fetchedNote.tags.join(", ")
          : "",
      });

      // Reminder data
      setReminderEnabled(
        fetchedNote.reminder?.enabled || false
      );

      if (fetchedNote.reminder?.date) {
        const date = new Date(fetchedNote.reminder.date);

        const localDate = new Date(
          date.getTime() -
            date.getTimezoneOffset() * 60000
        )
          .toISOString()
          .slice(0, 16);

        setReminderDate(localDate);
      }
    } catch (error) {
      console.error("Fetch note error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNote();
  }, [id]);

  // HANDLE INPUT 

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNote((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //  REMINDER TOGGLE

  const handleReminderToggle = () => {
    setReminderEnabled((prev) => {
      const newValue = !prev;

      if (!newValue) {
        setReminderDate("");
      }

      return newValue;
    });
  };

  //UPDATE NOTE

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/notes/${id}`,
        {
          method: "PUT",
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
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update note"
        );
      }

      console.log("Note updated:", data);

      navigate("/notes");
    } catch (error) {
      console.error("Update note error:", error);
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  //LOADING

  if (loading) {
    return (
      <div
        className="flex min-h-screen items-center
                   justify-center bg-slate-950
                   text-slate-400"
      >
        Loading note...
      </div>
    );
  }

  // UI

  return (
    <GlowCursor>
      <div className="min-h-screen bg-slate-950 px-4 py-8 text-white">
        <div className="mx-auto max-w-3xl">

          {/* HEADER*/}

          <div className="mb-8 flex items-center gap-4">

            <button
              type="button"
              onClick={() => navigate("/notes")}
              className="rounded-lg border
                         border-slate-700 p-2
                         text-slate-300 transition
                         hover:bg-slate-800
                         hover:text-white"
            >
              <ArrowLeft size={20} />
            </button>

            <div>
              <h1 className="text-3xl font-bold">
                Edit Note
              </h1>

              <p className="mt-1 text-sm text-slate-400">
                Update your note
              </p>
            </div>

          </div>

          {/*ERROR*/}

          {error && (
            <div
              className="mb-6 rounded-lg border
                         border-red-500/30
                         bg-red-500/10 p-4
                         text-red-400"
            >
              {error}
            </div>
          )}

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border
                       border-slate-800
                       bg-slate-900 p-6
                       shadow-lg sm:p-8"
          >

            {/* TITLE  */}

            <div className="mb-6">
              <label
                className="mb-2 block text-sm
                           font-medium text-slate-300"
              >
                Title
              </label>

              <input
                type="text"
                name="title"
                value={note.title}
                onChange={handleChange}
                placeholder="Enter note title"
                required
                className="w-full rounded-lg border
                           border-slate-700
                           bg-slate-950 px-4 py-3
                           text-white outline-none
                           transition
                           placeholder:text-slate-500
                           focus:border-blue-500
                           focus:ring-2
                           focus:ring-blue-500/20"
              />
            </div>

            {/* ================= CONTENT ================= */}

            <div className="mb-6">
              <label
                className="mb-2 block text-sm
                           font-medium text-slate-300"
              >
                Content
              </label>

              <textarea
                name="content"
                value={note.content}
                onChange={handleChange}
                placeholder="Write your note..."
                rows="8"
                required
                className="w-full resize-none
                           rounded-lg border
                           border-slate-700
                           bg-slate-950 px-4 py-3
                           text-white outline-none
                           transition
                           placeholder:text-slate-500
                           focus:border-blue-500
                           focus:ring-2
                           focus:ring-blue-500/20"
              />
            </div>

            {/* ================= CATEGORY + PRIORITY ================= */}

            <div className="mb-6 grid gap-6 sm:grid-cols-2">

              {/* Category */}

              <div>
                <label
                  className="mb-2 block text-sm
                             font-medium text-slate-300"
                >
                  Category
                </label>

                <input
                  type="text"
                  name="category"
                  value={note.category}
                  onChange={handleChange}
                  placeholder="e.g. Work, Personal"
                  className="w-full rounded-lg
                             border border-slate-700
                             bg-slate-950 px-4 py-3
                             text-white outline-none
                             transition
                             placeholder:text-slate-500
                             focus:border-blue-500
                             focus:ring-2
                             focus:ring-blue-500/20"
                />
              </div>

              {/* Priority */}

              <div>
                <label
                  className="mb-2 block text-sm
                             font-medium text-slate-300"
                >
                  Priority
                </label>

                <select
                  name="priority"
                  value={note.priority}
                  onChange={handleChange}
                  className="w-full rounded-lg
                             border border-slate-700
                             bg-slate-950 px-4 py-3
                             text-white outline-none
                             transition
                             focus:border-blue-500
                             focus:ring-2
                             focus:ring-blue-500/20"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

            </div>

            {/* ================= TAGS ================= */}

            <div className="mb-6">
              <label
                className="mb-2 block text-sm
                           font-medium text-slate-300"
              >
                Tags
              </label>

              <input
                type="text"
                name="tags"
                value={note.tags}
                onChange={handleChange}
                placeholder="javascript, react, frontend"
                className="w-full rounded-lg
                           border border-slate-700
                           bg-slate-950 px-4 py-3
                           text-white outline-none
                           transition
                           placeholder:text-slate-500
                           focus:border-blue-500
                           focus:ring-2
                           focus:ring-blue-500/20"
              />

              <p className="mt-2 text-xs text-slate-500">
                Separate multiple tags with commas.
              </p>
            </div>

            {/* ================= REMINDER ================= */}

            <div
              className="mb-8 rounded-xl border
                         border-slate-800
                         bg-slate-950 p-5"
            >
              <div className="flex items-center justify-between">

                <div>
                  <h3 className="font-semibold text-white">
                    Reminder
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    Set a reminder for this note
                  </p>
                </div>

                {/* Toggle */}

                <button
                  type="button"
                  onClick={handleReminderToggle}
                  className={`relative h-6 w-11
                              rounded-full transition ${
                                reminderEnabled
                                  ? "bg-blue-600"
                                  : "bg-slate-700"
                              }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4
                                rounded-full bg-white
                                transition ${
                                  reminderEnabled
                                    ? "left-6"
                                    : "left-1"
                                }`}
                  />
                </button>

              </div>

              {/* Date & Time */}

              {reminderEnabled && (
                <div className="mt-4">

                  <label
                    className="mb-2 block text-sm
                               font-medium text-slate-300"
                  >
                    Reminder Date & Time
                  </label>

                  <input
                    type="datetime-local"
                    value={reminderDate}
                    onChange={(e) =>
                      setReminderDate(e.target.value)
                    }
                    min={new Date(
                      Date.now() -
                        new Date().getTimezoneOffset() *
                          60000
                    )
                      .toISOString()
                      .slice(0, 16)}
                    required={reminderEnabled}
                    className="w-full rounded-lg
                               border border-slate-700
                               bg-slate-900 px-4 py-3
                               text-white outline-none
                               transition
                               focus:border-blue-500
                               focus:ring-2
                               focus:ring-blue-500/20"
                  />

                </div>
              )}
            </div>

            {/* ================= BUTTONS ================= */}

            <div
              className="flex flex-col gap-3
                         sm:flex-row
                         sm:justify-end"
            >

              {/* Cancel */}

              <button
                type="button"
                onClick={() => navigate("/notes")}
                className="rounded-lg border
                           border-slate-700 px-5 py-3
                           font-medium text-slate-300
                           transition
                           hover:bg-slate-800
                           hover:text-white"
              >
                Cancel
              </button>

              {/* Update */}

              <button
                type="submit"
                disabled={saving}
                className="flex items-center
                           justify-center gap-2
                           rounded-lg bg-blue-600
                           px-5 py-3 font-semibold
                           transition
                           hover:bg-blue-500
                           disabled:cursor-not-allowed
                           disabled:opacity-60"
              >
                <Save size={18} />

                {saving
                  ? "Updating..."
                  : "Update Note"}
              </button>

            </div>

          </form>
        </div>
      </div>
    </GlowCursor>
  );
};

export default EditNote;

