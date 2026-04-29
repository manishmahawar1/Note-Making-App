import Note from "../models/notes.model.js";

// CREATE NOTE
const createNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    const userId = req.user.id;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const newNote = await Note.create({
      user: userId,
      title,
      content,
      tags: tags || [],
    });

    return res.status(201).json({
      success: true,
      data: newNote,
      message: "Note created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create note",
    });
  }
};

// GET ALL NOTES
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: notes,
      message: "Notes fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch notes",
    });
  }
};

// UPDATE NOTE
const updateNote = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, content, tags } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const updatedNote = await Note.findOneAndUpdate(
      {
        _id: id,
        user: req.user.id,
      },
      {
        title,
        content,
        tags: tags || [],
      },
      {
        new: true,
      },
    );

    if (!updatedNote) {
      return res.status(404).json({
        message: "Note not found or unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedNote,
      message: "Note updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update note",
    });
  }
};

// DELETE NOTE
const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNote = await Note.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!deletedNote) {
      return res.status(404).json({
        message: "Note not found or unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete note",
    });
  }
};

export { createNote, getAllNotes, updateNote, deleteNote };
