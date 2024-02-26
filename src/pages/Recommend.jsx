import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { Navbar } from "../components/Navbar";
import { useDestinationContext } from "../hooks/useDestinationContext";
import DetailDest from "./DetailDestination";

import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconRetina from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

export const Recommend = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idDetail, setIdDetail] = useState(0);
  const [placeToSave, setPlaceToSave] = useState();
  const [places, setPlaces] = useState();
  const { destination } = useDestinationContext();
  const mapRef = useRef(null);

  const generateGoogleMapsLink = (latitude, longitude) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    return url;
  };

  const truncate = (text) => {
    const words = text.trim().split(" ");
    if (words.length <= 35) {
      return text;
    }
    const truncatedText = words.slice(0, 35).join(" ");
    return `${truncatedText}...`;
  };

  useEffect(() => {
    setPlaces(destination);
  }, [destination]);

  useEffect(() => {
    const initMap = () => {
      if (mapRef.current) {
        // Initialize the map
        const map = L.map(mapRef.current).setView(
          [places[0].lat, places[0].long],
          12
        );
        console.log(map);
        // Add a tile layer (e.g., OpenStreetMap)
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "Map data &copy; OpenStreetMap contributors",
        }).addTo(map);

        const customIcon = L.icon({
          iconUrl: markerIcon,
          iconSize: [32, 64],
          popupAnchor: [0, -20],
        });

        // Add markers for each place
        places?.forEach((place) => {
          const marker = L.marker([place.lat, place.long], {
            icon: customIcon,
          }).addTo(map);
          marker.bindPopup(place.place_name); // Display the place name when marker is clicked
        });
      }
    };
    initMap();
  }, [places]);

  const openDetailModal = (index) => {
    setIsModalOpen(true);
    setIdDetail(index);
  };

  const closeDetailModal = () => {
    setIsModalOpen(false);
    setIdDetail(null);
  };

  const user_id = JSON.parse(localStorage.getItem("user")).id;

  console.log();

  useEffect(() => {
    const saveBookmark = async () => {
      try {
        const response = await fetch("http://localhost:3100/api/bookmarks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category: placeToSave.category,
            city: placeToSave.city,
            description: placeToSave.description,
            id: Math.floor(Math.random() * 10000) + 1000,
            lat: placeToSave.lat,
            long: placeToSave.long,
            place_name: placeToSave.place_name,
            price: placeToSave.price,
            user_id: user_id,
          }),
        });
        if (response.ok) {
          const bookmark = await response.json();
          console.log(bookmark);
          setPlaceToSave(null);
        } else {
          console.error("Failed to save bookmark");
        }
      } catch (error) {
        console.error(error);
      }
    };
    saveBookmark();
  }, [placeToSave]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white2 font-poppins px-12 lg:px-32 pb-12">
        <div className="flex w-full justify-between items-center pt-[160px]">
          <div className="flex flex-col">
            <p className="text-[28px] font-semibold text-textblack">
              Berikut ini 10 rekomendasi kami buatmu! &#x1F604;
            </p>
            <p className="text-2xl text-textblack">
              Lokasi Kamu{" "}
              <span className="font-semibold text-pink1">
                {places ? places[0].city : ""}
              </span>
            </p>
          </div>
        </div>

        {/* Maps */}
        {places ? (
          <div id="mapid" className="w-full h-[400px]" ref={mapRef}></div>
        ) : null}

        <ul className="mt-3 grid xl:grid-cols-2">
          {places?.map((place, index) => {
            return (
              <li
                className="bg-white rounded-[25px] shadow-card my-12 mx-8 flex px-10 py-4"
                key={index}
              >
                <div className="flex flex-col justify-between gap-2">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-[28px] text-textblack">
                      {place.place_name}
                    </p>

                    <button onClick={() => setPlaceToSave(place)}>
                      <FontAwesomeIcon icon={faBookmark} size="xl" />
                    </button>
                  </div>
                  <p className="text-lg text-textblack">
                    Harga Tiket Masuk: {place.price}
                  </p>
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href={generateGoogleMapsLink(place.lat, place.long)}
                    className="text-pink1 font-semibold text-xl underline"
                  >
                    Google Maps
                  </a>
                  <p className="text-xl text-[#707070] mt-2 text-justify">
                    {truncate(place.description)}
                    <span
                      className="font-semibold text-pink1 ml-2"
                      onClick={() => openDetailModal(index)}
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

      {isModalOpen && (
        <DetailDest place={places[idDetail]} closeModal={closeDetailModal} />
      )}
    </>
  );
};
