import { Search, LogOut, Menu, X } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar({ setSearch }) {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="bg-white shadow-sm px-4 py-3">
      
      {/* TOP BAR */}
      <div className="flex items-center justify-between">
        
        {/* LOGO */}
        <h1 className="text-green-600 font-bold text-2xl">
          NotesMaker
        </h1>

        {/* DESKTOP SEARCH */}
        <div className="hidden md:flex items-center bg-green-50 px-4 py-2 rounded-full w-1/3">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search notes..."
            className="bg-transparent outline-none ml-2 w-full"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* RIGHT SIDE (DESKTOP) */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-green-200 rounded-full flex items-center justify-center font-semibold text-green-700">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>

            <span className="text-sm font-medium">
              {user?.name}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden mt-3 space-y-3">

          {/* SEARCH */}
          <div className="flex items-center bg-green-50 px-4 py-2 rounded-full">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search notes..."
              className="bg-transparent outline-none ml-2 w-full"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* USER */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-green-200 rounded-full flex items-center justify-center font-semibold text-green-700">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>

            <span className="text-sm font-medium">
              {user?.name}
            </span>
          </div>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;