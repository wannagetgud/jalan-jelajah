"use client";

import Image from "next/image";
import { ChevronDownCircle } from "lucide-react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

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

  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      slides: {
        spacing: 15,
      },
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <div className="relative overflow-hidden">
      <div className="flex container mx-auto h-[90vh] justify-center">
        <div className="w-full xl:w-[544px] xl:mr-[132px] flex flex-col justify-center gap-8 relative z-10">
          <p className="text-lg md:text-xl xl:text-3xl font-medium">
            Tentang kami
          </p>
          <p className="text-3xl md:text-5xl xl:text-8xl font-bold mt-4">
            Jalan
            <br />
            <span className="text-c-pink1">Jelajah</span>
          </p>
          <ChevronDownCircle
            color="black"
            className="animate-bounce mt-12 cursor-pointer w-8 h-8 md:w-12 md:h-12 "
            onClick={handleScroll}
          />
        </div>
        <div className="flex items-center max-md:absolute max-md:translate-x-36 max-md:translate-y-24">
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
        className="bg-gradient-to-br from-c-pink2 to-c-orange-light w-full p-16 flex max-md:flex-col justify-center items-center gap-16"
      >
        <div className="flex flex-col text-white text-lg md:text-2xl md:w-1/2">
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

      <div className="flex flex-col container mx-auto h-screen md:items-center">
        <h1 className="font-semibold text-2xl md:text-4xl my-16 md:my-24 text-center">
          Keunggulan kami
        </h1>
        <div className="grid grid-cols-3 gap-12 w-3/4 max-md:hidden">
          {cardContent.map((card) => (
            <Card key={card.id} {...card} />
          ))}
        </div>
        <div className="md:hidden">
          <div className="keen-slider" ref={sliderRef}>
            {cardContent.map((card) => (
              <div key={card.id} className="keen-slider__slide !h-[300px]">
                <Card {...card} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const Card = ({ image, title, desc }) => {
  return (
    <div className="rounded-2xl bg-white shadow-home p-4 md:p-10 flex flex-col gap-2 md:gap-6 items-center">
      <div className="flex items-center justify-center max-md:w-1/2">
        <Image src={image} width={168} height={168} alt="card image" />
      </div>
      <h1 className="italic font-semibold text-c-pink1 text-lg md:text-2xl">
        {title}
      </h1>
      <p className="text-center text-sm md:text-lg">{desc}</p>
    </div>
  );
};
