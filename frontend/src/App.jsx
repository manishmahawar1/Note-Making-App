import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import Home from "./Pages/Home.jsx";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  const { user, loading } = useContext(AuthContext);
  if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center bg-green-50">
        <div className="flex flex-col items-center gap-3">
          {/* SPINNER */}
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>

          {/* TEXT */}
          <p className="text-green-600 font-medium">Loading your notes...</p>
        </div>
      </div>
    );

  return (
    <>
      <Toaster />

      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
