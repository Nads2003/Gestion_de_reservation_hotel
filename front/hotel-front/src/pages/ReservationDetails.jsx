import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ReservationDetails() {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/reservations/${id}`)
      .then((res) => res.json())
      .then((data) => setReservation(data));
  }, [id]);

  const updateStatus = async (status) => {
    await fetch(
      `http://localhost:8080/reservations/${id}/status?status=${status}`,
      { method: "PUT" }
    );

    setReservation({ ...reservation, status });
  };

  if (!reservation)
    return <div className="p-6 text-center">Chargement...</div>;

  const statusColor =
    reservation.status === "CONFIRMED"
      ? "bg-green-100 text-green-700"
      : reservation.status === "PENDING"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">

      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden">

        {/* HEADER FACTURE */}
        <div className="bg-blue-900 text-white p-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">FACTURE DE RÉSERVATION</h1>
            <p className="text-sm opacity-80">ID #{reservation.id}</p>
          </div>

          <span className={`px-4 py-1 rounded-full text-sm font-semibold ${statusColor}`}>
            {reservation.status}
          </span>
        </div>

        {/* CONTENT */}
        <div className="p-6 grid grid-cols-2 gap-6">

          {/* CLIENT */}
          <div className="space-y-2">
            <h2 className="font-semibold text-gray-700">Client</h2>
            <p className="text-lg">{reservation.user?.name}</p>
            <p className="text-sm text-gray-500">{reservation.user?.email}</p>
          </div>

          {/* CHAMBRE */}
          <div className="space-y-2">
            <h2 className="font-semibold text-gray-700">Chambre</h2>
            <p className="text-lg">{reservation.room?.type}</p>
            <p className="text-sm text-gray-500">
              Capacité : {reservation.room?.capacity}
            </p>
          </div>

          {/* DATES */}
          <div className="space-y-2">
            <h2 className="font-semibold text-gray-700">Dates</h2>
            <p>Début : {reservation.startDate}</p>
            <p>Fin : {reservation.endDate}</p>
          </div>

          {/* PRIX */}
          <div className="space-y-2">
            <h2 className="font-semibold text-gray-700">Paiement</h2>
            <p className="text-2xl font-bold text-blue-600">
              {reservation.totalPrice} Ar
            </p>
            <p className="text-sm text-gray-500">
              Mode : {reservation.payment?.paymentMethod}
            </p>
          </div>
        </div>

        {/* PREUVE PAIEMENT */}
        {reservation.payment?.proofImage && (
          <div className="p-6 border-t">
            <h2 className="font-semibold mb-3 text-gray-700">
              Preuve de paiement
            </h2>

            <img
              src={`http://localhost:8080/payments/proof/${reservation.payment.id}`}
              alt="preuve"
              className="w-full max-w-md rounded-xl border shadow"
            />
          </div>
        )}

        {/* ACTIONS */}
        <div className="p-6 border-t flex justify-end gap-3">

          <button
            onClick={() => updateStatus("CONFIRMED")}
            className="px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
          >
            ✔ Valider
          </button>

          <button
            onClick={() => updateStatus("REJECTED")}
            className="px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            ✖ Rejeter
          </button>

        </div>

      </div>
    </div>
  );
}