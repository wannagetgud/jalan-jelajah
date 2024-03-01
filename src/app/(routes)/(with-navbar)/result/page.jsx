"use client";

import { useState, useContext, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { generateGoogleMapsLink, truncate } from "@/app/_utils";
import DetailDest from "@/app/_components/result/detailDest";

import { CommonContext } from "@/app/_context/commonContext";
import dynamic from "next/dynamic";

const Maps = dynamic(() => import("../../../_components/result/map.jsx"), {
  ssr: false,
});

export default function Result() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const { isLoading, recommendation } = useContext(CommonContext);

  const openDetailModal = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const closeDetailModal = (id) => {
    setSelectedId(null);
    setIsModalOpen(false);
  };

  const setPlaceToSave = (place) => {
    console.log(place);
  };

  useEffect(() => {
    console.log(recommendation);
  }, [recommendation, isLoading]);

  return (
    <>
      {!isLoading && (
        <div className="min-h-screen bg-c-white pb-12 container mx-auto">
          <div className="flex w-full justify-between items-center pt-32">
            <div className="flex flex-col text-c-textblack">
              <p className="text-[28px] font-semibold">
                Berikut ini 10 rekomendasi kami buatmu! &#x1F604;
              </p>
              <p className="text-2xl">
                Lokasi Kamu:{" "}
                <span className="font-semibold text-c-pink1">
                  {recommendation ? recommendation[0].city : ""}
                </span>
              </p>
            </div>
          </div>

          {/* Maps */}
          <Maps lat={recommendation[0].lat} long={recommendation[0].long} />

          <ul className="mt-12 grid xl:grid-cols-2 gap-6">
            {recommendation?.map((item, index) => {
              return (
                <li
                  className="bg-c-white rounded-[25px] shadow-card flex px-10 py-4"
                  key={index}
                >
                  <div className="flex flex-col justify-between gap-2">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-[28px] text-c-textblack">
                        {item.place_name}
                      </p>

                      <button onClick={() => setPlaceToSave(item)}>
                        <Bookmark size={32} />
                      </button>
                    </div>
                    <p className="text-lg text-c-textblack">
                      Harga Tiket Masuk: {item.price}
                    </p>
                    <a
                      rel="noreferrer"
                      target="_blank"
                      href={generateGoogleMapsLink(item.lat, item.long)}
                      className="text-c-pink1 font-semibold text-xl underline"
                    >
                      Google Maps
                    </a>
                    <p className="text-xl text-c-grey2 mt-2 text-justify">
                      {truncate(item.description)}
                      <span
                        className="cursor-pointer hover:font-semibold text-c-pink1 ml-2 transition-all"
                        onClick={() => openDetailModal(item.id)}
                      >
                        Baca selengkapnya
                      </span>
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}{" "}
      {isLoading && <div>Loading</div>}
      {recommendation && (
        <DetailDest
          recommendation={recommendation[selectedId]}
          closeModal={closeDetailModal}
          isModalOpen={isModalOpen}
        />
      )}
    </>
  );
}


