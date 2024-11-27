import { createContext, useContext, useReducer, useEffect } from "react";
import { notesReducer } from "../reducers/notesReducer";

const NotesContext = createContext();

const NotesProvider = ({ children }) => {
  const initialState = {
    title: "",
    text: "",
    notes: JSON.parse(localStorage.getItem("notes")) || [], // Load notes from LocalStorage
  };

  const [{ title, text, notes }, notesDispatch] = useReducer(
    notesReducer,
    initialState
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <NotesContext.Provider value={{ title, text, notes, notesDispatch }}>
      {children}
    </NotesContext.Provider>
  );
};

const useNotes = () => useContext(NotesContext);
export { NotesProvider, useNotes };
