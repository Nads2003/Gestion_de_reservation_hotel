import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function RoomDetails() {
  const { id } = useParams();

  const [room, setRoom] = useState(null);
  const [availability, setAvailability] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/rooms/${id}`)
      .then(res => res.json())
      .then(setRoom);

    fetch(`http://localhost:8080/rooms/${id}/availability`)
      .then(res => res.json())
      .then(setAvailability);
  }, [id]);

  if (!room || !availability) return <div>Chargement...</div>;

  return (
    <div className="p-8 top-70 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">
        {room.type}
      </h1>

      <p className="mb-6">{room.description}</p>

      <div className="grid grid-cols-3 gap-4">

        <div className="bg-blue-100 p-4 rounded-xl">
          Total : {availability.total}
        </div>

        <div className="bg-red-100 p-4 rounded-xl">
          Occupées : {availability.occupied}
        </div>

        <div className="bg-green-100 p-4 rounded-xl">
          Libres : {availability.free}
        </div>

      </div>

      {availability.free === 0 && (
        <div className="mt-6 bg-red-500 text-white p-4 rounded-xl">
          ⚠ Toutes les chambres sont occupées
        </div>
      )}
    </div>
  );
}