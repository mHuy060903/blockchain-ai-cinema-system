import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";
import { MdFavoriteBorder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../reducers/auth/authSlice.js";
import { toast } from "react-toastify";
import { MdOutlineDashboard } from "react-icons/md";
const HoverBar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout success");
    navigate("/login");
    localStorage.removeItem("token");
  };
  return (
    <div className="absolute hidden after:absolute after:w-full after:h-10 after:bg-transparent after:-z-10 after:top-[-20px] group-hover:block bg-white top-12 w-full  rounded-lg z-10 before:z-[-1]  before:bg-white before:w-2 before:h-2 before:absolute before:right-1 before:top-[-4px] before:rotate-45">
      <div className="flex flex-col items-start justify-center">
        <Link
          to="/profile"
          className="transition duration-300 flex items-center gap-3 p-2 hover:bg-gray-300 cursor-pointer w-full"
        >
          <CgProfile color="blue" size={22} />
          <span className="text-lg ">Profile</span>
        </Link>
        {user.role === "admin" && (
          <Link
            to="/dashboard"
            className="transition duration-300 flex items-center gap-3 p-2 hover:bg-gray-300 cursor-pointer w-full"
          >
            <MdOutlineDashboard color="blue" size={22} />
            <span className="text-lg ">Dashboard</span>
          </Link>
        )}

        <div className="transition duration-300 flex items-center gap-3 p-2   hover:bg-gray-300 cursor-pointer w-full">
          <MdFavoriteBorder color="blue" size={22} />
          <span className="text-lg ">Favorites</span>
        </div>
        <div
          onClick={handleLogout}
          to="/login"
          className="transition duration-300 flex items-center gap-3 p-2   hover:bg-gray-300 cursor-pointer w-full"
        >
          <IoMdLogOut color="blue" size={22} />
          <span className="text-lg">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default HoverBar;
