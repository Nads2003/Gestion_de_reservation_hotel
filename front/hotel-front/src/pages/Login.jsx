import { useState } from "react";
import { loginUser } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleLogin = async () => {

  try {

    const res = await loginUser(form);

    const user = res.data;

    // stocker user
    localStorage.setItem("user", JSON.stringify(user));

    // récupérer redirect
    const redirect = localStorage.getItem("redirect");

    alert("Connexion réussie 🎉");

    // ADMIN
    if (user.role === "ADMIN") {

      localStorage.removeItem("redirect");

      navigate("/admin");
      window.location.reload();

    } else {

      // si redirect existe → reservation
      if (redirect) {

        navigate(redirect);

        // supprimer redirect après utilisation
        localStorage.removeItem("redirect");

      } else {

        // connexion normale
        navigate("/");

      }

      window.location.reload();

    }

  } catch (err) {

    alert("Email ou mot de passe incorrect");

  }

};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-xl rounded-2xl flex w-[900px] overflow-hidden">
a
        <div className="w-1/2 hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-10">

          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Connexion
          </h2>

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
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Se connecter
          </button>

          <p className="text-center mt-4 text-sm">
            Pas de compte ?{" "}
            <Link to="/register" className="text-blue-600 font-semibold">
              S'inscrire
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}