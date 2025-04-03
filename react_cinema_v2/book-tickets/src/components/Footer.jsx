import { SiCinema4D } from "react-icons/si";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import ItemFooter from "./ItemFooter";
const Footer = () => {
  return (
    <div className="w-full my-4 px-8 flex flex-col gap-8 dark:border-t-[1px] dark:border-gray-300">
      <div className="flex md:flex-row flex-col items-start  md:items-center justify-between my-3">
        <div className="flex items-center gap-2">
          <SiCinema4D color="#da821b" size={35} />
          <h1 className="text-[#da821b] text-2xl font-bold">Cticket</h1>
        </div>
        <div className="flex md:flex-row flex-col md:mt-0 mt-6 md:items-center items-start gap-4">
          <h1 className="text-gray-600 text-base font-medium">
            Help / Privacy Policy
          </h1>
          <div className="flex items-center gap-3">
            <div className="hover:bg-orange-600 cursor-pointer transition-all duration-300 hover:-translate-y-2 p-4 rounded-full bg-gray-300/40">
              <FaTwitter color="white" />
            </div>
            <div className="hover:bg-orange-600 cursor-pointer transition-all duration-300 hover:-translate-y-2 p-4 rounded-full bg-gray-300/40">
              <FaFacebook color="white" />
            </div>
            <div className="hover:bg-orange-600 cursor-pointer transition-all duration-300 hover:-translate-y-2 p-4 rounded-full bg-gray-300/40">
              <FaInstagramSquare color="white" />
            </div>
            <div className="hover:bg-orange-600 cursor-pointer transition-all duration-300 hover:-translate-y-2 p-4 rounded-full bg-gray-300/40">
              <FaPinterest color="white" />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="py-20 grid grid-cols-6 text-white gap-5">
        <div className="lg:col-span-2 md:col-span-6 col-span-12 flex flex-col gap-3 items-start">
          <p className="font-bold text-2xl">
            Buy movie ticket easily with Aovis system nationwide
          </p>
          <button className="bg-orange-600 font-semibold p-2">
            Get Your Ticket
          </button>
        </div>
        <div className="lg:col-span-1 md:col-span-6 col-span-12 flex flex-col items-start gap-8">
          <h1 className="text-orange-600 text-xl font-bold">Movies</h1>
          <div className="flex flex-col gap-4 text-gray-500">
            <ItemFooter text="Action" />
            <ItemFooter text="Adventure" />
            <ItemFooter text="Animation" />
            <ItemFooter text="Comedy" />
            <ItemFooter text="Crime" />
          </div>
        </div>
        <div className="lg:col-span-1 md:col-span-6 col-span-12 flex flex-col items-start gap-8">
          <h1 className="text-orange-600 text-xl font-bold">Links</h1>
          <div className="flex flex-col gap-4 text-gray-500">
            <ItemFooter text="About" />
            <ItemFooter text="My Account" />
            <ItemFooter text="News" />
            <ItemFooter text="Latest Evens" />
            <ItemFooter text="Contact" />
          </div>
        </div>
        <div className="lg:col-span-2 md:col-span-6 col-span-12 flex-col items-start gap-8">
          <h1 className="text-orange-600 text-xl font-bold">Newsletter</h1>
          <div className="flex flex-col gap-4">
            <p className="my-8 text-[#737373]">
              Subcrise to Leitmotif new letter this very day.
            </p>
            <div className="flex items-center gap-2 bg-white w-full p-4">
              <input
                placeholder="Email Address"
                className="placeholder:font-semibold placeholder:text-sm flex-1 outline-none text-black"
              />
              <IoIosSend color="black" size={24} />
            </div>
            <div className="flex items-center justify-start gap-3">
              <input type="checkbox" />
              <p className="text-[#737373]">
                I agree to all terms and policies of the company
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full py-4 bg-gray-900">
        <span className="text-[#737373]">© Copyright 2024 by Minhhuy.com</span>
      </div>
    </div>
  );
};

export default Footer;
