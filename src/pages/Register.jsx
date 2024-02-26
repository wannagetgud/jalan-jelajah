import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    name: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newUser = {
      ...formData,
      role: "CLIENT",
    };

    try {
      const response = await axios.post(
        "http://localhost:3100/api/users/",
        newUser
      );
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange to-pink2 font-poppins text-textwhite">
        <h1 className="text-4xl font-semibold">Daftar Sekarang</h1>
        <div className="bg-textwhite rounded-[20px] text-textblack justify-center px-9 py-6 mt-6 w-[552px]">
          <form action="" onSubmit={handleSubmit} className="">
            <div className="flex flex-col items-start w-7/8 mt-6">
              <p className="text-[22px] font-semibold ">Email</p>
              <input
                className="w-full text-xl
                                text-slate-500 rounded-[20px]
                                focus:outline-none focus:ring-0 mt-2 p-6"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Masukkan email"
                required
              />
            </div>

            <div className="flex flex-col items-start w-7/8 mt-6">
              <p className="text-[22px] font-semibold ">Username</p>
              <input
                className="w-full text-xl
                                text-slate-500 rounded-[20px]
                                focus:outline-none focus:ring-0 mt-2 p-6"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Masukkan username"
                required
              />
            </div>

            <div className="flex flex-col items-start w-7/8 mt-6">
              <p className="text-[22px] font-semibold ">Nama</p>
              <input
                className="w-full text-xl
                                text-slate-500 rounded-[20px]
                                focus:outline-none focus:ring-0 mt-2 p-6"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Masukkan nama"
                required
              />
            </div>

            <div className="flex flex-col items-start w-7/8 mt-6">
              <div className="flex justify-between items-end w-full">
                <p className="text-[22px] font-semibold ">Password</p>
              </div>
              <input
                className="w-full text-xl
                                text-slate-500 rounded-[20px]
                                focus:outline-none focus:ring-0 mt-2 p-6"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Masukkan password"
                required
              />
            </div>

            <div className="flex flex-col items-center mt-8">
              <button
                onClick={handleSubmit}
                className="rounded-[20px] bg-pink1 px-12 py-3 text-textwhite font-bold mx-auto"
              >
                DAFTAR
              </button>
              <p className="mt-4">
                Sudah memiliki akun?{" "}
                <span className="text-[#bf002f]">
                  <Link to="/login">Login</Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
