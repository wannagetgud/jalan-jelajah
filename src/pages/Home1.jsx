import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../components/Navbar";
import Hero from "../assets/hero.png";
import SearchIcon from "../assets/search.svg";
import { useDestinationContext } from "../hooks/useDestinationContext";

export const Home1 = () => {
  const { dispatch, destination } = useDestinationContext();
  const [requestData, setRequestData] = useState({
    category: "",
    city: "",
    count: 10,
  });

  useEffect(() => {
    console.log(destination); // Check the destination value
  }, [destination]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRequestData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClick = async () => {
    console.log(requestData);
    try {
      await axios
        .post("https://senpro-cbf-124.azurewebsites.net/recommend", requestData)
        .then((response) => {
          const recommendations = response.data;
          dispatch({ type: "GET_DESTINATIONS", payload: recommendations });
          console.log(recommendations);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="h-screen flex items-center justify-center bg-white2 ">
        <div className="flex max-w-[1200px]">
          <div className="w-[544px] mr-[132px] flex flex-col justify-center gap-8">
            <p className="text-8xl font-semibold font-poppins">
              Explore Beautiful Indonesia
            </p>
            <div className="rounded-xl bg-white shadow-home flex justify-between h-20">
              <div className="px-4 py-4 h-full ml-4">
                <label className="font-poppins text-base font-semibold mb-4 w-1/2">
                  Tipe Wisata Pilihanmu
                </label>
                <select
                  name="category"
                  id="category"
                  className="text-lg font-poppins text-pink1 font-medium"
                  onBlur={handleChange}
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
                <hr vertical="true" className="bg-pink1 w-[4px] h-full" />
              </div>
              <div className="px-4 py-4 h-full">
                <label className="font-poppins text-base font-semibold mb-4">
                  Kota Kamu
                </label>
                <input
                  name="city"
                  id="city"
                  className="text-lg font-poppins font-medium items-center w-full"
                  placeholder="Jakarta"
                  onChange={handleChange}
                />
              </div>
              <Link
                to="/recommend"
                className="bg-pink1 flex items-center justify-center p-3 rounded-r-xl"
                onClick={() => handleClick()}
              >
                <img
                  src={SearchIcon}
                  alt="search"
                  className="w-8 aspect-square"
                />
              </Link>
            </div>
          </div>
          <div>
            <img src={Hero} alt="hero" />
          </div>
        </div>
      </div>
    </>
  );
};
