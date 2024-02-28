"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import clsx from "clsx";

export default function Homepage() {
  const [isModeCategory, setIsModeCategory] = useState(true);

  return (
    <div className="flex container mx-auto h-[90vh]">
      <div className="w-[544px] mr-[132px] flex flex-col justify-center gap-8">
        <p className="text-8xl font-semibold">Explore Beautiful Indonesia</p>

        {/* Selection */}
        <div className="h-16 bg-white rounded-xl flex border-2 border-c-textblack shadow-home text-lg font-semibold">
          <button
            type="button"
            className={clsx(
              "w-1/2 rounded-xl",
              isModeCategory ? "bg-c-pink1 text-white" : ""
            )}
          >
            Kategori
          </button>
          <button
            type="button"
            className={clsx(
              "w-1/2 rounded-xl",
              !isModeCategory ? "bg-c-pink1 text-white" : ""
            )}
          >
            Keyword
          </button>
        </div>

        {/* Box Input */}
        <div className="rounded-xl bg-white shadow-home flex justify-between h-20">
          <div className="px-4 py-4 h-full ml-4">
            <label className="text-base font-semibold mb-4 w-1/2">
              Tipe Wisata Pilihanmu
            </label>
            <select
              name="category"
              id="category"
              className="text-lg text-c-pink1 font-medium"
              // onBlur={handleChange}
            >
              <option value="Taman Hiburan" className="text-lg">
                Taman Hiburan
              </option>
              <option value="Budaya" className="text-lg">
                Budaya
              </option>
              <option value="Cagar Alam" className="text-lg">
                Cagar Alam
              </option>
              <option value="Bahari" className="text-lg">
                Bahari
              </option>
              <option value="Tempat Ibadah" className="text-lg">
                Tempat Ibadah
              </option>
              <option value="Pusat Perbelanjaan" className="text-lg">
                Pusat Perbelanjaan
              </option>
            </select>
          </div>
          <div className="py-2">
            <hr vertical="true" className="bg-c-pink1 w-[4px] h-full" />
          </div>
          <div className="px-4 py-4 h-full">
            <label className="text-base font-semibold mb-4">Kota Kamu</label>
            <input
              name="city"
              id="city"
              className="text-lg font-medium items-center w-full text-c-pink1"
              placeholder="Jakarta"
              // onChange={handleChange}
            />
          </div>
          <Link
            href="/result"
            className="bg-c-pink1 flex items-center justify-center p-3 rounded-r-xl"
            //   onClick={() => handleClick()}
          >
            <Search size={32} color="white" />
          </Link>
        </div>
      </div>
      <div className="flex items-center">
        <Image
          src="/assets/hero.png"
          width={500}
          height={500}
          alt="Hero imager"
        />
      </div>
    </div>
  );
}
