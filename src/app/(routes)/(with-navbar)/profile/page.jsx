"use client";

import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { redirect } from "next/navigation";
import { AuthContext } from "@/app/_context/authContext";
import { CommonContext } from "@/app/_context/commonContext";
import Button from "@/app/_components/common/button";
import Input from "@/app/_components/profile/input";

export default function Profile() {
  const [name, setName] = useState("Nama");
  const [username, setUsername] = useState("Username");
  const [email, setEmail] = useState("Email");
  const { user, isLoading, token, logout } = useContext(AuthContext);
  const { clearRecommendation } = useContext(CommonContext);
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
  const handleLogout = () => {
    logout();
    clearRecommendation();
  };
  return (
    <>
      {!token && redirect("/auth/login")}
      <div className="h-[80vh] flex items-center justify-center bg-c-white md:py-16">
        {isLoading && <div className="text-xl md:text-3xl">Loading</div>}
        {user && (
          <div className="flex flex-col rounded-2xl bg-gradient-to-br from-c-orange to-c-pink2 p-4 md:p-8 gap-4 md:gap-8 md:max-w-[1024px]">
            <h1 className="text-xl md:text-3xl font-semibold text-c-textwhite">
              Profil Anda
            </h1>

            <form className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
              <div className="rounded-2xl bg-c-textwhite flex flex-col justify-center items-center gap-2 md:gap-10 p-2 md:p-10">
                <div className="flex items-center w-[100px]">
                  <Image
                    src="/assets/dummy-pfp.png"
                    width={560}
                    height={560}
                    alt="Profile picture"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="bg-c-pink1 rounded-xl px-1 py-2 md:px-5 w-3/4"
                >
                  <p className="font-semibold text-c-textwhite text-sm md:text-xl">
                    EDIT PROFILE
                  </p>
                </button>
              </div>
              <div className="md:col-span-2 rounded-2xl bg-c-textwhite flex flex-col justify-start items-start py-3 px-6 md:p-10 md:gap-2 max-md:text-sm">
                <p className="text-c-grey2">Nama</p>
                <Input value={name} setValue={setName} />
                <p className="text-c-grey2 mt-2">Username</p>
                <Input value={username} setValue={setUsername} />
                <p className="text-c-grey2 mt-2">Email</p>
                <Input value={email} setValue={setEmail} />
                <Button
                  className="mt-2 md:mt-4 !mx-0 self-end bg-white shadow-card !text-c-pink1"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </form>
          </div>
        )}

        <div className="absolute bottom-0 w-full bg-image-profile bg-cover h-32 md:h-64"></div>
      </div>
    </>
  );
}
