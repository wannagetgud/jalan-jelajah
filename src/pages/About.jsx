import React from "react";
import { Navbar } from "../components/Navbar";
import AboutPic from "../assets/sayhi.jpg";

export const About = () => {
  return (
    <>
      <Navbar />
      <div className="h-screen flex items-center justify-center bg-white2">
        <div className="flex rounded-[20px] bg-gradient-to-br from-orange to-pink2 w-5/6 p-16 gap-[61px] max-w-[1118px]">
          <div className="flex flex-col justify-center text-xl items-start w-2/3">
            <p className="text-[#FAFAFA]">
              Selamat datang di Destimatch, tempat liburan impian bertemu dengan
              anggaran Anda! Kami percaya liburan tak perlu menguras dompet.
              Dengan Destimatch, temukan destinasi sesuai minat dan budget Anda.
              Dari petualangan alam, kekayaan budaya, hingga kota-kota menarik,
              kami punya saran wisata yang pas. Percayakan rencana liburan Anda
              pada kami dan nikmati dunia hemat tapi tak terlupakan. Destimatch
              siap bantu wujudkan impian liburan, tanpa khawatir soal uang!
            </p>
          </div>

          <div className="rounded-[20px] bg-textwhite overflow-hidden flex flex-col justify-center items-center gap-[40px] w-60">
            <img
              src={AboutPic}
              alt="aboutpic"
              className="mx-auto rounded-[20px]"
            />
          </div>
        </div>
      </div>
    </>
  );
};
