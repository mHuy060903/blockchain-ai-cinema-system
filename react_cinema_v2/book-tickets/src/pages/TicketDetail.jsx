import Loader from "../components/Loader";
import { useGetTicketDetail } from "../features/ticket/useGetTicketDetail";

const TicketDetail = () => {
  const { isLoading, isError, data } = useGetTicketDetail();

  return (
    <div className="bg-white flex flex-col items-center  my-8 rounded-lg px-3 py-4 dark:bg-[#1f1f1f]">
      <h1 className="text-center text-2xl font-semibold dark:text-white">Ticket Info</h1>
      {isLoading ? (
        <Loader size={70} color="blue" />
      ) : (
        <div
          className=" grid-cols-2 inline-grid gap-4 mt-8 bg-yellow-300/60 dark:bg-yellow-300 rounded-2xl py-6 px-6 relative after:absolute after:block after:w-14 after:h-14 after:bg-white
      after:rounded-full after:-translate-x-[50%] after:dark:bg-[#1f1f1f] before:dark:bg-[#1f1f1f]  after:top-[48%] before:absolute before:block before:w-14 before:h-14 before:bg-white before:right-0 before:top-[48%] before:rounded-full
      before:translate-x-[50%]"
        >
          <div className="flex items-center flex-col">
            <span className="text-sm text-gray-600 font-medium">Movie: </span>
            <span className="text-lg font-semibold">
              {data?.booking.showtimes.movies.title}
            </span>
          </div>
          <div className="flex items-center flex-col">
            <span className="text-sm text-gray-600 font-medium">Cinema: </span>
            <span className="text-lg font-semibold">
              {data?.booking.showtimes.screens.cinemas.name}
            </span>
          </div>
          <div className="flex items-center flex-col">
            <span className="text-sm text-gray-600 font-medium">Room: </span>
            <span className="text-lg font-semibold">
              {data?.booking.showtimes.screens.name}
            </span>
          </div>
          <div className="flex items-center flex-col">
            <span className="text-sm text-gray-600 font-medium">Date: </span>
            <span className="text-lg font-semibold">
              {" "}
              {data?.booking.showtimes.show_date}
            </span>
          </div>
          <div className="flex items-center flex-col">
            <span className="text-sm text-gray-600 font-medium">Time: </span>
            <span className="text-lg font-semibold">
              {" "}
              {data?.booking.showtimes.show_time_start.toString().slice(0, -3)}
            </span>
          </div>
          <div className="flex items-center flex-col">
            <span className="text-sm text-gray-600 font-medium">Seats: </span>
            <span className="text-lg font-semibold">
              {" "}
              {data?.booking.seat_number.join(", ")}
            </span>
          </div>
          <div className="col-span-2">
            ----------------------------------------------------------
          </div>
          <div className="col-span-2 flex justify-center mt-7">
            <img src={data?.qr_url} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDetail;
