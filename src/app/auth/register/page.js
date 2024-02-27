import Button from "@/app/components/common/button";
import Link from "next/link";

export default function Register() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-image-login font-poppins text-textwhite">
        <h1 className="text-4xl font-semibold">Daftar Sekarang</h1>
        <div className="bg-textwhite rounded-[20px] text-textblack justify-center px-9 py-6 mt-6 w-[552px]">
          <form action="" className="">
            <div className="flex flex-col items-start w-7/8 mt-6">
              <p className="font-medium text-xl">Email</p>
              <input
                className="w-full text-xl
                                text-slate-500 rounded-[20px]
                                focus:outline-none focus:ring-0 mt-2 p-6"
                type="email"
                name="email"
                // value={formData.email}
                // onChange={handleChange}
                placeholder="Masukkan email"
                required
              />
            </div>

            <div className="flex flex-col items-start w-7/8 mt-6">
              <p className="font-medium text-xl">Username</p>
              <input
                className="w-full text-xl
                                text-slate-500 rounded-[20px]
                                focus:outline-none focus:ring-0 mt-2 p-6"
                type="text"
                name="username"
                // value={formData.username}
                // onChange={handleChange}
                placeholder="Masukkan username"
                required
              />
            </div>

            <div className="flex flex-col items-start w-7/8 mt-6">
              <p className="font-medium text-xl">Nama</p>
              <input
                className="w-full text-xl
                                text-slate-500 rounded-[20px]
                                focus:outline-none focus:ring-0 mt-2 p-6"
                type="text"
                name="name"
                // value={formData.name}
                // onChange={handleChange}
                placeholder="Masukkan nama"
                required
              />
            </div>

            <div className="flex flex-col items-start w-7/8 mt-6">
              <div className="flex justify-between items-end w-full">
                <p className="font-medium text-xl">Password</p>
              </div>
              <input
                className="w-full text-xl
                                text-slate-500 rounded-[20px]
                                focus:outline-none focus:ring-0 mt-2 p-6"
                type="password"
                name="password"
                // value={formData.password}
                // onChange={handleChange}
                placeholder="Masukkan password"
                required
              />
            </div>

            <div className="flex flex-col items-center mt-8">
              <Button>DAFTAR</Button>
              <p className="mt-4">
                Sudah memiliki akun?{" "}
                <span className="text-[#bf002f]">
                  <Link href="/auth/login">Login</Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
