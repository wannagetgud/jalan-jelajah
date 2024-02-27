"use client";

import Link from "next/link";
import Button from "@/app/components/common/button";
import InputBar from "@/app/components/common/inputBar";

export default function Register() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-image-login font-poppins text-c-textwhite">
        <h1 className="text-4xl font-semibold">Daftar Sekarang</h1>
        <div className="bg-c-textwhite rounded-[20px] text-c-textblack justify-center px-9 py-6 mt-6 w-[552px]">
          <form action="" className="">
            <InputBar
              inputName="email"
              labelText="Email"
              placeholderText="Masukkan email"
            />

            <InputBar
              inputName="username"
              labelText="Username"
              placeholderText="Masukkan username"
            />

            <InputBar
              inputName="name"
              labelText="Nama"
              placeholderText="Masukkan nama"
            />

            <InputBar
              inputName="password"
              labelText="Password"
              placeholderText="Masukkan password"
            />

            <div className="flex flex-col items-center mt-8">
              <Button>DAFTAR</Button>
              <p className="mt-4">
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
