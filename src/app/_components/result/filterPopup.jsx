import { useState } from "react";
import clsx from "clsx";
import { X, ArrowBigDownDash, ArrowBigUpDash } from "lucide-react";
import Button from "@/app/_components/common/button";

const FilterPopup = ({ isOpen, onClose, onSubmit }) => {
  const [value, setValue] = useState("naik");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <div
      className={clsx(
        "fixed left-0 top-0 z-50 h-screen w-full bg-slate-500/70 text-white",
        isOpen ? "" : "hidden"
      )}
    >
      <div className="container mx-auto flex h-full w-1/2 items-center justify-center max-md:text-sm">
        <div className="relative flex w-[300px] flex-col rounded-xl bg-c-white p-8 text-c-textblack">
          <button
            onClick={onClose}
            className="absolute -right-2 -top-2 md:-right-4 md:-top-4 z-20 aspect-square w-8 md:w-12 rounded-full bg-c-pink1 text-c-textwhite transition-all duration-300 hover:scale-110"
          >
            <X className="mx-auto w-6 md:w-8" />
          </button>

          <h1 className="mb-4 text-2xl font-semibold max-md:text-lg text-center">
            Filter Harga
          </h1>

          <fieldset className="mx-auto">
            <div className="flex text-lg md:text-xl </div>my-2">
              <input
                type="radio"
                id="hargaNaik"
                name="harga"
                value="naik"
                className="mr-2"
                onChange={(e) => setValue(e.target.value)}
              />
              <label
                htmlFor="hargaNaik"
                className="flex items-center justify-center gap-2"
              >
                <ArrowBigUpDash />
                <p>Naik</p>
              </label>
            </div>
            <div className="flex text-lg md:text-xl my-2">
              <input
                type="radio"
                id="hargaTurun"
                name="harga"
                value="turun"
                className="mr-2"
                onChange={(e) => setValue(e.target.value)}
              />
              <label
                htmlFor="hargaTurun"
                className="flex items-center justify-center gap-2"
              >
                <ArrowBigDownDash />
                <p>Turun</p>
              </label>
            </div>
          </fieldset>

          <Button onClick={handleSubmit} className="!mx-auto !w-1/2 mt-4 !px-3">
            Simpan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPopup;
