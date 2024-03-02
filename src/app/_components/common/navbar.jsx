"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Menu, X } from "lucide-react";
import clsx from "clsx";

export default function Navbar() {
  const [navbarPhoneOpen, setNavbarPhoneOpen] = useState(false);

  const menuPhone = [
    { id: 1, value: "Beranda", href: "/homepage" },
    { id: 2, value: "Tersimpan", href: "/bookmarks" },
    { id: 3, value: "Tentang Kami", href: "/about" },
    { id: 4, value: "Profile", href: "/profile" },
  ];

  const toggleNavbarPhone = () => {
    setNavbarPhoneOpen(!navbarPhoneOpen);
  };

  return (
    <div className="flex items-center justify-between font-poppins px-6 md:px-12 xl:px-32 py-4 sticky top-0 bg-c-white z-40">
      <Link
        href="/homepage"
        className="font-bold text-lg md:text-xl xl:text-2xl w-[250px]"
      >
        <span className="text-c-textblack">Jalan</span>
        <span className="text-c-pink1">Jelajah</span>
      </Link>

      <div className="flex items-center justify-center mx-16 gap-24 w-full max-xl:hidden">
        <Link className="font-medium text-xl" href="/homepage">
          Beranda
        </Link>
        <Link className="font-medium text-xl" href="/bookmarks">
          Tersimpan
        </Link>
        <Link className="font-medium text-xl" href="/about">
          Tentang Kami
        </Link>
      </div>

      <Link
        href={"/profile"}
        className="h-8 w-8 pt mr-2 w-[200px] flex justify-end max-xl:hidden"
      >
        <User size={36} />
      </Link>

      <div
        className={clsx(
          "md:hidden transition-all text-2xl relative navbar-phone-icon",
          navbarPhoneOpen ? "open" : ""
        )}
        onClick={toggleNavbarPhone}
      >
        {navbarPhoneOpen ? <X size={28} /> : <Menu size={28} />}
      </div>
      {navbarPhoneOpen ? (
        <div
          className={clsx(
            `absolute top-0 left-0 -z-10 w-full max-h-fit flex flex-col items-center justify-center bg-c-white pt-20 pb-4 navbar-menu shadow-home md:hidden transition-all`,
            navbarPhoneOpen ? "open" : "closed"
          )}
        >
          {menuPhone.map((item) => {
            return (
              <Link
                href={item.href}
                key={item.id}
                className="py-4 hover:bg-c-pink1 hover:text-c-textwhite w-full text-center font-medium"
                onClick={toggleNavbarPhone}
              >
                {item.value}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
