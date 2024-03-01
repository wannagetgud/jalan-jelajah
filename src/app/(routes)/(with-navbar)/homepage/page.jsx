"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import clsx from "clsx";
import placeNames from "@/app/_data/placeNames";
import { toast } from "react-toastify";

export default function Homepage() {
  const [isModeCategory, setIsModeCategory] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [filteredSuggestion, setFilteredSuggestion] = useState([]);
  const [category, setCategory] = useState({
    type: "Taman Hiburan",
    city: "Jakarta",
  });

  const handleCategoryChange = async (event) => {
    const { name, value } = event.target;
    setCategory({
      ...category,
      [name]: value,
    });
  };

  const handleKeywordChange = (event) => {
    const value = event.target.value;
    setKeyword(value);

    const filtered = placeNames.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredSuggestion(filtered);
    setShowSuggestion(filtered.length > 0);
  };

  const handleSuggestionClick = (suggestion) => {
    setKeyword(suggestion);
    setShowSuggestion(false);
  };

  const handleClick = async () => {
    try {
      const requestBody = {
        category: category.type,
        city: category.city,
        count: 10,
      };
      const response = await fetch("/api/recommendcbf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickKeyword = async () => {
    try {
      const requestBody = {
        place_name: keyword,
      };
      const response = await fetch("/api/recommendcbf2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(category);
  }, [category]);

  return (
    <div className="flex container mx-auto h-[90vh] justify-center">
      <div className="w-[544px] mr-[132px] flex flex-col justify-center gap-8">
        <p className="text-8xl font-semibold">Explore Beautiful Indonesia</p>

        {/* Selection */}
        <div className="h-16 bg-white rounded-xl flex border-2 border-c-textblack shadow-home text-lg font-semibold">
          <button
            type="button"
            className={clsx(
              "w-1/2 rounded-lg transition-all duration-300",
              isModeCategory ? "bg-c-pink1 text-white" : ""
            )}
            onClick={() => setIsModeCategory(true)}
          >
            Kategori
          </button>
          <button
            type="button"
            className={clsx(
              "w-1/2 rounded-lg transition-all duration-300",
              !isModeCategory ? "bg-c-pink1 text-white" : ""
            )}
            onClick={() => setIsModeCategory(false)}
          >
            Keyword
          </button>
        </div>

        {/* Box Input */}
        {isModeCategory ? (
          <div className="rounded-xl bg-white shadow-home flex justify-between h-20">
            <div className="px-4 py-4 h-full ml-4">
              <label className="text-base font-semibold mb-4 w-1/2">
                Tipe Wisata Pilihanmu
              </label>
              <select
                name="type"
                id="category"
                className="text-lg text-c-pink1 font-medium"
                onChange={handleCategoryChange}
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
              <select
                name="city"
                id="city"
                className="text-lg text-c-pink1 font-medium items-center w-full"
                onChange={handleCategoryChange}
              >
                <option value="Jakarta" className="text-lg">
                  Jakarta
                </option>
                <option value="Bandung" className="text-lg">
                  Bandung
                </option>
                <option value="Semarang" className="text-lg">
                  Semarang
                </option>
                <option value="Surabaya" className="text-lg">
                  Surabaya
                </option>
                <option value="Yogyakarta" className="text-lg">
                  Yogyakarta
                </option>
              </select>
            </div>
            <Link
              href="/result"
              className="bg-c-pink1 flex items-center justify-center p-3 rounded-r-xl"
              onClick={() => handleClick()}
            >
              <Search size={32} color="white" />
            </Link>
          </div>
        ) : (
          <div className="rounded-xl bg-white shadow-home flex w-full justify-between h-20">
            <div className="px-4 py-4 h-full ml-4 w-full">
              <input
                type="text"
                name="place_name"
                id="place_name"
                value={keyword}
                onChange={handleKeywordChange}
                placeholder="Masukkan nama tempat favorit"
                className="w-full py-2 text-lg text-c-pink1 font-medium pl-2"
              />
              {showSuggestion && (
                <ul className="relative top-0 bg-white rounded-b-md h-48 overflow-y-scroll">
                  {filteredSuggestion.map((suggestion, index) => (
                    <li
                      className="py-2 px-2 hover:bg-c-pink1 rounded-md hover:text-white cursor-pointer"
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Link
              href="/result"
              className="bg-c-pink1 flex items-center justify-center p-3 rounded-r-xl align-self-end"
              onClick={() => handleClickKeyword()}
            >
              <Search size={32} color="white" />
            </Link>
          </div>
        )}
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
