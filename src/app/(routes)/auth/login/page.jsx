"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/app/_components/common/button";
import InputBar from "@/app/_components/common/inputBar";
import { AuthContext } from "@/app/_context/authContext";
import { toast } from "react-toastify";

export default function Login() {
  const { isLoggedIn, user, token, login, logout, isLoading } =
    useContext(AuthContext);

  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      const data = await response.json();
      console.log(data);
      login(data);
      toast.success("Sukses login");
      router.push("/homepage");
    } catch (error) {
      toast.error(error.msg);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-image-login font-poppins text-c-textwhite">
        <h1 className="text-2xl xl:text-4xl font-semibold">Selamat Datang!</h1>
        <p className="text-md xl:text-lg font-medium">
          Login untuk melanjutkan
        </p>
        <div className="bg-c-textwhite rounded-[20px] text-c-textblack justify-center px-9 py-6 mt-6 w-[300px] xl:w-[552px]">
          <form action="" className="">
            <InputBar
              inputName="username"
              inputValue={formData.username}
              labelText="Username"
              placeholderText="Masukkan username"
              handleChange={handleChange}
            />

            <InputBar
              inputName="password"
              inputValue={formData.password}
              labelText="Password"
              placeholderText="Masukkan password"
              handleChange={handleChange}
            />

            <p className="mt-4">
              <span>Lupa password? </span>
              <span className="text-[#bf002f]">
                <Link
                  href={"/auth/forgot-password"}
                  className="hover:underline"
                >
                  Klik di sini
                </Link>
              </span>
            </p>

            <div className="flex flex-col items-center mt-8">
              <Button onClick={handleSubmit}>LOGIN</Button>
              <p className="mt-4">
                <span>Belum memiliki akun? </span>
                <span className="text-[#bf002f]">
                  <Link href={"/auth/register"} className="hover:underline">
                    Daftar
                  </Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
