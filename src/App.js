import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { Home1 } from "./pages/Home1";
import { Profile } from "./pages/Profile";
import { Recommend } from "./pages/Recommend";
import { About } from "./pages/About";
import DestinationsContextProvider from "./context/destinationContext";
import AuthContextProvider from "./context/authContext";
import { useAuthContext } from "./hooks/useAuthContext";
import { useEffect, useState } from "react";

function App() {
  const { user, dispatch } = useAuthContext();
  const [isLoading, setIsLoading] = useState();
  useEffect(() => {
    const logged = JSON.parse(localStorage.getItem("user"));
    dispatch({ type: "LOGIN", payload: logged });
    setIsLoading(false);
  }, []);
  console.log(user);

  return (
    <Router>
      <AuthContextProvider>
        <DestinationsContextProvider>
          <Routes>
            {user == null ? (
              <>
                <Route path="/*" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Home1 />} />
                <Route path="/places" element={<Home />} />
                {/* <Route path="/login" element={<Login />} /> */}
                <Route path="/profile" element={<Profile />} />
                <Route path="/recommend" element={<Recommend />} />
                <Route path="/about" element={<About />} />
              </>
            )}
            {/* <Route path="/" element={<Home1 />} />
          <Route path="/places" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/recommend" element={<Recommend />} /> */}
          </Routes>
        </DestinationsContextProvider>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
