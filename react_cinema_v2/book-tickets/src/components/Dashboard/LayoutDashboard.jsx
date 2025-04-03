import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavBarDashboard from "./NavBarDashboard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { fetchTokenLogin } from "../../fetchApi/users/login";
import { login } from "../../reducers/auth/authSlice";
import Loader from "../Loader";

const LayoutDashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const hashTagDashBoard = location.pathname.replace("/", "").slice(10);

  const { mutate: handleFetchTokenLogin, isLoading } = useMutation({
    mutationFn: fetchTokenLogin,
    onSuccess: (data) => {
      const { token, ...user } = data;
      localStorage.setItem("token", data.token);
      dispatch(
        login({
          user: user,
          token: token,
        })
      );
      if (!user || user?.role !== "admin") {
        return navigate("/");
      }
    },
  });

  useEffect(() => {
    handleFetchTokenLogin();
  }, [handleFetchTokenLogin]);

  if (isLoading) {
    return (
      <div className="w-full h-[100vh] flex flex-col items-center justify-center">
        <Loader color="blue" size={100} />
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="bg-light-black grid grid-cols-10 gap-6 h-[100vh] overflow-y-auto">
      <div className="col-span-2 border-r-[1px] border-gray-100/20 overflow-y-auto">
        <NavBarDashboard />
      </div>
      <div className="col-span-8 py-8 px-4 overflow-y-auto">
        <h1 className="font-semibold text-white text-3xl mb-6">
          {hashTagDashBoard === ""
            ? "Dashboard"
            : hashTagDashBoard.charAt(0).toUpperCase() +
              hashTagDashBoard.slice(1)}
        </h1>
        <div className="w-full bg-gray-100/20 h-[1px]"></div>
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutDashboard;
