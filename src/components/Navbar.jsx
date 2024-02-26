import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser } from "@fortawesome/free-solid-svg-icons";
import UserIcon from "../assets/user1.svg";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

export const Navbar = () => {
  const { logout } = useLogout()
  return (
    <div className="flex items-center justify-between font-poppins px-32 pt-4 absolute top-0 w-full mx-10 ">
      <Link className="font-bold text-2xl" to="/">
        <span className="text-textblack">Desti</span>
        <span className="text-pink1">Match</span>
      </Link>

      <div className="flex gap-[52px]">
        <Link className="font-medium text-lg" to="/">
          Beranda
        </Link>
        <button className="font-medium text-lg">Riwayat</button>
        <Link className="font-medium text-lg" to="/about">
          Tentang
        </Link>
      </div>

      <div className="h-8 w-8 pt mr-2 dropdown">
        <img src={UserIcon} alt="profile" />

        <ul className="dropdown-menu absolute top-10 hidden pt-1 text-base">
          <li className="">
            <Link
              className=" bg-white hover:text-orange py-2 px-4 block whitespace-no-wrap"
              to="/profile"
            >
              Profil
            </Link>
          </li>
          <li className="">
            <p onClick={logout}
              className="text-red-500 bg-white hover:text-orange py-2 px-4 block whitespace-no-wrap">
              Logout
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};
