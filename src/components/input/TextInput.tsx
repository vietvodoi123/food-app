import React from "react";
import styled from "./Textinput.module.css";
type Props = {
  name: string;
  setData: (value: string) => void;
};

function TextInput({ name, setData }: Props) {
  return (
    <div className="relative mb-[30px] text-orange1">
      <input
        type="text"
        id="myInput"
        className="text-input peer rounded-md px-[20px] py-[10px] h-10 w-full border-b-2 border-gray-300 border-2 focus:border-violet-500 border-violet-500 placeholder-transparent"
        placeholder=" "
        onChange={(e) => setData(e.target.value)}
      />
      <label
        htmlFor="myInput"
        className="absolute inline-block px-[10px] rounded-md bg-white left-[10px] top-2 select-none pointer-events-none transition-all"
      >
        {name}
      </label>
    </div>
  );
}

export default TextInput;
