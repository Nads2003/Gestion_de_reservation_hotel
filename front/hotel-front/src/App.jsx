import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ReservationClient from "./pages/ReservationClient";
import Home from "./pages/Home";
import Rooms from "./pages/Room";
import About from "./pages/About";
import Historique from "./pages/Historique";
import RoomDetails from "./pages/RoomDetails";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLayout from "./admin/AdminLayout";
import { Navigate } from "react-router-dom";

function App() {
 
  const user = JSON.parse(localStorage.getItem("user"));
const PrivateRoute = ({ children }) => {
  return user ? children : <Navigate to="/login" />;
};

  return (
    <BrowserRouter>

      {/* Navbar client seulement */}
      {!user || user.role !== "ADMIN" ? <Navbar /> : null}

      <Routes>

        {/* CLIENT */}
        <Route path="/" element={<Home />} />
        <Route path="/chambres" element={<Rooms />} />
        <Route path="/apropos" element={<About />} />
        <Route path="/historique" element={<Historique />} />

        <Route
  path="/reservation/:id"
  element={
    <PrivateRoute>
      <ReservationClient />
    </PrivateRoute>
  }
/>
      <Route
  path="/room/:id"
  element={
    <PrivateRoute>
      <RoomDetails />
    </PrivateRoute>
  }
/>

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ADMIN */}
        <Route
          path="/admin/*"
          element={
            user?.role === "ADMIN"
              ? <AdminLayout />
              : <Navigate to="/login" />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;