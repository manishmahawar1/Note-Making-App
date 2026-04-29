import { useState, useEffect } from "react";
import useNote from "../Hooks/useNote";

function AddNoteModal({ setOpen, selectedNote, setSelectedNote }) {
  const { createNote, updateNote } = useNote();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title || "");
      setContent(selectedNote.content || "");
      setTags(selectedNote.tags?.join(", ") || "");
    } else {
      setTitle("");
      setContent("");
      setTags("");
    }
  }, [selectedNote]);

  const handleSave = async () => {
    const noteData = {
      title,
      content,
      tags: tags.split(",").map((tag) => tag.trim()),
    };

    //  UPDATE
    if (selectedNote) {
      await updateNote(selectedNote._id, noteData);
    } else {
      //  CREATE
      await createNote(noteData);
    }

    setTitle("");
    setContent("");
    setTags("");
    setSelectedNote(null);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedNote(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {selectedNote ? "Edit Note" : "Add Note"}
        </h2>

        <input
          className="w-full border p-2 mb-3"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border p-2 mb-3"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-3"
          placeholder="Tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button onClick={handleClose}>Cancel</button>

          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            {selectedNote ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddNoteModal;
