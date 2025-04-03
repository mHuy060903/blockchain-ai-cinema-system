import React from "react";

const ItemFooter = ({ text }) => {
  return (
    <span className="hover:text-orange-500 cursor-pointer relative group ">
      <div className="absolute  bg-transparent group-hover:bg-orange-600  w-full h-[2px] bottom-[-4px] group-hover:translate-x-0 -translate-x-full transition-transform duration-500 transform"></div>
      {text}
    </span>
  );
};

export default ItemFooter;
