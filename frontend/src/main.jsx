import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { NoteContextProvider } from "./Context/store.context.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <NoteContextProvider>
        <App />
      </NoteContextProvider>
    </AuthProvider>
  </BrowserRouter>,
);
