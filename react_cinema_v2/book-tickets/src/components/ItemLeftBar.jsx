import { NavLink } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ItemLeftBar = ({ icon, text, path }) => {
  return (
    <NavLink
      to={path}
      className="flex items-center py-4 px-4 gap-2 relative  before:absolute before:w-1 before:h-full before:rounded-tr-lg before:rounded-br-lg before:bg-[#da821b]
    before:left-0"
    >
      {icon}
      <span className="text-gray-400 dark:text-white font-medium ">{text}</span>
    </NavLink>
  );
};

export default ItemLeftBar;
