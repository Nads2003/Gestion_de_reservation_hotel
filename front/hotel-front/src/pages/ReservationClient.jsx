import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ReservationClient() {

  const { id } = useParams();

  const today = new Date().toISOString().split("T")[0];

  const [room, setRoom] = useState(null);

  const [form, setForm] = useState({
    startDate: today,
    endDate: "",
    paymentMethod: ""
  });

  const [proof, setProof] = useState(null);

  const [total, setTotal] = useState(0);

  // LOAD ROOM
  useEffect(() => {
    fetch(`http://localhost:8080/rooms/${id}`)
      .then(res => res.json())
      .then(data => setRoom(data));
  }, [id]);

  // CALCUL TOTAL
  useEffect(() => {

    if (form.startDate && form.endDate && room) {

      const start = new Date(form.startDate);
      const end = new Date(form.endDate);

      const diff =
        (end - start) / (1000 * 60 * 60 * 24);

      if (diff > 0) {
        setTotal(diff * room.price);
      } else {
        setTotal(0);
      }

    }

  }, [form.startDate, form.endDate, room]);

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // HANDLE FILE
  const handleFile = (e) => {
    setProof(e.target.files[0]);
  };

  // RESERVATION
  const reserve = async () => {

    const user =
      JSON.parse(localStorage.getItem("user"));

    // VALIDATION
    if (!form.startDate || !form.endDate) {
      alert("Veuillez sélectionner les dates");
      return;
    }

    const start = new Date(form.startDate);
    const end = new Date(form.endDate);

    if (start >= end) {
      alert("La date de départ doit être supérieure à la date d'arrivée");
      return;
    }

    if (!form.paymentMethod) {
      alert("Choisissez un mode de paiement");
      return;
    }

    if (!proof) {
      alert("Veuillez ajouter une preuve de paiement");
      return;
    }

    const formData = new FormData();

    formData.append("userId", user.id);
    formData.append("roomId", room.id);

    formData.append("startDate", form.startDate);
    formData.append("endDate", form.endDate);

    formData.append(
      "paymentMethod",
      form.paymentMethod
    );

    formData.append("proofImage", proof);

   const res = await fetch("http://localhost:8080/reservations", {
  method: "POST",
  body: formData
});

if (!res.ok) {
  const message = await res.text();
  alert("Toutes les chambres sont déjà réservées pour ces dates");
  return;
}

alert("Réservation envoyée ✅");

    
  };

  if (!room)
    return (
      <div className="pt-32 text-center">
        Chargement...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 pt-28 px-6">

      <div className="max-w-5xl mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-2">

        {/* IMAGE */}
        <div className="relative">

          <img
            src={`http://localhost:8080/rooms/image/${room.images?.[0]?.id}`}
            className="w-full h-full object-cover"
          />

          <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg">
            {room.price.toLocaleString("fr-FR")} Ar / nuit
          </div>

        </div>

        {/* FORM */}
        <div className="p-8 space-y-5">

          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {room.type}
            </h2>

            <p className="text-gray-500 mt-2 leading-relaxed">
              {room.description}
            </p>
          </div>

          {/* STATUS */}
          <div className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-xl text-sm font-semibold">
            Statut initial : En_cours
          </div>

          {/* DATES */}
          <div className="space-y-4">

            <div>
              <label className="text-sm font-medium text-gray-600">
                Date d'arrivée
              </label>

              <input
                type="date"
                name="startDate"
                min={today}
                value={form.startDate}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-xl outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Date de départ
              </label>

              <input
                type="date"
                name="endDate"
                min={form.startDate}
                value={form.endDate}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-xl outline-none"
              />
            </div>

          </div>

          {/* PAYMENT */}
          <div>

            <label className="text-sm font-medium text-gray-600">
              Mode de paiement
            </label>

            <select
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-xl outline-none"
            >
              <option value="">
                Choisir un mode de paiement
              </option>

              <option value="MVOLA">
                MVola
              </option>

              <option value="ORANGE_MONEY">
                Orange Money
              </option>

              <option value="AIRTEL_MONEY">
                Airtel Money
              </option>

              <option value="BANCAIRE">
                Carte bancaire
              </option>

            </select>

          </div>

          {/* PREUVE */}
          <div>

            <label className="text-sm font-medium text-gray-600">
              Preuve de paiement
            </label>

            <input
              type="file"
              onChange={handleFile}
              className="w-full border border-gray-300 p-3 rounded-xl"
            />

          </div>

          {/* TOTAL */}
          <div className="bg-gray-50 border rounded-2xl p-5 space-y-2 shadow-sm">

            <div className="flex justify-between">
              <span className="text-gray-600">
                Prix par nuit
              </span>

              <span className="font-semibold">
                {room.price.toLocaleString("fr-FR")} Ar
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">
                Capacité
              </span>

              <span className="font-semibold">
                {room.capacity} personnes
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">
                Nombre de nuits
              </span>

              <span className="font-semibold">
                {total > 0 ? total / room.price : 0}
              </span>
            </div>

            <hr />

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>

              <span className="text-blue-600">
                 {total.toLocaleString("fr-FR")} Ar
              </span>
            </div>

          </div>

          {/* BUTTON */}
          <button
            onClick={reserve}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold shadow-lg transition duration-300"
          >
            Confirmer la réservation
          </button>

        </div>

      </div>

    </div>
  );
}