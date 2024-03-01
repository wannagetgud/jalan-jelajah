"use client";

import { Poppins } from "next/font/google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/app/globals.css";
import { AuthProvider } from "@/app/_context/authContext";
import { CommonProvider } from "../_context/commonContext";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

// export const metadata = {
//   title: "JalanJelajah",
//   description: "Your all-in-one travel ideas and inspiration",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          <CommonProvider>
            <ToastContainer></ToastContainer>
            {children}
          </CommonProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
