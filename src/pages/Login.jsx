import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDisplayContext } from "../hooks/useDisplayContext";
import { useLogin } from "../hooks/useLogin";

export const Login = () => {
  const navigate = useNavigate();
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const { notify, setLoading, setError } = useDisplayContext();
  const { login } = useLogin({ setError, setLoading });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(username, password);
    const response = await login(username, password);
    if (!response.isError) {
      setLoading(false);
      setTimeout(() => {
        navigate("/about");
      }, 2000);
    } else {
      setLoading(false);
    }
    // if (!response.isError) {
    //   notify.info(response.message);
    //   setLoading(true);
    //   setTimeout(() => {
    //     navigate("/")
    //   },2000)
    // }
    // else {
    //   notify.error(response.message);
    //   setLoading(false)
    // }
    //   setLoading(false)
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange to-pink2 font-poppins text-textwhite">
        <h1 className="text-2xl xl:text-4xl font-semibold">Selamat Datang!</h1>
        <p className="text-md xl:text-lg">Login untuk melanjutkan</p>
        <div className="bg-textwhite rounded-[20px] text-textblack justify-center px-9 py-6 mt-6 w-[300px] xl:w-[552px]">
          <form action="" /*onSubmit={handleSubmit}*/ className="">
            <div className="flex flex-col items-start w-7/8 mt-6">
              <p className="text-md xl:text-[22px] font-semibold ">
                Email atau Username
              </p>
              <input
                className="w-full text-md xl:text-xl
                                text-slate-500 rounded-[20px]
                                focus:outline-none focus:ring-0 mt-2 p-6"
                name="email"
                value={username}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Masukkan email atau username"
                required
              />
            </div>

            <div className="flex flex-col items-start w-7/8 mt-6">
              <div className="flex justify-between items-end w-full">
                <p className="text-md xl:text-[22px] font-semibold ">
                  Password
                </p>
                <p>Lupa password?</p>
              </div>
              <input
                className="w-full text-md xl:text-xl
                                text-slate-500 rounded-[20px]
                                focus:outline-none focus:ring-0 mt-2 p-6"
                type="password"
                name="password"
                placeholder="Masukkan password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <div className="flex flex-col items-center mt-8">
              <button
                onClick={handleSubmit}
                className="rounded-[20px] bg-pink1 px-12 py-3 text-textwhite font-bold mx-auto"
              >
                LOGIN
              </button>
              <p className="mt-4">
                Belum memiliki akun?{" "}
                <span className="text-[#bf002f]">
                  <button>Daftar</button>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
