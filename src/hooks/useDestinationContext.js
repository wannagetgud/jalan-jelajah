import { useContext } from "react";
import { DestinationContext } from "../context/destinationContext";

export const useDestinationContext = () => {
  const context = useContext(DestinationContext);

  if (!context) {
    throw Error("Something bad occured on useDestinationContext");
  }

  return context;
};
