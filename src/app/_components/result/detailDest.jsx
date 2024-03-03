import clsx from "clsx";
import { X } from "lucide-react";
import { generateGoogleMapsLink } from "@/app/_utils/generateGoogleMapsLink";

const DetailDest = ({ recommendation, closeModal, isModalOpen }) => {
  const detailBoxClass =
    "rounded-xl bg-c-white px-2 py-3 text-c-pink1 border-2 border-c-pink1 font-semibold text-xs md:text-lg mb-2 md:mb-8";

  return (
    <div
      className={clsx(
        "fixed left-0 top-0 z-50 h-screen w-full bg-slate-500/70 text-white",
        isModalOpen ? "" : "hidden"
      )}
    >
      <div className="container mx-auto flex h-full items-center justify-center max-md:text-sm">
        <div className="relative flex flex-col rounded-xl bg-c-white p-8 text-c-textblack">
          <button
            onClick={closeModal}
            className="absolute -right-2 -top-2 md:-right-4 md:-top-4 z-20 aspect-square w-8 md:w-12 rounded-full bg-c-pink1 text-c-textwhite transition-all duration-300 hover:scale-110"
          >
            <X className="mx-auto w-6 md:w-8" />
          </button>
          <h1 className="text-xl md:text-4xl font-semibold text-c-textblack mb-4 md:mb-8">
            {recommendation?.place_name}
          </h1>
          <div className="flex max-md:flex-col md:gap-2">
            <h3 className={detailBoxClass}>Kota: {recommendation?.city}</h3>
            <h3 className={detailBoxClass}>
              Kategori: {recommendation?.category}
            </h3>
            <h3 className={detailBoxClass}>
              Harga Tiket Masuk: {recommendation?.price}
            </h3>
            {recommendation?.rating && (
              <h3 className={detailBoxClass}>
                Rating: {recommendation?.rating}
              </h3>
            )}
          </div>
          <a
            target="_blank"
            rel="noreferrer"
            href={generateGoogleMapsLink(
              recommendation?.lat,
              recommendation?.long
            )}
            className="text-c-pink1 font-semibold text-md md:text-xl underline mt-4"
          >
            Google Maps
          </a>
          <div className="max-md:h-48 max-md:overflow-y-scroll mt-2 md:mt-8">
            <p className="text-md md:text-xl text-justify">
              {recommendation?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailDest;
