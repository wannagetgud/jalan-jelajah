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

export default DetailDest;
