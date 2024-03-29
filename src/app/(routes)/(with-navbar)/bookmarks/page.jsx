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
  const [selectedPlace, setSelectedPlace] = useState();

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

  const openDetailModal = (place) => {
    setSelectedPlace(place);
    setIsModalOpen(true);
  };

  const closeDetailModal = (id) => {
    setSelectedPlace(null);
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
        <div className="flex w-full justify-between items-center pt-16 md:pt-32">
          <div className="flex flex-col text-c-textblack">
            <p className="text-lg md:text-[28px] font-semibold">
              Berikut tempat - tempat yang kamu simpan! &#x1F604;
            </p>
          </div>
        </div>

        {isLoading && (
          <div className="min-h-screen w-full text-center mt-6 md:mt-12 text-lg md:text-2xl">
            Loading...
          </div>
        )}

        {token && (
          <ul className="mt-6 md:mt-12 grid xl:grid-cols-2 gap-4 md:gap-6">
            {places?.map((place, index) => {
              return (
                <li
                  className="bg-c-white rounded md:rounded-[25px] shadow-card flex p-4 md:px-10 md:py-4"
                  key={index}
                >
                  <div className="flex flex-col justify-between gap-2 w-full">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-lg md:text-[28px] text-c-textblack">
                        {place.place_name}
                      </p>

                      <button
                        onClick={() => {
                          setToDeleteId(place.placeId);
                          setIsModalDeleteOpen(true);
                        }}
                      >
                        <Bookmark
                          className="w-6 h-6 md:w-8 md:h-8"
                          fill="black"
                        />
                      </button>
                    </div>
                    <p className="text-sm md:text-lg text-c-textblack">
                      Harga Tiket Masuk: {place.price}
                    </p>
                    <a
                      rel="noreferrer"
                      target="_blank"
                      href={generateGoogleMapsLink(place.lat, place.long)}
                      className="text-md md:text-xl text-c-pink1 font-semibold underline"
                    >
                      Google Maps
                    </a>
                    <p className="text-md md:text-xl text-c-grey2 mt-2 text-justify">
                      {truncate(place.description)}
                      <span
                        className="cursor-pointer hover:font-semibold text-c-pink1 ml-2 transition-all"
                        onClick={() => openDetailModal(place)}
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

      {places && (
        <DetailDest
          recommendation={selectedPlace}
          closeModal={closeDetailModal}
          isModalOpen={isModalOpen}
        />
      )}
    </>
  );
}
