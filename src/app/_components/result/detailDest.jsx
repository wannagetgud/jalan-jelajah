const DetailDest = ({ recommendation, closeModal = () => {}, isModalOpen }) => {
  const generateGoogleMapsLink = (latitude, longitude) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    return url;
  };
  return (
    <div
      className={
        (isModalOpen
          ? "w-full h-[70vh] opacity-100 "
          : "h-[0vh] w-0 opacity-0 ") + " rounded-t-xl fixed bottom-0 left-0 z-50  flex flex-col justify-center items-start px-24 py-12 bg-c-white transition duration-800 border border-xl border-[8px]"
      }
    >
      <h1 className="text-4xl font-semibold text-c-pink1 mb-8">
        {recommendation?.place_name}
      </h1>
      <div className="flex gap-2">
        <h3 className="rounded-xl bg-c-white px-2 py-3 text-c-pink1 border-2 border-c-pink1 font-semibold text-lg mb-8">
          Kota: {recommendation?.city}
        </h3>
        <h3 className="rounded-xl bg-c-white px-2 py-3 text-c-pink1 border-2 border-c-pink1 font-semibold text-lg mb-8">
          Kategori: {recommendation?.category}
        </h3>
      </div>
      <a
        target="_blank"
        rel="noreferrer"
        href={generateGoogleMapsLink(recommendation?.lat, recommendation?.long)}
        className="text-c-pink1 font-semibold text-xl underline"
      >
        Google Maps
      </a>
      <p className="text-xl text-justify mt-8">{recommendation?.description}</p>
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
