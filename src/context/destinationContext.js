import { createContext, useReducer } from "react";

export const DestinationContext = createContext();

export const destinationReducer = (state, action) => {
  switch (action.type) {
    case "GET_DESTINATIONS":
      return {
        ...state,
        destination: action.payload,
      };
    default:
      return state;
  }
};

const DestinationsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(destinationReducer, {
    destination: null,
  });

  return (
    <DestinationContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DestinationContext.Provider>
  );
};

export default DestinationsContextProvider;
