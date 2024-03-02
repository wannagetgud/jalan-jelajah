"use client";

import { AuthProvider } from "@/app/_context/authContext";
import { CommonProvider } from "../_context/commonContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/app/globals.css";

export default function Provider({ children }) {
  return (
    <AuthProvider>
      <CommonProvider>
        <ToastContainer></ToastContainer>
        {children}
      </CommonProvider>
    </AuthProvider>
  );
}
