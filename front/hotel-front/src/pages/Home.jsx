export default function Home() {
  return (
    <div className="pt-24">

      {/* HERO SECTION */}
      <section className="h-[80vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1566073771259-6a8506099945')",
        }}
      >
        <div className="bg-black/50 p-10 rounded-2xl text-center text-white max-w-2xl">

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Réservez votre séjour parfait 🏨
          </h1>

          <p className="text-gray-200 mb-6">
            Trouvez les meilleures chambres aux meilleurs prix
          </p>

          {/* SEARCH BAR */}
          <div className="flex flex-col md:flex-row gap-3">
            <input
              className="p-3 rounded-lg w-full text-black"
              placeholder="Destination"
            />
            <input
              type="date"
              className="p-3 rounded-lg text-black"
            />
            <button className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700">
              Rechercher
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}