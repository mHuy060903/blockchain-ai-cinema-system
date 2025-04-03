import { useSelector } from "react-redux";
import { useGetAllTicket } from "../features/ticket/useGetAllTicket";
import { useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const Tickets = () => {
  const user = useSelector((state) => state.auth.user);

  const { isLoading, isError, data } = useGetAllTicket();
  const hasShownToast = useRef(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !hasShownToast.current) {
      toast.error("Please login to see your ticket");
      hasShownToast.current = true;
      return navigate("/login");
    }
  }, [navigate, user]);
  console.log(data);

  return (
    <div className="bg-white flex flex-col gap-3 items-center  my-8 rounded-lg px-3 py-4 dark:bg-[#1f1f1f]">
      {isLoading ? (
        <div className="flex flex-1 justify-center">
          <Loader size={100} color="blue" />
        </div>
      ) : data?.length === 0 ? (
        <div className="flex flex-1 justify-center">
          <h1>No tickets</h1>
        </div>
      ) : (
        data?.map((ticket) => (
          <NavLink
            to={`/ticket/${ticket.id}`}
            className="w-full bg-yellow-300/60 dark:bg-yellow-300 rounded-xl p-4 flex justify-between px-20  gap-4 relative
            after:absolute after:block after:w-12 after:h-12 after:top-[50%]  after:-translate-y-[50%] after:translate-x-[20%] after:bg-white after:rounded-full after:right-0
            after:dark:bg-[#1f1f1f]"
            key={ticket.id}
          >
            <div className="flex flex-col gap-3">
              <span>{ticket.booking.showtimes.movies.title}</span>
              <span>{ticket.booking.showtimes.screens.cinemas.name}</span>
            </div>
            <div className="flex flex-col gap-3">
              <span>{ticket.booking.showtimes.show_date}</span>
              <span>
                {ticket.booking.showtimes.show_time_start
                  .toString()
                  .slice(0, -3)}
              </span>
            </div>
          </NavLink>
        ))
      )}
    </div>
  );
};

export default Tickets;
