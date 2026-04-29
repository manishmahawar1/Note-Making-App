import { useState } from "react";

import Navbar from "../Components/Navbar";
import Notes from "../Components/Notes";
import AddNoteModal from "../Components/AddNoteModal";

function Home() {
  const [open, setOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-green-50">
      {/* NAVBAR */}
      <Navbar search={search} setSearch={setSearch} />

      {/* NOTES */}
      <div className="p-6">
        <h1 className="text-4xl font-bold text-center mb-8">My Notes</h1>

        <Notes
          setOpen={setOpen}
          setSelectedNote={setSelectedNote}
          search={search}
        />
      </div>

      {/* ADD Note BUTTON */}

      <button
        onClick={() => {
          setOpen(true);
          setSelectedNote(null);
        }}
        className="
          fixed
          bottom-6
          right-6
          bg-green-500
          hover:bg-green-600
          text-white
          w-16
          h-16
          rounded-full
          text-4xl
          shadow-lg
          transition
          cursor-pointer
        "
      >
        +
      </button>

      {/* ADD Note MODAL */}

      {open && (
        <AddNoteModal
          setOpen={setOpen}
          setSelectedNote={setSelectedNote}
          selectedNote={selectedNote}
        />
      )}
    </div>
  );
}

export default Home;
