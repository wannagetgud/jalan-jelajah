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
      <div className="flex flex-col items-start w-7/8 mt-6">
        <label htmlFor={inputName} className="font-medium text-xl">
          {labelText}
        </label>
        <input
          className={`w-full text-xl bg-c-grey
                                text-black rounded-[20px]
                                focus:outline-none focus:ring-0 mt-2 p-6 ${className}`}
          type="text"
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
