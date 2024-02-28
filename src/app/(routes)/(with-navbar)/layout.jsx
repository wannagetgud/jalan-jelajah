import Navbar from "@/app/_components/common/navbar";

export default function withNavbarLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-c-white pt-16 text-c-textblack">
        <div>{children}</div>
      </div>
    </>
  );
}
