"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import Button from "@/app/_components/common/button";
import InputBar from "@/app/_components/common/inputBar";
import { AuthContext } from "@/app/_context/authContext";

export default function Register() {
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.msg);
      }

      const data = await response.json();
      console.log(data);
      login(data);
      toast.success("Sukses daftar");
      router.push("/homepage");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-image-login font-poppins text-c-textwhite">
        <h1 className="text-2xl xl:text-4xl font-semibold">Daftar Sekarang</h1>
        <div className="bg-c-textwhite rounded-[20px] text-c-textblack justify-center px-9 py-6 mt-6 w-[300px] xl:w-[552px]">
          <form action="" className="">
            <InputBar
              inputName="email"
              labelText="Email"
              placeholderText="Masukkan email"
              inputValue={formData.email}
              handleChange={handleChange}
            />

            <InputBar
              inputName="username"
              labelText="Username"
              placeholderText="Masukkan username"
              inputValue={formData.username}
              handleChange={handleChange}
            />

            <InputBar
              inputName="name"
              labelText="Nama"
              placeholderText="Masukkan nama"
              inputValue={formData.name}
              handleChange={handleChange}
            />

            <InputBar
              inputName="password"
              labelText="Password"
              placeholderText="Masukkan password"
              inputValue={formData.password}
              handleChange={handleChange}
            />

            <div className="flex flex-col items-center mt-8">
              <Button onClick={handleSubmit}>DAFTAR</Button>
              <p className="mt-4 max-md:text-sm">
                Sudah memiliki akun?{" "}
                <span className="text-[#bf002f]">
                  <Link href="/auth/login">Login</Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
