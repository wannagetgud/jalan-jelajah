"use client";

import Link from "next/link";
import Button from "@/app/components/common/button";
import InputBar from "@/app/components/common/inputBar";

export default function Login() {
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
              inputName="email"
              labelText="Email atau Username"
              placeholderText="Masukkan email atau username"
            />

            <InputBar
              inputName="password"
              labelText="Password"
              placeholderText="Masukkan password"
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
              <Button>LOGIN</Button>
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
