import { Poppins } from "next/font/google";
import "@/app/globals.css";
import Provider from "@/app/(routes)/provider";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "JalanJelajah",
  description: "Your all-in-one travel ideas and inspiration",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
