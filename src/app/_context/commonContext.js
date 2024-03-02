import { createContext, useState, useEffect } from "react";
import placeNames from "@/app/_data/placeNames";
import { toast } from "react-toastify";
export const CommonContext = createContext();

export const CommonProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("recommendation")) {
      setRecommendation(JSON.parse(localStorage.getItem("recommendation")));
    }
    setIsLoading(false);
  }, []);

  const fetchRecommendation = async (type, category, keyword, setRedirect) => {
    try {
      // Set request body and endpoint per type
      let requestBody = null;
      let apiUrl = null;

      if (type == "category") {
        requestBody = {
          category: category.type,
          city: category.city,
          count: 10,
        };
        apiUrl = "/api/recommendcbf";
      } else {
        if (!placeNames.includes(keyword)) {
          throw new Error("Masukkan tempat yang tersedia");
        }
        requestBody = {
          place_name: keyword,
        };
        apiUrl = "/api/recommendcbf2";
      }

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      if (!response.ok) {
        console.log("error");
      } else {
        localStorage.setItem("recommendation", JSON.stringify(data));
        setRecommendation(data);
        setRedirect(true);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <CommonContext.Provider
      value={{ fetchRecommendation, isLoading, recommendation }}
    >
      {children}
    </CommonContext.Provider>
  );
};
