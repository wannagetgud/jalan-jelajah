import React from "react";

const DetailDest = ({ place, closeModal }) => {
  const { place_name, city, category, description, lat, long } = place;

  const handleCloseModal = () => {
    closeModal();
  };

  const generateGoogleMapsLink = (latitude, longitude) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    return url;
  };

  return (
    <div className="w-screen h-[70vh] rounded-t-xl fixed bottom-0 left-0 z-50 bg-white flex flex-col justify-center items-start px-24 transition duration-500 py-12">
      <h1 className="text-4xl font-bold text-pink1 mb-8">{place_name}</h1>
      <div className="flex gap-2">
        <h3 className="rounded-xl bg-white px-2 py-3 text-pink1 border-2 border-pink1 font-semibold text-lg font-semibold mb-8">
          Kota: {city}
        </h3>
        <h3 className="rounded-xl bg-white px-2 py-3 text-pink1 border-2 border-pink1 font-semibold text-lg font-semibold mb-8">
          Kategori: {category}
        </h3>
      </div>
      <a
        target="_blank"
        rel="noreferrer"
        href={generateGoogleMapsLink(lat, long)}
        className="text-pink1 font-semibold text-xl underline"
      >
        Google Maps
      </a>
      <p className="text-xl text-justify mt-8">{description}</p>
      <button
        className="rounded-xl bg-pink1 px-2 py-3 text-white font-semibold text-lg font-semibold mt-8"
        onClick={handleCloseModal}
      >
        Tutup
      </button>
    </div>
  );
};

export default DetailDest;
