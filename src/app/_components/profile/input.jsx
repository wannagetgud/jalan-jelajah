import React from "react";

const Input = ({ value, setValue }) => {
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <input
      type="text"
      className="rounded bg-c-grey p-2 w-full"
      value={value}
      onChange={handleChange}
    />
  );
};

export default Input;
