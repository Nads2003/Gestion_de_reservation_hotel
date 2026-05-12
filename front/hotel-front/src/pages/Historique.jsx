import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
export default function Historique() {

  const [reservations, setReservations] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));


  useEffect(() => {

    fetch(`http://localhost:8080/reservations/user/${user.id}`)
      .then(res => res.json())
      .then(data => setReservations(data));

  }, []);

  const downloadInvoice = (r) => {
  const doc = new jsPDF();

  // HEADER
  doc.setFillColor(30, 64, 175);
  doc.rect(0, 0, 210, 35, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text("HOTELBOOK", 15, 18);

  doc.setFontSize(12);
  doc.text("FACTURE DE RESERVATION", 15, 28);

  // INFOS FACTURE
  doc.setTextColor(0, 0, 0);

  doc.setFontSize(12);
  doc.text(`Facture #${r.id}`, 15, 50);
  doc.text(`Date : ${new Date().toLocaleDateString()}`, 140, 50);

  // TABLE
  autoTable(doc, {
    startY: 65,
    head: [["Information", "Valeur"]],
    body: [
      ["Client", user.name],
      ["Email", user.email],
      ["Chambre", r.roomType],
      ["Description", r.roomDescription],
      ["Date arrivée", r.startDate],
      ["Date départ", r.endDate],
      ["Mode paiement", r.paymentMethod],
      ["Statut", r.status],
      ["Montant total", `${r.totalPrice.toLocaleString("fr-FR")} Ar`],
    ],
  });

  // FOOTER
  doc.setFontSize(11);
  doc.text(
    "Merci pour votre confiance - HotelBook",
    15,
    doc.lastAutoTable.finalY + 20
  );

  doc.save(`facture_reservation_${r.id}.pdf`);
};

  return (
    <div className="min-h-screen bg-gray-50 p-6 mt-20">

      <h1 className="text-3xl font-bold mb-8">
        📜 Mon historique
      </h1>

      <div className="grid gap-6">

        {reservations.map(r => (

          <div
            key={r.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >

            <div className="grid md:grid-cols-3 gap-6">

              {/* IMAGE PREUVE */}
              <div className="h-60">

                {r.proofImage ? (

  <img
    src={`data:${r.proofType};base64,${r.proofImage}`}
    className="w-full h-full object-cover"
    alt="Preuve paiement"
  />

                ) : (

                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                    Pas de preuve
                  </div>

                )}

              </div>

              {/* INFO */}
              <div className="md:col-span-2 p-6 space-y-3">

                <h2 className="text-2xl font-bold text-blue-700">
                  {r.roomType}
                </h2>

                <p className="text-gray-600">
                  {r.roomDescription}
                </p>

                <div className="grid grid-cols-2 gap-4 mt-4">

                  <div>
                    <p className="text-sm text-gray-500">
                      Début
                    </p>

                    <p className="font-semibold">
                      {r.startDate}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Fin
                    </p>

                    <p className="font-semibold">
                      {r.endDate}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Montant
                    </p>

                    <p className="font-semibold text-green-600">
                      {r.totalPrice.toLocaleString("fr-FR")} Ar
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Paiement
                    </p>

                    <p className="font-semibold">
                      {r.paymentMethod || "Non défini"}
                    </p>
                  </div>

                </div>

                {/* STATUS */}
               <div className="mt-4 flex gap-3">

  <span className={`
    px-4 py-2 rounded-full text-sm font-semibold
    ${r.status === "CONFIRMED"
      ? "bg-green-100 text-green-700"
      : r.status === "PENDING"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700"}
  `}>
    {r.status}
  </span>

  {r.status === "CONFIRMED" && (
    <button
      onClick={() => downloadInvoice(r)}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow"
    >
      📄 Télécharger facture
    </button>
  )}

</div>
                

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}