import { NavLink, Routes, Route, useNavigate } from "react-router-dom";

import AdminHome from "../pages/AdminHome";
import Users from "../pages/Users";
import RoomsAdmin from "../pages/RoomsAdmin";
import Reservations from "../pages/Reservations";
import ReservationDetails from "../pages/ReservationDetails";

export default function AdminLayout() {

  const navigate = useNavigate();

 const logout = () => {
  localStorage.removeItem("user");

  // refresh complet
  window.location.href = "/";
};

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-xl transition-all duration-200
     ${isActive
       ? "bg-white text-blue-900 shadow-md font-semibold"
       : "text-white hover:bg-blue-700 hover:pl-4"}`;

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white p-6 fixed h-full shadow-xl flex flex-col justify-between">

        <div>

          <h1 className="text-2xl font-bold mb-10 tracking-wide">
            Admin Panel
          </h1>

          <nav className="space-y-3">

            <NavLink to="/admin" end className={linkClass}>
              <span>🏠</span> Accueil
            </NavLink>

            <NavLink to="/admin/users" className={linkClass}>
              <span>👤</span> Utilisateurs
            </NavLink>

            <NavLink to="/admin/rooms" className={linkClass}>
              <span>🛏️</span> Chambres
            </NavLink>

            <NavLink to="/admin/reservations" className={linkClass}>
              <span>📅</span> Réservations
            </NavLink>

          </nav>

        </div>

        {/* LOGOUT */}
        <button
          onClick={logout}
          className="w-full bg-red-500 hover:bg-red-600 transition-all duration-200 p-3 rounded-xl font-semibold shadow-md"
        >
          🚪 Déconnexion
        </button>

      </div>

      {/* CONTENT */}
      <div className="ml-64 p-8 w-full">

        <Routes>
          <Route path="/" element={<AdminHome />} />
          <Route path="/users" element={<Users />} />
          <Route path="/rooms" element={<RoomsAdmin />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/reservations/:id" element={<ReservationDetails />} />
        </Routes>

      </div>

    </div>
  );
}