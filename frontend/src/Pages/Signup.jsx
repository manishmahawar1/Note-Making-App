import { Link, useNavigate } from "react-router-dom";

import { useContext, useState } from "react";

import { AuthContext } from "../Context/AuthContext";

function Signup() {
  const navigate = useNavigate();

  const { signup } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await signup(formData);

    if (response?.success) {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex w-full">
      {/* LEFT */}

      <div className="w-full md:w-1/2 flex justify-center items-center bg-green-50">
        <div className="bg-white p-10 rounded-2xl shadow-lg w-[420px]">
          <h1 className="text-5xl font-bold text-center">Sign Up</h1>

          <p className="text-center text-gray-500 mt-3">
            Create your account to get started
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* NAME */}

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="
                w-full
                border-2
                border-green-500
                p-3
                rounded-xl
                outline-none
              "
            />

            {/* EMAIL */}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="
                w-full
                border-2
                border-green-500
                p-3
                rounded-xl
                outline-none
              "
            />

            {/* PASSWORD */}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="
                w-full
                border-2
                border-green-500
                p-3
                rounded-xl
                outline-none
              "
            />

            {/* BUTTON */}

            <button
              type="submit"
              className="
                w-full
                bg-green-500
                text-white
                py-3
                rounded-xl
                font-semibold
                hover:bg-green-600
                transition
                cursor-pointer
              "
            >
              Sign Up
            </button>

            {/* LOGIN */}

            <p className="text-center">
              Already have an account?
              <Link
                to="/login"
                className="
                  text-green-600
                  font-semibold
                  ml-1
                "
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* RIGHT */}

      <div
        className="
         hidden
         md:flex
          w-1/2
          bg-green-700
          flex
          flex-col
          justify-center
          items-center
        "
      >
        <img
          src="/note_logo.png"
          alt="note_logo"
          className="w-60  object-contain"
        />

        <h1
          className="
            text-white
            text-4xl
            font-bold
            mt-5
          "
        >
          MY NOTEMAKER
        </h1>
      </div>
    </div>
  );
}

export default Signup;
