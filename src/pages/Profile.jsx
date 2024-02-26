import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import Modal from "../components/Modal";
import ProfilePic from "../assets/pp-dummy.jpg";
import { useAuthContext } from "../hooks/useAuthContext";

export const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuthContext();
  const [nama, setNama] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  useEffect(() => {
    console.log(user);
  }, []);

  useEffect(() => {
    setNama(user?.name);
    setUsername(user?.username);
    setEmail(user?.email);
  }, [user]);

  return (
    <>
      <Navbar />
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="rounded-[20px] bg-white bg-textwhite flex flex-col justify-center items-center  px-5 py-5 gap-5">
          <div className="flex flex-col text-xl items-start w-full">
            <p className="text-[#6B6B6B]">Nama</p>
            <input
              className=" w-full
                  text-slate-500 rounded-[10px]
                  focus:outline-none focus:ring-0 mt-1 py-2 pl-5"
              type="name"
              name="name"
              value={nama}
              required
            />
          </div>
          <div className="flex flex-col text-xl items-start w-full">
            <p className="text-[#6B6B6B]">Username</p>
            <input
              className=" w-full
                  text-slate-500 rounded-[10px]
                  focus:outline-none focus:ring-0 mt-1 py-2 pl-5"
              type="text"
              name="uname"
              value={username}
              required
            />
          </div>
          <div className="flex flex-col text-xl items-start w-full">
            <p className="text-[#6B6B6B]">Email</p>
            <input
              className=" w-full
                  text-slate-500 rounded-[10px]
                  focus:outline-none focus:ring-0 mt-1 py-2 pl-5"
              type="email"
              name="email"
              value={email}
              required
            />
          </div>
          {/* <div className="flex flex-col text-xl items-start w-full">
            <p className="text-[#6B6B6B]">Password</p>
            <input
              className=" w-full
                  text-slate-500 rounded-[10px]
                  focus:outline-none focus:ring-0 mt-1 py-2 pl-5"
              type="password"
              name="password"
              placeholder="Masukkan Password"
              required
            />
          </div> */}
          <button>
            <p className="bg-pink1 rounded-[15px] py-[14px] px-[21.85px] font-poppins font-semibold text-textwhite text-[18px]">
              {" "}
              Simpan{" "}
            </p>
          </button>
        </div>
      </Modal>

      <div className="h-screen flex items-center justify-center bg-white2">
        <div className="flex rounded-[20px] bg-gradient-to-br from-orange to-pink2 w-5/6 p-16 gap-[61px] max-w-[1118px]">
          <div className="rounded-[20px] bg-textwhite flex flex-col justify-center items-center gap-[40px] p-[40px] max-h-[485px]">
            <img
              src={ProfilePic}
              alt="profilepic"
              className="mx-auto rounded-[20px]"
            />
            <button
              className="bg-pink1 rounded-[15px] py-[14px] px-[21.85px] w-3/4"
              onClick={() => setShowModal(true)}
            >
              <p className="font-poppins font-bold text-textwhite text-[18px]">
                EDIT PROFILE
              </p>
            </button>
          </div>

          <div className="rounded-[20px] bg-textwhite flex flex-col justify-center items-center w-2/3 px-10 gap-5">
            <div className="flex flex-col text-2xl items-start w-full">
              <p className="text-[#6B6B6B]">Nama</p>
              <p>{nama}</p>
            </div>
            <div className="flex flex-col text-2xl items-start w-full">
              <p className="text-[#6B6B6B]">Username</p>
              <p>{username}</p>
            </div>
            <div className="flex flex-col text-2xl items-start w-full">
              <p className="text-[#6B6B6B]">Email</p>
              <p>{email}</p>
            </div>
          </div>

          {/* nitip komen */}
          {/* <div className="rounded-[20px] bg-textwhite flex flex-col justify-center items-center w-2/3 px-10 gap-5">
            <div className="flex flex-col text-xl items-start w-full">
              <p className="text-[#6B6B6B]">Nama</p>
              <input
                className=" w-full
                  text-slate-500 rounded-[15px]
                  focus:outline-none focus:ring-0 mt-1 py-2 pl-5"
                type="name"
                name="name"
                placeholder="Benedict Holmes"
                required
              />
            </div>
            <div className="flex flex-col text-xl items-start w-full">
              <p className="text-[#6B6B6B]">Username</p>
              <input
                className=" w-full
                  text-slate-500 rounded-[15px]
                  focus:outline-none focus:ring-0 mt-1 py-2 pl-5"
                type="text"
                name="uname"
                placeholder="holmes.b"
                required
              />
            </div>
            <div className="flex flex-col text-xl items-start w-full">
              <p className="text-[#6B6B6B]">Email</p>
              <input
                className=" w-full
                  text-slate-500 rounded-[15px]
                  focus:outline-none focus:ring-0 mt-1 py-2 pl-5"
                type="email"
                name="email"
                placeholder="holmes.b@mail.ugm.ac.id"
                required
              />
            </div>
            <div className="flex flex-col text-xl items-start w-full">
              <p className="text-[#6B6B6B]">Password</p>
              <input
                className=" w-full
                  text-slate-500 rounded-[15px]
                  focus:outline-none focus:ring-0 mt-1 py-2 pl-5"
                type="password"
                name="password"
                placeholder="Apayarahasia"
                required
              />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};
