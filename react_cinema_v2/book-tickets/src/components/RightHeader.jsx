import { FaRegBell } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import HoverBar from "./HoverBar";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { shortenEthereumAddress } from "../../utils/generateToken";

import { setAccount } from "../reducers/account";
import { toast } from "react-toastify";
const RightHeader = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const account = useSelector((state) => state.account);

  const handleConnectAccount = () => {
    const template = async () => {
      const { ethereum } = window;

      try {
        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });

        window.ethereum.addListener("accountsChanged", () => {
          window.location.reload();
        });

        dispatch(setAccount(account));
      } catch (error) {
        toast.error("Something wrong went login");
      }
    };
    template();
  };
  console.log("account", account);
  return (
    <div className="flex flex-col items-center gap-4">
      {/* <div
        className="relative before:absolute before:w-1 before:h-1 before:bg-red-600 before:rounded-full
       before:right-0 before:p-1 cursor-pointer "
      >
        <FaRegBell className="text-gray-600 hover:text-gray-900" size={22} />
      </div> */}
      <div className="flex items-center gap-2">
        {account?.account === null ? (
          <button
            onClick={handleConnectAccount}
            className="bg-[#da821b] clear-start p-2 rounded-lg text-white font-semibold
        cursor-pointer hover:bg-orange-600"
          >
            Connect account
          </button>
        ) : (
          <span className="dark:text-white font-semibold">
            Account: $
            {account.account
              ? `${shortenEthereumAddress(account.account?.[0])}`
              : "Account not connected"}
          </span>
        )}
      </div>
      {auth.user ? (
        <div className="flex items-center gap-2 relative group">
          <img
            className="rounded-full w-10"
            src={auth.user.image}
            alt="user_image"
          />
          <div className="flex flex-col">
            <span className="font-medium text-gray-900 text-sm dark:text-white">
              {auth.user.email}
            </span>
          </div>
          <div>
            <IoIosArrowDown
              className="text-gray-700 dark:text-white"
              size={24}
            />
          </div>
          <HoverBar />
        </div>
      ) : (
        <Link to="/login" className="flex items-center gap-2 relative group ">
          <button
            className="bg-[#da821b] clear-start p-2 rounded-lg text-white font-semibold
       cursor-pointer hover:bg-orange-600"
          >
            Sign In/ Sign up
          </button>
        </Link>
      )}
    </div>
  );
};

export default RightHeader;
