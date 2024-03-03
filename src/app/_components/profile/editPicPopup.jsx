import { useState } from "react";
import Image from "next/image";

import clsx from "clsx";
import { toast } from "react-toastify";
import { X, LucideUpload } from "lucide-react";
import Button from "@/app/_components/common/button";

const EditPicPopup = ({ isOpen, onClose, handleDone, imagePreview, token }) => {
  const [newImage, setNewImage] = useState(null);

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", newImage);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.msg);
      }
      const data = await response.json();
      handleDone(data.url);
    } catch (error) {
      toast.error(error.msg);
    }
  };

  return (
    <div
      className={clsx(
        "fixed left-0 top-0 z-20 h-screen w-full bg-slate-500/70 text-white",
        isOpen ? "" : "hidden"
      )}
    >
      <div className="container mx-auto flex h-full w-1/2 items-center justify-center max-md:text-sm">
        <div className="relative flex w-[500px] flex-col rounded-xl bg-c-white p-8 text-c-textblack">
          <button
            onClick={() => {
              onClose();
              setNewImage(null);
            }}
            className="absolute -right-2 -top-2 md:-right-4 md:-top-4 z-20 aspect-square w-8 md:w-12 rounded-full bg-c-pink1 text-c-textwhite transition-all duration-300 hover:scale-110"
          >
            <X className="mx-auto w-6 md:w-8" />
          </button>

          <h1 className="mb-4 text-2xl font-semibold max-md:text-lg">
            Edit Gambar Profil
          </h1>

          <p>Masukkan gambar profil yang ingin Anda gunakan. Maksimal 2MB.</p>

          {imagePreview && (
            <div className="w-1/2 mx-auto my-4">
              <Image
                src={
                  newImage
                    ? URL.createObjectURL(newImage)
                    : imagePreview.length > 0
                    ? imagePreview
                    : "/assets/dummy-pfp.png"
                }
                width={250}
                height={250}
                alt="Profile Picture preview"
              />
            </div>
          )}

          <form>
            <input
              id="imagesUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                setNewImage(e.target.files[0]);
              }}
            />
            <label
              htmlFor="imagesUpload"
              className="my-4 flex gap-4 justify-center items-center mt-4"
            >
              <LucideUpload
                size={32}
                className="cursor-pointer hover:scale-110 transition-all duration-300"
              />{" "}
              Upload
            </label>

            <div className="flex justify-between gap-4 mt-8 w-full">
              <Button
                onClick={() => {
                  onClose();
                  setNewImage(null);
                }}
                className="bg-white border border-c-pink1 !text-c-pink1 !mx-0"
              >
                Batal
              </Button>
              <Button onClick={handleSave} className="!mx-0">
                Simpan
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPicPopup;
