import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = ({ setError, setLoading }) => {
  const { dispatch } = useAuthContext();
  const [isPending, setIsPending] = useState(null);
  const url = "http://localhost:3100/api/users/signin";

  const login = async (username, password) => {
    setIsPending(true);

    console.log(JSON.stringify({ username, password }));

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const user = await response.json();

    if (user.success) {
      localStorage.setItem("user", JSON.stringify(user.data));
      dispatch({ type: "LOGIN", payload: user.data });
      setLoading(false);
      return {
        isError: false,
        message: "Login Success!",
      };
    }
    if (!user.success) {
      setLoading(false);
      return {
        isError: true,
        message: user.error,
      };
    }
  };

  return { login, isPending };
};
