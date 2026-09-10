import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, ArrowLeft, Trash2, Edit } from "lucide-react";

import GlowCursor from "./GlowCursor";
import { errorEmitter, successEmitter } from "../../toasttify.Emitter";
import { useTheme } from "../../context/ThemeContext";

const Notes = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteNoteId, setDeleteNoteId] = useState(null);

  // Fetch notes
  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");

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
        throw new Error(data.message || "Failed to fetch notes");
      }

      setNotes(data.notes || []);
    } catch (error) {
      console.error("Fetch notes error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete note
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/notes/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        errorEmitter(data.message || "Failed to delete note");
        return;
      }

      setNotes((prevNotes) =>
        prevNotes.filter((note) => note._id !== id)
      );

      setDeleteNoteId(null);

      successEmitter("Note deleted successfully");
    } catch (error) {
      console.error("Delete note error:", error);
      errorEmitter("Something went wrong");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <GlowCursor>
      <div
        className={`min-h-screen px-4 py-8 transition-colors duration-300 ${
          darkMode
            ? "bg-slate-950 text-white"
            : "bg-white text-slate-900"
        }`}
      >
        <div className="mx-auto max-w-6xl">

          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">

              {/* Back Button */}
              <button
                type="button"
                onClick={() => navigate("/")}
                className={`cursor-pointer rounded-lg border p-2 transition ${
                  darkMode
                    ? "border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                    : "border-slate-300 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <ArrowLeft size={20} />
              </button>

              <div>
                <h1 className="text-3xl font-bold">
                  My Notes
                </h1>

                <p
                  className={`mt-1 text-sm ${
                    darkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  Manage all your notes
                </p>
              </div>

            </div>

            {/* Add Note */}
            <button
              type="button"
              onClick={() => navigate("/create-note")}
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              <Plus size={18} />
              Add Note
            </button>
          </div>

          {/* Loading */}
          {loading && (
            <div
              className={`py-20 text-center ${
                darkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Loading notes...
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div
              className="rounded-lg border border-red-500/30
                         bg-red-500/10 p-4 text-center text-red-400"
            >
              {error}
            </div>
          )}

          {/* No Notes */}
          {!loading && !error && notes.length === 0 && (
            <div
              className={`rounded-2xl border p-12 text-center transition-colors duration-300 ${
                darkMode
                  ? "border-slate-800 bg-slate-900"
                  : "border-slate-200 bg-slate-50"
              }`}
            >
              <h2 className="text-xl font-semibold">
                No notes yet
              </h2>

              <p
                className={`mt-2 ${
                  darkMode ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Create your first note to get started.
              </p>

              <button
                type="button"
                onClick={() => navigate("/create-note")}
                className="mt-6 cursor-pointer rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-500"
              >
                Create Note
              </button>
            </div>
          )}

          {/* Notes Table */}
          {!loading && !error && notes.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">

                <thead>
                  <tr
                    className={`border-b text-left ${
                      darkMode
                        ? "border-slate-800"
                        : "border-slate-200"
                    }`}
                  >
                    <th
                      className={`px-4 py-4 text-sm font-semibold ${
                        darkMode
                          ? "text-slate-300"
                          : "text-slate-700"
                      }`}
                    >
                      S.No.
                    </th>

                    <th
                      className={`px-4 py-4 text-sm font-semibold ${
                        darkMode
                          ? "text-slate-300"
                          : "text-slate-700"
                      }`}
                    >
                      Title
                    </th>

                    <th
                      className={`px-4 py-4 text-sm font-semibold ${
                        darkMode
                          ? "text-slate-300"
                          : "text-slate-700"
                      }`}
                    >
                      Content
                    </th>

                    <th
                      className={`px-4 py-4 text-sm font-semibold ${
                        darkMode
                          ? "text-slate-300"
                          : "text-slate-700"
                      }`}
                    >
                      Category
                    </th>

                    <th
                      className={`px-4 py-4 text-sm font-semibold ${
                        darkMode
                          ? "text-slate-300"
                          : "text-slate-700"
                      }`}
                    >
                      Priority
                    </th>

                    <th
                      className={`px-4 py-4 text-sm font-semibold ${
                        darkMode
                          ? "text-slate-300"
                          : "text-slate-700"
                      }`}
                    >
                      Tags
                    </th>

                    <th
                      className={`px-4 py-4 text-sm font-semibold ${
                        darkMode
                          ? "text-slate-300"
                          : "text-slate-700"
                      }`}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {[...notes]
                    .sort(
                      (a, b) =>
                        new Date(b.createdAt) -
                        new Date(a.createdAt)
                    )
                    .map((note, index) => (
                      <tr
                        key={note._id}
                        className={`border-b transition ${
                          darkMode
                            ? "border-slate-800 hover:bg-slate-900"
                            : "border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {/* S.No. */}
                        <td
                          className={`px-4 py-5 align-top ${
                            darkMode
                              ? "text-slate-400"
                              : "text-slate-600"
                          }`}
                        >
                          {index + 1}
                        </td>

                        {/* Title */}
                        <td className="px-4 py-5 align-top">
                          <h2
                            className={`font-semibold ${
                              darkMode
                                ? "text-white"
                                : "text-slate-900"
                            }`}
                          >
                            {note.title}
                          </h2>
                        </td>

                        {/* Content */}
                        <td className="max-w-md px-4 py-5 align-top">
                          <p
                            className={`line-clamp-4 text-sm ${
                              darkMode
                                ? "text-slate-400"
                                : "text-slate-600"
                            }`}
                          >
                            {note.content}
                          </p>
                        </td>

                        {/* Category */}
                        <td className="px-4 py-5 align-top">
                          {note.category && (
                            <span
                              className={`rounded-full px-3 py-1 text-xs ${
                                darkMode
                                  ? "bg-blue-500/10 text-blue-400"
                                  : "bg-blue-100 text-blue-600"
                              }`}
                            >
                              {note.category}
                            </span>
                          )}
                        </td>

                        {/* Priority */}
                        <td className="px-4 py-5 align-top">
                          {note.priority && (
                            <span
                              className={`rounded-full px-3 py-1 text-xs ${
                                darkMode
                                  ? "bg-purple-500/10 text-purple-400"
                                  : "bg-purple-100 text-purple-600"
                              }`}
                            >
                              {note.priority}
                            </span>
                          )}
                        </td>

                        {/* Tags */}
                        <td className="px-4 py-5 align-top">
                          <div className="flex flex-wrap gap-2">
                            {note.tags?.map((tag, index) => (
                              <span
                                key={index}
                                className={`rounded-full px-3 py-1 text-xs ${
                                  darkMode
                                    ? "bg-green-500/10 text-green-400"
                                    : "bg-green-100 text-green-600"
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-5 align-top">
                          <div className="flex flex-wrap gap-3">

                            {/* Edit */}
                            <button
                              type="button"
                              onClick={() =>
                                navigate(`/edit-note/${note._id}`)
                              }
                              className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition ${
                                darkMode
                                  ? "border-slate-700 text-slate-300 hover:bg-slate-800"
                                  : "border-slate-300 text-slate-700 hover:bg-slate-100"
                              }`}
                            >
                              <Edit size={16} />
                              Edit
                            </button>

                            {/* Delete */}
                            <button
                              type="button"
                              onClick={() =>
                                setDeleteNoteId(note._id)
                              }
                              className="flex cursor-pointer items-center gap-2 rounded-lg border border-red-500/30 px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
                            >
                              <Trash2 size={16} />
                              Delete
                            </button>

                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>

              </table>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteNoteId && (
        <div
          className="fixed inset-0 z-100 flex items-center
                     justify-center bg-black/70 px-4
                     backdrop-blur-sm"
        >
          <div
            className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl ${
              darkMode
                ? "border-slate-700 bg-slate-900"
                : "border-slate-200 bg-white"
            }`}
          >
            {/* Delete Icon */}
            <div
              className="mx-auto mb-5 flex h-14 w-14
                         items-center justify-center
                         rounded-full bg-red-500/10"
            >
              <Trash2
                size={28}
                className="text-red-500"
              />
            </div>

            {/* Title */}
            <h2
              className={`text-center text-2xl font-bold ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Delete Note?
            </h2>

            {/* Message */}
            <p
              className={`mt-3 text-center text-sm leading-6 ${
                darkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Are you sure you want to permanently delete this note?
              <br />
              This action cannot be undone.
            </p>

            {/* Buttons */}
            <div className="mt-7 flex gap-3">

              {/* Cancel */}
              <button
                type="button"
                onClick={() => setDeleteNoteId(null)}
                className={`flex-1 cursor-pointer rounded-lg border px-4 py-3 font-medium transition ${
                  darkMode
                    ? "border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                    : "border-slate-300 text-slate-700 hover:bg-slate-100"
                }`}
              >
                Cancel
              </button>

              {/* Delete */}
              <button
                type="button"
                onClick={() => handleDelete(deleteNoteId)}
                className="flex-1 cursor-pointer rounded-lg bg-red-600 px-4 py-3 font-medium text-white transition hover:bg-red-500"
              >
                Delete
              </button>

            </div>
          </div>
        </div>
      )}
    </GlowCursor>
  );
};

export default Notes;













