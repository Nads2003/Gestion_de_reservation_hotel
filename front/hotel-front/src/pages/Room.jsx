import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Rooms() {
  // NAVIGATE
  const navigate = useNavigate();
  // STATES
  const [rooms, setRooms] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [currentIndex, setCurrentIndex] = useState({});
// LOAD ROOMS
  useEffect(() => {
  const keyword = search.toLowerCase();

  const result = rooms.filter(room => {
    const type = room.type?.toLowerCase() || "";
    const desc = room.description?.toLowerCase() || "";
    const price = room.price?.toString() || "";

    return (
      type.includes(keyword) ||
      desc.includes(keyword) ||
      price.includes(keyword)
    );
  });

  setFiltered(result);
}, [search, rooms]);
useEffect(() => {
  fetch("http://localhost:8080/rooms")
    .then(res => res.json())
    .then(data => {
      setRooms(data);
      setFiltered(data);

      const indexObj = {};
      data.forEach(r => indexObj[r.id] = 0);
      setCurrentIndex(indexObj);
    });
}, []);
  // SEARCH FILTER
  useEffect(() => {
    const result = rooms.filter(room =>
      room.type.toLowerCase().includes(search.toLowerCase()) ||
      room.description?.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, rooms]);
// CAROUSEL
  const nextImage = (roomId, length) => {
    setCurrentIndex(prev => ({
      ...prev,
      [roomId]: (prev[roomId] + 1) % length
    }));
  };
// CAROUSEL
  const prevImage = (roomId, length) => {
    setCurrentIndex(prev => ({
      ...prev,
      [roomId]: (prev[roomId] - 1 + length) % length
    }));
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* 🔥 HERO SECTION */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-600 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Trouvez la chambre parfaite 🏨
          </h1>

          <p className="text-blue-100 mb-8">
            Réservez facilement votre séjour en quelques clics
          </p>

          {/* SEARCH BAR */}
          <div className="flex items-center bg-white rounded-full overflow-hidden shadow-lg max-w-xl mx-auto">

            <FaSearch className="text-gray-400 ml-4" />

            <input
              type="text"
              placeholder="Rechercher une chambre..."
              className="w-full p-3 text-gray-700 outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

        </div>
      </div>

      {/* CONTENT */}
      <div className="pt-16 px-6 max-w-7xl mx-auto">

        <h2 className="text-2xl font-bold mb-8">
          Nos chambres disponibles
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {filtered.map(room => {

            const index = currentIndex[room.id] || 0;

            return (
              <div
                key={room.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition overflow-hidden group"
              >

                {/* IMAGE */}
                <div className="relative h-56">

                  {room.images?.length > 0 ? (
                    <img
  onClick={() => navigate(`/room/${room.id}`)}
  src={`http://localhost:8080/rooms/image/${room.images[index].id}`}
  className="w-full h-full object-cover cursor-pointer"
/>
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-200">
                      No image
                    </div>
                  )}

                  {/* BADGES */}
                  <div className="absolute top-3 left-3 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                    {room.price.toLocaleString("fr-FR")} Ar
                  </div>

                  <div className="absolute top-3 right-3 bg-white/80 px-3 py-1 rounded-full text-sm">
                    👤 {room.capacity}
                  </div>

                  {/* CAROUSEL */}
                  {room.images?.length > 1 && (
                    <>
                      <button
                        onClick={() => prevImage(room.id, room.images.length)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
                      >
                        <FaChevronLeft />
                      </button>

                      <button
                        onClick={() => nextImage(room.id, room.images.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
                      >
                        <FaChevronRight />
                      </button>
                    </>
                  )}

                </div>

                {/* INFO */}
                {/* INFO */}
<div className="p-5 space-y-3">

  {/* TYPE avec border color */}
  <div className="border-l-4 border-blue-600 pl-3">
    <h3 className="text-xl font-bold text-gray-800">
      {room.type}
    </h3>
  </div>

  {/* DESCRIPTION avec border color */}
  <div className="border-l-4 border-gray-300 pl-3">
    <p className="text-gray-500 text-sm leading-relaxed">
      {room.description}
    </p>
  </div>

  {/* DETAILS */}
  <div className="flex justify-between items-center mt-3 text-sm">
    <p className="text-gray-700 font-semibold">
      💰 {room.price.toLocaleString("fr-FR")} Ar / nuit
    </p>

    <p className="text-gray-600">
      👤 {room.capacity} personnes
    </p>
  </div>

  {/* BUTTON */}
  <button
  onClick={() => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
  localStorage.setItem("redirect", `/reservation/${room.id}`);
  navigate("/login");
} else {
      // ✅ connecté → reservation
      navigate(`/reservation/${room.id}`);
    }

  }}
  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition font-semibold shadow-md"
>
  Réserver
</button>

</div>

              </div>
            );
          })}

        </div>

      </div>
    </div>
  );
}