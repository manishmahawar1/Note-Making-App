import { Trash2, Edit } from "lucide-react";
import useNote from "../Hooks/useNote.js";

function Notes({ setOpen, setSelectedNote, search }) {
  const { notes, deleteNote } = useNote();

  // SAFE SEARCH FILTER
  const filteredNotes = notes.filter((note) => {
    const check = search?.toLowerCase() || "";

    return (
      note.title.toLowerCase().includes(check) ||
      note.content.toLowerCase().includes(check) ||
      note.tags?.some((tag) =>
        tag.toLowerCase().includes(check)
      )
    );
  });

  // EMPTY STATE
  if (!filteredNotes || filteredNotes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <img
          src="/home_page.png"
          alt="No notes"
          className="w-60 h-60 object-contain"
        />

        <h2 className="text-xl font-semibold text-green-600 mt-4">
          Nothing here yet...
        </h2>

        <p className="text-gray-500 mt-2">
          Start creating your first note.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3 
        gap-4
      "
    >
      {filteredNotes.map((note) => (
        <div
          key={note._id}
          className="bg-white p-4 rounded-lg shadow"
        >
          {/* TITLE */}
          <h2 className="font-bold text-green-600">
            {note.title}
          </h2>

          {/* CONTENT */}
          <p className="text-sm mt-2">
            {note.content}
          </p>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2 mt-3">
            {note.tags?.map((tag, i) => (
              <span
                key={i}
                className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 mt-4">
            <Edit
              size={18}
              className="cursor-pointer text-blue-500"
              onClick={() => {
                setSelectedNote(note);
                setOpen(true);
              }}
            />

            <Trash2
              size={18}
              className="cursor-pointer text-red-500"
              onClick={() => deleteNote(note._id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Notes;