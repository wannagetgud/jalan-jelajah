import Link from "next/link";
import { User } from "lucide-react";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between font-poppins px-32 py-4 sticky top-0 bg-c-white z-40">
      <Link href="/homepage" className="font-bold text-2xl w-[250px]">
        <span className="text-c-textblack">Jalan</span>
        <span className="text-c-pink1">Jelajah</span>
      </Link>

      <div className="flex items-center justify-center mx-16 gap-24 w-full">
        <Link className="font-medium text-xl" href="/homepage">
          Beranda
        </Link>
        <Link className="font-medium text-xl" href="/bookmarks">
          Tersimpan
        </Link>
        <Link className="font-medium text-xl" href="/about">
          Tentang Kami
        </Link>
      </div>

      <Link
        href={"/profile"}
        className="h-8 w-8 pt mr-2 w-[200px] flex justify-end"
      >
        <User size={36} />
      </Link>
    </div>
  );
}
