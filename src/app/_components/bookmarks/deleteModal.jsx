import clsx from "clsx";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import Button from "@/app/_components/common/button";

const DeletePopup = ({ isDeleting, placeId, onClose, token, refetch }) => {
  const removePlaceFromBookmark = async (id) => {
    try {
      const requestBody = {
        placeId: id,
      };
      const response = await fetch(`/api/bookmark`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus bookmark");
      }

      const data = await response.json();
      toast.success("Bookmark telah dihapus");
      refetch();
      onClose();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className={clsx(
        "fixed left-0 top-0 z-10 h-screen w-full bg-slate-500/70 text-white",
        isDeleting ? "" : "hidden"
      )}
    >
      <div className="container mx-auto flex h-full w-1/2 items-center justify-center max-md:text-sm">
        <div className="relative flex w-[500px] flex-col rounded-xl bg-c-white p-8 text-c-textblack">
          <button
            onClick={onClose}
            className="absolute -right-2 -top-2 md:-right-4 md:-top-4 z-20 aspect-square w-8 md:w-12 rounded-full bg-c-pink1 text-c-textwhite transition-all duration-300 hover:scale-110"
          >
            <X className="mx-auto w-6 md:w-8" />
          </button>

          <h1 className="mb-4 text-2xl font-semibold max-md:text-lg">
            Konfirmasi Hapus
          </h1>
          <p>
            Anda yakin ingin menghapus bookmark ini? Anda tidak dapat melihat
            tempat ini lagi pada halaman bookmark.
          </p>
          <div className="flex justify-between gap-4 mt-8 w-full">
            <Button
              onClick={onClose}
              className="bg-white border border-c-pink1 !text-c-pink1 !mx-0"
            >
              Batal
            </Button>
            <Button
              onClick={() => removePlaceFromBookmark(placeId)}
              className="!mx-0"
            >
              Ya
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
