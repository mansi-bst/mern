import express from "express";

import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
  setReminder,
  dismissReminder,
} from "../controller/note.Controller.js";

import verifyAuth from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", verifyAuth, createNote);

router.get("/", verifyAuth, getNotes);

router.get("/:id", verifyAuth, getNoteById);

router.put("/:id", verifyAuth, updateNote);

router.delete("/:id", verifyAuth, deleteNote);

router.put("/:id/reminder", verifyAuth, setReminder);

router.put("/:id/reminder/dismiss", verifyAuth, dismissReminder);

export default router;