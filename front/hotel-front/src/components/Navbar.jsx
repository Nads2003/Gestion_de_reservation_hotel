
import { NavLink, useNavigate } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { useEffect, useState } from "react";


export default function Navbar() {
  const [open, setOpen] = useState(false);
const [dark, setDark] = useState(() => {
  return localStorage.getItem("theme") === "dark";
});
  const user = JSON.parse(localStorage.getItem("user"));
  const logout = () => {
  localStorage.removeItem("user");
  navigate("/");
  window.location.reload();
};
useEffect(() => {
  if (dark) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}, [dark]);
const toggleDark = () => {
  setDark(prev => !prev);
};
  const navigate = useNavigate();
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 border-b-2 border-blue-600 pb-1"
      : "text-gray-700 hover:text-blue-600";

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">
          HotelBook
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 font-medium">

          <li>
            <NavLink to="/" className={linkClass}>
              Accueil
            </NavLink>
          </li>

          <li>
            <NavLink to="/chambres" className={linkClass}>
              Chambres
            </NavLink>
          </li>

          <li>
            <NavLink to="/apropos" className={linkClass}>
              À propos
            </NavLink>
          </li>
          {user && (
  <li>
    <NavLink to="/historique" className={linkClass}>
      Historique
    </NavLink>
  </li>
)}

        </ul>

        {/* Button login */}
<div className="hidden md:flex items-center gap-4">

  {/* DARK MODE */}
  <button
    onClick={toggleDark}
    className="text-xl p-2 rounded-full hover:bg-gray-200 transition"
  >
    {dark ? <FaSun /> : <FaMoon />}
  </button>

  {/* LOGIN / LOGOUT */}
  {!user ? (
    <button
      onClick={() => navigate("/login")}
      className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
    >
      Se connecter
    </button>
  ) : (
    <button
      onClick={logout}
      className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition"
    >
      Déconnexion
    </button>
  )}

</div>

        {/* Mobile button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t px-6 py-4 space-y-4">

          <NavLink to="/" className="block hover:text-blue-600">
            Accueil
          </NavLink>

          <NavLink to="/chambres" className="block hover:text-blue-600">
            Chambres
          </NavLink>

          <NavLink to="/apropos" className="block hover:text-blue-600">
            À propos
          </NavLink>

<div className="hidden md:flex items-center gap-4">

  {/* DARK MODE */}
  <button
    onClick={toggleDark}
    className="text-xl p-2 rounded-full hover:bg-gray-200 transition"
  >
    {dark ? <FaSun /> : <FaMoon />}
  </button>

  {/* LOGIN / LOGOUT */}
  {!user ? (
    <button
      onClick={() => navigate("/login")}
      className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
    >
      Se connecter
    </button>
  ) : (
    <button
      onClick={logout}
      className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition"
    >
      Déconnexion
    </button>
  )}

</div>

        </div>
      )}
    </nav>
  );
}