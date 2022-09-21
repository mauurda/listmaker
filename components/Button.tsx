import React from "react";

type Props = {
  children: any;
  onClick?: any;
  className?: string;
  bg?: string;
  text?: string;
};
function Button({ children, onClick, bg, text }: Props) {
  return (
    <div
      onClick={onClick}
      className={` text-xl rounded-md shadow-md p-2 flex flex-row font-semibold hover:scale-105 hover:shadow-md text-center  duration-200 ease-out cursor-pointer justify-center items-center space-x-1 bg-black text-white`}
    >
      {children}
    </div>
  );
}

export default Button;
