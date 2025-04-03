import { SiCinema4D } from "react-icons/si";
import { BiCategory } from "react-icons/bi";
import { IoIosLogOut } from "react-icons/io";
import { CiHome, CiUser, CiHeart, CiLight, CiDark } from "react-icons/ci";
import { GiRecycle } from "react-icons/gi";
import { IoTicketOutline } from "react-icons/io5";
import ItemLeftBar from "./ItemLeftBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LiaHandsHelpingSolid } from "react-icons/lia";
const LeftBar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMood, setIsMood] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    if (isMood === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isMood]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    toast.success("Logout success");
  };

  return (
    <div className="fixed h-full overflow-y-auto w-full md:w-auto ">
      <div className="h-full dark:bg-black/70 bg-white flex flex-col justify-between py-8 dark:border-gray-600 dark:border-r-[1px]">
        <div className="flex items-center gap-2 pb-8 px-8 mt-4">
          <SiCinema4D color="#da821b" size={28} />
          <span className="font-mono font-black dark:text-[#da821b] ">
            Cticket
          </span>
        </div>
        <div id="leftbar" className="flex flex-col flex-1 px-4">
          <ItemLeftBar
            path="/"
            text="Home"
            icon={<CiHome id="leftbar_item_icon" size={24} />}
          />
          <ItemLeftBar
            path="/category"
            text="Category"
            icon={<BiCategory id="leftbar_item_icon" size={24} />}
          />
          <ItemLeftBar
            path="/profile"
            text="Profile"
            icon={<CiUser id="leftbar_item_icon" size={24} />}
          />
          <ItemLeftBar
            path="/ticket"
            text="My tickets"
            icon={<IoTicketOutline id="leftbar_item_icon" size={24} />}
          />
          <ItemLeftBar
            path="/favorites"
            text="Favorites"
            icon={<CiHeart id="leftbar_item_icon" size={24} />}
          />
          <ItemLeftBar
            path="/assistant"
            text="AI Assistant"
            icon={
              <LiaHandsHelpingSolid
                className=""
                id="leftbar_item_icon"
                size={24}
              />
            }
          />
          <div
            className="flex items-center gap-1 px-4 py-4 hover:cursor-pointer"
            onClick={() => {
              setIsMood((cur) => {
                if (cur === "dark") {
                  document.documentElement.classList.remove("dark");
                  localStorage.setItem("theme", "light");
                  return "light";
                } else {
                  document.documentElement.classList.add("dark");
                  localStorage.setItem("theme", "dark");
                  return "dark";
                }
              });
            }}
          >
            {isMood === "dark" ? (
              <>
                {" "}
                <CiDark size={24} color="gray" />
                <span className="text-gray-400 dark:text-white  font-medium">
                  Dark mood
                </span>
                <GiRecycle size={24} color="gray" />
              </>
            ) : (
              <>
                {" "}
                <CiLight size={24} color="gray" />
                <span className="text-gray-400 dark:text-white  font-medium">
                  Light mood
                </span>
                <GiRecycle size={24} color="gray" />
              </>
            )}
          </div>
        </div>
        {user && (
          <div>
            <div
              onClick={handleLogout}
              className=" px-8 flex items-center gap-2 hover:cursor-pointer "
            >
              <IoIosLogOut color="gray" size={24} />
              <span className="text-gray-400 dark:text-white  font-medium">
                Log out
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftBar;
