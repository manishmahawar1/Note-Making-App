import axios from "axios";
import { useEffect, useState, createContext, useContext } from "react";
import { AuthContext } from "./AuthContext";
const NoteContext = createContext();

const NoteContextProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const { user } = useContext(AuthContext);

  const BackendUrl = import.meta.env.VITE_BACKEND_URI;
  const api = axios.create({
    baseURL: BackendUrl,
    withCredentials: true,
  });

  // GET NOTES
  const getNotes = async () => {
    try {
      const response = await api.get("/api/v1/notes/all",{ } ,{ withCredentials: true });

      setNotes(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  // CREATE NOTE
  const createNote = async (noteData) => {
    try {
      const response = await api.post("/api/v1/notes/create", noteData, { withCredentials: true });

      setNotes((prev) => [response.data.data, ...prev]);
    } catch (error) {
      console.log("Error", error);
    }
  };

  // UPDATE NOTE
  const updateNote = async (id, updatedNote) => {
    try {
      const response = await api.put(`/api/v1/notes/update/${id}`, updatedNote, { withCredentials: true });

      setNotes(
        notes.map((note) => (note._id === id ? response.data.data : note)),
      );
    } catch (error) {
      console.log("Error", error);
    }
  };

  // DELETE NOTE
  const deleteNote = async (id) => {
    try {
      await api.delete(`/api/v1/notes/delete/${id}`, { withCredentials: true });

      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    if (user) {
      getNotes();
    }
  }, [user]);

  const value = {
    notes,
    createNote,
    updateNote,
    deleteNote,
  };

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};

export { NoteContext, NoteContextProvider };
