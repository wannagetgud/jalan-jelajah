import Navbar from "@/app/_components/common/navbar";

export default function withNavbarLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="bg-c-white text-c-textblack flex items-center justify-center">
        <div className="">{children}</div>
      </div>
    </>
  );
}
