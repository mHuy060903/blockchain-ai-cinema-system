/* eslint-disable react/prop-types */
import { RiArmchairFill } from "react-icons/ri";
import { arrayLetters } from "../../utils/constant";
import { MdOutlineCancel } from "react-icons/md";
import { MdCancel } from "react-icons/md";
const RowChairs = ({
  arrayTypeChair = [],
  handleDeleteEmptyChair,
  indexArray,
  handleDeleteRow,
  isDelete = true,
  children,
}) => {
  let numChair = 0;

  return (
    <div
      className={`flex gap-1 relative justify-between  ${
        isDelete && "w-full"
      } `}
    >
      <div className={`w-[200px] ${!isDelete && "hidden"}`}></div>
      {isDelete && (
        <>
          <MdOutlineCancel
            onClick={handleDeleteRow}
            className="absolute right-0  top-0 translate-y-[30%]
          hover:cursor-pointer text-red-500 hover:text-red-800"
            size={18}
          />
          {children}
        </>
      )}
      <div className="flex-1 flex ">
        {arrayTypeChair.map((_, index) => {
          if (arrayTypeChair[index] === 1) {
            numChair += 1;
            return (
              <div key={index} className="relative">
                <RiArmchairFill size={26} color="white" />
                <span className="text-slate-600 absolute text-[10px] left-[50%] top-[30%] -translate-x-[50%] -translate-y-[50%]">
                  {`${arrayLetters[indexArray]}${numChair}`}
                </span>
              </div>
            );
          } else if (arrayTypeChair[index] === 0) {
            return (
              <div key={index} className="relative">
                <div className="relative invisible">
                  <RiArmchairFill size={26} color="white" />
                  <span className="text-slate-600 absolute text-[10px] left-[50%] top-[30%] -translate-x-[50%] -translate-y-[50%]">
                    {`${arrayLetters[indexArray]}${numChair}`}
                  </span>
                </div>
                <MdCancel
                  onClick={() => handleDeleteEmptyChair(indexArray, index)}
                  className={`${
                    !isDelete && "hidden"
                  } absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] hover:text-red-700
                text-red-500 duration-300 transition-all cursor-pointer`}
                />
              </div>
            );
          }
        })}
      </div>
      <div></div>
    </div>
  );
};

export default RowChairs;
