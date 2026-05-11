import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function RoomsAdmin() {
  const [open, setOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [currentIndex, setCurrentIndex] = useState({}); // pour carousel

const [form, setForm] = useState({
  type: "",
  description: "", // ✅ AJOUT
  price: "",
  capacity: "",
  hotelId: 1,
});

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);

  // LOAD ROOMS
  useEffect(() => {
    fetch("http://localhost:8080/rooms")
      .then(res => res.json())
      .then(data => {
        setRooms(data);

        // init carousel index
        const indexObj = {};
        data.forEach(r => indexObj[r.id] = 0);
        setCurrentIndex(indexObj);
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImages = (e) => {
    const files = [...e.target.files];
    setImages(files);

    const previews = files.map(file => URL.createObjectURL(file));
    setPreview(previews);
  };

  // 🔥 DELETE ROOM
  const deleteRoom = async (id) => {
    if (!window.confirm("Supprimer cette chambre ?")) return;

    await fetch(`http://localhost:8080/rooms/${id}`, {
      method: "DELETE",
    });

    setRooms(rooms.filter(r => r.id !== id));
  };

  // 🔥 CAROUSEL
  const nextImage = (roomId, length) => {
    setCurrentIndex(prev => ({
      ...prev,
      [roomId]: (prev[roomId] + 1) % length
    }));
  };

  const prevImage = (roomId, length) => {
    setCurrentIndex(prev => ({
      ...prev,
      [roomId]: (prev[roomId] - 1 + length) % length
    }));
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("type", form.type);
    formData.append("description", form.description); // ✅ AJOUT
    formData.append("price", form.price);
    formData.append("capacity", form.capacity);
    formData.append("hotelId", form.hotelId);

    images.forEach(img => formData.append("images", img));
    console.log("DESCRIPTION =", form.description);

    await fetch("http://localhost:8080/rooms", {
      method: "POST",
      body: formData,
    });

    setOpen(false);
    setImages([]);
    setPreview([]);

    const res = await fetch("http://localhost:8080/rooms");
    const data = await res.json();
    setRooms(data);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Chambres</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow"
        >
          + Ajouter chambre
        </button>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {rooms.map(room => {
          const index = currentIndex[room.id] || 0;

          return (
            <div key={room.id} className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden group">

              {/* IMAGE + ACTIONS */}
              <div className="relative h-48">

                {room.images?.length > 0 ? (
                  <img
                    src={`http://localhost:8080/rooms/image/${room.images[index].id}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-200">
                    No image
                  </div>
                )}

                {/* 🔥 OVERLAY ACTION */}
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">

                  <button className="bg-white p-2 rounded-full shadow hover:bg-blue-100">
                    <FaEdit className="text-blue-600" />
                  </button>

                  <button
                    onClick={() => deleteRoom(room.id)}
                    className="bg-white p-2 rounded-full shadow hover:bg-red-100"
                  >
                    <FaTrash className="text-red-600" />
                  </button>
                </div>

                {/* 🔥 CAROUSEL BUTTONS */}
                {room.images?.length > 1 && (
                  <>
                    <button
                      onClick={() => prevImage(room.id, room.images.length)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
                    >
                      <FaChevronLeft />
                    </button>

                    <button
                      onClick={() => nextImage(room.id, room.images.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
                    >
                      <FaChevronRight />
                    </button>
                  </>
                )}

              </div>

              {/* INFO */}
              <div className="p-4 shadow-inner space-y-1">
  <h2 className="font-bold text-lg">{room.type}</h2>

  <p className="text-gray-600 text-sm line-clamp-2">
    {room.description}
  </p>

  <p className="text-gray-500 text-sm">💰 {room.price} Ar</p>
  <p className="text-gray-500 text-sm">👤 {room.capacity} personnes</p>
</div>

            </div>
          );
        })}

      </div>

      {/* MODAL (inchangé mais clean) */}
      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">

          <div className="bg-white rounded-2xl shadow-2xl w-[450px] p-6">

            <h2 className="text-xl font-bold mb-4">
              Ajouter une chambre
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

             <input
  name="type"
  placeholder="Type de chambre"
  className="border p-2 w-full rounded-lg"
  onChange={handleChange}
/>

<textarea
  name="description"
  placeholder="Description de la chambre..."
  className="border p-2 w-full rounded-lg h-24 resize-none"
  onChange={handleChange}
/>

<input
  name="price"
  type="number"
  placeholder="Prix"
  className="border p-2 w-full rounded-lg"
  onChange={handleChange}
/>

<input
  name="capacity"
  type="number"
  placeholder="Capacité"
  className="border p-2 w-full rounded-lg"
  onChange={handleChange}
/>
              <input type="file" multiple onChange={handleImages}/>

              {preview.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {preview.map((src, i) => (
                    <img key={i} src={src} className="h-20 object-cover rounded"/>
                  ))}
                </div>
              )}

              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setOpen(false)} className="btn-gray">Annuler</button>
                <button type="submit" className="btn-blue">Enregistrer</button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}