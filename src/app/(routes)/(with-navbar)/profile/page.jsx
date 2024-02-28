"use client";

import { useState } from "react";
import Image from "next/image";

export default function Profile() {
  const [nama, setNama] = useState("Nama");
  const [username, setUsername] = useState("Username");
  const [email, setEmail] = useState("Email");
  return (
    <>
      <div className="h-[80vh] flex items-center justify-center bg-c-white">
        <div className="flex flex-col rounded-2xl bg-gradient-to-br from-c-orange to-c-pink2 p-8 gap-8 max-w-[1024px]">
          <h1 className="text-3xl font-semibold text-c-textwhite">
            Profil Anda
          </h1>

          <div className="grid grid-cols-3 gap-8">
            <div className="rounded-2xl bg-c-textwhite flex flex-col justify-center items-center gap-10 p-10">
              <Image
                src="/assets/dummy-pfp.png"
                width={560}
                height={560}
                alt="Profile picture"
              />
              <button
                className="bg-c-pink1 rounded-xl py-2.5 px-5 w-3/4"
                // onClick={() => setShowModal(true)}
              >
                <p className="font-semibold text-c-textwhite text-xl">
                  EDIT PROFILE
                </p>
              </button>
            </div>
            <div className="col-span-2 rounded-2xl bg-c-textwhite flex flex-col justify-start items-start p-10 gap-2">
              <p className="text-c-grey2">Nama</p>
              <div className="text-c-textblack rounded bg-c-grey p-2 w-full">
                {nama}
              </div>
              <p className="text-c-grey2 mt-2">Username</p>
              <div className="text-c-textblack rounded bg-c-grey p-2 w-full">
                {username}
              </div>
              <p className="text-c-grey2 mt-2">Email</p>
              <div className="text-c-textblack rounded bg-c-grey p-2 w-full">
                {email}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 w-full bg-image-profile bg-cover h-64"></div>
      </div>
    </>
  );
}
