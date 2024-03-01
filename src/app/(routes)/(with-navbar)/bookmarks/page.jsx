"use client";

import { useState, useContext, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { redirect } from "next/navigation";
import { generateGoogleMapsLink, truncate } from "@/app/_utils";
import { AuthContext } from "@/app/_context/authContext";
import DetailDest from "@/app/_components/result/detailDest";
import DeletePopup from "@/app/_components/bookmarks/deleteModal";

export default function Bookmarks() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(1);

  const [places, setPlaces] = useState([]);

  const [toDeleteId, setToDeleteId] = useState(null);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(null);

  const { token, isLoading } = useContext(AuthContext);

  const fetchBookmark = async () => {
    try {
      const response = await fetch("/api/bookmark", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setPlaces(data.bookmarks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookmark();
  }, []);

  const openDetailModal = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const closeDetailModal = (id) => {
    setSelectedId(null);
    setIsModalOpen(false);
  };

  return (
    <>
      {!token && redirect("/auth/login")}
      <DeletePopup
        isDeleting={isModalDeleteOpen}
        placeId={toDeleteId}
        token={token}
        onClose={() => setIsModalDeleteOpen(false)}
        refetch={fetchBookmark}
      />
      <div className="min-h-screen bg-c-white pb-12 container mx-auto">
        <div className="flex w-full justify-between items-center pt-32">
          <div className="flex flex-col text-c-textblack">
            <p className="text-[28px] font-semibold">
              Berikut tempat - tempat yang kamu simpan! &#x1F604;
            </p>
          </div>
        </div>

        {isLoading && <div className="text-3xl">Loading...</div>}
        {token && (
          <ul className="mt-12 grid xl:grid-cols-2 gap-6">
            {places?.map((place, index) => {
              return (
                <li
                  className="bg-c-white rounded-[25px] shadow-card flex px-10 py-4"
                  key={index}
                >
                  <div className="flex flex-col justify-between gap-2 w-full">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-[28px] text-c-textblack">
                        {place.place_name}
                      </p>

                      <button
                        onClick={() => {
                          setToDeleteId(place.placeId);
                          setIsModalDeleteOpen(true);
                        }}
                      >
                        <Bookmark size={32} fill="black" />
                      </button>
                    </div>
                    <p className="text-lg text-c-textblack">
                      Harga Tiket Masuk: {place.price}
                    </p>
                    <a
                      rel="noreferrer"
                      target="_blank"
                      href={generateGoogleMapsLink(place.lat, place.long)}
                      className="text-c-pink1 font-semibold text-xl underline"
                    >
                      Google Maps
                    </a>
                    <p className="text-xl text-c-grey2 mt-2 text-justify">
                      {truncate(place.description)}
                      <span
                        className="cursor-pointer hover:font-semibold text-c-pink1 ml-2 transition-all"
                        onClick={() => openDetailModal(place.id)}
                      >
                        Baca selengkapnya
                      </span>
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {isModalOpen && (
        <DetailDest place={places[selectedId]} closeModal={closeDetailModal} />
      )}
    </>
  );
}
