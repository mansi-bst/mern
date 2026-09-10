import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ReminderContext = createContext();

export const useReminder = () => {
  return useContext(ReminderContext);
};

const ReminderProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [reminderNote, setReminderNote] = useState(null);

  // Fetch notes
  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setNotes([]);
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
      console.error("Reminder notes fetch error:", error);
    }
  };

  // Fetch notes when provider loads
  useEffect(() => {
    fetchNotes();
  }, []);

  // Check reminders
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

      if (dueReminder && !reminderNote) {
        setReminderNote(dueReminder);
      }
    };

    checkReminders();

    const interval = setInterval(
      checkReminders,
      1000
    );

    return () => {
      clearInterval(interval);
    };
  }, [notes, reminderNote]);

  // Dismiss reminder
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

      setReminderNote(null);
    } catch (error) {
      console.error(
        "Dismiss reminder error:",
        error
      );
    }
  };

  return (
    <ReminderContext.Provider
      value={{
        reminderNote,
        handleDismiss,
        fetchNotes,
      }}
    >
      {children}

      {reminderNote && (
        <div
          className="fixed right-6 top-6 z-9999
                     w-80 rounded-xl
                     border border-blue-500/30
                     bg-slate-900 p-5
                     text-white shadow-2xl"
        >
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
              <h3 className="font-semibold">
                Reminder
              </h3>

              <p className="text-xs text-slate-400">
                You have a reminder
              </p>
            </div>

          </div>

          <h4 className="font-semibold text-blue-400">
            {reminderNote.title}
          </h4>

          <p
            className="mt-2 text-sm
                       leading-6 text-slate-400"
          >
            {reminderNote.content}
          </p>

          <button
            type="button"
            onClick={handleDismiss}
            className="mt-4 w-full rounded-lg
                       bg-blue-600 px-4 py-2
                       text-sm font-semibold
                       transition
                       hover:bg-blue-500"
          >
            Dismiss
          </button>
        </div>
      )}
    </ReminderContext.Provider>
  );
};

export default ReminderProvider;