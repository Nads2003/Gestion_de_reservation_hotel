export default function AdminHome() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard Admin 🏨
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          👤 Utilisateurs
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          🛏️ Chambres
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          📅 Réservations
        </div>

      </div>
    </div>
  );
}