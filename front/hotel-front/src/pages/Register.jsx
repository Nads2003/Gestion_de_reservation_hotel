import { useState } from "react";
import { registerUser } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await registerUser(form);
      alert("Inscription réussie 🎉");
      navigate("/login");
    } catch (err) {
      alert("Erreur inscription");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-xl rounded-2xl flex w-[900px] overflow-hidden">

        <div className="w-1/2 hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-10">

          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Inscription
          </h2>

          <input
            name="name"
            placeholder="Nom"
            className="w-full p-3 border rounded-lg mb-4"
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg mb-4"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Mot de passe"
            className="w-full p-3 border rounded-lg mb-6"
            onChange={handleChange}
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            S'inscrire
          </button>

          <p className="text-center mt-4 text-sm">
            Déjà un compte ?{" "}
            <Link to="/login" className="text-blue-600 font-semibold">
              Se connecter
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}