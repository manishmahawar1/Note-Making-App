import express from "express";

import {
  createNote,
  getAllNotes,
  updateNote,
  deleteNote,
} from "../controllers/notes.controller.js";
import protect from "../middleware/auth.middleware.js";

const notesRouter = express.Router();

notesRouter.post("/create", protect, createNote);
notesRouter.get("/all", protect, getAllNotes);
notesRouter.put("/update/:id", protect, updateNote);
notesRouter.delete("/delete/:id", protect, deleteNote);

export default notesRouter;
