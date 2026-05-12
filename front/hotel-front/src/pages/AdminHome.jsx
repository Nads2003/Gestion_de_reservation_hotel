import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { FaUsers, FaBed, FaCalendarCheck } from "react-icons/fa";

export default function AdminHome() {

  const [stats, setStats] = useState(null);

 useEffect(() => {
  fetch("http://localhost:8080/dashboard/stats")
    .then(res => res.json())
    .then(data => {
      console.log("📊 DASHBOARD STATS BACKEND =", data); // 👈 AJOUT ICI
      setStats(data);
    })
    .catch(err => console.error("Erreur fetch stats :", err));
}, []);

  if (!stats) {
    return (
      <div className="p-10 text-center text-gray-500">
        Chargement des statistiques...
      </div>
    );
  }

  // 📊 DATA BAR
  const barData = [
    { name: "Utilisateurs", value: stats.users },
    { name: "Chambres", value: stats.rooms },
    { name: "réservations", value: stats.reservations },
  ];

  // 🍰 DATA PIE
  const pieData = [
    { name: "confirmé", value: stats.confirmed },
    { name: "en attente", value: stats.pending },
    { name: "annulé", value: stats.cancelled },
  ];

  const COLORS = ["#22c55e", "#facc15", "#ef4444"];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-8">
        Dashboard Admin 🏨
      </h1>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <FaUsers className="text-3xl mb-2" />
          <p className="text-sm">Utilisateurs</p>
          <h2 className="text-2xl font-bold">{stats.users}</h2>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <FaBed className="text-3xl mb-2" />
          <p className="text-sm">Chambres</p>
          <h2 className="text-2xl font-bold">{stats.rooms}</h2>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <FaCalendarCheck className="text-3xl mb-2" />
          <p className="text-sm">Réservations</p>
          <h2 className="text-2xl font-bold">{stats.reservations}</h2>
        </div>

      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* BAR CHART */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-bold mb-4">
            Vue globale 📊
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-bold mb-4">
            Statut des réservations 🍰
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* FOOTER STATS */}
      <div className="mt-8 grid grid-cols-3 gap-4 text-center">

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-green-600 font-bold">✔ Confirmé</p>
          <p>{stats.confirmed}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-yellow-500 font-bold">⏳ En attente</p>
          <p>{stats.pending}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-red-500 font-bold">❌ Annulé</p>
          <p>{stats.cancelled}</p>
        </div>

      </div>

    </div>
  );
}