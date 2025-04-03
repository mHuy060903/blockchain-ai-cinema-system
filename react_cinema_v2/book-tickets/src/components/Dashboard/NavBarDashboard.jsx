import { MdOutlineDashboard } from "react-icons/md";
import { MdDashboard, MdMovieFilter } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { IoTicket, IoSettingsOutline } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import { LuClipboardType } from "react-icons/lu";
import { TbTheater } from "react-icons/tb";
import {
  MdScreenshotMonitor,
  MdOutlineAirlineSeatReclineNormal,
} from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoMdQrScanner } from "react-icons/io";
import { FaRegMessage } from "react-icons/fa6";
const NavBarDashboard = () => {
  return (
    <div
      id="navbar_dashboard"
      className="h-full w-full p-4 flex flex-col gap-1 justify-between overflow-y-auto"
    >
      <div className="flex items-center gap-4  mb-10">
        <MdOutlineDashboard color="white" size={28} />
        <span className="text-white font-semibold text-xl">UNIFYDATA</span>
      </div>
      <div
        className="flex flex-col gap-1 flex-1 overflow-y-auto"
        id="scroll-container"
      >
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            [
              "flex gap-4 items-center p-2 rounded-lg",

              isActive ? "bg-light-green/20 active" : "",
            ].join(" ")
          }
        >
          <MdDashboard id="dashboard_icon" size={22} />
          <span className="text-white font-normal ">Dashboard</span>
        </NavLink>
        <NavLink
          to="/dashboard/movies"
          className={({ isActive }) =>
            [
              "flex gap-4 items-center p-2 rounded-lg",

              isActive ? "bg-light-green/20 active" : "",
            ].join(" ")
          }
        >
          <MdMovieFilter id="dashboard_icon" size={22} />
          <span className="text-white font-normal ">Movies</span>
        </NavLink>
        <NavLink
          to="/dashboard/booking"
          className={({ isActive }) =>
            [
              "flex gap-4 items-center p-2 rounded-lg",

              isActive ? "bg-light-green/20 active" : "",
            ].join(" ")
          }
        >
          <IoTicket id="dashboard_icon" size={22} />
          <span className="text-white font-normal ">Booking</span>
        </NavLink>
        <NavLink
          to="/dashboard/genre"
          className={({ isActive }) =>
            [
              "flex gap-4 items-center p-2 rounded-lg",

              isActive ? "bg-light-green/20 active" : "",
            ].join(" ")
          }
        >
          <LuClipboardType id="dashboard_icon" size={22} />
          <span className="text-white font-normal ">Genres</span>
        </NavLink>
        <NavLink
          to="/dashboard/cinemas"
          className={({ isActive }) =>
            [
              "flex gap-4 items-center p-2 rounded-lg",

              isActive ? "bg-light-green/20 active" : "",
            ].join(" ")
          }
        >
          <TbTheater id="dashboard_icon" size={22} />
          <span className="text-white font-normal ">Cinemas</span>
        </NavLink>
        <NavLink
          to="/dashboard/screens"
          className={({ isActive }) =>
            [
              "flex gap-4 items-center p-2 rounded-lg",

              isActive ? "bg-light-green/20 active" : "",
            ].join(" ")
          }
        >
          <MdScreenshotMonitor id="dashboard_icon" size={22} />
          <span className="text-white font-normal ">Screen</span>
        </NavLink>
        <NavLink
          to="/dashboard/showtimes"
          className={({ isActive }) =>
            [
              "flex gap-4 items-center p-2 rounded-lg",

              isActive ? "bg-light-green/20 active" : "",
            ].join(" ")
          }
        >
          <FaRegCalendarAlt id="dashboard_icon" size={22} />
          <span className="text-white font-normal ">Show times</span>
        </NavLink>
        <NavLink
          to="/dashboard/seattypes"
          className={({ isActive }) =>
            [
              "flex gap-4 items-center p-2 rounded-lg",

              isActive ? "bg-light-green/20 active" : "",
            ].join(" ")
          }
        >
          <MdOutlineAirlineSeatReclineNormal id="dashboard_icon" size={22} />
          <span className="text-white font-normal ">Seat types</span>
        </NavLink>
        <NavLink
          to="/dashboard/scan"
          className={({ isActive }) =>
            [
              "flex gap-4 items-center p-2 rounded-lg",

              isActive ? "bg-light-green/20 active" : "",
            ].join(" ")
          }
        >
          <IoMdQrScanner id="dashboard_icon" size={22} />
          <span className="text-white font-normal ">Scan QR</span>
        </NavLink>
        <NavLink
          to="/dashboard/message"
          className={({ isActive }) =>
            [
              "flex gap-4 items-center p-2 rounded-lg",

              isActive ? "bg-light-green/20 active" : "",
            ].join(" ")
          }
        >
          <FaRegMessage id="dashboard_icon" size={22} />
          <span className="text-white font-normal ">Message</span>
        </NavLink>
        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            [
              "flex gap-4 items-center p-2 rounded-lg",

              isActive ? "bg-light-green/20 active" : "",
            ].join(" ")
          }
        >
          <IoSettingsOutline id="dashboard_icon" size={22} />
          <span className="text-white font-normal ">Settings</span>
        </NavLink>
      </div>
      <div className="text-white border-t-[1px] border-gray-100/20 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-full w-10 h-10 overflow-hidden">
              <img src="https://studiovietnam.com/wp-content/uploads/2022/08/Anh-chan-dung-dep-2.jpg" />
            </div>
            <div>
              <h3 className="font-semibold">Arlene Lane</h3>
              <span className="text-gray-300/70 text-sm">globex.com</span>
            </div>
          </div>
          <div className="hover:bg-gray-300/20 px-1 transition-all duration-300">
            <button>
              <HiDotsVertical />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBarDashboard;
