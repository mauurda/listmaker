import React from "react";
import type { ButtonProps } from "../types/components/Button";

function Button({ children, onClick, className }: ButtonProps) {
  return (
    <div
      onClick={onClick}
      className={
        " text-xl rounded-md shadow-md p-2 flex flex-row font-semibold hover:scale-105 hover:shadow-md text-center  duration-200 ease-out cursor-pointer justify-center items-center space-x-1 bg-black text-white " +
        className
      }
    >
      {children}
    </div>
  );
}

export default Button;
