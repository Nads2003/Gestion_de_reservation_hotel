import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Reservations() {

  const [reservations, setReservations] = useState([]);
const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:8080/reservations")
      .then(res => res.json())
      .then(data => setReservations(data));
  }, []);

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Réservations
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full text-sm text-left">

          <thead className="bg-gray-100 text-gray-700">

            <tr>
              <th className="p-3">Nom client</th>
              <th className="p-3">Type chambre</th>
              <th className="p-3">Date début</th>
              <th className="p-3">Date fin</th>
              <th className="p-3">Statut</th>
              <th className="p-3">Action</th>
            </tr>

          </thead>

          <tbody>

            {reservations.map((r) => (

              <tr key={r.id} className="border-b hover:bg-gray-50">

                <td className="p-3">
                  {r.user?.name}
                </td>

                <td className="p-3">
                  {r.room?.type}
                </td>

                <td className="p-3">
                  {r.startDate}
                </td>

                <td className="p-3">
                  {r.endDate}
                </td>

                <td className="p-3">

                  <span className={`
                    px-2 py-1 rounded text-xs font-semibold
                    ${r.status === "CONFIRMED"
                      ? "bg-green-100 text-green-700"
                      : r.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"}
                  `}>

                    {r.status}

                  </span>

                </td>

                <td className="p-3">

<button
  onClick={() => navigate(`/admin/reservations/${r.id}`)}
  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
>
  Détails
</button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}