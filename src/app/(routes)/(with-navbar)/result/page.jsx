"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";
import { generateGoogleMapsLink, truncate } from "@/app/_utils";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconRetina from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

export default function Result() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedId, setSelectedId] = useState(1);

  const places = [
    {
      id: 1,
      place_name: "Pantai Kuta",
      city: "Bali",
      price: "Rp 10.000",
      lat: -8.715143,
      long: 115.170124,
      description:
        "Pantai Kuta adalah sebuah tempat wisata yang terletak di Kuta, Badung, Bali, Indonesia. Pantai ini terkenal akan pasir putihnya dan ombak yang cocok untuk berselancar.",
    },
    {
      id: 2,
      place_name: "Pantai Kuta",
      city: "Bali",
      price: "Rp 10.000",
      lat: -8.715143,
      long: 115.170124,
      description:
        "Pantai Kuta adalah sebuah tempat wisata yang terletak di Kuta, Badung, Bali, Indonesia. Pantai ini terkenal akan pasir putihnya dan ombak yang cocok untuk berselancar.",
    },
    {
      id: 3,
      place_name: "Pantai Kuta",
      city: "Bali",
      price: "Rp 10.000",
      lat: -8.715143,
      long: 115.170124,
      description:
        "Pantai Kuta adalah sebuah tempat wisata yang terletak di Kuta, Badung, Bali, Indonesia. Pantai ini terkenal akan pasir putihnya dan ombak yang cocok untuk berselancar.",
    },
    {
      id: 4,
      place_name: "Pantai Kuti",
      city: "Bali",
      price: "Rp 10.000",
      lat: -8.715143,
      long: 115.170124,
      description:
        "Pantai Kuta adalah sebuah tempat wisata yang terletak di Kuta, Badung, Bali, Indonesia. Pantai ini terkenal akan pasir putihnya dan ombak yang cocok untuk berselancar.",
    },
  ];

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

  return (
    <>
      <div className="min-h-screen bg-c-white pb-12 container mx-auto">
        <div className="flex w-full justify-between items-center pt-32">
          <div className="flex flex-col text-c-textblack">
            <p className="text-[28px] font-semibold">
              Berikut ini 10 rekomendasi kami buatmu! &#x1F604;
            </p>
            <p className="text-2xl">
              Lokasi Kamu:{" "}
              <span className="font-semibold text-c-pink1">
                {places ? places[0].city : ""}
              </span>
            </p>
          </div>
        </div>

        {/* Maps */}
        <Maps lat={places[0].lat} long={places[0].long} />

        <ul className="mt-12 grid xl:grid-cols-2 gap-6">
          {places?.map((place, index) => {
            return (
              <li
                className="bg-c-white rounded-[25px] shadow-card flex px-10 py-4"
                key={index}
              >
                <div className="flex flex-col justify-between gap-2">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-[28px] text-c-textblack">
                      {place.place_name}
                    </p>

                    <button onClick={() => setPlaceToSave(place)}>
                      <Bookmark size={32} />
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
      </div>

      {isModalOpen && (
        <DetailDest place={places[selectedId]} closeModal={closeDetailModal} />
      )}
    </>
  );
}

const DetailDest = ({ place, closeModal = () => {} }) => {
  const generateGoogleMapsLink = (latitude, longitude) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    return url;
  };

  return (
    <div className="w-screen h-[70vh] rounded-t-xl fixed bottom-0 left-0 z-50 bg-c-white flex flex-col justify-center items-start px-24 transition duration-500 py-12">
      <h1 className="text-4xl font-semibold text-c-pink1 mb-8">
        {place?.place_name}
      </h1>
      <div className="flex gap-2">
        <h3 className="rounded-xl bg-c-white px-2 py-3 text-c-pink1 border-2 border-c-pink1 font-semibold text-lg mb-8">
          Kota: {place?.city}
        </h3>
        <h3 className="rounded-xl bg-c-white px-2 py-3 text-c-pink1 border-2 border-c-pink1 font-semibold text-lg mb-8">
          Kategori: {place?.category}
        </h3>
      </div>
      <a
        target="_blank"
        rel="noreferrer"
        href={generateGoogleMapsLink(place?.lat, place?.long)}
        className="text-c-pink1 font-semibold text-xl underline"
      >
        Google Maps
      </a>
      <p className="text-xl text-justify mt-8">{place?.description}</p>
      <button
        className="rounded-xl bg-c-pink1 px-2 py-3 text-c-textwhite font-semibold text-lg mt-8"
        onClick={closeModal}
      >
        Tutup
      </button>
    </div>
  );
};

const Maps = ({ lat, long }) => {
  return (
    <MapContainer
      center={[lat, long]}
      zoom={13}
      scrollWheelZoom={false}
      className="h-[50vh] rounded-xl mt-12 shadow-card z-30"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, long]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};
