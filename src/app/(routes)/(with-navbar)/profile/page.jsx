"use client";

import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { useRouter, redirect } from "next/navigation";
import { AuthContext } from "@/app/_context/authContext";
import Button from "@/app/_components/common/button";
import Input from "@/app/_components/profile/input";

export default function Profile() {
  const router = useRouter();
  const [name, setName] = useState("Nama");
  const [username, setUsername] = useState("Username");
  const [email, setEmail] = useState("Email");
  const { user, isLoading, token, logout } = useContext(AuthContext);
  useEffect(() => {
    if (user) {
      setName(user.name);
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, username, email }),
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.msg);
      } else {
        toast.success(data.msg);
      }
    } catch (error) {
      toast.error(error.msg);
    }
  };
  const handleLogout = async () => {
    logout();
    router.push("/homepage");
  };
  return (
    <>
      {!token && redirect("/auth/login")}
      <div className="h-[80vh] flex items-center justify-center bg-c-white">
        {isLoading && <div className="text-3xl">Loading</div>}
        {user && (
          <div className="flex flex-col rounded-2xl bg-gradient-to-br from-c-orange to-c-pink2 p-8 gap-8 max-w-[1024px]">
            <h1 className="text-3xl font-semibold text-c-textwhite">
              Profil Anda
            </h1>

            <form className="grid grid-cols-3 gap-8">
              <div className="rounded-2xl bg-c-textwhite flex flex-col justify-center items-center gap-10 p-10">
                <Image
                  src="/assets/dummy-pfp.png"
                  width={560}
                  height={560}
                  alt="Profile picture"
                />
                <button
                  onClick={handleSubmit}
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
                <Input value={name} setValue={setName} />
                <p className="text-c-grey2 mt-2">Username</p>
                <Input value={username} setValue={setUsername} />
                <p className="text-c-grey2 mt-2">Email</p>
                <Input value={email} setValue={setEmail} />
                <Button
                  className="mt-4 !mx-0 self-end bg-white shadow-card !text-c-pink1"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </form>
          </div>
        )}

        <div className="absolute bottom-0 w-full bg-image-profile bg-cover h-64"></div>
      </div>
    </>
  );
}
