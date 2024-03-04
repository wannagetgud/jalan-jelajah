"use client";

import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bookmark, Filter } from "lucide-react";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";

import { generateGoogleMapsLink, truncate } from "@/app/_utils";
import DetailDest from "@/app/_components/result/detailDest";
import FilterPopup from "@/app/_components/result/filterPopup.jsx";
import { CommonContext } from "@/app/_context/commonContext";
import { AuthContext } from "@/app/_context/authContext.js";

const Maps = dynamic(() => import("../../../_components/result/map.jsx"), {
  ssr: false,
});

export default function Result() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState();
  const { isLoading, recommendation } = useContext(CommonContext);
  const { token } = useContext(AuthContext);
  const [bookmarked, setBookmarked] = useState([]);
  const [filteredRecommendation, setFilteredRecommendation] = useState([]);

  const openDetailModal = (place) => {
    setSelectedPlace(place);
    setIsModalOpen(true);
  };

  const closeDetailModal = (place) => {
    setSelectedPlace(place);
    setIsModalOpen(false);
  };

  const handleAddBookmark = async (place) => {
    if (!token) {
      toast.error("Anda harus login terlebih dahulu untuk menyimpan tempat");
      router.push("/auth/login");
      return;
    }

    const requestBody = {
      placeId: place.id,
      category: place.category,
      city: place.city,
      description: place.description,
      lat: place.lat,
      long: place.long,
      place_name: place.place_name,
      price: place.price,
      rating: place.rating,
    };

    try {
      const response = await fetch("/api/bookmark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        const data = response.json();
        throw new Error(data.msg);
      }
      const data = await response.json();
      toast.success("Berhasil menyimpan tempat ke bookmark");
      setBookmarked([...bookmarked, place.id]);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleFilter = (value) => {
    if (value === "naik") {
      setFilteredRecommendation(
        recommendation.sort((a, b) => a.price - b.price)
      );
    } else if (value === "turun") {
      setFilteredRecommendation(
        recommendation.sort((a, b) => b.price - a.price)
      );
    }

    setIsFilterModalOpen(false);
  };

  useEffect(() => {
    setFilteredRecommendation(recommendation);
  }, [recommendation]);

  return (
    <>
      {!isLoading ? (
        <div className="min-h-screen bg-c-white pb-12 container mx-auto">
          <div className="flex max-md:flex-col w-full md:justify-between md:items-center pt-16 md:pt-32">
            <div className="flex flex-col text-c-textblack">
              <p className="text-lg md:text-[28px] font-semibold">
                Berikut ini 10 rekomendasi kami buatmu! &#x1F604;
              </p>
              <p className="text-md md:text-2xl">
                Lokasi Kamu:{" "}
                <span className="font-semibold text-c-pink1">
                  {recommendation ? recommendation[0].city : ""}
                </span>
              </p>
            </div>
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="px-3 py-2 bg-c-pink1 text-c-textwhite rounded-2xl flex text-sm md:text-xl gap-2 hover:scale-110 transition duration-300 mt-4"
            >
              <Filter className="w-6 h-6" />
              <p>Filter Harga</p>
            </button>
          </div>

          <FilterPopup
            isOpen={isFilterModalOpen}
            onClose={() => setIsFilterModalOpen(false)}
            onSubmit={(value) => {
              handleFilter(value);
            }}
          />

          {/* Maps */}
          <Maps
            lat={recommendation[0].lat}
            long={recommendation[0].long}
            places={recommendation}
          />

          <ul className="mt-6 md:mt-12 grid xl:grid-cols-2 gap-4 md:gap-6">
            {filteredRecommendation?.map((item, index) => {
              return (
                <li
                  className="bg-c-white rounded md:rounded-[25px] shadow-card flex p-4 md:px-10 md:py-4"
                  key={index}
                >
                  <div className="flex flex-col justify-between gap-2">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-lg md:text-[28px] text-c-textblack">
                        {item.place_name}
                      </p>

                      <button onClick={() => handleAddBookmark(item)}>
                        {bookmarked.includes(item.id) ? (
                          <Bookmark
                            className="w-6 h-6 md:w-8 md:h-8"
                            fill="black"
                          />
                        ) : (
                          <Bookmark className="w-6 h-6 md:w-8 md:h-8" />
                        )}
                      </button>
                    </div>
                    <p className="text-sm md:text-lg text-c-textblack">
                      Harga Tiket Masuk: {item.price}
                    </p>
                    <p className="text-sm md:text-lg text-c-textblack">
                      Rating: {item.rating}
                    </p>
                    <a
                      rel="noreferrer"
                      target="_blank"
                      href={generateGoogleMapsLink(item.lat, item.long)}
                      className="text-md md:text-xl text-c-pink1 font-semibold underline"
                    >
                      Google Maps
                    </a>
                    <p className="text-md md:text-xl text-c-grey2 mt-2 text-justify">
                      {truncate(item.description)}
                      <span
                        className="cursor-pointer hover:font-semibold text-c-pink1 ml-2 transition-all"
                        onClick={() => openDetailModal(item)}
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
      ) : (
        <div className="min-h-screen w-full text-center mt-6 md:mt-12 text-lg md:text-2xl">
          Loading...
        </div>
      )}
      {recommendation && (
        <DetailDest
          recommendation={selectedPlace}
          closeModal={closeDetailModal}
          isModalOpen={isModalOpen}
        />
      )}
    </>
  );
}
