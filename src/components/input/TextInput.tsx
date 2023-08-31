import React from "react";
import styled from "./Textinput.module.css";
type Props = {
  name: string;
  setData: (value: string) => void;
};

function TextInput({ name, setData }: Props) {
  return (
    <div className="relative mb-[15px] ">
      <input
        type="text"
        id="myInput"
        className="text-input peer rounded-md px-[20px] py-[10px] h-10 w-full border-b-2 border-gray-300 focus:border-violet-500 placeholder-transparent"
        placeholder=" "
        onChange={(e) => setData(e.target.value)}
      />
      <label
        htmlFor="myInput"
        className="absolute inline-block px-[10px] rounded-md bg-white left-[10px] top-0 select-none pointer-events-none transition-all peer-focus:top-[-10px] peer-placeholder-shown:top-[10px] peer-focus:text-orange1 peer-focus:bg-white "
      >
        {name}
      </label>
    </div>
  );
}

export default TextInput;
