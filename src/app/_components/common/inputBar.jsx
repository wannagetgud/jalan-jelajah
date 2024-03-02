export default function InputBar({
  labelText = "",
  className = "",
  inputName = "",
  inputValue = "",
  placeholderText = "",
  handleChange = () => {},
}) {
  return (
    <>
      <div className="flex flex-col items-start w-7/8 mt-2 md:mt-6 text-md md:text-xl">
        <label htmlFor={inputName} className="font-medium">
          {labelText}
        </label>
        <input
          className={`w-full bg-c-grey
                                text-black rounded md:rounded-[20px]
                                focus:outline-none focus:ring-0 mt-2 p-3 md:p-6 ${className}`}
          type={inputName === "password" ? "password" : "text"}
          name={inputName}
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholderText}
          required
        />
      </div>
    </>
  );
}
