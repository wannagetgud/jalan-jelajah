import clsx from "clsx";

export default function Button({
  type,
  children,
  className = "",
  onClick = null,
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "rounded-[20px] bg-c-pink1 px-12 py-3 text-c-textwhite font-semibold mx-auto",
        className
      )}
      type={type}
    >
      {children}
    </button>
  );
}
