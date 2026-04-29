import { useContext } from "react";
import { NoteContext } from "../Context/store.context.jsx";

const useNote = () => {
  return useContext(NoteContext);
};

export default useNote;
