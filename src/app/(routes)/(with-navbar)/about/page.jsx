"use client";

import Image from "next/image";
import { ChevronDownCircle } from "lucide-react";

export default function About() {
  const cardContent = [
    {
      id: 1,
      image: "/assets/all-platform.png",
      title: "Semua Platform",
      desc: "Akses aplikasi berbasis website ini kapan saja dan di mana saja Anda berada.",
    },
    {
      id: 2,
      image: "/assets/ai.png",
      title: "Rekomendasi",
      desc: "Sistem rekomendasi menggunakan kecerdasan buatan untuk mendapatkan destinasi yang paling cocok untukmu.",
    },
    {
      id: 3,
      image: "/assets/saving.png",
      title: "Bookmarks",
      desc: "Jangan pernah lupa rencana tujuan Anda dengan fitur bookmark.",
    },
  ];

  const handleScroll = () => {
    const element = document.getElementById("description");
    element.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <div className="flex container mx-auto h-[90vh] justify-center">
        <div className="w-[544px] mr-[132px] flex flex-col justify-center ">
          <p className="text-3xl font-medium">Tentang kami</p>
          <p className="text-8xl font-bold mt-4">
            Jalan
            <br />
            <span className="text-c-pink1">Jelajah</span>
          </p>
          <ChevronDownCircle
            color="black"
            size={48}
            className="animate-bounce mt-12 cursor-pointer"
            onClick={handleScroll}
          />
        </div>
        <div className="flex justify-center items-center">
          <Image
            src="/assets/hero2.png"
            width={500}
            height={500}
            alt="Hero imager"
          />
        </div>
      </div>

      <div
        id="description"
        className="bg-gradient-to-br from-c-pink2 to-c-orange-light w-full p-16 flex justify-center items-center gap-16"
      >
        <div className="flex flex-col text-white text-2xl w-1/2">
          <p>
            JalanJelajah bertujuan memberikan ide dan inspirasi tujuan
            perjalanan Anda dalam menjelajahi lima kota besar di Indonesia.
          </p>
          <br />
          <p>
            Pilih rekomendasi berdasarkan kategori maupun keyword nama tempat,
            dan bersiaplah untuk perjalanan yang mengesankan!
          </p>
        </div>

        <Image
          src="/assets/about.png"
          width={340}
          height={340}
          alt="Illustration image"
        />
      </div>

      <div className="flex flex-col container mx-auto h-screen items-center">
        <h1 className="font-semibold text-4xl my-24">Keunggulan kami</h1>
        <div className="grid grid-cols-3 gap-12 w-3/4">
          {cardContent.map((card) => (
            <Card key={card.id} {...card} />
          ))}
        </div>
      </div>
    </>
  );
}

const Card = ({ image, title, desc }) => {
  return (
    <div className="rounded-2xl bg-white shadow-home p-10 flex flex-col gap-6 items-center">
      <Image src={image} width={168} height={168} alt="card image" />
      <h1 className="italic font-semibold text-c-pink1 text-2xl">{title}</h1>
      <p className="text-center text-lg">{desc}</p>
    </div>
  );
};
