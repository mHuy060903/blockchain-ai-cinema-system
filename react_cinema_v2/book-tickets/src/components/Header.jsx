/* eslint-disable react/prop-types */
import { CiSearch } from "react-icons/ci";
import { GiPositionMarker } from "react-icons/gi";
import { FaBars } from "react-icons/fa";
const Header = ({ onOpenModel }) => {
  return (
    <div className="flex items-center justify-between gap-2 md:gap-10">
      <div
        onClick={onOpenModel}
        className="p-2 rounded-full cursor-pointer hover:bg-gray-300 transition-all duration-300 block lg:hidden"
      >
        <FaBars color="gray" size={20} />
      </div>
      <div className="flex items-center w-[320px] bg-white md:flex-1 px-3 py-1 rounded-3xl gap-2">
        <CiSearch color="gray" size={26} />
        <input
          className="flex-1 outline-none"
          placeholder="Search name movie"
        />
        <button className="bg-[#da821b] text-white rounded-full p-2 px-4 sm:px-8 sm:py-2">
          Search
        </button>
      </div>
      <div className="flex items-center">
        <GiPositionMarker color="gray" size={26} />
        <select name="postion" className="bg-transparent outline-none">
          <option>Ahwaz</option>
        </select>
      </div>
    </div>
  );
};

export default Header;
