import Navbar from "@/app/_components/common/navbar";

export default function withNavbarLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="bg-c-white text-c-textblack flex flex-col items-center justify-center">
        {children}
      </div>
    </>
  );
}
