import Note from "../schema/note.model.js";

export const createNote = async (req, res) => {
  try {
    const {
      title,
      content,
      category,
      priority,
      tags,
      reminderEnabled,
      reminderDate,
    } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const note = await Note.create({
      title,
      content,
      category,
      priority,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
      user: req.user.userId,
      reminder: {
        enabled: reminderEnabled || false,
        date: reminderEnabled ? reminderDate : null,
        notified: false,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Note created successfully",
      note,
    });
  } catch (error) {
    console.error("Create note error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create note",
    });
  }
};

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user.userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      notes,
    });
  } catch (error) {
    console.error("Get notes error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch notes",
    });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      note,
    });
  } catch (error) {
    console.error("Get note error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch note",
    });
  }
};

export const updateNote = async (req, res) => {
  try {
    const {
      title,
      content,
      category,
      priority,
      tags,
      reminderEnabled,
      reminderDate,
    } = req.body;

    const note = await Note.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.userId,
      },
      {
        title,
        content,
        category,
        priority,
        tags: tags
          ? tags.split(",").map((tag) => tag.trim())
          : [],

        reminder: {
          enabled: reminderEnabled === true,
          date: reminderEnabled ? reminderDate : null,
          notified: false,
        },
      },
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note updated successfully",
      note,
    });
  } catch (error) {
    console.error("Update note error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update note",
    });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error("Delete note error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete note",
    });
  }
};

export const setReminder = async (req, res) => {
  try {
    const { enabled, date } = req.body;

    const note = await Note.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.userId,
      },
      {
        reminder: {
          enabled,
          date: enabled ? date : null,
          notified: false,
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: enabled
        ? "Reminder set successfully"
        : "Reminder removed successfully",
      note,
    });
  } catch (error) {
    console.error("Set reminder error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to set reminder",
    });
  }
};

export const dismissReminder = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.userId,
      },
      {
        "reminder.notified": true,
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Reminder dismissed",
      note,
    });
  } catch (error) {
    console.error("Dismiss reminder error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to dismiss reminder",
    });
  }
};
